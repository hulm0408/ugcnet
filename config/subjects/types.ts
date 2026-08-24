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
}

export interface SubjectMemoryExample {
  questionText: string;
  questionMeta: string;
  connectionTrick: string;
  targetRule: string;
  direction?: 'ltr' | 'rtl';
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
}
