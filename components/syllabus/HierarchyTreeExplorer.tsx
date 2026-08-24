'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown, ChevronRight, PlayCircle, BookOpen,
  CheckCircle2, Eye, EyeOff, Layers, User,
  ChevronsDown, ChevronsUp, FileQuestion
} from 'lucide-react';

export type QuestionItem = {
  id: string;
  original_question_number: string;
  question_arabic: string;
  question_english?: string | null;
  options_arabic: any;
  correct_answer: string;
  correct_answer_text_arabic?: string | null;
  question_micro_focus_arabic?: string | null;
  question_micro_focus_english?: string | null;
  exam_paper: {
    year: number;
    paper_number: string;
    display_name?: string | null;
  };
};

export type MicroFocusGroup = {
  nameAr: string;
  nameEn: string;
  questions: QuestionItem[];
};

export type SubNodeEntity = {
  nameAr: string;
  nameEn: string;
  totalQuestions: number;
  microFocuses: MicroFocusGroup[];
};

export type HierarchyNode = {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  totalQuestions: number;
  entities: SubNodeEntity[];
};

interface HierarchyTreeExplorerProps {
  unitNumber: number;
  topicSlug: string;
  nodes: HierarchyNode[];
}

export default function HierarchyTreeExplorer({
  unitNumber,
  topicSlug,
  nodes,
}: HierarchyTreeExplorerProps) {
  // Level 3 (Nodes) — ALL COLLAPSED BY DEFAULT
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Level 4 (Entities / Sub-Nodes) — ALL COLLAPSED BY DEFAULT
  const [expandedEntities, setExpandedEntities] = useState<Set<string>>(new Set());

  // Level 5 (Micro-Focuses) — ALL COLLAPSED BY DEFAULT
  const [expandedMicroFocuses, setExpandedMicroFocuses] = useState<Set<string>>(new Set());

  // Level 6 (Questions Revealed Answers)
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

  // Toggle Level 3 Node
  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  };

  // Toggle Level 4 Entity
  const toggleEntity = (entityKey: string) => {
    setExpandedEntities((prev) => {
      const next = new Set(prev);
      if (next.has(entityKey)) next.delete(entityKey);
      else next.add(entityKey);
      return next;
    });
  };

  // Toggle Level 5 Micro-Focus
  const toggleMicroFocus = (focusKey: string) => {
    setExpandedMicroFocuses((prev) => {
      const next = new Set(prev);
      if (next.has(focusKey)) next.delete(focusKey);
      else next.add(focusKey);
      return next;
    });
  };

  // Toggle Level 6 Question Answer Reveal
  const toggleAnswer = (questionId: string) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  // Collapse All / Expand All Helper
  const expandAll = () => {
    const allNodeIds = new Set(nodes.map((n) => n.id));
    const allEntityKeys = new Set<string>();
    const allFocusKeys = new Set<string>();

    nodes.forEach((n) => {
      n.entities.forEach((e) => {
        const eKey = `${n.id}-${e.nameAr}`;
        allEntityKeys.add(eKey);
        e.microFocuses.forEach((m) => {
          allFocusKeys.add(`${eKey}-${m.nameAr}`);
        });
      });
    });

    setExpandedNodes(allNodeIds);
    setExpandedEntities(allEntityKeys);
    setExpandedMicroFocuses(allFocusKeys);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
    setExpandedEntities(new Set());
    setExpandedMicroFocuses(new Set());
  };

  const isAnyExpanded = expandedNodes.size > 0 || expandedEntities.size > 0;

  return (
    <div className="space-y-4">
      {/* ── Hierarchy Explorer Toolbar ── */}
      <div className="flex items-center justify-between px-2 py-1 flex-wrap gap-2 text-xs font-semibold text-stone-500">
        <span className="flex items-center gap-1.5">
          <Layers size={14} className="text-primary" />
          Click any level to expand step-by-step
        </span>

        <div className="flex items-center gap-2">
          {isAnyExpanded ? (
            <button
              type="button"
              onClick={collapseAll}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-colors"
            >
              <ChevronsUp size={14} />
              Collapse All
            </button>
          ) : (
            <button
              type="button"
              onClick={expandAll}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-colors"
            >
              <ChevronsDown size={14} />
              Expand All
            </button>
          )}
        </div>
      </div>

      {/* ── Level 3: Nodes List ── */}
      {nodes.map((node, nodeIndex) => {
        const isNodeExpanded = expandedNodes.has(node.id);

        return (
          <div
            key={node.id}
            className="bg-white border border-stone-200/90 rounded-2xl shadow-sm transition-all duration-200 overflow-hidden"
          >
            {/* ═══ LEVEL 3: NODE ROW (Click to Open Level 4) ═══ */}
            <div
              onClick={() => toggleNode(node.id)}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between cursor-pointer select-none transition-colors ${
                isNodeExpanded ? 'bg-stone-50/80 border-b border-stone-200/80' : 'hover:bg-stone-50/50'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <button
                  type="button"
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                    isNodeExpanded
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}
                  aria-label={isNodeExpanded ? 'Collapse Node' : 'Expand Node'}
                >
                  {isNodeExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>

                <div className="flex-1 min-w-0">
                  <div
                    dir="rtl"
                    lang="ar"
                    className="font-arabic font-bold text-stone-900 text-lg sm:text-xl leading-snug mb-0.5"
                  >
                    {node.nameAr}
                  </div>
                  <div className="text-stone-500 text-xs font-bold uppercase tracking-wider flex items-center gap-2 flex-wrap">
                    <span>{node.nameEn}</span>
                    <span className="text-stone-300">•</span>
                    <span className="text-primary font-semibold lowercase">
                      {node.entities.length} sub-nodes
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button & Qs Count */}
              <div
                className="shrink-0 flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-2.5 py-1 bg-stone-100 rounded-lg text-center font-bold text-xs text-stone-700">
                  {node.totalQuestions} Qs
                </div>

                <Link
                  href={`/practice?unit=${unitNumber}&topic=${topicSlug}&subtopic=${node.slug}`}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    node.totalQuestions > 0
                      ? 'bg-[#107A53] hover:bg-[#0C6240] text-white hover:text-white shadow-sm active:scale-95'
                      : 'bg-stone-100 text-stone-400 pointer-events-none'
                  }`}
                >
                  <PlayCircle size={13} />
                  Practice
                </Link>
              </div>
            </div>

            {/* ═══ LEVEL 4: SUB-NODES / ENTITIES (Visible Only When Level 3 is Clicked) ═══ */}
            {isNodeExpanded && (
              <div className="p-4 sm:p-5 space-y-3 bg-[#FCFAF8]/70 border-b border-stone-100">
                <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest px-1 mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Level 4: Sub-Nodes & Targeted Entities ({node.entities.length})
                </div>

                {node.entities.map((entity, entityIdx) => {
                  const entityKey = `${node.id}-${entity.nameAr}`;
                  const isEntityExpanded = expandedEntities.has(entityKey);

                  return (
                    <div
                      key={entityKey}
                      className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    >
                      {/* ═══ LEVEL 4 ROW (Click to Open Level 5) ═══ */}
                      <div
                        onClick={() => toggleEntity(entityKey)}
                        className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
                          isEntityExpanded
                            ? 'bg-emerald-50/60 border-b border-emerald-100'
                            : 'hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <button
                            type="button"
                            className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                              isEntityExpanded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-100 text-stone-500'
                            }`}
                            aria-label={isEntityExpanded ? 'Collapse Sub-Node' : 'Expand Sub-Node'}
                          >
                            {isEntityExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </button>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                dir="rtl"
                                lang="ar"
                                className="font-arabic font-bold text-stone-900 text-base"
                              >
                                {entity.nameAr}
                              </span>
                              <span className="text-stone-400 text-xs font-semibold">
                                ({entity.nameEn})
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                            {entity.totalQuestions} Qs
                          </span>
                          <span className="text-xs text-stone-400 font-medium hidden sm:inline">
                            {entity.microFocuses.length} micro-themes
                          </span>
                        </div>
                      </div>

                      {/* ═══ LEVEL 5: MICRO-FOCUS CONCEPTS (Visible Only When Level 4 is Clicked) ═══ */}
                      {isEntityExpanded && (
                        <div className="p-3.5 sm:p-4 space-y-2.5 bg-stone-50/60 border-t border-stone-100">
                          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            Level 5: Micro Focus & Themes ({entity.microFocuses.length})
                          </div>

                          {entity.microFocuses.map((focus) => {
                            const focusKey = `${entityKey}-${focus.nameAr}`;
                            const isFocusExpanded = expandedMicroFocuses.has(focusKey);

                            return (
                              <div
                                key={focusKey}
                                className="bg-white border border-stone-200/90 rounded-lg overflow-hidden"
                              >
                                {/* ═══ LEVEL 5 ROW (Click to Open Level 6 Questions) ═══ */}
                                <div
                                  onClick={() => toggleMicroFocus(focusKey)}
                                  className={`p-3 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
                                    isFocusExpanded ? 'bg-teal-50/70 border-b border-teal-100' : 'hover:bg-stone-50/80'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                    <button
                                      type="button"
                                      className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                                        isFocusExpanded ? 'bg-teal-700 text-white' : 'bg-stone-100 text-stone-500'
                                      }`}
                                    >
                                      {isFocusExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                    </button>

                                    <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
                                      <span
                                        dir="rtl"
                                        lang="ar"
                                        className="font-arabic font-semibold text-stone-800 text-sm"
                                      >
                                        {focus.nameAr}
                                      </span>
                                      <span className="text-stone-400 text-xs font-medium">
                                        • {focus.nameEn}
                                      </span>
                                    </div>
                                  </div>

                                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded shrink-0">
                                    {focus.questions.length} Questions
                                  </span>
                                </div>

                                {/* ═══ LEVEL 6: QUESTIONS LIST (Visible Only When Level 5 is Clicked) ═══ */}
                                {isFocusExpanded && (
                                  <div className="p-3.5 space-y-3 bg-[#FCFAF8] border-t border-stone-100">
                                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between px-1">
                                      <span>Level 6: Official Questions ({focus.questions.length})</span>
                                      <span>Click Reveal to check answer</span>
                                    </div>

                                    {focus.questions.map((q, qIdx) => {
                                      const isAnswerRevealed = revealedAnswers.has(q.id);
                                      let optionsObj: Record<string, string> = {};
                                      try {
                                        if (typeof q.options_arabic === 'string') {
                                          optionsObj = JSON.parse(q.options_arabic);
                                        } else if (q.options_arabic && typeof q.options_arabic === 'object') {
                                          optionsObj = q.options_arabic;
                                        }
                                      } catch {
                                        optionsObj = {};
                                      }

                                      return (
                                        <div
                                          key={q.id}
                                          className="bg-white border border-stone-200/90 rounded-xl p-4 shadow-sm hover:border-stone-300 transition-colors"
                                        >
                                          {/* Question Header */}
                                          <div className="flex items-center justify-between gap-2 mb-2">
                                            <div className="flex items-center gap-2">
                                              <span className="px-2 py-0.5 rounded bg-stone-900 text-white font-bold text-[10px]">
                                                {q.exam_paper.year} Paper {q.exam_paper.paper_number}
                                              </span>
                                              <span className="text-xs font-semibold text-stone-500">
                                                Q{q.original_question_number || qIdx + 1}
                                              </span>
                                            </div>
                                          </div>

                                          {/* Question Arabic Text */}
                                          <p
                                            dir="rtl"
                                            lang="ar"
                                            className="font-arabic font-semibold text-stone-900 text-base leading-relaxed mb-3"
                                          >
                                            {q.question_arabic}
                                          </p>

                                          {/* Options Grid */}
                                          {Object.keys(optionsObj).length > 0 && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2.5">
                                              {Object.entries(optionsObj).map(([optKey, optVal]) => {
                                                const isCorrect = isAnswerRevealed && optKey === q.correct_answer;
                                                return (
                                                  <div
                                                    key={optKey}
                                                    dir="rtl"
                                                    lang="ar"
                                                    className={`flex items-start gap-2 p-2 rounded-lg text-xs font-arabic transition-all border ${
                                                      isCorrect
                                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold ring-1 ring-emerald-400'
                                                        : 'bg-stone-50/70 border-stone-200/70 text-stone-700'
                                                    }`}
                                                  >
                                                    <span
                                                      className={`w-5 h-5 rounded flex items-center justify-center font-sans font-bold text-[10px] shrink-0 ${
                                                        isCorrect
                                                          ? 'bg-emerald-600 text-white'
                                                          : 'bg-stone-200 text-stone-700'
                                                      }`}
                                                    >
                                                      {optKey}
                                                    </span>
                                                    <span className="flex-1 leading-snug pt-0.5">{String(optVal)}</span>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          )}

                                          {/* Answer Reveal Toggle */}
                                          <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs mt-3">
                                            <button
                                              type="button"
                                              onClick={() => toggleAnswer(q.id)}
                                              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-semibold py-1 px-2.5 rounded-lg hover:bg-stone-100 transition-colors"
                                            >
                                              {isAnswerRevealed ? (
                                                <>
                                                  <EyeOff size={13} />
                                                  Hide Answer
                                                </>
                                              ) : (
                                                <>
                                                  <Eye size={13} />
                                                  Reveal Answer
                                                </>
                                              )}
                                            </button>

                                            {isAnswerRevealed && (
                                              <div className="flex items-center gap-1 text-emerald-700 font-bold">
                                                <CheckCircle2 size={14} />
                                                Correct: Option ({q.correct_answer})
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
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
            )}
          </div>
        );
      })}

      {nodes.length === 0 && (
        <div className="bg-white border border-stone-200 border-dashed rounded-2xl p-12 text-center text-stone-500 font-medium">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          No learning nodes found for this topic.
        </div>
      )}
    </div>
  );
}
