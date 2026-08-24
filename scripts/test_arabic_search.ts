import 'dotenv/config';
import prisma from '../lib/db';

async function main() {
  const sample = await prisma.question.findMany({
    take: 5,
    select: {
      id: true,
      question_arabic: true,
      specific_entity_name_arabic: true,
    },
  });

  console.log('Sample questions:', sample);

  // Test substring matches
  const q1 = await prisma.question.findMany({
    where: { question_arabic: { contains: 'في' } },
    take: 3,
    select: { id: true, question_arabic: true },
  });
  console.log('Matches for "في":', q1.length);

  const q2 = await prisma.question.findMany({
    where: { specific_entity_name_arabic: { contains: 'الْقَيْسِ' } },
    take: 3,
    select: { id: true, specific_entity_name_arabic: true },
  });
  console.log('Matches for "الْقَيْسِ":', q2.length);
}

main().finally(() => process.exit(0));
