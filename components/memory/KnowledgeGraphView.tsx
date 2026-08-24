'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  KnowledgeGraphIcon,
  BrainSparkIcon,
  LinkConnectionIcon,
} from './MemoryIcons';
import { Sparkles, ArrowRight, BookOpen, Layers, X } from 'lucide-react';
import { RELATIONSHIP_TYPES } from '@/lib/memoryEngine';

export interface GraphNode {
  id: string;
  label: string;
  arabicText?: string;
  type: 'question' | 'author' | 'work' | 'concept';
  subLabel?: string;
  unitNumber?: number;
  year?: number;
}

export interface GraphLink {
  id: string;
  sourceId: string;
  targetId: string;
  relationshipType: string;
  note?: string | null;
}

interface KnowledgeGraphViewProps {
  connections: any[];
  memories?: any[];
}

export default function KnowledgeGraphView({ connections, memories = [] }: KnowledgeGraphViewProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');

  // Build unique nodes and links from connections
  const { nodes, links } = useMemo(() => {
    const nodeMap = new Map<string, GraphNode>();
    const linkList: GraphLink[] = [];

    // Add nodes & links from connections
    for (const c of connections) {
      if (filterType !== 'ALL' && c.relationship_type !== filterType) continue;

      const srcQ = c.source_question;
      const tgtQ = c.target_question;

      if (srcQ) {
        if (!nodeMap.has(srcQ.id)) {
          nodeMap.set(srcQ.id, {
            id: srcQ.id,
            label: srcQ.original_question_number ? `Q${srcQ.original_question_number}` : 'Q',
            arabicText: srcQ.question_arabic,
            type: 'question',
            subLabel: srcQ.specific_entity_name_arabic || srcQ.unit?.name_english || 'Question',
            unitNumber: srcQ.unit?.unit_number,
            year: srcQ.exam_paper?.year,
          });
        }
      }

      if (tgtQ) {
        if (!nodeMap.has(tgtQ.id)) {
          nodeMap.set(tgtQ.id, {
            id: tgtQ.id,
            label: tgtQ.original_question_number ? `Q${tgtQ.original_question_number}` : 'Q',
            arabicText: tgtQ.question_arabic,
            type: 'question',
            subLabel: tgtQ.specific_entity_name_arabic || tgtQ.unit?.name_english || 'Question',
            unitNumber: tgtQ.unit?.unit_number,
            year: tgtQ.exam_paper?.year,
          });
        }
      }

      if (srcQ && tgtQ) {
        linkList.push({
          id: c.id,
          sourceId: srcQ.id,
          targetId: tgtQ.id,
          relationshipType: c.relationship_type,
          note: c.note,
        });
      }
    }

    // Also include questions that have standalone memories if not already linked
    for (const m of memories) {
      if (m.question && !nodeMap.has(m.question.id)) {
        nodeMap.set(m.question.id, {
          id: m.question.id,
          label: m.question.original_question_number ? `Q${m.question.original_question_number}` : 'Q',
          arabicText: m.question.question_arabic,
          type: 'question',
          subLabel: m.type,
          unitNumber: m.question.unit?.unit_number,
          year: m.question.exam_paper?.year,
        });
      }
    }

    return {
      nodes: Array.from(nodeMap.values()),
      links: linkList,
    };
  }, [connections, memories, filterType]);

  // Compute 2D coordinates for graph layout
  const layout = useMemo(() => {
    const total = nodes.length;
    if (total === 0) return { positions: new Map<string, { x: number; y: number }>(), width: 800, height: 500 };

    const width = 800;
    const height = Math.max(500, Math.min(800, total * 65));
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.38;

    const positions = new Map<string, { x: number; y: number }>();

    nodes.forEach((node, i) => {
      // Golden angle distribution for pleasant spacing
      const angle = i * ((2 * Math.PI) / total) + 0.2;
      const r = total <= 4 ? radius * 0.6 : radius * (0.65 + (i % 2) * 0.35);
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      positions.set(node.id, { x, y });
    });

    return { positions, width, height };
  }, [nodes]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const selectedNodeLinks = links.filter(
    (l) => l.sourceId === selectedNodeId || l.targetId === selectedNodeId
  );

  if (nodes.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-100">
          <KnowledgeGraphIcon size={28} />
        </div>
        <h3 className="text-stone-900 font-extrabold text-lg">Your Knowledge Graph is Empty</h3>
        <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
          As you solve questions, use the <span className="font-bold text-stone-800">&quot;Connect Two Questions&quot;</span> button on question cards to link authors, texts, theories, and concepts into your personal mental map.
        </p>
        <Link
          href="/practice"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm"
        >
          <BookOpen size={16} /> Start Practice & Connect
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col">
      {/* Graph Toolbar */}
      <div className="px-5 sm:px-7 py-3.5 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            <KnowledgeGraphIcon size={18} />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-extrabold text-stone-900 leading-tight">
              Personal Knowledge Graph
            </div>
            <div className="text-[11px] text-stone-500 font-medium">
              {nodes.length} Nodes • {links.length} Active Connections
            </div>
          </div>
        </div>

        {/* Filter by relationship */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              filterType === 'ALL'
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            All Connections
          </button>
          {RELATIONSHIP_TYPES.slice(0, 3).map((rt) => (
            <button
              key={rt.id}
              onClick={() => setFilterType(rt.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterType === rt.id
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {rt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <div className="relative overflow-auto bg-[#FCFAF8] p-4 sm:p-6 flex items-center justify-center min-h-[480px]">
        <svg
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          className="w-full max-w-4xl h-auto select-none"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="22"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#107A53" opacity="0.8" />
            </marker>
          </defs>

          {/* Render Links / Edges */}
          {links.map((link) => {
            const srcPos = layout.positions.get(link.sourceId);
            const tgtPos = layout.positions.get(link.targetId);
            if (!srcPos || !tgtPos) return null;

            const isHighlighted =
              selectedNodeId === link.sourceId || selectedNodeId === link.targetId;

            const midX = (srcPos.x + tgtPos.x) / 2;
            const midY = (srcPos.y + tgtPos.y) / 2;

            return (
              <g key={link.id} className="transition-all duration-300">
                <line
                  x1={srcPos.x}
                  y1={srcPos.y}
                  x2={tgtPos.x}
                  y2={tgtPos.y}
                  stroke={isHighlighted ? '#107A53' : '#D1D5DB'}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={link.relationshipType === 'CONTRAST' ? '4,4' : 'none'}
                  markerEnd="url(#arrow)"
                />
                {/* Midpoint relationship badge */}
                <rect
                  x={midX - 35}
                  y={midY - 9}
                  width="70"
                  height="18"
                  rx="9"
                  fill={isHighlighted ? '#107A53' : '#FFFFFF'}
                  stroke={isHighlighted ? '#107A53' : '#E5E7EB'}
                  strokeWidth="1"
                />
                <text
                  x={midX}
                  y={midY + 3.5}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="bold"
                  fill={isHighlighted ? '#FFFFFF' : '#4B5563'}
                >
                  {link.relationshipType.replace('_', ' ').slice(0, 11)}
                </text>
              </g>
            );
          })}

          {/* Render Nodes */}
          {nodes.map((node) => {
            const pos = layout.positions.get(node.id);
            if (!pos) return null;

            const isSelected = selectedNodeId === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => setSelectedNodeId(isSelected ? null : node.id)}
                className="cursor-pointer transition-all duration-200"
              >
                {/* Node Halo */}
                {isSelected && (
                  <circle
                    r="28"
                    fill="#107A53"
                    opacity="0.2"
                    className="animate-pulse"
                  />
                )}

                {/* Outer Node Circle */}
                <circle
                  r="20"
                  fill={isSelected ? '#107A53' : '#FFFFFF'}
                  stroke={isSelected ? '#0C6240' : '#107A53'}
                  strokeWidth="2.5"
                  className="shadow-md hover:scale-110 transition-transform"
                />

                {/* Label inside node */}
                <text
                  textAnchor="middle"
                  dy="4"
                  fontSize="10"
                  fontWeight="900"
                  fill={isSelected ? '#FFFFFF' : '#107A53'}
                >
                  {node.label}
                </text>

                {/* Subtitle text beneath node */}
                <text
                  textAnchor="middle"
                  dy="34"
                  fontSize="9"
                  fontWeight="bold"
                  fill="#374151"
                  className="bg-white px-1"
                >
                  {node.subLabel?.slice(0, 16)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="p-5 sm:p-6 bg-white border-t border-stone-200 animate-slide-up flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                {selectedNode.label} {selectedNode.year ? `• Year ${selectedNode.year}` : ''}
              </span>
              {selectedNode.unitNumber && (
                <span className="text-xs font-bold text-stone-500">
                  Unit {selectedNode.unitNumber}
                </span>
              )}
            </div>

            <div
              dir="rtl"
              lang="ar"
              className="font-arabic font-bold text-stone-900 text-base sm:text-lg leading-relaxed text-right"
            >
              {selectedNode.arabicText}
            </div>

            {selectedNodeLinks.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="text-xs font-bold text-stone-400">Connected:</span>
                {selectedNodeLinks.map((l) => (
                  <span
                    key={l.id}
                    className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-xs font-medium"
                  >
                    {l.relationshipType} {l.note ? `(${l.note})` : ''}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <Link
              href={`/practice?questionId=${selectedNode.id}`}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <BookOpen size={14} /> Practice Question
            </Link>
            <button
              onClick={() => setSelectedNodeId(null)}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
