export default function ResultTrophySvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="15" floodColor="#000000" floodOpacity="0.15" />
        </filter>
        <linearGradient id="gold-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="25%" stopColor="#F59E0B" />
          <stop offset="75%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id="gold-light" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="base-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#022C22" />
          <stop offset="50%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g transform="translate(150, 150)" filter="url(#shadow)">
        
        {/* Base Bottom */}
        <path d="M-60 100 L60 100 L70 120 L-70 120 Z" fill="url(#base-grad)" />
        <path d="M-60 100 L60 100 L60 105 L-60 105 Z" fill="url(#gold-light)" />
        <path d="M-50 70 L50 70 L60 100 L-60 100 Z" fill="url(#base-grad)" />
        <path d="M-50 70 L50 70 L50 75 L-50 75 Z" fill="url(#gold-light)" />
        
        {/* Stem */}
        <path d="M-15 40 L15 40 L25 70 L-25 70 Z" fill="url(#gold-main)" />
        <ellipse cx="0" cy="40" rx="15" ry="5" fill="url(#gold-light)" />
        
        {/* Cup Bowl */}
        <path d="M-40 -40 C-40 10, -20 40, 0 40 C20 40, 40 10, 40 -40 Z" fill="url(#gold-main)" />
        
        {/* Cup Rim */}
        <ellipse cx="0" cy="-40" rx="45" ry="10" fill="url(#gold-light)" />
        <ellipse cx="0" cy="-40" rx="38" ry="7" fill="#78350F" />
        <ellipse cx="0" cy="-40" rx="35" ry="5" fill="#B45309" />
        
        {/* Left Handle */}
        <path d="M-38 -20 C-70 -20, -70 20, -25 20" fill="none" stroke="url(#gold-main)" strokeWidth="8" strokeLinecap="round" />
        <path d="M-38 -20 C-70 -20, -70 20, -25 20" fill="none" stroke="url(#gold-light)" strokeWidth="3" strokeLinecap="round" />

        {/* Right Handle */}
        <path d="M38 -20 C70 -20, 70 20, 25 20" fill="none" stroke="url(#gold-main)" strokeWidth="8" strokeLinecap="round" />
        <path d="M38 -20 C70 -20, 70 20, 25 20" fill="none" stroke="url(#gold-light)" strokeWidth="3" strokeLinecap="round" />
        
        {/* Arabic Star Graphic on Cup */}
        <g transform="translate(0, -5) scale(0.6)" opacity="0.8">
          <path d="M0 -15 L4 -4 L15 -4 L6 3 L10 14 L0 7 L-10 14 L-6 3 L-15 -4 L-4 -4 Z" fill="#FEF3C7" />
        </g>

        {/* Sparkles */}
        <g fill="#FDE68A" filter="url(#glow)">
          <path d="M -60 -60 Q -55 -55 -50 -60 Q -55 -65 -60 -60 Z" />
          <path d="M 50 -80 Q 53 -77 56 -80 Q 53 -83 50 -80 Z" />
          <path d="M 60 0 Q 65 5 70 0 Q 65 -5 60 0 Z" />
        </g>
      </g>
    </svg>
  );
}
