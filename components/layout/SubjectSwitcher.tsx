'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDown, Search, Check, Sparkles, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SubjectItem {
  id: string;
  code: string;
  slug: string;
  name: string;
  name_native: string | null;
  is_paper_1: boolean;
  direction: 'ltr' | 'rtl';
}

const DEFAULT_SUBJECTS: SubjectItem[] = [
  {
    id: 'subj_paper1_code00',
    code: '00',
    slug: 'paper-1',
    name: 'General Paper 1',
    name_native: 'Paper 1 (Common for All Candidates)',
    is_paper_1: true,
    direction: 'ltr',
  },
  {
    id: 'subj_arabic_code29',
    code: '29',
    slug: 'arabic',
    name: 'Arabic',
    name_native: 'اللغة العربية وآدابها',
    is_paper_1: false,
    direction: 'rtl',
  },
  {
    id: 'subj_hindi_code20',
    code: '20',
    slug: 'hindi',
    name: 'Hindi',
    name_native: 'हिन्दी साहित्य',
    is_paper_1: false,
    direction: 'ltr',
  },
  {
    id: 'subj_english_code30',
    code: '30',
    slug: 'english',
    name: 'English',
    name_native: 'English Literature',
    is_paper_1: false,
    direction: 'ltr',
  },
  {
    id: 'subj_commerce_code08',
    code: '08',
    slug: 'commerce',
    name: 'Commerce',
    name_native: 'Commerce (Finance, Accounting & Tax)',
    is_paper_1: false,
    direction: 'ltr',
  },
];

export default function SubjectSwitcher() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [subjects, setSubjects] = useState<SubjectItem[]>(DEFAULT_SUBJECTS);
  const [activeSlug, setActiveSlug] = useState<string>('arabic');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Read active subject from cookie
    const cookies = document.cookie.split('; ');
    const subjectCookie = cookies.find((row) => row.startsWith('ugc_active_subject='));
    if (subjectCookie) {
      const slugVal = subjectCookie.split('=')[1];
      if (slugVal) setActiveSlug(slugVal);
    }

    // Fetch subjects list from API
    async function loadSubjects() {
      try {
        const res = await fetch('/api/subjects');
        if (res.ok) {
          const json = await res.json();
          if (json.subjects?.length > 0) {
            setSubjects(json.subjects);
          }
        }
      } catch (err) {
        console.warn('Could not fetch subjects:', err);
      }
    }
    loadSubjects();
  }, []);

  // Auto focus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeSubject = subjects.find((s) => s.slug === activeSlug) || DEFAULT_SUBJECTS[1];

  // Filtered subjects based on search query
  const filteredSubjects = useMemo(() => {
    if (!searchQuery.trim()) return subjects;
    const q = searchQuery.toLowerCase().trim();
    return subjects.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.includes(q) ||
        (s.name_native && s.name_native.toLowerCase().includes(q)) ||
        s.slug.toLowerCase().includes(q)
    );
  }, [subjects, searchQuery]);

  const handleSelectSubject = async (slug: string) => {
    setActiveSlug(slug);
    setIsOpen(false);

    // Set cookie immediately on client
    document.cookie = `ugc_active_subject=${slug}; path=/; max-age=31536000; SameSite=Lax`;

    try {
      await fetch('/api/subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectSlug: slug }),
      });
    } catch (err) {
      console.warn('Failed to persist active subject:', err);
    }

    // Full page refresh to ensure all server components re-render with new subject context
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100/90 hover:bg-stone-200/80 border border-stone-200/80 text-xs font-bold text-stone-800 transition-all active:scale-95 shadow-sm"
      >
        <span className="w-5 h-5 rounded-lg bg-primary/10 text-primary-dark flex items-center justify-center font-bold text-[10px]">
          {activeSubject.code === '29' ? 'ع' : activeSubject.code}
        </span>
        <span className="truncate max-w-[120px] sm:max-w-none">
          {activeSubject.name.length > 25 ? `${activeSubject.name.slice(0, 25)}...` : activeSubject.name} (Code {activeSubject.code})
        </span>
        <ChevronDown size={14} className={`text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-stone-200/90 py-3 z-50 animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
          {/* Header */}
          <div className="px-4 pb-3 border-b border-stone-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-stone-800">
                UGC NET Subjects
              </span>
              <div className="text-[10px] text-stone-400 font-semibold mt-0.5">
                {subjects.length} official subjects available
              </div>
            </div>
            <span className="text-[10px] font-extrabold bg-primary/10 text-primary-dark px-2.5 py-1 rounded-full border border-primary/20">
              Active: Code {activeSubject.code}
            </span>
          </div>

          {/* Search Bar */}
          <div className="p-3 border-b border-stone-100 bg-stone-50/50">
            <div className="relative flex items-center">
              <Search size={15} className="absolute left-3 text-stone-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by subject name or code..."
                className="w-full pl-9 pr-8 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-stone-400 hover:text-stone-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Subjects Scrollable List */}
          <div className="max-h-72 overflow-y-auto p-2 space-y-1 divide-y divide-stone-50 scrollbar-thin">
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((sub) => {
                const isSelected = sub.slug === activeSlug;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => handleSelectSubject(sub.slug)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-left transition-all ${
                      isSelected
                        ? 'bg-primary-surface/80 text-primary-dark border border-primary/20 shadow-sm font-bold'
                        : 'hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span
                        className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isSelected
                            ? 'bg-primary text-white'
                            : sub.is_paper_1
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-stone-100 text-stone-600 border border-stone-200'
                        }`}
                      >
                        {sub.code}
                      </span>
                      <div className="truncate">
                        <div className="text-xs font-bold truncate">{sub.name}</div>
                        {sub.name_native && (
                          <div className="text-[10px] text-stone-400 font-medium truncate mt-0.5">
                            {sub.name_native}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1">
                      {sub.is_paper_1 && (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200/80 px-1.5 py-0.5 rounded-md">
                          Common
                        </span>
                      )}
                      {isSelected && <Check size={16} className="text-primary ml-1" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-6 text-xs text-stone-400 font-medium">
                No subjects matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
