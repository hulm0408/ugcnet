import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import Link from 'next/link';
import { ChevronLeft, BookMarked } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bookmarks | Dashboard',
};

export default async function BookmarksPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: { user_id: session.user.id },
    include: {
      question: {
        select: {
          id: true,
          question_arabic: true,
          question_english: true,
          exam_paper: { select: { year: true, paper_number: true } }
        }
      }
    },
    orderBy: { created_at: 'desc' }
  });

  return (
    <div className="flex-1 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 mb-6 transition-colors">
          <ChevronLeft size={16} /> Back to Dashboard
        </Link>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <BookMarked size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Bookmarked Questions</h1>
            <p className="text-sm text-stone-500">Review {bookmarks.length} questions you saved for later</p>
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-stone-200/60 shadow-sm p-12 text-center">
            <BookMarked size={48} className="mx-auto text-stone-300 mb-4" />
            <h3 className="text-lg font-bold text-stone-900 mb-1">No Bookmarks Yet</h3>
            <p className="text-sm text-stone-500">
              When you practice, click the bookmark icon on any question you want to review later.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((b) => (
              <div key={b.id} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-stone-200/60 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary-dark">
                    {b.question.exam_paper.year} • {b.question.exam_paper.paper_number}
                  </span>
                  <span className="text-xs text-stone-400">
                    Saved {b.created_at.toLocaleDateString()}
                  </span>
                </div>
                
                <p dir="rtl" className="font-arabic text-xl leading-relaxed text-stone-900 mb-2">
                  {b.question.question_arabic}
                </p>
                {b.question.question_english && (
                  <p className="text-sm text-stone-500 mb-4">
                    {b.question.question_english}
                  </p>
                )}
                
                {/* In the future, this button could link to a single question review page */}
                <div className="mt-4 pt-4 border-t border-stone-100 flex justify-end">
                  <span className="text-sm font-semibold text-primary">
                    Bookmarked ID: {b.question.id.slice(0, 8)}...
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
