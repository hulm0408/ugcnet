'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Target, CheckCircle2, ArrowLeft, RefreshCw, BookOpen, Lock, Sparkles } from 'lucide-react';

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
  const [lockedPayload, setLockedPayload] = useState<{
    paper?: any;
    subject?: any;
  } | null>(null);

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
        setLockedPayload(null);
        setCurrentIndex(0);
        setAnswers({});
        setEvaluations({});
        setBookmarked(new Set());
        setVisited(new Set());
        setTestStatus('in-progress');

        const apiUrl = buildQuestionsApiUrl(context);
        const res = await fetch(`${apiUrl}&page=1`);

        if (res.status === 403) {
          const json = await res.json();
          if (json.error === 'LOCKED_CONTENT') {
            setLockedPayload(json);
            setLoading(false);
            return;
          }
        }

        if (!res.ok) throw new Error(`Failed to load questions (Status ${res.status})`);

        const json = await res.json();
        setQuestions(json.data || []);
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
      const qIds = questions.map((q) => q.id);
      let finalEvaluations = evaluations;

      if (sessionMode === 'mock') {
        const batchRes = await fetch('/api/questions/evaluate-batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers, questionIds: qIds }),
        });
        if (batchRes.ok) {
          const batchJson = await batchRes.json();
          finalEvaluations = batchJson.results || {};
          setEvaluations(finalEvaluations);
        }
      }

      // Persist session
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

  // Loading State
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[75vh] bg-[#F8F9FA] p-6 text-[#202124] font-sans">
        <div className="bg-white border border-[#DADCE0] rounded-2xl p-8 sm:p-10 max-w-md w-full text-center shadow-sm space-y-4">
          <div className="w-10 h-10 border-2 border-[#E8EAED] border-t-[#1A73E8] rounded-full animate-spin mx-auto" />
          <h3 className="font-bold text-[#202124] text-base sm:text-lg">
            Loading Questions...
          </h3>
          <p className="text-[#5F6368] text-xs sm:text-sm font-medium">
            Fetching {context.titleEnglish}
          </p>
        </div>
      </div>
    );
  }

  // Locked Content State (Value-Driven Paywall)
  if (lockedPayload) {
    const subjectName = lockedPayload.subject?.name || 'Arabic';
    const subjectSlug = lockedPayload.subject?.slug || 'arabic';
    const paperName = lockedPayload.paper?.display_name || context.paperTitle || 'This Exam Paper';

    return (
      <div className="flex-1 flex items-center justify-center min-h-[85vh] bg-[#F8F9FA] p-4 sm:p-6 font-sans">
        <div className="bg-white rounded-2xl border border-[#DADCE0] shadow-sm p-6 sm:p-10 max-w-lg w-full text-center space-y-6 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 rounded-2xl bg-[#FEF7E0] text-[#F29900] flex items-center justify-center mx-auto border border-[#F29900]/20 shadow-sm">
            <Lock size={32} />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={13} /> Pro Access Required
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#202124] tracking-tight">
              Unlock {subjectName} Preparation
            </h2>
            <p className="text-[#5F6368] text-xs sm:text-sm font-medium mt-1">
              <strong className="text-[#202124]">{paperName}</strong> is part of full {subjectName} Pro preparation.
            </p>
          </div>

          <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-[#DADCE0] text-left space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#5F6368]">
              Your {subjectName} Pro Pass includes:
            </div>
            {[
              `All 45+ ${subjectName} PYQ Papers (2004–2024 with answers)`,
              'Full UGC NET General Paper 1 (10 Units included)',
              'Personal Mistake Tracker & Weak Topic Analytics',
              'Unlimited CBT Timed Mock Test Simulations',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#202124]">
                <CheckCircle2 size={15} className="text-[#1E8E3E] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href={`/pricing?subject=${subjectSlug}`}
              className="w-full py-3.5 px-6 bg-[#1A73E8] hover:bg-[#1557B0] text-white font-bold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>Unlock {subjectName} Pro Access</span>
              <ArrowLeft size={16} className="rotate-180" />
            </Link>

            <Link
              href="/pyq"
              className="w-full py-2.5 px-4 bg-white hover:bg-[#F8F9FA] text-[#202124] font-bold text-xs rounded-xl flex items-center justify-center transition-colors border border-[#DADCE0]"
            >
              Take Free Benchmark Exam / Browse Papers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Generic Error State
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] bg-[#F8F9FA] p-6">
        <div className="bg-white rounded-2xl border border-[#DADCE0] shadow-sm p-8 sm:p-10 max-w-md w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FCE8E6] text-[#D93025] flex items-center justify-center mx-auto">
            <RefreshCw size={24} />
          </div>
          <h2 className="text-[#202124] font-bold text-lg">Unable to Load Questions</h2>
          <p className="text-[#5F6368] text-xs sm:text-sm font-medium leading-relaxed">{error}</p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-[#1A73E8] text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-[#1557B0] transition-colors shadow-sm"
            >
              Retry
            </button>
            <Link
              href="/syllabus"
              className="px-5 py-2.5 bg-[#F8F9FA] text-[#202124] text-xs sm:text-sm font-bold rounded-xl hover:bg-[#E8EAED] transition-colors border border-[#DADCE0]"
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
      <div className="flex-1 flex items-center justify-center min-h-[70vh] bg-[#F8F9FA] p-6">
        <div className="bg-white rounded-2xl border border-[#DADCE0] shadow-sm p-8 sm:p-12 max-w-md w-full text-center space-y-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-[#E6F4EA] text-[#1E8E3E] flex items-center justify-center mx-auto border border-[#CEEAD6]">
            <BookOpen size={28} />
          </div>
          <h2 className="text-[#202124] font-bold text-xl">{emptyMessage}</h2>
          <p className="text-[#5F6368] text-xs sm:text-sm font-medium leading-relaxed">
            {emptySubtitle}
          </p>
          <div className="pt-3">
            <Link
              href="/syllabus"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A73E8] text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-[#1557B0] transition-colors shadow-sm"
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
