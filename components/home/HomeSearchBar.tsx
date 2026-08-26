'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const filterPills = [
  { label: 'All Papers', href: '/pyq' },
  { label: '2023–2020', href: '/pyq' },
  { label: 'الأدب الجاهلي (Pre-Islamic)', href: '/search?q=الأدب+الجاهلي' },
  { label: 'الأدب العباسي (Abbasid)', href: '/search?q=الأدب+العباسي' },
  { label: 'النحو والصرف (Grammar)', href: '/search?q=النحو+والصرف' },
  { label: 'علم البلاغة (Rhetoric)', href: '/search?q=علم+البلاغة' },
  { label: 'الأدب الحديث (Modern)', href: '/search?q=الأدب+الحديث' },
];

export default function HomeSearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3.5">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center bg-white rounded-2xl border-2 border-slate-200 group-hover:border-emerald-500/80 group-focus-within:border-emerald-600 shadow-sm transition-all">
          <div className="pl-4.5 pr-2 text-slate-400 group-focus-within:text-emerald-600 transition-colors flex items-center">
            <Search size={20} />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by author, book, era, term, or question... (e.g. المتنبي, المعلقات, البلاغة)"
            className="w-full py-4 pr-24 pl-2 bg-transparent text-slate-900 placeholder:text-slate-400 font-sans text-sm sm:text-base outline-none"
            dir="auto"
          />

          <div className="absolute right-3 flex items-center gap-1.5">
            <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-1 text-[11px] font-mono font-bold bg-slate-100 text-slate-500 border border-slate-200 rounded-lg shadow-2xs">
              /
            </kbd>
            <button
              type="submit"
              aria-label="Search"
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </form>

      {/* Quick Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
        <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1 text-[11px]">
          <Sparkles size={12} className="text-emerald-600" />
          Quick tags:
        </span>
        {filterPills.map((pill, idx) => (
          <Link
            key={idx}
            href={pill.href}
            className="shrink-0 px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 rounded-full font-medium transition-colors text-[11px]"
          >
            {pill.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
