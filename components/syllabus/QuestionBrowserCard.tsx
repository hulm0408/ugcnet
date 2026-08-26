'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, Bookmark, Share2 } from 'lucide-react';
import MemoryButton from '@/components/memory/MemoryButton';
import QuestionMemoryStrip from '@/components/memory/QuestionMemoryStrip';
import MemoryConnectionModal from '@/components/memory/MemoryConnectionModal';
import GoogleSearchButton from '@/components/ui/GoogleSearchButton';

export interface QuestionData {
  id: string;
  original_question_number: string;
  question_arabic: string;
  question_english?: string | null;
  options_arabic: any;
  options_english?: any;
  correct_answer: string;
  correct_answer_text_arabic?: string | null;
  question_micro_focus_arabic?: string | null;
  question_micro_focus_english?: string | null;
  exam_paper: {
    year: number;
    paper_number: string;
    session?: string | null;
    display_name?: string | null;
  };
}

interface QuestionBrowserCardProps {
  question: QuestionData;
  index: number;
}

export default function QuestionBrowserCard({ question, index }: QuestionBrowserCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);
  const [memoryRefresh, setMemoryRefresh] = useState(0);

  let optionsObj: Record<string, string> = {};
  try {
    if (typeof question.options_arabic === 'string') {
      optionsObj = JSON.parse(question.options_arabic);
    } else if (question.options_arabic && typeof question.options_arabic === 'object') {
      optionsObj = question.options_arabic;
    }
  } catch {
    optionsObj = {};
  }

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-stone-300 transition-all duration-200">
      {/* Top Metadata Strip */}
      <div className="flex items-center justify-between gap-3 mb-3.5 flex-wrap border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-lg bg-stone-900 text-white font-bold text-[11px] tracking-wide">
            {question.exam_paper.year} Paper {question.exam_paper.paper_number}
            {question.exam_paper.session ? ` (${question.exam_paper.session})` : ''}
          </span>
          <span className="text-xs font-bold text-stone-500">
            Q{question.original_question_number || index + 1}
          </span>
        </div>

        {question.question_micro_focus_arabic && (
          <span
            dir="rtl"
            lang="ar"
            className="font-arabic text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100"
            title={question.question_micro_focus_english || undefined}
          >
            {question.question_micro_focus_arabic}
          </span>
        )}
      </div>

      {/* Question Arabic Text */}
      <p
        dir="rtl"
        lang="ar"
        className="font-arabic font-bold text-stone-900 text-lg sm:text-xl leading-loose mb-5"
      >
        {question.question_arabic}
      </p>

      {/* English Translation if available */}
      {question.question_english && (
        <p className="text-xs text-stone-500 italic mb-4">
          {question.question_english}
        </p>
      )}

      {/* Options Grid */}
      {Object.keys(optionsObj).length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
          {Object.entries(optionsObj).map(([optKey, optVal]) => {
            const isCorrect = isRevealed && optKey === question.correct_answer;
            return (
              <div
                key={optKey}
                dir="rtl"
                lang="ar"
                className={`flex items-start gap-2.5 p-3 rounded-xl text-sm font-arabic transition-all border ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold ring-1 ring-emerald-400'
                    : 'bg-stone-50/70 border-stone-200/70 text-stone-800'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-sans font-bold text-xs shrink-0 ${
                    isCorrect
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {optKey}
                </span>
                <span className="flex-1 leading-relaxed pt-0.5">{String(optVal)}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3.5 border-t border-stone-100 text-xs mt-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRevealed(!isRevealed)}
            className="inline-flex items-center gap-1.5 text-stone-700 hover:text-stone-900 font-bold py-1.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 transition-colors"
          >
            {isRevealed ? (
              <>
                <EyeOff size={14} />
                Hide Answer
              </>
            ) : (
              <>
                <Eye size={14} />
                Reveal Answer
              </>
            )}
          </button>
          <GoogleSearchButton
            questionArabic={question.question_arabic}
            questionEnglish={question.question_english}
            microFocusArabic={question.question_micro_focus_arabic}
            size="sm"
          />
        </div>

        <MemoryButton
          questionId={question.id}
          onOpenMemoryModal={() => setMemoryModalOpen(true)}
        />
      </div>

      {isRevealed && (
        <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mt-3 pt-2 border-t border-dashed border-stone-200">
          <CheckCircle2 size={16} />
          <span>Correct: Option ({question.correct_answer})</span>
          {question.correct_answer_text_arabic && (
            <span dir="rtl" lang="ar" className="font-arabic font-medium text-emerald-900">
              — {question.correct_answer_text_arabic}
            </span>
          )}
        </div>
      )}

      {/* Inline Memory Preview */}
      <QuestionMemoryStrip
        questionId={question.id}
        onOpenModal={() => setMemoryModalOpen(true)}
        refreshTrigger={memoryRefresh}
      />

      {/* Memory Connection Modal */}
      {memoryModalOpen && (
        <MemoryConnectionModal
          isOpen={memoryModalOpen}
          onClose={() => setMemoryModalOpen(false)}
          question={question}
          onMemorySaved={() => setMemoryRefresh((prev) => prev + 1)}
        />
      )}
    </div>
  );
}
