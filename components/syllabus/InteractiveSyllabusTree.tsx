'use client';

import { useState, useCallback } from 'react';
import { ChevronRight, ChevronDown, BookOpen, Layers } from 'lucide-react';

/* ── Types matching config/subjects/types.ts ── */

interface SyllabusSubtopic {
  name: string;
}

interface SyllabusTopic {
  name: string;
  subtopics?: SyllabusSubtopic[];
}

interface SyllabusUnit {
  unitNumber: number;
  title: string;
  topics: SyllabusTopic[];
}

interface SyllabusSource {
  authority: string;
  documentTitle?: string;
  retrievedDate?: string;
  verified: boolean;
}

interface Props {
  units: SyllabusUnit[];
  source?: SyllabusSource;
  subjectName: string;
  subjectCode: string;
  scriptDirection?: 'ltr' | 'rtl';
}

export default function InteractiveSyllabusTree({
  units,
  source,
  subjectName,
  subjectCode,
  scriptDirection = 'ltr',
}: Props) {
  const [expandedUnits, setExpandedUnits] = useState<Set<number>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleUnit = useCallback((unitNumber: number) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(unitNumber)) {
        next.delete(unitNumber);
        // Also collapse all topics within this unit
        setExpandedTopics((tp) => {
          const nextTp = new Set(tp);
          for (const key of tp) {
            if (key.startsWith(`${unitNumber}-`)) nextTp.delete(key);
          }
          return nextTp;
        });
      } else {
        next.add(unitNumber);
      }
      return next;
    });
  }, []);

  const toggleTopic = useCallback((unitNumber: number, topicIdx: number) => {
    const key = `${unitNumber}-${topicIdx}`;
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedUnits(new Set(units.map((u) => u.unitNumber)));
    const allTopicKeys: string[] = [];
    units.forEach((u) => {
      u.topics.forEach((_, tIdx) => {
        allTopicKeys.push(`${u.unitNumber}-${tIdx}`);
      });
    });
    setExpandedTopics(new Set(allTopicKeys));
  }, [units]);

  const collapseAll = useCallback(() => {
    setExpandedUnits(new Set());
    setExpandedTopics(new Set());
  }, []);

  if (!units || units.length === 0) {
    return (
      <div className="p-8 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-2">
        <BookOpen size={28} className="mx-auto text-stone-400" />
        <div className="text-sm font-bold text-stone-800">
          Official Syllabus for {subjectName} (Code {subjectCode})
        </div>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          Official NTA syllabus data is being prepared for this subject. Check the syllabus page for available unit information.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" dir={scriptDirection}>
      {/* ── Header Row ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-emerald-700" />
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {units.length} Units • Official NTA Syllabus
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 transition-colors px-2 py-1 rounded hover:bg-emerald-50"
          >
            Expand All
          </button>
          <span className="text-stone-300">|</span>
          <button
            onClick={collapseAll}
            className="text-[11px] font-bold text-stone-500 hover:text-stone-700 transition-colors px-2 py-1 rounded hover:bg-stone-100"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* ── Unit Tree ── */}
      <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white divide-y divide-stone-100">
        {units.map((unit) => {
          const isUnitExpanded = expandedUnits.has(unit.unitNumber);

          return (
            <div key={unit.unitNumber}>
              {/* Unit Row */}
              <button
                onClick={() => toggleUnit(unit.unitNumber)}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-stone-50/80 transition-colors text-left group"
                aria-expanded={isUnitExpanded}
                aria-controls={`unit-${unit.unitNumber}-topics`}
              >
                <span className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0">
                  {unit.unitNumber}
                </span>

                <span className="flex-1 text-sm font-bold text-stone-900 leading-snug">
                  {unit.title}
                </span>

                <span className="text-[11px] font-bold text-stone-400 shrink-0 mr-1">
                  {unit.topics.length} {unit.topics.length === 1 ? 'topic' : 'topics'}
                </span>

                {isUnitExpanded ? (
                  <ChevronDown size={16} className="text-emerald-600 shrink-0" />
                ) : (
                  <ChevronRight size={16} className="text-stone-400 group-hover:text-stone-600 shrink-0" />
                )}
              </button>

              {/* Topics (expanded) */}
              {isUnitExpanded && (
                <div
                  id={`unit-${unit.unitNumber}-topics`}
                  className="bg-stone-50/50 border-t border-stone-100"
                >
                  {unit.topics.map((topic, tIdx) => {
                    const topicKey = `${unit.unitNumber}-${tIdx}`;
                    const isTopicExpanded = expandedTopics.has(topicKey);
                    const hasSubtopics = topic.subtopics && topic.subtopics.length > 0;

                    return (
                      <div key={tIdx}>
                        {/* Topic Row */}
                        {hasSubtopics ? (
                          <button
                            onClick={() => toggleTopic(unit.unitNumber, tIdx)}
                            className="w-full flex items-center gap-2.5 pl-10 pr-4 py-2.5 hover:bg-emerald-50/50 transition-colors text-left group"
                            aria-expanded={isTopicExpanded}
                            aria-controls={`topic-${topicKey}-subtopics`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span className="flex-1 text-[13px] font-semibold text-stone-800 leading-snug">
                              {topic.name}
                            </span>
                            {isTopicExpanded ? (
                              <ChevronDown size={14} className="text-emerald-500 shrink-0" />
                            ) : (
                              <ChevronRight size={14} className="text-stone-400 group-hover:text-stone-500 shrink-0" />
                            )}
                          </button>
                        ) : (
                          <div className="flex items-center gap-2.5 pl-10 pr-4 py-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-300 shrink-0" />
                            <span className="flex-1 text-[13px] font-medium text-stone-700 leading-snug">
                              {topic.name}
                            </span>
                          </div>
                        )}

                        {/* Subtopics (expanded) */}
                        {hasSubtopics && isTopicExpanded && (
                          <div
                            id={`topic-${topicKey}-subtopics`}
                            className="bg-emerald-50/30"
                          >
                            {topic.subtopics!.map((sub, sIdx) => (
                              <div
                                key={sIdx}
                                className="flex items-start gap-2 pl-16 pr-4 py-1.5"
                              >
                                <span className="w-1 h-1 rounded-full bg-stone-300 shrink-0 mt-1.5" />
                                <span className="text-xs text-stone-600 leading-relaxed font-medium">
                                  {sub.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Source Attribution ── */}
      {source && (
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400 font-medium pt-1">
          {source.verified && (
            <span className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 text-[8px] font-black">
              ✓
            </span>
          )}
          <span>
            Source: {source.authority}
            {source.documentTitle && ` — ${source.documentTitle}`}
            {source.retrievedDate && ` (${source.retrievedDate})`}
          </span>
        </div>
      )}
    </div>
  );
}
