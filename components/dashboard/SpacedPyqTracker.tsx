'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Layers,
  Brain,
  RotateCcw,
} from 'lucide-react';
import { SPACING_LEVELS } from '@/lib/memoryEngine';

export interface SpacedItem {
  id: string;
  question_id: string;
  level: number;
  interval_days: number;
  next_review_at: string;
  due_deadline?: string | null;
  is_completed: boolean;
  completed_at?: string | null;
  memory_strength: number;
  question: {
    id: string;
    original_question_number: string;
    question_arabic: string;
    question_english?: string | null;
    question_micro_focus_arabic?: string | null;
    exam_paper?: {
      year: number;
      paper_number: string;
      session?: string | null;
    };
  };
}

interface SpacedPyqTrackerProps {
  completedItems: SpacedItem[];
  activeItems: SpacedItem[];
  levelCounts: Record<number, number>;
  totalCompletedCount: number;
  totalTrackedCount: number;
  dueTodayCount: number;
}

export default function SpacedPyqTracker({
  completedItems,
  activeItems,
  levelCounts,
  totalCompletedCount,
  totalTrackedCount,
  dueTodayCount,
}: SpacedPyqTrackerProps) {
  const [activeTab, setActiveTab] = useState<'levels' | 'completed' | 'due'>('levels');
  const now = new Date();

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden mb-12">
      {/* ── Section Header ── */}
      <div className="p-6 sm:p-8 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <Brain size={16} /> 5-Level Spaced Repetition Engine
          </div>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
            PYQ Spaced Mastery & Completion Tracker
          </h2>
          <p className="text-stone-500 text-sm font-medium mt-0.5">
            Progress questions across 5 deterministic retention intervals to earn permanent Mastery.
          </p>
        </div>

        {dueTodayCount > 0 && (
          <Link
            href="/memories/review"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2 shrink-0 animate-pulse"
          >
            <RotateCcw size={16} />
            <span>Review {dueTodayCount} Due Today</span>
          </Link>
        )}
      </div>

      {/* ── 5-Level Schedule Pipeline ── */}
      <div className="p-6 sm:p-8 bg-stone-50/70 border-b border-stone-100">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {SPACING_LEVELS.map((lvl) => {
            const count = levelCounts[lvl.level] || 0;
            return (
              <div
                key={lvl.level}
                className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-900">
                    L{lvl.level} • {lvl.title}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-2xl font-black text-stone-900">{count}</div>
                <div className="text-[11px] font-bold text-stone-500 mt-0.5 truncate">
                  {lvl.timeframe}
                </div>
                <div className="text-[10px] text-stone-400 font-arabic text-right mt-1">
                  {lvl.arabicTimeframe}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Completion Milestone Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Trophy size={24} className="text-amber-300" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                Permanent Retention Milestone
              </div>
              <div className="text-lg font-black tracking-tight">
                {totalCompletedCount} Completed & Mastered PYQs
              </div>
            </div>
          </div>

          <div className="text-xs font-semibold text-emerald-100 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
            {totalTrackedCount > 0
              ? `${Math.round((totalCompletedCount / totalTrackedCount) * 100)}% of tracked PYQs fully mastered`
              : 'Add questions to begin your 5-level journey'}
          </div>
        </div>
      </div>

      {/* ── Tabs: Completed PYQs | Due for Review ── */}
      <div className="px-6 sm:px-8 pt-6">
        <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Trophy size={14} className={activeTab === 'completed' ? 'text-amber-300' : 'text-stone-400'} />
            <span>Completed PYQs ({totalCompletedCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('due')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'due'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Clock size={14} className={activeTab === 'due' ? 'text-emerald-400' : 'text-stone-400'} />
            <span>In-Progress Queue ({activeItems.length})</span>
          </button>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="p-6 sm:p-8">
        {activeTab === 'completed' && (
          <div>
            {completedItems.length === 0 ? (
              <div className="text-center py-10 px-4 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-100">
                  <Trophy size={24} />
                </div>
                <h4 className="text-stone-900 font-bold text-base">No Completed PYQs Yet</h4>
                <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
                  Click <strong>&quot;Remember&quot;</strong> on any question to enroll it. Pass all 5 review intervals on time to earn permanent completion!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {completedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-emerald-200/90 bg-emerald-50/40 hover:bg-emerald-50/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white font-bold text-[10px]">
                          ✓ Mastered
                        </span>
                        {item.question.exam_paper && (
                          <span className="font-bold text-stone-700">
                            {item.question.exam_paper.year} Paper {item.question.exam_paper.paper_number}
                          </span>
                        )}
                        <span className="text-stone-500 font-medium">Q{item.question.original_question_number}</span>
                        {item.completed_at && (
                          <span className="text-[11px] text-stone-400">
                            • Completed {new Date(item.completed_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <div
                        dir="rtl"
                        lang="ar"
                        className="font-arabic font-bold text-stone-900 text-sm sm:text-base line-clamp-1 text-right"
                      >
                        {item.question.question_arabic}
                      </div>
                    </div>

                    <Link
                      href={`/practice?questionId=${item.question.id}`}
                      className="px-3.5 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-stone-900 hover:border-stone-300 text-xs font-bold transition-colors inline-flex items-center gap-1 shrink-0 self-start sm:self-center"
                    >
                      <span>Practice</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'due' && (
          <div>
            {activeItems.length === 0 ? (
              <div className="text-center py-10 px-4 space-y-3">
                <CheckCircle2 size={36} className="mx-auto text-emerald-600" />
                <h4 className="text-stone-900 font-bold text-base">All Caught Up!</h4>
                <p className="text-stone-500 text-xs sm:text-sm">
                  No active spaced repetition reviews are currently due.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeItems.map((item) => {
                  const reviewDate = new Date(item.next_review_at);
                  const isDue = reviewDate.getTime() <= now.getTime();
                  const deadlineDate = item.due_deadline ? new Date(item.due_deadline) : null;
                  const isOverdue = deadlineDate ? now.getTime() > deadlineDate.getTime() : false;
                  const lvlInfo = SPACING_LEVELS[Math.min(5, Math.max(1, item.level)) - 1];

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-stone-200 hover:border-stone-300 bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap text-xs">
                          <span className="px-2 py-0.5 rounded-md bg-stone-900 text-white font-bold text-[10px]">
                            Level {item.level} ({lvlInfo.timeframe})
                          </span>
                          {isDue && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px]">
                              Due Now
                            </span>
                          )}
                          {isOverdue && (
                            <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 font-bold text-[10px]">
                              Overdue
                            </span>
                          )}
                          {item.question.exam_paper && (
                            <span className="text-stone-600 font-medium">
                              {item.question.exam_paper.year} Paper {item.question.exam_paper.paper_number}
                            </span>
                          )}
                        </div>

                        <div
                          dir="rtl"
                          lang="ar"
                          className="font-arabic font-bold text-stone-900 text-sm sm:text-base line-clamp-1 text-right"
                        >
                          {item.question.question_arabic}
                        </div>
                      </div>

                      <Link
                        href="/memories/review"
                        className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm inline-flex items-center gap-1 shrink-0 self-start sm:self-center"
                      >
                        <RotateCcw size={13} />
                        <span>Review</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
