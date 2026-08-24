/**
 * Personal Memory + Connection Engine Core Logic
 * Strict 5-Level Spaced Repetition Schedule, Connection Types, and Smart Prompts.
 */

export const MEMORY_TYPES = [
  { id: 'TRICK', label: 'My Trick', arabicLabel: 'حيلتي الذهنية', icon: 'Zap', desc: 'Short mental shortcut or acronym' },
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

/**
 * Strict 5-Level Spaced Repetition Schedule:
 * 1st Review: Within 24 hours of first learning (1 day)
 * 2nd Review: 2 to 3 days later (3 days)
 * 3rd Review: About 1 week later (7 days)
 * 4th Review: 2 to 3 weeks later (16 days)
 * 5th Review: 1 to 2 months later (45 days -> Completed Achievement)
 */
export const SPACING_LEVELS = [
  {
    level: 1,
    title: '1st Review',
    arabicTitle: 'المراجعة الأولى',
    timeframe: 'Within 24 hours',
    arabicTimeframe: 'خلال 24 ساعة',
    intervalHours: 24,
    intervalDays: 1,
    graceHours: 36,
    description: 'Initial consolidation within 24 hours',
  },
  {
    level: 2,
    title: '2nd Review',
    arabicTitle: 'المراجعة الثانية',
    timeframe: '2 to 3 days later',
    arabicTimeframe: 'بعد 2 إلى 3 أيام',
    intervalHours: 72,
    intervalDays: 3,
    graceHours: 96,
    description: 'Reinforcing short-term retention',
  },
  {
    level: 3,
    title: '3rd Review',
    arabicTitle: 'المراجعة الثالثة',
    timeframe: 'About 1 week later',
    arabicTimeframe: 'بعد أسبوع تقريباً',
    intervalHours: 168,
    intervalDays: 7,
    graceHours: 216,
    description: 'Transitioning to medium-term memory',
  },
  {
    level: 4,
    title: '4th Review',
    arabicTitle: 'المراجعة الرابعة',
    timeframe: '2 to 3 weeks later',
    arabicTimeframe: 'بعد أسبوعين إلى 3 أسابيع',
    intervalHours: 384,
    intervalDays: 16,
    graceHours: 504,
    description: 'Long-term structural memory lock',
  },
  {
    level: 5,
    title: '5th Review (Mastery)',
    arabicTitle: 'المراجعة الخامسة (الإتقان)',
    timeframe: '1 to 2 months later',
    arabicTimeframe: 'بعد شهر إلى شهرين',
    intervalHours: 1080,
    intervalDays: 45,
    graceHours: 1440,
    description: 'Permanent mastery — Marks PYQ as Completed',
  },
] as const;

export interface NextReviewResult {
  level: number;
  intervalDays: number;
  memoryStrength: number;
  nextReviewAt: Date;
  dueDeadline: Date;
  status: 'ACTIVE' | 'COMPLETED' | 'EXPIRED';
  isCompleted: boolean;
  completedAt: Date | null;
  onTime: boolean;
}

/**
 * Calculates next review progression in the strict 5-Level Spaced Repetition System.
 * If not completed on time (past the deadline), it drops back to Level 1 and does not count as achievement.
 */
export function calculate5LevelReview({
  currentLevel = 1,
  currentStrength = 1.0,
  dueDeadline,
  wasHelpful,
}: {
  currentLevel?: number;
  currentStrength?: number;
  dueDeadline?: Date | null;
  wasHelpful: boolean;
}): NextReviewResult {
  const now = new Date();

  // Check if review was completed on time (before deadline with grace period)
  const isOverdueMissed = dueDeadline ? now.getTime() > new Date(dueDeadline).getTime() : false;

  if (isOverdueMissed) {
    // Overdue / missed review window: Reset back to Level 1
    const level1Config = SPACING_LEVELS[0];
    const nextReviewAt = new Date(now.getTime() + level1Config.intervalHours * 60 * 60 * 1000);
    const deadline = new Date(now.getTime() + level1Config.graceHours * 60 * 60 * 1000);

    return {
      level: 1,
      intervalDays: 1,
      memoryStrength: Math.max(1.0, Number((currentStrength - 0.5).toFixed(1))),
      nextReviewAt,
      dueDeadline: deadline,
      status: 'ACTIVE',
      isCompleted: false,
      completedAt: null,
      onTime: false,
    };
  }

  if (wasHelpful) {
    if (currentLevel >= 5) {
      // Completed all 5 levels on time -> COMPLETED ACHIEVEMENT!
      return {
        level: 5,
        intervalDays: 60,
        memoryStrength: 5.0,
        nextReviewAt: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
        dueDeadline: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
        status: 'COMPLETED',
        isCompleted: true,
        completedAt: now,
        onTime: true,
      };
    }

    // Advance to next level (e.g. Level 1 -> 2, 2 -> 3, 3 -> 4, 4 -> 5)
    const nextLevel = currentLevel + 1;
    const levelConfig = SPACING_LEVELS[nextLevel - 1];
    const nextReviewAt = new Date(now.getTime() + levelConfig.intervalHours * 60 * 60 * 1000);
    const deadline = new Date(now.getTime() + levelConfig.graceHours * 60 * 60 * 1000);
    const memoryStrength = Math.min(5.0, Number((currentStrength + 0.8).toFixed(1)));

    return {
      level: nextLevel,
      intervalDays: levelConfig.intervalDays,
      memoryStrength,
      nextReviewAt,
      dueDeadline: deadline,
      status: 'ACTIVE',
      isCompleted: false,
      completedAt: null,
      onTime: true,
    };
  } else {
    // User struggled to recall: reset to Level 1 for reinforcement
    const level1Config = SPACING_LEVELS[0];
    const nextReviewAt = new Date(now.getTime() + level1Config.intervalHours * 60 * 60 * 1000);
    const deadline = new Date(now.getTime() + level1Config.graceHours * 60 * 60 * 1000);

    return {
      level: 1,
      intervalDays: 1,
      memoryStrength: Math.max(1.0, Number((currentStrength - 0.5).toFixed(1))),
      nextReviewAt,
      dueDeadline: deadline,
      status: 'ACTIVE',
      isCompleted: false,
      completedAt: null,
      onTime: true,
    };
  }
}

/**
 * Initial enrollment into the 5-level spaced queue.
 */
export function getInitialEnrollment(): {
  level: number;
  intervalDays: number;
  nextReviewAt: Date;
  dueDeadline: Date;
  status: 'ACTIVE';
} {
  const now = new Date();
  const level1 = SPACING_LEVELS[0];
  const nextReviewAt = new Date(now.getTime() + level1.intervalHours * 60 * 60 * 1000);
  const dueDeadline = new Date(now.getTime() + level1.graceHours * 60 * 60 * 1000);

  return {
    level: 1,
    intervalDays: 1,
    nextReviewAt,
    dueDeadline,
    status: 'ACTIVE',
  };
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
