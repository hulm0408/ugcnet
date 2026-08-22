'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, FileQuestion, ArrowRight, FolderOpen, ChevronRight } from 'lucide-react';

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
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const toggleUnit = (unitId: string) => {
    setExpandedUnit((prev) => (prev === unitId ? null : unitId));
  };

  const toggleTopic = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  return (
    <div className="space-y-4">
      {units.map((unit) => {
        const isExpanded = expandedUnit === unit.id;

        return (
          <div
            key={unit.id}
            className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${
              isExpanded ? 'border-slate-400 shadow-md ring-1 ring-slate-400' : 'border-slate-200 shadow-sm hover:border-slate-300 hover:shadow'
            }`}
          >
            {/* Unit Header */}
            <button
              onClick={() => toggleUnit(unit.id)}
              className="w-full flex items-start gap-4 p-5 text-left focus:outline-none"
            >
              <div
                className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                  isExpanded ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {unit.number}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  dir="rtl"
                  lang="ar"
                  className="font-arabic font-bold text-slate-900 text-xl leading-snug text-right mb-1"
                >
                  {unit.nameAr}
                </div>
                <div className="text-slate-500 text-sm font-medium">{unit.nameEn}</div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className="shrink-0 text-slate-400">
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                  {unit.questionCount} Qs
                </span>
              </div>
            </button>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="border-t border-slate-100 bg-slate-50 animate-slide-up">
                {unit.broadTopics.length > 0 ? (
                  <div className="flex flex-col divide-y divide-slate-100">
                    {unit.broadTopics.map((topic) => {
                      const isTopicExpanded = expandedTopics[topic.id];
                      return (
                        <div key={topic.id} className="bg-white">
                          <button
                            onClick={(e) => toggleTopic(topic.id, e)}
                            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
                          >
                            <div className="flex items-center gap-3">
                              <FolderOpen size={18} className="text-blue-500" />
                              <div>
                                <div dir="rtl" lang="ar" className="font-arabic font-bold text-slate-800 text-right text-lg">
                                  {topic.nameAr}
                                </div>
                                <div className="text-slate-500 text-sm">{topic.nameEn}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                              <span className="text-xs font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                                {topic.questionCount} Qs
                              </span>
                              {isTopicExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            </div>
                          </button>

                          {/* Subtopics */}
                          {isTopicExpanded && (
                            <div className="pl-12 pr-4 pb-4 bg-slate-50/50">
                              {topic.subtopics.length > 0 ? (
                                <div className="grid gap-2 mt-2">
                                  {topic.subtopics.map((subtopic) => (
                                    <div key={subtopic.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                      <div className="flex-1 min-w-0 pr-4">
                                        <div dir="rtl" lang="ar" className="font-arabic font-semibold text-slate-700 text-right">
                                          {subtopic.nameAr}
                                        </div>
                                        {subtopic.nameEn && (
                                          <div className="text-slate-500 text-xs mt-1">{subtopic.nameEn}</div>
                                        )}
                                      </div>
                                      <Link
                                        href={`/practice?unit=${unit.number}&topic=${topic.slug}&subtopic=${subtopic.slug}`}
                                        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded hover:bg-slate-50 text-xs font-medium transition-colors"
                                      >
                                        <FileQuestion size={14} />
                                        <span>Browse {subtopic.questionCount} Qs</span>
                                      </Link>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="mt-2 text-sm text-slate-500 italic">No subtopics available.</div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-500 text-sm">
                    No topics found for this unit.
                  </div>
                )}
                
                {/* Unit level browse button */}
                <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
                  <Link
                    href={`/practice?unit=${unit.number}`}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm ${
                      unit.questionCount > 0
                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                        : 'bg-slate-200 text-slate-400 pointer-events-none'
                    }`}
                  >
                    Browse All {unit.questionCount} Questions in Unit
                    <ArrowRight size={16} />
                  </Link>
                </div>

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
