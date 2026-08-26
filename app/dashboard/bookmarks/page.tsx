import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import Link from 'next/link';
import { ChevronLeft, BookMarked, Play, ArrowRight } from 'lucide-react';
import { getActiveSubjectServer } from '@/lib/subjectContext';
import BilingualText from '@/components/ui/BilingualText';

export const metadata: Metadata = {
  title: 'Bookmarked Questions | Candidate Dashboard',
  description: 'Review and practice your saved previous year questions.',
};

export default async function BookmarksPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/dashboard/bookmarks');
  }

  const activeSubject = await getActiveSubjectServer();

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      user_id: session.user.id,
      question: { subject_id: activeSubject.id },
    },
    include: {
      question: {
        select: {
          id: true,
          question_arabic: true,
          question_english: true,
          exam_paper: { select: { year: true, paper_number: true, display_name: true } },
          unit: { select: { unit_number: true, name_english: true } },
        },
      },
    },
    orderBy: { created_at: 'desc' },
  });

  return (
    <div className="flex-1 bg-[#FAF9F6] min-h-screen font-sans pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 mb-6 transition-colors"
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </Link>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
              <BookMarked size={24} />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                {activeSubject.name} • SAVED ITEMS
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Bookmarked Questions ({bookmarks.length})
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                Questions you saved during mock exams for focused re-evaluation.
              </p>
            </div>
          </div>

          {bookmarks.length > 0 && (
            <Link
              href="/practice?mode=bookmarked"
              className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-sm text-center inline-flex items-center justify-center gap-2 active:scale-95 shrink-0"
            >
              <Play size={14} fill="currentColor" />
              <span>Practice All {bookmarks.length} Bookmarks</span>
            </Link>
          )}
        </div>

        {/* Empty State */}
        {bookmarks.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <BookMarked size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-stone-900">No Bookmarks Saved Yet</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                While practicing questions in mock tests, click the bookmark icon on tricky or high-yield questions to save them here for revision.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/practice"
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl inline-flex items-center gap-1.5"
              >
                <span>Start Practice Test</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((b, idx) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-7 space-y-4 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-6 h-6 rounded-lg bg-stone-100 font-mono font-bold text-stone-700 flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md font-bold bg-emerald-100/70 text-emerald-900">
                      {b.question.exam_paper?.display_name || `${b.question.exam_paper?.year} • Paper ${b.question.exam_paper?.paper_number}`}
                    </span>
                    {b.question.unit && (
                      <span className="text-stone-500 font-medium">
                        Unit {b.question.unit.unit_number}: {b.question.unit.name_english}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-stone-400 font-medium">
                    Saved {b.created_at.toLocaleDateString()}
                  </span>
                </div>
                
                {/* Question Arabic Text */}
                <div
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl sm:text-3xl font-semibold leading-[2.4] text-stone-950 text-right"
                >
                  {b.question.question_arabic}
                </div>

                {/* Question English Text */}
                {b.question.question_english && (
                  <div className="text-xs sm:text-sm text-stone-700 border-l-3 border-emerald-500 pl-3.5 py-0.5 leading-relaxed">
                    <BilingualText text={b.question.question_english} />
                  </div>
                )}
                
                <div className="pt-3 border-t border-stone-100 flex items-center justify-end">
                  <Link
                    href={`/practice?questionId=${b.question.id}`}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5"
                  >
                    <span>Practice Single Question</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
