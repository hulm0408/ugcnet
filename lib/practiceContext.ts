/**
 * Canonical Practice Context Engine
 * Deterministic resolution of practice modes and parameters.
 * Eliminates all ambiguous fallbacks.
 */

export type PracticeMode =
  | 'paper'
  | 'year'
  | 'unit'
  | 'topic'
  | 'subtopic'
  | 'node'
  | 'unattempted'
  | 'incorrect'
  | 'bookmarked'
  | 'question'
  | 'custom';

export interface PracticeContext {
  mode: PracticeMode;
  paperId?: string;
  year?: number;
  unitNumber?: number;
  topicSlug?: string;
  subtopicSlug?: string;
  nodeSlug?: string;
  questionId?: string;
  questionIds?: string[];
  paperTitle?: string;
  titleEnglish: string;
  titleArabic: string;
  subtitle: string;
}

export function resolvePracticeContext(searchParams: {
  get: (key: string) => string | null;
}): PracticeContext {
  const modeParam = searchParams.get('mode')?.toLowerCase();
  const paperId = searchParams.get('paperId') || searchParams.get('paper_id');
  const yearParam = searchParams.get('year');
  const unitParam = searchParams.get('unit');
  const topicParam = searchParams.get('topic');
  const subtopicParam = searchParams.get('subtopic');
  const nodeParam = searchParams.get('node');
  const entityParam = searchParams.get('entity');
  const questionId = searchParams.get('questionId') || searchParams.get('qId');
  const paperTitleParam = searchParams.get('paperTitle') || searchParams.get('paper');

  const year = yearParam ? parseInt(yearParam, 10) : undefined;
  const unitNumber = unitParam ? parseInt(unitParam, 10) : undefined;

  // 1. Single Question Mode
  if (questionId) {
    return {
      mode: 'question',
      questionId,
      titleEnglish: `Question Practice`,
      titleArabic: `تدريب على السؤال`,
      subtitle: `Targeted single question review`,
    };
  }

  // 2. User-specific Modes
  if (modeParam === 'incorrect') {
    return {
      mode: 'incorrect',
      titleEnglish: 'Incorrect Questions Review',
      titleArabic: 'مراجعة الأسئلة الخاطئة',
      subtitle: 'Practice all questions you answered incorrectly',
    };
  }

  if (modeParam === 'bookmarked') {
    return {
      mode: 'bookmarked',
      titleEnglish: 'Bookmarked Questions Practice',
      titleArabic: 'تدريب على الأسئلة المحفوظة',
      subtitle: 'Review and practice your saved bookmarks',
    };
  }

  if (modeParam === 'unattempted') {
    return {
      mode: 'unattempted',
      titleEnglish: 'Unattempted Questions Practice',
      titleArabic: 'تدريب على الأسئلة غير المجابة',
      subtitle: 'Practice questions you have not tried yet',
    };
  }

  // 3. Exact Paper Mode (Paper ID explicitly provided)
  if (paperId) {
    const title = paperTitleParam || (year ? `Year ${year} Paper` : 'Exam Paper');
    return {
      mode: 'paper',
      paperId,
      year: isNaN(year!) ? undefined : year,
      paperTitle: title,
      titleEnglish: title,
      titleArabic: year ? `امتحان سنة ${year}` : 'ورقة الامتحان',
      subtitle: `Official UGC NET Arabic exam paper`,
    };
  }

  // 4. Node Mode
  if (nodeParam) {
    return {
      mode: 'node',
      nodeSlug: nodeParam,
      subtopicSlug: subtopicParam || undefined,
      topicSlug: topicParam || undefined,
      unitNumber: isNaN(unitNumber!) ? undefined : unitNumber,
      titleEnglish: `Learning Node: ${nodeParam}`,
      titleArabic: `العقدة التعليمية`,
      subtitle: `Targeted micro-theme practice`,
    };
  }

  // 5. Subtopic / Entity Mode
  if (subtopicParam || entityParam) {
    const st = subtopicParam || entityParam || '';
    return {
      mode: 'subtopic',
      subtopicSlug: st,
      topicSlug: topicParam || undefined,
      unitNumber: isNaN(unitNumber!) ? undefined : unitNumber,
      titleEnglish: `Sub-topic: ${st}`,
      titleArabic: `المبحث الفرعي`,
      subtitle: `Targeted subtopic practice`,
    };
  }

  // 6. Topic Mode
  if (topicParam) {
    return {
      mode: 'topic',
      topicSlug: topicParam,
      unitNumber: isNaN(unitNumber!) ? undefined : unitNumber,
      titleEnglish: `Topic: ${topicParam}`,
      titleArabic: `الموضوع`,
      subtitle: `Topic-level practice`,
    };
  }

  // 7. Unit Mode
  if (unitNumber && !isNaN(unitNumber)) {
    return {
      mode: 'unit',
      unitNumber,
      titleEnglish: `Unit ${unitNumber} Practice`,
      titleArabic: `تدريب الوحدة ${unitNumber}`,
      subtitle: `Full syllabus unit practice`,
    };
  }

  // 8. Year Mode (All papers for a year)
  if (year && !isNaN(year)) {
    return {
      mode: 'year',
      year,
      titleEnglish: `Year ${year} Previous Year Questions`,
      titleArabic: `أسئلة سنة ${year}`,
      subtitle: `Comprehensive practice for exam year ${year}`,
    };
  }

  // 9. Default Fallback Context (All Published Questions)
  return {
    mode: 'custom',
    titleEnglish: 'Full Question Bank Practice',
    titleArabic: 'التدريب الشامل على بنك الأسئلة',
    subtitle: 'Comprehensive mixed practice across all syllabus units',
  };
}

export function buildQuestionsApiUrl(context: PracticeContext): string {
  const params = new URLSearchParams();
  params.set('published', 'true');
  params.set('limit', '250');

  switch (context.mode) {
    case 'paper':
      if (context.paperId) params.set('paperId', context.paperId);
      break;
    case 'year':
      if (context.year) params.set('year', context.year.toString());
      break;
    case 'unit':
      if (context.unitNumber) params.set('unit', context.unitNumber.toString());
      break;
    case 'topic':
      if (context.topicSlug) params.set('topic', context.topicSlug);
      if (context.unitNumber) params.set('unit', context.unitNumber.toString());
      break;
    case 'subtopic':
      if (context.subtopicSlug) params.set('subtopic', context.subtopicSlug);
      if (context.topicSlug) params.set('topic', context.topicSlug);
      if (context.unitNumber) params.set('unit', context.unitNumber.toString());
      break;
    case 'node':
      if (context.nodeSlug) params.set('node', context.nodeSlug);
      if (context.subtopicSlug) params.set('subtopic', context.subtopicSlug);
      if (context.topicSlug) params.set('topic', context.topicSlug);
      if (context.unitNumber) params.set('unit', context.unitNumber.toString());
      break;
    case 'incorrect':
      params.set('mode', 'incorrect');
      break;
    case 'bookmarked':
      params.set('mode', 'bookmarked');
      break;
    case 'unattempted':
      params.set('mode', 'unattempted');
      break;
    case 'question':
      if (context.questionId) params.set('questionId', context.questionId);
      break;
  }

  return `/api/questions?${params.toString()}`;
}
