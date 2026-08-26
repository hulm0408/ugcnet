import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, FileText, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import ArchBookQuillSvg from '@/components/ui/ArchBookQuillSvg';
import prisma from '@/lib/db';
import { getActiveSubjectServer } from '@/lib/subjectContext';

export async function generateMetadata(): Promise<Metadata> {
  const activeSubject = await getActiveSubjectServer();
  return {
    title: `Official UGC NET ${activeSubject.name} Previous Year Papers (PYQs) | Solved with NTA Keys`,
    description: `Practice official UGC NET ${activeSubject.name} Previous Year Papers (2004–2024). Reconciled with NTA final official answer keys, full explanations, and CBT timed test mode.`,
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
    if (!acc[p.year]) acc[p.year] = { year: p.year, paperCount: 0, hasFreeBenchmark: false, totalQ: 0 };
    acc[p.year].paperCount++;
    acc[p.year].totalQ += (p.total_questions || 50);
    if (p.is_free_benchmark) acc[p.year].hasFreeBenchmark = true;
    return acc;
  }, {} as Record<number, { year: number; paperCount: number; hasFreeBenchmark: boolean; totalQ: number }>);

  const years = Object.values(yearStats).sort((a, b) => b.year - a.year);
  const totalYears = years.length;

  return (
    <div className="flex-1 bg-[#F8F9FA] text-[#202124] min-h-screen font-sans">
      {/* 01. PYQs - LANDING PAGE HERO SECTION */}
      <div className="bg-white overflow-hidden relative border-b border-[#DADCE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0FE] border border-[#D2E3FC] text-[#1A73E8] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={14} className="text-[#1A73E8]" />
              UGC NET • NTA OFFICIAL PAPERS • CODE {activeSubject.code}
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#202124] leading-tight">
              {activeSubject.name} Previous Year Papers
            </h1>

            {activeSubject.name_native && (
              <p
                dir={activeSubject.direction}
                className={`text-2xl lg:text-3xl text-[#1A73E8] font-bold ${
                  activeSubject.direction === 'rtl' ? 'font-arabic' : 'font-serif'
                }`}
              >
                {activeSubject.name_native}
              </p>
            )}

            <p className="text-sm sm:text-base text-[#5F6368] leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Complete archive of official UGC NET examination papers. Fully solved and reconciled with NTA final official answer keys.
            </p>

            {/* Official NTA Badges Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-[11px] font-bold text-[#5F6368]">
              <span className="bg-[#F8F9FA] px-3 py-1 rounded-lg border border-[#DADCE0] text-[#5F6368]">
                ✓ Reconciled with NTA Final Key
              </span>
              <span className="bg-[#F8F9FA] px-3 py-1 rounded-lg border border-[#DADCE0] text-[#5F6368]">
                ✓ Full CBT Simulator
              </span>
              <span className="bg-[#F8F9FA] px-3 py-1 rounded-lg border border-[#DADCE0] text-[#5F6368]">
                ✓ Bilingual Explanations
              </span>
            </div>

            {freeBenchmarkPaper && (
              <div className="pt-3">
                <Link
                  href={`/practice?paperId=${freeBenchmarkPaper.id}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1A73E8] hover:bg-[#1557B0] text-white font-bold text-sm rounded-xl shadow-sm transition-all active:scale-95"
                >
                  <Sparkles size={16} /> Take {freeBenchmarkPaper.display_name} (100% Free Benchmark Mock)
                </Link>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 pt-4">
              <div className="bg-white border border-[#DADCE0] rounded-2xl p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-[#202124]">{totalYears}</div>
                <div className="text-[11px] text-[#1A73E8] uppercase tracking-wider font-bold mt-0.5">Exam Cycles</div>
              </div>
              <div className="bg-white border border-[#DADCE0] rounded-2xl p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-[#202124]">{totalPapers}</div>
                <div className="text-[11px] text-[#1A73E8] uppercase tracking-wider font-bold mt-0.5">Papers</div>
              </div>
              <div className="bg-white border border-[#DADCE0] rounded-2xl p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-[#202124]">
                  {totalQuestions.toLocaleString()}
                </div>
                <div className="text-[11px] text-[#1A73E8] uppercase tracking-wider font-bold mt-0.5">Solved Qs</div>
              </div>
            </div>
          </div>

          {/* Right SVG */}
          <div className="w-full max-w-sm lg:max-w-md shrink-0 flex justify-center text-[#1A73E8]">
            <ArchBookQuillSvg className="w-full h-auto max-h-[280px]" />
          </div>
        </div>
      </div>

      {/* 02. YEAR-WISE PAPERS ARCHIVE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#202124] tracking-tight">
              Select Examination Year
            </h2>
            <p className="text-[#5F6368] text-xs sm:text-sm mt-1 font-medium">
              Click on any examination year to choose the specific paper (e.g. Part 1, Part 2, or Paper III).
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-[#5F6368]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E8E3E]" /> Free Benchmark
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1A73E8]" /> Pro Pass
            </span>
          </div>
        </div>

        {/* Years Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {years.map((y) => (
            <Link
              key={y.year}
              href={`/pyq/${y.year}`}
              className={`group p-6 rounded-2xl border transition-all duration-200 relative overflow-hidden bg-white ${
                y.hasFreeBenchmark
                  ? 'border-[#34A853]/60 hover:border-[#34A853] hover:shadow-md'
                  : 'border-[#DADCE0] hover:border-[#1A73E8] hover:shadow-md'
              }`}
            >
              {y.hasFreeBenchmark && (
                <div className="absolute top-0 right-0 bg-[#E6F4EA] text-[#1E8E3E] text-[10px] font-bold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                  FREE BENCHMARK
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] border border-[#DADCE0] group-hover:bg-[#E8F0FE] group-hover:text-[#1A73E8] text-[#5F6368] flex items-center justify-center font-bold text-sm transition-colors">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#202124] group-hover:text-[#1A73E8] transition-colors">
                      {y.year}
                    </div>
                    <div className="text-[11px] text-[#5F6368] font-bold uppercase tracking-wider">
                      UGC NET Cycle
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#DADCE0] text-xs">
                <div className="flex justify-between text-[#5F6368] font-medium">
                  <span>Available Papers:</span>
                  <span className="font-bold text-[#202124]">{y.paperCount} {y.paperCount === 1 ? 'Paper' : 'Papers'}</span>
                </div>
                <div className="flex justify-between text-[#5F6368] font-medium">
                  <span>Total Questions:</span>
                  <span className="font-bold text-[#1A73E8]">{y.totalQ} Solved Qs</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#DADCE0] flex items-center justify-between text-xs font-bold text-[#1A73E8] group-hover:text-[#1557B0]">
                <span>Choose Paper</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
