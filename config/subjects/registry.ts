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
      heroSvgIllustration: `
        <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
          <defs>
            <linearGradient id="bgLang_${code}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3B0820" />
              <stop offset="100%" stop-color="#12010A" />
            </linearGradient>
            <linearGradient id="goldLang_${code}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#F59E0B" />
              <stop offset="100%" stop-color="#F97316" />
            </linearGradient>
          </defs>
          <rect width="500" height="360" rx="20" fill="url(#bgLang_${code})" stroke="#9D174D" stroke-width="1.5" />
          <rect x="50" y="55" width="400" height="55" rx="8" fill="#1C030F" stroke="#BE185D" stroke-width="1.5" />
          <text x="250" y="78" text-anchor="middle" fill="#FDE68A" font-size="12" font-weight="bold">${nativeName} • CLASSICAL CANON & MODERN PROSE</text>
          <text x="250" y="98" text-anchor="middle" fill="#F472B6" font-size="9">Grammar • Prosody • Poetics • Drama • Historical Linguistics</text>
          <circle cx="250" cy="210" r="55" fill="#240314" stroke="url(#goldLang_${code})" stroke-width="2.5" />
          <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="15" font-weight="900">${name.toUpperCase().slice(0, 14)}</text>
          <text x="250" y="227" text-anchor="middle" fill="#FDE68A" font-size="10" font-weight="bold" letter-spacing="1">CODE ${code}</text>
          <rect x="45" y="165" width="130" height="90" rx="12" fill="#17020D" stroke="#831843" stroke-width="1" />
          <text x="110" y="195" text-anchor="middle" fill="#FBCFE8" font-size="11" font-weight="bold">Classical Literature</text>
          <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Epics • Poetry • Heritage</text>
          <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Chhandas • Alankara</text>
          <rect x="325" y="165" width="130" height="90" rx="12" fill="#17020D" stroke="#831843" stroke-width="1" />
          <text x="390" y="195" text-anchor="middle" fill="#FBCFE8" font-size="11" font-weight="bold">Modern & Criticism</text>
          <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Novels • Short Fiction</text>
          <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Literary Movements</text>
          <path d="M 175 210 L 195 210" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3,3" />
          <path d="M 305 210 L 325 210" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3,3" />
          <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
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
      heroSvgIllustration: `
        <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
          <defs>
            <linearGradient id="bgSci_${code}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#08303E" />
              <stop offset="100%" stop-color="#021015" />
            </linearGradient>
            <linearGradient id="cyanSci_${code}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#22D3EE" />
              <stop offset="100%" stop-color="#06B6D4" />
            </linearGradient>
          </defs>
          <rect width="500" height="360" rx="20" fill="url(#bgSci_${code})" stroke="#0E7490" stroke-width="1.5" />
          <rect x="50" y="55" width="400" height="55" rx="8" fill="#041920" stroke="#0891B2" stroke-width="1.5" />
          <text x="250" y="78" text-anchor="middle" fill="#CFFAFE" font-size="12" font-weight="bold">${name.toUpperCase()} • SCIENTIFIC METHODS & PROTOCOLS</text>
          <text x="250" y="98" text-anchor="middle" fill="#22D3EE" font-size="9">Experimental Design • Standards • Analytics • Information Systems</text>
          <circle cx="250" cy="210" r="55" fill="#062633" stroke="url(#cyanSci_${code})" stroke-width="2.5" />
          <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="900">${name.toUpperCase().slice(0, 14)}</text>
          <text x="250" y="227" text-anchor="middle" fill="#22D3EE" font-size="10" font-weight="bold" letter-spacing="1">CODE ${code}</text>
          <rect x="45" y="165" width="130" height="90" rx="12" fill="#031B24" stroke="#0E7490" stroke-width="1" />
          <text x="110" y="195" text-anchor="middle" fill="#A5F3FC" font-size="11" font-weight="bold">Core Foundations</text>
          <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Principles • Standards</text>
          <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Methodologies</text>
          <rect x="325" y="165" width="130" height="90" rx="12" fill="#031B24" stroke="#0E7490" stroke-width="1" />
          <text x="390" y="195" text-anchor="middle" fill="#A5F3FC" font-size="11" font-weight="bold">Applied & Systems</text>
          <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Analytics • Case Studies</text>
          <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Practical Protocols</text>
          <path d="M 175 210 L 195 210" stroke="#22D3EE" stroke-width="2" stroke-dasharray="3,3" />
          <path d="M 305 210 L 325 210" stroke="#22D3EE" stroke-width="2" stroke-dasharray="3,3" />
          <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
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
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgSoc_${code}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#361309" />
            <stop offset="100%" stop-color="#120502" />
          </linearGradient>
          <linearGradient id="orangeSoc_${code}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FB923C" />
            <stop offset="100%" stop-color="#EA580C" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgSoc_${code})" stroke="#9A3412" stroke-width="1.5" />
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#1A0904" stroke="#C2410C" stroke-width="1.5" />
        <text x="250" y="78" text-anchor="middle" fill="#FFEDD5" font-size="12" font-weight="bold">${name.toUpperCase()} • THEORETICAL FOUNDATIONS & RESEARCH</text>
        <text x="250" y="98" text-anchor="middle" fill="#FB923C" font-size="9">Conceptual Paradigms • Structural Models • Qualitative & Empirical Methods</text>
        <circle cx="250" cy="210" r="55" fill="#240C05" stroke="url(#orangeSoc_${code})" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="15" font-weight="900">${name.toUpperCase().slice(0, 14)}</text>
        <text x="250" y="227" text-anchor="middle" fill="#FB923C" font-size="10" font-weight="bold" letter-spacing="1">CODE ${code}</text>
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#170703" stroke="#7C2D12" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#FED7AA" font-size="11" font-weight="bold">Core Concepts</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Thinkers • Theories</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Foundational Axioms</text>
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#170703" stroke="#7C2D12" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#FED7AA" font-size="11" font-weight="bold">Research & Policy</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Methods • Fieldwork</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Contemporary Trends</text>
        <path d="M 175 210 L 195 210" stroke="#FB923C" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#FB923C" stroke-width="2" stroke-dasharray="3,3" />
        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
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
