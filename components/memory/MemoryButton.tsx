'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, Sparkles, Check, Brain } from 'lucide-react';
import { BrainSparkIcon, SpacedRepetitionIcon } from './MemoryIcons';

interface MemoryButtonProps {
  questionId: string;
  onOpenMemoryModal: () => void;
  className?: string;
}

export default function MemoryButton({
  questionId,
  onOpenMemoryModal,
  className = '',
}: MemoryButtonProps) {
  const [isRemembered, setIsRemembered] = useState(false);
  const [memoryCount, setMemoryCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch memory status for this question
  useEffect(() => {
    let isMounted = true;
    async function checkStatus() {
      if (!questionId) return;
      try {
        const [remRes, memRes] = await Promise.all([
          fetch(`/api/memories/remember?questionId=${questionId}`),
          fetch(`/api/memories?questionId=${questionId}`),
        ]);

        if (remRes.ok && isMounted) {
          const json = await remRes.json();
          setIsRemembered(!!json.isRemembered);
        }

        if (memRes.ok && isMounted) {
          const json = await memRes.json();
          setMemoryCount(json.data?.length || 0);
        }
      } catch (e) {
        // guest or offline
      }
    }

    checkStatus();
    return () => {
      isMounted = false;
    };
  }, [questionId]);

  const handleToggleRemember = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isRemembered;
    setIsRemembered(nextState); // Optimistic UI update

    try {
      setLoading(true);
      const res = await fetch('/api/memories/remember', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, remember: nextState }),
      });

      if (!res.ok) {
        // Rollback
        setIsRemembered(!nextState);
      }
    } catch (e) {
      setIsRemembered(!nextState);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* ── 1. "Remember" Button (Spaced Queue) ── */}
      <button
        type="button"
        onClick={handleToggleRemember}
        disabled={loading}
        title={isRemembered ? 'Saved to Spaced Memory Queue' : 'Add to Spaced Memory Queue'}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
          isRemembered
            ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm'
            : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50'
        }`}
      >
        <SpacedRepetitionIcon
          size={15}
          className={isRemembered ? 'text-emerald-700' : 'text-stone-400'}
        />
        <span>{isRemembered ? 'Remembered' : 'Remember'}</span>
      </button>

      {/* ── 2. "Create Connection" / "My Memory" Button ── */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpenMemoryModal();
        }}
        title="Open Personal Memory Connections Panel"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
          memoryCount > 0
            ? 'border-stone-900 bg-stone-900 text-white shadow-sm hover:bg-stone-800'
            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50'
        }`}
      >
        <BrainSparkIcon
          size={15}
          className={memoryCount > 0 ? 'text-emerald-400' : 'text-stone-500'}
        />
        <span>{memoryCount > 0 ? `My Memory (${memoryCount})` : 'Create Connection'}</span>
      </button>
    </div>
  );
}
