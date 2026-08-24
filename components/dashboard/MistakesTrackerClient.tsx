'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  XCircle,
  Calendar,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingDown,
  Award,
} from 'lucide-react';
import { getOptionText } from '@/lib/arabicUtils';

export interface TestMistakeItem {
  questionId: string;
  question_arabic: string;
  question_english?: string | null;
  selected_option: string;
  correct_answer: string;
  options_arabic: Record<string, string>;
  options_english?: Record<string, string> | null;
  explanation_arabic?: string | null;
  explanation_english?: string | null;
  unit_number?: number | null;
  unit_name?: string | null;
  paper_name?: string | null;
  paper_year?: number | null;
  isResolved?: boolean;
}

export interface SessionHistoryItem {
  id: string;
  mode: string;
  paperTitle: string;
  year?: number | null;
  paperId?: string | null;
  unitNumber?: number | null;
  total_questions: number;
  score: number;
  correct_count: number;
  incorrect_count: number;
  skipped_count: number;
  accuracy: number;
  completed_at: string;
  relativeTime: string;
  fullDateTime: string;
  mistakes: TestMistakeItem[];
}

export interface UnitMistakeStat {
  unitNumber: number;
  nameArabic: string;
  nameEnglish: string;
  mistakeCount: number;
  unresolvedCount: number;
}

interface MistakesTrackerClientProps {
  sessions: SessionHistoryItem[];
  allMistakes: TestMistakeItem[];
  unitStats: UnitMistakeStat[];
  summaryStats: {
    totalMistakes: number;
    unresolvedMistakes: number;
    resolvedMistakes: number;
    totalSessions: number;
  };
}

export default function MistakesTrackerClient({
  sessions,
  allMistakes,
  unitStats,
  summaryStats,
}: MistakesTrackerClientProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'all' | 'units'>('timeline');
  const [expandedSessionIds, setExpandedSessionIds] = useState<Set<string>>(() => {
    // Expand the most recent session by default
    return new Set(sessions.length > 0 ? [sessions[0].id] : []);
  });

  // Filters for "All Mistakes" Tab
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');

  const toggleSessionExpand = (sessionId: string) => {
    setExpandedSessionIds((prev) => {
      const next = new Set(prev);
      if (next.has(sessionId)) next.delete(sessionId);
      else next.add(sessionId);
      return next;
    });
  };

  // Filtered mistakes list
  const filteredMistakes = useMemo(() => {
    return allMistakes.filter((m) => {
      if (selectedUnit !== 'all' && m.unit_number !== selectedUnit) return false;
      if (statusFilter === 'unresolved' && m.isResolved) return false;
      if (statusFilter === 'resolved' && !m.isResolved) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inAr = m.question_arabic?.toLowerCase().includes(q);
        const inEn = m.question_english?.toLowerCase().includes(q);
        const inUnit = m.unit_name?.toLowerCase().includes(q);
        const inPaper = m.paper_name?.toLowerCase().includes(q);
        if (!inAr && !inEn && !inUnit && !inPaper) return false;
      }

      return true;
    });
  }, [allMistakes, selectedUnit, statusFilter, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Header & Main Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-inner">
              <XCircle size={26} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-stone-900 tracking-tight">Mistake Tracker & History</h1>
              <p className="text-sm font-semibold text-stone-500">
                Review your test history, track mistakes made days or weeks ago, and conquer weak topics
              </p>
            </div>
          </div>
        </div>

        {summaryStats.totalMistakes > 0 && (
          <Link
            href="/practice?mode=incorrect"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-center shrink-0"
          >
            <RotateCcw size={18} /> Practice All Mistakes ({summaryStats.unresolvedMistakes})
          </Link>
        )}
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Mistakes</span>
            <XCircle size={18} className="text-rose-500" />
          </div>
          <div className="text-3xl font-black text-stone-900">{summaryStats.totalMistakes}</div>
          <div className="text-xs font-medium text-stone-500 mt-1">Across all test sessions</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Still Unresolved</span>
            <AlertTriangle size={18} className="text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600">{summaryStats.unresolvedMistakes}</div>
          <div className="text-xs font-medium text-stone-500 mt-1">Need targeted revision</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Mastered / Fixed</span>
            <CheckCircle2 size={18} className="text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600">{summaryStats.resolvedMistakes}</div>
          <div className="text-xs font-medium text-stone-500 mt-1">Answered correctly later</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Tests Recorded</span>
            <Calendar size={18} className="text-primary" />
          </div>
          <div className="text-3xl font-black text-primary-dark">{summaryStats.totalSessions}</div>
          <div className="text-xs font-medium text-stone-500 mt-1">Exam & practice sessions</div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-stone-200/70 rounded-2xl max-w-md">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'timeline'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Clock size={16} /> By Test / Date ({sessions.length})
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'all'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Layers size={16} /> All Mistakes ({allMistakes.length})
        </button>

        <button
          onClick={() => setActiveTab('units')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'units'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <BookOpen size={16} /> Weak Units
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* TAB 1: BY TEST / DATE (TIMELINE OF ATTEMPTS)          */}
      {/* ══════════════════════════════════════════════════════ */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {sessions.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center shadow-sm">
              <Calendar size={48} className="mx-auto text-stone-300 mb-4" />
              <h3 className="text-lg font-black text-stone-900 mb-1">No Test Attempts Recorded Yet</h3>
              <p className="text-sm text-stone-500 max-w-md mx-auto mb-6">
                Start a previous year paper or unit test. Whenever you make a mistake, it will automatically be tracked here by date, paper, and score!
              </p>
              <Link
                href="/pyq"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
              >
                Browse PYQ Papers
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {sessions.map((sess, idx) => {
                const isExpanded = expandedSessionIds.has(sess.id);
                const mistakeCount = sess.mistakes.length;

                return (
                  <div
                    key={sess.id}
                    className="bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    {/* Session Header Card */}
                    <div className="p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-stone-100">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 mt-0.5 ${
                            sess.accuracy >= 70
                              ? 'bg-emerald-100 text-emerald-800'
                              : sess.accuracy >= 40
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {sess.accuracy}%
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-700 flex items-center gap-1.5">
                              <Clock size={12} className="text-stone-400" />
                              {sess.relativeTime}
                            </span>
                            <span className="text-xs text-stone-400 font-medium">({sess.fullDateTime})</span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary-dark uppercase">
                              {sess.mode}
                            </span>
                          </div>

                          <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">
                            {sess.paperTitle || 'Practice Session'}
                          </h3>

                          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-stone-500 mt-2">
                            <span>Score: <b className="text-stone-900">{sess.score} pts</b></span>
                            <span>•</span>
                            <span className="text-emerald-700 font-bold">{sess.correct_count} Correct</span>
                            <span>•</span>
                            <span className="text-rose-600 font-bold">{sess.incorrect_count} Incorrect</span>
                            {sess.skipped_count > 0 && (
                              <>
                                <span>•</span>
                                <span className="text-stone-400">{sess.skipped_count} Skipped</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="flex flex-wrap items-center gap-3 self-end lg:self-center">
                        {mistakeCount > 0 && (
                          <Link
                            href={`/practice?mode=incorrect&sessionId=${sess.id}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors shadow-sm"
                          >
                            <RotateCcw size={14} /> Practice This Test's {mistakeCount} Mistakes
                          </Link>
                        )}

                        <button
                          onClick={() => toggleSessionExpand(sess.id)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              Hide Mistakes ({mistakeCount}) <ChevronUp size={16} />
                            </>
                          ) : (
                            <>
                              Review Mistakes ({mistakeCount}) <ChevronDown size={16} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Mistakes Review Area */}
                    {isExpanded && (
                      <div className="bg-stone-50/70 p-6 sm:p-8 space-y-6">
                        {mistakeCount === 0 ? (
                          <div className="text-center py-6 text-emerald-700 font-bold text-sm flex items-center justify-center gap-2">
                            <CheckCircle2 size={20} className="text-emerald-600" />
                            No mistakes in this session! Flawless performance.
                          </div>
                        ) : (
                          <div className="space-y-5">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                                Mistakes in this test ({mistakeCount} Questions)
                              </h4>
                              <span className="text-xs font-semibold text-stone-400">
                                Click any option to examine explanation
                              </span>
                            </div>

                            {sess.mistakes.map((m, mIdx) => (
                              <div
                                key={m.questionId}
                                className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-sm space-y-4"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-stone-100 text-stone-700">
                                      Mistake #{mIdx + 1}
                                    </span>
                                    {m.unit_number && (
                                      <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-primary/10 text-primary-dark">
                                        Unit {m.unit_number}: {m.unit_name}
                                      </span>
                                    )}
                                  </div>

                                  <Link
                                    href={`/practice?questionId=${m.questionId}`}
                                    className="text-xs font-bold text-primary hover:text-primary-dark underline"
                                  >
                                    Practice Single Question ›
                                  </Link>
                                </div>

                                {/* Arabic Question */}
                                <div dir="rtl" className="font-arabic text-xl font-bold text-stone-900 leading-relaxed">
                                  {m.question_arabic}
                                </div>

                                {m.question_english && (
                                  <div className="text-stone-600 text-xs sm:text-sm font-medium">
                                    {m.question_english}
                                  </div>
                                )}

                                {/* User vs Correct Answer */}
                                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
                                    <div className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
                                      Your Answer ({m.selected_option}):
                                    </div>
                                    <div dir="rtl" className="font-arabic text-base font-bold text-rose-900">
                                      {getOptionText(m.options_arabic?.[m.selected_option], 'ar') || 'No option recorded'}
                                    </div>
                                    {m.options_english?.[m.selected_option] && (
                                      <div className="text-xs text-rose-700 mt-0.5">
                                        {getOptionText(m.options_english[m.selected_option], 'en')}
                                      </div>
                                    )}
                                  </div>

                                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                                    <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                                      Correct Answer ({m.correct_answer}):
                                    </div>
                                    <div dir="rtl" className="font-arabic text-base font-bold text-emerald-950">
                                      {getOptionText(m.options_arabic?.[m.correct_answer], 'ar')}
                                    </div>
                                    {m.options_english?.[m.correct_answer] && (
                                      <div className="text-xs text-emerald-700 mt-0.5">
                                        {getOptionText(m.options_english[m.correct_answer], 'en')}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Explanation */}
                                {(m.explanation_arabic || m.explanation_english) && (
                                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 text-xs sm:text-sm space-y-1">
                                    <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">Explanation:</span>
                                    {m.explanation_arabic && (
                                      <div dir="rtl" className="font-arabic font-semibold text-stone-800">
                                        {m.explanation_arabic}
                                      </div>
                                    )}
                                    {m.explanation_english && (
                                      <div className="text-stone-600">
                                        {m.explanation_english}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════ */}
      {/* TAB 2: ALL MISTAKES (FILTERABLE & SEARCHABLE)          */}
      {/* ══════════════════════════════════════════════════════ */}
      {activeTab === 'all' && (
        <div className="space-y-6">
          {/* Filter Toolbar */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions or poets..."
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary"
                />
              </div>

              {/* Unit Filter */}
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10))}
                className="px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="all">All Syllabus Units (1 to 10)</option>
                {unitStats.map((u) => (
                  <option key={u.unitNumber} value={u.unitNumber}>
                    Unit {u.unitNumber}: {u.nameEnglish} ({u.mistakeCount} mistakes)
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="all">All Mistake Statuses</option>
                <option value="unresolved">Still Unresolved (Needs practice)</option>
                <option value="resolved">Mastered (Correct in later test)</option>
              </select>
            </div>

            {(searchQuery || selectedUnit !== 'all' || statusFilter !== 'all') && (
              <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-stone-100">
                <span className="text-stone-500">
                  Showing {filteredMistakes.length} of {allMistakes.length} mistakes
                </span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedUnit('all');
                    setStatusFilter('all');
                  }}
                  className="text-rose-600 hover:text-rose-700 underline"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Mistakes Cards */}
          {filteredMistakes.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center shadow-sm">
              <CheckCircle2 size={48} className="mx-auto text-emerald-400 mb-4" />
              <h3 className="text-lg font-black text-stone-900 mb-1">No Matching Mistakes Found</h3>
              <p className="text-sm text-stone-500 max-w-md mx-auto">
                No mistakes match your selected filters. Try broadening your search or resetting filters.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMistakes.map((m, idx) => (
                <div
                  key={`${m.questionId}-${idx}`}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-700">
                        {m.paper_name || (m.paper_year ? `Year ${m.paper_year}` : 'Exam Paper')}
                      </span>
                      {m.unit_number && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary-dark">
                          Unit {m.unit_number}: {m.unit_name}
                        </span>
                      )}
                      {m.isResolved ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 size={12} /> Mastered
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                          <AlertTriangle size={12} /> Unresolved
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/practice?questionId=${m.questionId}`}
                      className="text-xs font-bold text-primary hover:text-primary-dark underline"
                    >
                      Practice Now ›
                    </Link>
                  </div>

                  {/* Arabic Question */}
                  <div dir="rtl" className="font-arabic text-xl sm:text-2xl font-bold text-stone-900 leading-relaxed">
                    {m.question_arabic}
                  </div>

                  {m.question_english && (
                    <div className="text-stone-600 text-xs sm:text-sm font-medium">
                      {m.question_english}
                    </div>
                  )}

                  {/* Comparison Box */}
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
                      <div className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
                        Your Attempt ({m.selected_option}):
                      </div>
                      <div dir="rtl" className="font-arabic text-base font-bold text-rose-900">
                        {getOptionText(m.options_arabic?.[m.selected_option], 'ar') || 'No answer'}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                      <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                        Correct Answer ({m.correct_answer}):
                      </div>
                      <div dir="rtl" className="font-arabic text-base font-bold text-emerald-950">
                        {getOptionText(m.options_arabic?.[m.correct_answer], 'ar')}
                      </div>
                    </div>
                  </div>

                  {/* Explanation */}
                  {(m.explanation_arabic || m.explanation_english) && (
                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 text-xs sm:text-sm space-y-1">
                      <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">Explanation:</span>
                      {m.explanation_arabic && (
                        <div dir="rtl" className="font-arabic font-semibold text-stone-800">
                          {m.explanation_arabic}
                        </div>
                      )}
                      {m.explanation_english && (
                        <div className="text-stone-600">
                          {m.explanation_english}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════ */}
      {/* TAB 3: WEAK UNITS BREAKDOWN (BY SYLLABUS UNIT)       */}
      {/* ══════════════════════════════════════════════════════ */}
      {activeTab === 'units' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <h3 className="text-lg font-black text-stone-900 mb-2">Syllabus Weak Areas Analysis</h3>
            <p className="text-sm text-stone-500 mb-6">
              Track how many mistakes you've made in each of the 10 official UGC NET Arabic units. Practice unit-specific mistakes to turn weak areas into strengths.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unitStats.map((u) => {
                const hasMistakes = u.mistakeCount > 0;

                return (
                  <div
                    key={u.unitNumber}
                    className="p-5 rounded-2xl border border-stone-200/90 bg-stone-50/60 hover:bg-white hover:border-primary/40 transition-all flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-stone-200 text-stone-800">
                          Unit {u.unitNumber}
                        </span>
                        <span
                          className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                            hasMistakes
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {u.mistakeCount} Mistakes
                        </span>
                      </div>

                      <div dir="rtl" className="font-arabic text-base font-bold text-stone-900 mb-0.5">
                        {u.nameArabic}
                      </div>
                      <div className="text-xs font-semibold text-stone-500">
                        {u.nameEnglish}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-200/60">
                      <span className="text-xs font-bold text-stone-500">
                        {u.unresolvedCount} Unresolved
                      </span>

                      {hasMistakes ? (
                        <Link
                          href={`/practice?mode=incorrect&unit=${u.unitNumber}`}
                          className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:text-primary-dark transition-colors"
                        >
                          Practice Unit Mistakes <ArrowRight size={14} />
                        </Link>
                      ) : (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 size={14} /> Clean Record
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
