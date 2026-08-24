import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';

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
        isRemembered: item?.status === 'ACTIVE' || item?.status === 'MASTERED',
        queueItem: item || null,
      });
    }

    if (questionIdsParam) {
      const ids = questionIdsParam.split(',').filter(Boolean);
      const items = await prisma.spacedMemoryQueue.findMany({
        where: {
          user_id: session.user.id,
          question_id: { in: ids },
          status: { in: ['ACTIVE', 'MASTERED'] },
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
        status: { in: ['ACTIVE', 'MASTERED'] },
      },
    });

    return NextResponse.json({ count: totalCount });
  } catch (error) {
    console.error('[API /memories/remember] GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch memory status' }, { status: 500 });
  }
}

// POST: Toggle "Remember This" lightweight action
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { questionId, remember } = body;

    if (!questionId) {
      return NextResponse.json({ error: 'Question ID is required' }, { status: 400 });
    }

    if (remember === false) {
      // Remove or archive
      await prisma.spacedMemoryQueue.deleteMany({
        where: {
          user_id: session.user.id,
          question_id: questionId,
        },
      });

      return NextResponse.json({
        success: true,
        isRemembered: false,
      });
    } else {
      // Add or reactivate
      const queueItem = await prisma.spacedMemoryQueue.upsert({
        where: {
          user_id_question_id: {
            user_id: session.user.id,
            question_id: questionId,
          },
        },
        create: {
          user_id: session.user.id,
          question_id: questionId,
          status: 'ACTIVE',
          interval_days: 1,
          next_review_at: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          memory_strength: 1.0,
        },
        update: {
          status: 'ACTIVE',
          updated_at: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        isRemembered: true,
        queueItem,
      });
    }
  } catch (error) {
    console.error('[API /memories/remember] POST Error:', error);
    return NextResponse.json({ error: 'Failed to update memory queue' }, { status: 500 });
  }
}
