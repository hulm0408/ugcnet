import React from 'react';

export default function QuillInkPotIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ink Pot Body */}
      <path 
        d="M30 75C30 65 35 60 40 60H60C65 60 70 65 70 75V85C70 90.5 65.5 95 60 95H40C34.5 95 30 90.5 30 85V75Z" 
        fill="currentColor" 
        className="text-stone-200"
      />
      {/* Ink Pot Neck */}
      <rect x="42" y="52" width="16" height="8" fill="currentColor" className="text-stone-300" />
      {/* Ink Pot Rim */}
      <rect x="38" y="48" width="24" height="4" rx="2" fill="currentColor" className="text-stone-400" />
      {/* Ink Level inside Pot */}
      <path 
        d="M35 75C35 70 38 68 42 68H58C62 68 65 70 65 75V85C65 88 62.5 90 59 90H41C37.5 90 35 88 35 85V75Z" 
        fill="currentColor" 
        className="text-stone-800"
      />
      
      {/* Quill Feather */}
      <path 
        d="M60 45C60 45 75 30 80 15C81 12 85 5 85 5C85 5 78 10 70 15C60 21 52 35 52 35" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round"
        className="text-stone-700"
      />
      <path 
        d="M80 15C75 25 65 35 60 45L52 35C58 25 70 15 80 15Z" 
        fill="currentColor" 
        className="text-[#D97706]"
        opacity="0.8"
      />
      
      {/* Quill Tip (Nib) */}
      <path 
        d="M60 45L52 35L48 50L60 45Z" 
        fill="currentColor" 
        className="text-stone-500"
      />
      <path 
        d="M48 50L46 54C45 56 46 58 48 58L50 52" 
        fill="currentColor" 
        className="text-stone-400"
      />
      {/* Ink Drop */}
      <circle cx="45" cy="62" r="2" fill="currentColor" className="text-stone-800" />
    </svg>
  );
}
