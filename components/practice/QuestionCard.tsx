'use client';

import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

type EvalResult = {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string | null;
  correctText: string | null;
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
    question_micro_focus_arabic?: string | null;
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

const OPTIONS = ['A', 'B', 'C', 'D'] as const;

export default function QuestionCard({ question, mode, selectedOption, evaluation, onSelectOption }: QuestionProps) {
  const isEval = evaluation !== null;
  
  const handleSelect = (opt: string) => {
    if (mode === 'review') return;
    onSelectOption(question.id, opt);
  };

  // Parse options
  const optionData = OPTIONS.map((opt) => {
    const arabicRaw = question.options_arabic?.[opt];
    const englishRaw = question.options_english?.[opt];
    const parsed = parseOptionText(arabicRaw);
    // Merge english from options_english if not inside arabic object
    if (!parsed.english && englishRaw && typeof englishRaw === 'string') {
      parsed.english = englishRaw;
    }
    return { opt, ...parsed };
  });

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden animate-fade-in">

      {/* ── Metadata / Syllabus Hierarchy ──────────────── */}
      {(question.unit || question.broad_topic) && (
        <div className="bg-stone-50 border-b border-stone-200 px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-stone-500 font-medium">
            {question.unit && (
              <span className="bg-stone-200/50 px-2 py-1 rounded-md text-stone-700 font-bold">
                Unit {question.unit.unit_number}: {question.unit.name_english}
              </span>
            )}
            {question.broad_topic && (
              <span className="text-stone-400 font-bold">/ {question.broad_topic.name_english}</span>
            )}
            {question.subtopic && (
              <span className="text-stone-400">/ {question.subtopic.name_english}</span>
            )}
          </div>
          {(question.question_micro_focus_arabic || question.specific_entity_name_arabic) && (
            <div dir="rtl" lang="ar" className="font-arabic text-sm text-stone-600 bg-stone-200/40 px-2.5 py-0.5 rounded border border-stone-200">
              {question.question_micro_focus_arabic || question.specific_entity_name_arabic}
            </div>
          )}
        </div>
      )}

      {/* ── Context Paragraph ─────────────────────────────── */}
      {(question.context_paragraph_arabic || question.context_paragraph_english) && (
        <div className="border-b border-stone-100 bg-[#FCFAF8] px-5 py-4 sm:px-6">
          {question.context_paragraph_arabic && (
            <div
              dir="rtl"
              lang="ar"
              className="text-stone-800 leading-[2] font-arabic text-lg text-right whitespace-pre-wrap font-bold"
            >
              {question.context_paragraph_arabic}
            </div>
          )}
          {question.context_paragraph_english && (
            <div className="text-stone-600 text-sm leading-relaxed mt-3 border-t border-stone-200 pt-3">
              {question.context_paragraph_english}
            </div>
          )}
        </div>
      )}

      <div className="px-5 py-5 sm:px-6">

        {/* ── Question Text ──────────────────────────────── */}
        <div className="mb-5">
          {question.question_arabic && question.question_arabic !== 'No question text' && (
            <div className="flex items-start justify-end gap-3">
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(question.question_arabic)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 shrink-0 text-stone-300 hover:text-[#107A53] transition-colors"
                title="Search this question on Google"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </a>
              <div
                dir="rtl"
                lang="ar"
                className="text-stone-900 font-arabic font-extrabold leading-[2] text-[22px] sm:text-[26px] text-right"
              >
                {question.question_arabic}
              </div>
            </div>
          )}
          {question.question_english && (
            <div className="mt-2 text-stone-500 text-[15px] leading-relaxed border-l-4 border-[#107A53] pl-3 ml-0.5">
              {question.question_english}
            </div>
          )}
        </div>

        <div className="border-t border-stone-100 mb-5" />

        {/* ── Options ────────────────────────────────────── */}
        <div className="space-y-2.5">
          {optionData.map(({ opt, arabic, english }) => {
            if (!arabic && !english) return null;

            const isSelected = selectedOption === opt;
            const isCorrect = isEval && evaluation?.correctAnswer === opt;
            const isWrong = isSelected && isEval && !isCorrect;

            let containerCls =
              'w-full flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 group';
            let badgeCls =
              'shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold transition-colors';

            if (isEval) {
              containerCls += ' cursor-default';
              if (isCorrect) {
                containerCls += ' border-[#107A53] bg-[#107A53]/5';
                badgeCls += ' bg-[#107A53] text-white';
              } else if (isWrong) {
                containerCls += ' border-rose-400 bg-rose-50';
                badgeCls += ' bg-rose-400 text-white';
              } else {
                containerCls += ' border-stone-100 bg-white opacity-50';
                badgeCls += ' bg-stone-100 text-stone-400';
              }
            } else {
              if (isSelected) {
                containerCls += ' border-[#107A53] bg-[#107A53]/5';
                badgeCls += ' bg-[#107A53] text-white';
              } else {
                containerCls += ' border-stone-200 bg-white hover:border-[#107A53]/30 hover:bg-[#FCFAF8]';
                badgeCls += ' bg-stone-100 text-stone-600 group-hover:bg-[#107A53]/10 group-hover:text-[#107A53]';
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
                {/* Letter badge */}
                <span className={badgeCls}>{opt}</span>

                {/* Option content — Arabic first (larger), English below if exists */}
                <div className="flex-1 min-w-0">
                  {arabic && (
                   <div
                      dir="rtl"
                      lang="ar"
                      className={`font-arabic leading-[1.9] text-[18px] text-right w-full font-bold ${
                        isEval && isCorrect ? 'text-[#107A53]' : 'text-stone-800'
                      }`}
                    >
                      {arabic}
                    </div>
                  )}
                  {english && (
                    <div
                      className={`text-sm leading-snug mt-0.5 ${
                        isEval && isCorrect ? 'text-[#107A53]' : 'text-stone-500'
                      }`}
                    >
                      {english}
                    </div>
                  )}
                </div>

                {/* Status icon */}
                {isEval && isCorrect && (
                  <CheckCircle2 size={18} className="shrink-0 text-[#107A53] mt-0.5" />
                )}
                {isEval && isWrong && (
                  <XCircle size={18} className="shrink-0 text-rose-400 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Answer Explanation ─────────────────────────── */}
        {isEval && (
          <div className="mt-6 rounded-xl border border-stone-200 overflow-hidden animate-slide-up">
            {/* Result header */}
            <div
              className={`px-5 py-3 flex items-center gap-2.5 ${
                evaluation.isCorrect ? 'bg-[#107A53]' : 'bg-rose-500'
              }`}
            >
              {evaluation.isCorrect ? (
                <CheckCircle2 size={18} className="text-white shrink-0" />
              ) : (
                <AlertCircle size={18} className="text-white shrink-0" />
              )}
              <span className="text-white font-bold text-sm">
                {evaluation.isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>

            <div className="p-5 bg-[#FCFAF8] space-y-4">
              {/* Correct answer text */}
              {evaluation.correctText && (
                <div>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1.5 text-right" dir="rtl">
                    الإجابة الصحيحة
                  </p>
                  <div
                    dir="rtl"
                    lang="ar"
                    className="text-[#107A53] font-arabic font-bold text-xl leading-[2] text-right"
                  >
                    {evaluation.correctText}
                  </div>
                </div>
              )}

              {/* Explanation */}
              {evaluation.explanation && (
                <div className={evaluation.correctText ? 'border-t border-stone-200 pt-4' : ''}>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                    Explanation
                  </p>
                  <div
                    dir="rtl"
                    lang="ar"
                    className="text-stone-700 font-arabic text-base font-bold leading-[2] text-right"
                  >
                    {evaluation.explanation}
                  </div>
                </div>
              )}

              {!evaluation.correctText && !evaluation.explanation && (
                <p className="text-stone-400 text-sm italic text-center">
                  No explanation available for this question.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
