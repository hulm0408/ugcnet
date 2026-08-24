import 'dotenv/config';
import prisma from '../lib/db';

async function checkOptionTypes() {
  console.log('Checking questions with non-string options...\n');

  const questions = await prisma.question.findMany({
    where: { content_status: 'PUBLISHED' },
    select: {
      id: true,
      options_arabic: true,
      options_english: true,
      exam_paper: { select: { year: true, display_name: true } },
    },
  });

  let objectOptionCount = 0;

  for (const q of questions) {
    const optAr = q.options_arabic as any;
    const optEn = q.options_english as any;

    for (const key of ['A', 'B', 'C', 'D']) {
      if (optAr && optAr[key] && typeof optAr[key] === 'object') {
        objectOptionCount++;
        if (objectOptionCount <= 5) {
          console.log(`Found object in options_arabic for question ${q.id} (${q.exam_paper.year} ${q.exam_paper.display_name}):`, optAr[key]);
        }
      }
      if (optEn && optEn[key] && typeof optEn[key] === 'object') {
        console.log(`Found object in options_english for question ${q.id}:`, optEn[key]);
      }
    }
  }

  console.log(`\nTotal questions with object options: ${objectOptionCount}`);
}

checkOptionTypes().finally(() => process.exit(0));
