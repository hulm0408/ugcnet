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
      if (q.classification && q.classification.unit_number) {
        const c = q.classification;
        const unitNum = c.unit_number;
        
        if (!hierarchyMap.has(unitNum)) {
          hierarchyMap.set(unitNum, {
            data: {
              unit_number: unitNum,
              name_arabic: c.unit_title_arabic || `الوحدة ${unitNum}`,
              name_english: c.unit_title_english || `Unit ${unitNum}`,
              slug: `unit-${unitNum}`,
              order_index: unitNum
            },
            broadTopics: new Map()
          });
        }
        
        const unitObj = hierarchyMap.get(unitNum);

        if (c.broad_topic_arabic || c.broad_topic_english) {
          const btSlug = generateSlug(c.broad_topic_english || c.broad_topic_arabic);
          if (!unitObj.broadTopics.has(btSlug)) {
            unitObj.broadTopics.set(btSlug, {
              data: {
                name_arabic: c.broad_topic_arabic || c.broad_topic_english || '',
                name_english: c.broad_topic_english || c.broad_topic_arabic || '',
                slug: btSlug,
                order_index: unitObj.broadTopics.size + 1
              },
              subtopics: new Map()
            });
          }

          const btObj = unitObj.broadTopics.get(btSlug);

          if (c.subtopic_arabic || c.subtopic_english) {
            const stSlug = generateSlug(c.subtopic_english || c.subtopic_arabic);
            if (!btObj.subtopics.has(stSlug)) {
              btObj.subtopics.set(stSlug, {
                name_arabic: c.subtopic_arabic || c.subtopic_english || '',
                name_english: c.subtopic_english || c.subtopic_arabic || '',
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

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const originalNum = q.question_number?.toString() || (i + 1).toString();
      const sourceId = `${file}_Q${originalNum}`;

      let unit_id = null;
      let broad_topic_id = null;
      let subtopic_id = null;

      if (q.classification && q.classification.unit_number) {
        const unit = dbUnits.find(u => u.unit_number === q.classification.unit_number);
        if (unit) {
          unit_id = unit.id;
          if (q.classification.broad_topic_arabic || q.classification.broad_topic_english) {
            const btSlug = generateSlug(q.classification.broad_topic_english || q.classification.broad_topic_arabic);
            const bt = unit.broad_topics.find(b => b.slug === btSlug);
            if (bt) {
              broad_topic_id = bt.id;
              if (q.classification.subtopic_arabic || q.classification.subtopic_english) {
                const stSlug = generateSlug(q.classification.subtopic_english || q.classification.subtopic_arabic);
                const st = bt.subtopics.find(s => s.slug === stSlug);
                if (st) subtopic_id = st.id;
              }
            }
          }
        }
      }

      try {
        await prisma.question.upsert({
          where: { source_question_id: sourceId },
          update: {
            question_arabic: q.question_text_arabic || q.question_arabic || 'No question text',
            question_english: q.question_text_english || q.question_english || null,
            options_arabic: q.options || q.options_arabic || {},
            options_english: q.options_english || null,
            correct_answer: q.correct_answer || 'A',
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
            correct_answer: q.correct_answer || 'A',
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
        importedForFile++;
      } catch (err) {
        console.error(`Error importing ${sourceId}:`, err);
        await prisma.importError.create({
          data: {
            job_id: job.id,
            row_number: i,
            error_type: 'upsert_failed',
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
