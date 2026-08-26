'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, BookOpen, Layers, Calendar, ChevronLeft, ChevronRight, Eye, EyeOff, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { getOptionText } from '@/lib/arabicUtils';

interface QuestionItem {
  id: string;
  source_question_id: string;
  original_question_number: string;
  question_arabic: string;
  question_english?: string | null;
  options_arabic: Record<string, string>;
  options_english?: Record<string, string> | null;
  correct_answer: string;
  correct_answer_text_arabic?: string | null;
  specific_entity_name_arabic?: string | null;
  specific_entity_name_english?: string | null;
  question_micro_focus_arabic?: string | null;
  question_micro_focus_english?: string | null;
  unit?: { unit_number: number; name_english: string; name_arabic: string } | null;
  broad_topic?: { name_english: string; name_arabic: string } | null;
  subtopic?: { name_english: string; name_arabic: string } | null;
  exam_paper: { year: number; paper_number: string; display_name: string };
}

interface SearchClientProps {
  initialQuery: string;
  initialUnit?: number;
  initialYear?: number;
  questions: QuestionItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  units: Array<{ unit_number: number; name_english: string; name_arabic: string }>;
  years: number[];
}

export default function SearchClient({
  initialQuery,
  initialUnit,
  initialYear,
  questions,
  totalCount,
  currentPage,
  totalPages,
  units,
  years,
}: SearchClientProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [selectedUnit, setSelectedUnit] = useState<number | undefined>(initialUnit);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(initialYear);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

  const toggleReveal = (qId: string) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (selectedUnit) params.set('unit', selectedUnit.toString());
    if (selectedYear) params.set('year', selectedYear.toString());
    params.set('page', '1');
    router.push(`/search?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (selectedUnit) params.set('unit', selectedUnit.toString());
    if (selectedYear) params.set('year', selectedYear.toString());
    params.set('page', page.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      
      {/* Search Input Bar & Filters */}
      <form
        onSubmit={handleSearch}
        className="bg-white border border-stone-200/90 rounded-3xl p-4 sm:p-7 shadow-sm space-y-4 max-w-full overflow-hidden"
      >
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords, authors (امرؤ القيس, الجاحظ), poems, or concepts..."
            className="w-full pl-10 sm:pl-12 pr-24 sm:pr-28 py-3.5 sm:py-4 bg-stone-50 border-2 border-stone-200 rounded-2xl text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-primary transition-all text-sm sm:text-base font-medium"
          />
          <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 sm:px-5 py-2 sm:py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm"
          >
            Search
          </button>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-400 uppercase tracking-wider">
            <Filter size={14} /> Filter:
          </div>

          {/* Unit Filter */}
          <select
            value={selectedUnit || ''}
            onChange={(e) => {
              const val = e.target.value ? parseInt(e.target.value, 10) : undefined;
              setSelectedUnit(val);
            }}
            className="w-full sm:w-auto max-w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 focus:outline-none focus:border-primary cursor-pointer truncate"
          >
            <option value="">All 10 Units</option>
            {units.map((u) => (
              <option key={u.unit_number} value={u.unit_number}>
                Unit {u.unit_number}: {u.name_english}
              </option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear || ''}
            onChange={(e) => {
              const val = e.target.value ? parseInt(e.target.value, 10) : undefined;
              setSelectedYear(val);
            }}
            className="w-full sm:w-auto max-w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 focus:outline-none focus:border-primary cursor-pointer truncate"
          >
            <option value="">All Exam Years (2004–2024)</option>
            {years.map((y) => (
              <option key={y} value={y}>
                Year {y}
              </option>
            ))}
          </select>

          {(selectedUnit || selectedYear || query) && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedUnit(undefined);
                setSelectedYear(undefined);
                router.push('/search');
              }}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 underline ml-auto"
            >
              Clear Filters
            </button>
          )}
        </div>
      </form>

      {/* Results Header */}
      {(query || selectedUnit || selectedYear) && (
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest">
            Search Results ({totalCount.toLocaleString()} Questions)
          </h2>
          <span className="text-xs text-stone-400 font-semibold">
            Page {currentPage} of {Math.max(1, totalPages)}
          </span>
        </div>
      )}

      {/* Questions List */}
      {questions.length > 0 ? (
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const isRevealed = revealedAnswers.has(q.id);
            const globalIdx = (currentPage - 1) * 20 + idx + 1;

            return (
              <div
                key={q.id}
                className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative max-w-full overflow-hidden"
              >
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-stone-100">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-3 py-1 bg-stone-100 text-stone-700 font-bold rounded-xl">
                      #{globalIdx}
                    </span>
                    {q.unit && (
                      <span className="px-3 py-1 bg-primary/10 text-primary-dark font-bold rounded-xl border border-primary/20">
                        Unit {q.unit.unit_number}: {q.unit.name_english}
                      </span>
                    )}
                    <span className="px-3 py-1 bg-amber-50 text-amber-800 font-bold rounded-xl border border-amber-200/60">
                      {q.exam_paper.year} • {q.exam_paper.paper_number}
                    </span>
                    {q.specific_entity_name_arabic && (
                      <span
                        dir="rtl"
                        lang="ar"
                        className="px-3 py-1 bg-stone-50 text-stone-700 font-arabic font-bold rounded-xl border border-stone-200"
                      >
                        {q.specific_entity_name_arabic}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/practice?questionId=${q.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors"
                  >
                    <PlayCircle size={14} /> Practice
                  </Link>
                </div>

                {/* Arabic Question Text */}
                <div
                  dir="rtl"
                  lang="ar"
                  className="font-arabic font-semibold text-2xl sm:text-3xl text-stone-950 leading-[2.4] mb-4 text-right"
                >
                  {q.question_arabic}
                </div>

                {/* English Question Text if available */}
                {q.question_english && (
                  <div className="text-stone-700 text-sm sm:text-base font-normal border-l-3 border-emerald-500 pl-4 py-1 leading-relaxed mb-6">
                    {q.question_english}
                  </div>
                )}

                {/* MCQ Options A, B, C, D */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                  {['A', 'B', 'C', 'D'].map((optKey, idx) => {
                    const optTextAr = q.options_arabic?.[optKey];
                    const isCorrect = q.correct_answer === optKey;

                    let optStyle = 'border-stone-200/90 bg-white text-stone-800';
                    if (isRevealed) {
                      if (isCorrect) {
                        optStyle = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 ring-2 ring-emerald-400/30';
                      }
                    }

                    return (
                      <div
                        key={optKey}
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${optStyle}`}
                      >
                        <div className="flex flex-col items-center gap-0.5 shrink-0 pt-0.5">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-black shadow-xs ${
                              isRevealed && isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            {optKey}
                          </span>
                          <span className="text-[9px] font-mono text-stone-400">({idx + 1})</span>
                        </div>
                        <div
                          dir="rtl"
                          lang="ar"
                          className="font-arabic font-semibold text-xl sm:text-2xl leading-[2.2] flex-1 text-right"
                        >
                          {getOptionText(optTextAr, 'ar') || '—'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Answer Reveal Bar */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    {isRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
                    {isRevealed ? 'Hide Answer' : 'Reveal Answer'}
                  </button>

                  {isRevealed && (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
                      <span>Correct Answer: Option {q.correct_answer}</span>
                      {q.correct_answer_text_arabic && (
                        <span dir="rtl" className="font-arabic">
                          ({q.correct_answer_text_arabic})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-6">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 rounded-xl bg-white border border-stone-200 font-bold text-xs text-stone-700 hover:bg-stone-50 disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <span className="text-xs font-bold text-stone-500">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 rounded-xl bg-white border border-stone-200 font-bold text-xs text-stone-700 hover:bg-stone-50 disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      ) : query || selectedUnit || selectedYear ? (
        <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center">
          <BookOpen className="mx-auto text-stone-300 mb-3" size={40} />
          <h3 className="text-lg font-bold text-stone-900 mb-1">No Questions Found</h3>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            Try searching for a different author, literary period, or adjusting your unit and year filters.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center">
          <Search className="mx-auto text-stone-300 mb-3" size={40} />
          <h3 className="text-lg font-bold text-stone-900 mb-1">Search the Entire Question Bank</h3>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            Type any Arabic or English keyword above or select a unit or year to start browsing questions.
          </p>
        </div>
      )}

    </div>
  );
}
