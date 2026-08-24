import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';
import { calculateNextReview } from '@/lib/memoryEngine';

export const dynamic = 'force-dynamic';

// GET: Fetch questions due for spaced review
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const all = searchParams.get('all') === 'true'; // if true, fetch all active in queue even if not yet due

    const now = new Date();

    const where: any = {
      user_id: session.user.id,
      status: { in: ['ACTIVE', 'MASTERED'] },
    };

    if (!all) {
      where.next_review_at = { lte: now };
    }

    // Find queued items
    const queueItems = await prisma.spacedMemoryQueue.findMany({
      where,
      orderBy: { next_review_at: 'asc' },
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
    const reviewItems = queueItems.map((item) => ({
      queueId: item.id,
      intervalDays: item.interval_days,
      reviewCount: item.review_count,
      memoryStrength: item.memory_strength,
      nextReviewAt: item.next_review_at,
      question: item.question,
      userMemories: memoriesByQ[item.question_id] || [],
      userConnections: connectionsByQ[item.question_id] || [],
    }));

    // Stats
    const [dueCount, totalQueueCount] = await Promise.all([
      prisma.spacedMemoryQueue.count({
        where: {
          user_id: session.user.id,
          status: { in: ['ACTIVE', 'MASTERED'] },
          next_review_at: { lte: now },
        },
      }),
      prisma.spacedMemoryQueue.count({
        where: {
          user_id: session.user.id,
          status: { in: ['ACTIVE', 'MASTERED'] },
        },
      }),
    ]);

    return NextResponse.json({
      data: reviewItems,
      meta: {
        dueCount,
        totalQueueCount,
      },
    });
  } catch (error) {
    console.error('[API /memories/review] GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch review queue' }, { status: 500 });
  }
}

// POST: Submit review feedback for a question
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

    const currentInterval = queueItem?.interval_days || 1;
    const currentStrength = queueItem?.memory_strength || 1.0;
    const currentReviewCount = queueItem?.review_count || 0;

    const nextSchedule = calculateNextReview(currentInterval, currentStrength, wasHelpful);

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
        review_count: 1,
        last_reviewed_at: new Date(),
        interval_days: nextSchedule.intervalDays,
        memory_strength: nextSchedule.memoryStrength,
        next_review_at: nextSchedule.nextReviewAt,
        status: nextSchedule.status,
      },
      update: {
        review_count: currentReviewCount + 1,
        last_reviewed_at: new Date(),
        interval_days: nextSchedule.intervalDays,
        memory_strength: nextSchedule.memoryStrength,
        next_review_at: nextSchedule.nextReviewAt,
        status: nextSchedule.status,
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
    });
  } catch (error) {
    console.error('[API /memories/review] POST Error:', error);
    return NextResponse.json({ error: 'Failed to record review' }, { status: 500 });
  }
}
