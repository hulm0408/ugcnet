import React, { useState } from 'react';
import Link from 'next/link';
import { List, X } from 'lucide-react';
import { getOptionText } from '@/lib/arabicUtils';
import MemoryButton from '@/components/memory/MemoryButton';
import QuestionMemoryStrip from '@/components/memory/QuestionMemoryStrip';
import MemoryConnectionModal from '@/components/memory/MemoryConnectionModal';

interface QuestionReviewViewProps {
  year?: string;
  paper?: string;
  questions: any[];
  answers: Record<string, string>;
  evaluations: Record<string, any>;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  totalQuestions: number;
}

export default function QuestionReviewView({
  year,
  paper,
  questions,
  answers,
  evaluations,
  correctCount,
  incorrectCount,
  unattemptedCount,
  totalQuestions
}: QuestionReviewViewProps) {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isListOpen, setIsListOpen] = useState(false);
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);
  const [memoryRefresh, setMemoryRefresh] = useState(0);

  const headerTitle = paper || (year ? `UGC NET Arabic – ${year}` : 'UGC NET Arabic Practice');

  const filteredQuestions = questions.map((q, idx) => ({ q, idx })).filter(({ q }) => {
    const isAns = !!answers[q.id];
    const isCorr = evaluations[q.id]?.isCorrect;
    
    if (filter === 'all') return true;
    if (filter === 'correct') return isAns && isCorr;
    if (filter === 'incorrect') return isAns && !isCorr;
    if (filter === 'unattempted') return !isAns;
    return true;
  });

  // If the filtered list doesn't contain the selected index, reset to the first available
  const activeIndex = filteredQuestions.find(fq => fq.idx === selectedIndex) 
    ? selectedIndex 
    : (filteredQuestions[0]?.idx ?? 0);
  
  const currentQ = questions[activeIndex];
  const evalRes = currentQ ? evaluations[currentQ.id] : null;
  const userAnswer = currentQ ? answers[currentQ.id] : null;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-primary-surface to-white font-sans overflow-hidden">
      
      {/* Top Header */}
      <header className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-stone-200 shrink-0 shadow-sm z-20 relative">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsListOpen(!isListOpen)}
            className="lg:hidden p-2 -ml-2 rounded-lg text-stone-600 hover:bg-stone-100"
          >
            {isListOpen ? <X size={20} /> : <List size={20} />}
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <div className="font-bold text-stone-900 text-sm sm:text-base">
              {headerTitle}
            </div>
            <div className="hidden sm:block h-4 w-px bg-stone-300" />
            <div className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider">
              Question Review
            </div>
          </div>
        </div>
        
        <Link 
          href="/dashboard"
          className="px-4 py-2 sm:px-6 sm:py-2.5 bg-stone-100 text-stone-700 font-bold text-xs sm:text-sm rounded-lg hover:bg-stone-200 transition-colors border border-stone-200"
        >
          Dashboard
        </Link>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Mobile Overlay */}
        {isListOpen && (
          <div 
            className="fixed inset-0 bg-stone-900/50 z-30 lg:hidden"
            onClick={() => setIsListOpen(false)}
          />
        )}
        
        {/* Left Sidebar: Question List */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-72 sm:w-80 bg-white shadow-2xl lg:shadow-none transform transition-transform duration-300 ease-in-out flex flex-col shrink-0 
          lg:static lg:w-[380px] lg:border-r lg:border-stone-200 lg:translate-x-0
          ${isListOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-3 sm:p-4 border-b border-stone-200 bg-stone-50 shrink-0 flex items-center justify-between lg:block">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-stone-600 flex-1">
              <button 
                onClick={() => setFilter('all')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-colors ${filter === 'all' ? 'bg-stone-800 text-white' : 'hover:bg-stone-200 bg-white border border-stone-200'}`}
              >
                All ({totalQuestions})
              </button>
              <button 
                onClick={() => setFilter('correct')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-colors ${filter === 'correct' ? 'bg-primary text-white' : 'hover:bg-primary-surface bg-white border border-stone-200 text-primary'}`}
              >
                Correct ({correctCount})
              </button>
              <button 
                onClick={() => setFilter('incorrect')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-colors ${filter === 'incorrect' ? 'bg-rose-600 text-white' : 'hover:bg-rose-50 bg-white border border-stone-200 text-rose-600'}`}
              >
                Incorrect ({incorrectCount})
              </button>
              <button 
                onClick={() => setFilter('unattempted')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-colors ${filter === 'unattempted' ? 'bg-stone-500 text-white' : 'hover:bg-stone-100 bg-white border border-stone-200 text-stone-500'}`}
              >
                Missed ({unattemptedCount})
              </button>
            </div>
            <button 
              onClick={() => setIsListOpen(false)}
              className="lg:hidden p-1.5 ml-2 text-stone-500 hover:bg-stone-200 rounded-md shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-1.5 sm:space-y-2">
            {filteredQuestions.map(({ q, idx }) => {
              const isAns = !!answers[q.id];
              const isCorr = evaluations[q.id]?.isCorrect;
              const isSelected = activeIndex === idx;
              
              let statusText = 'Unattempted';
              let statusColor = 'text-stone-500';
              let bgColor = isSelected ? 'bg-stone-100 border-stone-300' : 'bg-white border-stone-200 hover:border-stone-300';
              let icon = <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-stone-200 border-2 border-white shadow-sm flex items-center justify-center shrink-0 text-[10px] text-stone-500">-</span>;

              if (isAns) {
                if (isCorr) {
                  statusText = 'Correct';
                  statusColor = 'text-primary';
                  bgColor = isSelected ? 'bg-primary-surface border-primary/50' : 'bg-primary/5 border-primary/20 hover:border-primary/40';
                  icon = (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                      <svg width="8" height="6" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  );
                } else {
                  statusText = 'Incorrect';
                  statusColor = 'text-rose-600';
                  bgColor = isSelected ? 'bg-rose-50 border-rose-300' : 'bg-rose-50/50 border-rose-200 hover:border-rose-300';
                  icon = (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-rose-600 border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                  );
                }
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedIndex(idx);
                    if (window.innerWidth < 1024) setIsListOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all text-left ${bgColor}`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    {icon}
                    <span className="font-bold text-stone-900 text-xs sm:text-sm">Q{idx + 1}</span>
                  </div>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${statusColor}`}>{statusText}</span>
                </button>
              );
            })}
            
            {filteredQuestions.length === 0 && (
              <div className="text-center p-8 text-stone-500 font-medium text-sm">
                No questions found.
              </div>
            )}
          </div>
        </aside>

        {/* Right Pane: Question Details */}
        <div className="flex-1 flex flex-col min-w-0 bg-transparent z-0">
          {currentQ ? (
            <>
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900">Question {activeIndex + 1}</h2>
                    {userAnswer ? (
                      evalRes?.isCorrect ? (
                        <div className="px-2 py-1 sm:px-3 sm:py-1 bg-primary-surface text-primary-dark text-xs sm:text-sm font-bold rounded-md uppercase tracking-wider flex items-center gap-1.5 border border-primary/20">
                          <svg width="12" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Correct
                        </div>
                      ) : (
                        <div className="px-2 py-1 sm:px-3 sm:py-1 bg-rose-100 text-rose-700 text-xs sm:text-sm font-bold rounded uppercase tracking-wider flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          Incorrect
                        </div>
                      )
                    ) : (
                      <div className="px-2 py-1 sm:px-3 sm:py-1 bg-stone-200 text-stone-600 text-xs sm:text-sm font-bold rounded uppercase tracking-wider">
                        Unattempted
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-white p-5 sm:p-8 rounded-2xl border border-stone-200 shadow-sm mb-6 sm:mb-8">
                    <div dir="rtl" className="text-xl sm:text-2xl font-arabic font-bold text-stone-900 leading-relaxed mb-4 sm:mb-6">
                      {currentQ.question_arabic}
                    </div>
                    {currentQ.question_english && (
                      <div className="text-stone-700 text-sm sm:text-base mb-2">
                        {currentQ.question_english}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                    {['A', 'B', 'C', 'D'].map((opt) => {
                      const isUserAns = userAnswer === opt;
                      const isCorrectAns = evalRes?.correctOption === opt;
                      
                      let optBg = 'bg-white border-stone-200';
                      let optIcon = null;
                      let badge = null;

                      if (isCorrectAns) {
                        optBg = 'bg-primary-surface border-primary ring-1 ring-primary/30';
                        optIcon = (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                            <svg width="10" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        );
                        badge = <span className="text-primary text-xs sm:text-sm font-bold ml-2">(Correct Answer)</span>;
                      } else if (isUserAns && !isCorrectAns) {
                        optBg = 'bg-rose-50 border-rose-300 ring-1 ring-rose-300';
                        optIcon = (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </div>
                        );
                        badge = <span className="text-rose-600 text-xs sm:text-sm font-bold ml-2">(Your Answer)</span>;
                      }

                      return (
                        <div key={opt} className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 flex items-start gap-3 sm:gap-4 ${optBg}`}>
                          <div className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded bg-stone-100 flex items-center justify-center text-xs sm:text-sm font-bold text-stone-500 mt-0.5 sm:mt-1">
                            {opt}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap gap-1 sm:gap-2 mb-1">
                              <div dir="rtl" className="font-arabic text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                                {getOptionText(currentQ.options_arabic?.[opt], 'ar')}
                              </div>
                              {badge}
                            </div>
                            {currentQ.options_english && (
                              <div className="text-stone-600 text-xs sm:text-sm">
                                {getOptionText(currentQ.options_english[opt], 'en')}
                              </div>
                            )}
                          </div>
                          {optIcon}
                        </div>
                      )
                    })}
                  </div>

                  {/* Memory Actions Row */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6 flex items-center justify-between gap-3 flex-wrap shadow-sm">
                    <div className="text-xs font-bold text-stone-500">
                      Personal Mental Connection
                    </div>
                    <MemoryButton
                      questionId={currentQ.id}
                      onOpenMemoryModal={() => setMemoryModalOpen(true)}
                    />
                  </div>

                  {/* Personal Memory Preview Strip */}
                  <QuestionMemoryStrip
                    questionId={currentQ.id}
                    onOpenModal={() => setMemoryModalOpen(true)}
                    refreshTrigger={memoryRefresh}
                  />

                  {/* Explanation Section */}
                  {evalRes?.explanation && (
                    <div className="bg-primary-surface border border-primary/20 rounded-2xl p-5 sm:p-8 mb-8 mt-6">
                      <h3 className="flex items-center gap-2 text-base sm:text-lg font-bold text-stone-900 mb-3 sm:mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary sm:w-6 sm:h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        Explanation
                      </h3>
                      <div className="text-stone-700 leading-relaxed space-y-3 sm:space-y-4 text-sm sm:text-base">
                        {evalRes.explanation.split('\n').map((para: string, i: number) => (
                          <p key={i} dir={para.match(/[\u0600-\u06FF]/) ? "rtl" : "ltr"} className={para.match(/[\u0600-\u06FF]/) ? "font-arabic text-lg sm:text-xl font-medium text-right" : ""}>
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Memory Modal */}
                  {memoryModalOpen && (
                    <MemoryConnectionModal
                      isOpen={memoryModalOpen}
                      onClose={() => setMemoryModalOpen(false)}
                      question={currentQ}
                      onMemorySaved={() => setMemoryRefresh((prev) => prev + 1)}
                    />
                  )}

                </div>
              </div>

              {/* Bottom Actions */}
              <div className="shrink-0 p-4 sm:p-6 bg-white border-t border-stone-200 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const currIdx = filteredQuestions.findIndex(fq => fq.idx === activeIndex);
                    if (currIdx > 0) setSelectedIndex(filteredQuestions[currIdx - 1].idx);
                  }}
                  disabled={filteredQuestions.findIndex(fq => fq.idx === activeIndex) <= 0}
                  className="flex-1 sm:flex-none px-4 py-2 sm:px-6 sm:py-2.5 font-bold text-stone-500 text-sm bg-white border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-50 transition-colors"
                >
                  &lt; Prev
                </button>
                <button
                  onClick={() => {
                    const currIdx = filteredQuestions.findIndex(fq => fq.idx === activeIndex);
                    if (currIdx < filteredQuestions.length - 1) setSelectedIndex(filteredQuestions[currIdx + 1].idx);
                  }}
                  disabled={filteredQuestions.findIndex(fq => fq.idx === activeIndex) >= filteredQuestions.length - 1}
                  className="flex-1 sm:flex-none px-4 py-2 sm:px-6 sm:py-2.5 font-bold text-white text-sm bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-50 transition-colors"
                >
                  Next &gt;
                </button>
              </div>
            </>
          ) : null}
        </div>

      </div>
    </div>
  );
}
