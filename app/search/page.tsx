import type { Metadata } from 'next';
import prisma from '@/lib/db';
import SearchClient from './SearchClient';
import { Search, Sparkles } from 'lucide-react';
import { buildArabicRegexPattern } from '@/lib/arabicUtils';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; unit?: string; year?: string }>;
}): Promise<Metadata> {
  const resolved = await searchParams;
  const q = resolved.q || '';
  return {
    title: q ? `Search results for "${q}" | Arabic NET/JRF` : 'Search Questions | Arabic NET/JRF',
    description: 'Search 3,150+ official UGC NET Arabic previous year questions by author, poem, year, or keyword.',
  };
}

export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; unit?: string; year?: string; page?: string }>;
}) {
  const resolved = await searchParams;
  const query = resolved.q?.trim() || '';
  const unitNum = resolved.unit ? parseInt(resolved.unit, 10) : undefined;
  const yearNum = resolved.year ? parseInt(resolved.year, 10) : undefined;
  const page = Math.max(parseInt(resolved.page || '1', 10), 1);
  const pageSize = 20;

  const isArabic = /[\u0600-\u06FF]/.test(query);

  let questions: any[] = [];
  let totalCount = 0;

  if (query || unitNum || yearNum) {
    if (isArabic && query) {
      const pattern = buildArabicRegexPattern(query);
      
      // SQL conditions for Arabic regex search
      const conditions: string[] = ["q.content_status = 'PUBLISHED'"];
      const sqlParams: any[] = [pattern];
      let paramIdx = 2;

      conditions.push(
        `(q.question_arabic ~* $1 OR q.specific_entity_name_arabic ~* $1 OR q.question_micro_focus_arabic ~* $1)`
      );

      if (unitNum) {
        conditions.push(`u.unit_number = $${paramIdx}`);
        sqlParams.push(unitNum);
        paramIdx++;
      }

      if (yearNum) {
        conditions.push(`p.year = $${paramIdx}`);
        sqlParams.push(yearNum);
        paramIdx++;
      }

      const whereClause = conditions.join(' AND ');

      const countResult = await prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
        `SELECT COUNT(*)::bigint as count
         FROM "Question" q
         LEFT JOIN "SyllabusUnit" u ON q.unit_id = u.id
         LEFT JOIN "ExamPaper" p ON q.exam_paper_id = p.id
         WHERE ${whereClause};`,
        ...sqlParams
      );
      totalCount = Number(countResult[0]?.count || 0);

      const offset = (page - 1) * pageSize;
      const rows = await prisma.$queryRawUnsafe<any[]>(
        `SELECT 
           q.id, q.source_question_id, q.original_question_number,
           q.question_arabic, q.question_english,
           q.options_arabic, q.options_english,
           q.correct_answer, q.correct_answer_text_arabic,
           q.specific_entity_name_arabic, q.specific_entity_name_english,
           q.question_micro_focus_arabic, q.question_micro_focus_english,
           u.unit_number as "unit_unit_number", u.name_english as "unit_name_english", u.name_arabic as "unit_name_arabic",
           p.year as "paper_year", p.paper_number as "paper_number", p.display_name as "paper_display_name"
         FROM "Question" q
         LEFT JOIN "SyllabusUnit" u ON q.unit_id = u.id
         LEFT JOIN "ExamPaper" p ON q.exam_paper_id = p.id
         WHERE ${whereClause}
         ORDER BY p.year DESC, q.original_question_number ASC
         LIMIT ${pageSize} OFFSET ${offset};`,
        ...sqlParams
      );

      questions = rows.map((r) => ({
        id: r.id,
        source_question_id: r.source_question_id,
        original_question_number: r.original_question_number,
        question_arabic: r.question_arabic,
        question_english: r.question_english,
        options_arabic: r.options_arabic,
        options_english: r.options_english,
        correct_answer: r.correct_answer,
        correct_answer_text_arabic: r.correct_answer_text_arabic,
        specific_entity_name_arabic: r.specific_entity_name_arabic,
        specific_entity_name_english: r.specific_entity_name_english,
        question_micro_focus_arabic: r.question_micro_focus_arabic,
        question_micro_focus_english: r.question_micro_focus_english,
        unit: r.unit_unit_number
          ? {
              unit_number: r.unit_unit_number,
              name_english: r.unit_name_english,
              name_arabic: r.unit_name_arabic,
            }
          : null,
        exam_paper: {
          year: r.paper_year,
          paper_number: r.paper_number,
          display_name: r.paper_display_name,
        },
      }));
    } else {
      // Prisma where clause for English or filter-only queries
      const where: any = { content_status: 'PUBLISHED' };

      if (unitNum) where.unit = { unit_number: unitNum };
      if (yearNum) where.exam_paper = { year: yearNum };

      if (query) {
        where.OR = [
          { question_english: { contains: query, mode: 'insensitive' } },
          { specific_entity_name_english: { contains: query, mode: 'insensitive' } },
          { question_micro_focus_english: { contains: query, mode: 'insensitive' } },
          { source_question_id: { contains: query, mode: 'insensitive' } },
        ];
      }

      const [prismaQuestions, count] = await Promise.all([
        prisma.question.findMany({
          where,
          take: pageSize,
          skip: (page - 1) * pageSize,
          orderBy: { exam_paper: { year: 'desc' } },
          include: {
            unit: { select: { unit_number: true, name_english: true, name_arabic: true } },
            broad_topic: { select: { name_english: true, name_arabic: true } },
            subtopic: { select: { name_english: true, name_arabic: true } },
            exam_paper: { select: { year: true, paper_number: true, display_name: true } },
          },
        }),
        prisma.question.count({ where }),
      ]);

      questions = prismaQuestions;
      totalCount = count;
    }
  }

  const [units, years] = await Promise.all([
    prisma.syllabusUnit.findMany({
      orderBy: { unit_number: 'asc' },
      select: { unit_number: true, name_english: true, name_arabic: true },
    }),
    prisma.examPaper.findMany({
      where: { content_status: 'PUBLISHED' },
      select: { year: true },
      distinct: ['year'],
      orderBy: { year: 'desc' },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex-1 min-h-screen bg-[#FCFAF8] pt-10 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-1.5">
            <Sparkles size={16} /> Question Discovery Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Search Question Bank
          </h1>
          <p className="text-stone-500 font-medium text-sm sm:text-base mt-1">
            Instant search across all 3,150+ official UGC NET Arabic previous year questions.
          </p>
        </div>

        {/* Search & Results Client */}
        <SearchClient
          initialQuery={query}
          initialUnit={unitNum}
          initialYear={yearNum}
          questions={questions as any}
          totalCount={totalCount}
          currentPage={page}
          totalPages={totalPages}
          units={units}
          years={years.map((y) => y.year)}
        />

      </div>
    </div>
  );
}
