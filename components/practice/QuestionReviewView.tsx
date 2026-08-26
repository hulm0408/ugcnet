import React, { useState } from 'react';
import Link from 'next/link';
import { List, X, Brain, Sparkles } from 'lucide-react';
import { getOptionText } from '@/lib/arabicUtils';
import MemoryButton from '@/components/memory/MemoryButton';
import QuestionMemoryStrip from '@/components/memory/QuestionMemoryStrip';
import MemoryConnectionModal from '@/components/memory/MemoryConnectionModal';
import BilingualText from '@/components/ui/BilingualText';
import GoogleSearchButton from '@/components/ui/GoogleSearchButton';

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
  totalQuestions,
}: QuestionReviewViewProps) {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isListOpen, setIsListOpen] = useState(false);
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);
  const [memoryRefresh, setMemoryRefresh] = useState(0);

  const headerTitle =
    paper ||
    questions[0]?.exam_paper?.display_name ||
    questions[0]?.exam_paper?.exam_name ||
    (year ? `UGC NET – ${year}` : 'UGC NET CBT Review');

  const filteredQuestions = questions
    .map((q, idx) => ({ q, idx }))
    .filter(({ q }) => {
      const isAns = !!answers[q.id];
      const isCorr = evaluations[q.id]?.isCorrect;

      if (filter === 'all') return true;
      if (filter === 'correct') return isAns && isCorr;
      if (filter === 'incorrect') return isAns && !isCorr;
      if (filter === 'unattempted') return !isAns;
      return true;
    });

  const activeIndex = filteredQuestions.find((fq) => fq.idx === selectedIndex)
    ? selectedIndex
    : filteredQuestions[0]?.idx ?? 0;

  const currentQ = questions[activeIndex];
  const evalRes = currentQ ? evaluations[currentQ.id] : null;
  const userAnswer = currentQ ? answers[currentQ.id] : null;
  const correctOptionLetter = evalRes?.correctAnswer || evalRes?.correctOption;

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
            <div className="font-bold text-stone-900 text-sm sm:text-base">{headerTitle}</div>
            <div className="hidden sm:block h-4 w-px bg-stone-300" />
            <div className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider">
              Comprehensive Question Review
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
        <aside
          className={`
          fixed inset-y-0 left-0 z-40 w-72 sm:w-80 bg-white shadow-2xl lg:shadow-none transform transition-transform duration-300 ease-in-out flex flex-col shrink-0 
          lg:static lg:w-[380px] lg:border-r lg:border-stone-200 lg:translate-x-0
          ${isListOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        >
          <div className="p-3 sm:p-4 border-b border-stone-200 bg-stone-50 shrink-0 flex items-center justify-between lg:block">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-stone-600 flex-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-colors ${
                  filter === 'all'
                    ? 'bg-stone-800 text-white'
                    : 'hover:bg-stone-200 bg-white border border-stone-200'
                }`}
              >
                All ({totalQuestions})
              </button>
              <button
                onClick={() => setFilter('correct')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-colors ${
                  filter === 'correct'
                    ? 'bg-primary text-white'
                    : 'hover:bg-primary-surface bg-white border border-stone-200 text-primary'
                }`}
              >
                Correct ({correctCount})
              </button>
              <button
                onClick={() => setFilter('incorrect')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-colors ${
                  filter === 'incorrect'
                    ? 'bg-rose-600 text-white'
                    : 'hover:bg-rose-50 bg-white border border-stone-200 text-rose-600'
                }`}
              >
                Incorrect ({incorrectCount})
              </button>
              <button
                onClick={() => setFilter('unattempted')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-colors ${
                  filter === 'unattempted'
                    ? 'bg-stone-500 text-white'
                    : 'hover:bg-stone-100 bg-white border border-stone-200 text-stone-500'
                }`}
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

              if (isAns) {
                if (isCorr) {
                  statusText = 'Correct';
                  statusColor = 'text-primary font-bold';
                } else {
                  statusText = 'Incorrect';
                  statusColor = 'text-rose-600 font-bold';
                }
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedIndex(idx);
                    setIsListOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/80 text-stone-800'
                  }`}
                >
                  <div
                    className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      dir="rtl"
                      lang="ar"
                      className={`font-arabic text-sm truncate font-bold ${
                        isSelected ? 'text-white' : 'text-stone-900'
                      }`}
                    >
                      {q.question_arabic}
                    </div>
                    <div
                      className={`text-[11px] mt-0.5 ${isSelected ? 'text-stone-300' : statusColor}`}
                    >
                      {statusText}
                    </div>
                  </div>
                </button>
              );
            })}

            {filteredQuestions.length === 0 && (
              <div className="text-center p-8 text-stone-500 font-medium text-sm">
                No questions found for this filter.
              </div>
            )}
          </div>
        </aside>

        {/* Right Pane: Question Details */}
        <div className="flex-1 flex flex-col min-w-0 bg-transparent z-0">
          {currentQ ? (
            <>
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-12">
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                      Question {activeIndex + 1} of {totalQuestions}
                    </h2>
                    <div className="flex items-center gap-2">
                      <GoogleSearchButton
                        questionArabic={currentQ.question_arabic}
                        questionEnglish={currentQ.question_english}
                        entityNameArabic={currentQ.specific_entity_name_arabic}
                        entityNameEnglish={currentQ.specific_entity_name_english}
                        microFocusArabic={currentQ.question_micro_focus_arabic}
                        unitName={currentQ.unit?.name_english}
                        size="sm"
                      />
                      {userAnswer ? (
                        evalRes?.isCorrect ? (
                          <div className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5 border border-emerald-200">
                            ✓ Correct (+2 Marks)
                          </div>
                        ) : (
                          <div className="px-3 py-1 bg-rose-50 text-rose-700 text-xs sm:text-sm font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5 border border-rose-200">
                            ✕ Incorrect (0 Marks)
                          </div>
                        )
                      ) : (
                        <div className="px-3 py-1 bg-stone-100 text-stone-600 text-xs sm:text-sm font-bold rounded-lg uppercase tracking-wider">
                          Unattempted
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white p-6 sm:p-9 rounded-3xl border border-stone-200/90 shadow-sm space-y-4">
                    <div
                      dir="rtl"
                      lang="ar"
                      className="text-2xl sm:text-3xl font-arabic font-semibold text-stone-950 leading-[2.4] text-right"
                    >
                      {currentQ.question_arabic}
                    </div>
                    {currentQ.question_english && (
                      <div className="text-stone-700 text-sm sm:text-base border-l-3 border-emerald-500 pl-4 py-1 leading-relaxed font-normal">
                        <BilingualText text={currentQ.question_english} />
                      </div>
                    )}
                  </div>

                  {/* Options with clear user vs correct answer indicators */}
                  <div className="space-y-3.5 sm:space-y-4">
                    {[
                      { opt: 'A', num: '1' },
                      { opt: 'B', num: '2' },
                      { opt: 'C', num: '3' },
                      { opt: 'D', num: '4' },
                    ].map(({ opt, num }) => {
                      const isUserAns = userAnswer === opt;
                      const isCorrectAns = correctOptionLetter === opt;

                      let optBg = 'bg-white border-stone-200/90';
                      let badge = null;

                      if (isCorrectAns) {
                        optBg = 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-400/30';
                        badge = (
                          <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg ml-auto shrink-0 shadow-xs">
                            Official Correct Option
                          </span>
                        );
                      } else if (isUserAns && !isCorrectAns) {
                        optBg = 'bg-rose-50/90 border-rose-400 ring-2 ring-rose-300/30';
                        badge = (
                          <span className="px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded-lg ml-auto shrink-0 shadow-xs">
                            Your Choice (Incorrect)
                          </span>
                        );
                      }

                      return (
                        <div
                          key={opt}
                          className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 flex items-start gap-4 transition-all ${optBg}`}
                        >
                          <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                            <span className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-xs font-black text-stone-700 shadow-xs">
                              {opt}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-stone-400">({num})</span>
                          </div>

                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div
                              dir="rtl"
                              lang="ar"
                              className={`font-arabic text-xl sm:text-2xl font-semibold leading-[2.2] text-right ${
                                isCorrectAns ? 'text-emerald-950' : 'text-stone-900'
                              }`}
                            >
                              {getOptionText(currentQ.options_arabic?.[opt], 'ar')}
                            </div>
                            {currentQ.options_english && (
                              <div
                                className={`text-xs sm:text-sm leading-relaxed font-medium ${
                                  isCorrectAns ? 'text-emerald-800' : 'text-stone-600'
                                }`}
                              >
                                <BilingualText
                                  text={getOptionText(currentQ.options_english[opt], 'en')}
                                />
                              </div>
                            )}
                          </div>
                          {badge}
                        </div>
                      );
                    })}
                  </div>

                  {/* Comprehensive Explanation Box */}
                  {(evalRes?.explanation || evalRes?.correctText) && (
                    <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-emerald-950 font-black text-base">
                          Authoritative Answer &amp; Scholarly Analysis
                        </h3>
                        <span className="text-xs font-bold bg-emerald-700 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                          NTA Key: Option {correctOptionLetter}
                        </span>
                      </div>

                      {evalRes?.correctText && (
                        <div
                          dir="rtl"
                          lang="ar"
                          className="text-emerald-900 font-arabic font-bold text-lg text-right bg-white p-3 rounded-xl border border-emerald-100"
                        >
                          {evalRes.correctText}
                        </div>
                      )}

                      {evalRes?.explanation && (
                        <div className="text-stone-800 text-sm leading-relaxed bg-white p-4 rounded-xl border border-emerald-100 shadow-xs">
                          <BilingualText text={evalRes.explanation} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Active Recall Memory Anchor Prompt for Review */}
                  {(!evalRes?.isCorrect || !userAnswer) && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 border border-violet-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0">
                          <Brain size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-violet-950">
                            Create a personal memory trick for Question #{activeIndex + 1}
                          </div>
                          <div className="text-xs text-violet-700/90 font-medium mt-0.5">
                            Attaching a personal mnemonic here adds this question to your 5-level SM-2 spaced repetition queue.
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMemoryModalOpen(true)}
                        className="shrink-0 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-95 text-white font-bold text-xs shadow-sm transition-all inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles size={14} />
                        <span>Attach Memory Trick</span>
                      </button>
                    </div>
                  )}

                  {/* Personal Memory Preview Strip */}
                  <QuestionMemoryStrip
                    questionId={currentQ.id}
                    onOpenModal={() => setMemoryModalOpen(true)}
                    refreshTrigger={memoryRefresh}
                  />
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="shrink-0 p-4 bg-white border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => setSelectedIndex(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  className="px-5 py-2.5 bg-stone-100 text-stone-700 font-bold text-xs sm:text-sm rounded-xl hover:bg-stone-200 disabled:opacity-40 transition-colors"
                >
                  &lt; Previous
                </button>
                <span className="text-xs font-bold text-stone-400">
                  {activeIndex + 1} / {totalQuestions}
                </span>
                <button
                  onClick={() => setSelectedIndex(Math.min(questions.length - 1, activeIndex + 1))}
                  disabled={activeIndex === questions.length - 1}
                  className="px-6 py-2.5 bg-primary text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-primary-dark disabled:opacity-40 transition-colors shadow-sm"
                >
                  Next &gt;
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-stone-400">
              Select a question from the sidebar to review.
            </div>
          )}
        </div>
      </div>

      {/* Memory Connection Modal */}
      {memoryModalOpen && currentQ && (
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
