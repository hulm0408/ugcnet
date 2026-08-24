'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import {
  BrainSparkIcon,
  KnowledgeGraphIcon,
  SpacedRepetitionIcon,
  LinkConnectionIcon,
} from '@/components/memory/MemoryIcons';
import {
  Search,
  Filter,
  Trash2,
  Edit3,
  BookOpen,
  ArrowRight,
  Plus,
  Clock,
  Layers,
  ChevronRight,
  RefreshCw,
  Trophy,
} from 'lucide-react';
import { MEMORY_TYPES } from '@/lib/memoryEngine';
import KnowledgeGraphView from '@/components/memory/KnowledgeGraphView';
import MemoryConnectionModal from '@/components/memory/MemoryConnectionModal';

function MemoriesContent() {
  const [activeTab, setActiveTab] = useState<'memories' | 'graph' | 'queue'>('memories');
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [memories, setMemories] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [queueMeta, setQueueMeta] = useState<{ dueCount: number; totalQueueCount: number }>({
    dueCount: 0,
    totalQueueCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit / view modal
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [memRes, connRes, revRes] = await Promise.all([
        fetch(`/api/memories?type=${selectedType}&q=${encodeURIComponent(search)}`),
        fetch('/api/memories/connections'),
        fetch('/api/memories/review'),
      ]);

      if (memRes.status === 401) {
        setError('Please log in to view your personal memories.');
        return;
      }

      if (memRes.ok) {
        const json = await memRes.json();
        setMemories(json.data || []);
      }

      if (connRes.ok) {
        const json = await connRes.json();
        setConnections(json.data || []);
      }

      if (revRes.ok) {
        const json = await revRes.json();
        setQueueMeta(json.meta || { dueCount: 0, totalQueueCount: 0 });
      }
    } catch (e: any) {
      setError(e.message || 'Failed to load memories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedType, search]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this memory connection?')) return;
    try {
      const res = await fetch(`/api/memories?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMemories((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete memory:', e);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-emerald-50/30 via-[#FCFAF8] to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-black rounded-full uppercase tracking-wider mb-2">
              <BrainSparkIcon size={14} /> Personal Learning Engine
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              My Memory Connections
            </h1>
            <p className="text-stone-500 text-sm sm:text-base mt-1 max-w-2xl">
              Your private knowledge network, memory tricks, mnemonics, and spaced review queue.
            </p>
          </div>

          {/* Quick Review Action */}
          <div className="flex items-center gap-3">
            <Link
              href="/memories/review"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow active:scale-95"
            >
              <SpacedRepetitionIcon size={16} />
              Review Due Memories ({queueMeta.dueCount})
            </Link>
          </div>
        </div>

        {/* Top Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('memories')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
              activeTab === 'memories'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <BrainSparkIcon size={16} />
            All Memories ({memories.length})
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
              activeTab === 'graph'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <KnowledgeGraphIcon size={16} />
            Knowledge Graph ({connections.length})
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
              activeTab === 'queue'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <SpacedRepetitionIcon size={16} />
            Spaced Queue ({queueMeta.totalQueueCount})
          </button>
        </div>

        {/* ── TAB 1: ALL MEMORIES ── */}
        {activeTab === 'memories' && (
          <div className="space-y-6">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3.5 top-3 text-stone-400" />
                <input
                  type="text"
                  dir="auto"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search in English or Arabic (diacritic-insensitive)..."
                  className="w-full bg-white border border-stone-200/90 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm"
                />
              </div>

              {/* Type Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                <button
                  onClick={() => setSelectedType('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedType === 'ALL'
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  All Types
                </button>
                {MEMORY_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      selectedType === t.id
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Error / Guest */}
            {error && (
              <div className="bg-white rounded-3xl p-8 border border-stone-200 text-center space-y-4 shadow-sm">
                <p className="text-stone-600 font-medium text-sm">{error}</p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 transition-colors"
                >
                  Log In to Access
                </Link>
              </div>
            )}

            {/* Loading */}
            {loading && !error && (
              <div className="py-16 text-center space-y-3">
                <div className="w-10 h-10 border-4 border-stone-200 border-t-emerald-700 rounded-full animate-spin mx-auto" />
                <p className="text-stone-400 text-xs font-medium">Loading your memories...</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && memories.length === 0 && (
              <div className="bg-white rounded-3xl p-10 border border-stone-200 text-center max-w-md mx-auto space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-100">
                  <BrainSparkIcon size={28} />
                </div>
                <h3 className="font-extrabold text-stone-900 text-lg">No Memories Found</h3>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                  You haven&apos;t created any memory connections matching this filter yet. When practicing questions, click <span className="font-bold text-stone-800">&quot;Create Connection&quot;</span> to add your personal mental shortcuts.
                </p>
                <Link
                  href="/practice"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm"
                >
                  <BookOpen size={16} /> Browse Questions
                </Link>
              </div>
            )}

            {/* Memory Cards Grid */}
            {!loading && !error && memories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {memories.map((m) => {
                  const typeMeta = MEMORY_TYPES.find((t) => t.id === m.type);
                  return (
                    <div
                      key={m.id}
                      className="bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-3">
                        {/* Header metadata */}
                        <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                              {typeMeta?.label || m.type}
                            </span>
                            {m.question?.exam_paper && (
                              <span className="text-[11px] font-bold text-stone-400">
                                {m.question.exam_paper.year} P{m.question.exam_paper.paper_number}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setEditingQuestion(m.question)}
                              className="p-1 text-stone-400 hover:text-emerald-700 rounded-lg hover:bg-stone-50 transition-colors"
                              title="Edit connection"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(m.id)}
                              className="p-1 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                              title="Delete connection"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Memory Content */}
                        <div
                          dir="auto"
                          className="font-arabic font-extrabold text-stone-900 text-base sm:text-lg leading-relaxed whitespace-pre-wrap"
                        >
                          {m.content}
                        </div>

                        {/* Question Preview */}
                        {m.question && (
                          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 space-y-1">
                            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                              Target Question (Q{m.question.original_question_number || '•'}):
                            </div>
                            <div
                              dir="rtl"
                              lang="ar"
                              className="font-arabic text-xs sm:text-sm font-bold text-stone-800 leading-relaxed text-right line-clamp-2"
                            >
                              {m.question.question_arabic}
                            </div>
                          </div>
                        )}

                        {/* Keywords */}
                        {Array.isArray(m.keywords) && m.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {m.keywords.map((kw: string, i: number) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-medium"
                              >
                                #{kw}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-2 flex items-center justify-between border-t border-stone-100 text-xs">
                        <Link
                          href={`/practice?questionId=${m.question?.id}`}
                          className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 transition-colors"
                        >
                          Practice This Question <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: KNOWLEDGE GRAPH ── */}
        {activeTab === 'graph' && (
          <KnowledgeGraphView connections={connections} memories={memories} />
        )}

        {/* ── TAB 3: SPACED QUEUE ── */}
        {activeTab === 'queue' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                  <SpacedRepetitionIcon size={24} />
                </div>
                <div>
                  <div className="text-2xl font-black text-stone-900">{queueMeta.dueCount}</div>
                  <div className="text-xs font-bold text-stone-500">Due for Review Today</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-black">
                  <BrainSparkIcon size={24} />
                </div>
                <div>
                  <div className="text-2xl font-black text-stone-900">{queueMeta.totalQueueCount}</div>
                  <div className="text-xs font-bold text-stone-500">Total in Spaced Queue</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                  <KnowledgeGraphIcon size={24} />
                </div>
                <div>
                  <div className="text-2xl font-black text-stone-900">{connections.length}</div>
                  <div className="text-xs font-bold text-stone-500">Knowledge Connections</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm text-center space-y-4">
              <h3 className="text-lg font-black text-stone-900">
                Spaced Repetition Schedule
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                The engine uses deterministic intervals (1d → 3d → 7d → 14d → 30d → 60d) based on your mental recall performance to ensure maximum retention for the NET/JRF examination.
              </p>
              <div className="pt-2">
                <Link
                  href="/memories/review"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
                >
                  <SpacedRepetitionIcon size={16} /> Start Spaced Review Session
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingQuestion && (
          <MemoryConnectionModal
            isOpen={true}
            onClose={() => {
              setEditingQuestion(null);
              fetchData();
            }}
            question={editingQuestion}
            onMemorySaved={() => fetchData()}
          />
        )}

      </div>
    </div>
  );
}

export default function MemoriesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-[70vh] bg-[#FCFAF8]">
          <div className="w-10 h-10 border-4 border-stone-200 border-t-emerald-700 rounded-full animate-spin" />
        </div>
      }
    >
      <MemoriesContent />
    </Suspense>
  );
}
