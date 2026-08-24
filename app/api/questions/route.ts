import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode');
    const paperId = searchParams.get('paperId');
    const unitId = searchParams.get('unitId');
    const unit = searchParams.get('unit');
    const topic = searchParams.get('topic');
    const subtopic = searchParams.get('subtopic');
    const node = searchParams.get('node');
    const entity = searchParams.get('entity');
    const year = searchParams.get('year');
    const questionId = searchParams.get('questionId');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 250);
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);

    // Filter construction — always scope to PUBLISHED
    const where: any = {
      content_status: 'PUBLISHED',
    };

    // 1. Single Question
    if (questionId) {
      where.id = questionId;
    }

    // 2. Exact Paper
    else if (paperId) {
      where.exam_paper_id = paperId;
    }

    // 3. User-Specific Modes (Requires Auth)
    else if (mode === 'incorrect') {
      const session = await auth();
      if (!session?.user?.id) {
        return NextResponse.json({
          data: [],
          meta: { total: 0, page: 1, limit, totalPages: 0, requiresAuth: true },
        });
      }
      const attempts = await prisma.practiceAttempt.findMany({
        where: { user_id: session.user.id, is_correct: false, is_skipped: false },
        select: { question_id: true },
      });
      const qIds = Array.from(new Set(attempts.map((a) => a.question_id)));
      if (qIds.length === 0) {
        return NextResponse.json({
          data: [],
          meta: { total: 0, page: 1, limit, totalPages: 0 },
        });
      }
      where.id = { in: qIds };
    } else if (mode === 'bookmarked') {
      const session = await auth();
      if (!session?.user?.id) {
        return NextResponse.json({
          data: [],
          meta: { total: 0, page: 1, limit, totalPages: 0, requiresAuth: true },
        });
      }
      const bookmarks = await prisma.bookmark.findMany({
        where: { user_id: session.user.id },
        select: { question_id: true },
      });
      const qIds = bookmarks.map((b) => b.question_id);
      if (qIds.length === 0) {
        return NextResponse.json({
          data: [],
          meta: { total: 0, page: 1, limit, totalPages: 0 },
        });
      }
      where.id = { in: qIds };
    } else if (mode === 'unattempted') {
      const session = await auth();
      if (session?.user?.id) {
        const attempts = await prisma.practiceAttempt.findMany({
          where: { user_id: session.user.id },
          select: { question_id: true },
        });
        const attemptedIds = Array.from(new Set(attempts.map((a) => a.question_id)));
        if (attemptedIds.length > 0) {
          where.id = { notIn: attemptedIds };
        }
      }
    }

    // 4. Node / Theme Mode
    else if (node) {
      where.OR = [
        { question_micro_focus_english: { contains: node, mode: 'insensitive' } },
        { question_micro_focus_arabic: { contains: node } },
      ];
      if (subtopic) {
        where.subtopic = { slug: subtopic };
      }
      if (topic) {
        where.broad_topic = { slug: topic };
      }
      if (unit) {
        where.unit = { unit_number: parseInt(unit, 10) };
      }
    }

    // 5. Subtopic / Entity Mode
    else if (subtopic || entity) {
      const targetSub = subtopic || entity;
      where.OR = [
        { subtopic: { slug: targetSub } },
        { specific_entity_name_arabic: targetSub },
        { specific_entity_name_english: { contains: targetSub, mode: 'insensitive' } },
      ];
      if (topic) {
        where.broad_topic = { slug: topic };
      }
      if (unit) {
        where.unit = { unit_number: parseInt(unit, 10) };
      }
    }

    // 6. Topic Mode
    else if (topic) {
      where.broad_topic = { slug: topic };
      if (unit) {
        where.unit = { unit_number: parseInt(unit, 10) };
      }
    }

    // 7. Unit Mode
    else if (unit) {
      where.unit = { unit_number: parseInt(unit, 10) };
    } else if (unitId) {
      where.unit_id = unitId;
    }

    // 8. Year Mode
    else if (year) {
      where.exam_paper = {
        year: parseInt(year, 10),
      };
    }

    const skip = (page - 1) * limit;

    const [questions, total] = await prisma.$transaction([
      prisma.question.findMany({
        where,
        orderBy: { original_question_number: 'asc' },
        skip,
        take: limit,
        select: {
          id: true,
          source_question_id: true,
          original_question_number: true,
          question_arabic: true,
          question_english: true,
          question_type: true,
          context_paragraph_arabic: true,
          context_paragraph_english: true,
          matching_table_arabic: true,
          matching_table_english: true,
          options_arabic: true,
          options_english: true,
          options_generated: true,
          correct_answer: true,
          correct_answer_text_arabic: true,
          correct_answer_text_english: true,
          explanation_arabic: true,
          explanation_english: true,
          unit_id: true,
          broad_topic_id: true,
          content_status: true,
          unit: {
            select: {
              name_arabic: true,
              name_english: true,
              unit_number: true,
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
          specific_entity_name_arabic: true,
          specific_entity_name_english: true,
          question_micro_focus_arabic: true,
          question_micro_focus_english: true,
          exam_paper: {
            select: {
              id: true,
              exam_name: true,
              year: true,
              session: true,
              paper_number: true,
              display_name: true,
            },
          },
        },
      }),
      prisma.question.count({ where }),
    ]);

    const normalizedQuestions = questions.map((q) => {
      const optAr = (q.options_arabic as any) || {};
      const optEn = (q.options_english as any) || {};

      const cleanOptAr: Record<string, string> = {};
      const cleanOptEn: Record<string, string> = {};

      for (const k of ['A', 'B', 'C', 'D']) {
        const valAr = optAr[k];
        if (typeof valAr === 'object' && valAr !== null) {
          cleanOptAr[k] = valAr.arabic || valAr.text || '';
          if (!optEn[k] && valAr.english) {
            cleanOptEn[k] = valAr.english;
          }
        } else {
          cleanOptAr[k] = typeof valAr === 'string' ? valAr : '';
        }

        const valEn = optEn[k] ?? cleanOptEn[k];
        if (typeof valEn === 'object' && valEn !== null) {
          cleanOptEn[k] = valEn.english || valEn.text || '';
        } else if (typeof valEn === 'string' && valEn) {
          cleanOptEn[k] = valEn;
        }
      }

      return {
        ...q,
        options_arabic: cleanOptAr,
        options_english: Object.keys(cleanOptEn).length > 0 ? cleanOptEn : null,
      };
    });

    return NextResponse.json({
      data: normalizedQuestions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[API /questions] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
