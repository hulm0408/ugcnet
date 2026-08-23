import * as fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = "postgresql://postgres.dmzfgdxykvzvpfpehmrg:Mi2508@4017Mi@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const DATA_DIR = path.resolve('..', ''); // e:\NET PRACTICE

function parseFileName(filename: string) {
  let year = 2000;
  const yearMatch = filename.match(/(20\d\d)/);
  if (yearMatch) year = parseInt(yearMatch[1], 10);

  let paper_number = 'II';
  if (filename.includes('Paper_III')) paper_number = 'III';
  
  let session = null;
  if (filename.toLowerCase().includes('june')) session = 'June';
  else if (filename.toLowerCase().includes('dec') || filename.toLowerCase().includes('nov')) session = 'Dec';
  else if (filename.toLowerCase().includes('jan')) session = 'Jan';

  let part = null;
  if (filename.includes('Part1') || filename.includes('Part 1')) part = 'Part 1';
  if (filename.includes('Part2') || filename.includes('Part 2')) part = 'Part 2';

  let is_paper_iii = paper_number === 'III';

  let exam_name = `NET JRF Arabic ${session ? session + ' ' : ''}${year}`;
  if (filename.toLowerCase().includes('leaked') || filename.toLowerCase().includes('renet')) {
    exam_name += ' (Re-NET / Leaked)';
  }
  if (part) {
     exam_name += ` ${part}`;
  }
  if (is_paper_iii) {
     exam_name += ' Paper III';
  }

  return { exam_name, year, session, part, paper_number, is_paper_iii };
}

function generateSlug(text: string): string {
  if (!text) return 'unnamed';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractClassification(q: any) {
  const hierarchy = q.classification_hierarchy || [];
  
  let unit_number = q.unit_number || (q.classification && q.classification.unit_number);
  let unit_name_arabic = q.unit_name_arabic || (q.classification && q.classification.unit_title_arabic);
  let unit_name_english = q.unit_name_english || (q.classification && q.classification.unit_title_english);
  
  let bt_arabic = q.broad_topic_arabic || (q.classification && q.classification.broad_topic_arabic);
  let bt_english = q.broad_topic_english || (q.classification && q.classification.broad_topic_english);
  
  let st_arabic = q.subtopic_arabic || (q.classification && q.classification.subtopic_arabic);
  let st_english = q.subtopic_english || (q.classification && q.classification.subtopic_english);

  if (hierarchy.length > 0) {
    const unitNode = hierarchy.find((h: any) => h.type === 'unit');
    if (unitNode) {
      unit_name_arabic = unitNode.title_arabic || unit_name_arabic;
      unit_name_english = unitNode.title_english || unit_name_english;
    }
    
    const btNode = hierarchy.find((h: any) => h.type === 'official_topic');
    if (btNode) {
      bt_arabic = btNode.title_arabic || bt_arabic;
      bt_english = btNode.title_english || bt_english;
    }

    const stNode = hierarchy.find((h: any) => h.type === 'subtopic');
    if (stNode) {
      st_arabic = stNode.title_arabic || st_arabic;
      st_english = stNode.title_english || st_english;
    }
  }

  // Fallback map if unit_number is totally missing but name is present (edge case)
  if (!unit_number && unit_name_english) {
    const unitMatch = unit_name_english.match(/Unit\s+(\d+)/i);
    if (unitMatch) unit_number = parseInt(unitMatch[1], 10);
    // Hardcoded fallback based on standard syllabus if needed:
    else if (unit_name_english.includes("Pre-Islamic")) unit_number = 1;
    else if (unit_name_english.includes("Umayyad")) unit_number = 2;
    else if (unit_name_english.includes("Abbasid")) unit_number = 3;
    else if (unit_name_english.includes("Andalusian")) unit_number = 4;
    else if (unit_name_english.includes("Modern")) unit_number = 5;
    else if (unit_name_english.includes("Prose")) unit_number = 6;
    else if (unit_name_english.includes("Criticism")) unit_number = 7;
    else if (unit_name_english.includes("Rhetoric")) unit_number = 8;
    else if (unit_name_english.includes("Translation")) unit_number = 9;
    else if (unit_name_english.includes("Indo-Arab")) unit_number = 10;
  }
  if (!unit_number && unit_name_arabic) {
    if (unit_name_arabic.includes("الجاهلي")) unit_number = 1;
    else if (unit_name_arabic.includes("الأموي")) unit_number = 2;
    else if (unit_name_arabic.includes("العباسي")) unit_number = 3;
    else if (unit_name_arabic.includes("الأندلسي")) unit_number = 4;
    else if (unit_name_arabic.includes("الحديث")) unit_number = 5;
    else if (unit_name_arabic.includes("النثر")) unit_number = 6;
    else if (unit_name_arabic.includes("النقد")) unit_number = 7;
    else if (unit_name_arabic.includes("البلاغة")) unit_number = 8;
    else if (unit_name_arabic.includes("الترجمة")) unit_number = 9;
    else if (unit_name_arabic.includes("الهند")) unit_number = 10;
  }

  return {
    unit_number: unit_number ? parseInt(unit_number.toString(), 10) : null,
    unit_name_arabic,
    unit_name_english,
    bt_arabic,
    bt_english,
    st_arabic,
    st_english
  };
}


async function runImport() {
  console.log('Starting full database import pipeline...');
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('package'));
  
  let totalImported = 0;

  // PASS 1: Build the Syllabus Hierarchy
  console.log('--- PASS 1: Rebuilding Syllabus Hierarchy ---');
  
  const hierarchyMap = new Map();

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(rawData);
    const questions = Array.isArray(jsonData) ? jsonData : (jsonData.questions || []);

    for (const q of questions) {
      const cls = extractClassification(q);
      const unitNum = cls.unit_number;

      if (unitNum) {
        if (!hierarchyMap.has(unitNum)) {
          hierarchyMap.set(unitNum, {
            data: {
              unit_number: unitNum,
              name_arabic: cls.unit_name_arabic || `الوحدة ${unitNum}`,
              name_english: cls.unit_name_english || `Unit ${unitNum}`,
              slug: `unit-${unitNum}`,
              order_index: unitNum
            },
            broadTopics: new Map()
          });
        }
        
        const unitObj = hierarchyMap.get(unitNum);

        const btArabic = cls.bt_arabic;
        const btEnglish = cls.bt_english;

        if (btArabic || btEnglish) {
          const btSlug = generateSlug(btEnglish || btArabic);
          if (!unitObj.broadTopics.has(btSlug)) {
            unitObj.broadTopics.set(btSlug, {
              data: {
                name_arabic: btArabic || btEnglish || '',
                name_english: btEnglish || btArabic || '',
                slug: btSlug,
                order_index: unitObj.broadTopics.size + 1
              },
              subtopics: new Map()
            });
          }

          const btObj = unitObj.broadTopics.get(btSlug);

          const stArabic = cls.st_arabic;
          const stEnglish = cls.st_english;

          if (stArabic || stEnglish) {
            const stSlug = generateSlug(stEnglish || stArabic);
            if (!btObj.subtopics.has(stSlug)) {
              btObj.subtopics.set(stSlug, {
                name_arabic: stArabic || stEnglish || '',
                name_english: stEnglish || stArabic || '',
                slug: stSlug,
                node_type: 'official_topic',
                node_source: 'official',
                order_index: btObj.subtopics.size + 1
              });
            }
          }
        }
      }
    }
  }

  // Clear existing syllabus
  console.log('Clearing existing syllabus to recreate from source of truth...');
  await prisma.subtopic.deleteMany({});
  await prisma.broadTopic.deleteMany({});
  await prisma.syllabusUnit.deleteMany({});

  // Insert Hierarchy into DB
  for (const [unitNum, unitObj] of Array.from(hierarchyMap.entries()).sort((a, b) => a[0] - b[0])) {
    const createdUnit = await prisma.syllabusUnit.upsert({
      where: { unit_number: unitNum },
      update: { name_arabic: unitObj.data.name_arabic, name_english: unitObj.data.name_english },
      create: unitObj.data
    });

    for (const [btSlug, btObj] of unitObj.broadTopics.entries()) {
      const createdBt = await prisma.broadTopic.upsert({
        where: { unit_id_slug: { unit_id: createdUnit.id, slug: btSlug } },
        update: { name_arabic: btObj.data.name_arabic, name_english: btObj.data.name_english },
        create: { ...btObj.data, unit_id: createdUnit.id }
      });

      for (const [stSlug, stObj] of btObj.subtopics.entries()) {
        await prisma.subtopic.upsert({
          where: { broad_topic_id_slug: { broad_topic_id: createdBt.id, slug: stSlug } },
          update: { name_arabic: stObj.name_arabic, name_english: stObj.name_english },
          create: { ...stObj, broad_topic_id: createdBt.id }
        });
      }
    }
  }
  console.log('✅ Syllabus hierarchy rebuilt from JSON files.');

  // Pre-fetch the hierarchy to link questions
  const dbUnits = await prisma.syllabusUnit.findMany({ include: { broad_topics: { include: { subtopics: true } } } });

  // PASS 2: Import Questions
  console.log('--- PASS 2: Importing Questions ---');
  for (const file of files) {
    console.log(`Processing ${file}...`);
    const filePath = path.join(DATA_DIR, file);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(rawData);
    const questions = Array.isArray(jsonData) ? jsonData : (jsonData.questions || []);

    if (!questions || questions.length === 0) continue;

    const meta = parseFileName(file);
    
    const job = await prisma.importJob.create({
      data: {
        file_name: file,
        imported_by: 'system',
        total_records: questions.length,
        status: 'importing'
      }
    });

    let examPaper = await prisma.examPaper.findFirst({ where: { source_file_name: file } });
    if (!examPaper) {
      examPaper = await prisma.examPaper.create({
        data: {
          source_file_name: file,
          exam_name: meta.exam_name,
          display_name: meta.exam_name,
          year: meta.year,
          session: meta.session,
          part: meta.part,
          paper_number: meta.paper_number,
          is_paper_iii: meta.is_paper_iii,
          total_questions: questions.length,
          content_status: 'PUBLISHED'
        }
      });
    }

    let importedForFile = 0;

    const CHUNK_SIZE = 25;
    for (let i = 0; i < questions.length; i += CHUNK_SIZE) {
      const chunk = questions.slice(i, i + CHUNK_SIZE);
      const upsertPromises = chunk.map((q: any, chunkIndex: number) => {
        const originalNum = q.question_number?.toString() || (i + chunkIndex + 1).toString();
        const sourceId = `${file}_Q${originalNum}`;

        let unit_id = null;
        let broad_topic_id = null;
        let subtopic_id = null;

        const cls = extractClassification(q);
        const unitNum = cls.unit_number;
        const btArabic = cls.bt_arabic;
        const btEnglish = cls.bt_english;
        const stArabic = cls.st_arabic;
        const stEnglish = cls.st_english;

        if (unitNum) {
          const unit = dbUnits.find((u: any) => u.unit_number === unitNum);
          if (unit) {
            unit_id = unit.id;
            if (btArabic || btEnglish) {
              const btSlug = generateSlug(btEnglish || btArabic);
              const bt = unit.broad_topics.find((b: any) => b.slug === btSlug);
              if (bt) {
                broad_topic_id = bt.id;
                if (stArabic || stEnglish) {
                  const stSlug = generateSlug(stEnglish || stArabic);
                  const st = bt.subtopics.find((s: any) => s.slug === stSlug);
                  if (st) subtopic_id = st.id;
                }
              }
            }
          }
        }

        return prisma.question.upsert({
          where: { source_question_id: sourceId },
          update: {
            question_arabic: q.question_text_arabic || q.question_arabic || 'No question text',
            question_english: q.question_text_english || q.question_english || null,
            options_arabic: q.options || q.options_arabic || {},
            options_english: q.options_english || null,
            correct_answer: Array.isArray(q.correct_answer) ? String(q.correct_answer[0]) : (q.correct_answer ? String(q.correct_answer) : 'A'),
            correct_answer_text_arabic: q.correct_answer_text_arabic || null,
            correct_answer_text_english: q.correct_answer_text_english || null,
            explanation_arabic: q.explanation_arabic || null,
            explanation_english: q.explanation_english || null,
            unit_id,
            broad_topic_id,
            subtopic_id,
            specific_entity_name_arabic: q.classification?.specific_entity_name_arabic || null,
            specific_entity_name_english: q.classification?.specific_entity_name_english || null,
            question_micro_focus_arabic: q.question_micro_focus_arabic || null,
            question_micro_focus_english: q.question_micro_focus_english || null,
          },
          create: {
            source_question_id: sourceId,
            source_file_name: file,
            exam_paper_id: examPaper.id,
            original_question_number: originalNum,
            question_arabic: q.question_text_arabic || q.question_arabic || 'No question text',
            question_english: q.question_text_english || q.question_english || null,
            question_type: q.question_type || 'Direct MCQ',
            context_paragraph_arabic: q.context_paragraph_arabic || null,
            context_paragraph_english: q.context_paragraph_english || null,
            matching_table_arabic: q.matching_table_arabic || null,
            matching_table_english: q.matching_table_english || null,
            options_arabic: q.options || q.options_arabic || {},
            options_english: q.options_english || null,
            options_generated: q.options_generated || false,
            correct_answer: Array.isArray(q.correct_answer) ? String(q.correct_answer[0]) : (q.correct_answer ? String(q.correct_answer) : 'A'),
            correct_answer_text_arabic: q.correct_answer_text_arabic || null,
            correct_answer_text_english: q.correct_answer_text_english || null,
            explanation_arabic: q.explanation_arabic || null,
            explanation_english: q.explanation_english || null,
            unit_id,
            broad_topic_id,
            subtopic_id,
            specific_entity_name_arabic: q.classification?.specific_entity_name_arabic || null,
            specific_entity_name_english: q.classification?.specific_entity_name_english || null,
            question_micro_focus_arabic: q.question_micro_focus_arabic || null,
            question_micro_focus_english: q.question_micro_focus_english || null,
            import_job_id: job.id
          }
        });
      });

      try {
        await Promise.all(upsertPromises);
        importedForFile += chunk.length;
      } catch (err) {
        console.error(`Error importing chunk starting at index ${i}:`, err);
        await prisma.importError.create({
          data: {
            job_id: job.id,
            row_number: i,
            error_type: 'chunk_upsert_failed',
            error_message: err instanceof Error ? err.message : String(err)
          }
        });
      }
    }

    await prisma.importJob.update({
      where: { id: job.id },
      data: { status: 'completed', imported_count: importedForFile, completed_at: new Date() }
    });
    
    totalImported += importedForFile;
    console.log(`✅ Imported ${importedForFile} questions from ${file}`);
  }

  console.log(`🎉 Import Pipeline Complete. Total Questions Imported: ${totalImported}`);
}

runImport()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
