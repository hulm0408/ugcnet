export default function InstructionsSvg({ className = "" }: { className?: string }) {
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
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      <g transform="translate(150, 150) scale(0.9)" filter="url(#shadow)">
        
        {/* CLIPBOARD BOARD */}
        <path d="M-80 -100 L40 -100 C50 -100 60 -90 60 -80 L60 120 C60 130 50 140 40 140 L-80 140 C-90 140 -100 130 -100 120 L-100 -80 C-100 -90 -90 -100 -80 -100 Z" fill="#064E3B" stroke="url(#gold-grad)" strokeWidth="4" />
        
        {/* CLIPBOARD PAPER */}
        <path d="M-90 -70 L50 -70 L50 130 L-90 130 Z" fill="#FEF3C7" />
        <path d="M-90 -70 L50 -70 L50 130 L-90 130 Z" fill="#FFFBEB" opacity="0.8" />
        
        {/* PAPER CONTENT (LINES) */}
        <g stroke="#B45309" strokeWidth="2" strokeLinecap="round" opacity="0.3">
          <line x1="-70" y1="-40" x2="10" y2="-40" strokeWidth="4" />
          <line x1="-70" y1="-15" x2="30" y2="-15" />
          <line x1="-70" y1="5" x2="30" y2="5" />
          <line x1="-70" y1="25" x2="-10" y2="25" />
          
          <line x1="-70" y1="60" x2="30" y2="60" />
          <line x1="-70" y1="80" x2="30" y2="80" />
          <line x1="-70" y1="100" x2="0" y2="100" />
        </g>
        
        {/* CLIP MECHANISM (GOLD) */}
        <path d="M-40 -115 L0 -115 C5 -115 10 -110 10 -105 L10 -90 C10 -85 5 -80 0 -80 L-40 -80 C-45 -80 -50 -85 -50 -90 L-50 -105 C-50 -110 -45 -115 -40 -115 Z" fill="url(#gold-grad)" />
        <circle cx="-20" cy="-97" r="4" fill="#78350F" opacity="0.6" />
        
        {/* HOURGLASS */}
        <g transform="translate(60, 50) scale(1.1)">
          {/* Top/Bottom bases */}
          <path d="M-25 -40 L25 -40 L25 -35 L-25 -35 Z" fill="url(#gold-grad)" />
          <path d="M-25 40 L25 40 L25 35 L-25 35 Z" fill="url(#gold-grad)" />
          
          {/* Glass bulbs */}
          <path d="M-20 -35 C-20 -10, -5 -5, -5 0 C-5 5, -20 10, -20 35 L20 35 C20 10, 5 5, 5 0 C5 -5, 20 -10, 20 -35 Z" fill="#F0FDF4" opacity="0.6" stroke="#FEF3C7" strokeWidth="1" />
          
          {/* Sand top */}
          <path d="M-15 -35 L15 -35 C15 -15, 5 -5, 5 0 C-5 -5, -15 -15, -15 -35 Z" fill="#F59E0B" />
          {/* Sand bottom */}
          <path d="M-10 35 L10 35 C10 15, 5 5, -5 5 C-15 15, -10 35, -10 35 Z" fill="#F59E0B" />
          {/* Falling sand line */}
          <line x1="0" y1="0" x2="0" y2="25" stroke="#F59E0B" strokeWidth="1.5" />
        </g>

      </g>
    </svg>
  );
}
