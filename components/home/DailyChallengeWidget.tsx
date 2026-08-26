'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  BookOpen,
  Award,
} from 'lucide-react';

interface Question {
  id: string;
  unit: string;
  questionText: string;
  direction?: 'ltr' | 'rtl';
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  examCitation: string;
}

const sampleQuestions: Question[] = [
  {
    id: 'q1',
    unit: 'Paper 1 • Unit 2: Research Aptitude',
    questionText:
      'Which of the following research formats places maximum emphasis on testing causal relationships through manipulation of an independent variable?',
    direction: 'ltr',
    options: [
      { id: 'A', text: 'Descriptive Survey Method' },
      { id: 'B', text: 'Experimental Research' },
      { id: 'C', text: 'Historical Archival Method' },
      { id: 'D', text: 'Ethnographic Field Study' },
    ],
    correctAnswer: 'B',
    explanation:
      'Experimental research is characterized by the direct manipulation of the independent variable, control of extraneous variables, and observation of effects on the dependent variable to establish causality.',
    examCitation: 'UGC NET Dec 2023 Shift 1 (QID: 240981)',
  },
  {
    id: 'q2',
    unit: 'Paper 1 • Unit 1: Teaching Aptitude',
    questionText:
      'Which level of teaching aims primarily at developing the problem-solving and critical evaluation capability of students?',
    direction: 'ltr',
    options: [
      { id: 'A', text: 'Memory Level (Herbartian)' },
      { id: 'B', text: 'Understanding Level (Morrison)' },
      { id: 'C', text: 'Reflective Level (Hunt)' },
      { id: 'D', text: 'Autonomous Development Level' },
    ],
    correctAnswer: 'C',
    explanation:
      'Reflective level of teaching (Hunt) is the highest level of teaching focused on creative problem-solving, cognitive independence, and critical inquiry.',
    examCitation: 'UGC NET June 2024 Shift 2 (QID: 198421)',
  },
  {
    id: 'q3',
    unit: 'Paper 1 • Unit 7: Data Interpretation & Logic',
    questionText:
      'If "All Philosophers are Thinkers" is given as TRUE, which of the following statements can be immediately inferred as FALSE according to the Classical Square of Opposition?',
    direction: 'ltr',
    options: [
      { id: 'A', text: 'Some Philosophers are Thinkers (Subaltern)' },
      { id: 'B', text: 'Some Philosophers are not Thinkers (Contradictory)' },
      { id: 'C', text: 'No Philosophers are Thinkers (Contrary)' },
      { id: 'D', text: 'Both B and C are FALSE' },
    ],
    correctAnswer: 'D',
    explanation:
      'When Universal Affirmative (A) is TRUE, its contradictory Particular Negative (O) is FALSE, and its contrary Universal Negative (E) is also FALSE. Hence both B and C are false.',
    examCitation: 'UGC NET Dec 2022 (QID: 881204)',
  },
];

export default function DailyChallengeWidget() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const q = sampleQuestions[currentIdx];

  const handleSelect = (id: string) => {
    if (hasSubmitted) return;
    setSelectedOpt(id);
    setHasSubmitted(true);
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setHasSubmitted(false);
    setCurrentIdx((prev) => (prev + 1) % sampleQuestions.length);
  };

  const isCorrect = selectedOpt === q.correctAnswer;

  return (
    <div className="w-full bg-white rounded-3xl border-2 border-stone-200/90 p-6 sm:p-8 shadow-sm font-sans text-stone-900">
      
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-mono font-bold uppercase tracking-wider text-emerald-800">
            Daily Live Question Probe
          </span>
          <span className="text-stone-300">•</span>
          <span className="text-stone-500 font-medium">Instant Evaluation</span>
        </div>

        <div className="text-stone-400 font-mono text-[11px]">
          {q.examCitation}
        </div>
      </div>

      {/* Unit Tag & Question */}
      <div className="py-4 space-y-3">
        <div className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 inline-block px-2.5 py-1 rounded-md border border-emerald-200/60">
          {q.unit}
        </div>

        <h3
          dir={q.direction || 'ltr'}
          className="text-base sm:text-lg font-medium text-stone-900 leading-relaxed"
        >
          {q.questionText}
        </h3>
      </div>

      {/* 4 Interactive Option Buttons */}
      <div className="grid sm:grid-cols-2 gap-3 pt-1 pb-4">
        {q.options.map((opt) => {
          let btnStyle = 'border-stone-200 bg-stone-50/70 hover:bg-stone-100 text-stone-800';

          if (hasSubmitted) {
            if (opt.id === q.correctAnswer) {
              btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
            } else if (opt.id === selectedOpt) {
              btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 line-through';
            } else {
              btnStyle = 'border-stone-200 bg-stone-50/40 text-stone-400 opacity-60';
            }
          }

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              disabled={hasSubmitted}
              className={`p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center gap-3 ${btnStyle}`}
            >
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                  hasSubmitted && opt.id === q.correctAnswer
                    ? 'bg-emerald-700 text-white'
                    : hasSubmitted && opt.id === selectedOpt
                    ? 'bg-rose-600 text-white'
                    : 'bg-white border border-stone-200 text-stone-600'
                }`}
              >
                {opt.id}
              </span>
              <span className="flex-1 font-medium">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation Banner (Appears after clicking) */}
      {hasSubmitted && (
        <div
          className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1.5 animate-fadeIn ${
            isCorrect
              ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/90 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
            {isCorrect ? (
              <>
                <CheckCircle2 size={16} className="text-emerald-700" />
                <span>Correct Answer (Option {q.correctAnswer})</span>
              </>
            ) : (
              <>
                <XCircle size={16} className="text-rose-600" />
                <span>Incorrect — Official Key is Option {q.correctAnswer}</span>
              </>
            )}
          </div>
          <p className="text-xs">{q.explanation}</p>
        </div>
      )}

      {/* Bottom Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-100 text-xs">
        <div className="text-stone-500 font-medium">
          {hasSubmitted
            ? 'Question solved. Ready for the next challenge?'
            : 'Click an option above to test your recall.'}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {hasSubmitted && (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 sm:flex-none px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw size={13} />
              <span>Next Question</span>
            </button>
          )}

          <a
            href="/mocks"
            className="flex-1 sm:flex-none px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-1.5"
          >
            <span>Full 100-Q Mock Test</span>
            <ArrowRight size={13} />
          </a>
        </div>
      </div>

    </div>
  );
}
