import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
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
    <div className="flex-1 bg-stone-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-stone-500 mb-8">
          <Link href="/pyq" className="hover:text-primary transition-colors">
            PYQs ({activeSubject.name})
          </Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-stone-900">{year}</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-3xl border border-stone-200/90 shadow-sm p-8 mb-8 overflow-hidden relative">
          <div className="flex-1 relative z-10">
            <h1 className="text-4xl font-black text-stone-900 mb-2 tracking-tight">
              {activeSubject.name} — Year {year}
            </h1>
            {activeSubject.name_native && (
              <p
                dir={activeSubject.direction}
                className={`text-2xl font-bold text-amber-600 mb-4 ${
                  activeSubject.direction === 'rtl' ? 'font-arabic' : 'font-sans'
                }`}
              >
                {activeSubject.name_native} ({year})
              </p>
            )}
            <p className="text-stone-500 text-sm font-medium">
              Select the paper or part you want to practice under authentic NTA exam conditions.
            </p>
          </div>

          <div className="w-full md:w-[350px] shrink-0 mt-8 md:mt-0 relative">
            <YearFolderSvg year={year} className="w-full h-auto drop-shadow-xl" />
          </div>
        </div>

        {/* Papers Grid */}
        {papersWithAccess.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {papersWithAccess.map((paper) => (
              <div
                key={paper.id}
                className={`bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col h-full ${
                  paper.isFree
                    ? 'border-emerald-300 ring-2 ring-emerald-500/20 hover:border-emerald-500'
                    : 'border-stone-200/80 hover:border-primary/40'
                }`}
              >
                {/* Highlight Top Accent Bar */}
                <div
                  className={`absolute top-0 left-0 w-full h-1.5 transition-colors ${
                    paper.isFree
                      ? 'bg-emerald-500'
                      : paper.hasAccess
                      ? 'bg-primary'
                      : 'bg-stone-300 group-hover:bg-amber-500'
                  }`}
                />

                {/* Badge Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  {paper.isFree ? (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 shadow-sm">
                      <Sparkles size={12} className="text-emerald-700" /> Free Benchmark Exam
                    </span>
                  ) : paper.hasAccess ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                      <CheckCircle2 size={11} /> Pro Unlocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      <Lock size={11} /> Pro Access
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-black text-stone-900 group-hover:text-primary transition-colors tracking-tight">
                    {paper.title}
                  </h3>
                  <p className="text-xs font-semibold text-stone-500 mt-1">{paper.subtitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs font-semibold mt-auto mb-6 pt-4 border-t border-stone-100">
                  <div>
                    <div className="text-stone-900">{paper.questions} Questions</div>
                    <div className="text-[10px] text-stone-400 font-medium uppercase">Total Qs</div>
                  </div>
                  <div>
                    <div className="text-stone-900">{paper.marks} Marks</div>
                    <div className="text-[10px] text-stone-400 font-medium uppercase">Full Marks</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-stone-900">{paper.durationText}</div>
                    <div className="text-[10px] text-stone-400 font-medium uppercase">Official Timer</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Link
                    href={`/practice?year=${year}&paperId=${paper.id}&paperTitle=${encodeURIComponent(paper.title)}&type=practice`}
                    className="flex-1 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl text-center transition-colors"
                  >
                    Learn / Solutions
                  </Link>
                  <Link
                    href={`/practice?year=${year}&paperId=${paper.id}&paperTitle=${encodeURIComponent(paper.title)}&type=mock`}
                    className="flex-1 py-2.5 px-3 bg-[#0C6240] hover:bg-[#094d32] text-white text-xs font-bold rounded-xl text-center transition-colors shadow-sm"
                  >
                    Take CBT Mock
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-stone-200">
            <p className="text-stone-500">No papers found for this year.</p>
          </div>
        )}
      </div>
    </div>
  );
}
