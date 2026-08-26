import 'dotenv/config';
import prisma from '../lib/db';

async function diagnoseUnitDrilldown() {
  console.log('Diagnosing Unit and Topic drilldown for Arabic...');
  
  const arabicSubject = await prisma.subject.findFirst({
    where: { slug: 'arabic' },
  });

  if (!arabicSubject) {
    console.error('Arabic subject not found');
    return;
  }

  const units = await prisma.syllabusUnit.findMany({
    where: { subject_id: arabicSubject.id },
    orderBy: { unit_number: 'asc' },
    include: {
      broad_topics: {
        include: {
          subtopics: true,
          _count: {
            select: { questions: true, subtopics: true },
          },
        },
      },
      _count: {
        select: { questions: true },
      },
    },
  });

  console.log(`Found ${units.length} units for Arabic:`);
  for (const u of units) {
    console.log(`\nUnit ${u.unit_number}: ${u.name_english} (${u.name_arabic}) — Total Questions in Unit: ${u._count.questions}`);
    for (const t of u.broad_topics) {
      console.log(`  Topic: ${t.name_english} (slug: ${t.slug}) | Qs: ${t._count.questions} | Subtopics: ${t._count.subtopics}`);
    }
  }

  // Check how many questions have unit_id vs broad_topic_id
  const totalArabicQuestions = await prisma.question.count({
    where: { subject_id: arabicSubject.id },
  });
  const questionsWithUnit = await prisma.question.count({
    where: { subject_id: arabicSubject.id, unit_id: { not: null } },
  });
  const questionsWithTopic = await prisma.question.count({
    where: { subject_id: arabicSubject.id, broad_topic_id: { not: null } },
  });

  console.log(`\nTotal Arabic Questions: ${totalArabicQuestions}`);
  console.log(`Questions with unit_id: ${questionsWithUnit}`);
  console.log(`Questions with broad_topic_id: ${questionsWithTopic}`);

  await prisma.$disconnect();
}

diagnoseUnitDrilldown().catch(console.error);
