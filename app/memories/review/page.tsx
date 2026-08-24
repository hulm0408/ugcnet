'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import {
  BrainSparkIcon,
  SpacedRepetitionIcon,
} from '@/components/memory/MemoryIcons';
import { ArrowLeft, RefreshCw, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import MemoryReviewEngine from '@/components/memory/MemoryReviewEngine';

function ReviewContent() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [includeAll, setIncludeAll] = useState(false);

  const loadReviewQueue = async (all = false) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/memories/review?all=${all}`);
      if (res.status === 401) {
        setError('Please log in to review your memory queue.');
        return;
      }
      if (!res.ok) {
        throw new Error('Failed to load review items');
      }
      const json = await res.json();
      setItems(json.data || []);
    } catch (e: any) {
      setError(e.message || 'Unable to load memory review queue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviewQueue(includeAll);
  }, [includeAll]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] bg-[#FCFAF8] p-6">
        <div className="bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-sm space-y-4">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-emerald-700 rounded-full animate-spin mx-auto" />
          <h3 className="font-bold text-stone-900 text-base sm:text-lg">
            Preparing Your Memory Review...
          </h3>
          <p className="text-stone-500 text-xs sm:text-sm font-medium">
            Fetching your personal tricks & recall anchors
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[70vh] bg-[#FCFAF8] p-6">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8 sm:p-10 max-w-md w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <RefreshCw size={24} />
          </div>
          <h2 className="text-stone-900 font-bold text-lg">Unable to Load Memory Review</h2>
          <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">{error}</p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-emerald-800 transition-colors shadow-sm"
            >
              Log In
            </Link>
            <Link
              href="/memories"
              className="px-5 py-2.5 bg-stone-100 text-stone-700 text-xs sm:text-sm font-bold rounded-xl hover:bg-stone-200 transition-colors"
            >
              Back to Hub
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If no items are due today
  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[70vh] bg-[#FCFAF8] p-6">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8 sm:p-12 max-w-md w-full text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <h2 className="text-stone-900 font-extrabold text-xl">All Caught Up!</h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
              You have no memory connections due for review at this moment. You can still practice all queued memories anytime.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            {!includeAll && (
              <button
                type="button"
                onClick={() => setIncludeAll(true)}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Sparkles size={16} /> Review All Saved Memories ({items.length})
              </button>
            )}
            <Link
              href="/memories"
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs sm:text-sm rounded-xl transition-colors text-center"
            >
              Back to Memory Hub
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-emerald-50/20 via-[#FCFAF8] to-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <Link
          href="/memories"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-800 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Memory Hub
        </Link>
      </div>

      <MemoryReviewEngine items={items} onFinish={() => loadReviewQueue(includeAll)} />
    </div>
  );
}

export default function MemoryReviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-[70vh] bg-[#FCFAF8]">
          <div className="w-10 h-10 border-4 border-stone-200 border-t-emerald-700 rounded-full animate-spin" />
        </div>
      }
    >
      <ReviewContent />
    </Suspense>
  );
}
