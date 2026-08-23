import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paperId = searchParams.get('paperId');
    const unitId = searchParams.get('unitId');
    const unit = searchParams.get('unit');
    const topic = searchParams.get('topic');
    const subtopic = searchParams.get('subtopic');
    const year = searchParams.get('year');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 250);
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);

    // Filter construction — always scope to PUBLISHED
    const where: Record<string, unknown> = {
      content_status: 'PUBLISHED',
    };

    if (paperId) {
      where.exam_paper_id = paperId;
    }

    if (unitId) {
      where.unit_id = unitId;
    }

    if (unit) {
      where.unit = { unit_number: parseInt(unit, 10) };
    }
    
    if (topic) {
      where.broad_topic = { slug: topic };
    }
    
    if (subtopic) {
      where.subtopic = { slug: subtopic };
    }

    if (year && !paperId) {
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
          unit_id: true,
          broad_topic_id: true,
          content_status: true,
          unit: {
            select: {
              name_arabic: true,
              name_english: true,
              unit_number: true
            }
          },
          broad_topic: {
            select: {
              name_arabic: true,
              name_english: true
            }
          },
          subtopic: {
            select: {
              name_arabic: true,
              name_english: true
            }
          },
          specific_entity_name_arabic: true,
          specific_entity_name_english: true,
          question_micro_focus_arabic: true,
          question_micro_focus_english: true,
          exam_paper: {
            select: {
              exam_name: true,
              year: true,
              session: true,
              paper_number: true,
            },
          },
        },
      }),
      prisma.question.count({ where }),
    ]);

    return NextResponse.json({
      data: questions,
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
