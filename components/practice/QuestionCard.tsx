'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Check, Brain, Sparkles } from 'lucide-react';
import MemoryButton from '@/components/memory/MemoryButton';
import QuestionMemoryStrip from '@/components/memory/QuestionMemoryStrip';
import MemoryConnectionModal from '@/components/memory/MemoryConnectionModal';
import BilingualText from '@/components/ui/BilingualText';
import GoogleSearchButton from '@/components/ui/GoogleSearchButton';

type EvalResult = {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string | null;
  correctText: string | null;
  correctTextArabic?: string | null;
  correctTextEnglish?: string | null;
  explanationArabic?: string | null;
  explanationEnglish?: string | null;
};

type QuestionProps = {
  question: {
    id: string;
    question_arabic: string;
    question_english: string | null;
    question_type: string;
    context_paragraph_arabic: string | null;
    context_paragraph_english: string | null;
    matching_table_arabic: unknown;
    matching_table_english: unknown;
    options_arabic: Record<string, unknown>;
    options_english: Record<string, unknown> | null;
    unit?: { name_arabic: string; name_english: string; unit_number: number } | null;
    broad_topic?: { name_arabic: string; name_english: string } | null;
    subtopic?: { name_arabic: string; name_english: string } | null;
    specific_entity_name_arabic?: string | null;
    specific_entity_name_english?: string | null;
    question_micro_focus_arabic?: string | null;
    question_micro_focus_english?: string | null;
  };
  mode: 'test' | 'review';
  selectedOption: string | null;
  evaluation: EvalResult | null;
  onSelectOption: (questionId: string, selectedOption: string) => void;
};

function parseOptionText(data: unknown): { arabic: string; english: string } {
  if (typeof data === 'string') {
    return { arabic: data, english: '' };
  }
  if (data && typeof data === 'object') {
    const d = data as Record<string, unknown>;
    return {
      arabic: typeof d.arabic === 'string' ? d.arabic : '',
      english: typeof d.english === 'string' ? d.english : '',
    };
  }
  return { arabic: '', english: '' };
}

const OPTIONS = [
  { key: 'A', num: '1' },
  { key: 'B', num: '2' },
  { key: 'C', num: '3' },
  { key: 'D', num: '4' },
] as const;

export default function QuestionCard({
  question,
  mode,
  selectedOption,
  evaluation,
  onSelectOption,
}: QuestionProps) {
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);
  const [memoryRefresh, setMemoryRefresh] = useState(0);
  const isEval = evaluation !== null;

  const handleSelect = (opt: string) => {
    if (mode === 'review') return;
    onSelectOption(question.id, opt);
  };

  // Parse options
  const optionData = OPTIONS.map(({ key, num }) => {
    const arabicRaw = question.options_arabic?.[key];
    const englishRaw = question.options_english?.[key];
    const parsed = parseOptionText(arabicRaw);
    if (!parsed.english && englishRaw && typeof englishRaw === 'string') {
      parsed.english = englishRaw;
    }
    return { opt: key, num, ...parsed };
  });

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden animate-fade-in">
      
      {/* ── 1. Metadata / Syllabus Hierarchy Bar ──────────────── */}
      {(question.unit || question.broad_topic) && (
        <div className="bg-stone-50/90 border-b border-stone-200/80 px-5 sm:px-7 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-stone-600 font-medium">
            {question.unit && (
              <span className="bg-stone-200/70 px-2.5 py-1 rounded-lg text-stone-900 font-bold">
                Unit {question.unit.unit_number}: {question.unit.name_english}
              </span>
            )}
            {question.broad_topic && (
              <span className="text-stone-500 font-medium">/ {question.broad_topic.name_english}</span>
            )}
            {question.subtopic && (
              <span className="text-stone-400">/ {question.subtopic.name_english}</span>
            )}
          </div>
          {(question.question_micro_focus_arabic || question.specific_entity_name_arabic) && (
            <div
              dir="rtl"
              lang="ar"
              className="font-arabic text-sm font-semibold text-emerald-950 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200/60"
            >
              {question.question_micro_focus_arabic || question.specific_entity_name_arabic}
            </div>
          )}
        </div>
      )}

      {/* ── 2. Context Paragraph (Reading Comprehension) ─────── */}
      {(question.context_paragraph_arabic || question.context_paragraph_english) && (
        <div className="border-b border-stone-100 bg-[#FAF8F5] px-6 sm:px-8 py-5 space-y-3">
          {question.context_paragraph_arabic && (
            <div
              dir="rtl"
              lang="ar"
              className="text-stone-900 leading-[2.4] font-arabic text-lg sm:text-xl text-right whitespace-pre-wrap font-semibold"
            >
              {question.context_paragraph_arabic}
            </div>
          )}
          {question.context_paragraph_english && (
            <div className="text-stone-700 text-sm sm:text-base leading-relaxed pt-2 border-t border-stone-200/60">
              <BilingualText text={question.context_paragraph_english} />
            </div>
          )}
        </div>
      )}

      <div className="px-6 py-7 sm:px-9 sm:py-8 space-y-7">
        
        {/* ── 3. Question Text (Clean, Breathable & Distinct) ──── */}
        <div className="space-y-4">
          {question.question_arabic && question.question_arabic !== 'No question text' && (
            <div
              dir="rtl"
              lang="ar"
              className="text-stone-950 font-arabic font-semibold leading-[2.4] text-2xl sm:text-3xl text-right tracking-normal"
            >
              {question.question_arabic}
            </div>
          )}
          
          {question.question_english && (
            <div className="text-stone-700 text-sm sm:text-base leading-relaxed border-l-3 border-emerald-500 pl-4 py-1">
              <BilingualText text={question.question_english} />
            </div>
          )}
        </div>

        <div className="border-t border-stone-100" />

        {/* ── 4. Clearly Structured Options ────────────────────── */}
        <div className="space-y-3.5">
          {optionData.map(({ opt, num, arabic, english }) => {
            if (!arabic && !english) return null;

            const isSelected = selectedOption === opt;
            const isCorrect = isEval && evaluation?.correctAnswer === opt;
            const isWrong = isSelected && isEval && !isCorrect;

            let containerCls =
              'w-full p-4 sm:p-5 rounded-2xl border-2 transition-all duration-150 cursor-pointer text-left focus:outline-none group';
            let badgeCls =
              'w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors shadow-xs';

            if (isEval) {
              containerCls += ' cursor-default';
              if (isCorrect) {
                containerCls += ' border-emerald-500 bg-emerald-50/90 ring-2 ring-emerald-400/30';
                badgeCls += ' bg-emerald-600 text-white';
              } else if (isWrong) {
                containerCls += ' border-rose-400 bg-rose-50/90 ring-2 ring-rose-300/30';
                badgeCls += ' bg-rose-500 text-white';
              } else {
                containerCls += ' border-stone-100 bg-stone-50/40 opacity-60';
                badgeCls += ' bg-stone-100 text-stone-400';
              }
            } else {
              if (isSelected) {
                containerCls += ' border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm';
                badgeCls += ' bg-emerald-700 text-white';
              } else {
                containerCls += ' border-stone-200/90 bg-white hover:border-emerald-500/60 hover:bg-[#FAF9F6]';
                badgeCls += ' bg-stone-100 text-stone-700 group-hover:bg-emerald-100 group-hover:text-emerald-900';
              }
            }

            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={isEval}
                className={containerCls}
                aria-pressed={isSelected}
              >
                <div className="flex items-start gap-4">
                  
                  {/* Option Badge with NTA Number & Letter */}
                  <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                    <span className={badgeCls}>{opt}</span>
                    <span className="text-[10px] font-mono font-bold text-stone-400">({num})</span>
                  </div>

                  {/* Option Text Stack */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    {arabic && (
                      <div
                        dir="rtl"
                        lang="ar"
                        className={`font-arabic leading-[2.2] text-xl sm:text-2xl text-right w-full font-semibold ${
                          isEval && isCorrect ? 'text-emerald-950' : 'text-stone-900'
                        }`}
                      >
                        {arabic}
                      </div>
                    )}
                    {english && (
                      <div
                        className={`text-xs sm:text-sm leading-relaxed font-medium ${
                          isEval && isCorrect ? 'text-emerald-800' : 'text-stone-600'
                        }`}
                      >
                        <BilingualText text={english} />
                      </div>
                    )}
                  </div>

                  {/* Visual Status Indicator */}
                  {isEval && isCorrect && (
                    <div className="shrink-0 flex items-center gap-1 bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs">
                      <Check size={14} />
                      <span className="hidden sm:inline">Correct</span>
                    </div>
                  )}
                  {isEval && isWrong && (
                    <div className="shrink-0 flex items-center gap-1 bg-rose-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs">
                      <XCircle size={14} />
                      <span className="hidden sm:inline">Incorrect</span>
                    </div>
                  )}
                  {!isEval && isSelected && (
                    <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center mt-1">
                      <Check size={13} />
                    </div>
                  )}

                </div>
              </button>
            );
          })}
        </div>

        {/* ── 5. Memory Note & Search Action Bar ────────────── */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <GoogleSearchButton
              questionArabic={question.question_arabic}
              questionEnglish={question.question_english}
              entityNameArabic={question.specific_entity_name_arabic}
              entityNameEnglish={question.specific_entity_name_english}
              microFocusArabic={question.question_micro_focus_arabic}
              unitName={question.unit?.name_english}
              size="sm"
            />
          </div>
          <MemoryButton
            questionId={question.id}
            onOpenMemoryModal={() => setMemoryModalOpen(true)}
          />
        </div>

        {/* ── 6. Personal Memory Preview Strip ───────────────── */}
        <QuestionMemoryStrip
          questionId={question.id}
          onOpenModal={() => setMemoryModalOpen(true)}
          refreshTrigger={memoryRefresh}
        />

        {/* ── 7. Memory Connection Modal ──────────────────────── */}
        {memoryModalOpen && (
          <MemoryConnectionModal
            isOpen={memoryModalOpen}
            onClose={() => setMemoryModalOpen(false)}
            question={question}
            onMemorySaved={() => setMemoryRefresh((prev) => prev + 1)}
          />
        )}

        {/* ── 8. Answer Explanation & Solution Reveal ─────────── */}
        {isEval && (
          <div className="rounded-2xl border border-stone-200/90 overflow-hidden animate-slide-up shadow-sm">
            <div
              className={`p-4 sm:p-5 flex items-center justify-between gap-3 ${
                evaluation.isCorrect ? 'bg-emerald-100/90 text-emerald-950' : 'bg-rose-100/90 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {evaluation.isCorrect ? (
                  <CheckCircle2 size={20} className="text-emerald-700 shrink-0" />
                ) : (
                  <XCircle size={20} className="text-rose-700 shrink-0" />
                )}
                <div>
                  <div className="font-black text-sm sm:text-base">
                    {evaluation.isCorrect ? 'Correct Response (+2 Marks)' : 'Incorrect Response (0 Marks)'}
                  </div>
                  <div className="text-xs font-bold opacity-85">
                    Official Answer: Option {evaluation.correctAnswer}
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation text */}
            <div className="p-5 sm:p-6 bg-white space-y-3">
              {evaluation.correctText && (
                <div
                  dir="rtl"
                  lang="ar"
                  className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 font-arabic font-semibold text-lg text-right"
                >
                  {evaluation.correctText}
                </div>
              )}

              {evaluation.explanation && (
                <div className="text-stone-700 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                  <BilingualText text={evaluation.explanation} />
                </div>
              )}

              {/* ── Active Recall Cognitive Anchor Prompt ──────── */}
              {!evaluation.isCorrect && (
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 border border-violet-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0">
                      <Brain size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-violet-950">
                        Anchor this concept in your memory
                      </div>
                      <div className="text-xs text-violet-700/90 font-medium mt-0.5">
                        Create a personal mnemonic connection now. The SM-2 spaced repetition engine will automatically queue it for review tomorrow.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMemoryModalOpen(true)}
                    className="shrink-0 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-95 text-white font-bold text-xs shadow-sm transition-all inline-flex items-center gap-1.5"
                  >
                    <Sparkles size={14} />
                    <span>Attach Memory Trick</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
