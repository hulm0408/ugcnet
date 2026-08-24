import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';
import { calculate5LevelReview, SPACING_LEVELS } from '@/lib/memoryEngine';

import { getActiveSubjectServer } from '@/lib/subjectContext';

export const dynamic = 'force-dynamic';

// GET: Fetch questions due for 5-Level Spaced Review or get completion stats
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const activeSubject = await getActiveSubjectServer();

    const { searchParams } = new URL(request.url);
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const all = searchParams.get('all') === 'true'; // if true, fetch all active in queue
    const levelParam = searchParams.get('level'); // filter by specific level
    const completedOnly = searchParams.get('completed') === 'true'; // fetch mastered completed questions

    const now = new Date();

    const where: any = {
      user_id: session.user.id,
      question: { subject_id: activeSubject.id },
    };

    if (completedOnly) {
      where.is_completed = true;
    } else {
      where.status = 'ACTIVE';
      if (!all) {
        where.next_review_at = { lte: now };
      }
    }

    if (levelParam) {
      where.level = parseInt(levelParam, 10);
    }

    // Find queued items
    const queueItems = await prisma.spacedMemoryQueue.findMany({
      where,
      orderBy: completedOnly ? { completed_at: 'desc' } : { next_review_at: 'asc' },
      take: limit,
      include: {
        question: {
          include: {
            unit: {
              select: {
                unit_number: true,
                name_arabic: true,
                name_english: true,
              },
            },
            broad_topic: {
              select: {
                name_arabic: true,
                name_english: true,
                slug: true,
              },
            },
            subtopic: {
              select: {
                name_arabic: true,
                name_english: true,
                slug: true,
              },
            },
            exam_paper: {
              select: {
                year: true,
                paper_number: true,
                session: true,
                display_name: true,
              },
            },
          },
        },
      },
    });

    // Also fetch the user's memories and connections for these questions
    const questionIds = queueItems.map((q) => q.question_id);
    const [memories, connections] = await Promise.all([
      prisma.memoryConnection.findMany({
        where: {
          user_id: session.user.id,
          question_id: { in: questionIds },
        },
      }),
      prisma.questionConnection.findMany({
        where: {
          user_id: session.user.id,
          OR: [
            { source_question_id: { in: questionIds } },
            { target_question_id: { in: questionIds } },
          ],
        },
        include: {
          source_question: {
            select: { id: true, question_arabic: true, original_question_number: true },
          },
          target_question: {
            select: { id: true, question_arabic: true, original_question_number: true },
          },
        },
      }),
    ]);

    // Group memories by questionId
    const memoriesByQ: Record<string, any[]> = {};
    for (const m of memories) {
      if (!memoriesByQ[m.question_id]) memoriesByQ[m.question_id] = [];
      memoriesByQ[m.question_id].push(m);
    }

    const connectionsByQ: Record<string, any[]> = {};
    for (const c of connections) {
      if (!connectionsByQ[c.source_question_id]) connectionsByQ[c.source_question_id] = [];
      connectionsByQ[c.source_question_id].push(c);
      if (!connectionsByQ[c.target_question_id]) connectionsByQ[c.target_question_id] = [];
      connectionsByQ[c.target_question_id].push(c);
    }

    // Assemble review payload
    const reviewItems = queueItems.map((item) => {
      const levelInfo = SPACING_LEVELS[Math.min(5, Math.max(1, item.level)) - 1];
      const isOverdue = item.due_deadline ? now.getTime() > new Date(item.due_deadline).getTime() : false;

      return {
        queueId: item.id,
        level: item.level,
        levelInfo,
        intervalDays: item.interval_days,
        reviewCount: item.review_count,
        memoryStrength: item.memory_strength,
        nextReviewAt: item.next_review_at,
        dueDeadline: item.due_deadline,
        isOverdue,
        isCompleted: item.is_completed,
        completedAt: item.completed_at,
        status: item.status,
        question: item.question,
        userMemories: memoriesByQ[item.question_id] || [],
        userConnections: connectionsByQ[item.question_id] || [],
      };
    });

    // Compute comprehensive Level breakdown stats
    const [
      dueCount,
      totalQueueCount,
      completedCount,
      level1Count,
      level2Count,
      level3Count,
      level4Count,
      level5Count,
    ] = await Promise.all([
      prisma.spacedMemoryQueue.count({
        where: {
          user_id: session.user.id,
          status: 'ACTIVE',
          next_review_at: { lte: now },
        },
      }),
      prisma.spacedMemoryQueue.count({
        where: { user_id: session.user.id },
      }),
      prisma.spacedMemoryQueue.count({
        where: {
          user_id: session.user.id,
          is_completed: true,
        },
      }),
      prisma.spacedMemoryQueue.count({
        where: { user_id: session.user.id, level: 1, is_completed: false, status: 'ACTIVE' },
      }),
      prisma.spacedMemoryQueue.count({
        where: { user_id: session.user.id, level: 2, is_completed: false, status: 'ACTIVE' },
      }),
      prisma.spacedMemoryQueue.count({
        where: { user_id: session.user.id, level: 3, is_completed: false, status: 'ACTIVE' },
      }),
      prisma.spacedMemoryQueue.count({
        where: { user_id: session.user.id, level: 4, is_completed: false, status: 'ACTIVE' },
      }),
      prisma.spacedMemoryQueue.count({
        where: { user_id: session.user.id, level: 5, is_completed: false, status: 'ACTIVE' },
      }),
    ]);

    return NextResponse.json({
      data: reviewItems,
      meta: {
        dueCount,
        totalQueueCount,
        completedCount,
        levelCounts: {
          1: level1Count,
          2: level2Count,
          3: level3Count,
          4: level4Count,
          5: level5Count,
        },
      },
    });
  } catch (error) {
    console.error('[API /memories/review] GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch review queue' }, { status: 500 });
  }
}

// POST: Submit review feedback for a question and progress through 5 Levels
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { questionId, wasHelpful, memoryId, feedback } = body;

    if (!questionId || typeof wasHelpful !== 'boolean') {
      return NextResponse.json({ error: 'Question ID and wasHelpful boolean are required' }, { status: 400 });
    }

    // Find queue record
    const queueItem = await prisma.spacedMemoryQueue.findUnique({
      where: {
        user_id_question_id: {
          user_id: session.user.id,
          question_id: questionId,
        },
      },
    });

    const currentLevel = queueItem?.level || 1;
    const currentStrength = queueItem?.memory_strength || 1.0;
    const currentReviewCount = queueItem?.review_count || 0;
    const dueDeadline = queueItem?.due_deadline;

    // Calculate progression based on strict timing and recall feedback
    const nextSchedule = calculate5LevelReview({
      currentLevel,
      currentStrength,
      dueDeadline,
      wasHelpful,
    });

    // Update queue record
    const updatedQueue = await prisma.spacedMemoryQueue.upsert({
      where: {
        user_id_question_id: {
          user_id: session.user.id,
          question_id: questionId,
        },
      },
      create: {
        user_id: session.user.id,
        question_id: questionId,
        level: nextSchedule.level,
        review_count: 1,
        last_reviewed_at: new Date(),
        interval_days: nextSchedule.intervalDays,
        memory_strength: nextSchedule.memoryStrength,
        next_review_at: nextSchedule.nextReviewAt,
        due_deadline: nextSchedule.dueDeadline,
        status: nextSchedule.status,
        is_completed: nextSchedule.isCompleted,
        completed_at: nextSchedule.completedAt,
      },
      update: {
        level: nextSchedule.level,
        review_count: currentReviewCount + 1,
        last_reviewed_at: new Date(),
        interval_days: nextSchedule.intervalDays,
        memory_strength: nextSchedule.memoryStrength,
        next_review_at: nextSchedule.nextReviewAt,
        due_deadline: nextSchedule.dueDeadline,
        status: nextSchedule.status,
        is_completed: nextSchedule.isCompleted,
        completed_at: nextSchedule.completedAt,
        updated_at: new Date(),
      },
    });

    // Log review activity
    await prisma.memoryReviewLog.create({
      data: {
        user_id: session.user.id,
        question_id: questionId,
        memory_id: memoryId || null,
        was_helpful: wasHelpful,
        feedback: feedback || null,
      },
    });

    return NextResponse.json({
      success: true,
      queueItem: updatedQueue,
      nextSchedule,
      onTime: nextSchedule.onTime,
      isCompleted: nextSchedule.isCompleted,
    });
  } catch (error) {
    console.error('[API /memories/review] POST Error:', error);
    return NextResponse.json({ error: 'Failed to record review' }, { status: 500 });
  }
}
