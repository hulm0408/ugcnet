import { SubjectConfig } from './types';
import { arabicConfig } from './arabic';
import { bengaliConfig } from './bengali';
import { commerceConfig } from './commerce';

const SUBJECT_REGISTRY: Record<string, SubjectConfig> = {
  arabic: arabicConfig,
  bengali: bengaliConfig,
  commerce: commerceConfig,
};

/**
 * Returns complete SubjectConfig for any subject slug.
 * Fast O(1) in-memory lookup with intelligent pedagogical fallback for all 85+ subjects.
 */
export function getSubjectConfig(slug: string, fallbackSubject?: any): SubjectConfig {
  if (SUBJECT_REGISTRY[slug]) {
    return SUBJECT_REGISTRY[slug];
  }

  const name = fallbackSubject?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
  const code = fallbackSubject?.code || '00';
  const nativeName = fallbackSubject?.name_native || name;
  const isRtl = fallbackSubject?.direction === 'rtl';

  return {
    code,
    slug,
    name,
    nativeName,
    tagline: `Official 10 Units • Authentic Past Exam Papers • Timed NTA Mock Tests • Mistake Tracker`,
    positioningHeadline: `Master UGC NET ${name} —`,
    positioningHighlight: 'the smart way.',
    description: `Prepare for UGC NET ${name} (Subject Code ${code}) with authentic previous-year questions, 10-unit syllabus exploration, and computer-based mock tests.`,
    theme: {
      primaryColor: '#059669',
      accentColor: '#10B981',
      surfaceGradient: 'from-[#0A1E18] to-[#040D0A]',
      fontFamily: isRtl ? 'font-arabic' : 'font-sans',
      scriptDirection: isRtl ? 'rtl' : 'ltr',
      heroSvgIllustration: `
        <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
          <defs>
            <linearGradient id="bgGen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0F172A" />
              <stop offset="100%" stop-color="#020617" />
            </linearGradient>
          </defs>
          <rect width="500" height="360" rx="20" fill="url(#bgGen)" stroke="#1E293B" stroke-width="1.5" />
          <circle cx="250" cy="180" r="55" fill="#1E293B" stroke="#10B981" stroke-width="2.5" />
          <text x="250" y="175" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="900">${name.toUpperCase()}</text>
          <text x="250" y="195" text-anchor="middle" fill="#34D399" font-size="10" font-weight="bold" letter-spacing="1">CODE ${code}</text>
          <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • Verified NTA Answer Keys</text>
        </svg>
      `,
    },
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
      questionText: `Sample question from UGC NET ${name}`,
      questionMeta: 'NTA CBT Exam • High-Yield Question',
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
