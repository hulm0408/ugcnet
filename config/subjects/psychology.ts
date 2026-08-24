import { SubjectConfig } from './types';

export const psychologyConfig: SubjectConfig = {
  code: '04',
  slug: 'psychology',
  name: 'Psychology',
  nativeName: 'मनोविज्ञान एवं संज्ञानात्मक विज्ञान',
  tagline: 'Cognitive Processes • Biological Bases of Behaviour • Psychological Testing & Assessment • Developmental & Social Psychology • Psychopathology & Psychotherapy',
  positioningHeadline: 'Master UGC NET Psychology —',
  positioningHighlight: 'From Neural Pathways to Psychometrics.',
  description: 'Conquer learning paradigms, psychometric test standardization, neurotransmitters, statistical models (ANOVA, Factor Analysis), and clinical therapies with 20+ years of verified NTA questions.',
  theme: {
    primaryColor: '#4C1D95',
    accentColor: '#8B5CF6',
    surfaceGradient: 'from-[#1A0A33] to-[#06020D]',
    fontFamily: 'font-sans',
    scriptDirection: 'ltr',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgPsych" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#260E4A" />
            <stop offset="100%" stop-color="#0A0314" />
          </linearGradient>
          <linearGradient id="violetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#A78BFA" />
            <stop offset="100%" stop-color="#8B5CF6" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgPsych)" stroke="#5B21B6" stroke-width="1.5" />

        <!-- Neural Schema Header -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#130726" stroke="#6D28D9" stroke-width="1.5" />
        <text x="250" y="78" text-anchor="middle" fill="#DDD6FE" font-size="12" font-weight="bold">CLASSICAL & OPERANT CONDITIONING • WORKING MEMORY • PSYCHOMETRIC NORMAL CURVE</text>
        <text x="250" y="98" text-anchor="middle" fill="#A78BFA" font-size="9">Pavlov • Skinner • Baddeley Working Memory • Reliability & Validity Types</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#1B0A36" stroke="url(#violetGrad)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="900">PSYCHOLOGY</text>
        <text x="250" y="227" text-anchor="middle" fill="#A78BFA" font-size="10" font-weight="bold" letter-spacing="1">CODE 04</text>

        <!-- Left Node: Cognitive & Neural -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#0F051E" stroke="#5B21B6" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#DDD6FE" font-size="11" font-weight="bold">Cognitive & Neural</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Limbic System • Synapse</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Atkinson-Shiffrin • Baddeley</text>

        <!-- Right Node: Testing & Clinical -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#0F051E" stroke="#5B21B6" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#DDD6FE" font-size="11" font-weight="bold">Testing & Clinical</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Item Analysis • Cronbach Alpha</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">CBT • DSM-5 / ICD-11</text>

        <path d="M 175 210 L 195 210" stroke="#A78BFA" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#A78BFA" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'Emergence of Psychology & Research Methodology',
      subtitle: 'Paradigms, Statistics & Experimental Designs',
      description: 'Structuralism (Wundt), Functionalism, Gestalt, Psychoanalysis, Between-subjects vs Within-subjects designs, Factorial designs, ANOVA, Non-parametric tests (Mann-Whitney, Kruskal-Wallis), and Factor Analysis (Exploratory vs Confirmatory).',
      keyTerms: ['Factorial Design 2x2', 'ANOVA F-Ratio', 'Kruskal-Wallis H Test', 'Cronbach Alpha'],
    },
    {
      number: '02',
      title: 'Biological Bases of Behaviour & Perception',
      subtitle: 'Neurons, Brain & Sensory Systems',
      description: 'Action potential generation, Neurotransmitters (Dopamine, Serotonin, GABA, Acetylcholine), Hemispheric lateralization, Limbic system (Amygdala, Hippocampus), Signal Detection Theory (d-prime & beta), and Gestalt Laws of perceptual organization.',
      keyTerms: ['Signal Detection Theory d-prime', 'Action Potential Depolarization', 'Hippocampus Consolidation', 'Gestalt Pragnanz'],
    },
    {
      number: '03',
      title: 'Learning, Memory, Cognition & Intelligence',
      subtitle: 'Conditioning, Information Processing & Theories',
      description: 'Classical Conditioning (Extinction, Spontaneous Recovery), Operant Schedules (FR, VR, FI, VI), Baddeley Working Memory model (Phonological Loop, Visuospatial Sketchpad, Central Executive, Episodic Buffer), and Intelligence (Cattell Gf-Gc, Sternberg Triarchic).',
      keyTerms: ['Baddeley Working Memory', 'Variable Ratio Reinforcement', 'Cattell Fluid vs Crystallized', 'Sternberg Triarchic'],
    },
    {
      number: '04',
      title: 'Psychological Testing & Clinical Interventions',
      subtitle: 'Standardization, Psychopathology & Therapies',
      description: 'Item Difficulty & Discrimination Index, Reliability types (Test-Retest, Split-Half, Cronbach Alpha), Validity (Construct, Criterion, Content), DSM-5 diagnostic criteria for Mood and Anxiety disorders, and Beck Cognitive Behaviour Therapy (CBT).',
      keyTerms: ['Item Discrimination (D-Index)', 'Construct Validity', 'Beck Cognitive Triad', 'Rational Emotive Behaviour (REBT)'],
    },
  ],
  memoryExample: {
    questionText: "In Signal Detection Theory (SDT), what does 'd-prime' (d') measure?",
    questionMeta: "2023 Paper II • Q26",
    connectionTrick: "d-prime (d') = (Sensitivity / Discriminability between signal and noise; whereas beta is the response criterion/bias)",
    targetRule: "In SDT, d' (d-prime) measures perceptual sensitivity (distance between noise and signal+noise distributions), while beta (β) reflects decision criteria.",
    direction: 'ltr',
  },
  ctaPractice: 'Start Psychology Practice',
  ctaSyllabus: 'Explore 10 Psychology Units',
  ctaBenchmark: 'Take Free Psychology Benchmark Exam',
  curriculumBadge: 'Official NTA Psychology Curriculum (10 Units)',
  whySectionTitle: 'Precision Psychometrics for Psychology JRF',
  whySectionSubtitle: 'From neurobiological mechanisms to cognitive information processing, psychometric formulas, and clinical diagnostic criteria.',
  paywallHighlights: [
    '20+ Years of Solved Psychology Papers (2004–2024)',
    'Complete General Paper 1 Companion Included',
    'Psychometric Formulas, Statistics & Theories Tracker',
    'Official NTA CBT Mock Simulator with Countdown Timer',
  ],
};
