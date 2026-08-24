import 'dotenv/config';
import prisma from '../lib/db';

async function checkAllFieldTypes() {
  console.log('🔍 CHECKING ALL JSON FIELD TYPES ACROSS 3,150 QUESTIONS...\n');

  const questions = await prisma.question.findMany({
    where: { content_status: 'PUBLISHED' },
  });

  const issues: Record<string, number> = {
    question_arabic_obj: 0,
    question_english_obj: 0,
    options_arabic_obj: 0,
    options_english_obj: 0,
    correct_answer_obj: 0,
    explanation_arabic_obj: 0,
    matching_table_arabic_obj: 0,
  };

  for (const q of questions) {
    if (typeof q.question_arabic === 'object' && q.question_arabic !== null) issues.question_arabic_obj++;
    if (typeof q.question_english === 'object' && q.question_english !== null) issues.question_english_obj++;
    if (typeof q.correct_answer === 'object' && q.correct_answer !== null) issues.correct_answer_obj++;
    if (typeof q.explanation_arabic === 'object' && q.explanation_arabic !== null) issues.explanation_arabic_obj++;

    const optAr = q.options_arabic as any;
    if (optAr && typeof optAr === 'object') {
      for (const k of ['A', 'B', 'C', 'D']) {
        if (typeof optAr[k] === 'object' && optAr[k] !== null) {
          issues.options_arabic_obj++;
          break;
        }
      }
    }

    const optEn = q.options_english as any;
    if (optEn && typeof optEn === 'object') {
      for (const k of ['A', 'B', 'C', 'D']) {
        if (typeof optEn[k] === 'object' && optEn[k] !== null) {
          issues.options_english_obj++;
          break;
        }
      }
    }
  }

  console.log('Results:');
  console.table(issues);
}

checkAllFieldTypes().finally(() => process.exit(0));
