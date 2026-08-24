import { SubjectConfig } from './types';

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
          <linearGradient id="bgCommerce" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#020617" />
          </linearGradient>
          <linearGradient id="blueCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#3B82F6" />
            <stop offset="100%" stop-color="#06B6D4" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgCommerce)" stroke="#1E3A8A" stroke-width="1.5" />

        <!-- Financial Flow / Ledger Silhouette -->
        <rect x="50" y="60" width="400" height="60" rx="10" fill="#1E293B" stroke="#334155" stroke-width="1" />
        <text x="75" y="95" fill="#38BDF8" font-size="12" font-weight="bold">ASSETS = LIABILITIES + EQUITY</text>
        <text x="320" y="95" fill="#34D399" font-size="12" font-weight="bold">WACC = Ke(We) + Kd(Wd)</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="215" r="55" fill="#1E293B" stroke="url(#blueCyan)" stroke-width="2.5" />
        <text x="250" y="210" text-anchor="middle" fill="#FFFFFF" font-size="17" font-weight="900">COMMERCE</text>
        <text x="250" y="232" text-anchor="middle" fill="#38BDF8" font-size="10" font-weight="bold" letter-spacing="1">CODE 08</text>

        <!-- Left Node: Ind-AS & Tax -->
        <rect x="50" y="170" width="125" height="90" rx="12" fill="#0F172A" stroke="#1E3A8A" stroke-width="1" />
        <text x="112" y="200" text-anchor="middle" fill="#38BDF8" font-size="11" font-weight="bold">Accounting & Tax</text>
        <text x="112" y="220" text-anchor="middle" fill="#CBD5E1" font-size="9">Ind-AS 115 • AS-3</text>
        <text x="112" y="238" text-anchor="middle" fill="#94A3B8" font-size="8">MAT Sec 115JB • Transfer Pr.</text>

        <!-- Right Node: Finance & Banking -->
        <rect x="325" y="170" width="125" height="90" rx="12" fill="#0F172A" stroke="#1E3A8A" stroke-width="1" />
        <text x="387" y="200" text-anchor="middle" fill="#38BDF8" font-size="11" font-weight="bold">Finance & Banking</text>
        <text x="387" y="220" text-anchor="middle" fill="#CBD5E1" font-size="9">Cap. Budgeting • MM Hyp.</text>
        <text x="387" y="238" text-anchor="middle" fill="#94A3B8" font-size="8">Basel III • RBI Repos</text>

        <path d="M 175 215 L 195 215" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 215 L 325 215" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
      </svg>
    `,
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
};
