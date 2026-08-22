export default function ArchBookQuillSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="gold-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="paper-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="20%" stopColor="#FFFBEB" />
          <stop offset="80%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
        
        {/* Glow Filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Arch Pattern */}
        <pattern id="arch-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="1" />
          <circle cx="20" cy="20" r="2" fill="rgba(245, 158, 11, 0.2)" />
        </pattern>
      </defs>

      {/* --- BACKGROUND ARCH --- */}
      <g transform="translate(100, 20)">
        {/* Outer Arch Frame */}
        <path
          d="M0 250 L0 100 C0 44.77 44.77 0 100 0 C155.23 0 200 44.77 200 100 L200 250 Z"
          fill="#064E3B"
          stroke="url(#gold-gradient)"
          strokeWidth="4"
        />
        {/* Inner Arch with Pattern */}
        <path
          d="M10 250 L10 100 C10 50.29 50.29 10 100 10 C149.71 10 190 50.29 190 100 L190 250 Z"
          fill="url(#arch-pattern)"
          stroke="url(#gold-gradient)"
          strokeWidth="2"
          opacity="0.8"
        />
        {/* Inner glow line */}
        <path
          d="M20 250 L20 100 C20 55.82 55.82 20 100 20 C144.18 20 180 55.82 180 100 L180 250"
          fill="none"
          stroke="rgba(252, 211, 77, 0.4)"
          strokeWidth="1"
        />
      </g>

      {/* --- HANGING LAMP (Lantern) --- */}
      <g transform="translate(200, 0)">
        <line x1="0" y1="0" x2="0" y2="40" stroke="url(#gold-gradient)" strokeWidth="2" />
        <path d="M-10 40 L10 40 L15 50 L-15 50 Z" fill="url(#gold-gradient)" />
        <path d="M-15 50 L15 50 L10 80 L-10 80 Z" fill="rgba(252, 211, 77, 0.2)" stroke="url(#gold-gradient)" strokeWidth="1.5" />
        <path d="M-10 80 L10 80 L5 90 L-5 90 Z" fill="url(#gold-gradient)" />
        <circle cx="0" cy="65" r="5" fill="#FEF3C7" filter="url(#glow)" />
      </g>

      {/* --- OPEN BOOK (Isometric/3D style) --- */}
      <g transform="translate(200, 190) scale(1.1)">
        {/* Book Cover Bottom (Left) */}
        <path d="M0 25 L-110 -15 L-90 -35 L0 10 Z" fill="#064E3B" stroke="url(#gold-gradient)" strokeWidth="2" strokeLinejoin="round" />
        {/* Book Cover Bottom (Right) */}
        <path d="M0 25 L110 -15 L90 -35 L0 10 Z" fill="#064E3B" stroke="url(#gold-gradient)" strokeWidth="2" strokeLinejoin="round" />
        
        {/* Pages Block Left (thickness) */}
        <path d="M-5 10 L-100 -25 L-100 -30 L-5 5 Z" fill="#FDE68A" />
        {/* Pages Block Right (thickness) */}
        <path d="M5 10 L100 -25 L100 -30 L5 5 Z" fill="#D97706" />

        {/* Left Page Top Surface */}
        <path d="M0 10 C-30 15, -60 5, -100 -25 L-80 -45 C-40 -15, -15 -5, 0 -15 Z" fill="url(#paper-grad)" />
        {/* Right Page Top Surface */}
        <path d="M0 10 C30 15, 60 5, 100 -25 L80 -45 C40 -15, 15 -5, 0 -15 Z" fill="url(#paper-grad)" />
        
        {/* Center fold shadow */}
        <path d="M0 10 L0 -15 C-2 -10, -5 -5, -10 0 C-5 5, -2 10, 0 10 Z" fill="rgba(0,0,0,0.1)" />
        <path d="M0 10 L0 -15 C2 -10, 5 -5, 10 0 C5 5, 2 10, 0 10 Z" fill="rgba(0,0,0,0.05)" />

        {/* Arabic Text Lines (Left Page) */}
        <path d="M-15 0 C-30 5, -50 0, -80 -15" fill="none" stroke="rgba(180, 83, 9, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M-12 -6 C-27 -1, -47 -6, -77 -21" fill="none" stroke="rgba(180, 83, 9, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M-9 -12 C-24 -7, -44 -12, -74 -27" fill="none" stroke="rgba(180, 83, 9, 0.4)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Arabic Text Lines (Right Page) */}
        <path d="M15 0 C30 5, 50 0, 80 -15" fill="none" stroke="rgba(180, 83, 9, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 -6 C27 -1, 47 -6, 77 -21" fill="none" stroke="rgba(180, 83, 9, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 -12 C24 -7, 44 -12, 74 -27" fill="none" stroke="rgba(180, 83, 9, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Red Bookmark Ribbon */}
        <path d="M-20 -15 C-25 -5, -30 15, -25 35 L-15 30 L-5 35 C-10 15, -15 -5, -10 -15 Z" fill="#DC2626" />
        <path d="M-25 35 L-15 30 L-5 35 L-15 32 Z" fill="#991B1B" />
      </g>

      {/* --- QUILL PEN --- */}
      <g transform="translate(260, 160) rotate(-15) scale(0.9)">
        {/* Feather */}
        <path d="M0 0 C-30 -30, -50 -80, -20 -120 C-10 -90, 20 -40, 0 0 Z" fill="#022C22" />
        <path d="M0 0 C-20 -30, -35 -80, -10 -110 C-5 -85, 10 -40, 0 0 Z" fill="#064E3B" />
        {/* Feather cuts */}
        <path d="M-12 -30 L-25 -35 M-18 -60 L-35 -65 M5 -40 L20 -45 M8 -70 L25 -75" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        {/* Stem (Rachis) */}
        <path d="M-20 -120 Q-10 -50 0 0 L15 30" fill="none" stroke="url(#gold-light)" strokeWidth="3" strokeLinecap="round" />
        {/* Nib base */}
        <path d="M-2 -5 L2 -5 L4 10 L-4 10 Z" fill="url(#gold-gradient)" />
        {/* Nib tip */}
        <path d="M-4 10 L4 10 L0 30 Z" fill="url(#gold-gradient)" />
        <line x1="0" y1="10" x2="0" y2="25" stroke="#451A03" strokeWidth="1" />
      </g>

      {/* --- INK POT --- */}
      <g transform="translate(110, 220) scale(0.9)">
        {/* Shadow */}
        <ellipse cx="0" cy="35" rx="30" ry="10" fill="rgba(0,0,0,0.3)" />
        {/* Base */}
        <path d="M-25 0 C-25 20, -15 30, 0 30 C15 30, 25 20, 25 0 Z" fill="#022C22" />
        <path d="M-25 0 C-25 20, -15 30, 0 30 C15 30, 25 20, 25 0 Z" fill="url(#gold-gradient)" opacity="0.3" />
        {/* Highlights */}
        <path d="M-20 5 C-20 15, -10 25, 0 25" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
        {/* Neck */}
        <path d="M-15 -20 L15 -20 L25 0 C15 5, -15 5, -25 0 Z" fill="url(#gold-gradient)" />
        <ellipse cx="0" cy="0" rx="25" ry="8" fill="#FCD34D" />
        {/* Opening */}
        <ellipse cx="0" cy="-20" rx="15" ry="5" fill="#78350F" />
        {/* Inside Ink */}
        <ellipse cx="0" cy="-20" rx="10" ry="3" fill="#171717" />
        {/* Cap removed (lying on side) */}
        <g transform="translate(-40, 30) rotate(-20)">
          <path d="M-10 0 L10 0 L15 15 L-15 15 Z" fill="url(#gold-gradient)" />
          <path d="M-15 15 L15 15 L10 20 L-10 20 Z" fill="#B45309" />
          <ellipse cx="0" cy="0" rx="10" ry="4" fill="#78350F" />
        </g>
      </g>

      {/* Floating sparkles */}
      <g fill="#FCD34D" filter="url(#glow)">
        <path d="M 80 80 Q 85 85 90 80 Q 85 75 80 80 Z" />
        <path d="M 280 60 Q 285 65 290 60 Q 285 55 280 60 Z" />
        <path d="M 320 120 Q 323 123 326 120 Q 323 117 320 120 Z" />
      </g>

    </svg>
  );
}
