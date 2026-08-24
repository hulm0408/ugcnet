import 'dotenv/config';
import prisma from '../lib/db';
import { resolveCanonicalEntity, slugify } from '../lib/syllabusHierarchy';

async function fixAllNullSubtopics() {
  console.log('🔧 Fixing all remaining questions with missing subtopic or entity...\n');

  // Load all units with broad topics
  const units = await prisma.syllabusUnit.findMany({
    include: {
      broad_topics: true,
    },
  });

  const questions = await prisma.question.findMany({
    where: {
      OR: [
        { subtopic_id: null },
        { specific_entity_name_arabic: null },
      ],
    },
    include: {
      unit: true,
      broad_topic: true,
    },
  });

  console.log(`Found ${questions.length} questions needing resolution.`);

  let fixed = 0;
  for (const q of questions) {
    const canonical = resolveCanonicalEntity({
      specific_entity_name_arabic: q.specific_entity_name_arabic,
      specific_entity_name_english: q.specific_entity_name_english,
      question_micro_focus_arabic: q.question_micro_focus_arabic,
      question_micro_focus_english: q.question_micro_focus_english,
      question_arabic: q.question_arabic || '',
    });

    // Ensure Unit
    let unitObj = q.unit || units[0];

    // Ensure BroadTopic
    let broadTopicObj = q.broad_topic;
    if (!broadTopicObj) {
      const topicSlug = 'arabic-poetry';
      broadTopicObj = await prisma.broadTopic.upsert({
        where: {
          unit_id_slug: {
            unit_id: unitObj.id,
            slug: topicSlug,
          },
        },
        update: {},
        create: {
          unit_id: unitObj.id,
          name_arabic: 'الشعر العربي',
          name_english: 'Arabic Literature & Poetry',
          slug: topicSlug,
          order_index: 1,
        },
      });
    }

    // Ensure Subtopic with upsert
    const subSlug = canonical.slug;
    const subtopicObj = await prisma.subtopic.upsert({
      where: {
        broad_topic_id_slug: {
          broad_topic_id: broadTopicObj.id,
          slug: subSlug,
        },
      },
      update: {
        name_arabic: canonical.nameAr,
        name_english: canonical.nameEn,
      },
      create: {
        broad_topic_id: broadTopicObj.id,
        name_arabic: canonical.nameAr,
        name_english: canonical.nameEn,
        slug: subSlug,
        node_type: 'official_topic',
        node_source: 'canonical',
        order_index: 1,
      },
    });

    const microAr = q.question_micro_focus_arabic || 'أسئلة عامة وتطبيقات';
    const microEn = q.question_micro_focus_english || 'General Questions & Analysis';

    await prisma.question.update({
      where: { id: q.id },
      data: {
        unit_id: unitObj.id,
        broad_topic_id: broadTopicObj.id,
        subtopic_id: subtopicObj.id,
        specific_entity_name_arabic: canonical.nameAr,
        specific_entity_name_english: canonical.nameEn,
        question_micro_focus_arabic: microAr,
        question_micro_focus_english: microEn,
        folder_path_arabic: `${unitObj.name_arabic} / ${broadTopicObj.name_arabic} / ${subtopicObj.name_arabic}`,
        folder_path_english: `${unitObj.name_english} / ${broadTopicObj.name_english} / ${subtopicObj.name_english}`,
        final_folder_arabic: canonical.nameAr,
        final_folder_english: canonical.nameEn,
        classification_status: 'classified',
      },
    });

    fixed++;
    if (fixed % 200 === 0) {
      console.log(`  Processed ${fixed} / ${questions.length}...`);
    }
  }

  console.log(`\n✅ Successfully processed all ${fixed} questions!`);

  const remainingNullSubtopics = await prisma.question.count({ where: { subtopic_id: null } });
  const remainingNullEntities = await prisma.question.count({
    where: { specific_entity_name_arabic: null },
  });

  console.log('Result:', { remainingNullSubtopics, remainingNullEntities });
}

fixAllNullSubtopics()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
