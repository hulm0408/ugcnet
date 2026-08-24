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
} from 'lucide-react';
import { getOptionText } from '@/lib/arabicUtils';

interface MemoryReviewItem {
  queueId: string;
  intervalDays: number;
  reviewCount: number;
  memoryStrength: number;
  nextReviewAt: string;
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
    specific_entity_name_arabic?: string | null;
    unit?: { unit_number: number; name_english: string; name_arabic: string } | null;
    exam_paper?: { year: number; paper_number: string } | null;
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
  const [reviewResults, setReviewResults] = useState<Array<{ questionId: string; wasHelpful: boolean; nextDays: number }>>([]);
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

      let nextDays = wasHelpful ? currentItem.intervalDays * 2 : 1;
      if (res.ok) {
        const json = await res.json();
        nextDays = json.nextSchedule?.intervalDays || nextDays;
      }

      setReviewResults((prev) => [
        ...prev,
        { questionId: currentItem.question.id, wasHelpful, nextDays },
      ]);

      if (currentIndex + 1 < items.length) {
        setCurrentIndex((prev) => prev + 1);
        setStage('prompt');
      } else {
        setIsDone(true);
        setStage('completed');
        if (onFinish) onFinish();
      }
    } catch (e) {
      console.error('Failed to submit review feedback:', e);
    } finally {
      setSubmittingReview(false);
    }
  };

  // ── Finished Summary View ──
  if (isDone || !currentItem) {
    const rememberedCount = reviewResults.filter((r) => r.wasHelpful).length;
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl border border-stone-200 shadow-xl p-8 sm:p-12 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
          <Trophy size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            Memory Review Complete!
          </h2>
          <p className="text-stone-500 text-sm mt-1">
            You reviewed {items.length} personal memory connections.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <div className="text-3xl font-black text-emerald-800">{rememberedCount}</div>
            <div className="text-xs font-bold text-emerald-700 mt-0.5">Retained Strong</div>
          </div>
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
            <div className="text-3xl font-black text-amber-800">{items.length - rememberedCount}</div>
            <div className="text-xs font-bold text-amber-700 mt-0.5">Scheduled for Tomorrow</div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/memories"
            className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm text-center"
          >
            My Memories Hub
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm rounded-xl transition-all text-center"
          >
            Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { question, userMemories, userConnections, intervalDays, memoryStrength } = currentItem;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Top Progress Bar */}
      <div className="flex items-center justify-between gap-4 bg-white px-6 py-3.5 rounded-2xl border border-stone-200/90 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            <SpacedRepetitionIcon size={16} />
          </div>
          <div>
            <div className="text-xs font-black text-stone-900 uppercase tracking-wider">
              Memory Review Mode
            </div>
            <div className="text-[11px] text-stone-500 font-medium">
              Recall your mental tricks & test memory retention
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-stone-600">
          <span className="px-2.5 py-1 bg-stone-100 rounded-lg">
            {currentIndex + 1} / {items.length}
          </span>
          <span className="hidden sm:inline px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg">
            Interval: {intervalDays}d
          </span>
        </div>
      </div>

      {/* Main Question Recall Card */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Meta Header */}
        <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-stone-900 text-white text-[11px] font-bold rounded-lg">
              {question.exam_paper?.year ? `${question.exam_paper.year} Paper ${question.exam_paper.paper_number}` : `Question ${currentIndex + 1}`}
            </span>
            {question.unit && (
              <span className="text-xs font-bold text-stone-500">
                Unit {question.unit.unit_number}: {question.unit.name_english}
              </span>
            )}
          </div>

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

        {/* Question Arabic Text */}
        <div
          dir="rtl"
          lang="ar"
          className="font-arabic font-extrabold text-stone-900 text-xl sm:text-2xl leading-[2] text-right"
        >
          {question.question_arabic}
        </div>

        {question.question_english && (
          <div className="text-stone-500 text-sm italic">
            {question.question_english}
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
                const optText = getOptionText(question.options_arabic?.[opt], 'ar');
                const isCorrect = opt === question.correct_answer;
                if (!optText) return null;

                return (
                  <div
                    key={opt}
                    dir="rtl"
                    lang="ar"
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-sm font-arabic transition-all ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-500/30'
                        : 'bg-stone-50/70 border-stone-200 text-stone-500 opacity-60'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-sans font-bold text-xs shrink-0 ${
                        isCorrect ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {opt}
                    </span>
                    <span className="flex-1 leading-relaxed">{optText}</span>
                    {isCorrect && (
                      <span className="font-sans text-xs text-emerald-700 font-black px-2 py-0.5 bg-emerald-100 rounded-md">
                        Correct Answer
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {stage === 'answer_revealed' && (
              <div className="text-center pt-3">
                <button
                  type="button"
                  onClick={handleRevealMemory}
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 inline-flex items-center gap-2"
                >
                  <BrainSparkIcon size={16} /> Show My Memory Trick
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
              </div>
            ) : (
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-center text-xs text-stone-500">
                You saved this question in your queue without custom notes.
              </div>
            )}

            {/* Linked Questions if any */}
            {userConnections.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Connected Questions in Knowledge Graph:
                </div>
                {userConnections.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-center justify-between gap-3"
                  >
                    <span className="font-bold text-emerald-800 flex items-center gap-1">
                      <LinkConnectionIcon size={13} /> {c.relationship_type}
                    </span>
                    <span dir="rtl" className="font-arabic font-bold text-stone-800 truncate">
                      {c.target_question?.question_arabic}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Recall Evaluation Feedback */}
            <div className="bg-stone-900 text-white rounded-2xl p-5 sm:p-6 text-center space-y-3">
              <h4 className="font-bold text-sm sm:text-base">
                Did this mental trick help you remember correctly?
              </h4>
              <div className="flex gap-3 justify-center max-w-xs mx-auto">
                <button
                  type="button"
                  disabled={submittingReview}
                  onClick={() => handleFeedback(true)}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
                >
                  <Check size={18} /> YES
                </button>
                <button
                  type="button"
                  disabled={submittingReview}
                  onClick={() => handleFeedback(false)}
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-black text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
                >
                  <XCircle size={18} /> NO
                </button>
              </div>
              <p className="text-[11px] text-stone-400">
                YES extends review interval • NO schedules for tomorrow
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
