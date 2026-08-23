import React, { useState, useEffect } from 'react';
import NtaPaletteIcon from '@/components/ui/NtaPaletteIcon';
import { Menu, X } from 'lucide-react';

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
  onSubmit: () => void;
  submitting: boolean;
  evaluations?: Record<string, any>;
}

export default function MockTestView({
  year = '2009',
  paper = 'Paper II',
  questions,
  currentIndex,
  answers,
  bookmarked,
  visited,
  onSelectOption,
  onNavigate,
  onToggleBookmark,
  onSubmit,
  submitting,
  evaluations = {}
}: MockTestViewProps) {
  const currentQ = questions[currentIndex];
  
  // Timer logic (Mocking 120 mins)
  const [timeLeft, setTimeLeft] = useState(120 * 60);
  const [isNavOpen, setIsNavOpen] = useState(false); // Mobile navigator toggle

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const mockStats = {
    answered: Object.keys(answers).filter(id => !bookmarked.has(id)).length,
    answeredMarked: Object.keys(answers).filter(id => bookmarked.has(id)).length,
    notAnswered: Array.from(visited).filter(id => !answers[id]).length,
    marked: Array.from(bookmarked).filter(id => !answers[id]).length,
    notVisited: questions.length - visited.size,
  };

  const isCurrentBookmarked = bookmarked.has(currentQ.id);

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
          <div className="font-bold text-stone-900 text-sm sm:text-base">
            UGC NET Arabic – {year} {paper}
          </div>
        </div>
        
        {/* Timer */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-lg sm:text-xl font-bold text-stone-900 tracking-wider flex items-center gap-1">
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
          onClick={onSubmit}
          disabled={submitting}
          className="px-4 py-2 sm:px-6 sm:py-2.5 bg-[#DC2626] text-white font-bold text-xs sm:text-sm rounded-lg hover:bg-[#B91C1C] transition-colors shadow-sm disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Test'}
        </button>
      </header>

      {/* Legend Bar (Scrollable on mobile) */}
      <div className="flex items-center gap-6 sm:gap-8 px-4 sm:px-6 py-3 bg-stone-50 border-b border-stone-200 shrink-0 text-[10px] sm:text-xs font-bold text-stone-600 overflow-x-auto whitespace-nowrap z-10 no-scrollbar">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary shrink-0" /> Answered
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500 shrink-0" /> Not Answered
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent shrink-0" /> Marked for Review
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-stone-300 shrink-0" /> Not Visited
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left: Question Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white z-0 h-full">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900">Question {currentIndex + 1}</h2>
              {evaluations[currentQ.id] && (
                evaluations[currentQ.id].isCorrect ? (
                  <span className="px-2 py-1 sm:px-3 sm:py-1 bg-primary-surface text-primary-dark text-xs sm:text-sm font-bold rounded-md uppercase tracking-wider flex items-center gap-1.5 border border-primary/20">
                    <svg width="12" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Correct
                  </span>
                ) : (
                  <span className="px-2 py-1 sm:px-3 sm:py-1 bg-rose-50 text-rose-700 text-xs sm:text-sm font-bold rounded-md uppercase tracking-wider flex items-center gap-1.5 border border-rose-200">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Incorrect
                  </span>
                )
              )}
            </div>
            
            <div dir="rtl" className="text-xl sm:text-2xl font-arabic font-bold text-stone-900 leading-relaxed mb-6">
              {currentQ.question_arabic}
            </div>
            
            {currentQ.question_english && (
              <div className="text-stone-700 text-sm sm:text-base mb-6 sm:mb-8">
                {currentQ.question_english}
              </div>
            )}

            <div className="space-y-3 max-w-3xl mb-8">
              {['A', 'B', 'C', 'D'].map((opt) => {
                const isSelected = answers[currentQ.id] === opt;
                const evalRes = evaluations[currentQ.id];
                
                let optBg = 'border-stone-200 hover:border-stone-300 hover:bg-stone-50';
                let iconBg = 'bg-stone-100 text-stone-600';
                
                if (isSelected) {
                  optBg = 'border-primary bg-primary-surface';
                  iconBg = 'bg-primary text-white';
                }

                if (evalRes) {
                  if (evalRes.correctOption === opt) {
                    optBg = 'border-primary bg-primary-surface ring-1 ring-primary/30 shadow-sm';
                    iconBg = 'bg-primary text-white';
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
                    className={`w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all flex items-start gap-3 sm:gap-4 ${optBg}`}
                  >
                    <div className={`shrink-0 w-6 h-6 rounded flex items-center justify-center text-sm font-bold mt-0.5 ${iconBg}`}>
                      {opt}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div dir="rtl" className="font-arabic text-base sm:text-lg font-bold text-stone-900 mb-1 leading-snug">
                        {currentQ.options_arabic?.[opt] as string}
                      </div>
                      {currentQ.options_english && (
                        <div className="text-stone-600 text-xs sm:text-sm">
                          {currentQ.options_english[opt] as string}
                        </div>
                      )}
                    </div>
                    {isSelected && !evalRes && (
                      <div className="ml-auto shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-white flex items-center justify-center">
                        <svg width="12" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    {evalRes && evalRes.correctOption === opt && (
                      <div className="ml-auto shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-white flex items-center justify-center">
                        <svg width="12" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    {evalRes && isSelected && !evalRes.isCorrect && (
                      <div className="ml-auto shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-600 text-white flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {evaluations[currentQ.id]?.explanation && (
              <div className="bg-primary-surface border border-primary/20 rounded-2xl p-4 sm:p-6 mb-4">
                <h3 className="text-stone-900 font-bold mb-3 text-sm sm:text-base">Explanation</h3>
                <div className="text-stone-700 text-xs sm:text-sm space-y-3">
                  {evaluations[currentQ.id].explanation.split('\n').map((para: string, i: number) => (
                    <p key={i} dir={para.match(/[\u0600-\u06FF]/) ? "rtl" : "ltr"} className={para.match(/[\u0600-\u06FF]/) ? "font-arabic text-base sm:text-lg font-medium leading-relaxed" : "leading-relaxed"}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="shrink-0 p-3 sm:p-4 bg-white border-t border-stone-200 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
            <button
              onClick={() => onToggleBookmark(currentQ.id)}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg border-2 transition-colors font-bold text-xs sm:text-sm w-full sm:w-auto ${
                isCurrentBookmarked 
                  ? 'border-[#D97706] text-[#D97706] bg-[#D97706]/10' 
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={isCurrentBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-4 sm:h-4">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              {isCurrentBookmarked ? 'Marked' : 'Mark for Review'}
            </button>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="flex-1 sm:flex-none px-4 py-2 sm:px-6 sm:py-2.5 font-bold text-stone-500 text-xs sm:text-sm bg-white border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-50 transition-colors"
              >
                &lt; Prev
              </button>
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                disabled={currentIndex === questions.length - 1}
                className="flex-1 sm:flex-none px-4 py-2 sm:px-6 sm:py-2.5 font-bold text-white text-xs sm:text-sm bg-[#107A53] rounded-lg hover:bg-[#0c5c3e] disabled:opacity-50 transition-colors"
              >
                Next &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right: Navigator (Drawer on Mobile, Sidebar on Desktop) */}
        {/* Overlay for mobile drawer */}
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
          <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-stone-200 bg-white flex items-center justify-between shrink-0">
            <span className="font-bold text-stone-900 text-sm sm:text-base">Question Navigator</span>
            <button 
              onClick={() => setIsNavOpen(false)}
              className="lg:hidden p-1.5 text-stone-500 hover:bg-stone-100 rounded-md"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
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
                      if (window.innerWidth < 1024) setIsNavOpen(false); // Close drawer on mobile after nav
                    }}
                    className={`relative rounded-md transition-all hover:scale-105 ${
                      isCurrent ? 'ring-2 ring-offset-2 ring-stone-900 scale-105 z-10' : ''
                    }`}
                  >
                    <NtaPaletteIcon status={status} number={idx + 1} className="w-full h-9 sm:h-10 text-[10px] sm:text-xs font-bold rounded-md" />
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="p-3 sm:p-4 bg-white border-t border-stone-200 shrink-0">
             <div className="grid grid-cols-2 gap-y-2 sm:gap-y-3 gap-x-2">
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="answered" number={mockStats.answered} className="w-5 h-5 sm:w-6 sm:h-6 text-[9px] sm:text-[10px] rounded" />
                  <span className="text-[9px] sm:text-[10px] font-bold text-stone-500">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="not-answered" number={mockStats.notAnswered} className="w-5 h-5 sm:w-6 sm:h-6 text-[9px] sm:text-[10px] rounded" />
                  <span className="text-[9px] sm:text-[10px] font-bold text-stone-500">Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="marked" number={mockStats.marked} className="w-5 h-5 sm:w-6 sm:h-6 text-[9px] sm:text-[10px] rounded" />
                  <span className="text-[9px] sm:text-[10px] font-bold text-stone-500">Marked</span>
                </div>
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="not-visited" number={mockStats.notVisited} className="w-5 h-5 sm:w-6 sm:h-6 text-[9px] sm:text-[10px] rounded" />
                  <span className="text-[9px] sm:text-[10px] font-bold text-stone-500">Not Visited</span>
                </div>
              </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

