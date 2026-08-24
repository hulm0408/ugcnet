/**
 * Personal Memory + Connection Engine Core Logic
 * Spaced repetition algorithm, connection types, and smart memory prompts.
 */

export const MEMORY_TYPES = [
  { id: 'TRICK', label: 'My Trick', arabicLabel: 'حيلتي الذهنية', icon: 'Sparkles', desc: 'Short mental shortcut or acronym' },
  { id: 'MNEMONIC', label: 'My Mnemonic', arabicLabel: 'رمز الحفظ', icon: 'Key', desc: 'Formula or memory anchor' },
  { id: 'STORY', label: 'My Story', arabicLabel: 'قصة الربط', icon: 'BookOpen', desc: 'Brief vivid narrative connecting elements' },
  { id: 'CONCEPT', label: 'My Concept', arabicLabel: 'مفهومي الخاص', icon: 'Lightbulb', desc: 'Core concept in your own words' },
  { id: 'KEYWORD', label: 'Keywords', arabicLabel: 'كلمات مفتاحية', icon: 'Tag', desc: 'Trigger words and essential cues' },
  { id: 'PERSONAL_EXPLANATION', label: 'My Explanation', arabicLabel: 'شرحي الشخصي', icon: 'FileText', desc: 'How you explain it to yourself' },
  { id: 'VISUAL_CONNECTION', label: 'Visual Connection', arabicLabel: 'رابط بصري', icon: 'Eye', desc: 'Mental image, diagram or pattern' },
] as const;

export type MemoryType = (typeof MEMORY_TYPES)[number]['id'];

export const RELATIONSHIP_TYPES = [
  { id: 'SAME_AUTHOR', label: 'Same Author / Poet', arabicLabel: 'نفس الكاتب / الشاعر' },
  { id: 'SAME_ERA', label: 'Same Literary Era / Century', arabicLabel: 'نفس العصر الأدبي / القرن' },
  { id: 'SAME_WORK', label: 'Same Work / Diwan / Book', arabicLabel: 'نفس العمل / الديوان' },
  { id: 'CONTRAST', label: 'Direct Contrast / Counterpart', arabicLabel: 'مقابلة / ضد أو مذهب مقابل' },
  { id: 'PREREQUISITE', label: 'Prerequisite / Foundation', arabicLabel: 'مقدمة / مفهوم أساسي' },
  { id: 'THEMATIC', label: 'Thematic Link / Same School', arabicLabel: 'رابط موضوعي / نفس المدرسة' },
  { id: 'RELATED_CONCEPT', label: 'Related Concept', arabicLabel: 'مفهوم مرتبط' },
] as const;

export type RelationshipType = (typeof RELATIONSHIP_TYPES)[number]['id'];

// Deterministic review intervals schedule (in days)
export const SPACED_INTERVALS = [1, 3, 7, 14, 30, 60, 120] as const;

/**
 * Calculates next review interval and memory strength based on recall feedback.
 */
export function calculateNextReview(
  currentIntervalDays: number = 1,
  currentStrength: number = 1.0,
  wasHelpful: boolean
): {
  intervalDays: number;
  memoryStrength: number;
  nextReviewAt: Date;
  status: 'ACTIVE' | 'MASTERED' | 'ARCHIVED';
} {
  const now = new Date();

  if (wasHelpful) {
    // Find next step in intervals schedule
    let nextIdx = SPACED_INTERVALS.findIndex((val) => val > currentIntervalDays);
    let intervalDays: number;
    if (nextIdx === -1) {
      // Exceeded highest configured interval, multiply by 1.5
      intervalDays = Math.min(180, Math.round(currentIntervalDays * 1.5));
    } else {
      intervalDays = SPACED_INTERVALS[nextIdx];
    }

    const memoryStrength = Math.min(5.0, Number((currentStrength + 0.5).toFixed(1)));
    const status = memoryStrength >= 4.5 && intervalDays >= 60 ? 'MASTERED' : 'ACTIVE';
    const nextReviewAt = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

    return {
      intervalDays,
      memoryStrength,
      nextReviewAt,
      status,
    };
  } else {
    // User struggled: Reset interval to 1 day for reinforcement
    const intervalDays = 1;
    const memoryStrength = Math.max(0.5, Number((currentStrength - 0.5).toFixed(1)));
    const nextReviewAt = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);

    return {
      intervalDays,
      memoryStrength,
      nextReviewAt,
      status: 'ACTIVE',
    };
  }
}

export interface SmartPrompt {
  id: string;
  category: string;
  template: string;
  hint: string;
}

/**
 * Generates smart memory suggestions tailored to the question's content and metadata.
 */
export function generateSmartMemoryPrompts(question: {
  question_arabic?: string | null;
  question_english?: string | null;
  question_micro_focus_arabic?: string | null;
  specific_entity_name_arabic?: string | null;
  broad_topic?: { name_arabic?: string; name_english?: string } | null;
  subtopic?: { name_arabic?: string; name_english?: string } | null;
  unit?: { unit_number?: number; name_english?: string; name_arabic?: string } | null;
}): SmartPrompt[] {
  const prompts: SmartPrompt[] = [];
  const arText = question.question_arabic || '';

  // 1. Author / Poet prompts
  if (
    arText.includes('من صاحب') ||
    arText.includes('من مؤلف') ||
    arText.includes('من الشاعر') ||
    arText.includes('من هو') ||
    question.specific_entity_name_arabic
  ) {
    const entity = question.specific_entity_name_arabic || 'المؤلف';
    prompts.push({
      id: 'author_formula',
      category: 'Author Formula',
      template: `تذكر: ${entity} = [المؤلف] + [القرن/العصر] + [أشهر كتاب/سمة]`,
      hint: 'Link author name with their era and landmark work',
    });
    prompts.push({
      id: 'first_letters',
      category: 'Acronym / First Letters',
      template: `اختصار الحروف: [حرف من الاسم] + [حرف من الكتاب] = [...]`,
      hint: 'Create a catchy acronym connecting author and work',
    });
  }

  // 2. Book / Diwan / Title prompts
  if (arText.includes('كتاب') || arText.includes('ديوان') || arText.includes('معجم') || arText.includes('رواية') || arText.includes('قصيدة')) {
    prompts.push({
      id: 'title_anchor',
      category: 'Title Anchor',
      template: `الرابط: [اسم الكتاب] يدل على [موضوعه أو مؤلفه] لأن [...]`,
      hint: 'Connect meaning of title with its subject or author',
    });
  }

  // 3. Dates / Eras / Century
  if (arText.includes('سنة') || arText.includes('عام') || arText.includes('قرن') || arText.includes('توفي') || arText.includes('ولد')) {
    prompts.push({
      id: 'date_rhyme',
      category: 'Date Landmark',
      template: `التاريخ: [السنة/القرن] يرتبط بـ [حدث شهير أو نغمة رقمية]`,
      hint: 'Associate date with a milestone or number pattern',
    });
  }

  // 4. Grammar / Rhetoric / Balaghah / Linguistics
  if (
    arText.includes('إعراب') ||
    arText.includes('بلاغة') ||
    arText.includes('تشبيه') ||
    arText.includes('استعارة') ||
    arText.includes('بحر') ||
    arText.includes('عروض') ||
    question.unit?.unit_number === 7 ||
    question.unit?.unit_number === 8
  ) {
    prompts.push({
      id: 'rule_pattern',
      category: 'Rule Pattern',
      template: `القاعدة ببساطة: إذا رأيت [...] فالحكم [...] لأن [...]`,
      hint: 'Summarize grammatical condition and result',
    });
  }

  // Always supply foundational options
  prompts.push({
    id: 'visual_anchor',
    category: 'Visual & Root Anchor',
    template: `صورة ذهنية: تخيل [...] يربط بين [...] و [...]`,
    hint: 'Visualize a vivid mental picture connecting both sides',
  });

  prompts.push({
    id: 'contrast_anchor',
    category: 'Contrast Link',
    template: `فرق بين هذا وبين [...]: هذا يختص بـ [...] والآخر بـ [...]`,
    hint: 'Prevent confusion by noting contrast with a similar concept',
  });

  return prompts;
}
