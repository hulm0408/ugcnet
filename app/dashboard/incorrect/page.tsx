import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import Link from 'next/link';
import { ChevronLeft, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mistakes & Review | Dashboard',
};

export default async function IncorrectQuestionsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  // Find all distinct questions the user got wrong at least once
  // We'll get the most recent attempt for each
  const incorrectAttempts = await prisma.practiceAttempt.findMany({
    where: { 
      user_id: session.user.id,
      is_correct: false,
      is_skipped: false,
    },
    include: {
      question: {
        select: {
          id: true,
          question_arabic: true,
          question_english: true,
          correct_answer: true,
          correct_answer_text_arabic: true,
          correct_answer_text_english: true,
          explanation_arabic: true,
          explanation_english: true,
          options_arabic: true,
          exam_paper: { select: { year: true, paper_number: true } }
        }
      }
    },
    orderBy: { attempted_at: 'desc' }
  });

  // Deduplicate by question ID, keeping the most recent
  const uniqueIncorrect = new Map();
  for (const attempt of incorrectAttempts) {
    if (!uniqueIncorrect.has(attempt.question_id)) {
      uniqueIncorrect.set(attempt.question_id, attempt);
    }
  }
  const questionsToReview = Array.from(uniqueIncorrect.values());

  return (
    <div className="flex-1 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 mb-6 transition-colors">
          <ChevronLeft size={16} /> Back to Dashboard
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <XCircle size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-900">Mistakes & Review</h1>
              <p className="text-sm text-stone-500">Review {questionsToReview.length} questions you answered incorrectly</p>
            </div>
          </div>

          {questionsToReview.length > 0 && (
            <Link
              href="/practice?mode=incorrect"
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm text-center"
            >
              Practice All Mistakes
            </Link>
          )}
        </div>

        {questionsToReview.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-stone-200/60 shadow-sm p-12 text-center">
            <XCircle size={48} className="mx-auto text-stone-300 mb-4" />
            <h3 className="text-lg font-bold text-stone-900 mb-1">No Mistakes Yet</h3>
            <p className="text-sm text-stone-500">
              Keep practicing! Questions you answer incorrectly will appear here for you to review.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {questionsToReview.map((attempt: any) => {
              const q = attempt.question;
              const options = q.options_arabic as Record<string, string>;
              return (
                <div key={attempt.id} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-stone-200/60 shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                        {q.exam_paper.year} • {q.exam_paper.paper_number}
                      </span>
                      <span className="text-xs text-stone-400">
                        Attempted {attempt.attempted_at.toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p dir="rtl" className="font-arabic text-xl leading-relaxed text-stone-900 mb-4">
                      {q.question_arabic}
                    </p>
                    
                    <div className="bg-stone-50/80 rounded-xl p-4 border border-stone-200/40 mb-4">
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-red-600 shrink-0">Your Answer:</span>
                          <span dir="rtl" className="font-arabic text-base text-stone-700">
                            {attempt.selected_option ? options[attempt.selected_option] : 'No Answer'}
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-emerald-600 shrink-0">Correct Answer:</span>
                          <span dir="rtl" className="font-arabic text-base text-stone-900 font-bold">
                            {options[q.correct_answer] || q.correct_answer_text_arabic}
                          </span>
                        </div>
                      </div>
                    </div>

                    {(q.explanation_arabic || q.explanation_english) && (
                      <div className="mt-4 pt-4 border-t border-stone-100">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Explanation</h4>
                        {q.explanation_arabic && (
                          <p dir="rtl" className="font-arabic text-sm text-stone-600 mb-2">{q.explanation_arabic}</p>
                        )}
                        {q.explanation_english && (
                          <p className="text-sm text-stone-600">{q.explanation_english}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  );
}
