'use client';

import React, { useState, useEffect, useTransition } from 'react';
import {
  X,
  Zap,
  Key,
  BookOpen,
  Lightbulb,
  Tag,
  FileText,
  Eye,
  Link2,
  Check,
  Trash2,
  Plus,
  ArrowRight,
  Search,
  ChevronDown,
  HelpCircle,
  Clock,
} from 'lucide-react';
import {
  MEMORY_TYPES,
  RELATIONSHIP_TYPES,
  MemoryType,
  RelationshipType,
  generateSmartMemoryPrompts,
} from '@/lib/memoryEngine';
import { BrainSparkIcon, LinkConnectionIcon } from './MemoryIcons';

interface MemoryItem {
  id: string;
  type: string;
  content: string;
  keywords?: string[] | null;
  created_at: string;
  updated_at: string;
}

interface QuestionConnectionItem {
  id: string;
  relationship_type: string;
  note?: string | null;
  target_question: {
    id: string;
    original_question_number: string;
    question_arabic: string;
    question_english?: string | null;
  };
}

interface MemoryConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: {
    id: string;
    original_question_number?: string;
    question_arabic: string;
    question_english?: string | null;
    question_micro_focus_arabic?: string | null;
    specific_entity_name_arabic?: string | null;
    broad_topic?: { name_arabic?: string; name_english?: string } | null;
    subtopic?: { name_arabic?: string; name_english?: string } | null;
    unit?: { unit_number?: number; name_english?: string; name_arabic?: string } | null;
  };
  onMemorySaved?: (memory: any) => void;
}

export default function MemoryConnectionModal({
  isOpen,
  onClose,
  question,
  onMemorySaved,
}: MemoryConnectionModalProps) {
  // Tabs: 'create' | 'connect_question' | 'existing'
  const [activeTab, setActiveTab] = useState<'create' | 'connect_question'>('create');
  
  // Quick trick state
  const [quickTrick, setQuickTrick] = useState('');
  const [quickSaving, setQuickSaving] = useState(false);
  const [quickSavedSuccess, setQuickSavedSuccess] = useState(false);

  // Deep connection state
  const [selectedType, setSelectedType] = useState<MemoryType>('TRICK');
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState('');
  const [showAdvancedTypes, setShowAdvancedTypes] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Existing memories & connections for this question
  const [savedMemories, setSavedMemories] = useState<MemoryItem[]>([]);
  const [savedConnections, setSavedConnections] = useState<QuestionConnectionItem[]>([]);
  const [loadingExisting, setLoadingExisting] = useState(false);

  // Question linking state
  const [targetSearch, setTargetSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedTargetQ, setSelectedTargetQ] = useState<any | null>(null);
  const [relationType, setRelationType] = useState<RelationshipType>('RELATED_CONCEPT');
  const [relationNote, setRelationNote] = useState('');
  const [linkingQuestion, setLinkingQuestion] = useState(false);

  // Smart prompts
  const smartPrompts = generateSmartMemoryPrompts(question);

  // Fetch existing memories when opened
  useEffect(() => {
    if (!isOpen || !question?.id) return;

    let isMounted = true;
    async function loadData() {
      try {
        setLoadingExisting(true);
        const [memRes, connRes] = await Promise.all([
          fetch(`/api/memories?questionId=${question.id}`),
          fetch(`/api/memories/connections?questionId=${question.id}`),
        ]);

        if (memRes.ok) {
          const json = await memRes.json();
          if (isMounted) setSavedMemories(json.data || []);
        }
        if (connRes.ok) {
          const json = await connRes.json();
          if (isMounted) setSavedConnections(json.data || []);
        }
      } catch (e) {
        console.error('Failed to load memory data:', e);
      } finally {
        if (isMounted) setLoadingExisting(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [isOpen, question?.id]);

  // Search questions to link
  useEffect(() => {
    if (activeTab !== 'connect_question') return;

    const timer = setTimeout(async () => {
      try {
        setSearching(true);
        const res = await fetch(
          `/api/memories/search-questions?q=${encodeURIComponent(targetSearch)}&excludeId=${question.id}&limit=8`
        );
        if (res.ok) {
          const json = await res.json();
          setSearchResults(json.data || []);
        }
      } catch (e) {
        console.error('Failed to search questions:', e);
      } finally {
        setSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [targetSearch, activeTab, question.id]);

  // Instant Quick Save (One-Line Trick)
  const handleQuickSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!quickTrick.trim()) return;

    setQuickSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          type: 'TRICK',
          content: quickTrick.trim(),
        }),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'Failed to save trick');
      }

      const json = await res.json();
      setQuickSavedSuccess(true);
      setSavedMemories((prev) => {
        const filtered = prev.filter((m) => m.type !== 'TRICK');
        return [json.memory, ...filtered];
      });
      if (onMemorySaved) onMemorySaved(json.memory);

      setTimeout(() => {
        setQuickSavedSuccess(false);
      }, 2500);
    } catch (err: any) {
      setError(err.message || 'Could not save memory. Please retry.');
    } finally {
      setQuickSaving(false);
    }
  };

  // Save Full Connection
  const handleSaveConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Please write your memory connection before saving.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const kwList = keywords.split(',').map((k) => k.trim()).filter(Boolean);
      const res = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          type: selectedType,
          content: content.trim(),
          keywords: kwList,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'Failed to save connection');
      }

      const json = await res.json();
      setSaveSuccess(true);
      setContent('');
      setKeywords('');
      setSavedMemories((prev) => {
        const filtered = prev.filter((m) => m.type !== selectedType);
        return [json.memory, ...filtered];
      });
      if (onMemorySaved) onMemorySaved(json.memory);

      setTimeout(() => {
        setSaveSuccess(false);
      }, 2500);
    } catch (err: any) {
      setError(err.message || 'Could not save memory. Please retry.');
    } finally {
      setSaving(false);
    }
  };

  // Link Question
  const handleLinkQuestions = async () => {
    if (!selectedTargetQ) {
      setError('Please select a question to connect.');
      return;
    }

    setLinkingQuestion(true);
    setError(null);
    try {
      const res = await fetch('/api/memories/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceQuestionId: question.id,
          targetQuestionId: selectedTargetQ.id,
          relationshipType: relationType,
          note: relationNote.trim() || null,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'Failed to link questions');
      }

      const json = await res.json();
      setSavedConnections((prev) => [json.connection, ...prev]);
      setSelectedTargetQ(null);
      setRelationNote('');
      setTargetSearch('');
      setActiveTab('create');
      if (onMemorySaved) onMemorySaved(json.connection);
    } catch (err: any) {
      setError(err.message || 'Could not connect questions.');
    } finally {
      setLinkingQuestion(false);
    }
  };

  // Delete Memory
  const handleDeleteMemory = async (memoryId: string) => {
    try {
      const res = await fetch(`/api/memories?id=${memoryId}`, { method: 'DELETE' });
      if (res.ok) {
        setSavedMemories((prev) => prev.filter((m) => m.id !== memoryId));
        if (onMemorySaved) onMemorySaved(null);
      }
    } catch (err) {
      console.error('Failed to delete memory:', err);
    }
  };

  // Delete Question Connection
  const handleDeleteConnection = async (connId: string) => {
    try {
      const res = await fetch(`/api/memories/connections?id=${connId}`, { method: 'DELETE' });
      if (res.ok) {
        setSavedConnections((prev) => prev.filter((c) => c.id !== connId));
        if (onMemorySaved) onMemorySaved(null);
      }
    } catch (err) {
      console.error('Failed to delete connection:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="px-5 sm:px-7 py-4 bg-gradient-to-r from-stone-900 to-stone-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <BrainSparkIcon size={22} />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-white leading-tight flex items-center gap-2">
                Personal Memory Connections
              </h2>
              <p className="text-stone-400 text-xs mt-0.5">
                Your private mental triggers, mnemonics & knowledge links
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Question Context Banner */}
        <div className="bg-stone-50 border-b border-stone-200 px-5 sm:px-7 py-3 flex items-start gap-3 shrink-0">
          <div className="text-xs font-bold text-stone-400 shrink-0 mt-1">
            Q{question.original_question_number || '•'}
          </div>
          <div className="flex-1 min-w-0">
            <div
              dir="rtl"
              lang="ar"
              className="font-arabic font-bold text-stone-900 text-sm sm:text-base leading-relaxed line-clamp-2 text-right"
            >
              {question.question_arabic}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 sm:px-7 pt-3 border-b border-stone-100 bg-white shrink-0">
          <button
            onClick={() => setActiveTab('create')}
            className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'create'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <BrainSparkIcon size={16} />
            Create Memory Trick
          </button>
          <button
            onClick={() => setActiveTab('connect_question')}
            className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'connect_question'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <LinkConnectionIcon size={16} />
            Connect Two Questions
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {activeTab === 'create' && (
            <>
              {/* ── 1. One-Line Fast Memory Input ── */}
              <div className="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/80">
                <div className="text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Zap size={14} className="text-amber-500" /> Fast Quick Memory
                  </span>
                  {quickSavedSuccess && (
                    <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
                      <Check size={14} /> Saved instantly!
                    </span>
                  )}
                </div>
                <form onSubmit={handleQuickSave} className="flex gap-2">
                  <input
                    type="text"
                    dir="auto"
                    value={quickTrick}
                    onChange={(e) => setQuickTrick(e.target.value)}
                    placeholder="Write your one-sentence memory trick (e.g. Mir = Masnavi)..."
                    className="flex-1 bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                  />
                  <button
                    type="submit"
                    disabled={quickSaving || !quickTrick.trim()}
                    className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm disabled:opacity-40 flex items-center gap-1.5 shrink-0"
                  >
                    {quickSaving ? 'Saving...' : 'Save'}
                  </button>
                </form>
              </div>

              {/* ── 2. Deep Personal Memory Creation ── */}
              <form onSubmit={handleSaveConnection} className="space-y-4">
                {/* Type Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      Connection Type
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowAdvancedTypes(!showAdvancedTypes)}
                      className="text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      {showAdvancedTypes ? 'Show Fewer Types' : 'Add Another Connection Type ›'}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(showAdvancedTypes ? MEMORY_TYPES : MEMORY_TYPES.slice(0, 4)).map((t) => {
                      const isSelected = selectedType === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedType(t.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <span>{t.label}</span>
                          <span className="text-[10px] opacity-75 font-arabic" dir="rtl">
                            ({t.arabicLabel})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Smart Prompts Suggestions */}
                {smartPrompts.length > 0 && (
                  <div className="bg-amber-50/60 rounded-2xl p-3 border border-amber-200/60">
                    <div className="text-[11px] font-bold text-amber-900 mb-1.5 flex items-center gap-1.5">
                      <Lightbulb size={13} className="text-amber-600" />
                      Try connecting this with:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {smartPrompts.map((sp) => (
                        <button
                          key={sp.id}
                          type="button"
                          onClick={() => {
                            if (!content.includes(sp.template)) {
                              setContent((prev) => (prev ? `${prev}\n${sp.template}` : sp.template));
                            }
                          }}
                          className="px-2.5 py-1 bg-white hover:bg-amber-100/70 border border-amber-200 text-amber-950 rounded-lg text-xs font-medium transition-colors text-left"
                          title={sp.hint}
                        >
                          + {sp.category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Core Question Textarea: "How will YOU remember this?" */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                    How will <span className="text-emerald-700 underline">YOU</span> remember this?
                  </label>
                  <textarea
                    dir="auto"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your mental association, acronym, memory story or rule in English or Arabic (e.g. مرحلة = مرح + لة)..."
                    className="w-full bg-white border border-stone-300 rounded-2xl p-4 text-sm sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-arabic leading-relaxed resize-y"
                  />
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">
                    Keywords / Tags (comma separated):
                  </label>
                  <input
                    type="text"
                    dir="auto"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g. Abbasid, Masnavi, Diwan, Century 4"
                    className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-between pt-2">
                  {saveSuccess && (
                    <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
                      <Check size={16} /> Saved to your memory database!
                    </span>
                  )}
                  <button
                    type="submit"
                    disabled={saving || !content.trim()}
                    className="ml-auto px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm disabled:opacity-40 flex items-center gap-2"
                  >
                    {saving ? 'Saving...' : 'Save Connection'}
                  </button>
                </div>
              </form>
            </>
          )}

          {activeTab === 'connect_question' && (
            <div className="space-y-5">
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/70 text-xs text-emerald-950 font-medium leading-relaxed">
                Connect this question with another question in your knowledge base to forge a personal conceptual graph.
              </div>

              {/* Search target question */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Search Question to Link:
                </label>
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-3 text-stone-400" />
                  <input
                    type="text"
                    dir="auto"
                    value={targetSearch}
                    onChange={(e) => setTargetSearch(e.target.value)}
                    placeholder="Search by Arabic text, author, book, year or keyword..."
                    className="w-full bg-white border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                  />
                </div>

                {/* Search Results */}
                <div className="mt-2 space-y-1.5 max-h-48 overflow-y-auto">
                  {searching && (
                    <div className="p-3 text-xs text-stone-400 text-center">Searching questions...</div>
                  )}
                  {!searching && searchResults.map((q) => {
                    const isSelected = selectedTargetQ?.id === q.id;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setSelectedTargetQ(q)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                            : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                        }`}
                      >
                        <span className="text-[11px] font-bold text-stone-400 mt-0.5 shrink-0">
                          {q.exam_paper?.year ? `${q.exam_paper.year} P${q.exam_paper.paper_number}` : `Q${q.original_question_number}`}
                        </span>
                        <div
                          dir="rtl"
                          lang="ar"
                          className="flex-1 font-arabic text-xs sm:text-sm leading-relaxed text-right line-clamp-1"
                        >
                          {q.question_arabic}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Question Details & Relationship */}
              {selectedTargetQ && (
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
                  <div className="text-xs font-bold text-stone-700">Connecting With:</div>
                  <div
                    dir="rtl"
                    lang="ar"
                    className="font-arabic font-bold text-stone-900 text-sm bg-white p-3 rounded-xl border border-stone-200 text-right leading-relaxed"
                  >
                    {selectedTargetQ.question_arabic}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Relationship Type:
                    </label>
                    <select
                      value={relationType}
                      onChange={(e) => setRelationType(e.target.value as RelationshipType)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      {RELATIONSHIP_TYPES.map((rt) => (
                        <option key={rt.id} value={rt.id}>
                          {rt.label} ({rt.arabicLabel})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      Connection Note (Optional):
                    </label>
                    <input
                      type="text"
                      dir="auto"
                      value={relationNote}
                      onChange={(e) => setRelationNote(e.target.value)}
                      placeholder="e.g. Both written by the same author in 4th century AH"
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleLinkQuestions}
                    disabled={linkingQuestion}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm disabled:opacity-40"
                  >
                    {linkingQuestion ? 'Linking...' : 'Connect Questions in Knowledge Graph'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── 3. Saved Memories for this Question ── */}
          {(savedMemories.length > 0 || savedConnections.length > 0) && (
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="text-xs font-extrabold text-stone-700 uppercase tracking-wider">
                My Saved Connections for this Question ({savedMemories.length + savedConnections.length})
              </div>

              <div className="space-y-2">
                {savedMemories.map((m) => {
                  const typeMeta = MEMORY_TYPES.find((t) => t.id === m.type);
                  return (
                    <div
                      key={m.id}
                      className="bg-stone-50 border border-stone-200/90 rounded-2xl p-3.5 flex items-start justify-between gap-3 group"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {typeMeta?.label || m.type}
                          </span>
                        </div>
                        <div
                          dir="auto"
                          className="font-arabic font-bold text-stone-900 text-sm sm:text-base leading-relaxed whitespace-pre-wrap"
                        >
                          {m.content}
                        </div>
                        {Array.isArray(m.keywords) && m.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {m.keywords.map((kw, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 rounded bg-stone-200/70 text-stone-600 text-[10px] font-medium"
                              >
                                #{kw}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteMemory(m.id)}
                        className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors shrink-0"
                        title="Delete this memory"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  );
                })}

                {savedConnections.map((c) => {
                  const relMeta = RELATIONSHIP_TYPES.find((r) => r.id === c.relationship_type);
                  return (
                    <div
                      key={c.id}
                      className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-3.5 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-bold flex items-center gap-1">
                            <LinkConnectionIcon size={12} />
                            {relMeta?.label || c.relationship_type}
                          </span>
                        </div>
                        <div
                          dir="rtl"
                          lang="ar"
                          className="font-arabic font-bold text-emerald-950 text-xs sm:text-sm leading-relaxed text-right line-clamp-2"
                        >
                          {c.target_question?.question_arabic}
                        </div>
                        {c.note && (
                          <div className="text-xs text-emerald-800 font-medium italic">
                            Note: {c.note}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteConnection(c.id)}
                        className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors shrink-0"
                        title="Delete question connection"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-7 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>Personal & Private to your account</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
