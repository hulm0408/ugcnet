import 'dotenv/config';
import prisma from '../lib/db';
import { buildArabicRegexPattern } from '../lib/arabicUtils';

async function testSearch(query: string) {
  const isArabic = /[\u0600-\u06FF]/.test(query);
  console.log(`Testing search for: "${query}" (isArabic: ${isArabic})`);

  if (isArabic) {
    const pattern = buildArabicRegexPattern(query);
    const results = await prisma.$queryRawUnsafe<any[]>(
      `SELECT q.id, q.question_arabic, q.specific_entity_name_arabic, p.year, p.paper_number 
       FROM "Question" q 
       JOIN "ExamPaper" p ON q.exam_paper_id = p.id
       WHERE q.content_status = 'PUBLISHED' 
         AND (q.question_arabic ~* $1 OR q.specific_entity_name_arabic ~* $1 OR q.question_micro_focus_arabic ~* $1)
       ORDER BY p.year DESC LIMIT 10;`,
      pattern
    );
    console.log(`Found ${results.length} results via regex:`);
    for (const r of results.slice(0, 3)) {
      console.log(' -', r.year, r.paper_number, ':', r.question_arabic.substring(0, 60));
    }
  } else {
    const results = await prisma.question.findMany({
      where: {
        content_status: 'PUBLISHED',
        OR: [
          { question_english: { contains: query, mode: 'insensitive' } },
          { specific_entity_name_english: { contains: query, mode: 'insensitive' } },
          { question_micro_focus_english: { contains: query, mode: 'insensitive' } },
          { source_question_id: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 10,
    });
    console.log(`Found ${results.length} results via Prisma contains:`);
  }
}

async function run() {
  await testSearch('امرؤ القيس');
  await testSearch('الجاحظ');
  await testSearch('Jahiz');
  await testSearch('Muallaqat');
}

run().finally(() => process.exit(0));
