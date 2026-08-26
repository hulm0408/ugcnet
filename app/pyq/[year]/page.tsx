import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Lock, Sparkles, CheckCircle2, Play, BookOpen } from 'lucide-react';
import YearFolderSvg from '@/components/ui/YearFolderSvg';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import { formatTestDuration } from '@/lib/dateUtils';
import { auth } from '@/lib/auth';
import { verifyPaperAccess } from '@/lib/accessControl';
import { getActiveSubjectServer } from '@/lib/subjectContext';

export const metadata: Metadata = {
  title: 'Select Paper — PYQs',
  description: 'Choose the specific paper or part for the selected year.',
};

export const dynamic = 'force-dynamic';

export default async function SelectYearPaperPage({ params }: { params: Promise<{ year: string }> }) {
  const resolvedParams = await params;
  const { year } = resolvedParams;
  const yearInt = parseInt(year, 10);
  if (isNaN(yearInt)) return notFound();

  const session = await auth();
  const userId = session?.user?.id;
  const activeSubject = await getActiveSubjectServer();

  // Fetch actual papers for this year and active subject from the database
  const dbPapers = await prisma.examPaper.findMany({
    where: {
      year: yearInt,
      content_status: 'PUBLISHED',
      subject_id: activeSubject.id,
    },
    orderBy: [{ is_paper_iii: 'asc' }, { id: 'asc' }],
  });

  const papersWithAccess = await Promise.all(
    dbPapers.map(async (paper) => {
      const duration = formatTestDuration(paper.total_questions);
      const isFree = paper.is_free_benchmark || paper.access_tier === 'FREE';
      const access = await verifyPaperAccess(userId, paper.id);

      return {
        id: paper.id,
        title: paper.display_name || paper.paper_number,
        subtitle: `(${paper.session || `UGC NET ${activeSubject.name}`})`,
        questions: paper.total_questions,
        marks: paper.total_questions * 2,
        durationText: duration.formattedText,
        shortDuration: duration.shortText,
        isFree,
        hasAccess: access.hasAccess,
      };
    })
  );

  return (
    <div className="flex-1 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/pyq" className="hover:text-emerald-700 transition-colors">
            PYQs ({activeSubject.name})
          </Link>
          <ChevronRight size={13} />
          <span className="font-bold text-slate-900">Year {year}</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 overflow-hidden relative gap-6">
          <div className="flex-1 relative z-10 space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider border border-emerald-200">
              Exam Cycle Archive
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight">
              {activeSubject.name} — Year {year}
            </h1>
            {activeSubject.name_native && (
              <p
                dir={activeSubject.direction}
                className={`text-xl sm:text-2xl font-bold text-emerald-700 font-arabic`}
              >
                {activeSubject.name_native} ({year})
              </p>
            )}
            <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-xl">
              Select the paper or part you want to practice under authentic NTA exam conditions with verified answer keys.
            </p>
          </div>

          <div className="w-full md:w-[280px] shrink-0 mt-4 md:mt-0 relative flex justify-center">
            <YearFolderSvg year={year} className="w-full h-auto max-h-[160px] drop-shadow-md" />
          </div>
        </div>

        {/* Papers Grid */}
        {papersWithAccess.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {papersWithAccess.map((paper) => (
              <div
                key={paper.id}
                className={`bg-white border rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between h-full space-y-4 ${
                  paper.isFree
                    ? 'border-emerald-300 ring-2 ring-emerald-500/20 hover:border-emerald-500'
                    : 'border-slate-200 hover:border-emerald-500/80'
                }`}
              >
                {/* Badge Header */}
                <div className="flex items-center justify-between gap-2">
                  {paper.isFree ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      <Sparkles size={11} className="text-emerald-700" /> Free Benchmark
                    </span>
                  ) : paper.hasAccess ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 size={11} /> Pro Unlocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      <Lock size={11} /> Pro Access
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-emerald-700 transition-colors tracking-tight">
                    {paper.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">{paper.subtitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-xs font-semibold pt-3 border-t border-slate-100">
                  <div>
                    <div className="text-slate-900 font-bold">{paper.questions} Questions</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase">Total Qs</div>
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold">{paper.marks} Marks</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase">Full Marks</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-slate-900 font-bold">{paper.durationText}</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase">Official Timer</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100">
                  <Link
                    href={`/practice?year=${year}&paperId=${paper.id}&paperTitle=${encodeURIComponent(paper.title)}&type=practice`}
                    className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl text-center transition-colors inline-flex items-center justify-center gap-1"
                  >
                    <BookOpen size={13} />
                    <span>Solutions</span>
                  </Link>
                  <Link
                    href={`/practice?year=${year}&paperId=${paper.id}&paperTitle=${encodeURIComponent(paper.title)}&type=mock`}
                    className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl text-center transition-colors shadow-2xs inline-flex items-center justify-center gap-1"
                  >
                    <Play size={12} fill="currentColor" />
                    <span>CBT Mock</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No papers found for this year.</p>
          </div>
        )}

      </div>
    </div>
  );
}
