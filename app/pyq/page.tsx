import type { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/db';
import { BookMarked, Calendar, FileText, ChevronRight, History } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PYQ Years — Browse Previous Year Questions',
  description: 'Browse UGC NET Arabic Previous Year Questions year-wise from 2004 to 2023. Paper II and Paper III.',
};

export const dynamic = 'force-dynamic';

export default async function PYQPage() {
  const papers = await prisma.examPaper.findMany({
    where: { content_status: 'PUBLISHED' },
    orderBy: [
      { year: 'desc' },
      { exam_date: 'desc' }
    ],
    include: {
      _count: {
        select: { questions: { where: { content_status: 'PUBLISHED' } } }
      }
    }
  });

  // Group papers by year
  const groupedPapers = papers.reduce((acc, paper) => {
    if (!acc[paper.year]) {
      acc[paper.year] = [];
    }
    acc[paper.year].push(paper);
    return acc;
  }, {} as Record<number, typeof papers>);

  const years = Object.keys(groupedPapers).map(Number).sort((a, b) => b - a);

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      
      {/* ── Header Section ── */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-md">
            <History size={16} className="text-purple-400" />
            <span className="text-slate-300">Archive & Analytics</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Previous Year <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Questions</span>
          </h1>
          <p dir="rtl" lang="ar" className="font-arabic text-2xl text-slate-300 mb-2">
            أسئلة السنوات السابقة
          </p>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Browse all UGC NET Arabic PYQs. Select a paper to view and practice its questions under authentic exam conditions.
          </p>
        </div>
      </section>

      {/* ── Content Section ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-8">
          {years.map((year) => (
            <div key={year} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group/year relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover/year:bg-purple-500 transition-colors" />
              <div className="bg-slate-50/80 px-8 py-5 border-b border-slate-200 flex items-center gap-4 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-200 text-slate-500 group-hover/year:text-purple-600 transition-colors">
                  <Calendar size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{year}</h2>
              </div>
              
              <div className="divide-y divide-slate-100">
                {groupedPapers[year].map((paper) => (
                  <Link
                    key={paper.id}
                    href={`/instructions/${paper.id}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0 border border-purple-100 shadow-sm group-hover:scale-105 transition-transform">
                        <FileText size={28} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xl group-hover:text-purple-600 transition-colors tracking-tight">
                          {paper.title_english || `UGC NET Arabic Paper - ${year}`}
                        </div>
                        {paper.title_arabic && (
                          <div dir="rtl" lang="ar" className="font-arabic text-slate-600 mt-2 text-lg">
                            {paper.title_arabic}
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs font-semibold text-slate-500">
                          {paper.shift && (
                            <span className="bg-white border border-slate-200 shadow-sm px-2.5 py-1 rounded-md text-slate-700 uppercase tracking-wider">
                              Shift: {paper.shift}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {paper._count.questions} / {paper.total_questions} Questions Available
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-purple-600 transition-colors mt-4 sm:mt-0 ml-19 sm:ml-0">
                      <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">Practice Now</span>
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          
          {years.length === 0 && (
            <div className="text-center p-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 text-slate-400">
                <FileText size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Papers Found</h3>
              <p className="text-slate-500 mt-2">Previous year papers have not been published yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
