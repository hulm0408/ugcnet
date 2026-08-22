import React, { useState, useEffect } from 'react';
import NtaPaletteIcon from '@/components/ui/NtaPaletteIcon';

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
    <div className="flex flex-col h-screen bg-[#FCFAF8] font-sans">
      
      {/* Top Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-stone-200 shrink-0 shadow-sm z-10">
        <div className="font-bold text-stone-900">
          UGC NET Arabic – {year} {paper}
        </div>
        
        {/* Timer */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-xl font-bold text-stone-900 tracking-wider flex items-center gap-1">
            <span>{hours.toString().padStart(2, '0')}</span>
            <span className="text-stone-400">:</span>
            <span>{minutes.toString().padStart(2, '0')}</span>
            <span className="text-stone-400">:</span>
            <span>{seconds.toString().padStart(2, '0')}</span>
          </div>
          <div className="flex gap-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">
            <span>Hours</span>
            <span>Min</span>
            <span>Sec</span>
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={submitting}
          className="px-6 py-2.5 bg-[#DC2626] text-white font-bold text-sm rounded-lg hover:bg-[#B91C1C] transition-colors shadow-sm disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Test'}
        </button>
      </header>

      {/* Legend Bar */}
      <div className="flex items-center gap-8 px-6 py-3 bg-stone-50 border-b border-stone-200 shrink-0 text-xs font-bold text-stone-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#107A53]" /> Answered
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" /> Not Answered
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#D97706]" /> Marked for Review
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-stone-300" /> Not Visited
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left: Question Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-stone-900">Question {currentIndex + 1}</h2>
              {evaluations[currentQ.id] && (
                evaluations[currentQ.id].isCorrect ? (
                  <span className="px-3 py-1 bg-[#107A53]/10 text-[#107A53] text-sm font-bold rounded uppercase tracking-wider flex items-center gap-1.5">
                    <svg width="12" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Correct
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-rose-100 text-rose-700 text-sm font-bold rounded uppercase tracking-wider flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Incorrect
                  </span>
                )
              )}
            </div>
            
            <div dir="rtl" className="text-2xl font-arabic font-bold text-stone-900 leading-relaxed mb-6">
              {currentQ.question_arabic}
            </div>
            
            {currentQ.question_english && (
              <div className="text-stone-700 text-base mb-8">
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
                  optBg = 'border-[#107A53] bg-[#107A53]/5';
                  iconBg = 'bg-[#107A53] text-white';
                }

                if (evalRes) {
                  if (evalRes.correctOption === opt) {
                    optBg = 'border-[#107A53] bg-[#107A53]/10 ring-1 ring-[#107A53]';
                    iconBg = 'bg-[#107A53] text-white';
                  } else if (isSelected && !evalRes.isCorrect) {
                    optBg = 'border-rose-300 bg-rose-50 ring-1 ring-rose-300';
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
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${optBg}`}
                  >
                    <div className={`shrink-0 w-6 h-6 rounded flex items-center justify-center text-sm font-bold mt-0.5 ${iconBg}`}>
                      {opt}
                    </div>
                    <div className="flex-1">
                      <div dir="rtl" className="font-arabic text-lg font-bold text-stone-900 mb-1">
                        {currentQ.options_arabic?.[opt] as string}
                      </div>
                      {currentQ.options_english && (
                        <div className="text-stone-600 text-sm">
                          {currentQ.options_english[opt] as string}
                        </div>
                      )}
                    </div>
                    {isSelected && !evalRes && (
                      <div className="ml-auto shrink-0 w-6 h-6 rounded-full bg-[#107A53] text-white flex items-center justify-center">
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    {evalRes && evalRes.correctOption === opt && (
                      <div className="ml-auto shrink-0 w-6 h-6 rounded-full bg-[#107A53] text-white flex items-center justify-center">
                        <svg width="12" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    {evalRes && isSelected && !evalRes.isCorrect && (
                      <div className="ml-auto shrink-0 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
              <div className="bg-[#107A53]/5 border border-[#107A53]/20 rounded-2xl p-6 mb-4">
                <h3 className="text-stone-900 font-bold mb-3">Explanation</h3>
                <div className="text-stone-700 text-sm space-y-3">
                  {evaluations[currentQ.id].explanation.split('\n').map((para: string, i: number) => (
                    <p key={i} dir={para.match(/[\u0600-\u06FF]/) ? "rtl" : "ltr"} className={para.match(/[\u0600-\u06FF]/) ? "font-arabic text-lg font-medium" : ""}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="shrink-0 p-6 bg-white border-t border-stone-200 flex items-center justify-between">
            <button
              onClick={() => onToggleBookmark(currentQ.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 transition-colors font-bold text-sm ${
                isCurrentBookmarked 
                  ? 'border-[#D97706] text-[#D97706] bg-[#D97706]/10' 
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={isCurrentBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              {isCurrentBookmarked ? 'Marked for Review' : 'Mark for Review'}
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="px-6 py-2.5 font-bold text-stone-500 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-50 transition-colors"
              >
                &lt; Previous
              </button>
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                disabled={currentIndex === questions.length - 1}
                className="px-6 py-2.5 font-bold text-white bg-[#107A53] rounded-lg hover:bg-[#0c5c3e] disabled:opacity-50 transition-colors"
              >
                Save & Next &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right: Navigator */}
        <aside className="w-[320px] bg-[#FCFAF8] border-l border-stone-200 flex flex-col shrink-0">
          <div className="px-5 py-4 border-b border-stone-200 bg-white">
            <span className="font-bold text-stone-900">Question Navigator</span>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <div className="grid grid-cols-5 gap-3">
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
                    onClick={() => onNavigate(idx)}
                    className={`relative rounded-md transition-all hover:scale-105 ${
                      isCurrent ? 'ring-2 ring-offset-2 ring-stone-900 scale-105 z-10' : ''
                    }`}
                  >
                    <NtaPaletteIcon status={status} number={idx + 1} className="w-full h-10 text-xs font-bold rounded-md" />
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="p-4 bg-white border-t border-stone-200">
             <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="answered" number={mockStats.answered} className="w-6 h-6 text-[10px] rounded" />
                  <span className="text-[10px] font-bold text-stone-500">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="not-answered" number={mockStats.notAnswered} className="w-6 h-6 text-[10px] rounded" />
                  <span className="text-[10px] font-bold text-stone-500">Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="marked" number={mockStats.marked} className="w-6 h-6 text-[10px] rounded" />
                  <span className="text-[10px] font-bold text-stone-500">Marked</span>
                </div>
                <div className="flex items-center gap-2">
                  <NtaPaletteIcon status="not-visited" number={mockStats.notVisited} className="w-6 h-6 text-[10px] rounded" />
                  <span className="text-[10px] font-bold text-stone-500">Not Visited</span>
                </div>
              </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
