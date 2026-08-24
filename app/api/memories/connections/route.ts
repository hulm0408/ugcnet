import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET: Fetch question-to-question connections for the user
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');

    const where: any = {
      user_id: session.user.id,
    };

    if (questionId) {
      where.OR = [
        { source_question_id: questionId },
        { target_question_id: questionId },
      ];
    }

    const connections = await prisma.questionConnection.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        source_question: {
          select: {
            id: true,
            original_question_number: true,
            question_arabic: true,
            question_english: true,
            specific_entity_name_arabic: true,
            question_micro_focus_arabic: true,
            unit: {
              select: {
                unit_number: true,
                name_english: true,
                name_arabic: true,
              },
            },
            broad_topic: {
              select: {
                name_arabic: true,
                name_english: true,
              },
            },
            exam_paper: {
              select: {
                year: true,
                paper_number: true,
              },
            },
          },
        },
        target_question: {
          select: {
            id: true,
            original_question_number: true,
            question_arabic: true,
            question_english: true,
            specific_entity_name_arabic: true,
            question_micro_focus_arabic: true,
            unit: {
              select: {
                unit_number: true,
                name_english: true,
                name_arabic: true,
              },
            },
            broad_topic: {
              select: {
                name_arabic: true,
                name_english: true,
              },
            },
            exam_paper: {
              select: {
                year: true,
                paper_number: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ data: connections });
  } catch (error) {
    console.error('[API /memories/connections] GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch question connections' }, { status: 500 });
  }
}

// POST: Connect Question A to Question B
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { sourceQuestionId, targetQuestionId, relationshipType = 'RELATED_CONCEPT', note } = body;

    if (!sourceQuestionId || !targetQuestionId) {
      return NextResponse.json({ error: 'Both source and target question IDs are required' }, { status: 400 });
    }

    if (sourceQuestionId === targetQuestionId) {
      return NextResponse.json({ error: 'Cannot connect a question to itself' }, { status: 400 });
    }

    // Verify both questions exist
    const [sourceQ, targetQ] = await Promise.all([
      prisma.question.findUnique({ where: { id: sourceQuestionId }, select: { id: true } }),
      prisma.question.findUnique({ where: { id: targetQuestionId }, select: { id: true } }),
    ]);

    if (!sourceQ || !targetQ) {
      return NextResponse.json({ error: 'One or both questions could not be found' }, { status: 404 });
    }

    const connection = await prisma.questionConnection.upsert({
      where: {
        user_id_source_question_id_target_question_id: {
          user_id: session.user.id,
          source_question_id: sourceQuestionId,
          target_question_id: targetQuestionId,
        },
      },
      create: {
        user_id: session.user.id,
        source_question_id: sourceQuestionId,
        target_question_id: targetQuestionId,
        relationship_type: relationshipType,
        note: note?.trim() || null,
      },
      update: {
        relationship_type: relationshipType,
        note: note?.trim() || null,
        updated_at: new Date(),
      },
      include: {
        source_question: {
          select: {
            id: true,
            original_question_number: true,
            question_arabic: true,
            question_english: true,
          },
        },
        target_question: {
          select: {
            id: true,
            original_question_number: true,
            question_arabic: true,
            question_english: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, connection });
  } catch (error) {
    console.error('[API /memories/connections] POST Error:', error);
    return NextResponse.json({ error: 'Failed to create question connection' }, { status: 500 });
  }
}

// DELETE: Delete a question connection
export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const sourceQuestionId = searchParams.get('sourceQuestionId');
    const targetQuestionId = searchParams.get('targetQuestionId');

    if (id) {
      const existing = await prisma.questionConnection.findUnique({
        where: { id },
      });

      if (!existing || existing.user_id !== session.user.id) {
        return NextResponse.json({ error: 'Connection not found or unauthorized' }, { status: 404 });
      }

      await prisma.questionConnection.delete({ where: { id } });
      return NextResponse.json({ success: true });
    } else if (sourceQuestionId && targetQuestionId) {
      await prisma.questionConnection.deleteMany({
        where: {
          user_id: session.user.id,
          source_question_id: sourceQuestionId,
          target_question_id: targetQuestionId,
        },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Missing connection identifier' }, { status: 400 });
  } catch (error) {
    console.error('[API /memories/connections] DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete question connection' }, { status: 500 });
  }
}
