import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, FileText, ArrowRight, Sparkles, ShieldCheck, Play, BookOpen } from 'lucide-react';
import prisma from '@/lib/db';
import { getActiveSubjectServer } from '@/lib/subjectContext';
import PyqDrillDownPicker from '@/components/pyq/PyqDrillDownPicker';

export async function generateMetadata(): Promise<Metadata> {
  const activeSubject = await getActiveSubjectServer();
  return {
    title: `Official UGC NET ${activeSubject.name} Previous Year Papers (PYQs) | Solved with NTA Keys`,
    description: `Practice official UGC NET ${activeSubject.name} Previous Year Papers (2004–2023). Reconciled with NTA final official answer keys, full explanations, and CBT timed test mode.`,
  };
}

export const dynamic = 'force-dynamic';

export default async function PYQPage() {
  const activeSubject = await getActiveSubjectServer();

  const [papers, totalQuestions, freeBenchmarkPaper] = await Promise.all([
    prisma.examPaper.findMany({
      where: { content_status: 'PUBLISHED', subject_id: activeSubject.id },
      select: {
        id: true,
        year: true,
        paper_number: true,
        total_questions: true,
        is_free_benchmark: true,
        display_name: true,
        access_tier: true,
        session: true,
        is_paper_iii: true,
      },
      orderBy: [{ year: 'desc' }, { paper_number: 'asc' }],
    }),
    prisma.question.count({
      where: { content_status: 'PUBLISHED', subject_id: activeSubject.id },
    }),
    prisma.examPaper.findFirst({
      where: { subject_id: activeSubject.id, is_free_benchmark: true },
    }),
  ]);

  const totalPapers = papers.length;

  const yearStats = papers.reduce((acc, p) => {
    if (!acc[p.year]) {
      acc[p.year] = {
        year: p.year,
        paperCount: 0,
        hasFreeBenchmark: false,
        totalQ: 0,
        papers: [],
      };
    }
    acc[p.year].paperCount++;
    acc[p.year].totalQ += (p.total_questions || 50);
    acc[p.year].papers.push(p);
    if (p.is_free_benchmark) acc[p.year].hasFreeBenchmark = true;
    return acc;
  }, {} as Record<number, { year: number; paperCount: number; hasFreeBenchmark: boolean; totalQ: number; papers: typeof papers }>);

  const years = Object.values(yearStats).sort((a, b) => b.year - a.year);
  const yearsList = years.map((y) => y.year);
  const totalYears = years.length;

  const pickerPapers = papers.map((p) => ({
    id: p.id,
    year: p.year,
    paperNumber: p.paper_number,
    displayName: p.display_name,
    session: p.session,
    totalQuestions: p.total_questions,
    isPaperIII: p.is_paper_iii,
  }));

  return (
    <div className="flex-1 bg-[#F8FAFC] text-slate-900 min-h-screen font-sans">
      
      {/* ── 1. PYQ HERO SECTION ── */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center sm:text-left">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={14} className="text-emerald-700" />
              <span>NTA Official Archive • Code {activeSubject.code}</span>
            </div>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-xs font-bold text-slate-500">2004–2023 All Papers</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight">
                {activeSubject.name} Previous Year Papers
              </h1>

              {activeSubject.name_native && (
                <div
                  dir={activeSubject.direction}
                  className="text-lg sm:text-xl text-emerald-700 font-bold font-arabic"
                >
                  {activeSubject.name_native} — الأوراق السابقة والحلول الرسمية
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Complete archive of {totalPapers} historical examination papers with {totalQuestions.toLocaleString()}+ solved questions. Reconciled with NTA final official answer keys.
              </p>
            </div>

            {/* Stats Pill Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-center min-w-[90px]">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-sans">
                  {totalYears}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Exam Cycles
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-center min-w-[90px]">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-sans">
                  {totalPapers}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Papers
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-center min-w-[100px]">
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 font-sans">
                  {totalQuestions.toLocaleString()}
                </div>
                <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Solved Qs
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* ── 2. INTERACTIVE DRILL-DOWN PICKER ── */}
        <PyqDrillDownPicker papers={pickerPapers} years={yearsList} />

        {/* ── 3. YEAR-BY-YEAR PAPERS GRID ── */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
                All Examination Cycles (2004–2023)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Click any year card to access individual papers, CBT mock tests, or study solutions.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Free Benchmark
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Pro Pass
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {years.map((y) => {
              const firstPaper = y.papers[0];

              return (
                <div
                  key={y.year}
                  className={`bg-white rounded-2xl border transition-all duration-200 p-5 shadow-xs hover:shadow-md flex flex-col justify-between space-y-4 group ${
                    y.hasFreeBenchmark
                      ? 'border-emerald-300 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-emerald-500/80'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-700 text-slate-600 flex items-center justify-center font-bold text-sm transition-colors border border-slate-200/80">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <div className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-sans">
                            {y.year}
                          </div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                            UGC NET Cycle
                          </div>
                        </div>
                      </div>

                      {y.hasFreeBenchmark && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider border border-emerald-300">
                          Free Mock
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                      <div className="flex justify-between text-slate-600 font-medium">
                        <span>Papers Available:</span>
                        <span className="font-bold text-slate-900">
                          {y.paperCount} {y.paperCount === 1 ? 'Paper' : 'Papers'}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-600 font-medium">
                        <span>Total Solved Qs:</span>
                        <span className="font-bold text-emerald-700">{y.totalQ} Qs</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar on Card */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      href={`/pyq/${y.year}`}
                      className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl text-center transition-colors inline-flex items-center justify-center gap-1"
                    >
                      <span>Choose</span>
                      <ArrowRight size={12} />
                    </Link>

                    {firstPaper && (
                      <Link
                        href={`/practice?paperId=${firstPaper.id}&year=${y.year}&type=mock`}
                        className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl text-center transition-colors shadow-2xs inline-flex items-center gap-1"
                        title="Start CBT Mock"
                      >
                        <Play size={11} fill="currentColor" />
                        <span>Mock</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
