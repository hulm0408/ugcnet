import { SubjectConfig, SubjectVisualTheme } from './types';
import { arabicConfig } from './arabic';
import { bengaliConfig } from './bengali';
import { commerceConfig } from './commerce';
import { historyConfig } from './history';
import { politicalScienceConfig } from './political-science';
import { computerScienceConfig } from './computer-science';
import { lawConfig } from './law';
import { economicsConfig } from './economics';
import { englishConfig } from './english';
import { hindiConfig } from './hindi';
import { geographyConfig } from './geography';
import { sociologyConfig } from './sociology';
import { psychologyConfig } from './psychology';
import { paper1Config } from './paper-1';
import { urduConfig } from './urdu';
import { sanskritConfig } from './sanskrit';
import { educationConfig } from './education';
import { managementConfig } from './management';
import { yogaConfig } from './yoga';

export const SUBJECT_REGISTRY: Record<string, SubjectConfig> = {
  'arabic': arabicConfig,
  'bengali': bengaliConfig,
  'commerce': commerceConfig,
  'history': historyConfig,
  'political-science': politicalScienceConfig,
  'computer-science-and-applications': computerScienceConfig,
  'law': lawConfig,
  'economics': economicsConfig,
  'english': englishConfig,
  'hindi': hindiConfig,
  'geography': geographyConfig,
  'sociology': sociologyConfig,
  'psychology': psychologyConfig,
  'paper-1': paper1Config,
  'urdu': urduConfig,
  'sanskrit': sanskritConfig,
  'education': educationConfig,
  'management': managementConfig,
  'yoga': yogaConfig,
};

/**
 * Intelligent Academic Discipline Classifier & Visual Theme Compiler.
 * Ensures that all 85+ subjects receive a distinct visual theme, palette, and semantic SVG.
 */
function buildDynamicDisciplineTheme(slug: string, name: string, code: string, isRtl: boolean, nativeName: string): SubjectVisualTheme {
  const s = slug.toLowerCase();

  // 1. Language & Classical Literature (Tamil, Telugu, Malayalam, Kannada, Punjabi, Odia, Marathi, Gujarati, etc.)
  if (
    s.includes('tamil') ||
    s.includes('telugu') ||
    s.includes('malayalam') ||
    s.includes('kannada') ||
    s.includes('punjabi') ||
    s.includes('odia') ||
    s.includes('marathi') ||
    s.includes('gujarati') ||
    s.includes('assamese') ||
    s.includes('maithili') ||
    s.includes('persian') ||
    s.includes('arab-culture') ||
    s.includes('kashmiri') ||
    s.includes('sindhi') ||
    s.includes('pali') ||
    s.includes('prakrit') ||
    s.includes('linguistics') ||
    s.includes('comparative-literature')
  ) {
    return {
      primaryColor: '#831843',
      accentColor: '#F59E0B',
      surfaceGradient: 'from-[#2C0717] to-[#0A0105]',
      fontFamily: isRtl ? 'font-arabic' : 'font-serif',
      scriptDirection: isRtl ? 'rtl' : 'ltr',
      visualConcept: 'Parchment manuscript with calligraphic quill and literary evolution ribbon',
      heroSvgIllustration: `
        <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
          <defs>
            <linearGradient id="bgLang_${code}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#2D0818" />
              <stop offset="100%" stop-color="#0F0208" />
            </linearGradient>
            <linearGradient id="parchmentGrad_${code}" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#3D1224" />
              <stop offset="100%" stop-color="#220612" />
            </linearGradient>
            <linearGradient id="goldRibbon_${code}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#F59E0B" />
              <stop offset="100%" stop-color="#D97706" />
            </linearGradient>
          </defs>
          <!-- Background -->
          <rect width="500" height="360" rx="20" fill="url(#bgLang_${code})" stroke="#9D174D" stroke-width="1.5" />

          <!-- Unfurled Manuscript Parchment Shape -->
          <path d="M 50 70 Q 250 55 450 70 L 440 270 Q 250 290 60 270 Z" fill="url(#parchmentGrad_${code})" stroke="#BE185D" stroke-width="1.5" />
          
          <!-- Top Discipline Banner -->
          <path d="M 90 90 L 410 90" stroke="#F59E0B" stroke-width="1" stroke-dasharray="4,4" />
          <text x="250" y="115" text-anchor="middle" fill="#FDE68A" font-size="14" font-weight="900" letter-spacing="1.5">${name.toUpperCase()}</text>
          <text x="250" y="133" text-anchor="middle" fill="#F472B6" font-size="10" font-weight="bold">CODE ${code} • OFFICIAL NTA CURRICULUM</text>
          
          <!-- Classical Literary Canon Lines -->
          <g stroke="#9D174D" stroke-width="1" opacity="0.6">
            <line x1="100" y1="160" x2="400" y2="160" />
            <line x1="100" y1="185" x2="400" y2="185" />
            <line x1="100" y1="210" x2="400" y2="210" />
          </g>

          <!-- Literary Taxonomy Pills -->
          <rect x="95" y="150" width="85" height="20" rx="4" fill="#500724" stroke="#F59E0B" stroke-width="1" />
          <text x="137" y="164" text-anchor="middle" fill="#FDE68A" font-size="8" font-weight="bold">Classical Canon</text>

          <rect x="200" y="175" width="100" height="20" rx="4" fill="#500724" stroke="#BE185D" stroke-width="1" />
          <text x="250" y="189" text-anchor="middle" fill="#FBCFE8" font-size="8" font-weight="bold">Poetics &amp; Prosody</text>

          <rect x="320" y="200" width="85" height="20" rx="4" fill="#500724" stroke="#F59E0B" stroke-width="1" />
          <text x="362" y="214" text-anchor="middle" fill="#FDE68A" font-size="8" font-weight="bold">Modern Prose</text>

          <!-- Quill Pen Silhouette -->
          <path d="M 410 80 Q 430 140 440 220 Q 425 210 415 170 Z" fill="url(#goldRibbon_${code})" opacity="0.85" />

          <!-- Bottom Timeline Ribbon -->
          <path d="M 70 300 Q 250 285 430 300 L 420 325 Q 250 310 80 325 Z" fill="#1C030F" stroke="#F59E0B" stroke-width="1" />
          <text x="250" y="316" text-anchor="middle" fill="#FDE68A" font-size="10" font-weight="bold">Ancient Traditions ➔ Medieval Bhakti ➔ Modern Era</text>
        </svg>
      `,
    };
  }

  // 2. Applied Sciences, Environment & Media (Environmental Sciences, Forensic, Electronic, Mass Comm, Library)
  if (
    s.includes('environmental') ||
    s.includes('electronic') ||
    s.includes('forensic') ||
    s.includes('mass-communication') ||
    s.includes('library') ||
    s.includes('disaster') ||
    s.includes('physical-education')
  ) {
    return {
      primaryColor: '#0E7490',
      accentColor: '#06B6D4',
      surfaceGradient: 'from-[#05212B] to-[#010B0E]',
      fontFamily: 'font-sans',
      scriptDirection: 'ltr',
      visualConcept: 'Oscilloscope data bus with coordinate matrix grid and analytical waveform',
      heroSvgIllustration: `
        <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
          <defs>
            <linearGradient id="bgSci_${code}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#041E28" />
              <stop offset="100%" stop-color="#010B0F" />
            </linearGradient>
            <linearGradient id="cyanWave_${code}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#06B6D4" />
              <stop offset="50%" stop-color="#22D3EE" />
              <stop offset="100%" stop-color="#38BDF8" />
            </linearGradient>
          </defs>
          <!-- Background -->
          <rect width="500" height="360" rx="20" fill="url(#bgSci_${code})" stroke="#0E7490" stroke-width="1.5" />

          <!-- Oscilloscope / Scientific Grid -->
          <g stroke="#0E4A5C" stroke-width="0.75" opacity="0.6">
            <line x1="50" y1="100" x2="450" y2="100" />
            <line x1="50" y1="160" x2="450" y2="160" />
            <line x1="50" y1="220" x2="450" y2="220" />
            <line x1="50" y1="280" x2="450" y2="280" />
            <line x1="130" y1="50" x2="130" y2="310" />
            <line x1="210" y1="50" x2="210" y2="310" />
            <line x1="290" y1="50" x2="290" y2="310" />
            <line x1="370" y1="50" x2="370" y2="310" />
          </g>

          <!-- Top Terminal Header -->
          <rect x="50" y="45" width="400" height="40" rx="6" fill="#03161E" stroke="#0891B2" stroke-width="1" />
          <text x="70" y="69" fill="#22D3EE" font-size="11" font-family="monospace" font-weight="bold">> SYSTEM_${code} // ${name.toUpperCase().slice(0, 24)}</text>
          <circle cx="430" cy="65" r="4" fill="#10B981" />

          <!-- Scientific Waveform Path -->
          <path d="M 50 190 Q 110 100 170 190 T 290 190 T 410 190 L 450 190" fill="none" stroke="url(#cyanWave_${code})" stroke-width="3" />
          
          <!-- Sample Data Points / Sensors -->
          <circle cx="170" cy="190" r="5" fill="#22D3EE" stroke="#FFFFFF" stroke-width="1.5" />
          <circle cx="290" cy="190" r="5" fill="#22D3EE" stroke="#FFFFFF" stroke-width="1.5" />
          <circle cx="230" cy="135" r="4" fill="#F59E0B" />
          <text x="230" y="125" text-anchor="middle" fill="#FDE68A" font-size="8" font-family="monospace">PEAK_ANALYSIS</text>

          <!-- Metrics Telemetry Box -->
          <rect x="50" y="240" width="180" height="60" rx="8" fill="#03161E" stroke="#0E7490" stroke-width="1" />
          <text x="65" y="260" fill="#67E8F9" font-size="9" font-family="monospace" font-weight="bold">PROTOCOL: VERIFIED NTA</text>
          <text x="65" y="278" fill="#94A3B8" font-size="8" font-family="monospace">10 Empirical Units • 20+ Yrs</text>

          <rect x="270" y="240" width="180" height="60" rx="8" fill="#03161E" stroke="#0E7490" stroke-width="1" />
          <text x="285" y="260" fill="#67E8F9" font-size="9" font-family="monospace" font-weight="bold">METHODOLOGY: APPLIED</text>
          <text x="285" y="278" fill="#94A3B8" font-size="8" font-family="monospace">Laboratory &amp; Field Analytics</text>
        </svg>
      `,
    };
  }

  // 3. Social Sciences & Humanities (Philosophy, Social Work, Public Admin, Population Studies, Anthropology, Music, Fine Arts)
  return {
    primaryColor: '#7C2D12',
    accentColor: '#EA580C',
    surfaceGradient: 'from-[#2A0E06] to-[#0A0301]',
    fontFamily: 'font-sans',
    scriptDirection: 'ltr',
    visualConcept: 'Pillars of knowledge architectural pediment with foundational theory base',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgSoc_${code}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#260C05" />
            <stop offset="100%" stop-color="#0D0301" />
          </linearGradient>
          <linearGradient id="orangePillar_${code}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#EA580C" />
            <stop offset="100%" stop-color="#9A3412" />
          </linearGradient>
        </defs>
        <!-- Background -->
        <rect width="500" height="360" rx="20" fill="url(#bgSoc_${code})" stroke="#9A3412" stroke-width="1.5" />

        <!-- Classical Pediment (Triangle Roof) -->
        <polygon points="250,55 70,110 430,110" fill="#1C0904" stroke="#EA580C" stroke-width="2" />
        <text x="250" y="95" text-anchor="middle" fill="#FFEDD5" font-size="12" font-weight="900" letter-spacing="2">${name.toUpperCase().slice(0, 20)}</text>

        <!-- Pediment Architrave -->
        <rect x="60" y="110" width="380" height="16" rx="2" fill="#2E0E06" stroke="#C2410C" stroke-width="1" />
        <text x="250" y="122" text-anchor="middle" fill="#FB923C" font-size="8" font-weight="bold" letter-spacing="1">UGC NET CODE ${code} • DISCIPLINE FOUNDATIONS</text>

        <!-- 4 Classical Columns -->
        <!-- Column 1: Classical Theory -->
        <rect x="80" y="130" width="50" height="120" rx="4" fill="url(#orangePillar_${code})" opacity="0.85" />
        <text x="105" y="195" text-anchor="middle" fill="#FFFFFF" font-size="8" font-weight="bold" transform="rotate(-90 105 195)">THEORY</text>

        <!-- Column 2: Thinkers & Paradigms -->
        <rect x="170" y="130" width="50" height="120" rx="4" fill="url(#orangePillar_${code})" opacity="0.85" />
        <text x="195" y="195" text-anchor="middle" fill="#FFFFFF" font-size="8" font-weight="bold" transform="rotate(-90 195 195)">THINKERS</text>

        <!-- Column 3: Methodology -->
        <rect x="280" y="130" width="50" height="120" rx="4" fill="url(#orangePillar_${code})" opacity="0.85" />
        <text x="305" y="195" text-anchor="middle" fill="#FFFFFF" font-size="8" font-weight="bold" transform="rotate(-90 305 195)">METHODS</text>

        <!-- Column 4: Applied / Policy -->
        <rect x="370" y="130" width="50" height="120" rx="4" fill="url(#orangePillar_${code})" opacity="0.85" />
        <text x="395" y="195" text-anchor="middle" fill="#FFFFFF" font-size="8" font-weight="bold" transform="rotate(-90 395 195)">POLICY</text>

        <!-- Classical Stylobate (Base Steps) -->
        <rect x="60" y="255" width="380" height="18" rx="2" fill="#2E0E06" stroke="#C2410C" stroke-width="1" />
        <rect x="45" y="275" width="410" height="22" rx="4" fill="#1C0904" stroke="#EA580C" stroke-width="1.5" />
        <text x="250" y="290" text-anchor="middle" fill="#FFEDD5" font-size="10" font-weight="bold">10 Official Units • 20+ Years Verified NTA Examination Archive</text>
      </svg>
    `,
  };
}

/**
 * Returns complete SubjectConfig for any subject slug.
 * Fast O(1) in-memory lookup with intelligent pedagogical compilation for all 85+ subjects.
 */
export function getSubjectConfig(slug: string, fallbackSubject?: any): SubjectConfig {
  if (SUBJECT_REGISTRY[slug]) {
    return SUBJECT_REGISTRY[slug];
  }

  const name = fallbackSubject?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
  const code = fallbackSubject?.code || '00';
  const nativeName = fallbackSubject?.name_native || name;
  const isRtl = fallbackSubject?.direction === 'rtl';

  const theme = buildDynamicDisciplineTheme(slug, name, code, isRtl, nativeName);

  return {
    code,
    slug,
    name,
    nativeName,
    tagline: `Official 10 Units • Authentic Past Exam Papers • Timed NTA Mock Tests • Mistake Tracker`,
    positioningHeadline: `Master UGC NET ${name} —`,
    positioningHighlight: 'the smart way.',
    description: `Prepare for UGC NET ${name} (Subject Code ${code}) with authentic previous-year questions, 10-unit syllabus exploration, and computer-based mock tests.`,
    theme,
    pillars: [
      {
        number: '01',
        title: `${name} Core Syllabus`,
        subtitle: '10 Structured Units',
        description: `Complete NTA curriculum mapping for all foundational and advanced topics in ${name}.`,
        keyTerms: ['Core Theory', 'Standard Taxonomy', 'Official Curriculum'],
      },
      {
        number: '02',
        title: 'Authentic Past Papers',
        subtitle: 'Official NTA Keys',
        description: `Full collection of past examination questions with verified answer keys.`,
        keyTerms: ['PYQs', 'Answer Keys', 'Detailed Solutions'],
      },
      {
        number: '03',
        title: 'NTA CBT Simulator',
        subtitle: 'Timed Exam Practice',
        description: `Practice with authentic countdown timers, question palettes, and immediate score breakdowns.`,
        keyTerms: ['Real Timers', 'Exam Mode', 'Score Analysis'],
      },
      {
        number: '04',
        title: 'Mistake Diagnostic',
        subtitle: 'Weak Area Detection',
        description: `Identify exactly which units need more practice to guarantee your JRF qualification.`,
        keyTerms: ['Error Tracking', 'Targeted Revision', 'Recall Anchors'],
      },
    ],
    memoryExample: {
      questionText: `High-yield representative question for UGC NET ${name} (Code ${code})`,
      questionMeta: 'NTA CBT Exam • High-Yield Concept',
      connectionTrick: 'Active Personal Mnemonic Anchor',
      targetRule: 'Master fundamental axioms and key authors for rapid exam recall.',
      direction: isRtl ? 'rtl' : 'ltr',
    },
    ctaPractice: `Start ${name} Practice`,
    ctaSyllabus: `Explore ${name} Syllabus`,
    ctaBenchmark: `Take Free ${name} Benchmark Exam`,
    curriculumBadge: `Official NTA Curriculum for ${name} (Code ${code})`,
    whySectionTitle: `Why Prepare for ${name} Here?`,
    whySectionSubtitle: `Authentic question sets, official scoring guidelines, and real-time accuracy analytics tailored to ${name}.`,
    paywallHighlights: [
      `Complete ${name} PYQ Papers (2004–2024)`,
      'General Paper 1 Companion Access Included',
      'Personal Mistake Tracker & Weak Area Diagnostic',
      'NTA CBT Simulator with Official Time Limits',
    ],
  };
}

export function getAllSubjectConfigs(): SubjectConfig[] {
  return Object.values(SUBJECT_REGISTRY);
}

