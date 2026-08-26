import { prisma } from '@/lib/db';
import { Layers, Search, ChevronLeft, ChevronRight, FileQuestion } from 'lucide-react';
import Link from 'next/link';
import { buildArabicRegexPattern } from '@/lib/arabicUtils';

export const dynamic = 'force-dynamic';

export default async function AdminQuestionsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query?.trim() || '';
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 50;

  const isArabic = /[\u0600-\u06FF]/.test(query);

  let questions: any[] = [];
  let totalQuestions = 0;

  if (isArabic && query) {
    const pattern = buildArabicRegexPattern(query);
    const countResult = await prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(*)::bigint as count
       FROM "Question"
       WHERE question_arabic ~* $1 OR specific_entity_name_arabic ~* $1 OR question_micro_focus_arabic ~* $1;`,
      pattern
    );
    totalQuestions = Number(countResult[0]?.count || 0);

    const offset = (currentPage - 1) * pageSize;
    const rows = await prisma.$queryRawUnsafe<any[]>(
      `SELECT q.id, q.source_question_id, q.original_question_number,
              q.question_arabic, q.question_english, q.content_status,
              u.name_english as "unit_name_english", u.unit_number as "unit_unit_number",
              bt.name_english as "broad_topic_name_english"
       FROM "Question" q
       LEFT JOIN "SyllabusUnit" u ON q.unit_id = u.id
       LEFT JOIN "BroadTopic" bt ON q.broad_topic_id = bt.id
       WHERE q.question_arabic ~* $1 OR q.specific_entity_name_arabic ~* $1 OR q.question_micro_focus_arabic ~* $1
       ORDER BY q.created_at DESC
       LIMIT ${pageSize} OFFSET ${offset};`,
      pattern
    );

    questions = rows.map((r) => ({
      id: r.id,
      source_question_id: r.source_question_id,
      original_question_number: r.original_question_number,
      question_arabic: r.question_arabic,
      question_english: r.question_english,
      content_status: r.content_status,
      unit: r.unit_name_english
        ? {
            unit_number: r.unit_unit_number,
            name_english: r.unit_name_english,
          }
        : null,
      broad_topic: r.broad_topic_name_english
        ? {
            name_english: r.broad_topic_name_english,
          }
        : null,
    }));
  } else {
    // Build the where clause for searching
    const where = query
      ? {
          OR: [
            { question_arabic: { contains: query, mode: 'insensitive' as const } },
            { id: { contains: query, mode: 'insensitive' as const } },
            { source_question_id: { contains: query, mode: 'insensitive' as const } },
            { question_english: { contains: query, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [prismaQuestions, count] = await Promise.all([
      prisma.question.findMany({
        where,
        take: pageSize,
        skip: (currentPage - 1) * pageSize,
        orderBy: { created_at: 'desc' },
        include: {
          unit: true,
          broad_topic: true,
        },
      }),
      prisma.question.count({ where }),
    ]);

    questions = prismaQuestions;
    totalQuestions = count;
  }

  const totalPages = Math.ceil(totalQuestions / pageSize);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <FileQuestion size={13} />
            <span>Question Bank</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            Questions Repository
            <span className="text-xs font-mono font-bold text-stone-400 bg-stone-900 border border-stone-800 px-2.5 py-1 rounded-lg">
              {totalQuestions.toLocaleString()} Total
            </span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-400 font-medium">
            Search in Arabic, English, or by Question ID.
          </p>
        </div>

        {/* Search form */}
        <form className="w-full md:w-80 relative" action="/admin/questions">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="text"
            name="query"
            defaultValue={query}
            placeholder="Search Arabic keywords or ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-all font-medium"
          />
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-stone-800 text-left text-xs text-stone-300">
            <thead className="bg-stone-950/60 font-mono text-[10px] text-stone-400 uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-5 py-3.5">
                  Question ID / Source
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Mapping (Unit / Topic)
                </th>
                <th scope="col" className="px-5 py-3.5 text-right" dir="rtl">
                  Question Text (Arabic)
                </th>
                <th scope="col" className="px-4 py-3.5 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-medium">
              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-stone-800/40 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-xs font-bold text-white">{q.source_question_id || 'N/A'}</div>
                    <div className="text-[10px] text-stone-500 font-mono truncate max-w-[120px]" title={q.id}>
                      {q.id}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1 items-start">
                      {q.unit ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Unit {q.unit.unit_number}: {q.unit.name_english}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-800 text-stone-400">
                          Unmapped
                        </span>
                      )}
                      {q.broad_topic && (
                        <span className="text-[11px] text-stone-400 truncate max-w-[180px]">
                          {q.broad_topic.name_english}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right" dir="rtl">
                    <div className="font-arabic font-semibold text-stone-200 text-sm max-w-md truncate leading-relaxed">
                      {q.question_arabic}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {q.content_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 bg-stone-950/40 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <div>
              Showing Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
            </div>
            <div className="flex gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/admin/questions?page=${currentPage - 1}${query ? `&query=${encodeURIComponent(query)}` : ''}`}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg font-bold flex items-center gap-1"
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`/admin/questions?page=${currentPage + 1}${query ? `&query=${encodeURIComponent(query)}` : ''}`}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg font-bold flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
