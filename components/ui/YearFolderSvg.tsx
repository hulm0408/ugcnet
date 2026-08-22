export default function YearFolderSvg({ year, className = "" }: { year: string | number, className?: string }) {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="10" dy="15" stdDeviation="10" floodColor="#000000" floodOpacity="0.1" />
        </filter>
        <linearGradient id="folder-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="dark-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>
      </defs>

      <g transform="translate(150, 160) scale(1) rotate(-10)" filter="url(#shadow)">
        {/* Back green book/folder */}
        <path d="M-80 -80 L70 -110 L100 80 L-50 110 Z" fill="url(#dark-green)" />
        {/* Pages stack */}
        <path d="M-75 -75 L65 -105 L95 85 L-45 115 Z" fill="#FEF3C7" />
        <path d="M-70 -70 L60 -100 L90 90 L-40 120 Z" fill="#FFFBEB" />
        {/* Top cover (light amber) */}
        <path d="M-65 -65 L55 -95 L85 95 L-35 125 Z" fill="url(#folder-grad)" stroke="#D97706" strokeWidth="2" />
        
        {/* Lines on the cover */}
        <line x1="-40" y1="-40" x2="30" y2="-55" stroke="#B45309" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="-35" y1="-25" x2="35" y2="-40" stroke="#B45309" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        
        {/* Pen/Pencil lying on top */}
        <g transform="translate(-10, 40) rotate(-35)">
          <path d="M-40 -5 L40 -5 L40 5 L-40 5 Z" fill="#064E3B" />
          <path d="M40 -5 L50 0 L40 5 Z" fill="#D97706" />
          <path d="M47 -1 L50 0 L47 1 Z" fill="#171717" />
          <line x1="-40" y1="-2" x2="40" y2="-2" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </g>

        {/* Dynamic Year Text */}
        <text
          x="10"
          y="-20"
          fontFamily="system-ui, sans-serif"
          fontSize="48"
          fontWeight="bold"
          fill="#B45309"
          textAnchor="middle"
          transform="rotate(-12)"
          opacity="0.9"
        >
          {year}
        </text>
      </g>
    </svg>
  );
}
