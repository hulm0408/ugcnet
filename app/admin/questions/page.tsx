import { prisma } from '@/lib/db';
import { Layers, Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminQuestionsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 50;

  // Build the where clause for searching
  const where = query
    ? {
        OR: [
          { question_arabic: { contains: query, mode: 'insensitive' as const } },
          { id: { contains: query, mode: 'insensitive' as const } },
        ],
      }
    : {};

  // Fetch data and total count concurrently
  const [questions, totalQuestions] = await Promise.all([
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

  const totalPages = Math.ceil(totalQuestions / pageSize);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-stone-200/60">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
            Question Bank
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-primary/10 text-primary-dark border border-primary/20">
              {totalQuestions.toLocaleString()} Total
            </span>
          </h1>
          <p className="mt-2 text-base text-stone-500 font-medium">
            Manage, search, and verify the mapped 3,149 UGC NET Arabic questions.
          </p>
        </div>

        {/* Search form */}
        <form className="w-full md:w-96 relative group" action="/admin/questions">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-stone-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            name="query"
            defaultValue={query}
            placeholder="Search in Arabic or by ID..."
            className="block w-full pl-11 pr-4 py-3 border-2 border-stone-200 rounded-2xl leading-5 bg-white/50 backdrop-blur-sm placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-0 focus:border-primary transition-all text-sm font-medium"
          />
          <button type="submit" className="hidden" />
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-white/80 backdrop-blur-xl shadow-sm rounded-3xl border border-stone-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200/60">
            <thead className="bg-stone-50/80 backdrop-blur-sm">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Question ID / Source
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Mapping (Unit / Topic)
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-stone-500 uppercase tracking-wider" dir="rtl">
                  Question Text (Arabic)
                </th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-stone-100">
              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-stone-50/80 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-stone-900 group-hover:text-primary transition-colors">{q.source_question_id || 'N/A'}</div>
                    <div className="text-xs text-stone-400 font-medium truncate max-w-[150px]" title={q.id}>{q.id}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5 items-start">
                      {q.unit ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary-dark border border-primary/20 w-max shadow-sm">
                          Unit {q.unit.unit_number}: {q.unit.name_english}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-stone-100 text-stone-600 border border-stone-200 w-max shadow-sm">
                          Unmapped Unit
                        </span>
                      )}
                      {q.broad_topic ? (
                        <span className="text-xs font-medium text-slate-500 truncate max-w-[200px] flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                          {q.broad_topic.name_english}
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-slate-400 italic">No broad topic</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right" dir="rtl">
                    <div className="text-sm font-arabic text-slate-800 leading-relaxed max-w-md ml-auto line-clamp-2" title={q.question_arabic}>
                      {q.question_arabic}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${
                      q.content_status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                      q.content_status === 'DRAFT' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                      'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {q.content_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {questions.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center bg-slate-50/50">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-slate-100">
              <Layers className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No questions found</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm">
              We couldn't find any questions matching "{query}". Try adjusting your search term.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-bold text-slate-900">{Math.min(currentPage * pageSize, totalQuestions)}</span> of <span className="font-bold text-slate-900">{totalQuestions}</span> questions
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/questions?page=${Math.max(1, currentPage - 1)}${query ? `&query=${encodeURIComponent(query)}` : ''}`}
                className={`p-2 rounded-xl border border-slate-200 flex items-center justify-center transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm'}`}
                aria-disabled={currentPage === 1}
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <Link
                href={`/admin/questions?page=${Math.min(totalPages, currentPage + 1)}${query ? `&query=${encodeURIComponent(query)}` : ''}`}
                className={`p-2 rounded-xl border border-slate-200 flex items-center justify-center transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm'}`}
                aria-disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
