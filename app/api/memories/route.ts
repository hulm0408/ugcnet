import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';
import { normalizeArabicText } from '@/lib/arabicUtils';

export const dynamic = 'force-dynamic';

// GET: Fetch memories for authenticated user with search & filters
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');
    const type = searchParams.get('type');
    const search = searchParams.get('search') || searchParams.get('q') || '';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const skip = (page - 1) * limit;

    // Build user-scoped where clause
    const where: any = {
      user_id: session.user.id,
    };

    if (questionId) {
      where.question_id = questionId;
    }

    if (type && type !== 'ALL') {
      where.type = type;
    }

    // Direct fetch with relations
    const [memories, total] = await prisma.$transaction([
      prisma.memoryConnection.findMany({
        where,
        orderBy: { updated_at: 'desc' },
        include: {
          question: {
            select: {
              id: true,
              original_question_number: true,
              question_arabic: true,
              question_english: true,
              correct_answer: true,
              correct_answer_text_arabic: true,
              question_micro_focus_arabic: true,
              question_micro_focus_english: true,
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
      }),
      prisma.memoryConnection.count({ where }),
    ]);

    // Apply normalized search filter if search term provided
    let filteredMemories = memories;
    if (search.trim()) {
      const normalizedQuery = normalizeArabicText(search.toLowerCase());
      filteredMemories = memories.filter((m) => {
        const contentNorm = normalizeArabicText(m.content?.toLowerCase() || '');
        const qArNorm = normalizeArabicText(m.question?.question_arabic?.toLowerCase() || '');
        const qEnNorm = (m.question?.question_english || '').toLowerCase();
        const keywordsNorm = Array.isArray(m.keywords)
          ? (m.keywords as string[]).map((k) => normalizeArabicText(k.toLowerCase())).join(' ')
          : '';

        return (
          contentNorm.includes(normalizedQuery) ||
          qArNorm.includes(normalizedQuery) ||
          qEnNorm.includes(search.toLowerCase()) ||
          keywordsNorm.includes(normalizedQuery)
        );
      });
    }

    const paginated = filteredMemories.slice(skip, skip + limit);

    return NextResponse.json({
      data: paginated,
      meta: {
        total: filteredMemories.length,
        page,
        limit,
        totalPages: Math.ceil(filteredMemories.length / limit),
      },
    });
  } catch (error) {
    console.error('[API /memories] GET Error:', error);
    return NextResponse.json({ error: 'Failed to retrieve memories' }, { status: 500 });
  }
}

// POST: Create or upsert a personal memory connection
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { questionId, type = 'TRICK', content, keywords = [], isPublic = false } = body;

    if (!questionId || typeof questionId !== 'string') {
      return NextResponse.json({ error: 'Question ID is required' }, { status: 400 });
    }

    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json({ error: 'Memory content cannot be empty' }, { status: 400 });
    }

    // Verify question exists
    const questionExists = await prisma.question.findUnique({
      where: { id: questionId },
      select: { id: true },
    });

    if (!questionExists) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    const cleanKeywords = Array.isArray(keywords)
      ? keywords.filter((k) => typeof k === 'string' && k.trim())
      : typeof keywords === 'string'
      ? keywords.split(',').map((k) => k.trim()).filter(Boolean)
      : [];

    // Upsert MemoryConnection
    const memory = await prisma.memoryConnection.upsert({
      where: {
        user_id_question_id_type: {
          user_id: session.user.id,
          question_id: questionId,
          type: type.toUpperCase(),
        },
      },
      create: {
        user_id: session.user.id,
        question_id: questionId,
        type: type.toUpperCase(),
        content: content.trim(),
        keywords: cleanKeywords,
        is_public: !!isPublic,
      },
      update: {
        content: content.trim(),
        keywords: cleanKeywords,
        is_public: !!isPublic,
        updated_at: new Date(),
      },
      include: {
        question: {
          select: {
            id: true,
            original_question_number: true,
            question_arabic: true,
            question_english: true,
            correct_answer: true,
            correct_answer_text_arabic: true,
          },
        },
      },
    });

    // Ensure question is also in the user's SpacedMemoryQueue
    await prisma.spacedMemoryQueue.upsert({
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
      },
      update: {
        status: 'ACTIVE',
      },
    });

    return NextResponse.json({ success: true, memory });
  } catch (error) {
    console.error('[API /memories] POST Error:', error);
    return NextResponse.json({ error: 'Failed to save memory' }, { status: 500 });
  }
}

// PUT: Update an existing memory
export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, content, type, keywords, isPublic } = body;

    if (!id) {
      return NextResponse.json({ error: 'Memory ID is required' }, { status: 400 });
    }

    // Verify ownership
    const existing = await prisma.memoryConnection.findUnique({
      where: { id },
    });

    if (!existing || existing.user_id !== session.user.id) {
      return NextResponse.json({ error: 'Memory not found or unauthorized' }, { status: 404 });
    }

    const updateData: any = { updated_at: new Date() };
    if (typeof content === 'string' && content.trim()) updateData.content = content.trim();
    if (type) updateData.type = type.toUpperCase();
    if (keywords !== undefined) {
      updateData.keywords = Array.isArray(keywords)
        ? keywords.filter((k) => typeof k === 'string' && k.trim())
        : typeof keywords === 'string'
        ? keywords.split(',').map((k) => k.trim()).filter(Boolean)
        : [];
    }
    if (isPublic !== undefined) updateData.is_public = Boolean(isPublic);

    const updated = await prisma.memoryConnection.update({
      where: { id },
      data: updateData,
      include: {
        question: {
          select: {
            id: true,
            original_question_number: true,
            question_arabic: true,
            question_english: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, memory: updated });
  } catch (error) {
    console.error('[API /memories] PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update memory' }, { status: 500 });
  }
}

// DELETE: Remove a memory connection
export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const questionId = searchParams.get('questionId');
    const type = searchParams.get('type');

    if (id) {
      // Find and verify user ownership
      const existing = await prisma.memoryConnection.findUnique({
        where: { id },
      });

      if (!existing || existing.user_id !== session.user.id) {
        return NextResponse.json({ error: 'Memory not found or unauthorized' }, { status: 404 });
      }

      await prisma.memoryConnection.delete({
        where: { id },
      });

      return NextResponse.json({ success: true });
    } else if (questionId && type) {
      await prisma.memoryConnection.deleteMany({
        where: {
          user_id: session.user.id,
          question_id: questionId,
          type: type.toUpperCase(),
        },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Missing memory identifier' }, { status: 400 });
  } catch (error) {
    console.error('[API /memories] DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete memory' }, { status: 500 });
  }
}
