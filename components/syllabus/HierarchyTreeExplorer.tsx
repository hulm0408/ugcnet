'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown, ChevronRight, PlayCircle, BookOpen,
  CheckCircle2, Eye, EyeOff, Sparkles, Layers, User
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

export type SubNodeEntity = {
  nameAr: string;
  nameEn: string;
  microFocuses?: string[];
  questions: QuestionItem[];
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
  // Store expanded Node IDs
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(nodes.length > 0 ? [nodes[0].id] : [])
  );

  // Store expanded Entity Keys e.g. "nodeId-entityName"
  const [expandedEntities, setExpandedEntities] = useState<Set<string>>(new Set());

  // Store revealed answers for question previews
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  };

  const toggleEntity = (entityKey: string) => {
    setExpandedEntities((prev) => {
      const next = new Set(prev);
      if (next.has(entityKey)) next.delete(entityKey);
      else next.add(entityKey);
      return next;
    });
  };

  const toggleAnswer = (questionId: string) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {nodes.map((node, nodeIndex) => {
        const isNodeExpanded = expandedNodes.has(node.id);

        return (
          <div
            key={node.id}
            className="bg-white border border-stone-200/80 rounded-2xl shadow-sm transition-all duration-200 overflow-hidden"
          >
            {/* ═══ LEVEL 3: NODE HEADER ═══ */}
            <div
              onClick={() => toggleNode(node.id)}
              className={`p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between cursor-pointer select-none transition-colors ${
                isNodeExpanded ? 'bg-stone-50/70 border-b border-stone-200/70' : 'hover:bg-stone-50/40'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <button
                  type="button"
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                    isNodeExpanded
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                  aria-label={isNodeExpanded ? 'Collapse Node' : 'Expand Node'}
                >
                  {isNodeExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                <div className="flex-1 min-w-0">
                  <div
                    dir="rtl"
                    lang="ar"
                    className="font-arabic font-bold text-stone-900 text-xl leading-snug mb-1"
                  >
                    {node.nameAr}
                  </div>
                  <div className="text-stone-500 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <span>{node.nameEn}</span>
                    <span className="text-stone-300">•</span>
                    <span className="text-stone-400 font-semibold lowercase">
                      {node.entities.length} sub-nodes
                    </span>
                  </div>
                </div>
              </div>

              {/* Node Stats & CTAs */}
              <div
                className="shrink-0 flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3 py-1 bg-stone-100 rounded-lg text-center">
                  <span className="text-stone-900 font-bold text-sm">{node.totalQuestions}</span>
                  <span className="text-stone-400 text-[10px] uppercase font-bold ml-1">Qs</span>
                </div>

                <Link
                  href={`/practice?unit=${unitNumber}&topic=${topicSlug}&subtopic=${node.slug}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    node.totalQuestions > 0
                      ? 'bg-[#107A53] hover:bg-[#0C6240] text-white hover:text-white shadow-sm hover:shadow-md active:scale-95'
                      : 'bg-stone-100 text-stone-400 pointer-events-none'
                  }`}
                >
                  <PlayCircle size={14} />
                  Practice Node
                </Link>
              </div>
            </div>

            {/* ═══ LEVEL 4: SUB-NODES / ENTITIES TREE (When Expanded) ═══ */}
            {isNodeExpanded && (
              <div className="p-4 sm:p-6 space-y-3 bg-[#FCFAF8]/60">
                <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest px-2 mb-1 flex items-center gap-2">
                  <Layers size={13} className="text-primary" />
                  Sub-Nodes & Targeted Entities ({node.entities.length})
                </div>

                {node.entities.map((entity, entityIdx) => {
                  const entityKey = `${node.id}-${entity.nameAr}`;
                  const isEntityExpanded = expandedEntities.has(entityKey);

                  return (
                    <div
                      key={entityKey}
                      className="bg-white border border-stone-200/90 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                    >
                      {/* Sub-Node Header */}
                      <div
                        onClick={() => toggleEntity(entityKey)}
                        className={`p-4 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
                          isEntityExpanded ? 'bg-primary-surface/40 border-b border-primary/10' : 'hover:bg-stone-50/70'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-100">
                            {entityIdx + 1}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                dir="rtl"
                                lang="ar"
                                className="font-arabic font-bold text-stone-900 text-base"
                              >
                                {entity.nameAr}
                              </span>
                              <span className="text-stone-400 text-xs font-medium">
                                ({entity.nameEn})
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                            {entity.questions.length} Qs
                          </span>

                          <button
                            type="button"
                            className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
                            aria-label={isEntityExpanded ? 'Collapse' : 'Expand Questions'}
                          >
                            {isEntityExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* ═══ LEVEL 5 & 6: QUESTIONS PREVIEW (When Sub-Node Expanded) ═══ */}
                      {isEntityExpanded && (
                        <div className="p-4 space-y-3 bg-stone-50/50 border-t border-stone-100">
                          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between">
                            <span>Questions categorized under {entity.nameEn}</span>
                            <span>Click eye icon to reveal answer</span>
                          </div>

                          <div className="space-y-3">
                            {entity.questions.map((q, qIndex) => {
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
                                  className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:border-stone-300 transition-colors"
                                >
                                  {/* Question Top Metadata */}
                                  <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
                                    <div className="flex items-center gap-2">
                                      <span className="px-2 py-0.5 rounded bg-stone-900 text-white font-bold text-[10px]">
                                        {q.exam_paper.year} Paper {q.exam_paper.paper_number}
                                      </span>
                                      <span className="text-[11px] font-semibold text-stone-500">
                                        Q{q.original_question_number || qIndex + 1}
                                      </span>
                                    </div>

                                    {q.question_micro_focus_arabic && (
                                      <span
                                        dir="rtl"
                                        lang="ar"
                                        className="font-arabic text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/60 truncate max-w-xs"
                                        title={q.question_micro_focus_english || undefined}
                                      >
                                        {q.question_micro_focus_arabic}
                                      </span>
                                    )}
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

                                  {/* Action / Answer Reveal Footer */}
                                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
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
