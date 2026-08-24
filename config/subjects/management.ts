import { SubjectConfig } from './types';

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
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgMgmt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0F285C" />
            <stop offset="100%" stop-color="#030A19" />
          </linearGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#60A5FA" />
            <stop offset="100%" stop-color="#3B82F6" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgMgmt)" stroke="#1E40AF" stroke-width="1.5" />

        <!-- Strategic Management Header -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#07193D" stroke="#2563EB" stroke-width="1.5" />
        <text x="250" y="78" text-anchor="middle" fill="#DBEAFE" font-size="12" font-weight="bold">PORTER 5 FORCES • BCG MATRIX (STARS, CASH COWS, DOGS) • CAPM & BLACK-SCHOLES</text>
        <text x="250" y="98" text-anchor="middle" fill="#60A5FA" font-size="9">Kotler 4Ps & STP • Maslow & Herzberg 2-Factor • Six Sigma DMAIC • EOQ Formula</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#0A204C" stroke="url(#blueGrad)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="15" font-weight="900">MANAGEMENT</text>
        <text x="250" y="227" text-anchor="middle" fill="#60A5FA" font-size="10" font-weight="bold" letter-spacing="1">CODE 17</text>

        <!-- Left Node: Strategy & Marketing -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#051433" stroke="#1E40AF" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#93C5FD" font-size="11" font-weight="bold">Strategy & Marketing</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Porter Generic Strategies</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Kotler STP • Brand Equity</text>

        <!-- Right Node: Finance & Operations -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#051433" stroke="#1E40AF" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#93C5FD" font-size="11" font-weight="bold">Finance & Operations</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Capital Budgeting • Black-Scholes</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Six Sigma • CPM & PERT</text>

        <path d="M 175 210 L 195 210" stroke="#60A5FA" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#60A5FA" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
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
};
