import { SubjectConfig } from './types';

export const economicsConfig: SubjectConfig = {
  code: '01',
  slug: 'economics',
  name: 'Economics',
  nativeName: 'अर्थशास्त्र एवं आर्थिक विश्लेषण',
  tagline: 'Microeconomics • Macroeconomics • Econometrics & Statistics • Public Finance • International Trade • Growth & Development',
  positioningHeadline: 'Master UGC NET Economics —',
  positioningHighlight: 'From Micro Foundations to Econometric Modeling.',
  description: 'Master general equilibrium, IS-LM frameworks, econometric estimation, public finance, and trade models with 20+ years of verified NTA questions.',
  theme: {
    primaryColor: '#065F46',
    accentColor: '#10B981',
    surfaceGradient: 'from-[#041D15] to-[#010B08]',
    fontFamily: 'font-sans',
    scriptDirection: 'ltr',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgEcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#062E22" />
            <stop offset="100%" stop-color="#020E0A" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#34D399" />
            <stop offset="100%" stop-color="#10B981" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgEcon)" stroke="#065F46" stroke-width="1.5" />

        <!-- IS-LM & Equilibrium Header -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#041A13" stroke="#047857" stroke-width="1.5" />
        <text x="75" y="80" fill="#34D399" font-size="11" font-weight="bold">IS-LM EQUILIBRIUM: Y = C(Y-T) + I(r) + G • M/P = L(r, Y)</text>
        <text x="75" y="98" fill="#6EE7B7" font-size="10">Slutsky Equation • Solow-Swan Steady State: sf(k) = (n+g+δ)k</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#06372A" stroke="url(#greenGrad)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="900">ECONOMICS</text>
        <text x="250" y="227" text-anchor="middle" fill="#34D399" font-size="10" font-weight="bold" letter-spacing="1">CODE 01</text>

        <!-- Left Node: Micro & Macro -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#031A12" stroke="#065F46" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="bold">Micro & Macro</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Pareto Optimality • Cournot</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Mundell-Fleming • Phillips</text>

        <!-- Right Node: Econometrics & Trade -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#031A12" stroke="#065F46" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="bold">Econometrics & Trade</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">OLS • Heteroscedasticity</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Heckscher-Ohlin • Leontief</text>

        <path d="M 175 210 L 195 210" stroke="#34D399" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#34D399" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'Microeconomic Analysis & Game Theory',
      subtitle: 'Consumer Behavior & Market Structures',
      description: 'Consumer equilibrium (Hicksian vs Slutsky substitution effect), Production functions (Cobb-Douglas, CES), Market structures (Monopoly, Cournot, Bertrand, Stackelberg), General equilibrium, and Nash Equilibrium.',
      keyTerms: ['Slutsky Substitution', 'Pareto Efficiency', 'Cournot Duopoly', 'Nash Equilibrium', 'Euler Exhaustion Theorem'],
    },
    {
      number: '02',
      title: 'Macroeconomics & Monetary Policy',
      subtitle: 'Output, Inflation & Policy Frameworks',
      description: 'Classical vs Keynesian models, IS-LM framework, Mundell-Fleming open economy model, Rational Expectations hypothesis (Lucas Critique), Phillips Curve trade-off, and Taylor Rule for monetary policy.',
      keyTerms: ['IS-LM Multiplier', 'Lucas Critique', 'Mundell-Fleming Trilemma', 'Augmented Phillips Curve'],
    },
    {
      number: '03',
      title: 'Statistics & Econometric Methods',
      subtitle: 'Estimation, Hypothesis & Diagnostic Tests',
      description: 'Classical Linear Regression Model (CLRM), Gauss-Markov theorem (BLUE properties), Multicollinearity (VIF), Heteroscedasticity (White test, Goldfeld-Quandt), Autocorrelation (Durbin-Watson), and Unit Root tests.',
      keyTerms: ['Gauss-Markov BLUE', 'Durbin-Watson Test', 'Heteroscedasticity', 'Dickey-Fuller Unit Root'],
    },
    {
      number: '04',
      title: 'International Trade & Development Economics',
      subtitle: 'Theories, Balance of Payments & Growth',
      description: 'Ricardian comparative advantage, Heckscher-Ohlin-Samuelson theory, Leontief Paradox, Tariffs vs Quotas, Solow-Swan growth model, Harrod-Domar instability, and Endogenous Growth models (Romer, Lucas).',
      keyTerms: ['Heckscher-Ohlin Factor Price', 'Leontief Paradox', 'Solow Golden Rule', 'Harrod-Domar Warranted Rate'],
    },
  ],
  memoryExample: {
    questionText: "What empirical finding contradicted the Heckscher-Ohlin theorem by showing that US exports were more labor-intensive than its imports?",
    questionMeta: "2023 Paper II • Q21",
    connectionTrick: "Leontief Paradox = (L = Labor exported by capital-abundant US in 1947 data)",
    targetRule: "Wassily Leontief (1953) showed that despite US being capital abundant, US exports embodied more labor relative to capital than US imports, known as the Leontief Paradox.",
    direction: 'ltr',
  },
  ctaPractice: 'Start Economics Practice',
  ctaSyllabus: 'Explore 10 Economics Units',
  ctaBenchmark: 'Take Free Economics Benchmark Exam',
  curriculumBadge: 'Official NTA Economics Curriculum (10 Units)',
  whySectionTitle: 'Master Economic Theory & Econometrics for JRF',
  whySectionSubtitle: 'From microeconomic optimization to macroeconomic stabilization models and OLS regression diagnostics.',
  paywallHighlights: [
    '20+ Years of Solved Economics Papers (2004–2024)',
    'Complete General Paper 1 Companion Included',
    'Econometric Formula & Model Diagnostic Tracker',
    'Official NTA CBT Mock Simulator with Countdown Timer',
  ],
};
