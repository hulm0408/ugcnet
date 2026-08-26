import { SubjectConfig } from './types';
import { managementSyllabus, managementSyllabusSource } from '../../data/syllabus/management';

export const managementConfig: SubjectConfig = {
  code: '17',
  slug: 'management',
  name: 'Management',
  nativeName: 'प्रबंधन एवं व्यावसायिक प्रशासन',
  tagline: 'Strategic Management & Decision Sciences • Organisational Behaviour & HRM • Financial Management & Derivatives • Marketing Management • Operations & Supply Chain',
  positioningHeadline: 'Master UGC NET Management —',
  positioningHighlight: 'Case Studies, Strategy & Corporate Analytics.',
  description: 'Master Michael Porter 5 Forces, BCG Matrix, CAPM, Black-Scholes Option Pricing, Consumer Behavior models, Six Sigma, and Supply Chain frameworks with 20+ years of verified NTA questions.',
  theme: {
    primaryColor: '#1E40AF',
    accentColor: '#3B82F6',
    surfaceGradient: 'from-[#0A1A40] to-[#020614]',
    fontFamily: 'font-sans',
    scriptDirection: 'ltr',
    visualConcept: 'Porter 5 Forces diamond with directional pressure arrows and BCG matrix corner',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgMgmt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#020617" />
            <stop offset="100%" stop-color="#0F172A" />
          </linearGradient>
          <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E3A8A" />
            <stop offset="100%" stop-color="#1E40AF" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgMgmt)" stroke="#1E40AF" stroke-width="1.5" />
        
        <!-- BCG Matrix in Corner (Top Right) -->
        <rect x="370" y="30" width="80" height="80" fill="#0F172A" stroke="#3B82F6" stroke-width="1" />
        <line x1="410" y1="30" x2="410" y2="110" stroke="#3B82F6" stroke-width="1" stroke-dasharray="2,2" />
        <line x1="370" y1="70" x2="450" y2="70" stroke="#3B82F6" stroke-width="1" stroke-dasharray="2,2" />
        <text x="390" y="55" text-anchor="middle" fill="#93C5FD" font-size="12">★</text>
        <text x="430" y="55" text-anchor="middle" fill="#93C5FD" font-size="12">?</text>
        <text x="390" y="95" text-anchor="middle" fill="#93C5FD" font-size="12">$</text>
        <text x="430" y="95" text-anchor="middle" fill="#93C5FD" font-size="10">Dog</text>

        <!-- Main Title -->
        <text x="250" y="50" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="900" letter-spacing="2">MANAGEMENT</text>
        <text x="250" y="70" text-anchor="middle" fill="#60A5FA" font-size="12" font-weight="bold" letter-spacing="1">PORTER'S 5 FORCES</text>

        <!-- Pentagon/Diamond shape for 5 Forces -->
        <!-- Center Box: Industry Rivalry -->
        <rect x="180" y="160" width="140" height="70" rx="4" fill="url(#diamondGrad)" stroke="#60A5FA" stroke-width="2" />
        <text x="250" y="195" text-anchor="middle" fill="#DBEAFE" font-size="12" font-weight="bold">INDUSTRY</text>
        <text x="250" y="215" text-anchor="middle" fill="#DBEAFE" font-size="11">RIVALRY</text>

        <!-- Top: New Entrants -->
        <text x="250" y="105" text-anchor="middle" fill="#93C5FD" font-size="11" font-weight="bold">THREAT OF NEW ENTRANTS</text>
        <path d="M 250 115 L 250 150" stroke="#3B82F6" stroke-width="2" />
        <polygon points="246,146 254,146 250,154" fill="#3B82F6" />

        <!-- Bottom: Substitutes -->
        <text x="250" y="305" text-anchor="middle" fill="#93C5FD" font-size="11" font-weight="bold">THREAT OF SUBSTITUTES</text>
        <path d="M 250 280 L 250 240" stroke="#3B82F6" stroke-width="2" />
        <polygon points="246,244 254,244 250,236" fill="#3B82F6" />

        <!-- Left: Suppliers -->
        <text x="80" y="195" text-anchor="middle" fill="#93C5FD" font-size="11" font-weight="bold">BARGAINING</text>
        <text x="80" y="210" text-anchor="middle" fill="#93C5FD" font-size="11" font-weight="bold">POWER OF</text>
        <text x="80" y="225" text-anchor="middle" fill="#93C5FD" font-size="11" font-weight="bold">SUPPLIERS</text>
        <path d="M 130 195 L 170 195" stroke="#3B82F6" stroke-width="2" />
        <polygon points="166,191 166,199 174,195" fill="#3B82F6" />

        <!-- Right: Buyers -->
        <text x="420" y="195" text-anchor="middle" fill="#93C5FD" font-size="11" font-weight="bold">BARGAINING</text>
        <text x="420" y="210" text-anchor="middle" fill="#93C5FD" font-size="11" font-weight="bold">POWER OF</text>
        <text x="420" y="225" text-anchor="middle" fill="#93C5FD" font-size="11" font-weight="bold">BUYERS</text>
        <path d="M 370 195 L 330 195" stroke="#3B82F6" stroke-width="2" />
        <polygon points="334,191 334,199 326,195" fill="#3B82F6" />
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'Management Principles & OB / HRM',
      subtitle: 'Leadership, Motivation & Culture',
      description: 'Fayol 14 principles, Taylor Scientific Management, Motivation theories (Herzberg Two-Factor, Vroom Expectancy, McClelland 3 Needs), Leadership styles (Blake & Mouton Managerial Grid, Fiedler Contingency), and Strategic HRM.',
      keyTerms: ['Herzberg Hygiene vs Motivators', 'Vroom Expectancy Theory (VIE)', 'Blake-Mouton Grid (9,9 Team)', 'Fiedler LPC Scale'],
    },
    {
      number: '02',
      title: 'Strategic Management & Decision Sciences',
      subtitle: 'Competitive Advantage & Frameworks',
      description: 'Michael Porter Five Forces & Generic Strategies (Cost Leadership, Differentiation, Focus), BCG Growth-Share Matrix, GE/McKinsey 9-Cell Matrix, Ansoff Growth Matrix, Value Chain Analysis, and Balanced Scorecard (Kaplan & Norton).',
      keyTerms: ['Porter 5 Forces', 'BCG Matrix Relative Market Share', 'Kaplan-Norton Balanced Scorecard', 'Ansoff Matrix'],
    },
    {
      number: '03',
      title: 'Marketing Management & Consumer Insights',
      subtitle: 'STP, Branding & Digital Dynamics',
      description: 'Segmentation, Targeting & Positioning (STP), Philip Kotler 4Ps/7Ps, Customer Lifetime Value (CLV), Brand Equity models (Aaker, Keller CBBE), Product Life Cycle (PLC) strategies, and Service Quality (SERVQUAL 5 dimensions).',
      keyTerms: ['Keller CBBE Pyramid', 'SERVQUAL (RATER)', 'Product Life Cycle 4 Stages', 'Brand Architecture'],
    },
    {
      number: '04',
      title: 'Financial Management & Operations Research',
      subtitle: 'Valuation, Derivatives & Supply Chain',
      description: 'Capital structure theories (NI, NOI, MM with/without taxes), CAPM model, Option Pricing (Black-Scholes & Binomial), PERT (Beta distribution expected time) vs CPM (deterministic), EOQ inventory, and Six Sigma DMAIC.',
      keyTerms: ['Black-Scholes Option Pricing', 'PERT Expected Time te = (o+4m+p)/6', 'Six Sigma 3.4 DPMO', 'MM Proposition II'],
    },
  ],
  memoryExample: {
    questionText: "In Project Management (PERT), what is the formula for calculating Expected Activity Time (te)?",
    questionMeta: "2023 Paper II • Q23",
    connectionTrick: "PERT Expected Time Formula = te = (Optimistic + 4 × Most Likely + Pessimistic) / 6",
    targetRule: "In PERT (Beta distribution): te = (a + 4m + b) / 6, and variance σ² = ((b - a) / 6)².",
    direction: 'ltr',
  },
  ctaPractice: 'Start Management Practice',
  ctaSyllabus: 'Explore 10 Management Units',
  ctaBenchmark: 'Take Free Management Benchmark Exam',
  curriculumBadge: 'Official NTA Management Curriculum (10 Units)',
  whySectionTitle: 'Strategic Analytics for Management JRF',
  whySectionSubtitle: 'From organizational leadership and Porter matrix models to financial derivatives and PERT/CPM algorithms.',
  paywallHighlights: [
    '20+ Years of Solved Management Papers (2004–2024)',
    'Complete General Paper 1 Companion Included',
    'Strategy Frameworks, Financial Formulas & OB Tracker',
    'Official NTA CBT Mock Simulator with Countdown Timer',
  ],
  officialSyllabus: managementSyllabus,
  syllabusSource: managementSyllabusSource,
};
