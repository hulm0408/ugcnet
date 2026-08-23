'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { Target, CheckCircle2 } from 'lucide-react';

import InstructionsView from '@/components/practice/InstructionsView';
import MockTestView from '@/components/practice/MockTestView';
import ResultSummaryView from '@/components/practice/ResultSummaryView';
import QuestionReviewView from '@/components/practice/QuestionReviewView';

const evaluateAnswer = async (questionId: string, selectedOption: string) => {
  const res = await fetch('/api/questions/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId, selectedOption })
  });
  if (!res.ok) throw new Error('Evaluation failed');
  return res.json();
};

function PracticeContent() {
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit');
  const topic = searchParams.get('topic');
  const subtopic = searchParams.get('subtopic');
  const year = searchParams.get('year') || (unit ? null : '2009');
  const paperId = searchParams.get('paperId');
  const paperTitle = searchParams.get('paperTitle');
  const paper = searchParams.get('paper') || paperTitle || (unit ? null : 'Paper II');

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sessionMode, setSessionMode] = useState<'practice' | 'mock' | 'instructions' | null>(null);
  const [testStatus, setTestStatus] = useState<'in-progress' | 'submitted' | 'summary' | 'review'>('in-progress');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [evaluations, setEvaluations] = useState<Record<string, any>>({});
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadQuestions() {
      try {
        setLoading(true);
        let baseUrl = '/api/questions?published=true&limit=250';
        if (year) baseUrl += `&year=${year}`;
        if (unit) baseUrl += `&unit=${unit}`;
        if (topic) baseUrl += `&topic=${topic}`;
        if (subtopic) baseUrl += `&subtopic=${subtopic}`;
        if (paperId) baseUrl += `&paperId=${paperId}`;

        let allQuestions: any[] = [];
        let page = 1;
        let totalPages = 1;

        do {
          const res = await fetch(`${baseUrl}&page=${page}`);
          if (!res.ok) throw new Error('Failed to load questions');
          
          const data = await res.json();
          allQuestions = [...allQuestions, ...(data.data || [])];
          totalPages = data.meta?.totalPages || 1;
          page++;
        } while (page <= totalPages);

        setQuestions(allQuestions);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, [year, unit, topic, subtopic, paperId]);

  useEffect(() => {
    if (questions.length > 0 && testStatus === 'in-progress') {
      const q = questions[currentIndex];
      setVisited(prev => new Set(prev).add(q.id));
    }
  }, [currentIndex, questions, testStatus]);

  const handleSelectOption = async (qId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));

    if (sessionMode === 'practice') {
      try {
        const evalRes = await evaluateAnswer(qId, option);
        setEvaluations(prev => ({ ...prev, [qId]: evalRes }));
      } catch (err) {
        console.error('Failed to evaluate:', err);
      }
    }
  };

  const handleToggleBookmark = async (qId: string) => {
    const isNowBookmarked = !bookmarked.has(qId);
    
    // Update local state immediately for snappy UI
    setBookmarked(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });

    // Fire API call in background
    try {
      await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: qId, bookmarked: isNowBookmarked })
      });
    } catch (err) {
      console.warn('Failed to save bookmark. User may be guest:', err);
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

      // Save session to database (fails silently if unauthenticated)
      const qIds = questions.map(q => q.id);
      try {
        await fetch('/api/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: sessionMode,
            filters: { year, unit, topic, subtopic, paperId },
            questionIds: qIds,
            answers: answers,
            evaluations: finalEvaluations
          })
        });
      } catch (err) {
        console.warn('Failed to save session, user might be guest:', err);
      }

      setTestStatus('summary'); // go to summary directly after submit
    } catch (err) {
      console.error(err);
      alert('Failed to submit test. Please check connection.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#FCFAF8]">
        <div className="w-10 h-10 border-4 border-stone-200 border-t-[#107A53] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#FCFAF8] p-6">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-10 max-w-md w-full text-center">
          <h2 className="text-stone-900 font-bold text-lg mb-2">Could Not Load Questions</h2>
          <p className="text-stone-500 text-sm mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="px-5 py-2 bg-stone-900 text-white text-sm font-bold rounded-xl hover:bg-stone-800 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#FCFAF8] p-6">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-10 max-w-md w-full text-center">
          <p className="text-stone-500 font-bold">No published questions available yet.</p>
        </div>
      </div>
    );
  }

  // "? Mode Selection Screen
  const displayYear = year || (unit ? `Unit ${unit}` : '2009');
  const displayPaper = paper || (unit ? 'Mixed' : 'Paper II');

  if (!sessionMode) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FCFAF8] p-6" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-4 tracking-tight">Choose Your Mode</h1>
          <p className="text-stone-500 text-base max-w-lg mx-auto">Select how you want to attempt these {questions.length} questions. Practice at your own pace or simulate the real exam.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6 w-full max-w-3xl animate-slide-up" style={{ animationDelay: '100ms' }}>
          <button
            onClick={() => setSessionMode('practice')}
            className="text-left group bg-white rounded-3xl border-2 border-stone-200 hover:border-[#107A53] p-8 transition-all shadow-sm hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#107A53]/20"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#107A53]/10 text-[#107A53] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target size={32} />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-[#107A53] transition-colors">Practice Mode</h2>
            <p className="text-stone-500 leading-relaxed text-sm font-medium">Get immediate feedback and detailed explanations after answering each question. Best for deep learning and revision.</p>
          </button>
          
          <button
            onClick={() => setSessionMode('instructions')}
            className="text-left group bg-white rounded-3xl border-2 border-stone-200 hover:border-[#D97706] p-8 transition-all shadow-sm hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#D97706]/20"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-[#D97706] transition-colors">Mock Test</h2>
            <p className="text-stone-500 leading-relaxed text-sm font-medium">CBT-style environment with a timer. Answers are saved, and results are shown only after you submit the full test.</p>
          </button>
        </div>
      </div>
    );
  }

  // "? Mock Test Instructions
  if (sessionMode === 'instructions') {
    return (
      <InstructionsView 
        year={displayYear}
        paper={displayPaper}
        totalQuestions={questions.length}
        onStart={() => {
          setSessionMode('mock');
          setTestStatus('in-progress');
        }}
        onBack={() => setSessionMode(null)}
      />
    );
  }

  // Stats calculation
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(evaluations).filter(e => e?.isCorrect).length;
  const incorrectCount = answeredCount - correctCount;
  const unattemptedCount = questions.length - answeredCount;

  // "? In-Progress Test
  if (testStatus === 'in-progress') {
    // For practice mode, we might want to just show the MockTestView but immediately show correct/incorrect answers.
    // For now, MockTestView is designed for Mock, but we can reuse it or use a simplified one.
    // Given the 9 screens, MockTestView is what we built.
    return (
      <MockTestView 
        year={displayYear}
        paper={displayPaper}
        questions={questions}
        currentIndex={currentIndex}
        answers={answers}
        bookmarked={bookmarked}
        visited={visited}
        onSelectOption={handleSelectOption}
        onNavigate={setCurrentIndex}
        onToggleBookmark={handleToggleBookmark}
        onSubmit={submitTest}
        submitting={submitting}
        evaluations={evaluations}
      />
    );
  }

  // "? Result Summary
  if (testStatus === 'summary') {
    return (
      <ResultSummaryView 
        year={displayYear}
        paper={displayPaper}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        unattemptedCount={unattemptedCount}
        totalQuestions={questions.length}
        questions={questions}
        answers={answers}
        evaluations={evaluations}
        onViewReview={() => setTestStatus('review')}
      />
    );
  }

  // "? Question Review
  if (testStatus === 'review') {
    return (
      <QuestionReviewView 
        year={displayYear}
        paper={displayPaper}
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
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-[#FCFAF8]">
        <div className="w-10 h-10 border-4 border-stone-200 border-t-[#107A53] rounded-full animate-spin" />
      </div>
    }>
      <PracticeContent />
    </Suspense>
  );
}
