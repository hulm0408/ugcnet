import 'dotenv/config';
import prisma from '../lib/db';

async function cleanupEmptyTopics() {
  console.log('Cleaning up empty duplicate dummy topics...');

  const dummyTopicIds = (await prisma.broadTopic.findMany({
    where: {
      slug: { in: ['topic-1', 'topic-2', 'topic-3', 'topic-4', 'topic-5'] },
      questions: { none: {} },
    },
    select: { id: true },
  })).map(t => t.id);

  if (dummyTopicIds.length > 0) {
    await prisma.subtopic.deleteMany({
      where: { broad_topic_id: { in: dummyTopicIds } },
    });

    const deletedTopics = await prisma.broadTopic.deleteMany({
      where: { id: { in: dummyTopicIds } },
    });

    console.log(`Deleted ${deletedTopics.count} empty dummy topic records.`);
  }

  // Audit remaining topics for all units
  const units = await prisma.syllabusUnit.findMany({
    where: { subject: { slug: 'arabic' } },
    include: {
      broad_topics: {
        include: {
          _count: { select: { questions: true, subtopics: true } },
        },
      },
    },
  });

  console.log('\nVerified Arabic Syllabus Units after cleanup:');
  for (const u of units) {
    console.log(`Unit ${u.unit_number}: ${u.broad_topics.length} topics`);
    for (const t of u.broad_topics) {
      console.log(`  - [${t.slug}] ${t.name_english} (${t._count.questions} Qs, ${t._count.subtopics} Subtopics)`);
    }
  }

  await prisma.$disconnect();
}

cleanupEmptyTopics().catch(console.error);
