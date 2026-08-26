'use client';

import React from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { buildGoogleSearchUrl } from '@/lib/searchUtils';

interface GoogleSearchButtonProps {
  questionArabic?: string | null;
  questionEnglish?: string | null;
  entityNameArabic?: string | null;
  entityNameEnglish?: string | null;
  microFocusArabic?: string | null;
  unitName?: string | null;
  size?: 'sm' | 'md';
  variant?: 'minimal' | 'badge';
}

export default function GoogleSearchButton({
  questionArabic,
  questionEnglish,
  entityNameArabic,
  entityNameEnglish,
  microFocusArabic,
  unitName,
  size = 'sm',
  variant = 'minimal',
}: GoogleSearchButtonProps) {
  const url = buildGoogleSearchUrl({
    questionArabic,
    questionEnglish,
    entityNameArabic,
    entityNameEnglish,
    microFocusArabic,
    unitName,
  });

  const isSmall = size === 'sm';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title="Search Google for this question & explanation"
      aria-label="Google search this question"
      className={`inline-flex items-center gap-1.5 rounded-xl font-bold transition-all group shrink-0 ${
        variant === 'badge'
          ? 'bg-[#F1F3F4] hover:bg-[#E8F0FE] text-[#5F6368] hover:text-[#1A73E8] border border-[#DADCE0] hover:border-[#D2E3FC]'
          : 'bg-stone-100 hover:bg-emerald-50 text-stone-600 hover:text-emerald-800 border border-stone-200/80 hover:border-emerald-200'
      } ${isSmall ? 'px-2.5 py-1 text-[11px]' : 'px-3.5 py-1.5 text-xs'}`}
    >
      {/* Google Multicolor 'G' Icon */}
      <svg className="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
        />
      </svg>
      <span className="font-semibold">Google Search</span>
      <ExternalLink size={11} className="opacity-60 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
