import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';
import { getInitialEnrollment } from '@/lib/memoryEngine';

export const dynamic = 'force-dynamic';

// GET: Check if question(s) are in the authenticated user's memory queue
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ rememberedIds: [], count: 0 });
    }

    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');
    const questionIdsParam = searchParams.get('questionIds');

    if (questionId) {
      const item = await prisma.spacedMemoryQueue.findUnique({
        where: {
          user_id_question_id: {
            user_id: session.user.id,
            question_id: questionId,
          },
        },
      });

      return NextResponse.json({
        isRemembered: item?.status === 'ACTIVE' || item?.status === 'COMPLETED',
        queueItem: item || null,
      });
    }

    if (questionIdsParam) {
      const ids = questionIdsParam.split(',').filter(Boolean);
      const items = await prisma.spacedMemoryQueue.findMany({
        where: {
          user_id: session.user.id,
          question_id: { in: ids },
          status: { in: ['ACTIVE', 'COMPLETED'] },
        },
        select: { question_id: true },
      });

      return NextResponse.json({
        rememberedIds: items.map((i) => i.question_id),
      });
    }

    // Total remembered count
    const totalCount = await prisma.spacedMemoryQueue.count({
      where: {
        user_id: session.user.id,
        status: { in: ['ACTIVE', 'COMPLETED'] },
      },
    });

    return NextResponse.json({ count: totalCount });
  } catch (error) {
    console.error('[API /memories/remember] GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch memory status' }, { status: 500 });
  }
}

// POST: Toggle "Remember This" lightweight action (Enrolls into 5-Level Spaced Repetition)
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { questionId, questionIds, remember } = body;

    if (!questionId && (!questionIds || !Array.isArray(questionIds) || questionIds.length === 0)) {
      return NextResponse.json({ error: 'Question ID or questionIds array is required' }, { status: 400 });
    }

    const idsToProcess = questionIds && Array.isArray(questionIds) ? questionIds : [questionId];
    const enrollment = getInitialEnrollment();

    if (remember === false) {
      await prisma.spacedMemoryQueue.deleteMany({
        where: {
          user_id: session.user.id,
          question_id: { in: idsToProcess },
        },
      });

      return NextResponse.json({
        success: true,
        count: idsToProcess.length,
        isRemembered: false,
      });
    }

    // Enroll all question IDs into Level 1 Spaced Repetition (24h)
    await Promise.all(
      idsToProcess.map((qId: string) =>
        prisma.spacedMemoryQueue.upsert({
          where: {
            user_id_question_id: {
              user_id: session.user.id,
              question_id: qId,
            },
          },
          create: {
            user_id: session.user.id,
            question_id: qId,
            level: enrollment.level,
            status: enrollment.status,
            interval_days: enrollment.intervalDays,
            next_review_at: enrollment.nextReviewAt,
            due_deadline: enrollment.dueDeadline,
            memory_strength: 1.0,
            is_completed: false,
          },
          update: {
            level: enrollment.level,
            status: enrollment.status,
            interval_days: enrollment.intervalDays,
            next_review_at: enrollment.nextReviewAt,
            due_deadline: enrollment.dueDeadline,
            updated_at: new Date(),
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      enrolledCount: idsToProcess.length,
      isRemembered: true,
    });
  } catch (error) {
    console.error('[API /memories/remember] POST Error:', error);
    return NextResponse.json({ error: 'Failed to update memory queue' }, { status: 500 });
  }
}
