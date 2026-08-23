'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, PlayCircle, BookOpen, Layers, Filter } from 'lucide-react';
import QuestionBrowserCard, { QuestionData } from './QuestionBrowserCard';

interface NodeQuestionsViewProps {
  questions: QuestionData[];
  nodeNameAr: string;
  nodeNameEn: string;
  practiceHref: string;
}

export default function NodeQuestionsView({
  questions,
  nodeNameAr,
  nodeNameEn,
  practiceHref,
}: NodeQuestionsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');

  const availableYears = useMemo(() => {
    const years = Array.from(new Set(questions.map((q) => q.exam_paper.year))).sort((a, b) => b - a);
    return years;
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesYear = selectedYear === 'ALL' || q.exam_paper.year.toString() === selectedYear;

      if (!matchesYear) return false;

      if (!searchQuery.trim()) return true;

      const qText = (q.question_arabic || '').toLowerCase();
      const qEnText = (q.question_english || '').toLowerCase();
      const qNum = (q.original_question_number || '').toLowerCase();
      const microAr = (q.question_micro_focus_arabic || '').toLowerCase();
      const query = searchQuery.trim().toLowerCase();

      return (
        qText.includes(query) ||
        qEnText.includes(query) ||
        qNum.includes(query) ||
        microAr.includes(query)
      );
    });
  }, [questions, searchQuery, selectedYear]);

  return (
    <div className="space-y-6">
      {/* Primary Action Banner */}
      <div className="bg-gradient-to-r from-[#0C6240] to-[#107A53] rounded-3xl p-6 sm:p-7 text-white shadow-lg shadow-emerald-950/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-sm">
            <BookOpen size={13} />
            Verified Question Bank
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Practice this Node
          </h2>
          <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 max-w-lg">
            Start a targeted, timed exam session with all {questions.length} official PYQs for {nodeNameEn}.
          </p>
        </div>

        <Link
          href={practiceHref}
          className="shrink-0 px-6 py-3.5 bg-white text-[#0C6240] hover:bg-emerald-50 rounded-2xl font-black text-sm transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <PlayCircle size={18} />
          Practice These Questions
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by Arabic keywords, year, topic..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Year Filter */}
        {availableYears.length > 1 && (
          <div className="flex items-center gap-2 shrink-0">
            <Filter size={14} className="text-stone-400 shrink-0" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="ALL">All Years ({availableYears.length})</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr.toString()}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between px-1 text-xs font-bold text-stone-400 uppercase tracking-wider">
        <span>
          Showing {filteredQuestions.length} of {questions.length} Questions
        </span>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedYear('ALL');
            }}
            className="text-primary hover:underline lowercase font-semibold"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Questions Cards List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => (
          <QuestionBrowserCard key={q.id} question={q} index={idx} />
        ))}

        {filteredQuestions.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 text-stone-500 font-medium">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="font-bold text-stone-700 mb-1">No matching questions found.</p>
            <p className="text-xs text-stone-400">Try searching for a different keyword or resetting your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
