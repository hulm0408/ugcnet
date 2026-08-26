import 'dotenv/config';
import prisma from '../lib/db';

async function cleanZeroTopics() {
  const arabic = await prisma.subject.findFirst({ where: { slug: 'arabic' } });
  if (!arabic) return;

  const zeroTopics = await prisma.broadTopic.findMany({
    where: { unit: { subject_id: arabic.id }, questions: { none: {} } },
    select: { id: true, name_english: true },
  });

  console.log('Zero question topics:', zeroTopics);
  for (const z of zeroTopics) {
    await prisma.subtopic.deleteMany({ where: { broad_topic_id: z.id } });
    await prisma.broadTopic.delete({ where: { id: z.id } });
  }

  console.log('Cleaned up 0 question topics.');
  await prisma.$disconnect();
}

cleanZeroTopics().catch(console.error);
