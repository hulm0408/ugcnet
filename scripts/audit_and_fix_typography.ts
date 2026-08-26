import 'dotenv/config';
import prisma from '../lib/db';

async function auditDatabaseTypography() {
  console.log('Auditing database typography and unicode strings...');
  
  const questions = await prisma.question.findMany({
    select: {
      id: true,
      question_arabic: true,
      question_english: true,
      explanation_arabic: true,
      explanation_english: true,
      options_arabic: true,
      options_english: true,
      specific_entity_name_arabic: true,
      specific_entity_name_english: true,
    },
  });

  let corruptedCount = 0;
  const corruptedQuestions: any[] = [];

  for (const q of questions) {
    const jsonStr = JSON.stringify(q);
    if (jsonStr.includes('\uFFFD') || jsonStr.includes('') || jsonStr.includes('🖽')) {
      corruptedCount++;
      corruptedQuestions.push(q.id);
    }
  }

  console.log(`Total questions checked: ${questions.length}`);
  console.log(`Corrupted questions with replacement glyphs: ${corruptedCount}`);

  // Let's sample a few questions to verify English translation formatting
  const sampleWithBoth = questions.filter(q => q.question_arabic && q.question_english).slice(0, 5);
  for (const s of sampleWithBoth) {
    console.log(`\nQuestion ID: ${s.id}`);
    console.log(`Arabic: ${s.question_arabic?.slice(0, 80)}...`);
    console.log(`English: ${s.question_english?.slice(0, 80)}...`);
  }

  await prisma.$disconnect();
}

auditDatabaseTypography().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
