'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import QuestionCard from '@/components/practice/QuestionCard';
import { ChevronRight, LayoutGrid, X, Bookmark, Target, CheckCircle2, AlertCircle } from 'lucide-react';
import InstructionsSvg from '@/components/ui/InstructionsSvg';
import NtaPaletteIcon from '@/components/ui/NtaPaletteIcon';

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
  
  const [sessionMode, setSessionMode] = useState<'practice' | 'instructions' | 'mock' | null>(null);
  
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [evaluations, setEvaluations] = useState<Record<string, EvalResult>>({});
  const [testStatus, setTestStatus] = useState<'in-progress' | 'submitted' | 'review'>('in-progress');
  const [submitting, setSubmitting] = useState(false);
  
  const [visited, setVisited] = useState<Set<string>>(new Set());
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

  useEffect(() => {
    if (questions.length > 0 && sessionMode && testStatus === 'in-progress') {
      setVisited(prev => {
        const next = new Set(prev);
        next.add(questions[currentIndex].id);
        return next;
      });
    }
  }, [currentIndex, questions, sessionMode, testStatus]);

  const handleSelectOption = useCallback(async (questionId: string, selectedOption: string) => {
    if (selectedOption === '') {
      setAnswers(prev => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
      return;
    }
    
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

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#FCFAF8]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-stone-200 border-t-[#107A53] rounded-full animate-spin" />
          <p className="text-stone-500 font-bold text-sm">Loading questions…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#FCFAF8] p-6">
        <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-rose-500" size={24} />
          </div>
          <h2 className="text-stone-900 font-bold text-lg mb-2">Could Not Load Questions</h2>
          <p className="text-stone-500 text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-stone-900 text-white text-sm font-bold rounded-xl hover:bg-stone-800 transition-colors"
          >
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

  // ── Mode Selection Screen ──────────────────────────────────
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

  // ── Mock Test Instructions Screen ──────────────────────────
  if (sessionMode === 'instructions') {
    return (
      <div className="flex-1 bg-[#FCFAF8] overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="max-w-5xl mx-auto px-4 py-8 lg:py-12 animate-fade-in">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex flex-col lg:flex-row">
            {/* Left Graphic */}
            <div className="lg:w-2/5 bg-[#F0F9F6] p-10 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-stone-200">
              <InstructionsSvg className="w-full max-w-xs drop-shadow-xl animate-float" />
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-extrabold text-stone-900 mb-2">Ready to Test?</h2>
                <p className="text-stone-500 text-sm font-medium">Read the instructions carefully before beginning the mock test.</p>
              </div>
            </div>
            
            {/* Right Instructions */}
            <div className="lg:w-3/5 p-8 lg:p-12">
              <h1 className="text-2xl font-extrabold text-stone-900 mb-8">General Instructions</h1>
              
              <div className="space-y-6 text-stone-600 mb-10">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0 font-bold text-stone-900">1</div>
                  <p className="pt-1 text-sm font-medium leading-relaxed">Total duration of examination is <strong>120 minutes</strong> or proportional to the selected number of questions.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0 font-bold text-stone-900">2</div>
                  <p className="pt-1 text-sm font-medium leading-relaxed">The clock will be set at the server. The countdown timer in the top right corner will display the remaining time available for you to complete the examination.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0 font-bold text-stone-900">3</div>
                  <div className="pt-1 text-sm font-medium leading-relaxed w-full">
                    <p className="mb-3">The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:</p>
                    <div className="grid sm:grid-cols-2 gap-3 mt-4">
                      <div className="flex items-center gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                        <NtaPaletteIcon status="not-visited" number={1} />
                        <span className="text-xs font-bold text-stone-600">Not Visited</span>
                      </div>
                      <div className="flex items-center gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                        <NtaPaletteIcon status="not-answered" number={2} />
                        <span className="text-xs font-bold text-stone-600">Not Answered</span>
                      </div>
                      <div className="flex items-center gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                        <NtaPaletteIcon status="answered" number={3} />
                        <span className="text-xs font-bold text-stone-600">Answered</span>
                      </div>
                      <div className="flex items-center gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                        <NtaPaletteIcon status="marked" number={4} />
                        <span className="text-xs font-bold text-stone-600">Marked for Review</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-stone-200 pt-8 flex items-center justify-between">
                <button
                  onClick={() => setSessionMode(null)}
                  className="px-6 py-3 font-bold text-stone-500 hover:text-stone-800 transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={() => {
                    setSessionMode('mock');
                    setTestStatus('in-progress');
                  }}
                  className="px-8 py-3 bg-[#107A53] text-white rounded-xl font-bold hover:bg-[#0c5c3e] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Start Mock Test <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  let correctCount = 0;
  let incorrectCount = 0;
  Object.values(evaluations).forEach(ev => {
    if (ev.isCorrect) correctCount++;
    else incorrectCount++;
  });
  const score = Math.round((correctCount / questions.length) * 100);

  // ── Submitted Summary Screen ───────────────────────────────
  if (testStatus === 'submitted') {
    return (
      <div className="flex-1 flex overflow-y-auto bg-[#FCFAF8] p-6" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="max-w-2xl mx-auto w-full py-8">
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden animate-fade-in">
            <div className="bg-stone-900 px-8 py-10 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
              <h1 className="text-3xl font-extrabold mb-2 relative z-10">Test Summary</h1>
              <p className="text-stone-300 font-medium relative z-10">You have successfully submitted the test.</p>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-40 h-40 rounded-full border-8 border-stone-100 flex flex-col items-center justify-center">
                  <div className={`absolute inset-0 rounded-full border-8 ${score >= 60 ? 'border-[#107A53]' : 'border-[#D97706]'}`} 
                       style={{ clipPath: `inset(${100 - score}% 0 0 0)` }}></div>
                  <span className="text-4xl font-black text-stone-900 relative z-10">{score}%</span>
                  <span className="text-sm font-bold text-stone-400 relative z-10 uppercase tracking-widest mt-1">Score</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100">
                  <div className="text-2xl font-extrabold text-stone-900">{questions.length}</div>
                  <div className="text-xs text-stone-500 font-bold uppercase tracking-wider mt-1">Total</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                  <div className="text-2xl font-extrabold text-blue-700">{answeredCount}</div>
                  <div className="text-xs text-blue-500 font-bold uppercase tracking-wider mt-1">Attempted</div>
                </div>
                <div className="bg-[#107A53]/10 rounded-xl p-4 text-center border border-[#107A53]/20">
                  <div className="text-2xl font-extrabold text-[#107A53]">{correctCount}</div>
                  <div className="text-xs text-[#107A53] font-bold uppercase tracking-wider mt-1">Correct</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-4 text-center border border-rose-100">
                  <div className="text-2xl font-extrabold text-rose-700">{incorrectCount}</div>
                  <div className="text-xs text-rose-500 font-bold uppercase tracking-wider mt-1">Incorrect</div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setCurrentIndex(0);
                    setTestStatus('review');
                  }}
                  className="px-8 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-colors shadow-sm"
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

  // Stats for Mock Palette
  let mockStats = { notVisited: 0, notAnswered: 0, answered: 0, marked: 0, answeredMarked: 0 };
  if (testStatus === 'in-progress' && sessionMode === 'mock') {
    questions.forEach(q => {
      const isAns = !!answers[q.id];
      const isBook = bookmarked.has(q.id);
      const isVis = visited.has(q.id);

      if (!isVis) mockStats.notVisited++;
      else if (isAns && isBook) mockStats.answeredMarked++;
      else if (isAns && !isBook) mockStats.answered++;
      else if (!isAns && isBook) mockStats.marked++;
      else mockStats.notAnswered++;
    });
  }

  return (
    <div className="flex-1 flex overflow-hidden bg-[#FCFAF8]" style={{ height: 'calc(100vh - 64px)' }}>
      {showPalette && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden backdrop-blur-sm"
          onClick={() => setShowPalette(false)}
        />
      )}

      {/* ── Main Content Area ──────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative z-10">
        
        {/* Top bar */}
        <div className="bg-white border-b border-stone-200 px-5 py-3 flex items-center justify-between shadow-sm z-20 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-extrabold text-stone-700 shrink-0 bg-stone-100 px-3 py-1 rounded-md">
              Q {currentIndex + 1} / {questions.length}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {testStatus === 'in-progress' && sessionMode === 'mock' && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-100 rounded-md text-rose-700 font-bold text-sm">
                <span>Time Left:</span>
                <span className="font-mono">119:59</span>
              </div>
            )}
            <button
              onClick={() => setShowPalette(true)}
              className="md:hidden flex items-center gap-2 px-3 py-1.5 text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors font-bold text-sm"
              aria-label="Open question palette"
            >
              <LayoutGrid size={16} /> Palette
            </button>
          </div>
        </div>

        {/* Question scroll area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 lg:px-12 relative z-0">
          <div className="max-w-4xl mx-auto w-full pb-10">
            {currentQ.exam_paper && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center text-xs font-bold text-stone-500 bg-white border border-stone-200 rounded-full px-3 py-1 shadow-sm">
                  {currentQ.exam_paper.year}
                  {currentQ.exam_paper.session ? ` · ${currentQ.exam_paper.session}` : ''}
                  {' · Paper '}{currentQ.exam_paper.paper_number}
                </span>
                <span className="inline-flex items-center text-xs font-bold text-stone-400 bg-white border border-stone-200 rounded-full px-3 py-1 shadow-sm">
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

        {/* Bottom Navigation */}
        <div className="shrink-0 bg-white border-t border-stone-200 px-5 py-4 flex items-center justify-between gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 overflow-x-auto">
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => goTo(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0 || submitting || testStatus === 'review'}
              className="px-6 py-2.5 rounded-xl text-sm font-bold border-2 border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-stone-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            {testStatus === 'in-progress' && sessionMode === 'mock' && (
              <button
                onClick={() => handleSelectOption(currentQ.id, '')}
                disabled={submitting || !answers[currentQ.id]}
                className="px-6 py-2.5 rounded-xl text-sm font-bold border-2 border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-50 transition-colors"
              >
                Clear Response
              </button>
            )}
          </div>

          <div className="flex gap-3 shrink-0">
            {testStatus === 'in-progress' && sessionMode === 'mock' && (
              <>
                <button
                  onClick={() => {
                    toggleBookmark(currentQ.id);
                    if (currentIndex < questions.length - 1) goTo(currentIndex + 1);
                  }}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold border-2 border-[#D97706]/20 bg-[#D97706]/10 text-[#D97706] hover:bg-[#D97706]/20 transition-colors"
                >
                  Mark for Review & Next
                </button>
              </>
            )}
            
            {currentIndex === questions.length - 1 && testStatus === 'in-progress' ? (
              <button
                onClick={submitTest}
                disabled={submitting}
                className={`flex items-center justify-center min-w-[140px] px-8 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all ${
                  submitting 
                  ? 'bg-stone-400 text-white cursor-wait' 
                  : 'bg-[#107A53] text-white hover:bg-[#0c5c3e] hover:-translate-y-0.5'
                }`}
              >
                {submitting ? 'Evaluating...' : 'Submit Test'}
              </button>
            ) : (
              <button
                onClick={() => goTo(currentIndex + 1)}
                disabled={currentIndex === questions.length - 1 || submitting}
                className={`flex items-center gap-1.5 px-8 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all ${
                  currentIndex === questions.length - 1 || submitting
                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                    : sessionMode === 'mock' 
                      ? 'bg-[#107A53] text-white hover:bg-[#0c5c3e] hover:-translate-y-0.5'
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5'
                }`}
              >
                {testStatus === 'review' ? 'Next' : sessionMode === 'mock' ? 'Save & Next' : 'Next'}
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* ── Question Palette Sidebar ──────────────────────── */}
      <aside
        className={`
          fixed right-0 top-16 bottom-0 z-50 w-[320px] bg-white border-l border-stone-200 shadow-2xl
          transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          md:static md:w-[320px] md:shadow-none md:transform-none md:translate-x-0 md:flex md:flex-col md:shrink-0
          ${showPalette ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full bg-[#FCFAF8]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-white">
            <span className="text-sm font-extrabold text-stone-800">Question Palette</span>
            <button
              onClick={() => setShowPalette(false)}
              className="md:hidden p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Legend */}
          <div className="px-5 py-4 bg-white border-b border-stone-200">
            {testStatus === 'in-progress' && sessionMode === 'mock' ? (
              <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="answered" number={mockStats.answered} />
                  <span className="text-xs font-bold text-stone-500 leading-tight">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="not-answered" number={mockStats.notAnswered} />
                  <span className="text-xs font-bold text-stone-500 leading-tight">Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="not-visited" number={mockStats.notVisited} />
                  <span className="text-xs font-bold text-stone-500 leading-tight">Not Visited</span>
                </div>
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="marked" number={mockStats.marked} />
                  <span className="text-xs font-bold text-stone-500 leading-tight">Marked for Review</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 mt-1">
                  <NtaPaletteIcon status="answered-marked" number={mockStats.answeredMarked} />
                  <span className="text-xs font-bold text-stone-500 leading-tight">Answered & Marked for Review</span>
                </div>
              </div>
            ) : testStatus === 'review' ? (
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="correct" number={correctCount} />
                  <span className="text-xs font-bold text-stone-500 leading-tight">Correct</span>
                </div>
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="incorrect" number={incorrectCount} />
                  <span className="text-xs font-bold text-stone-500 leading-tight">Incorrect</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="answered" number={answeredCount} />
                  <span className="text-xs font-bold text-stone-500 leading-tight">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="not-visited" number={questions.length - answeredCount} />
                  <span className="text-xs font-bold text-stone-500 leading-tight">Remaining</span>
                </div>
              </div>
            )}
          </div>

          <div className="px-5 py-3 border-b border-stone-200 bg-stone-50">
            <h3 className="text-xs font-extrabold text-stone-400 uppercase tracking-widest">Arabic</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <div className="grid grid-cols-5 gap-3">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAns = !!answers[q.id];
                const isBook = bookmarked.has(q.id);
                const isVis = visited.has(q.id);
                const evalRes = evaluations[q.id];

                let status: React.ComponentProps<typeof NtaPaletteIcon>['status'] = 'not-visited';

                if (testStatus === 'review') {
                  if (evalRes?.isCorrect) status = 'correct';
                  else status = 'incorrect';
                } else if (sessionMode === 'mock') {
                  if (isAns && isBook) status = 'answered-marked';
                  else if (isAns) status = 'answered';
                  else if (isBook) status = 'marked';
                  else if (isVis) status = 'not-answered';
                } else {
                  // Practice Mode
                  if (isAns) status = 'answered';
                  else status = 'not-visited';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => goTo(idx)}
                    className={`relative rounded-xl transition-all hover:scale-105 active:scale-95 ${
                      isCurrent ? 'ring-2 ring-offset-2 ring-stone-900 shadow-md scale-105 z-10' : ''
                    }`}
                    aria-label={`Go to question ${idx + 1}`}
                  >
                    <NtaPaletteIcon status={status} number={idx + 1} className="w-full h-11 text-sm rounded-xl shadow-sm border-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
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
