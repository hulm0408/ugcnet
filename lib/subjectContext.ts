import prisma from './db';

export interface SubjectInfo {
  id: string;
  code: string;
  slug: string;
  name: string;
  name_native: string | null;
  is_paper_1: boolean;
  direction: 'ltr' | 'rtl';
  primary_language: string;
  secondary_language: string | null;
}

export const DEFAULT_SUBJECT_SLUG = 'arabic';

/**
 * Fetch all active subjects for navigation and switchers
 */
export async function getActiveSubjects(): Promise<SubjectInfo[]> {
  try {
    const subjects = await prisma.subject.findMany({
      where: { is_active: true },
      orderBy: { order_index: 'asc' },
      select: {
        id: true,
        code: true,
        slug: true,
        name: true,
        name_native: true,
        is_paper_1: true,
        direction: true,
        primary_language: true,
        secondary_language: true,
      },
    });

    return subjects.map((s) => ({
      ...s,
      direction: s.direction === 'rtl' ? 'rtl' : 'ltr',
    }));
  } catch (error) {
    console.error('[SubjectContext] Error fetching subjects:', error);
    return [
      {
        id: 'subj_arabic_code29',
        code: '29',
        slug: 'arabic',
        name: 'Arabic',
        name_native: 'اللغة العربية وآدابها',
        is_paper_1: false,
        direction: 'rtl',
        primary_language: 'ar',
        secondary_language: 'en',
      },
    ];
  }
}

/**
 * Fetch a single subject by slug
 */
export async function getSubjectBySlug(slug: string): Promise<SubjectInfo | null> {
  try {
    const s = await prisma.subject.findUnique({
      where: { slug },
      select: {
        id: true,
        code: true,
        slug: true,
        name: true,
        name_native: true,
        is_paper_1: true,
        direction: true,
        primary_language: true,
        secondary_language: true,
      },
    });

    if (!s) return null;
    return {
      ...s,
      direction: s.direction === 'rtl' ? 'rtl' : 'ltr',
    };
  } catch (error) {
    console.error(`[SubjectContext] Error fetching subject '${slug}':`, error);
    return null;
  }
}
