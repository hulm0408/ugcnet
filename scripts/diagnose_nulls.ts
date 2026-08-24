import 'dotenv/config';
import prisma from '../lib/db';

async function main() {
  const nullSubtopics = await prisma.question.count({ where: { subtopic_id: null } });
  const nullEntities = await prisma.question.count({ where: { specific_entity_name_arabic: null } });
  const total = await prisma.question.count();

  console.log({ total, nullSubtopics, nullEntities });

  const sampleNull = await prisma.question.findFirst({
    where: { subtopic_id: null },
    select: {
      id: true,
      source_question_id: true,
      question_arabic: true,
      unit_id: true,
      broad_topic_id: true,
      subtopic_id: true,
    },
  });

  console.log('Sample null subtopic question:', sampleNull);
}

main().finally(() => process.exit(0));
