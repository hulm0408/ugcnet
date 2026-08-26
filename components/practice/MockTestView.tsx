import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, AlertCircle, Bookmark, Check, CheckCircle2, ArrowLeft, ArrowRight, User } from 'lucide-react';
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

  // Dynamic Timer logic: 80 seconds per question (or 160 min standard)
  const initialDuration = calculateTestDurationSeconds(questions?.length || 100);
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

  const answeredRegular = Object.keys(answers).filter((id) => !bookmarked.has(id)).length;
  const answeredAndMarked = Object.keys(answers).filter((id) => bookmarked.has(id)).length;
  const markedOnly = Array.from(bookmarked).filter((id) => !answers[id]).length;
  const notAnswered = Array.from(visited).filter((id) => !answers[id] && !bookmarked.has(id)).length;
  const notVisited = Math.max(0, questions.length - visited.size);

  const isCurrentBookmarked = currentQ ? bookmarked.has(currentQ.id) : false;
  const isCurrentAnswered = currentQ ? !!answers[currentQ.id] : false;

  const headerTitle =
    paper ||
    currentQ?.exam_paper?.display_name ||
    currentQ?.exam_paper?.exam_name ||
    (year ? `UGC NET – ${year}` : 'UGC NET CBT Simulator');

  if (!currentQ) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-[#F8FAFC]">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
          <p className="text-slate-600 font-bold">No question found at this index.</p>
        </div>
      </div>
    );
  }

  const currentEval = evaluations[currentQ.id];
  const correctOptionLetter = currentEval?.correctAnswer || currentEval?.correctOption;

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      
      {/* ── 1. NTA TOP DARK GREEN HEADER (ar03-cbt.png) ── */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#0A3D2A] text-white shrink-0 shadow-sm z-20 relative border-b border-[#145339]">
        
        {/* Candidate & Paper Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="lg:hidden p-1.5 rounded-lg text-emerald-200 hover:bg-white/10"
            aria-label="Toggle Question Palette"
          >
            {isNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link
            href="/dashboard"
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors hidden sm:inline-flex items-center gap-1 text-xs font-bold"
            title="Exit Simulator"
          >
            <ArrowLeft size={15} />
            <span>Exit</span>
          </Link>

          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm sm:text-base text-white tracking-tight">
                {headerTitle}
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 rounded bg-emerald-800 text-[10px] font-mono text-emerald-200 font-bold uppercase">
                ARABIC (Code 29)
              </span>
            </div>
            <span className="text-[11px] text-emerald-300 hidden sm:inline">
              Candidate: Ahmad Khan • Roll No: 290142
            </span>
          </div>
        </div>

        {/* Live NTA Countdown Timer */}
        <div className="flex flex-col items-center justify-center bg-[#072B1E] px-4 py-1.5 rounded-xl border border-[#145339]">
          <div className="text-base sm:text-lg font-bold text-white tracking-widest font-mono flex items-center gap-1">
            <span className="text-emerald-400 font-bold">{hours.toString().padStart(2, '0')}</span>
            <span className="text-emerald-600">:</span>
            <span className="text-emerald-400 font-bold">{minutes.toString().padStart(2, '0')}</span>
            <span className="text-emerald-600">:</span>
            <span className="text-emerald-400 font-bold">{seconds.toString().padStart(2, '0')}</span>
          </div>
          <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-widest">
            Time Remaining
          </span>
        </div>

        {/* Submit Test CTA */}
        <div>
          <button
            onClick={() => setShowSubmitModal(true)}
            disabled={submitting}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer active:scale-95"
          >
            {submitting ? 'Submitting...' : 'Submit Test'}
          </button>
        </div>
      </header>

      {/* ── 2. NTA 5-STATE LEGEND STRIP ── */}
      <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-2 bg-white border-b border-slate-200 shrink-0 text-[11px] font-bold text-slate-600 overflow-x-auto whitespace-nowrap z-10 no-scrollbar">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-600 shrink-0" />
          <span>Answered ({answeredRegular})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-rose-600 shrink-0" />
          <span>Not Answered ({notAnswered})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-purple-600 shrink-0" />
          <span>Marked for Review ({markedOnly})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-purple-700 relative shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute top-0.5 right-0.5" />
          </span>
          <span>Ans &amp; Marked ({answeredAndMarked})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-300 shrink-0" />
          <span>Not Visited ({notVisited})</span>
        </div>
      </div>

      {/* ── 3. MAIN WORKSPACE ── */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left: Question Presentation Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white z-0 h-full">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            
            {/* Top Question Status Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-200">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                {currentQ.exam_paper && (
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                    {currentQ.exam_paper.year} • {currentQ.exam_paper.paper_number}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span>Marks: +2.0</span>
                <span>•</span>
                <span>Negative: 0.0</span>
              </div>
            </div>

            {/* RTL Arabic Question Statement */}
            <div
              dir="rtl"
              lang="ar"
              className="text-2xl sm:text-3xl font-arabic font-semibold text-slate-950 leading-[2.4] text-right py-2"
            >
              {currentQ.question_arabic}
            </div>

            {/* Optional English Question Context */}
            {currentQ.question_english && (
              <div className="text-slate-700 text-sm sm:text-base font-normal border-l-4 border-emerald-600 pl-4 py-1.5 leading-relaxed bg-slate-50 rounded-r-xl">
                <BilingualText text={currentQ.question_english} />
              </div>
            )}

            {/* 4 MCQ Options (A, B, C, D) */}
            <div className="space-y-3 max-w-3xl pt-2">
              {[
                { opt: 'A', num: '1' },
                { opt: 'B', num: '2' },
                { opt: 'C', num: '3' },
                { opt: 'D', num: '4' },
              ].map(({ opt, num }) => {
                const isSelected = answers[currentQ.id] === opt;
                const isCorrectOption = correctOptionLetter === opt;

                let optBg = 'border-slate-200 bg-white hover:border-emerald-500/80 hover:bg-slate-50';
                let iconBg = 'bg-slate-100 text-slate-700 border-slate-300';

                if (isSelected) {
                  optBg = 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-xs';
                  iconBg = 'bg-emerald-600 text-white border-emerald-600';
                }

                if (currentEval) {
                  if (isCorrectOption) {
                    optBg = 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400/30';
                    iconBg = 'bg-emerald-600 text-white border-emerald-600';
                  } else if (isSelected && !currentEval.isCorrect) {
                    optBg = 'border-rose-400 bg-rose-50 ring-2 ring-rose-300/30';
                    iconBg = 'bg-rose-600 text-white border-rose-600';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => {
                      if (!currentEval) onSelectOption(currentQ.id, opt);
                    }}
                    disabled={!!currentEval}
                    className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-start gap-4 cursor-pointer ${optBg}`}
                  >
                    <div className="flex flex-col items-center gap-0.5 shrink-0 pt-0.5">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black border shadow-2xs ${iconBg}`}
                      >
                        {opt}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">({num})</span>
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div
                        dir="rtl"
                        lang="ar"
                        className="font-arabic text-xl sm:text-2xl font-semibold leading-[2.2] text-right text-slate-900"
                      >
                        {getOptionText(currentQ.options_arabic?.[opt], 'ar')}
                      </div>
                      {currentQ.options_english && (
                        <div className="text-xs sm:text-sm text-slate-600 font-medium">
                          <BilingualText text={getOptionText(currentQ.options_english[opt], 'en')} />
                        </div>
                      )}
                    </div>

                    {isSelected && !currentEval && (
                      <div className="ml-auto shrink-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center mt-1">
                        <Check size={12} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Official Answer & Explanation if in practice/evaluated mode */}
            {currentEval && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-emerald-950 text-sm">
                    Official Answer &amp; Explanation
                  </h3>
                  <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Correct Option: {correctOptionLetter}
                  </span>
                </div>

                {currentEval.explanation && (
                  <div className="text-slate-800 text-xs sm:text-sm leading-relaxed bg-white p-4 rounded-xl border border-emerald-100">
                    <BilingualText text={currentEval.explanation} />
                  </div>
                )}
              </div>
            )}

            {/* Spaced Repetition Memory Strip */}
            <QuestionMemoryStrip
              questionId={currentQ.id}
              onOpenModal={() => setMemoryModalOpen(true)}
              refreshTrigger={memoryRefresh}
            />

          </div>

          {/* Bottom Actions Bar */}
          <div className="shrink-0 p-3.5 sm:p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onToggleBookmark(currentQ.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border font-bold text-xs sm:text-sm transition-colors cursor-pointer ${
                  isCurrentBookmarked
                    ? 'border-purple-600 text-purple-700 bg-purple-50'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Bookmark size={15} fill={isCurrentBookmarked ? 'currentColor' : 'none'} />
                <span>{isCurrentBookmarked ? 'Marked' : 'Mark for Review'}</span>
              </button>

              <MemoryButton
                questionId={currentQ.id}
                onOpenMemoryModal={() => setMemoryModalOpen(true)}
              />

              {isCurrentAnswered && onClearResponse && !currentEval && (
                <button
                  onClick={() => onClearResponse(currentQ.id)}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold text-xs transition-colors cursor-pointer"
                >
                  Clear Response
                </button>
              )}
            </div>

            {/* Navigation buttons: << Previous and Save & Next >> */}
            <div className="flex items-center gap-2.5 ml-auto">
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="px-4 sm:px-5 py-2.5 font-bold text-slate-700 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
              >
                &laquo; Previous
              </button>
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                disabled={currentIndex === questions.length - 1}
                className="px-5 sm:px-6 py-2.5 font-bold text-white text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 rounded-xl disabled:opacity-40 transition-all shadow-xs cursor-pointer inline-flex items-center gap-1"
              >
                <span>Save &amp; Next</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: 5-State Question Palette */}
        <aside
          className={`fixed inset-y-0 right-0 z-30 w-72 sm:w-80 bg-white border-l border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            isNavOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
          }`}
        >
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <h2 className="font-bold text-slate-900 text-sm">Question Palette</h2>
            <button
              onClick={() => setIsNavOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
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

                let btnBg = 'bg-slate-200 text-slate-700 hover:bg-slate-300';
                let indicator = null;

                if (isAnswered && isMarked) {
                  btnBg = 'bg-purple-700 text-white font-bold relative';
                  indicator = <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1 right-1" />;
                } else if (isAnswered) {
                  btnBg = 'bg-emerald-600 text-white font-bold';
                } else if (isMarked) {
                  btnBg = 'bg-purple-600 text-white font-bold';
                } else if (isVisited) {
                  btnBg = 'bg-rose-600 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      onNavigate(idx);
                      setIsNavOpen(false);
                    }}
                    className={`h-10 rounded-xl text-xs font-bold transition-all relative flex items-center justify-center cursor-pointer ${btnBg} ${
                      isSelected ? 'ring-2 ring-slate-900 ring-offset-2' : ''
                    }`}
                  >
                    {idx + 1}
                    {indicator}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button
              onClick={() => setShowSubmitModal(true)}
              disabled={submitting}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Submitting...' : 'Finish & View Score'}
            </button>
          </div>
        </aside>

      </div>

      {/* Confirmation Modal before Submit */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 size={26} />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="text-xl font-bold text-slate-900 font-serif">Submit Examination?</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">
                You have answered <strong>{Object.keys(answers).length}</strong> of{' '}
                <strong>{questions.length}</strong> questions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium">
              <div className="text-slate-600">Answered:</div>
              <div className="text-right font-bold text-emerald-700">{answeredRegular + answeredAndMarked}</div>
              <div className="text-slate-600">Unanswered:</div>
              <div className="text-right font-bold text-rose-600">{questions.length - (answeredRegular + answeredAndMarked)}</div>
              <div className="text-slate-600">Marked for Review:</div>
              <div className="text-right font-bold text-purple-700">{markedOnly + answeredAndMarked}</div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Back to Test
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  onSubmit();
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Confirm &amp; Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Memory Connection Modal */}
      {memoryModalOpen && (
        <MemoryConnectionModal
          isOpen={memoryModalOpen}
          onClose={() => setMemoryModalOpen(false)}
          question={currentQ}
          onMemorySaved={() => setMemoryRefresh((prev) => prev + 1)}
        />
      )}

    </div>
  );
}
