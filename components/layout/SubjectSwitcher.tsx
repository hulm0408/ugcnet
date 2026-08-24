'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, BookOpen, Check, Globe, Sparkles } from 'lucide-react';
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
    name_native: 'General Paper on Teaching & Research Aptitude',
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
    name_native: 'Commerce & Management',
    is_paper_1: false,
    direction: 'ltr',
  },
];

export default function SubjectSwitcher() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [subjects, setSubjects] = useState<SubjectItem[]>(DEFAULT_SUBJECTS);
  const [activeSlug, setActiveSlug] = useState<string>('arabic');
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const activeSubject = subjects.find((s) => s.slug === activeSlug) || {
    id: 'subj_arabic_code29',
    code: '29',
    slug: 'arabic',
    name: 'Arabic',
    name_native: 'اللغة العربية وآدابها',
    is_paper_1: false,
    direction: 'rtl' as const,
  };

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
        <span className="truncate max-w-[110px] sm:max-w-none">
          {activeSubject.name} (Code {activeSubject.code})
        </span>
        <ChevronDown size={14} className={`text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-2 border-b border-stone-100 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Active Preparation Subject
            </span>
            <span className="text-[10px] font-bold bg-primary/10 text-primary-dark px-2 py-0.5 rounded-full">
              UGC NET
            </span>
          </div>

          <div className="p-1 space-y-1">
            {subjects.map((sub) => {
              const isSelected = sub.slug === activeSlug;
              const isReady = sub.code === '29' || sub.code === '00';

              return (
                <button
                  key={sub.id}
                  onClick={() => handleSelectSubject(sub.slug)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-primary-surface text-primary-dark font-extrabold border border-primary/20'
                      : 'hover:bg-stone-50 text-stone-700 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected ? 'bg-primary text-white' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {sub.code === '29' ? 'ع' : sub.code}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs truncate flex items-center gap-1.5">
                        <span>{sub.name}</span>
                        {sub.is_paper_1 && (
                          <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                            Common
                          </span>
                        )}
                      </div>
                      {sub.name_native && (
                        <div className="text-[10px] text-stone-400 truncate">
                          {sub.name_native}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5">
                    {!isReady && (
                      <span className="text-[9px] font-bold text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
                        Soon
                      </span>
                    )}
                    {isSelected && <Check size={16} className="text-primary" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-1 pt-2 border-t border-stone-100 px-3 py-1.5 bg-stone-50/60 rounded-b-xl flex items-center justify-between text-[11px] text-stone-500 font-medium">
            <span>Subscribing gives access to your Subject + Paper 1</span>
          </div>
        </div>
      )}
    </div>
  );
}
