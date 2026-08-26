import { SubjectConfig } from './types';
import { commerceSyllabus, commerceSyllabusSource } from '../../data/syllabus/commerce';

export const commerceConfig: SubjectConfig = {
  code: '08',
  slug: 'commerce',
  name: 'Commerce',
  nativeName: 'वाणिज्य एवं वित्तीय अध्ययन',
  tagline: 'Accounting & Auditing • Corporate Finance • Income Tax & MAT • Banking & Capital Markets',
  positioningHeadline: 'Master UGC NET Commerce —',
  positioningHighlight: 'Concept-Driven JRF Prep.',
  description: 'Master AS/Ind-AS accounting standards, capital budgeting algorithms, income tax deductions, and corporate governance with 20+ years of verified NTA PYQs.',
  theme: {
    primaryColor: '#1E3A8A',
    accentColor: '#06B6D4',
    surfaceGradient: 'from-[#0B1528] to-[#030712]',
    fontFamily: 'font-sans',
    scriptDirection: 'ltr',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgCom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0B1528" />
            <stop offset="100%" stop-color="#1E3A8A" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="10" fill="url(#bgCom)" />
        
        <text x="250" y="30" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="900" letter-spacing="1">COMMERCE</text>

        <!-- Balance Sheet Equation -->
        <rect x="50" y="45" width="400" height="35" rx="5" fill="#1E40AF" stroke="#06B6D4" stroke-width="1.5" opacity="0.8"/>
        <text x="250" y="68" text-anchor="middle" fill="#06B6D4" font-size="12" font-weight="bold">ASSETS = LIABILITIES + EQUITY</text>

        <!-- T-Account Ledger -->
        <rect x="50" y="100" width="400" height="150" rx="5" fill="#0F172A" stroke="#06B6D4" stroke-width="2"/>
        <line x1="250" y1="100" x2="250" y2="250" stroke="#06B6D4" stroke-width="2"/>
        <line x1="50" y1="130" x2="450" y2="130" stroke="#06B6D4" stroke-width="2"/>
        
        <text x="150" y="120" text-anchor="middle" fill="#38BDF8" font-size="12" font-weight="bold">DR. (DEBIT)</text>
        <text x="350" y="120" text-anchor="middle" fill="#38BDF8" font-size="12" font-weight="bold">CR. (CREDIT)</text>
        
        <text x="70" y="155" fill="#E2E8F0" font-size="10">Cash A/c</text>
        <text x="220" y="155" fill="#94A3B8" font-size="10">15,000</text>
        
        <text x="70" y="175" fill="#E2E8F0" font-size="10">Machinery A/c</text>
        <text x="220" y="175" fill="#94A3B8" font-size="10">45,000</text>
        
        <text x="270" y="155" fill="#E2E8F0" font-size="10">Capital A/c</text>
        <text x="420" y="155" fill="#94A3B8" font-size="10">40,000</text>
        
        <text x="270" y="175" fill="#E2E8F0" font-size="10">Bank Loan A/c</text>
        <text x="420" y="175" fill="#94A3B8" font-size="10">20,000</text>

        <!-- Financial Ratio Gauge -->
        <path d="M 120 330 A 40 40 0 0 1 200 330" fill="none" stroke="#1E40AF" stroke-width="8"/>
        <path d="M 120 330 A 40 40 0 0 1 180 300" fill="none" stroke="#06B6D4" stroke-width="8"/>
        <circle cx="160" cy="330" r="4" fill="#FFFFFF"/>
        <line x1="160" y1="330" x2="175" y2="305" stroke="#FFFFFF" stroke-width="2"/>
        <text x="160" y="350" text-anchor="middle" fill="#94A3B8" font-size="10">ROE GAUGE</text>

        <!-- Bar Chart Trend -->
        <rect x="320" y="310" width="15" height="30" fill="#1E40AF"/>
        <rect x="345" y="290" width="15" height="50" fill="#38BDF8"/>
        <rect x="370" y="270" width="15" height="70" fill="#06B6D4"/>
        <text x="352" y="355" text-anchor="middle" fill="#94A3B8" font-size="10">NET PROFIT TREND</text>
      </svg>
    `,
    visualConcept: 'Double-entry T-account ledger with financial ratio gauge and balance sheet equation',
  },
  pillars: [
    {
      number: '01',
      title: 'Accounting & Corporate Reporting',
      subtitle: 'Financial, Cost & Ind-AS',
      description: 'Holding company consolidation, cash flow statements (AS-3), standard costing variances, and forensic auditing.',
      keyTerms: ['Ind-AS 115', 'Cash Flow AS-3', 'Holding Company', 'Materiality Principle'],
    },
    {
      number: '02',
      title: 'Business Finance & Capital Budgeting',
      subtitle: 'Valuation & Risk Modeling',
      description: 'Weighted Average Cost of Capital (WACC), MM Hypothesis, CAPM model, Gordon & Walter dividend theories.',
      keyTerms: ['WACC', 'MM Hypothesis', 'CAPM', 'Gordon Model'],
    },
    {
      number: '03',
      title: 'Income Tax & Corporate Tax Planning',
      subtitle: 'Assessment & Transfer Pricing',
      description: 'Residential status determinations, Chapter VI-A deductions, Minimum Alternate Tax (MAT Sec 115JB), and TDS.',
      keyTerms: ['Sec 80C to 80U', 'MAT Sec 115JB', 'Arm Length Price', 'Advance Tax'],
    },
    {
      number: '04',
      title: 'Banking & Financial Institutions',
      subtitle: 'Monetary Systems & Basel Norms',
      description: 'RBI monetary policy tools, Basel III capital adequacy ratios, NPA provisioning, SEBI guidelines, and derivatives.',
      keyTerms: ['Basel III CAR', 'Repo Rate', 'Insolvency Code (IBC)', 'SEBI Listing Norms'],
    },
  ],
  memoryExample: {
    questionText: "Which dividend valuation model assumes constant Return on Investment (r) and Cost of Capital (k)?",
    questionMeta: "2023 Paper II • Q28",
    connectionTrick: "Walter's Model = (W = Wealth dependent on r vs k relationship)",
    targetRule: "Walter Model assumes r and k are constant and firm has perpetual life with all equity financing.",
    direction: 'ltr',
  },
  ctaPractice: 'Start Commerce Practice',
  ctaSyllabus: 'Explore 10 Commerce Units',
  ctaBenchmark: 'Take Free Commerce Benchmark Exam',
  curriculumBadge: 'Official NTA Commerce Curriculum (10 Units)',
  whySectionTitle: 'Designed for High Scores in Commerce JRF',
  whySectionSubtitle: 'Clear conceptual breakdowns of AS/Ind-AS, capital budgeting formulas, and latest tax slabs.',
  paywallHighlights: [
    '20+ Years of Solved Commerce Papers (2004–2024)',
    'Complete General Paper 1 Companion Included',
    'Numerical Formula & Concept Diagnostic Tracker',
    'Official NTA CBT Mock Simulator with Timer',
  ],
  officialSyllabus: commerceSyllabus,
  syllabusSource: commerceSyllabusSource,
};
