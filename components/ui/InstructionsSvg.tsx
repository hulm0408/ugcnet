import React from 'react';

export default function InstructionsSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      className={className}
      fill="none"
    >
      <rect width="400" height="400" rx="40" fill="#F0F9F6" />
      
      {/* Background decorations */}
      <circle cx="350" cy="50" r="100" fill="#107A53" opacity="0.05" />
      <circle cx="50" cy="350" r="150" fill="#D97706" opacity="0.05" />

      {/* Clipboard base */}
      <rect x="120" y="80" width="160" height="240" rx="12" fill="white" stroke="#107A53" strokeWidth="8" />
      
      {/* Clipboard clip */}
      <rect x="160" y="60" width="80" height="30" rx="6" fill="#107A53" />
      <circle cx="200" cy="75" r="5" fill="white" />
      
      {/* Document lines */}
      <line x1="150" y1="140" x2="250" y2="140" stroke="#E7E5E4" strokeWidth="8" strokeLinecap="round" />
      <line x1="150" y1="170" x2="250" y2="170" stroke="#E7E5E4" strokeWidth="8" strokeLinecap="round" />
      <line x1="150" y1="200" x2="210" y2="200" stroke="#E7E5E4" strokeWidth="8" strokeLinecap="round" />
      
      {/* Checkmarks */}
      <circle cx="155" cy="245" r="12" fill="#107A53" />
      <path d="M150 245 L154 249 L160 241" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      
      <circle cx="155" cy="285" r="12" fill="#D97706" />
      <path d="M150 285 L154 289 L160 281" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Hourglass */}
      <g transform="translate(240, 220)">
        <path d="M10 0 H50 L35 30 L50 60 H10 L25 30 Z" fill="#FCFAF8" stroke="#107A53" strokeWidth="6" strokeLinejoin="round" />
        {/* Sand top */}
        <path d="M16 10 H44 L35 25 H25 Z" fill="#D97706" />
        {/* Sand bottom */}
        <path d="M25 35 H35 L42 50 H18 Z" fill="#D97706" />
        {/* Falling sand */}
        <line x1="30" y1="25" x2="30" y2="50" stroke="#D97706" strokeWidth="2" strokeDasharray="2 2" />
      </g>

      {/* Floating sparkles */}
      <path d="M80 120 L85 110 L95 110 L87 105 L90 95 L80 102 L70 95 L73 105 L65 110 L75 110 Z" fill="#D97706" opacity="0.6" />
      <path d="M300 160 L303 155 L308 155 L304 152 L306 147 L300 150 L294 147 L296 152 L292 155 L297 155 Z" fill="#107A53" opacity="0.4" />
    </svg>
  );
}
