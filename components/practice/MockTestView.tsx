import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, AlertCircle, Bookmark, Check, CheckCircle2, RefreshCw, ArrowLeft } from 'lucide-react';
import { getOptionText } from '@/lib/arabicUtils';
import MemoryButton from '@/components/memory/MemoryButton';
import QuestionMemoryStrip from '@/components/memory/QuestionMemoryStrip';
import MemoryConnectionModal from '@/components/memory/MemoryConnectionModal';
import { calculateTestDurationSeconds } from '@/lib/dateUtils';
import BilingualText from '@/components/ui/BilingualText';

interface MockTestViewProps {
  year?: string;
  paper?: string;
  questions: any[];
  currentIndex: number;
  answers: Record<string, string>;
  bookmarked: Set<string>;
  visited: Set<string>;
  onSelectOption: (qId: string, option: string) => void;
  onNavigate: (index: number) => void;
  onToggleBookmark: (qId: string) => void;
  onClearResponse?: (qId: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  evaluations?: Record<string, any>;
}

export default function MockTestView({
  year,
  paper,
  questions,
  currentIndex,
  answers,
  bookmarked,
  visited,
  onSelectOption,
  onNavigate,
  onToggleBookmark,
  onClearResponse,
  onSubmit,
  submitting,
  evaluations = {},
}: MockTestViewProps) {
  const currentQ = questions[currentIndex] || questions[0];

  // Dynamic Timer logic: 80 seconds per question
  const initialDuration = calculateTestDurationSeconds(questions?.length || 1);
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);
  const [memoryRefresh, setMemoryRefresh] = useState(0);

  // Update timer whenever question count changes
  useEffect(() => {
    if (questions && questions.length > 0) {
      setTimeLeft(calculateTestDurationSeconds(questions.length));
    }
  }, [questions?.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-submit when time reaches zero
  useEffect(() => {
    if (timeLeft === 0 && !submitting) {
      onSubmit();
    }
  }, [timeLeft, submitting, onSubmit]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const mockStats = {
    answered: Object.keys(answers).filter((id) => !bookmarked.has(id)).length,
    answeredMarked: Object.keys(answers).filter((id) => bookmarked.has(id)).length,
    notAnswered: Array.from(visited).filter((id) => !answers[id]).length,
    marked: Array.from(bookmarked).filter((id) => !answers[id]).length,
    notVisited: Math.max(0, questions.length - visited.size),
  };

  const isCurrentBookmarked = currentQ ? bookmarked.has(currentQ.id) : false;
  const isCurrentAnswered = currentQ ? !!answers[currentQ.id] : false;

  const headerTitle =
    paper ||
    currentQ?.exam_paper?.display_name ||
    currentQ?.exam_paper?.exam_name ||
    (year ? `UGC NET – ${year}` : 'UGC NET CBT Simulator');

  if (!currentQ) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-[#FCFAF8]">
        <div className="bg-white p-8 rounded-3xl border border-stone-200 text-center">
          <p className="text-stone-600 font-bold">No question found at this index.</p>
        </div>
      </div>
    );
  }

  const currentEval = evaluations[currentQ.id];
  const correctOptionLetter = currentEval?.correctAnswer || currentEval?.correctOption;

  return (
    <div className="flex flex-col h-screen bg-[#FCFAF8] font-sans overflow-hidden">
      {/* Top Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-white border-b border-stone-200 shrink-0 shadow-sm z-20 relative">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="lg:hidden p-2 -ml-2 rounded-lg text-stone-600 hover:bg-stone-100"
          >
            {isNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link
            href="/dashboard"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors hidden sm:inline-flex items-center gap-1 text-xs font-bold"
            title="Exit to Dashboard"
          >
            <ArrowLeft size={16} />
            <span>Exit</span>
          </Link>

          <div className="font-bold text-stone-900 text-sm sm:text-base">{headerTitle}</div>
        </div>

        {/* Timer */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-lg sm:text-xl font-bold text-stone-900 tracking-wider flex items-center gap-1 font-mono">
            <span>{hours.toString().padStart(2, '0')}</span>
            <span className="text-stone-400">:</span>
            <span>{minutes.toString().padStart(2, '0')}</span>
            <span className="text-stone-400">:</span>
            <span>{seconds.toString().padStart(2, '0')}</span>
          </div>
          <div className="flex gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">
            <span>Hours</span>
            <span>Min</span>
            <span>Sec</span>
          </div>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          disabled={submitting}
          className="px-4 py-2 sm:px-6 sm:py-2.5 bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50"
        >
          {submitting ? 'Calculating...' : 'Finish & View Analysis'}
        </button>
      </header>

      {/* Legend Bar */}
      <div className="flex items-center gap-6 sm:gap-8 px-4 sm:px-6 py-2.5 bg-stone-50 border-b border-stone-200 shrink-0 text-[10px] sm:text-xs font-bold text-stone-600 overflow-x-auto whitespace-nowrap z-10 no-scrollbar">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" /> Answered (
          {mockStats.answered})
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" /> Not Answered (
          {mockStats.notAnswered})
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" /> Marked for Review (
          {mockStats.marked})
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-300 shrink-0" /> Not Visited (
          {mockStats.notVisited})
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left: Question Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white z-0 h-full">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-stone-100 text-stone-700 text-xs font-bold rounded-lg">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                {currentQ.exam_paper && (
                  <span className="px-2.5 py-1 bg-primary/10 text-primary-dark text-xs font-bold rounded-lg">
                    {currentQ.exam_paper.year} • {currentQ.exam_paper.paper_number}
                  </span>
                )}
              </div>

              {currentEval &&
                (currentEval.isCorrect ? (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5 border border-emerald-200">
                    <Check size={14} /> Correct (+2 Marks)
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5 border border-rose-200">
                    <X size={14} /> Incorrect (0 Marks)
                  </span>
                ))}
            </div>

            {/* Arabic Question Body */}
            <div
              dir="rtl"
              lang="ar"
              className="text-2xl sm:text-3xl font-arabic font-semibold text-stone-950 leading-[2.4] mb-6 text-right"
            >
              {currentQ.question_arabic}
            </div>

            {currentQ.question_english && (
              <div className="text-stone-700 text-sm sm:text-base font-normal mb-6 sm:mb-8 border-l-3 border-emerald-500 pl-4 py-1 leading-relaxed">
                <BilingualText text={currentQ.question_english} />
              </div>
            )}

            {/* MCQ Options A, B, C, D */}
            <div className="space-y-3.5 max-w-3xl mb-8">
              {[
                { opt: 'A', num: '1' },
                { opt: 'B', num: '2' },
                { opt: 'C', num: '3' },
                { opt: 'D', num: '4' },
              ].map(({ opt, num }) => {
                const isSelected = answers[currentQ.id] === opt;
                const isCorrectOption = correctOptionLetter === opt;

                let optBg = 'border-stone-200/90 bg-white hover:border-emerald-500/60 hover:bg-[#FAF9F6]';
                let iconBg = 'bg-stone-100 text-stone-700';

                if (isSelected) {
                  optBg = 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm';
                  iconBg = 'bg-emerald-700 text-white';
                }

                if (currentEval) {
                  if (isCorrectOption) {
                    optBg = 'border-emerald-500 bg-emerald-50/90 ring-2 ring-emerald-400/30 shadow-sm';
                    iconBg = 'bg-emerald-600 text-white';
                  } else if (isSelected && !currentEval.isCorrect) {
                    optBg = 'border-rose-400 bg-rose-50/90 ring-2 ring-rose-300/30 shadow-sm';
                    iconBg = 'bg-rose-600 text-white';
                  } else {
                    optBg = 'border-stone-100 bg-stone-50/40 opacity-60';
                    iconBg = 'bg-stone-100 text-stone-400';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => {
                      if (!currentEval) onSelectOption(currentQ.id, opt);
                    }}
                    disabled={!!currentEval}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-150 flex items-start gap-4 ${optBg}`}
                  >
                    <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shadow-xs ${iconBg}`}>
                        {opt}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-stone-400">({num})</span>
                    </div>

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div
                        dir="rtl"
                        lang="ar"
                        className={`font-arabic text-xl sm:text-2xl font-semibold leading-[2.2] text-right ${
                          isCorrectOption && currentEval ? 'text-emerald-950' : 'text-stone-900'
                        }`}
                      >
                        {getOptionText(currentQ.options_arabic?.[opt], 'ar')}
                      </div>
                      {currentQ.options_english && (
                        <div
                          className={`text-xs sm:text-sm leading-relaxed font-medium ${
                            isCorrectOption && currentEval ? 'text-emerald-800' : 'text-stone-600'
                          }`}
                        >
                          <BilingualText text={getOptionText(currentQ.options_english[opt], 'en')} />
                        </div>
                      )}
                    </div>

                    {isSelected && !currentEval && (
                      <div className="ml-auto shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center mt-1">
                        <Check size={13} />
                      </div>
                    )}
                    {currentEval && isCorrectOption && (
                      <div className="ml-auto shrink-0 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-xs">
                        Correct
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Comprehensive Explanation & Answer Key if evaluated */}
            {currentEval && (
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-5 sm:p-6 mb-6 animate-slide-up">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-emerald-950 font-bold text-sm sm:text-base">
                    Official Answer &amp; Scholarly Explanation
                  </h3>
                  <span className="text-xs font-bold text-emerald-800 bg-white/80 px-2.5 py-1 rounded-full border border-emerald-200">
                    Correct Option: {correctOptionLetter}
                  </span>
                </div>

                {currentEval.correctText && (
                  <div
                    dir="rtl"
                    lang="ar"
                    className="text-emerald-900 font-arabic font-bold text-lg mb-3 text-right bg-white/70 p-3 rounded-xl border border-emerald-100"
                  >
                    {currentEval.correctText}
                  </div>
                )}

                {currentEval.explanation && (
                  <div className="text-stone-800 text-xs sm:text-sm leading-relaxed bg-white p-4 rounded-xl border border-emerald-100 shadow-xs">
                    <BilingualText text={currentEval.explanation} />
                  </div>
                )}
              </div>
            )}

            {/* Personal Memory Preview */}
            <QuestionMemoryStrip
              questionId={currentQ.id}
              onOpenModal={() => setMemoryModalOpen(true)}
              refreshTrigger={memoryRefresh}
            />
          </div>

          {/* Bottom Actions Bar */}
          <div className="shrink-0 p-4 bg-white border-t border-stone-200 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
              <button
                onClick={() => onToggleBookmark(currentQ.id)}
                className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-2 transition-colors font-bold text-xs sm:text-sm ${
                  isCurrentBookmarked
                    ? 'border-amber-500 text-amber-700 bg-amber-50'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Bookmark size={16} fill={isCurrentBookmarked ? 'currentColor' : 'none'} />
                {isCurrentBookmarked ? 'Marked' : 'Mark for Review'}
              </button>

              <MemoryButton
                questionId={currentQ.id}
                onOpenMemoryModal={() => setMemoryModalOpen(true)}
              />

              {isCurrentAnswered && onClearResponse && !currentEval && (
                <button
                  onClick={() => onClearResponse(currentQ.id)}
                  className="px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition-colors font-bold text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Memory Modal */}
            {memoryModalOpen && (
              <MemoryConnectionModal
                isOpen={memoryModalOpen}
                onClose={() => setMemoryModalOpen(false)}
                question={currentQ}
                onMemorySaved={() => setMemoryRefresh((prev) => prev + 1)}
              />
            )}

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto ml-auto">
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="flex-1 sm:flex-none px-5 py-2.5 font-bold text-stone-600 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl hover:bg-stone-50 disabled:opacity-40 transition-colors"
              >
                &lt; Previous
              </button>
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                disabled={currentIndex === questions.length - 1}
                className="flex-1 sm:flex-none px-6 py-2.5 font-bold text-white text-xs sm:text-sm bg-primary hover:bg-primary-dark rounded-xl disabled:opacity-40 transition-colors shadow-sm"
              >
                Next &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Palette Navigation */}
        <aside
          className={`fixed inset-y-0 right-0 z-30 w-72 sm:w-80 bg-white border-l border-stone-200 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            isNavOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
          }`}
        >
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <h2 className="font-bold text-stone-900 text-sm">Question Palette</h2>
            <button
              onClick={() => setIsNavOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isSelected = currentIndex === idx;
                const isAnswered = !!answers[q.id];
                const isMarked = bookmarked.has(q.id);
                const isVisited = visited.has(q.id);

                let btnBg = 'bg-stone-100 text-stone-600 hover:bg-stone-200';
                if (isAnswered && isMarked) {
                  btnBg = 'bg-purple-600 text-white font-bold';
                } else if (isAnswered) {
                  btnBg = 'bg-primary text-white font-bold';
                } else if (isMarked) {
                  btnBg = 'bg-amber-500 text-white font-bold';
                } else if (isVisited) {
                  btnBg = 'bg-rose-500 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      onNavigate(idx);
                      setIsNavOpen(false);
                    }}
                    className={`h-10 rounded-xl text-xs font-bold transition-all ${btnBg} ${
                      isSelected ? 'ring-2 ring-stone-900 ring-offset-2' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 border-t border-stone-200">
            <button
              onClick={() => setShowSubmitModal(true)}
              disabled={submitting}
              className="w-full py-3 bg-emerald-800 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50"
            >
              {submitting ? 'Calculating...' : 'Finish & View Analysis'}
            </button>
          </div>
        </aside>
      </div>

      {/* Confirmation Modal before Submit */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-stone-900">Ready to Review Your Score?</h3>
              <p className="text-stone-500 text-xs sm:text-sm">
                You have answered <strong>{Object.keys(answers).length}</strong> of{' '}
                <strong>{questions.length}</strong> questions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-100 font-medium">
              <div className="text-stone-600">Answered:</div>
              <div className="text-right font-bold text-emerald-800">{mockStats.answered + mockStats.answeredMarked}</div>
              <div className="text-stone-600">Unanswered:</div>
              <div className="text-right font-bold text-rose-600">{questions.length - (mockStats.answered + mockStats.answeredMarked)}</div>
              <div className="text-stone-600">Marked for Review:</div>
              <div className="text-right font-bold text-amber-600">{mockStats.marked + mockStats.answeredMarked}</div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 bg-stone-100 text-stone-700 font-bold text-xs sm:text-sm rounded-xl hover:bg-stone-200 transition-colors"
              >
                Continue Solving
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  onSubmit();
                }}
                className="flex-1 py-3 bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Show My Score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
