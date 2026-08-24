'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Edit3, ArrowUpRight } from 'lucide-react';
import { BrainSparkIcon } from './MemoryIcons';

interface QuestionMemoryStripProps {
  questionId: string;
  onOpenModal: () => void;
  refreshTrigger?: any;
}

export default function QuestionMemoryStrip({
  questionId,
  onOpenModal,
  refreshTrigger,
}: QuestionMemoryStripProps) {
  const [topMemory, setTopMemory] = useState<any | null>(null);
  const [connectedCount, setConnectedCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    async function loadSummary() {
      if (!questionId) return;
      try {
        const [memRes, connRes] = await Promise.all([
          fetch(`/api/memories?questionId=${questionId}`),
          fetch(`/api/memories/connections?questionId=${questionId}`),
        ]);

        if (memRes.ok && isMounted) {
          const json = await memRes.json();
          if (json.data && json.data.length > 0) {
            setTopMemory(json.data[0]);
          } else {
            setTopMemory(null);
          }
        }

        if (connRes.ok && isMounted) {
          const json = await connRes.json();
          setConnectedCount(json.data?.length || 0);
        }
      } catch (e) {
        // silent fail for guests
      }
    }

    loadSummary();
    return () => {
      isMounted = false;
    };
  }, [questionId, refreshTrigger]);

  if (!topMemory && connectedCount === 0) return null;

  return (
    <div
      onClick={onOpenModal}
      className="mt-3.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-50/90 via-emerald-50/50 to-stone-50 border border-emerald-200/80 shadow-sm cursor-pointer hover:border-emerald-300 transition-all flex items-start justify-between gap-3 group"
    >
      <div className="flex items-start gap-2.5 min-w-0 flex-1">
        <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
          <BrainSparkIcon size={14} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800">
              ✓ My Memory
            </span>
            {topMemory && (
              <span className="text-[10px] font-bold text-stone-500 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-100">
                {topMemory.type}
              </span>
            )}
            {connectedCount > 0 && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                {connectedCount} Question{connectedCount > 1 ? 's' : ''} Linked
              </span>
            )}
          </div>
          {topMemory && (
            <div
              dir="auto"
              className="font-arabic font-bold text-stone-900 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2"
            >
              {topMemory.content}
            </div>
          )}
        </div>
      </div>

      <div className="text-stone-400 group-hover:text-emerald-700 transition-colors p-1 shrink-0">
        <Edit3 size={15} />
      </div>
    </div>
  );
}
