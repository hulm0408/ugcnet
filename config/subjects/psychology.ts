import { SubjectConfig } from './types';
import { psychologySyllabus, psychologySyllabusSource } from '../../data/syllabus/psychology';

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
    visualConcept: 'Brain hemisphere silhouette with labeled cognitive regions, neural pathways, and psychometric bell curve',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgPsych" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E1B4B" />
            <stop offset="100%" stop-color="#312E81" />
          </linearGradient>
          <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4338CA" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#3730A3" stop-opacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgPsych)" stroke="#4F46E5" stroke-width="1.5" />

        <!-- Brain Profile Silhouette -->
        <path d="M 230 50 C 320 50 370 90 380 150 C 390 220 340 270 280 270 C 230 270 200 240 180 270 C 140 250 130 180 160 120 C 180 80 200 50 230 50 Z" fill="url(#brainGrad)" stroke="#6366F1" stroke-width="2" />
        
        <!-- Brain Regions & Labels -->
        <!-- Frontal Lobe (Executive) -->
        <path d="M 230 50 C 270 50 310 70 330 120 C 330 160 280 160 250 160 C 220 160 170 120 160 120 C 180 80 200 50 230 50 Z" fill="#4F46E5" opacity="0.4" />
        <text x="240" y="100" fill="#C7D2FE" font-size="11" font-weight="bold" text-anchor="middle">Frontal</text>
        <text x="240" y="112" fill="#A5B4FC" font-size="8" text-anchor="middle">Executive</text>

        <!-- Parietal Lobe (Spatial) -->
        <path d="M 310 70 C 350 70 370 110 380 150 C 380 180 340 180 310 180 C 280 180 270 120 310 70 Z" fill="#6366F1" opacity="0.4" />
        <text x="330" y="140" fill="#C7D2FE" font-size="11" font-weight="bold" text-anchor="middle">Parietal</text>
        <text x="330" y="152" fill="#A5B4FC" font-size="8" text-anchor="middle">Spatial</text>

        <!-- Occipital Lobe (Vision) -->
        <path d="M 380 150 C 390 200 370 230 340 250 C 320 250 310 180 340 180 C 360 180 370 150 380 150 Z" fill="#818CF8" opacity="0.4" />
        <text x="350" y="210" fill="#C7D2FE" font-size="11" font-weight="bold" text-anchor="middle">Occipital</text>
        <text x="350" y="222" fill="#A5B4FC" font-size="8" text-anchor="middle">Vision</text>

        <!-- Temporal Lobe (Memory/Language) -->
        <path d="M 220 160 C 280 160 320 180 320 220 C 320 260 280 270 240 270 C 200 270 180 230 220 160 Z" fill="#3730A3" opacity="0.5" />
        <text x="260" y="210" fill="#C7D2FE" font-size="11" font-weight="bold" text-anchor="middle">Temporal</text>
        <text x="260" y="222" fill="#A5B4FC" font-size="8" text-anchor="middle">Memory/Language</text>

        <!-- Neural Pathway Branches -->
        <g fill="none" stroke="#A5B4FC" stroke-width="1.5" opacity="0.7">
          <path d="M 240 160 Q 260 130 280 140 T 310 120" />
          <path d="M 280 140 Q 290 170 330 190" />
          <path d="M 240 160 Q 230 190 260 230" />
          <path d="M 260 230 Q 300 240 330 230" />
        </g>
        
        <!-- Pathway Nodes -->
        <circle cx="240" cy="160" r="4" fill="#E0E7FF" />
        <circle cx="280" cy="140" r="3" fill="#E0E7FF" />
        <circle cx="310" cy="120" r="3" fill="#E0E7FF" />
        <circle cx="330" cy="190" r="3" fill="#E0E7FF" />
        <circle cx="260" cy="230" r="4" fill="#E0E7FF" />
        <circle cx="330" cy="230" r="3" fill="#E0E7FF" />

        <!-- Psychometric Gaussian Normal Curve (Bottom Left) -->
        <g transform="translate(30, 240)">
          <line x1="0" y1="80" x2="160" y2="80" stroke="#6366F1" stroke-width="1.5" />
          <path d="M 10 80 Q 40 80 60 40 T 80 10 T 100 40 T 150 80" fill="none" stroke="#A5B4FC" stroke-width="2" />
          <!-- Mean line -->
          <line x1="80" y1="10" x2="80" y2="80" stroke="#818CF8" stroke-width="1" stroke-dasharray="3,3" />
          <text x="80" y="95" fill="#C7D2FE" font-size="9" text-anchor="middle">μ</text>
          <!-- Signal Detection markers -->
          <line x1="100" y1="40" x2="100" y2="80" stroke="#818CF8" stroke-width="1" stroke-dasharray="2,2" />
          <text x="100" y="95" fill="#C7D2FE" font-size="9" text-anchor="middle">Signal</text>
          <text x="80" y="110" fill="#E0E7FF" font-size="10" font-weight="bold" text-anchor="middle">Normal Distribution</text>
        </g>

        <!-- Stimulus-Response Diagram (Top Left) -->
        <g transform="translate(30, 50)">
          <rect x="0" y="0" width="30" height="20" rx="4" fill="#3730A3" stroke="#818CF8" />
          <text x="15" y="14" fill="#E0E7FF" font-size="10" text-anchor="middle">S</text>
          
          <!-- Ensure marker-end isn't missing an arrow def, but skipping the def and just drawing simple arrow is safer -->
          <path d="M 35 10 L 65 10" fill="none" stroke="#818CF8" stroke-width="2" />
          <polygon points="60,6 68,10 60,14" fill="#818CF8" />
          
          <rect x="70" y="0" width="30" height="20" rx="4" fill="#3730A3" stroke="#818CF8" />
          <text x="85" y="14" fill="#E0E7FF" font-size="10" text-anchor="middle">R</text>
          
          <text x="50" y="35" fill="#A5B4FC" font-size="8" text-anchor="middle">Conditioning</text>
        </g>

        <!-- Subject Title -->
        <text x="470" y="335" fill="#FFFFFF" font-size="18" font-weight="900" text-anchor="end">PSYCHOLOGY (04)</text>
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
  officialSyllabus: psychologySyllabus,
  syllabusSource: psychologySyllabusSource,
};
