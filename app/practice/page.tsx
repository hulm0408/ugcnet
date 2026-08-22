'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import QuestionCard from '@/components/practice/QuestionCard';
import { ChevronLeft, ChevronRight, LayoutGrid, X, Bookmark, Target, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Metadata } from 'next';

type Question = {
  id: string;
  source_question_id: string;
  original_question_number: string;
  question_arabic: string;
  question_english: string | null;
  question_type: string;
  context_paragraph_arabic: string | null;
  context_paragraph_english: string | null;
  matching_table_arabic: unknown;
  matching_table_english: unknown;
  options_arabic: Record<string, unknown>;
  options_english: Record<string, unknown> | null;
  exam_paper: {
    exam_name: string;
    year: number;
    session: string | null;
    paper_number: string;
  } | null;
};

type EvalResult = {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string | null;
  correctText: string | null;
};

function PracticeContent() {
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [sessionMode, setSessionMode] = useState<'practice' | 'mock' | null>(null);
  
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [evaluations, setEvaluations] = useState<Record<string, EvalResult>>({});
  const [testStatus, setTestStatus] = useState<'in-progress' | 'submitted' | 'review'>('in-progress');
  const [submitting, setSubmitting] = useState(false);
  
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [showPalette, setShowPalette] = useState(false);

  useEffect(() => {
    async function loadQuestions() {
      try {
        setLoading(true);
        const unit = searchParams.get('unit');
        const topic = searchParams.get('topic');
        const subtopic = searchParams.get('subtopic');
        const year = searchParams.get('year');
        const paperId = searchParams.get('paper');
        const limit = searchParams.get('limit') || '50';
        
        const params = new URLSearchParams({ limit });
        if (unit) params.set('unitId', unit);
        if (topic) params.set('topic', topic);
        if (subtopic) params.set('subtopic', subtopic);
        if (year) params.set('year', year);
        if (paperId) params.set('paperId', paperId);

        const res = await fetch(`/api/questions?${params.toString()}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const json = await res.json();
        setQuestions(json.data ?? []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load questions');
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, [searchParams]);

  const handleSelectOption = useCallback(async (questionId: string, selectedOption: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
    
    if (sessionMode === 'practice') {
      try {
        const res = await fetch('/api/questions/evaluate-batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: { [questionId]: selectedOption } }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results[questionId]) {
            setEvaluations(prev => ({ ...prev, [questionId]: data.results[questionId] }));
          }
        }
      } catch (err) {
        console.error('Failed to evaluate answer', err);
      }
    }
  }, [sessionMode]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const goTo = useCallback((idx: number) => {
    setCurrentIndex(idx);
    setShowPalette(false);
  }, []);

  const submitTest = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/questions/evaluate-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error('Failed to evaluate answers');
      const data = await res.json();
      setEvaluations(data.results || {});
      setTestStatus('submitted');
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit test. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading state ────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium text-sm">Loading practice session…</p>
        </div>
      </div>
    );
  }

  // ── Error state ──────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-xl">!</span>
          </div>
          <h2 className="text-slate-900 font-bold text-lg mb-2">Could Not Load Questions</h2>
          <p className="text-slate-500 text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Empty state ──────────────────────────────────────────────
  if (questions.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 max-w-md w-full text-center">
          <p className="text-slate-500 font-medium">No published questions available yet.</p>
        </div>
      </div>
    );
  }

  // ── Setup state ──────────────────────────────────────────────
  if (!sessionMode) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-6" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm max-w-2xl w-full overflow-hidden">
          <div className="bg-slate-900 px-8 py-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Choose Practice Mode</h1>
            <p className="text-slate-400 text-sm">Select how you want to attempt these {questions.length} questions</p>
          </div>
          <div className="p-8 grid sm:grid-cols-2 gap-6">
            <button
              onClick={() => setSessionMode('practice')}
              className="text-left group rounded-2xl border-2 border-slate-200 hover:border-blue-500 p-6 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/20"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Practice Mode</h2>
              <p className="text-sm text-slate-500">Get immediate feedback and explanations after answering each question. Best for learning and revision.</p>
            </button>
            <button
              onClick={() => setSessionMode('mock')}
              className="text-left group rounded-2xl border-2 border-slate-200 hover:border-emerald-500 p-6 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Mock Test</h2>
              <p className="text-sm text-slate-500">CBT-style environment. Answers are saved, and results are shown only after you submit the full test.</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  // ── Submitted Summary State ────────────────────────────────
  if (testStatus === 'submitted') {
    let correctCount = 0;
    let incorrectCount = 0;
    Object.values(evaluations).forEach(ev => {
      if (ev.isCorrect) correctCount++;
      else incorrectCount++;
    });
    const score = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="flex-1 flex overflow-y-auto bg-slate-50 p-6" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="max-w-2xl mx-auto w-full py-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 px-8 py-10 text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Test Summary</h1>
              <p className="text-slate-400 font-medium">You have successfully submitted the test.</p>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-40 h-40 rounded-full border-8 border-slate-100 flex flex-col items-center justify-center">
                  <div className={`absolute inset-0 rounded-full border-8 ${score >= 60 ? 'border-emerald-500' : 'border-amber-500'}`} 
                       style={{ clipPath: `inset(${100 - score}% 0 0 0)` }}></div>
                  <span className="text-4xl font-black text-slate-900 relative z-10">{score}%</span>
                  <span className="text-sm font-medium text-slate-500 relative z-10">Score</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900">{questions.length}</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase mt-1">Total</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                  <div className="text-2xl font-bold text-blue-700">{answeredCount}</div>
                  <div className="text-xs text-blue-500 font-semibold uppercase mt-1">Attempted</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-100">
                  <div className="text-2xl font-bold text-emerald-700">{correctCount}</div>
                  <div className="text-xs text-emerald-500 font-semibold uppercase mt-1">Correct</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-4 text-center border border-rose-100">
                  <div className="text-2xl font-bold text-rose-700">{incorrectCount}</div>
                  <div className="text-xs text-rose-500 font-semibold uppercase mt-1">Incorrect</div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setCurrentIndex(0);
                    setTestStatus('review');
                  }}
                  className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Review Answers & Explanations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isBookmarked = bookmarked.has(currentQ.id);

  return (
    // Full viewport below header — no scrolling on the outer shell
    <div className="flex-1 flex overflow-hidden bg-slate-100" style={{ height: 'calc(100vh - 64px)' }}>

      {/* ── Mobile Palette Overlay ───────────────────────────── */}
      {showPalette && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setShowPalette(false)}
        />
      )}

      {/* ── Main Content ────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

        {/* Top bar: progress + controls */}
        <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center gap-3 shrink-0">
          {/* Question counter */}
          <span className="text-sm font-semibold text-slate-700 shrink-0">
            Q {currentIndex + 1} / {questions.length}
          </span>

          {/* Progress bar */}
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${testStatus === 'review' ? 'bg-indigo-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}
              style={{ width: `${testStatus === 'review' ? 100 : progress}%` }}
            />
          </div>

          {/* Answered badge */}
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
            testStatus === 'review' 
            ? 'text-indigo-700 bg-indigo-50 border border-indigo-200' 
            : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
          }`}>
            {testStatus === 'review' ? 'Review Mode' : `${answeredCount} answered`}
          </span>

          {/* Bookmark button */}
          <button
            onClick={() => toggleBookmark(currentQ.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked
                ? 'text-amber-500 bg-amber-50'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
          >
            <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          {/* Mobile palette toggle */}
          <button
            onClick={() => setShowPalette(true)}
            className="md:hidden p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open question palette"
          >
            <LayoutGrid size={17} />
          </button>
        </div>

        {/* Scrollable question area */}
        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto w-full pb-10">
            {/* Exam meta chip */}
            {currentQ.exam_paper && (
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-full px-3 py-1 shadow-sm">
                  {currentQ.exam_paper.year}
                  {currentQ.exam_paper.session ? ` · ${currentQ.exam_paper.session}` : ''}
                  {' · Paper '}{currentQ.exam_paper.paper_number}
                </span>
                <span className="inline-flex items-center text-xs font-medium text-slate-400 bg-white border border-slate-200 rounded-full px-3 py-1 shadow-sm">
                  Q {currentQ.original_question_number}
                </span>
              </div>
            )}

            <QuestionCard
              question={currentQ}
              mode={testStatus === 'review' ? 'review' : 'test'}
              selectedOption={answers[currentQ.id] || null}
              evaluation={evaluations[currentQ.id] || null}
              onSelectOption={handleSelectOption}
            />
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="shrink-0 bg-white border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex gap-2">
            <button
              onClick={() => goTo(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0 || submitting || testStatus === 'review'}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {testStatus === 'in-progress' && sessionMode === 'mock' && (
              <button
                onClick={() => handleSelectOption(currentQ.id, '')}
                disabled={submitting}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Clear Response
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {testStatus === 'in-progress' && (
              <button
                onClick={() => {
                  toggleBookmark(currentQ.id);
                  if (currentIndex < questions.length - 1) goTo(currentIndex + 1);
                }}
                disabled={submitting}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
              >
                Mark for Review & Next
              </button>
            )}
            
            {currentIndex === questions.length - 1 && testStatus === 'in-progress' ? (
              <button
                onClick={submitTest}
                disabled={submitting}
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm ${
                  submitting 
                  ? 'bg-slate-400 text-white cursor-wait' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {submitting ? 'Evaluating...' : 'Submit Test'}
              </button>
            ) : (
              <button
                onClick={() => goTo(currentIndex + 1)}
                disabled={currentIndex === questions.length - 1 || submitting}
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm ${
                  currentIndex === questions.length - 1 || submitting
                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {testStatus === 'review' ? 'Next' : 'Save & Next'}
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* ── Question Palette Sidebar ─────────────────────────── */}
      <aside
        className={`
          fixed right-0 top-16 bottom-0 z-50 w-72 bg-white border-l border-slate-200 shadow-xl
          transform transition-transform duration-300 ease-in-out
          md:static md:w-64 md:shadow-none md:transform-none md:translate-x-0 md:flex md:flex-col md:shrink-0
          ${showPalette ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}
      >
        {/* Palette header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question Palette</span>
          <button
            onClick={() => setShowPalette(false)}
            className="md:hidden p-1 text-slate-400 hover:text-slate-700 rounded"
            aria-label="Close palette"
          >
            <X size={16} />
          </button>
        </div>

        {/* Legend */}
        <div className="px-4 py-2 flex items-center gap-3 text-[11px] font-medium text-slate-500 border-b border-slate-100">
          {testStatus === 'review' ? (
             <>
               <span className="flex items-center gap-1">
                 <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Correct
               </span>
               <span className="flex items-center gap-1">
                 <span className="w-3 h-3 rounded-sm bg-rose-400 inline-block" /> Incorrect
               </span>
             </>
          ) : (
            <>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Answered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-slate-200 inline-block" /> Not yet
              </span>
            </>
          )}
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm border-2 border-slate-800 inline-block" /> Current
          </span>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const answered = !!answers[q.id];
              const isBook = bookmarked.has(q.id);
              const evalRes = evaluations[q.id];

              let bgCls = 'bg-slate-100 text-slate-600 hover:bg-slate-200';
              if (testStatus === 'review') {
                if (evalRes?.isCorrect) bgCls = 'bg-emerald-500 text-white';
                else if (answered && !evalRes?.isCorrect) bgCls = 'bg-rose-400 text-white';
              } else if (answered) {
                bgCls = 'bg-emerald-500 text-white';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => goTo(idx)}
                  className={`
                    relative aspect-square rounded-lg text-xs font-bold transition-all duration-150
                    flex items-center justify-center
                    ${isCurrent ? 'ring-2 ring-slate-900 ring-offset-1' : ''}
                    ${bgCls}
                  `}
                  aria-label={`Go to question ${idx + 1}`}
                >
                  {idx + 1}
                  {isBook && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border border-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>{answeredCount} / {questions.length} answered</span>
            {testStatus === 'in-progress' && (
              <span>{questions.length - answeredCount} remaining</span>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center bg-slate-50">Loading...</div>}>
      <PracticeContent />
    </Suspense>
  );
}
