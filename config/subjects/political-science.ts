import { SubjectConfig } from './types';
import { politicalScienceSyllabus, politicalScienceSyllabusSource } from '../../data/syllabus/political-science';

export const politicalScienceConfig: SubjectConfig = {
  code: '02',
  slug: 'political-science',
  name: 'Political Science',
  nativeName: 'राजनीति विज्ञान एवं अंतर्राष्ट्रीय संबंध',
  tagline: 'Political Theory & Thinkers • Indian Constitution & Polity • Comparative Regimes • International Relations & Foreign Policy',
  positioningHeadline: 'Master Political Science —',
  positioningHighlight: 'From Political Thought to Global Governance.',
  description: 'Master Western and Indian political thinkers, constitutional amendments, comparative politics, and IR paradigms with 20+ years of verified UGC NET questions.',
  theme: {
    primaryColor: '#312E81',
    accentColor: '#6366F1',
    surfaceGradient: 'from-[#100F2E] to-[#040412]',
    fontFamily: 'font-sans',
    scriptDirection: 'ltr',
    visualConcept: 'Constitutional governance wheel with radial branches for Legislature, Executive, Judiciary',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgPol" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2A0F06" />
            <stop offset="100%" stop-color="#110602" />
          </linearGradient>
          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#EA580C" />
            <stop offset="100%" stop-color="#C2410C" />
          </linearGradient>
        </defs>
        
        <rect width="500" height="360" rx="20" fill="url(#bgPol)" stroke="#7C2D12" stroke-width="1.5" />
        
        <!-- Concentric Rings -->
        <circle cx="250" cy="200" r="110" fill="none" stroke="#7C2D12" stroke-width="1" stroke-dasharray="4,4" />
        <circle cx="250" cy="200" r="140" fill="none" stroke="#7C2D12" stroke-width="1" stroke-dasharray="8,4" />
        
        <path id="ring1" d="M 140 200 A 110 110 0 1 1 360 200 A 110 110 0 1 1 140 200" fill="none" />
        <text font-size="10" fill="#EA580C" font-weight="bold" letter-spacing="2">
          <textPath href="#ring1" startOffset="25%" text-anchor="middle">FUNDAMENTAL RIGHTS</textPath>
        </text>
        <path id="ring2" d="M 110 200 A 140 140 0 1 1 390 200 A 140 140 0 1 1 110 200" fill="none" />
        <text font-size="10" fill="#EA580C" font-weight="bold" letter-spacing="2">
          <textPath href="#ring2" startOffset="75%" text-anchor="middle">DIRECTIVE PRINCIPLES</textPath>
        </text>

        <!-- Radial Spokes -->
        <!-- Legislature (Top) -->
        <line x1="250" y1="200" x2="250" y2="80" stroke="#EA580C" stroke-width="3" />
        <!-- Executive (Bottom Right) -->
        <line x1="250" y1="200" x2="350" y2="280" stroke="#EA580C" stroke-width="3" />
        <!-- Judiciary (Bottom Left) -->
        <line x1="250" y1="200" x2="150" y2="280" stroke="#EA580C" stroke-width="3" />

        <!-- Nodes -->
        <!-- Legislature Icon (Parliament Dome) -->
        <g transform="translate(250, 60)">
          <circle cx="0" cy="0" r="24" fill="#431407" stroke="#EA580C" stroke-width="2" />
          <path d="M -12 5 L -12 -2 A 12 12 0 0 1 12 -2 L 12 5 Z" fill="#FDBA74" />
          <rect x="-14" y="5" width="28" height="4" fill="#FDBA74" />
          <text x="0" y="38" text-anchor="middle" fill="#FFEDD5" font-size="11" font-weight="bold">LEGISLATURE</text>
        </g>
        
        <!-- Executive Icon (Shield) -->
        <g transform="translate(365, 290)">
          <circle cx="0" cy="0" r="24" fill="#431407" stroke="#EA580C" stroke-width="2" />
          <path d="M -10 -10 L 10 -10 L 10 2 C 10 8 0 14 0 14 C 0 14 -10 8 -10 2 Z" fill="#FDBA74" />
          <text x="0" y="38" text-anchor="middle" fill="#FFEDD5" font-size="11" font-weight="bold">EXECUTIVE</text>
        </g>
        
        <!-- Judiciary Icon (Scales) -->
        <g transform="translate(135, 290)">
          <circle cx="0" cy="0" r="24" fill="#431407" stroke="#EA580C" stroke-width="2" />
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#FDBA74" stroke-width="2" />
          <line x1="-12" y1="-6" x2="12" y2="-6" stroke="#FDBA74" stroke-width="2" />
          <path d="M -12 -6 L -16 4 A 4 4 0 0 0 -8 4 Z" fill="#FDBA74" />
          <path d="M 12 -6 L 8 4 A 4 4 0 0 0 16 4 Z" fill="#FDBA74" />
          <rect x="-6" y="10" width="12" height="2" fill="#FDBA74" />
          <text x="0" y="38" text-anchor="middle" fill="#FFEDD5" font-size="11" font-weight="bold">JUDICIARY</text>
        </g>

        <!-- Center Seal -->
        <circle cx="250" cy="200" r="45" fill="#7C2D12" stroke="url(#orangeGrad)" stroke-width="4" />
        <circle cx="250" cy="200" r="38" fill="#2A0F06" />
        <text x="250" y="195" text-anchor="middle" fill="#FFEDD5" font-size="12" font-weight="bold">WE, THE</text>
        <text x="250" y="210" text-anchor="middle" fill="#FFEDD5" font-size="12" font-weight="bold">PEOPLE</text>
        
        <text x="250" y="30" text-anchor="middle" fill="#FDBA74" font-size="16" font-weight="bold" letter-spacing="1">CONSTITUTIONAL GOVERNANCE</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'Political Theory & Western Thinkers',
      subtitle: 'Liberty, Justice, Power & Ideologies',
      description: 'Plato (Republic), Aristotle (Politics), Machiavelli (Prince), Hobbes, Locke, Rousseau, Marx, J.S. Mill, John Rawls (Theory of Justice), Robert Nozick, and Antonio Gramsci (Hegemony).',
      keyTerms: ['Rawls Veil of Ignorance', 'Gramsci Hegemony', 'Social Contract', 'Nozick Entitlement Theory'],
    },
    {
      number: '02',
      title: 'Indian Political Thought & Thinkers',
      subtitle: 'Ancient to Modern Paradigms',
      description: 'Kautilya (Saptanga Theory & Mandal Siddhanta), Ziauddin Barani, Raja Rammohan Roy, Swami Vivekananda, Rabindranath Tagore, Mahatma Gandhi (Swaraj & Satyagraha), B.R. Ambedkar, and M.N. Roy.',
      keyTerms: ['Saptanga Theory', 'Mandal Siddhanta', 'Hind Swaraj', 'Annihilation of Caste', 'Radical Humanism'],
    },
    {
      number: '03',
      title: 'Indian Constitution & Political Institutions',
      subtitle: 'Rights, Federalism & Governance',
      description: 'Constituent Assembly debates, Fundamental Rights vs DPSP, Basic Structure Doctrine (Kesavananda Bharati), Emergency Provisions, Federal Dynamics (Sarkaria & Punchhi Commissions), and Election Commission.',
      keyTerms: ['Kesavananda Bharati 1973', 'Article 21 Judicial Expansions', 'Sarkaria Commission', 'Collegium System'],
    },
    {
      number: '04',
      title: 'International Relations & Global Order',
      subtitle: 'Theories, Security & Indian Foreign Policy',
      description: 'Realism (Morgenthau, Waltz), Liberalism, Constructivism, Feminism, Security Dilemma, Non-Alignment (NAM), Nuclear Doctrine, Act East Policy, Quad, BRICS, and Indo-Pacific Geopolitics.',
      keyTerms: ['Morgenthau 6 Principles', 'Waltz Structural Realism', 'Constructivism (Wendt)', 'Act East Policy'],
    },
  ],
  memoryExample: {
    questionText: "Who formulated the 'Saptanga Theory' of the state with Seven Elements (Swamin, Amatya, Janapada, Durga, Kosha, Danda, Mitra)?",
    questionMeta: "2023 Paper II • Q08",
    connectionTrick: "Kautilya's Arthashastra = (7 Organs of State: King is the Head, Minister is the Eyes)",
    targetRule: "Kautilya in Arthashastra Book VI defines the Saptanga: 1. Swamin 2. Amatya 3. Janapada 4. Durga 5. Kosha 6. Danda 7. Mitra.",
    direction: 'ltr',
  },
  ctaPractice: 'Start Political Science Practice',
  ctaSyllabus: 'Explore 10 Pol Science Units',
  ctaBenchmark: 'Take Free Pol Science Benchmark Exam',
  curriculumBadge: 'Official NTA Political Science Curriculum (10 Units)',
  whySectionTitle: 'Master Political Theory & Governance for JRF',
  whySectionSubtitle: 'From foundational political philosophy to landmark Supreme Court verdicts and international treaties.',
  paywallHighlights: [
    '20+ Years of Solved Political Science Papers (2004–2024)',
    'Complete General Paper 1 Companion Included',
    'Thinkers, Books, Articles & Case-Law Mistake Tracker',
    'Official NTA CBT Mock Simulator with Live Timer',
  ],
  officialSyllabus: politicalScienceSyllabus,
  syllabusSource: politicalScienceSyllabusSource,
};
