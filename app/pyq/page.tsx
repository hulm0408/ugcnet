import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, FileText, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import ArchBookQuillSvg from '@/components/ui/ArchBookQuillSvg';
import prisma from '@/lib/db';
import { getActiveSubjectServer } from '@/lib/subjectContext';

export async function generateMetadata(): Promise<Metadata> {
  const activeSubject = await getActiveSubjectServer();
  return {
    title: `PYQs — ${activeSubject.name} Previous Year Questions`,
    description: `Browse UGC NET ${activeSubject.name} Previous Year Questions with official answer keys.`,
  };
}

export const dynamic = 'force-dynamic';

export default async function PYQPage() {
  const activeSubject = await getActiveSubjectServer();

  const [papers, totalQuestions, freeBenchmarkPaper] = await Promise.all([
    prisma.examPaper.findMany({
      where: { content_status: 'PUBLISHED', subject_id: activeSubject.id },
      select: { id: true, year: true, total_questions: true, is_free_benchmark: true, display_name: true },
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
    if (!acc[p.year]) acc[p.year] = { year: p.year, paperCount: 0, hasFreeBenchmark: false };
    acc[p.year].paperCount++;
    if (p.is_free_benchmark) acc[p.year].hasFreeBenchmark = true;
    return acc;
  }, {} as Record<number, { year: number; paperCount: number; hasFreeBenchmark: boolean }>);

  const years = Object.values(yearStats).sort((a, b) => b.year - a.year);
  const totalYears = years.length;

  return (
    <div className="flex-1 bg-stone-50 min-h-screen font-sans">
      {/* 01. PYQs - LANDING PAGE HERO SECTION */}
      <div className="bg-[#0A231C] text-stone-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 flex flex-col lg:flex-row items-center">
          {/* Left Text Content */}
          <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles size={13} /> {activeSubject.name} (Code {activeSubject.code})
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              {activeSubject.name} Previous Year Papers
            </h1>

            {activeSubject.name_native && (
              <p
                dir={activeSubject.direction}
                className={`text-2xl lg:text-3xl text-[#D97706] mb-6 drop-shadow-md font-bold ${
                  activeSubject.direction === 'rtl' ? 'font-arabic' : 'font-sans'
                }`}
              >
                {activeSubject.name_native}
              </p>
            )}

            <p className="text-lg text-emerald-100/80 mb-8 max-w-xl mx-auto lg:mx-0">
              Practice authentic UGC NET {activeSubject.name} questions from past examination cycles.
            </p>

            {freeBenchmarkPaper && (
              <div className="mb-8">
                <Link
                  href={`/practice?paperId=${freeBenchmarkPaper.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all"
                >
                  <Sparkles size={16} /> Take {freeBenchmarkPaper.display_name} (Free Benchmark Exam)
                </Link>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-primary/20 border border-primary/40 rounded-2xl p-5 text-center backdrop-blur-md shadow-lg">
                <div className="text-3xl font-black text-white mb-1 drop-shadow-sm">{totalYears}</div>
                <div className="text-xs text-primary-light/80 uppercase tracking-wider font-semibold">Years</div>
              </div>
              <div className="bg-primary/20 border border-primary/40 rounded-2xl p-5 text-center backdrop-blur-md shadow-lg">
                <div className="text-3xl font-black text-white mb-1 drop-shadow-sm">{totalPapers}</div>
                <div className="text-xs text-primary-light/80 uppercase tracking-wider font-semibold">Papers</div>
              </div>
              <div className="bg-primary/20 border border-primary/40 rounded-2xl p-5 text-center backdrop-blur-md shadow-lg">
                <div className="text-3xl font-black text-white mb-1 drop-shadow-sm">
                  {totalQuestions.toLocaleString()}
                </div>
                <div className="text-xs text-primary-light/80 uppercase tracking-wider font-semibold">Questions</div>
              </div>
              <div className="bg-primary/20 border border-primary/40 rounded-2xl p-5 text-center backdrop-blur-md shadow-lg">
                <div className="text-3xl font-black text-white mb-1 drop-shadow-sm">100%</div>
                <div className="text-xs text-primary-light/80 uppercase tracking-wider font-semibold">Real Exam</div>
              </div>
            </div>
          </div>

          {/* Right Graphic */}
          <div className="w-full lg:w-[450px] shrink-0 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/30 rounded-full blur-[100px]" />
            <ArchBookQuillSvg className="w-full h-auto drop-shadow-2xl relative z-10" />
          </div>
        </div>
      </div>

      {/* PAPERS SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-black text-stone-900 mb-6">Select Examination Year</h2>

        {years.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {years.map((y) => (
              <Link
                key={y.year}
                href={`/pyq/${y.year}`}
                className={`bg-white rounded-3xl p-6 border shadow-sm hover:shadow-xl transition-all group relative overflow-hidden flex flex-col justify-between ${
                  y.hasFreeBenchmark
                    ? 'border-emerald-300 ring-2 ring-emerald-500/20'
                    : 'border-stone-200/80 hover:border-primary/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-stone-900 group-hover:text-primary transition-colors">
                      {y.year}
                    </span>
                    {y.hasFreeBenchmark && (
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                        Free Mock
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-stone-500">
                    {y.paperCount} {y.paperCount === 1 ? 'Exam Paper' : 'Exam Papers'}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-4 border-t border-stone-100 text-xs font-bold text-stone-600 group-hover:text-primary transition-colors">
                  <span>Browse Papers</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/80 p-8">
            <Calendar size={36} className="mx-auto text-stone-300 mb-3" />
            <h3 className="text-lg font-bold text-stone-800">
              Past Papers for {activeSubject.name} Coming Soon!
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
              Our content team is currently curating and verifying previous year questions for {activeSubject.name}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
