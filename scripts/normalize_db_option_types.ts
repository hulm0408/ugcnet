import 'dotenv/config';
import prisma from '../lib/db';

async function normalizeDatabaseOptionTypes() {
  console.log('🔧 NORMALIZING JSON OPTION TYPES IN POSTGRESQL DATABASE...\n');

  const questions = await prisma.question.findMany({
    where: { content_status: 'PUBLISHED' },
    select: {
      id: true,
      options_arabic: true,
      options_english: true,
    },
  });

  let fixedCount = 0;

  for (const q of questions) {
    const optAr = (q.options_arabic as any) || {};
    const optEn = (q.options_english as any) || {};

    let needsUpdate = false;
    const cleanOptAr: Record<string, string> = {};
    const cleanOptEn: Record<string, string> = { ...optEn };

    for (const key of ['A', 'B', 'C', 'D']) {
      const valAr = optAr[key];
      if (valAr && typeof valAr === 'object') {
        needsUpdate = true;
        cleanOptAr[key] = valAr.arabic || valAr.text || '';
        if (!cleanOptEn[key] && valAr.english) {
          cleanOptEn[key] = valAr.english;
        }
      } else {
        cleanOptAr[key] = typeof valAr === 'string' ? valAr : '';
      }

      const valEn = optEn[key];
      if (valEn && typeof valEn === 'object') {
        needsUpdate = true;
        cleanOptEn[key] = valEn.english || valEn.text || '';
      }
    }

    if (needsUpdate) {
      await prisma.question.update({
        where: { id: q.id },
        data: {
          options_arabic: cleanOptAr,
          options_english: Object.keys(cleanOptEn).length > 0 ? cleanOptEn : undefined,
        },
      });
      fixedCount++;
    }
  }

  console.log(`✅ Successfully normalized ${fixedCount} questions in PostgreSQL database!`);
}

normalizeDatabaseOptionTypes().finally(() => process.exit(0));
