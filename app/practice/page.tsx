'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Target, CheckCircle2, ArrowLeft, RefreshCw, BookOpen } from 'lucide-react';

import InstructionsView from '@/components/practice/InstructionsView';
import MockTestView from '@/components/practice/MockTestView';
import ResultSummaryView from '@/components/practice/ResultSummaryView';
import QuestionReviewView from '@/components/practice/QuestionReviewView';
import { resolvePracticeContext, buildQuestionsApiUrl, PracticeContext } from '@/lib/practiceContext';

const evaluateAnswer = async (questionId: string, selectedOption: string) => {
  const res = await fetch('/api/questions/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId, selectedOption }),
  });
  if (!res.ok) throw new Error('Evaluation failed');
  return res.json();
};

function PracticeContent() {
  const searchParams = useSearchParams();
  const context: PracticeContext = resolvePracticeContext(searchParams);
  const typeParam = searchParams.get('type'); // 'mock' | 'practice'

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // If paper mode and type=mock, default to mock test. Otherwise allow toggle or practice mode.
  const [sessionMode, setSessionMode] = useState<'practice' | 'mock' | 'instructions' | null>(
    typeParam === 'mock' ? 'instructions' : 'practice'
  );
  const [testStatus, setTestStatus] = useState<'in-progress' | 'submitted' | 'summary' | 'review'>('in-progress');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [evaluations, setEvaluations] = useState<Record<string, any>>({});
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState<number>(Date.now());

  useEffect(() => {
    async function loadQuestions() {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = buildQuestionsApiUrl(context);
        let allQuestions: any[] = [];
        let page = 1;
        let totalPages = 1;

        do {
          const res = await fetch(`${apiUrl}&page=${page}`);
          if (!res.ok) throw new Error(`Failed to load questions (Status ${res.status})`);

          const json = await res.json();
          allQuestions = [...allQuestions, ...(json.data || [])];
          totalPages = json.meta?.totalPages || 1;
          page++;
        } while (page <= totalPages);

        setQuestions(allQuestions);
      } catch (err: any) {
        setError(err.message || 'Unable to load questions');
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, [
    context.mode,
    context.paperId,
    context.year,
    context.unitNumber,
    context.topicSlug,
    context.subtopicSlug,
    context.nodeSlug,
    context.questionId,
  ]);

  useEffect(() => {
    if (questions.length > 0 && testStatus === 'in-progress' && questions[currentIndex]) {
      const q = questions[currentIndex];
      setVisited((prev) => new Set(prev).add(q.id));
    }
  }, [currentIndex, questions, testStatus]);

  const handleSelectOption = async (qId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));

    if (sessionMode === 'practice') {
      try {
        const evalRes = await evaluateAnswer(qId, option);
        setEvaluations((prev) => ({ ...prev, [qId]: evalRes }));
      } catch (err) {
        console.error('Failed to evaluate answer:', err);
      }
    }
  };

  const handleClearResponse = (qId: string) => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
    if (sessionMode === 'practice') {
      setEvaluations((prev) => {
        const next = { ...prev };
        delete next[qId];
        return next;
      });
    }
  };

  const handleToggleBookmark = async (qId: string) => {
    const isNowBookmarked = !bookmarked.has(qId);

    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });

    try {
      await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: qId, bookmarked: isNowBookmarked }),
      });
    } catch (err) {
      console.warn('Failed to save bookmark:', err);
    }
  };

  const submitTest = async () => {
    setSubmitting(true);
    try {
      let finalEvaluations = evaluations;

      if (sessionMode === 'mock') {
        const newEvals: Record<string, any> = {};
        for (const qId of Object.keys(answers)) {
          newEvals[qId] = await evaluateAnswer(qId, answers[qId]);
        }
        finalEvaluations = newEvals;
        setEvaluations(newEvals);
      }

      // Persist session
      const qIds = questions.map((q) => q.id);
      try {
        await fetch('/api/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: sessionMode,
            filters: context,
            questionIds: qIds,
            answers: answers,
            evaluations: finalEvaluations,
          }),
        });
      } catch (err) {
        console.warn('Guest practice session not saved to database:', err);
      }

      setTestStatus('summary');
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit test. Please verify connection.');
    } finally {
      setSubmitting(false);
    }
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] bg-[#FCFAF8] p-6">
        <div className="bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-sm space-y-4">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-primary rounded-full animate-spin mx-auto" />
          <h3 className="font-bold text-stone-900 text-base sm:text-lg">
            Loading Questions...
          </h3>
          <p className="text-stone-500 text-xs sm:text-sm font-medium">
            Fetching {context.titleEnglish}
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[70vh] bg-[#FCFAF8] p-6">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8 sm:p-10 max-w-md w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <RefreshCw size={24} />
          </div>
          <h2 className="text-stone-900 font-bold text-lg">Unable to Load Questions</h2>
          <p className="text-stone-500 text-xs sm:text-sm font-medium leading-relaxed">{error}</p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-primary text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
            >
              Retry
            </button>
            <Link
              href="/syllabus"
              className="px-5 py-2.5 bg-stone-100 text-stone-700 text-xs sm:text-sm font-bold rounded-xl hover:bg-stone-200 transition-colors"
            >
              Back to Syllabus
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty State (Context Specific)
  if (questions.length === 0) {
    let emptyMessage = 'No questions available for this selection.';
    let emptySubtitle = 'Try choosing another unit, topic, or exam paper.';

    if (context.mode === 'incorrect') {
      emptyMessage = 'No Mistakes Yet!';
      emptySubtitle = 'You have not answered any questions incorrectly yet, or you are not signed in.';
    } else if (context.mode === 'bookmarked') {
      emptyMessage = 'No Bookmarked Questions';
      emptySubtitle = 'Click the bookmark icon on any question during practice to review it here.';
    } else if (context.mode === 'unattempted') {
      emptyMessage = 'All Questions Attempted!';
      emptySubtitle = 'Great job! You have practiced all questions in the bank.';
    }

    return (
      <div className="flex-1 flex items-center justify-center min-h-[70vh] bg-[#FCFAF8] p-6">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8 sm:p-12 max-w-md w-full text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-100">
            <BookOpen size={28} />
          </div>
          <h2 className="text-stone-900 font-extrabold text-xl">{emptyMessage}</h2>
          <p className="text-stone-500 text-xs sm:text-sm font-medium leading-relaxed">
            {emptySubtitle}
          </p>
          <div className="pt-3">
            <Link
              href="/syllabus"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
            >
              <ArrowLeft size={16} /> Browse Full Syllabus
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Instructions View for Mock Test
  if (sessionMode === 'instructions') {
    return (
      <InstructionsView
        year={context.year ? context.year.toString() : 'UGC NET'}
        paper={context.paperTitle || context.titleEnglish}
        totalQuestions={questions.length}
        onStart={() => {
          setSessionMode('mock');
          setTestStatus('in-progress');
        }}
        onBack={() => setSessionMode('practice')}
      />
    );
  }

  // Active CBT Mock Test / Practice Test
  if (testStatus === 'in-progress') {
    return (
      <MockTestView
        year={context.year ? context.year.toString() : 'UGC NET'}
        paper={context.paperTitle || context.titleEnglish}
        questions={questions}
        currentIndex={currentIndex}
        answers={answers}
        bookmarked={bookmarked}
        visited={visited}
        onSelectOption={handleSelectOption}
        onNavigate={(idx) => setCurrentIndex(idx)}
        onToggleBookmark={handleToggleBookmark}
        onClearResponse={handleClearResponse}
        onSubmit={submitTest}
        submitting={submitting}
        evaluations={evaluations}
      />
    );
  }

  // Result Summary View
  if (testStatus === 'summary') {
    const attemptedCount = Object.keys(answers).length;
    const correctCount = Object.values(evaluations).filter((e: any) => e?.isCorrect).length;
    const incorrectCount = attemptedCount - correctCount;
    const unattemptedCount = questions.length - attemptedCount;

    const secondsElapsed = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    const mins = Math.floor(secondsElapsed / 60);
    const secs = secondsElapsed % 60;
    const timeTakenFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    return (
      <ResultSummaryView
        year={context.year ? context.year.toString() : 'UGC NET'}
        paper={context.paperTitle || context.titleEnglish}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        unattemptedCount={unattemptedCount}
        totalQuestions={questions.length}
        timeTaken={timeTakenFormatted}
        questions={questions}
        answers={answers}
        evaluations={evaluations}
        onViewReview={() => setTestStatus('review')}
      />
    );
  }

  // Question Review View
  if (testStatus === 'review') {
    const attemptedCount = Object.keys(answers).length;
    const correctCount = Object.values(evaluations).filter((e: any) => e?.isCorrect).length;
    const incorrectCount = attemptedCount - correctCount;
    const unattemptedCount = questions.length - attemptedCount;

    return (
      <QuestionReviewView
        year={context.year ? context.year.toString() : 'UGC NET'}
        paper={context.paperTitle || context.titleEnglish}
        questions={questions}
        answers={answers}
        evaluations={evaluations}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        unattemptedCount={unattemptedCount}
        totalQuestions={questions.length}
      />
    );
  }

  return null;
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-[70vh] bg-[#FCFAF8]">
          <div className="w-10 h-10 border-4 border-stone-200 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <PracticeContent />
    </Suspense>
  );
}
