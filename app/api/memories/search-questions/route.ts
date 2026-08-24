import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';
import { normalizeArabicText } from '@/lib/arabicUtils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || searchParams.get('query') || '';
    const excludeId = searchParams.get('excludeId');
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));

    if (!query.trim()) {
      // Return recent published questions
      const recent = await prisma.question.findMany({
        where: {
          content_status: 'PUBLISHED',
          ...(excludeId ? { id: { not: excludeId } } : {}),
        },
        take: limit,
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          original_question_number: true,
          question_arabic: true,
          question_english: true,
          specific_entity_name_arabic: true,
          question_micro_focus_arabic: true,
          exam_paper: {
            select: {
              year: true,
              paper_number: true,
            },
          },
          unit: {
            select: {
              unit_number: true,
              name_english: true,
            },
          },
        },
      });

      return NextResponse.json({ data: recent });
    }

    const normalizedQ = normalizeArabicText(query.toLowerCase());

    // Search questions
    const results = await prisma.question.findMany({
      where: {
        content_status: 'PUBLISHED',
        ...(excludeId ? { id: { not: excludeId } } : {}),
        OR: [
          { question_arabic: { contains: query } },
          { question_english: { contains: query, mode: 'insensitive' } },
          { specific_entity_name_arabic: { contains: query } },
          { specific_entity_name_english: { contains: query, mode: 'insensitive' } },
          { question_micro_focus_arabic: { contains: query } },
        ],
      },
      take: limit * 2,
      select: {
        id: true,
        original_question_number: true,
        question_arabic: true,
        question_english: true,
        specific_entity_name_arabic: true,
        question_micro_focus_arabic: true,
        exam_paper: {
          select: {
            year: true,
            paper_number: true,
          },
        },
        unit: {
          select: {
            unit_number: true,
            name_english: true,
          },
        },
      },
    });

    // Score / re-rank based on normalized Arabic text
    const matched = results.filter((q) => {
      const qArNorm = normalizeArabicText(q.question_arabic?.toLowerCase() || '');
      const entityArNorm = normalizeArabicText(q.specific_entity_name_arabic?.toLowerCase() || '');
      const focusArNorm = normalizeArabicText(q.question_micro_focus_arabic?.toLowerCase() || '');
      const qEnNorm = (q.question_english || '').toLowerCase();

      return (
        qArNorm.includes(normalizedQ) ||
        entityArNorm.includes(normalizedQ) ||
        focusArNorm.includes(normalizedQ) ||
        qEnNorm.includes(query.toLowerCase())
      );
    }).slice(0, limit);

    return NextResponse.json({ data: matched });
  } catch (error) {
    console.error('[API /memories/search-questions] Error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
