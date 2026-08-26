import 'dotenv/config';
import { prisma } from '../lib/db';
import { SUBJECT_REGISTRY } from '../config/subjects/registry';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'topic';
}

async function seedAllSyllabi() {
  console.log('=== FAST BATCH SEEDING ALL 19 SUBJECT SYLLABI INTO DATABASE ===\n');

  for (const [slug, config] of Object.entries(SUBJECT_REGISTRY)) {
    console.log(`Processing [${config.code}] ${config.name} (slug: ${slug})...`);

    // 1. Find or create Subject record in DB
    let subject = await prisma.subject.findUnique({
      where: { slug: config.slug },
    });

    if (!subject) {
      subject = await prisma.subject.create({
        data: {
          code: config.code,
          slug: config.slug,
          name: config.name,
          name_native: config.nativeName || null,
          direction: config.theme.scriptDirection || 'ltr',
          primary_language: config.code === '29' ? 'ar' : config.code === '28' ? 'ur' : config.code === '20' ? 'hi' : 'en',
          is_paper_1: config.code === '00',
          is_active: true,
          order_index: parseInt(config.code, 10) || 99,
        },
      });
      console.log(`  Created Subject record: ${subject.name} (${subject.id})`);
    } else {
      await prisma.subject.update({
        where: { id: subject.id },
        data: {
          code: config.code,
          name: config.name,
          name_native: config.nativeName || null,
          direction: config.theme.scriptDirection || 'ltr',
        },
      });
    }

    // Prefetch all existing units and broad topics for this subject
    const existingUnits = await prisma.syllabusUnit.findMany({
      where: { subject_id: subject.id },
      include: {
        broad_topics: true,
      },
    });

    const unitMap = new Map<number, typeof existingUnits[0]>();
    for (const eu of existingUnits) {
      unitMap.set(eu.unit_number, eu);
    }

    const units = config.officialSyllabus || [];
    console.log(`  Syncing ${units.length} official units in config...`);

    for (let uIdx = 0; uIdx < units.length; uIdx++) {
      const u = units[uIdx];
      const unitNum = u.unitNumber || uIdx + 1;
      const unitSlug = `unit-${unitNum}`;
      const unitTitle = u.title || `Unit ${unitNum}`;

      let dbUnit = unitMap.get(unitNum);

      if (!dbUnit) {
        const createdUnit = await prisma.syllabusUnit.create({
          data: {
            subject_id: subject.id,
            unit_number: unitNum,
            name_arabic: config.theme.scriptDirection === 'rtl' ? unitTitle : '',
            name_english: unitTitle,
            slug: unitSlug,
            description_english: `${config.name} Unit ${unitNum} Official Curriculum`,
            order_index: unitNum,
            is_active: true,
          },
          include: { broad_topics: true },
        });
        dbUnit = createdUnit;
        unitMap.set(unitNum, dbUnit);
      } else {
        await prisma.syllabusUnit.update({
          where: { id: dbUnit.id },
          data: {
            name_english: unitTitle,
            name_arabic: config.theme.scriptDirection === 'rtl' ? unitTitle : dbUnit.name_arabic,
          },
        });
      }

      // Map of existing topics in this unit
      const topicMap = new Map<string, typeof dbUnit.broad_topics[0]>();
      for (const bt of dbUnit.broad_topics) {
        topicMap.set(bt.slug, bt);
      }

      const topics = u.topics || [];
      for (let tIdx = 0; tIdx < topics.length; tIdx++) {
        const top = topics[tIdx];
        const topicName = top.name;
        const topicSlug = `${slugify(topicName).slice(0, 45)}-${tIdx + 1}`;

        let dbTopic = topicMap.get(topicSlug);

        if (!dbTopic) {
          dbTopic = await prisma.broadTopic.create({
            data: {
              unit_id: dbUnit.id,
              name_arabic: config.theme.scriptDirection === 'rtl' ? topicName : '',
              name_english: topicName,
              slug: topicSlug,
              order_index: tIdx + 1,
              is_active: true,
            },
          });
          topicMap.set(topicSlug, dbTopic);
        }
      }
    }
    console.log(`  Done syncing [${config.code}] ${config.name}`);
  }

  console.log('\n=== SEEDING COMPLETED SUCCESSFULLY ===');
  await prisma.$disconnect();
}

seedAllSyllabi().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
