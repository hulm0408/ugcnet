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
              className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 flex items-center justify-between group ${
                isActive 
                  ? 'bg-gradient-to-r from-primary-surface to-white border-primary/20 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] ring-1 ring-primary/10' 
                  : 'bg-white border-stone-200 hover:border-primary/30 hover:bg-stone-50 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-5 min-w-0">
                <span className={`text-3xl font-black tabular-nums transition-colors ${isActive ? 'text-accent' : 'text-stone-300 group-hover:text-primary/60'}`}>
                  {unit.number.toString().padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div dir="rtl" lang="ar" className={`font-arabic font-bold text-lg mb-1 truncate ${isActive ? 'text-stone-900' : 'text-stone-700 group-hover:text-stone-900'}`}>
                    {unit.nameAr}
                  </div>
                  <div className={`text-[11px] font-bold tracking-wide uppercase truncate ${isActive ? 'text-primary' : 'text-stone-400 group-hover:text-stone-500'}`}>
                    {unit.nameEn}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <ChevronRight size={20} className={isActive ? 'text-accent' : 'text-stone-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0'} />
                <div className={`text-[10px] font-bold tracking-widest uppercase mt-2 px-2.5 py-1 rounded-full ${isActive ? 'bg-accent/10 text-accent-dark' : 'bg-stone-100 text-stone-500 group-hover:bg-primary-surface group-hover:text-primary'}`}>
                  {unit.questionCount} Qs
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Pane: Topics */}
      <div className="flex-1 bg-white/80 backdrop-blur-xl border border-stone-200/60 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] relative overflow-hidden">
        
        {/* Decorative SVG Pattern Top Right */}
        <svg className="absolute -top-10 -right-10 text-primary-surface opacity-50 pointer-events-none" width="300" height="300" viewBox="0 0 100 100" fill="currentColor">
           <path d="M0,0 L100,0 L100,100 Z" opacity="0.8"/>
           <path d="M50,0 L100,0 L100,50 Z" opacity="1"/>
        </svg>

        <div className="relative z-10">
          <div className="mb-10">
            <h2 className="text-2xl font-extrabold text-stone-900">Topics in this Unit</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-primary-dark to-primary mt-4 rounded-full"></div>
          </div>

          {activeUnit?.broadTopics && activeUnit.broadTopics.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {activeUnit.broadTopics.map((topic, index) => (
                <Link
                  href={`/syllabus/${activeUnit.number}/${topic.slug}`}
                  key={topic.id}
                  className="group block p-6 bg-white border border-stone-200/80 rounded-2xl hover:border-primary/40 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary-surface text-primary-dark group-hover:bg-primary group-hover:text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm transition-colors duration-300">
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

                  <div className="flex items-center justify-between text-[11px] font-bold text-stone-400 bg-stone-50 px-3 py-2 rounded-lg mb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-800 text-[12px]">{topic.subtopics.length}</span> Nodes
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-800 text-[12px]">{topic.questionCount}</span> Questions
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-primary group-hover:text-primary-dark">
                    <span>Explore Hierarchy Tree</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
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
