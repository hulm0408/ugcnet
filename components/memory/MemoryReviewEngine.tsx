'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BrainSparkIcon,
  SpacedRepetitionIcon,
  LinkConnectionIcon,
} from './MemoryIcons';
import {
  Brain,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  Edit3,
  Trophy,
  Eye,
  Check,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { getOptionText } from '@/lib/arabicUtils';
import { SPACING_LEVELS } from '@/lib/memoryEngine';
import BilingualText from '@/components/ui/BilingualText';
import GoogleSearchButton from '@/components/ui/GoogleSearchButton';

interface MemoryReviewItem {
  queueId: string;
  level?: number;
  levelInfo?: {
    level: number;
    title: string;
    arabicTitle: string;
    timeframe: string;
    arabicTimeframe: string;
    intervalDays: number;
    description: string;
  };
  intervalDays: number;
  reviewCount: number;
  memoryStrength: number;
  nextReviewAt: string;
  dueDeadline?: string | null;
  isOverdue?: boolean;
  isCompleted?: boolean;
  question: {
    id: string;
    original_question_number: string;
    question_arabic: string;
    question_english?: string | null;
    options_arabic: any;
    options_english?: any;
    correct_answer: string;
    correct_answer_text_arabic?: string | null;
    explanation_arabic?: string | null;
    explanation_english?: string | null;
    question_micro_focus_arabic?: string | null;
    exam_paper?: {
      year: number;
      paper_number: string;
      session?: string | null;
    };
  };
  userMemories: Array<{
    id: string;
    type: string;
    content: string;
    keywords?: string[] | null;
  }>;
  userConnections: Array<{
    id: string;
    relationship_type: string;
    note?: string | null;
    target_question?: {
      id: string;
      question_arabic: string;
      original_question_number: string;
    };
  }>;
}

interface MemoryReviewEngineProps {
  items: MemoryReviewItem[];
  onFinish?: () => void;
}

export default function MemoryReviewEngine({ items, onFinish }: MemoryReviewEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState<'prompt' | 'answer_revealed' | 'memory_revealed' | 'completed'>('prompt');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewResults, setReviewResults] = useState<Array<{
    questionId: string;
    wasHelpful: boolean;
    nextDays: number;
    nextLevel: number;
    isCompleted: boolean;
  }>>([]);
  const [isDone, setIsDone] = useState(false);

  const currentItem = items[currentIndex];

  const handleRevealAnswer = () => {
    setStage('answer_revealed');
  };

  const handleRevealMemory = () => {
    setStage('memory_revealed');
  };

  const handleFeedback = async (wasHelpful: boolean) => {
    if (!currentItem) return;

    setSubmittingReview(true);
    try {
      const res = await fetch('/api/memories/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentItem.question.id,
          wasHelpful,
          memoryId: currentItem.userMemories[0]?.id || null,
        }),
      });

      let nextDays = wasHelpful ? 3 : 1;
      let nextLevel = (currentItem.level || 1) + 1;
      let isCompleted = false;

      if (res.ok) {
        const json = await res.json();
        nextDays = json.nextSchedule?.intervalDays || nextDays;
        nextLevel = json.nextSchedule?.level || nextLevel;
        isCompleted = !!json.isCompleted;
      }

      setReviewResults((prev) => [
        ...prev,
        {
          questionId: currentItem.question.id,
          wasHelpful,
          nextDays,
          nextLevel,
          isCompleted,
        },
      ]);

      if (currentIndex + 1 < items.length) {
        setCurrentIndex((prev) => prev + 1);
        setStage('prompt');
      } else {
        setIsDone(true);
      }
    } catch (e) {
      console.error('Failed to submit review:', e);
    } finally {
      setSubmittingReview(false);
    }
  };

  // ── Final Completion Screen ──
  if (isDone || items.length === 0) {
    const rememberedCount = reviewResults.filter((r) => r.wasHelpful).length;
    const masteredCount = reviewResults.filter((r) => r.isCompleted).length;

    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8 sm:p-12 space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
            <Trophy size={32} />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Memory Review Completed!
            </h2>
            <p className="text-stone-500 text-sm font-medium mt-1">
              You reviewed {reviewResults.length} mental connections today.
            </p>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100">
              <div className="text-2xl font-black text-stone-900">{reviewResults.length}</div>
              <div className="text-xs font-bold text-stone-500 mt-0.5">Reviewed</div>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
              <div className="text-2xl font-black text-emerald-800">{rememberedCount}</div>
              <div className="text-xs font-bold text-emerald-700 mt-0.5">Retained on Time</div>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-amber-50 rounded-2xl p-4 border border-amber-100">
              <div className="text-2xl font-black text-amber-800">{masteredCount}</div>
              <div className="text-xs font-bold text-amber-700 mt-0.5">PYQs Completed 🏆</div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-stone-900 text-white font-bold text-sm rounded-xl hover:bg-stone-800 transition-colors shadow-sm"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/memories"
              className="px-6 py-3 bg-emerald-700 text-white font-bold text-sm rounded-xl hover:bg-emerald-800 transition-colors shadow-sm"
            >
              View My Knowledge Graph
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { question, userMemories, userConnections } = currentItem;
  const currentLevel = currentItem.level || 1;
  const levelConfig = SPACING_LEVELS[Math.min(5, Math.max(1, currentLevel)) - 1];

  let parsedOptions: Record<string, string> = {};
  try {
    if (typeof question.options_arabic === 'string') {
      parsedOptions = JSON.parse(question.options_arabic);
    } else if (question.options_arabic && typeof question.options_arabic === 'object') {
      parsedOptions = question.options_arabic;
    }
  } catch {
    parsedOptions = {};
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {/* ── 5-Level Progression Header ── */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-5 sm:p-6 mb-6">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-sm">
              L{currentLevel}
            </span>
            <div>
              <div className="text-xs font-black text-stone-900">
                {levelConfig.title}: {levelConfig.timeframe}
              </div>
              <div className="text-[11px] font-bold text-stone-400">
                {levelConfig.description}
              </div>
            </div>
          </div>

          <div className="text-xs font-bold text-stone-500">
            Question {currentIndex + 1} of {items.length}
          </div>
        </div>

        {/* 5-Level Progress Bar */}
        <div className="grid grid-cols-5 gap-2">
          {SPACING_LEVELS.map((lvl) => {
            const isPassed = lvl.level < currentLevel;
            const isCurrent = lvl.level === currentLevel;
            return (
              <div key={lvl.level} className="space-y-1">
                <div
                  className={`h-2 rounded-full transition-all ${
                    isPassed
                      ? 'bg-emerald-600'
                      : isCurrent
                      ? 'bg-emerald-500 ring-2 ring-emerald-400/40 animate-pulse'
                      : 'bg-stone-200'
                  }`}
                />
                <div className="text-[10px] font-bold text-center text-stone-500 truncate">
                  {lvl.level === 5 ? '🏆 Master' : `L${lvl.level}`}
                </div>
              </div>
            );
          })}
        </div>

        {currentItem.isOverdue && (
          <div className="mt-3.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-600 shrink-0" />
            <span>Overdue review: Completing late will restart at Level 1 to guarantee genuine memory retention.</span>
          </div>
        )}
      </div>

      {/* ── Question & Memory Card ── */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10 space-y-6">
        {/* Metadata Strip */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 text-xs font-bold text-stone-500 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {question.exam_paper && (
              <span className="px-2.5 py-1 rounded-lg bg-stone-900 text-white font-bold text-[11px]">
                {question.exam_paper.year} Paper {question.exam_paper.paper_number}
              </span>
            )}
            <span>Q{question.original_question_number}</span>
          </div>

          <div className="flex items-center gap-2">
            <GoogleSearchButton
              questionArabic={question.question_arabic}
              questionEnglish={question.question_english}
              microFocusArabic={question.question_micro_focus_arabic}
              size="sm"
            />
            {question.question_micro_focus_arabic && (
              <span
                dir="rtl"
                lang="ar"
                className="font-arabic text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100"
              >
                {question.question_micro_focus_arabic}
              </span>
            )}
          </div>
        </div>

        {/* Question Arabic Text */}
        <div
          dir="rtl"
          lang="ar"
          className="font-arabic font-semibold text-stone-950 text-2xl sm:text-3xl leading-[2.4] text-right"
        >
          {question.question_arabic}
        </div>

        {question.question_english && (
          <div className="text-stone-700 text-sm sm:text-base border-l-3 border-emerald-500 pl-4 py-1 leading-relaxed">
            <BilingualText text={question.question_english} />
          </div>
        )}

        {/* ── STAGE 1: Prompt - "What was YOUR trick for remembering this?" ── */}
        {stage === 'prompt' && (
          <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent rounded-2xl p-6 border-2 border-dashed border-emerald-300 text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
              <BrainSparkIcon size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black text-emerald-950">
                What was YOUR trick for remembering this?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
                Pause for a moment and mentally recall your mnemonic, acronym, story, or author connection before clicking reveal.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleRevealAnswer}
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 inline-flex items-center gap-2"
              >
                <Eye size={16} /> Reveal Answer
              </button>
            </div>
          </div>
        )}

        {/* ── STAGE 2: Correct Answer Revealed ── */}
        {(stage === 'answer_revealed' || stage === 'memory_revealed') && (
          <div className="space-y-4 animate-slide-up">
            {/* Options List */}
            <div className="space-y-2">
              {['A', 'B', 'C', 'D'].map((opt) => {
                const optText = parsedOptions[opt] || '';
                if (!optText) return null;
                const isCorrect = opt === question.correct_answer;

                return (
                  <div
                    key={opt}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                      isCorrect
                        ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20'
                        : 'bg-stone-50 border-stone-200/80 text-stone-700 opacity-60'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-sans font-black text-xs shrink-0 shadow-xs ${
                        isCorrect ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {opt}
                    </span>
                    <div
                      dir="rtl"
                      lang="ar"
                      className="flex-1 font-arabic text-xl sm:text-2xl font-semibold leading-[2.2] text-right"
                    >
                      {optText}
                    </div>
                    {isCorrect && (
                      <span className="text-emerald-800 font-bold text-xs shrink-0 self-center font-sans px-2.5 py-1 bg-emerald-100/90 rounded-lg border border-emerald-200">
                        Correct Answer
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {(question.explanation_arabic || question.explanation_english) && (
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs sm:text-sm text-stone-700 space-y-1.5">
                <div className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                  Explanation
                </div>
                {question.explanation_arabic && (
                  <p dir="rtl" lang="ar" className="font-arabic leading-relaxed text-right">
                    {question.explanation_arabic}
                  </p>
                )}
                {question.explanation_english && (
                  <p className="text-stone-500 italic">{question.explanation_english}</p>
                )}
              </div>
            )}

            {/* Button to reveal memory */}
            {stage === 'answer_revealed' && (
              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleRevealMemory}
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 inline-flex items-center gap-2"
                >
                  <BrainSparkIcon size={16} /> Show My Personal Memory Trick
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── STAGE 3: Show User's Personal Memory & Feedback ── */}
        {stage === 'memory_revealed' && (
          <div className="space-y-6 pt-2 animate-slide-up">
            {/* User Memory Display */}
            {userMemories.length > 0 ? (
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-5 border border-emerald-300 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <Brain size={15} className="text-emerald-700" />
                    Your Personal Memory Connection
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-bold">
                    {userMemories[0].type}
                  </span>
                </div>

                <div
                  dir="auto"
                  className="font-arabic font-extrabold text-stone-900 text-base sm:text-lg leading-relaxed whitespace-pre-wrap"
                >
                  {userMemories[0].content}
                </div>

                {userMemories[0].keywords && userMemories[0].keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {userMemories[0].keywords.map((kw: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white/80 text-[10px] font-bold text-emerald-900 border border-emerald-200"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-center text-xs text-stone-500 font-medium">
                No custom note written for this question yet.
              </div>
            )}

            {/* Recall Feedback Question */}
            <div className="bg-stone-900 text-white rounded-2xl p-6 text-center space-y-4 shadow-md">
              <h4 className="text-base sm:text-lg font-black tracking-tight">
                Did your memory connection help you recall this question?
              </h4>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                {currentLevel === 5
                  ? 'Confirming YES will mark this PYQ as 100% Completed & Mastered!'
                  : `Confirming YES advances this question to Level ${currentLevel + 1} of 5.`}
              </p>

              <div className="flex justify-center gap-4 pt-2">
                <button
                  type="button"
                  disabled={submittingReview}
                  onClick={() => handleFeedback(false)}
                  className="flex-1 max-w-[140px] py-3 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-black text-sm rounded-xl border border-rose-500/40 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ThumbsDown size={16} /> NO (Reset)
                </button>

                <button
                  type="button"
                  disabled={submittingReview}
                  onClick={() => handleFeedback(true)}
                  className="flex-1 max-w-[180px] py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ThumbsUp size={16} /> YES, Remembered!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
