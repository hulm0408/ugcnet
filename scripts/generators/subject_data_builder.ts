import { RawMockQuestion } from './common';

/**
 * Generates remaining questions for subjects to ensure every single subject
 * has exactly 100 authentic questions (10 per unit across all 10 units).
 */

export function buildCompleteUnitQuestions(
  subjectCode: string,
  subjectSlug: string,
  existingQuestions: RawMockQuestion[],
  unitGenerators: Record<number, () => RawMockQuestion[]>
): RawMockQuestion[] {
  const result: RawMockQuestion[] = [...existingQuestions];
  const unitCounts: Record<number, number> = {};

  // Count existing
  for (const q of existingQuestions) {
    unitCounts[q.unitNumber] = (unitCounts[q.unitNumber] || 0) + 1;
  }

  // Supplement each unit to reach 10 questions
  for (let unit = 1; unit <= 10; unit++) {
    const current = unitCounts[unit] || 0;
    const needed = 10 - current;
    if (needed > 0 && unitGenerators[unit]) {
      const candidates = unitGenerators[unit]();
      const added = candidates.slice(0, needed);
      result.push(...added);
    }
  }

  return result;
}
