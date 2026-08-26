'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Play,
  BookOpen,
  FileText,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface PaperOption {
  id: string;
  year: number;
  paperNumber?: string;
  displayName?: string | null;
  session?: string | null;
  totalQuestions: number;
  isPaperIII?: boolean;
}

export default function PyqDrillDownPicker({
  papers,
  years,
}: {
  papers: PaperOption[];
  years: number[];
}) {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<number>(years[0] || 2023);

  // Available papers for this year
  const yearPapers = papers.filter((p) => p.year === selectedYear);
  const [selectedPaperId, setSelectedPaperId] = useState<string>(
    yearPapers[0]?.id || ''
  );

  const currentPaper =
    yearPapers.find((p) => p.id === selectedPaperId) || yearPapers[0];

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    const newYearPapers = papers.filter((p) => p.year === year);
    if (newYearPapers.length > 0) {
      setSelectedPaperId(newYearPapers[0].id);
    }
  };

  const startCbtMock = () => {
    if (currentPaper) {
      router.push(
        `/practice?paperId=${currentPaper.id}&year=${currentPaper.year}&type=mock&paperTitle=${encodeURIComponent(
          currentPaper.displayName || `Year ${currentPaper.year} Paper`
        )}`
      );
    }
  };

  const startPracticeMode = () => {
    if (currentPaper) {
      router.push(
        `/practice?paperId=${currentPaper.id}&year=${currentPaper.year}&type=practice&paperTitle=${encodeURIComponent(
          currentPaper.displayName || `Year ${currentPaper.year} Paper`
        )}`
      );
    }
  };

  const openYearFolder = () => {
    router.push(`/pyq/${selectedYear}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            <Sparkles size={12} className="text-emerald-700" />
            <span>Interactive Drill-Down Picker</span>
          </div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            Quick Jump to Any Paper or Part
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Select Year → Session / Paper → Start Mode
        </div>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Selector 1: Year */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">1. Examination Year</label>
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(parseInt(e.target.value, 10))}
            className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 outline-none focus:border-emerald-600 focus:bg-white transition-colors"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y} Exam Cycle
              </option>
            ))}
          </select>
        </div>

        {/* Selector 2: Paper / Session */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">2. Paper / Session</label>
          <select
            value={selectedPaperId}
            onChange={(e) => setSelectedPaperId(e.target.value)}
            disabled={yearPapers.length === 0}
            className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 outline-none focus:border-emerald-600 focus:bg-white transition-colors disabled:opacity-50"
          >
            {yearPapers.length > 0 ? (
              yearPapers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.displayName || p.paperNumber || `Paper (${p.totalQuestions} Qs)`}
                </option>
              ))
            ) : (
              <option value="">No papers available</option>
            )}
          </select>
        </div>

        {/* Selector 3: Paper Details summary */}
        <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
          <label className="text-xs font-bold text-slate-700">3. Selected Configuration</label>
          <div className="py-2 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center justify-between min-h-[42px]">
            <span className="font-bold text-slate-900 truncate">
              {currentPaper?.displayName || `Year ${selectedYear}`}
            </span>
            <span className="text-emerald-700 font-bold shrink-0 ml-2 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
              {currentPaper?.totalQuestions || 50} Solved Qs
            </span>
          </div>
        </div>

      </div>

      {/* Instant Action CTA Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
        <button
          onClick={startCbtMock}
          className="flex-1 sm:flex-none px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <Play size={14} fill="currentColor" />
          <span>Open in CBT Mock Simulator</span>
        </button>

        <button
          onClick={startPracticeMode}
          className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <BookOpen size={14} />
          <span>Practice &amp; Learn Mode</span>
        </button>

        <button
          onClick={openYearFolder}
          className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer ml-auto border border-slate-200"
        >
          <span>View Year {selectedYear} Archive</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
