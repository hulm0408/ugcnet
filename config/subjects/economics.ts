import { SubjectConfig } from './types';
import { economicsSyllabus, economicsSyllabusSource } from '../../data/syllabus/economics';

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
            <stop offset="0%" stop-color="#02150F" />
            <stop offset="100%" stop-color="#010A07" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#065F46" stroke-width="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgEcon)" />
        <rect width="500" height="360" rx="20" fill="url(#grid)" />
        
        <!-- Subject Title -->
        <text x="30" y="40" fill="#10B981" font-size="18" font-weight="900" letter-spacing="1">ECONOMICS</text>
        <text x="30" y="58" fill="#A7F3D0" font-size="12">MACROECONOMIC EQUILIBRIUM</text>

        <!-- Axes -->
        <!-- Y Axis -->
        <path d="M 70 300 L 70 80" stroke="#A7F3D0" stroke-width="2" fill="none" marker-end="url(#arrowEcon)" />
        <!-- X Axis -->
        <path d="M 70 300 L 440 300" stroke="#A7F3D0" stroke-width="2" fill="none" marker-end="url(#arrowEcon)" />
        
        <defs>
          <marker id="arrowEcon" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#A7F3D0" />
          </marker>
        </defs>

        <!-- Axis Labels -->
        <text x="450" y="315" fill="#A7F3D0" font-size="12" font-weight="bold">Y (Output/Income)</text>
        <text x="50" y="70" fill="#A7F3D0" font-size="12" font-weight="bold" text-anchor="middle">r</text>
        <text x="30" y="190" fill="#A7F3D0" font-size="10" transform="rotate(-90, 30, 190)" text-anchor="middle">(Interest Rate)</text>

        <!-- IS Curve (Downward) -->
        <path d="M 120 120 C 200 180, 280 240, 380 280" fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" />
        <text x="390" y="275" fill="#F59E0B" font-size="12" font-weight="bold">IS</text>
        <text x="300" y="140" fill="#F59E0B" font-size="10">IS: Y = C + I(r) + G</text>

        <!-- LM Curve (Upward) -->
        <path d="M 120 270 C 200 240, 280 180, 380 110" fill="none" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" />
        <text x="390" y="115" fill="#3B82F6" font-size="12" font-weight="bold">LM</text>
        <text x="140" y="170" fill="#3B82F6" font-size="10">LM: M/P = L(r,Y)</text>

        <!-- Equilibrium Point -->
        <circle cx="240" cy="210" r="5" fill="#10B981" />
        <text x="250" y="200" fill="#10B981" font-size="14" font-weight="bold">E*</text>

        <!-- Dashed Lines -->
        <path d="M 70 210 L 240 210" fill="none" stroke="#10B981" stroke-width="1.5" stroke-dasharray="5,5" />
        <path d="M 240 300 L 240 210" fill="none" stroke="#10B981" stroke-width="1.5" stroke-dasharray="5,5" />

        <!-- Equilibrium Labels -->
        <text x="50" y="215" fill="#10B981" font-size="12" font-weight="bold">r*</text>
        <text x="235" y="320" fill="#10B981" font-size="12" font-weight="bold">Y*</text>

        <!-- Small Demand-Supply Cross in Corner -->
        <g transform="translate(380, 30)">
          <rect width="90" height="70" rx="4" fill="#041D15" stroke="#065F46" stroke-width="1" />
          <path d="M 20 15 L 70 55" stroke="#F43F5E" stroke-width="1.5" />
          <path d="M 20 55 L 70 15" stroke="#34D399" stroke-width="1.5" />
          <text x="75" y="60" fill="#F43F5E" font-size="8">D</text>
          <text x="75" y="20" fill="#34D399" font-size="8">S</text>
          <circle cx="45" cy="35" r="2" fill="#FFFFFF" />
        </g>
      </svg>
    `,
    visualConcept: 'IS-LM equilibrium curve plot with coordinate axes and intersection point',
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
  officialSyllabus: economicsSyllabus,
  syllabusSource: economicsSyllabusSource,
};
