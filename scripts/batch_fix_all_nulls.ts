import 'dotenv/config';
import prisma from '../lib/db';
import { resolveCanonicalEntity, slugify } from '../lib/syllabusHierarchy';

async function main() {
  console.log('🚀 Running Fast Batch DB Hierarchy Fix for all questions...\n');

  // 1. Fetch all questions with null subtopic_id or specific_entity_name_arabic
  const nullQuestions = await prisma.question.findMany({
    where: {
      OR: [
        { subtopic_id: null },
        { specific_entity_name_arabic: null },
      ],
    },
    select: {
      id: true,
      question_arabic: true,
      specific_entity_name_arabic: true,
      specific_entity_name_english: true,
      question_micro_focus_arabic: true,
      question_micro_focus_english: true,
      unit_id: true,
      broad_topic_id: true,
    },
  });

  console.log(`Found ${nullQuestions.length} questions to resolve.`);

  // 2. Fetch all Units and BroadTopics
  const defaultUnit = await prisma.syllabusUnit.findFirst({
    where: { unit_number: 1 },
    include: { broad_topics: true },
  });

  if (!defaultUnit) {
    throw new Error('Default unit 1 not found');
  }

  const defaultTopic = defaultUnit.broad_topics[0] || (await prisma.broadTopic.create({
    data: {
      unit_id: defaultUnit.id,
      name_arabic: 'الشعر العربي',
      name_english: 'Arabic Literature & Poetry',
      slug: 'arabic-poetry',
      order_index: 1,
    },
  }));

  // Cache existing Subtopics in memory
  const allSubtopics = await prisma.subtopic.findMany();
  const subtopicCache = new Map<string, typeof allSubtopics[0]>();
  for (const st of allSubtopics) {
    subtopicCache.set(`${st.broad_topic_id}:${st.slug}`, st);
  }

  // Pre-create/resolve subtopics
  for (const q of nullQuestions) {
    const canonical = resolveCanonicalEntity({
      specific_entity_name_arabic: q.specific_entity_name_arabic,
      specific_entity_name_english: q.specific_entity_name_english,
      question_micro_focus_arabic: q.question_micro_focus_arabic,
      question_micro_focus_english: q.question_micro_focus_english,
      question_arabic: q.question_arabic || '',
    });

    const topicId = q.broad_topic_id || defaultTopic.id;
    const cacheKey = `${topicId}:${canonical.slug}`;

    if (!subtopicCache.has(cacheKey)) {
      const createdSt = await prisma.subtopic.upsert({
        where: {
          broad_topic_id_slug: {
            broad_topic_id: topicId,
            slug: canonical.slug,
          },
        },
        update: {
          name_arabic: canonical.nameAr,
          name_english: canonical.nameEn,
        },
        create: {
          broad_topic_id: topicId,
          name_arabic: canonical.nameAr,
          name_english: canonical.nameEn,
          slug: canonical.slug,
          node_type: 'official_topic',
          node_source: 'canonical',
          order_index: 1,
        },
      });
      subtopicCache.set(cacheKey, createdSt);
    }
  }

  console.log(`Subtopic cache populated with ${subtopicCache.size} subtopics.`);

  // 3. Update questions in concurrent chunks
  const CHUNK_SIZE = 50;
  for (let i = 0; i < nullQuestions.length; i += CHUNK_SIZE) {
    const chunk = nullQuestions.slice(i, i + CHUNK_SIZE);
    
    await Promise.all(
      chunk.map(async (q) => {
        const canonical = resolveCanonicalEntity({
          specific_entity_name_arabic: q.specific_entity_name_arabic,
          specific_entity_name_english: q.specific_entity_name_english,
          question_micro_focus_arabic: q.question_micro_focus_arabic,
          question_micro_focus_english: q.question_micro_focus_english,
          question_arabic: q.question_arabic || '',
        });

        const unitId = q.unit_id || defaultUnit.id;
        const topicId = q.broad_topic_id || defaultTopic.id;
        const cacheKey = `${topicId}:${canonical.slug}`;
        const subtopic = subtopicCache.get(cacheKey);

        const microAr = q.question_micro_focus_arabic || 'أسئلة عامة وتطبيقات';
        const microEn = q.question_micro_focus_english || 'General Analysis';

        return prisma.question.update({
          where: { id: q.id },
          data: {
            unit_id: unitId,
            broad_topic_id: topicId,
            subtopic_id: subtopic?.id || null,
            specific_entity_name_arabic: canonical.nameAr,
            specific_entity_name_english: canonical.nameEn,
            question_micro_focus_arabic: microAr,
            question_micro_focus_english: microEn,
            final_folder_arabic: canonical.nameAr,
            final_folder_english: canonical.nameEn,
            classification_status: 'classified',
          },
        });
      })
    );

    console.log(`  Processed ${Math.min(i + CHUNK_SIZE, nullQuestions.length)} / ${nullQuestions.length}...`);
  }

  console.log('\n✅ Completed fast batch update for all questions!');

  const remainingNullSubtopics = await prisma.question.count({ where: { subtopic_id: null } });
  const remainingNullEntities = await prisma.question.count({
    where: { specific_entity_name_arabic: null },
  });

  console.log('Final DB Status:', { remainingNullSubtopics, remainingNullEntities });
}

main()
  .catch((e) => {
    console.error('Fatal batch update error:', e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
