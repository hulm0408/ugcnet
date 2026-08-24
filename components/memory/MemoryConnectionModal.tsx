'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Zap,
  BookOpen,
  Link2,
  Check,
  Trash2,
  ArrowRight,
  Search,
  ChevronDown,
  Brain,
  Layers,
} from 'lucide-react';
import {
  MEMORY_TYPES,
  RELATIONSHIP_TYPES,
  MemoryType,
  RelationshipType,
  generateSmartMemoryPrompts,
} from '@/lib/memoryEngine';

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
  // Mode: 'trick' | 'link_question'
  const [mode, setMode] = useState<'trick' | 'link_question'>('trick');
  const [selectedType, setSelectedType] = useState<MemoryType>('TRICK');
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Existing memories & connections
  const [savedMemories, setSavedMemories] = useState<MemoryItem[]>([]);
  const [savedConnections, setSavedConnections] = useState<QuestionConnectionItem[]>([]);

  // Question linking state
  const [targetSearch, setTargetSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedTargetQuestion, setSelectedTargetQuestion] = useState<any | null>(null);
  const [relationshipType, setRelationshipType] = useState<RelationshipType>('SAME_AUTHOR');
  const [connectionNote, setConnectionNote] = useState('');
  const [searching, setSearching] = useState(false);

  // Fetch existing records when modal opens
  useEffect(() => {
    if (!isOpen || !question.id) return;

    let isMounted = true;
    const fetchExisting = async () => {
      try {
        const [memRes, connRes] = await Promise.all([
          fetch(`/api/memories?questionId=${question.id}`),
          fetch(`/api/memories/connections?questionId=${question.id}`),
        ]);

        if (memRes.ok && isMounted) {
          const mJson = await memRes.json();
          setSavedMemories(mJson.data || []);
          if (mJson.data && mJson.data.length > 0) {
            setContent(mJson.data[0].content || '');
            setSelectedType(mJson.data[0].type || 'TRICK');
          }
        }

        if (connRes.ok && isMounted) {
          const cJson = await connRes.json();
          setSavedConnections(cJson.data || []);
        }
      } catch (err) {
        console.error('Failed to load existing memories:', err);
      }
    };

    fetchExisting();
    return () => {
      isMounted = false;
    };
  }, [isOpen, question.id]);

  // Search questions for linking
  useEffect(() => {
    if (mode !== 'link_question' || !targetSearch.trim() || targetSearch.length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `/api/memories/search-questions?q=${encodeURIComponent(targetSearch)}&excludeId=${question.id}`
        );
        if (res.ok) {
          const json = await res.json();
          setSearchResults(json.questions || []);
        }
      } catch (e) {
        console.error('Search error:', e);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [targetSearch, mode, question.id]);

  if (!isOpen) return null;

  const smartPrompts = generateSmartMemoryPrompts(question);

  const handleSaveMemory = async () => {
    if (!content.trim()) {
      setError('Please enter your memory trick or note');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const kwList = keywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);

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
        const json = await res.json();
        throw new Error(json.error || 'Failed to save memory');
      }

      const json = await res.json();
      setSaveSuccess(true);
      if (onMemorySaved) onMemorySaved(json.data);

      setTimeout(() => {
        onClose();
      }, 700);
    } catch (e: any) {
      setError(e.message || 'Error saving memory');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateConnection = async () => {
    if (!selectedTargetQuestion) {
      setError('Please select a question to link');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/memories/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceQuestionId: question.id,
          targetQuestionId: selectedTargetQuestion.id,
          relationshipType,
          note: connectionNote.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Failed to create connection');
      }

      const json = await res.json();
      setSavedConnections((prev) => [json.data, ...prev]);
      setSelectedTargetQuestion(null);
      setConnectionNote('');
      setTargetSearch('');
      setSaveSuccess(true);
    } catch (e: any) {
      setError(e.message || 'Error connecting questions');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto relative">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <Brain size={18} />
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900">Personal Memory Anchor</h3>
              <p className="text-[11px] text-stone-500 font-medium">Private to your account</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Question Preview Box */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-stone-400">
              <span>TARGET QUESTION</span>
              {question.original_question_number && <span>Q{question.original_question_number}</span>}
            </div>
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic font-bold text-stone-900 text-sm leading-relaxed text-right line-clamp-2"
            >
              {question.question_arabic}
            </p>
          </div>

          {/* Simple 2-Mode Selector */}
          <div className="flex rounded-xl bg-stone-100 p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setMode('trick')}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'trick' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Zap size={14} className="text-amber-500" />
              <span>Memory Trick / Note</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('link_question')}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'link_question' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Link2 size={14} className="text-emerald-700" />
              <span>Link Another Question</span>
            </button>
          </div>

          {/* ── MODE 1: MEMORY TRICK ── */}
          {mode === 'trick' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  How do you want to remember this?
                </label>
                
                {/* 3 Clear Primary Types */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { id: 'TRICK', label: 'My Trick', icon: Zap },
                    { id: 'MNEMONIC', label: 'Formula', icon: Brain },
                    { id: 'STORY', label: 'Short Story', icon: BookOpen },
                  ].map((t) => {
                    const isSelected = selectedType === t.id;
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedType(t.id as MemoryType)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-400'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <Icon size={14} className={isSelected ? 'text-emerald-700' : 'text-stone-400'} />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>

                <textarea
                  dir="auto"
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your mental shortcut, author formula, or story here... (e.g. Abu al-Faraj = Isfahan + 24 parts + Kitab al-Aghani)"
                  className="w-full p-3.5 bg-white border border-stone-200 rounded-2xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none leading-relaxed transition-all placeholder:text-stone-400"
                />
              </div>

              {/* Smart Prompts Suggestions */}
              {smartPrompts.length > 0 && !content && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Suggested Framework:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {smartPrompts.slice(0, 2).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setContent(p.template)}
                        className="text-[11px] font-arabic font-bold text-stone-600 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 px-2.5 py-1 rounded-lg transition-colors text-right"
                      >
                        {p.template}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Advanced Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs font-bold text-stone-500 hover:text-stone-800 inline-flex items-center gap-1"
                >
                  <ChevronDown size={14} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                  <span>{showAdvanced ? 'Hide tags' : '+ Add keywords / tags'}</span>
                </button>

                {showAdvanced && (
                  <div className="mt-2 pt-2 border-t border-stone-100">
                    <input
                      type="text"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="Keywords separated by comma (e.g. Author, Jahiliyyah, Muallaqah)"
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="text-xs font-bold text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSaveMemory}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saveSuccess ? (
                    <>
                      <Check size={16} /> Saved to 5-Level Retention Queue!
                    </>
                  ) : saving ? (
                    'Saving...'
                  ) : (
                    'Save Memory Anchor'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── MODE 2: LINK ANOTHER QUESTION ── */}
          {mode === 'link_question' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Search & select question to link:
                </label>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    value={targetSearch}
                    onChange={(e) => setTargetSearch(e.target.value)}
                    placeholder="Search by author, title, or Arabic keyword..."
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="max-h-36 overflow-y-auto divide-y divide-stone-100 border border-stone-200 rounded-xl bg-white">
                  {searchResults.map((sq) => (
                    <div
                      key={sq.id}
                      onClick={() => setSelectedTargetQuestion(sq)}
                      className={`p-2.5 text-xs cursor-pointer transition-colors ${
                        selectedTargetQuestion?.id === sq.id ? 'bg-emerald-50 text-emerald-900 font-bold' : 'hover:bg-stone-50'
                      }`}
                    >
                      <span className="font-bold text-[10px] text-stone-400">
                        {sq.exam_paper?.year} P{sq.exam_paper?.paper_number} • Q{sq.original_question_number}
                      </span>
                      <p dir="rtl" lang="ar" className="font-arabic text-xs line-clamp-1 mt-0.5">
                        {sq.question_arabic}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {selectedTargetQuestion && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                  <div className="text-[11px] font-bold text-emerald-900">
                    Selected: {selectedTargetQuestion.exam_paper?.year} Q{selectedTargetQuestion.original_question_number}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={relationshipType}
                      onChange={(e) => setRelationshipType(e.target.value as RelationshipType)}
                      className="p-2 bg-white border border-stone-200 rounded-lg text-xs font-bold"
                    >
                      {RELATIONSHIP_TYPES.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={connectionNote}
                      onChange={(e) => setConnectionNote(e.target.value)}
                      placeholder="Optional link note..."
                      className="p-2 bg-white border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  disabled={saving || !selectedTargetQuestion}
                  onClick={handleCreateConnection}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  <Link2 size={15} />
                  <span>Connect Questions</span>
                </button>
              </div>

              {/* Existing Connections */}
              {savedConnections.length > 0 && (
                <div className="pt-3 border-t border-stone-100 space-y-2">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Existing Connections ({savedConnections.length}):
                  </span>
                  <div className="space-y-1.5">
                    {savedConnections.map((c) => (
                      <div key={c.id} className="p-2 rounded-lg bg-stone-50 border border-stone-200 text-xs flex items-center justify-between">
                        <span className="font-bold text-stone-700">
                          Q{c.target_question.original_question_number}: {c.relationship_type}
                        </span>
                        {c.note && <span className="text-stone-400 text-[11px]">{c.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
