import React from 'react';

export function BrainSparkIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.3 4.7 3.3 6 .4.3.7.8.7 1.3V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1.7c0-.5.3-1 .7-1.3 2-1.3 3.3-3.5 3.3-6a7 7 0 0 0-7-7z" />
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M9.5 14a3.5 3.5 0 0 0 5 0" />
      <path d="M12 2v2" />
      <path d="M4.9 4.9l1.4 1.4" />
      <path d="M19.1 4.9l-1.4 1.4" />
    </svg>
  );
}

export function LinkConnectionIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      <circle cx="6" cy="18" r="2" fill="currentColor" />
      <circle cx="18" cy="6" r="2" fill="currentColor" />
    </svg>
  );
}

export function KnowledgeGraphIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.5 6h6.5" />
      <path d="M6 8.5v6.5" />
      <path d="M18 8.5v6.5" />
      <path d="M8.5 18h6.5" />
      <path d="M8.2 8.2l7.6 7.6" />
    </svg>
  );
}

export function SpacedRepetitionIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21.5 2v6h-6" />
      <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
