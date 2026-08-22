'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type SubtopicData = {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  questionCount: number;
};

export type BroadTopicData = {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  questionCount: number;
  subtopics: SubtopicData[];
};

export type UnitData = {
  id: string;
  number: number;
  nameAr: string;
  nameEn: string;
  questionCount: number;
  broadTopics: BroadTopicData[];
};

export default function SyllabusList({ units }: { units: UnitData[] }) {
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);

  useEffect(() => {
    if (units.length > 0 && !activeUnitId) {
      setActiveUnitId(units[0].id);
    }
  }, [units, activeUnitId]);

  const activeUnit = units.find(u => u.id === activeUnitId) || units[0];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Pane: Units */}
      <div className="w-full lg:w-1/3 shrink-0 flex flex-col gap-3">
        {units.map((unit) => {
          const isActive = activeUnitId === unit.id;

          return (
            <button
              key={unit.id}
              onClick={() => setActiveUnitId(unit.id)}
              className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                isActive 
                  ? 'bg-[#FCFAF8] border-[#E8DEC8] shadow-[0_4px_20px_-10px_rgba(217,119,6,0.15)] ring-1 ring-[#F3E8D6]' 
                  : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-5 min-w-0">
                <span className={`text-3xl font-light tabular-nums transition-colors ${isActive ? 'text-[#D97706]' : 'text-stone-300 group-hover:text-stone-400'}`}>
                  {unit.number.toString().padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div dir="rtl" lang="ar" className={`font-arabic font-bold text-lg mb-1 truncate ${isActive ? 'text-stone-900' : 'text-stone-700'}`}>
                    {unit.nameAr}
                  </div>
                  <div className={`text-[11px] font-bold tracking-wide uppercase truncate ${isActive ? 'text-stone-500' : 'text-stone-400'}`}>
                    {unit.nameEn}
                  </div>
                </div>
              </div>
              <ChevronRight size={20} className={isActive ? 'text-[#D97706]' : 'text-stone-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0'} />
            </button>
          );
        })}
      </div>

      {/* Right Pane: Topics */}
      <div className="flex-1 bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        
        {/* Decorative SVG Pattern Top Right */}
        <svg className="absolute top-0 right-0 text-stone-100 opacity-50 pointer-events-none" width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
           <path d="M0,0 L100,0 L100,100 Z" opacity="0.3"/>
           <path d="M50,0 L100,0 L100,50 Z" opacity="0.5"/>
        </svg>

        <div className="relative z-10">
          <div className="mb-8">
            <h2 className="text-xl font-extrabold text-stone-900">Topics in this Unit</h2>
            <div className="h-1 w-12 bg-[#107A53] mt-4 rounded-full"></div>
          </div>

          {activeUnit?.broadTopics && activeUnit.broadTopics.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {activeUnit.broadTopics.map((topic, index) => (
                <Link
                  href={`/syllabus/${activeUnit.number}/${topic.slug}`}
                  key={topic.id}
                  className="group block p-5 bg-white border border-stone-200 rounded-xl hover:border-[#107A53]/30 hover:shadow-md transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#107A53] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded bg-[#107A53] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-inner">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div dir="rtl" lang="ar" className="font-arabic font-bold text-stone-900 text-lg leading-snug mb-1">
                        {topic.nameAr}
                      </div>
                      <div className="text-stone-500 text-[11px] font-bold tracking-wide uppercase leading-tight">
                        {topic.nameEn}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] font-bold text-stone-400 bg-stone-50 px-3 py-2 rounded-lg mt-auto">
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-800 text-[12px]">{topic.subtopics.length}</span> Nodes
                    </div>
                    <div className="w-1 h-1 rounded-full bg-stone-300"></div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-800 text-[12px]">{topic.questionCount}</span> Questions
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-stone-500 font-medium">
              <p>No topics found for this unit yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
