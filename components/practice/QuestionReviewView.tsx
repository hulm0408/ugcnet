import React, { useState } from 'react';
import Link from 'next/link';

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
  year = '2009',
  paper = 'Paper II',
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
    <div className="flex flex-col h-screen bg-[#FCFAF8] font-sans">
      
      {/* Top Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-stone-200 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <div className="font-bold text-stone-900">
            UGC NET Arabic – {year} {paper}
          </div>
          <div className="h-4 w-px bg-stone-300" />
          <div className="text-sm font-bold text-stone-500 uppercase tracking-wider">
            Question wise review
          </div>
        </div>
        
        <Link 
          href="/dashboard"
          className="px-6 py-2.5 bg-stone-100 text-stone-700 font-bold text-sm rounded-lg hover:bg-stone-200 transition-colors border border-stone-200"
        >
          Back to Dashboard
        </Link>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar: Question List */}
        <aside className="w-[380px] bg-white border-r border-stone-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-stone-200 bg-stone-50">
            <div className="flex flex-wrap gap-2 text-xs font-bold text-stone-600">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-md transition-colors ${filter === 'all' ? 'bg-stone-800 text-white' : 'hover:bg-stone-200 bg-white border border-stone-200'}`}
              >
                All ({totalQuestions})
              </button>
              <button 
                onClick={() => setFilter('correct')}
                className={`px-3 py-1.5 rounded-md transition-colors ${filter === 'correct' ? 'bg-[#107A53] text-white' : 'hover:bg-[#107A53]/10 bg-white border border-stone-200 text-[#107A53]'}`}
              >
                Correct ({correctCount})
              </button>
              <button 
                onClick={() => setFilter('incorrect')}
                className={`px-3 py-1.5 rounded-md transition-colors ${filter === 'incorrect' ? 'bg-rose-600 text-white' : 'hover:bg-rose-50 bg-white border border-stone-200 text-rose-600'}`}
              >
                Incorrect ({incorrectCount})
              </button>
              <button 
                onClick={() => setFilter('unattempted')}
                className={`px-3 py-1.5 rounded-md transition-colors ${filter === 'unattempted' ? 'bg-stone-500 text-white' : 'hover:bg-stone-100 bg-white border border-stone-200 text-stone-500'}`}
              >
                Unattempted ({unattemptedCount})
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredQuestions.map(({ q, idx }) => {
              const isAns = !!answers[q.id];
              const isCorr = evaluations[q.id]?.isCorrect;
              const isSelected = activeIndex === idx;
              
              let statusText = 'Unattempted';
              let statusColor = 'text-stone-500';
              let bgColor = isSelected ? 'bg-stone-100 border-stone-300' : 'bg-white border-stone-200 hover:border-stone-300';
              let icon = <span className="w-5 h-5 rounded-full bg-stone-200 border-2 border-white shadow-sm flex items-center justify-center shrink-0 text-[10px] text-stone-500">-</span>;

              if (isAns) {
                if (isCorr) {
                  statusText = 'Correct';
                  statusColor = 'text-[#107A53]';
                  bgColor = isSelected ? 'bg-[#107A53]/10 border-[#107A53]' : 'bg-[#107A53]/5 border-[#107A53]/20 hover:border-[#107A53]/40';
                  icon = (
                    <div className="w-5 h-5 rounded-full bg-[#107A53] border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                      <svg width="10" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  );
                } else {
                  statusText = 'Incorrect';
                  statusColor = 'text-rose-600';
                  bgColor = isSelected ? 'bg-rose-50 border-rose-300' : 'bg-rose-50/50 border-rose-200 hover:border-rose-300';
                  icon = (
                    <div className="w-5 h-5 rounded-full bg-rose-600 border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${bgColor}`}
                >
                  <div className="flex items-center gap-3">
                    {icon}
                    <span className="font-bold text-stone-900">Q{idx + 1}</span>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${statusColor}`}>{statusText}</span>
                </button>
              );
            })}
            
            {filteredQuestions.length === 0 && (
              <div className="text-center p-8 text-stone-500 font-medium">
                No questions found for this filter.
              </div>
            )}
          </div>
        </aside>

        {/* Right Pane: Question Details */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#FCFAF8]">
          {currentQ ? (
            <>
              <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-stone-900">Question {activeIndex + 1}</h2>
                    {userAnswer ? (
                      evalRes?.isCorrect ? (
                        <div className="px-3 py-1 bg-[#107A53]/10 text-[#107A53] text-sm font-bold rounded uppercase tracking-wider flex items-center gap-1.5">
                          <svg width="12" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Correct
                        </div>
                      ) : (
                        <div className="px-3 py-1 bg-rose-100 text-rose-700 text-sm font-bold rounded uppercase tracking-wider flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          Incorrect
                        </div>
                      )
                    ) : (
                      <div className="px-3 py-1 bg-stone-200 text-stone-600 text-sm font-bold rounded uppercase tracking-wider">
                        Unattempted
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm mb-8">
                    <div dir="rtl" className="text-2xl font-arabic font-bold text-stone-900 leading-relaxed mb-6">
                      {currentQ.question_arabic}
                    </div>
                    {currentQ.question_english && (
                      <div className="text-stone-700 text-base mb-2">
                        {currentQ.question_english}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-10">
                    {['A', 'B', 'C', 'D'].map((opt) => {
                      const isUserAns = userAnswer === opt;
                      const isCorrectAns = evalRes?.correctOption === opt;
                      
                      let optBg = 'bg-white border-stone-200';
                      let optIcon = null;
                      let badge = null;

                      if (isCorrectAns) {
                        optBg = 'bg-[#107A53]/10 border-[#107A53] ring-1 ring-[#107A53]';
                        optIcon = (
                          <div className="w-6 h-6 rounded-full bg-[#107A53] text-white flex items-center justify-center shrink-0">
                            <svg width="12" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        );
                        badge = <span className="text-[#107A53] text-sm font-bold ml-2">(Correct Answer)</span>;
                      } else if (isUserAns && !isCorrectAns) {
                        optBg = 'bg-rose-50 border-rose-300 ring-1 ring-rose-300';
                        optIcon = (
                          <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </div>
                        );
                        badge = <span className="text-rose-600 text-sm font-bold ml-2">(Your Answer)</span>;
                      }

                      return (
                        <div key={opt} className={`w-full text-left p-5 rounded-xl border-2 flex items-start gap-4 ${optBg}`}>
                          <div className="shrink-0 w-8 h-8 rounded bg-stone-100 flex items-center justify-center text-sm font-bold text-stone-500 mt-0.5">
                            {opt}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center flex-wrap gap-2 mb-1">
                              <div dir="rtl" className="font-arabic text-xl font-bold text-stone-900">
                                {currentQ.options_arabic?.[opt] as string}
                              </div>
                              {badge}
                            </div>
                            {currentQ.options_english && (
                              <div className="text-stone-600 text-sm">
                                {currentQ.options_english[opt] as string}
                              </div>
                            )}
                          </div>
                          {optIcon}
                        </div>
                      )
                    })}
                  </div>

                  {/* Explanation Section */}
                  {evalRes?.explanation && (
                    <div className="bg-[#107A53]/5 border border-[#107A53]/20 rounded-2xl p-8 mb-8">
                      <h3 className="flex items-center gap-2 text-lg font-bold text-stone-900 mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#107A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        Explanation
                      </h3>
                      <div className="text-stone-700 leading-relaxed space-y-4 text-base">
                        {evalRes.explanation.split('\n').map((para: string, i: number) => (
                          <p key={i} dir={para.match(/[\u0600-\u06FF]/) ? "rtl" : "ltr"} className={para.match(/[\u0600-\u06FF]/) ? "font-arabic text-xl font-medium text-right" : ""}>
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Bottom Actions */}
              <div className="shrink-0 p-6 bg-white border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => {
                    const currIdx = filteredQuestions.findIndex(fq => fq.idx === activeIndex);
                    if (currIdx > 0) setSelectedIndex(filteredQuestions[currIdx - 1].idx);
                  }}
                  disabled={filteredQuestions.findIndex(fq => fq.idx === activeIndex) <= 0}
                  className="px-6 py-2.5 font-bold text-stone-500 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-50 transition-colors"
                >
                  &lt; Previous
                </button>
                <button
                  onClick={() => {
                    const currIdx = filteredQuestions.findIndex(fq => fq.idx === activeIndex);
                    if (currIdx < filteredQuestions.length - 1) setSelectedIndex(filteredQuestions[currIdx + 1].idx);
                  }}
                  disabled={filteredQuestions.findIndex(fq => fq.idx === activeIndex) >= filteredQuestions.length - 1}
                  className="px-6 py-2.5 font-bold text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-50 transition-colors"
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
