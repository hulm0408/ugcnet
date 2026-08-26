'use client';

import React, { useState } from 'react';
import {
  Clock,
  ChevronRight,
} from 'lucide-react';

interface RealCbtPreviewProps {
  subjectName: string;
  subjectCode: string;
  nativeName?: string;
  direction?: 'ltr' | 'rtl';
}

export default function RealCbtInterfacePreview({
  subjectName,
  subjectCode,
  nativeName,
  direction = 'ltr',
}: RealCbtPreviewProps) {
  const [selectedPaper, setSelectedPaper] = useState<'paper1' | 'paper2'>('paper2');
  const [selectedOption, setSelectedOption] = useState<string>('B');

  const paper1Question = {
    unit: 'Unit 2: Research Aptitude',
    qNum: 14,
    text: 'In which of the following sampling methods does every member of the population have an equal and independent chance of being selected?',
    options: [
      { id: 'A', text: 'Purposive Sampling' },
      { id: 'B', text: 'Simple Random Sampling' },
      { id: 'C', text: 'Quota Sampling' },
      { id: 'D', text: 'Snowball Sampling' },
    ],
  };

  const paper2Question = {
    unit: 'Unit 1: Classical Literature',
    qNum: 37,
    text:
      direction === 'rtl'
        ? 'مَنْ هُوَ الشَّاعِرُ الَّذِي لُقِّبَ بِـ "صَنَّاجَةِ الْعَرَبِ" فِي العَصْرِ الْجَاهِلِيِّ؟'
        : 'Which classical poet was renowned with the honorific title "Sannajat al-Arab" during the pre-Islamic era?',
    options: [
      { id: 'A', text: direction === 'rtl' ? 'امْرُؤُ الْقَيْسِ' : 'Imru\' al-Qais' },
      { id: 'B', text: direction === 'rtl' ? 'الْأَعْشَى (مَيْمُونُ بْنُ قَيْسٍ)' : 'Al-A\'sha (Maymun ibn Qays)' },
      { id: 'C', text: direction === 'rtl' ? 'زُهَيْرُ بْنُ أَبِي سُلْمَى' : 'Zuhayr ibn Abi Sulma' },
      { id: 'D', text: direction === 'rtl' ? 'عَمْرُو بْنُ كُلْثُومٍ' : 'Amr ibn Kulthum' },
    ],
  };

  const currentQ = selectedPaper === 'paper1' ? paper1Question : paper2Question;

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-stone-300 bg-white shadow-xl overflow-hidden font-sans text-stone-900 select-none">
      
      {/* Top NTA CBT Header */}
      <div className="bg-[#1E3A8A] text-white px-4 py-2.5 flex items-center justify-between text-xs border-b border-blue-900">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wide">NTA CBT Simulator</span>
          <span className="text-blue-300 hidden sm:inline">•</span>
          <span className="text-blue-200 hidden sm:inline">Code {subjectCode}</span>
        </div>

        {/* 160-Min Timer */}
        <div className="flex items-center gap-1.5 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800 font-mono font-bold text-amber-300 text-xs">
          <Clock size={13} className="text-amber-400" />
          <span>02:39:45</span>
        </div>
      </div>

      {/* Paper 1 vs Paper 2 Tab Bar */}
      <div className="flex items-center border-b border-stone-200 bg-stone-100/90 text-xs font-bold">
        <button
          type="button"
          onClick={() => setSelectedPaper('paper1')}
          className={`flex-1 py-2 px-3 text-center transition-colors border-r border-stone-200 flex items-center justify-center gap-1.5 ${
            selectedPaper === 'paper1'
              ? 'bg-white text-emerald-800 border-b-2 border-b-emerald-700 shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          <span>Paper 1 (General)</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-stone-200 text-stone-700 rounded-full font-mono">
            50 Qs
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedPaper('paper2')}
          className={`flex-1 py-2 px-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
            selectedPaper === 'paper2'
              ? 'bg-white text-emerald-800 border-b-2 border-b-emerald-700 shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          <span>Paper 2 ({subjectName})</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full font-mono">
            100 Qs
          </span>
        </button>
      </div>

      {/* Main CBT Screen Split: Question + Palette */}
      <div className="grid grid-cols-12 min-h-[300px] bg-stone-50">
        
        {/* Left 8 Cols: Question Area */}
        <div className="col-span-12 sm:col-span-8 p-4 bg-white border-r border-stone-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-100 text-[11px] font-semibold text-stone-500">
              <span className="font-mono text-emerald-800 font-bold">
                Question {currentQ.qNum} of {selectedPaper === 'paper1' ? 50 : 100}
              </span>
              <span className="text-stone-400 truncate max-w-[140px]">{currentQ.unit}</span>
            </div>

            <div
              dir={selectedPaper === 'paper2' ? direction : 'ltr'}
              className={`text-stone-900 text-xs sm:text-sm font-medium leading-relaxed mb-4 ${
                selectedPaper === 'paper2' && direction === 'rtl' ? 'font-arabic text-right' : 'text-left'
              }`}
            >
              {currentQ.text}
            </div>

            {/* 4 Options */}
            <div className="space-y-2">
              {currentQ.options.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  dir={selectedPaper === 'paper2' ? direction : 'ltr'}
                  className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all flex items-center gap-2.5 ${
                    selectedOption === opt.id
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-2xs'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      selectedOption === opt.id
                        ? 'bg-emerald-700 text-white'
                        : 'border border-stone-300 text-stone-500'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-stone-100 text-[10px] font-bold">
            <button type="button" className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg">
              Clear
            </button>
            <div className="flex gap-1.5">
              <button type="button" className="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg">
                Mark for Review
              </button>
              <button type="button" className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1">
                <span>Save &amp; Next</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Question Palette */}
        <div className="col-span-12 sm:col-span-4 p-3 bg-stone-50/90 text-stone-700 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              Question Palette
            </div>

            {/* Status counts mini-legend */}
            <div className="grid grid-cols-2 gap-1 text-[9px] font-bold text-stone-600 mb-3">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-emerald-600 text-white rounded-xs flex items-center justify-center text-[7px]">✓</span>
                <span>Answered (12)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-rose-600 text-white rounded-xs flex items-center justify-center text-[7px]">✕</span>
                <span>Unanswered (1)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-purple-600 text-white rounded-xs flex items-center justify-center text-[7px]">?</span>
                <span>Review (2)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-stone-200 border border-stone-300 text-stone-600 rounded-xs flex items-center justify-center text-[7px]">-</span>
                <span>Not Visited</span>
              </div>
            </div>

            {/* Grid of 20 sample buttons */}
            <div className="grid grid-cols-5 gap-1 font-mono text-[9px] font-bold">
              {[...Array(20)].map((_, i) => {
                const num = i + 1;
                let bg = 'bg-stone-200 text-stone-600 hover:bg-stone-300';
                if (num <= 12) bg = 'bg-emerald-600 text-white';
                if (num === 13) bg = 'bg-rose-600 text-white';
                if (num === 14) bg = 'bg-purple-600 text-white ring-2 ring-emerald-400';
                if (num === 15) bg = 'bg-purple-600 text-white';

                return (
                  <div
                    key={num}
                    className={`h-6 rounded-md flex items-center justify-center cursor-pointer transition-transform active:scale-95 ${bg}`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 text-[10px] text-center text-stone-500 font-medium">
            Official NTA Exam Environment
          </div>
        </div>

      </div>
    </div>
  );
}
