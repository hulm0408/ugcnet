import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NtaPaletteIcon from '@/components/ui/NtaPaletteIcon';
import { Menu, X, AlertCircle, Bookmark, Check, RefreshCw, ArrowLeft } from 'lucide-react';
import { getOptionText } from '@/lib/arabicUtils';
import MemoryButton from '@/components/memory/MemoryButton';
import QuestionMemoryStrip from '@/components/memory/QuestionMemoryStrip';
import MemoryConnectionModal from '@/components/memory/MemoryConnectionModal';

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
  
  // Timer logic (120 mins countdown)
  const [timeLeft, setTimeLeft] = useState(120 * 60);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);
  const [memoryRefresh, setMemoryRefresh] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const headerTitle = paper || (year ? `UGC NET Arabic – ${year}` : 'UGC NET Arabic Practice');

  if (!currentQ) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-[#FCFAF8]">
        <div className="bg-white p-8 rounded-3xl border border-stone-200 text-center">
          <p className="text-stone-600 font-bold">No question found at this index.</p>
        </div>
      </div>
    );
  }

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

          <div className="font-bold text-stone-900 text-sm sm:text-base">
            {headerTitle}
          </div>
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
          className="px-4 py-2 sm:px-6 sm:py-2.5 bg-rose-600 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Test'}
        </button>
      </header>

      {/* Legend Bar */}
      <div className="flex items-center gap-6 sm:gap-8 px-4 sm:px-6 py-2.5 bg-stone-50 border-b border-stone-200 shrink-0 text-[10px] sm:text-xs font-bold text-stone-600 overflow-x-auto whitespace-nowrap z-10 no-scrollbar">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" /> Answered ({mockStats.answered})
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" /> Not Answered ({mockStats.notAnswered})
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" /> Marked for Review ({mockStats.marked})
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-300 shrink-0" /> Not Visited ({mockStats.notVisited})
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

              {evaluations[currentQ.id] && (
                evaluations[currentQ.id].isCorrect ? (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5 border border-emerald-200">
                    <Check size={14} /> Correct (+2 Marks)
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5 border border-rose-200">
                    <X size={14} /> Incorrect (0 Marks)
                  </span>
                )
              )}
            </div>
            
            {/* Arabic Question Body */}
            <div dir="rtl" className="text-xl sm:text-2xl font-arabic font-bold text-stone-900 leading-loose mb-6">
              {currentQ.question_arabic}
            </div>
            
            {currentQ.question_english && (
              <div className="text-stone-700 text-sm sm:text-base font-medium mb-6 sm:mb-8">
                {currentQ.question_english}
              </div>
            )}

            {/* MCQ Options A, B, C, D */}
            <div className="space-y-3 max-w-3xl mb-8">
              {['A', 'B', 'C', 'D'].map((opt) => {
                const isSelected = answers[currentQ.id] === opt;
                const evalRes = evaluations[currentQ.id];
                
                let optBg = 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/80';
                let iconBg = 'bg-stone-100 text-stone-600';
                
                if (isSelected) {
                  optBg = 'border-primary bg-primary-surface ring-1 ring-primary/30 shadow-sm';
                  iconBg = 'bg-primary text-white';
                }

                if (evalRes) {
                  if (evalRes.correctOption === opt) {
                    optBg = 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-400 shadow-sm';
                    iconBg = 'bg-emerald-600 text-white';
                  } else if (isSelected && !evalRes.isCorrect) {
                    optBg = 'border-rose-300 bg-rose-50 ring-1 ring-rose-300 shadow-sm';
                    iconBg = 'bg-rose-600 text-white';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => {
                      if (!evalRes) onSelectOption(currentQ.id, opt);
                    }}
                    disabled={!!evalRes}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-4 ${optBg}`}
                  >
                    <div className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold mt-0.5 ${iconBg}`}>
                      {opt}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div dir="rtl" className="font-arabic text-base sm:text-lg font-bold text-stone-900 mb-1 leading-snug">
                        {getOptionText(currentQ.options_arabic?.[opt], 'ar')}
                      </div>
                      {currentQ.options_english && (
                        <div className="text-stone-600 text-xs sm:text-sm">
                          {getOptionText(currentQ.options_english[opt], 'en')}
                        </div>
                      )}
                    </div>
                    {isSelected && !evalRes && (
                      <div className="ml-auto shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                        <Check size={14} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation if evaluated */}
            {evaluations[currentQ.id]?.explanation && (
              <div className="bg-primary-surface border border-primary/20 rounded-2xl p-5 mb-4">
                <h3 className="text-stone-900 font-bold mb-2 text-sm sm:text-base">Explanation</h3>
                <div className="text-stone-700 text-xs sm:text-sm space-y-2">
                  {evaluations[currentQ.id].explanation.split('\n').map((para: string, i: number) => (
                    <p key={i} dir={para.match(/[\u0600-\u06FF]/) ? 'rtl' : 'ltr'} className={para.match(/[\u0600-\u06FF]/) ? 'font-arabic text-base leading-relaxed' : 'leading-relaxed'}>
                      {para}
                    </p>
                  ))}
                </div>
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

              {isCurrentAnswered && onClearResponse && (
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

        {/* Right: Question Palette Navigator */}
        {isNavOpen && (
          <div 
            className="fixed inset-0 bg-stone-900/50 z-30 lg:hidden"
            onClick={() => setIsNavOpen(false)}
          />
        )}
        
        <aside className={`
          fixed inset-y-0 right-0 z-40 w-72 sm:w-80 bg-[#FCFAF8] shadow-2xl lg:shadow-none transform transition-transform duration-300 ease-in-out flex flex-col shrink-0 lg:static lg:w-[320px] lg:border-l lg:border-stone-200 lg:translate-x-0
          ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="px-5 py-4 border-b border-stone-200 bg-white flex items-center justify-between shrink-0">
            <span className="font-bold text-stone-900 text-sm sm:text-base">Question Navigator</span>
            <button 
              onClick={() => setIsNavOpen(false)}
              className="lg:hidden p-1.5 text-stone-500 hover:bg-stone-100 rounded-md"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAns = !!answers[q.id];
                const isBook = bookmarked.has(q.id);
                const isVis = visited.has(q.id);

                let status: React.ComponentProps<typeof NtaPaletteIcon>['status'] = 'not-visited';
                if (isAns && isBook) status = 'answered-marked';
                else if (isAns) status = 'answered';
                else if (isBook) status = 'marked';
                else if (isVis) status = 'not-answered';

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      onNavigate(idx);
                      if (typeof window !== 'undefined' && window.innerWidth < 1024) setIsNavOpen(false);
                    }}
                    className={`relative rounded-xl transition-all hover:scale-105 ${
                      isCurrent ? 'ring-2 ring-offset-2 ring-stone-900 scale-105 z-10' : ''
                    }`}
                  >
                    <NtaPaletteIcon status={status} number={idx + 1} className="w-full h-9 sm:h-10 text-[10px] sm:text-xs font-bold rounded-xl" />
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="p-4 bg-white border-t border-stone-200 shrink-0">
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-2">
              <div className="flex items-center gap-2">
                <NtaPaletteIcon status="answered" number={mockStats.answered} className="w-5 h-5 text-[9px] rounded-md" />
                <span className="text-[10px] font-bold text-stone-600">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <NtaPaletteIcon status="not-answered" number={mockStats.notAnswered} className="w-5 h-5 text-[9px] rounded-md" />
                <span className="text-[10px] font-bold text-stone-600">Not Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <NtaPaletteIcon status="marked" number={mockStats.marked} className="w-5 h-5 text-[9px] rounded-md" />
                <span className="text-[10px] font-bold text-stone-600">Marked</span>
              </div>
              <div className="flex items-center gap-2">
                <NtaPaletteIcon status="not-visited" number={mockStats.notVisited} className="w-5 h-5 text-[9px] rounded-md" />
                <span className="text-[10px] font-bold text-stone-600">Not Visited</span>
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-stone-900 text-lg">Submit Examination</h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="text-2xl font-black text-emerald-800">{mockStats.answered + mockStats.answeredMarked}</div>
                <div className="text-xs font-bold text-emerald-700">Answered</div>
              </div>
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100">
                <div className="text-2xl font-black text-rose-800">{questions.length - (mockStats.answered + mockStats.answeredMarked)}</div>
                <div className="text-xs font-bold text-rose-700">Unanswered</div>
              </div>
            </div>

            <p className="text-stone-500 text-xs sm:text-sm text-center">
              Are you sure you want to submit your test? Once submitted, you will receive your score breakdown and answers analysis.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm rounded-xl transition-colors"
              >
                Continue Test
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  onSubmit();
                }}
                disabled={submitting}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Confirm Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
