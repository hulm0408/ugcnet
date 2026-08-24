import * as fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { resolveCanonicalEntity, slugify } from '../lib/syllabusHierarchy';

const connectionString =
  'postgresql://postgres.dmzfgdxykvzvpfpehmrg:Mi2508@4017Mi@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const DATA_DIR = path.resolve(__dirname, '../..'); // e:\NET PRACTICE

async function main() {
  console.log('🚀 Starting Full Database Hierarchy Normalization & Relationship Sync...\n');

  // 1. Load all JSON source files
  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('.json') && !f.includes('package'));
  console.log(`📂 Found ${files.length} source JSON files in ${DATA_DIR}`);

  const questionSourceMap = new Map<
    string,
    {
      unitNum: number;
      unitNameAr: string;
      unitNameEn: string;
      topicAr: string;
      topicEn: string;
      subtopicAr: string;
      subtopicEn: string;
      entityAr: string;
      entityEn: string;
      microAr: string;
      microEn: string;
      folderPathAr: string;
      folderPathEn: string;
    }
  >();

  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'));
    const questions = Array.isArray(raw) ? raw : raw.questions || [];

    for (const q of questions) {
      const qId = q.id;
      const h = q.classification_hierarchy || [];
      const unitNode = h.find((x: any) => x.type === 'unit');
      const topicNode = h.find((x: any) => x.type === 'official_topic');
      const subtopicNode = h.find((x: any) => x.type === 'subtopic');
      const entityNode = h.find((x: any) => x.type === 'entity');

      let unitNum =
        unitNode?.unit_number ||
        q.unit_number ||
        (q.classification && q.classification.unit_number) ||
        1;

      // Extract titles
      const unitNameAr =
        unitNode?.title_arabic ||
        q.unit_name_arabic ||
        (q.classification && q.classification.unit_title_arabic) ||
        `الوحدة ${unitNum}`;
      const unitNameEn =
        unitNode?.title_english ||
        q.unit_name_english ||
        (q.classification && q.classification.unit_title_english) ||
        `Unit ${unitNum}`;

      const topicAr =
        topicNode?.title_arabic ||
        q.broad_topic_arabic ||
        (q.classification && q.classification.broad_topic_arabic) ||
        'عام';
      const topicEn =
        topicNode?.title_english ||
        q.broad_topic_english ||
        (q.classification && q.classification.broad_topic_english) ||
        'General';

      // Use canonical resolution for author/entity & subtopic
      const canonical = resolveCanonicalEntity({
        specific_entity_name_arabic: entityNode?.title_arabic || q.specific_entity_name_arabic,
        specific_entity_name_english: entityNode?.title_english || q.specific_entity_name_english,
        question_micro_focus_arabic: q.question_micro_focus_arabic,
        question_micro_focus_english: q.question_micro_focus_english,
        question_arabic: q.question_arabic || '',
      });

      const subtopicAr =
        subtopicNode?.title_arabic ||
        canonical.nameAr ||
        q.subtopic_arabic ||
        'المفاهيم العامة';
      const subtopicEn =
        subtopicNode?.title_english ||
        canonical.nameEn ||
        q.subtopic_english ||
        'General Concepts';

      const entityAr = canonical.nameAr;
      const entityEn = canonical.nameEn;

      const microAr = q.question_micro_focus_arabic || 'أسئلة عامة وتطبيقات';
      const microEn = q.question_micro_focus_english || 'General Analysis';

      const folderPathAr = `${unitNameAr} / ${topicAr} / ${subtopicAr} / ${entityAr}`;
      const folderPathEn = `${unitNameEn} / ${topicEn} / ${subtopicEn} / ${entityEn}`;

      questionSourceMap.set(qId, {
        unitNum,
        unitNameAr,
        unitNameEn,
        topicAr,
        topicEn,
        subtopicAr,
        subtopicEn,
        entityAr,
        entityEn,
        microAr,
        microEn,
        folderPathAr,
        folderPathEn,
      });
    }
  }

  console.log(`📊 Parsed classification metadata for ${questionSourceMap.size} unique questions from JSONs.\n`);

  // 2. Fetch all DB questions
  const dbQuestions = await prisma.question.findMany({
    select: {
      id: true,
      source_question_id: true,
      question_arabic: true,
      unit_id: true,
      broad_topic_id: true,
      subtopic_id: true,
      specific_entity_name_arabic: true,
      specific_entity_name_english: true,
      question_micro_focus_arabic: true,
      question_micro_focus_english: true,
    },
  });
  console.log(`📦 Loaded ${dbQuestions.length} questions from database.`);

  // 3. Pre-fetch or create units, topics, and canonical subtopics
  const units = await prisma.syllabusUnit.findMany({
    include: {
      broad_topics: {
        include: {
          subtopics: true,
        },
      },
    },
  });

  const unitMapByNumber = new Map<number, typeof units[0]>();
  for (const u of units) {
    unitMapByNumber.set(u.unit_number, u);
  }

  let updatedCount = 0;

  for (const dbQ of dbQuestions) {
    const src = questionSourceMap.get(dbQ.source_question_id) || questionSourceMap.get(dbQ.id);

    let unitNum = 1;
    let topicNameAr = 'الشعر العربي';
    let topicNameEn = 'Arabic Poetry';
    let subtopicNameAr = 'المفاهيم العامة';
    let subtopicNameEn = 'General Concepts';
    let entityNameAr = dbQ.specific_entity_name_arabic || 'المفاهيم العامة';
    let entityNameEn = dbQ.specific_entity_name_english || 'General Concepts';
    let microNameAr = dbQ.question_micro_focus_arabic || 'أسئلة عامة وتطبيقات';
    let microNameEn = dbQ.question_micro_focus_english || 'General Analysis';

    if (src) {
      unitNum = src.unitNum;
      topicNameAr = src.topicAr;
      topicNameEn = src.topicEn;
      subtopicNameAr = src.subtopicAr;
      subtopicNameEn = src.subtopicEn;
      entityNameAr = src.entityAr;
      entityNameEn = src.entityEn;
      microNameAr = src.microAr;
      microNameEn = src.microEn;
    } else {
      const canonical = resolveCanonicalEntity({
        specific_entity_name_arabic: dbQ.specific_entity_name_arabic,
        specific_entity_name_english: dbQ.specific_entity_name_english,
        question_micro_focus_arabic: dbQ.question_micro_focus_arabic,
        question_micro_focus_english: dbQ.question_micro_focus_english,
        question_arabic: dbQ.question_arabic,
      });
      entityNameAr = canonical.nameAr;
      entityNameEn = canonical.nameEn;
    }

    // Get or ensure Unit
    let unitObj = unitMapByNumber.get(unitNum);
    if (!unitObj) {
      unitObj = await prisma.syllabusUnit.create({
        data: {
          unit_number: unitNum,
          name_arabic: src?.unitNameAr || `الوحدة ${unitNum}`,
          name_english: src?.unitNameEn || `Unit ${unitNum}`,
          slug: `unit-${unitNum}`,
          order_index: unitNum,
        },
        include: { broad_topics: { include: { subtopics: true } } },
      });
      unitMapByNumber.set(unitNum, unitObj);
    }

    // Get or ensure BroadTopic
    const topicSlug = slugify(topicNameEn || topicNameAr);
    let topicObj = unitObj.broad_topics.find(
      (bt) => bt.slug === topicSlug || bt.name_arabic === topicNameAr
    );

    if (!topicObj) {
      topicObj = await prisma.broadTopic.create({
        data: {
          unit_id: unitObj.id,
          name_arabic: topicNameAr,
          name_english: topicNameEn,
          slug: topicSlug,
          order_index: unitObj.broad_topics.length + 1,
        },
        include: { subtopics: true },
      });
      unitObj.broad_topics.push(topicObj);
    }

    // Get or ensure Subtopic
    const subtopicSlug = slugify(subtopicNameEn || subtopicNameAr);
    let subtopicObj = topicObj.subtopics.find(
      (st) => st.slug === subtopicSlug || st.name_arabic === subtopicNameAr
    );

    if (!subtopicObj) {
      subtopicObj = await prisma.subtopic.create({
        data: {
          broad_topic_id: topicObj.id,
          name_arabic: subtopicNameAr,
          name_english: subtopicNameEn,
          slug: subtopicSlug,
          node_type: 'official_topic',
          node_source: 'official',
          order_index: topicObj.subtopics.length + 1,
        },
      });
      topicObj.subtopics.push(subtopicObj);
    }

    // Update Question record with clean relational IDs and metadata
    await prisma.question.update({
      where: { id: dbQ.id },
      data: {
        unit_id: unitObj.id,
        broad_topic_id: topicObj.id,
        subtopic_id: subtopicObj.id,
        specific_entity_name_arabic: entityNameAr,
        specific_entity_name_english: entityNameEn,
        question_micro_focus_arabic: microNameAr,
        question_micro_focus_english: microNameEn,
        folder_path_arabic: `${unitObj.name_arabic} / ${topicObj.name_arabic} / ${subtopicObj.name_arabic} / ${entityNameAr}`,
        folder_path_english: `${unitObj.name_english} / ${topicObj.name_english} / ${subtopicObj.name_english} / ${entityNameEn}`,
        final_folder_arabic: entityNameAr,
        final_folder_english: entityNameEn,
        classification_status: 'classified',
      },
    });

    updatedCount++;
    if (updatedCount % 500 === 0) {
      console.log(`  ⚡ Synced ${updatedCount} / ${dbQuestions.length} questions...`);
    }
  }

  console.log(`\n✅ Completed full relationship sync for all ${updatedCount} questions!`);

  // 4. Run validation check
  const totalQuestions = await prisma.question.count();
  const nullUnit = await prisma.question.count({ where: { unit_id: null } });
  const nullTopic = await prisma.question.count({ where: { broad_topic_id: null } });
  const nullSubtopic = await prisma.question.count({ where: { subtopic_id: null } });
  const nullEntity = await prisma.question.count({
    where: { specific_entity_name_arabic: null },
  });

  console.log('\n═══════════════════════════════════════');
  console.log('🎯 DATABASE INTEGRITY REPORT');
  console.log('═══════════════════════════════════════');
  console.log(`Total Questions: ${totalQuestions}`);
  console.log(`Null unit_id: ${nullUnit} (Expected: 0)`);
  console.log(`Null broad_topic_id: ${nullTopic} (Expected: 0)`);
  console.log(`Null subtopic_id: ${nullSubtopic} (Expected: 0)`);
  console.log(`Null specific_entity_name: ${nullEntity} (Expected: 0)`);
  console.log('═══════════════════════════════════════\n');
}

main()
  .catch((e) => {
    console.error('Fatal error syncing hierarchy:', e);
    process.exit(1);
  })
  .finally(() => process.exit());
