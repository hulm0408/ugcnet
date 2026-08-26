export interface SubjectPedagogyPillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keyTerms: string[];
}

export interface SubjectVisualTheme {
  primaryColor: string;
  accentColor: string;
  surfaceGradient: string;
  fontFamily: string;
  scriptDirection: 'ltr' | 'rtl';
  heroSvgIllustration: string;
  /** Human-readable description of the SVG's unique visual concept for audit purposes */
  visualConcept?: string;
}

export interface SubjectMemoryExample {
  questionText: string;
  questionMeta: string;
  connectionTrick: string;
  targetRule: string;
  direction?: 'ltr' | 'rtl';
}

/* ── Official UGC NET Syllabus Hierarchy ── */

export interface OfficialSyllabusSubtopic {
  name: string;
}

export interface OfficialSyllabusTopic {
  name: string;
  subtopics?: OfficialSyllabusSubtopic[];
}

export interface OfficialSyllabusUnit {
  unitNumber: number;
  title: string;
  topics: OfficialSyllabusTopic[];
}

export interface SyllabusSourceInfo {
  /** Issuing authority, e.g. "UGC" or "NTA" */
  authority: string;
  /** Document title if available */
  documentTitle?: string;
  /** Date syllabus was retrieved/verified (ISO format) */
  retrievedDate?: string;
  /** Whether this was verified against the official source */
  verified: boolean;
}

export interface SubjectConfig {
  code: string;
  slug: string;
  name: string;
  nativeName: string;
  tagline: string;
  positioningHeadline: string;
  positioningHighlight: string;
  description: string;
  
  theme: SubjectVisualTheme;
  pillars: SubjectPedagogyPillar[];
  memoryExample: SubjectMemoryExample;
  
  ctaPractice: string;
  ctaSyllabus: string;
  ctaBenchmark: string;
  
  curriculumBadge: string;
  whySectionTitle: string;
  whySectionSubtitle: string;
  
  paywallHighlights: string[];
  
  /** Structured official UGC NET syllabus data (Unit → Topic → Subtopic) */
  officialSyllabus?: OfficialSyllabusUnit[];
  /** Source attribution for the official syllabus */
  syllabusSource?: SyllabusSourceInfo;
}
