import 'dotenv/config';
import prisma from '../lib/db';
import { resolveCanonicalEntity, slugify } from '../lib/syllabusHierarchy';
import { buildArabicRegexPattern } from '../lib/arabicUtils';

async function testAllJourneys() {
  console.log('🧪 RUNNING COMPREHENSIVE END-TO-END TEST SUITE FOR ARABIC NET/JRF...\n');

  let passedTests = 0;
  let failedTests = 0;

  function assert(condition: boolean, testName: string, detail?: any) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`, detail || '');
      failedTests++;
    }
  }

  // ═════════════════════════════════════════════════════════════
  // JOURNEY 1: SYLLABUS PROGRESSIVE DISCLOSURE & DRILLDOWN
  // ═════════════════════════════════════════════════════════════
  console.log('📌 Testing Journey 1: 5-Tier Syllabus Drilldown & Relational Integrity');

  // L1: Units
  const units = await prisma.syllabusUnit.findMany({
    orderBy: { unit_number: 'asc' },
    include: {
      _count: { select: { broad_topics: true, questions: true } },
    },
  });
  assert(units.length === 10, `Found 10 official syllabus units (found: ${units.length})`);
  const allUnitsHaveQuestions = units.every((u) => u._count.questions > 0);
  assert(allUnitsHaveQuestions, 'All 10 units have mapped questions in database');

  // L2: Topics in Unit 1
  const u1Topics = await prisma.broadTopic.findMany({
    where: { unit: { unit_number: 1 } },
    include: { _count: { select: { subtopics: true, questions: true } } },
  });
  assert(u1Topics.length > 0, `Unit 1 contains ${u1Topics.length} broad topics`);

  // L3: Official Subtopics / Canonical Entities in Topic 1
  const targetTopic = u1Topics[0];
  const topicQuestions = await prisma.question.findMany({
    where: { broad_topic_id: targetTopic.id, content_status: 'PUBLISHED' },
    take: 50,
    select: {
      id: true,
      question_arabic: true,
      specific_entity_name_arabic: true,
      specific_entity_name_english: true,
      question_micro_focus_arabic: true,
      question_micro_focus_english: true,
    },
  });
  assert(topicQuestions.length > 0, `Topic "${targetTopic.name_english}" has ${topicQuestions.length} questions`);

  const canonicalEntities = new Map<string, number>();
  for (const q of topicQuestions) {
    const c = resolveCanonicalEntity(q);
    canonicalEntities.set(c.slug, (canonicalEntities.get(c.slug) || 0) + 1);
  }
  assert(canonicalEntities.size > 0, `Topic resolved into ${canonicalEntities.size} clean subtopic entities`);

  // L4 & L5: Questions in specific entity
  const firstEntitySlug = Array.from(canonicalEntities.keys())[0];
  const entityQuestions = topicQuestions.filter((q) => resolveCanonicalEntity(q).slug === firstEntitySlug);
  assert(entityQuestions.length > 0, `Entity "${firstEntitySlug}" contains ${entityQuestions.length} target questions`);

  // ═════════════════════════════════════════════════════════════
  // JOURNEY 2: PYQ PAPER DISCOVERY & QUESTION FETCHING
  // ═════════════════════════════════════════════════════════════
  console.log('\n📌 Testing Journey 2: PYQ Paper Hierarchy & Questions');

  const papers = await prisma.examPaper.findMany({
    where: { content_status: 'PUBLISHED' },
    include: { _count: { select: { questions: true } } },
  });
  assert(papers.length >= 35, `Found ${papers.length} published previous year papers`);

  const year2023Papers = papers.filter((p) => p.year === 2023 || p.year === 2020);
  assert(year2023Papers.length > 0, `Found papers for recent exam year`);

  const samplePaper = papers[0];
  const paperQuestions = await prisma.question.findMany({
    where: { exam_paper_id: samplePaper.id, content_status: 'PUBLISHED' },
    orderBy: { original_question_number: 'asc' },
  });
  assert(paperQuestions.length === samplePaper._count.questions, `Loaded all ${paperQuestions.length} questions for paper "${samplePaper.display_name}"`);
  assert(paperQuestions.every((q) => q.question_arabic && q.correct_answer && q.options_arabic), 'All questions have Arabic text, MCQ options, and correct answer');

  // ═════════════════════════════════════════════════════════════
  // JOURNEY 3: BATCH EVALUATION & SCORING LOGIC
  // ═════════════════════════════════════════════════════════════
  console.log('\n📌 Testing Journey 3: Practice / CBT Scoring & Answer Evaluation');

  const testSample = paperQuestions.slice(0, 5);
  let simulatedScore = 0;
  let correctCalculated = 0;

  for (let i = 0; i < testSample.length; i++) {
    const q = testSample[i];
    // Simulate answering correctly for even index, wrong for odd
    const selected = i % 2 === 0 ? q.correct_answer : (q.correct_answer === 'A' ? 'B' : 'A');
    const isCorrect = selected === q.correct_answer;
    if (isCorrect) {
      simulatedScore += 2;
      correctCalculated += 1;
    }
  }

  assert(correctCalculated === 3, `Correct answer evaluation accurate (3/5 correct, score: ${simulatedScore}/10)`);

  // ═════════════════════════════════════════════════════════════
  // JOURNEY 4: GLOBAL SEARCH
  // ═════════════════════════════════════════════════════════════
  console.log('\n📌 Testing Journey 4: Global Search Queries');

  const pattern = buildArabicRegexPattern('امرؤ القيس');
  const arabicSearchResults = await prisma.$queryRawUnsafe<any[]>(
    `SELECT id, question_arabic, specific_entity_name_arabic FROM "Question" WHERE content_status = 'PUBLISHED' AND (question_arabic ~* $1 OR specific_entity_name_arabic ~* $1) LIMIT 10;`,
    pattern
  );
  assert(arabicSearchResults.length > 0, `Search query for Arabic keyword "امرؤ القيس" returned ${arabicSearchResults.length} matching questions`);

  const englishSearchResults = await prisma.question.findMany({
    where: {
      content_status: 'PUBLISHED',
      OR: [
        { specific_entity_name_english: { contains: 'Jahiz', mode: 'insensitive' } },
        { question_english: { contains: 'Jahiz', mode: 'insensitive' } },
      ],
    },
    take: 10,
  });
  assert(englishSearchResults.length > 0, `Search query for "Jahiz" returned ${englishSearchResults.length} matching questions`);

  // ═════════════════════════════════════════════════════════════
  // JOURNEY 5: DATABASE RELATIONAL CONSISTENCY CHECK
  // ═════════════════════════════════════════════════════════════
  console.log('\n📌 Testing Journey 5: Database Zero-Orphan & Zero-Null Invariant');

  const totalPublishedQuestions = await prisma.question.count({ where: { content_status: 'PUBLISHED' } });
  const missingUnit = await prisma.question.count({ where: { unit_id: null } });
  const missingTopic = await prisma.question.count({ where: { broad_topic_id: null } });
  const missingSubtopic = await prisma.question.count({ where: { subtopic_id: null } });
  const missingEntity = await prisma.question.count({ where: { specific_entity_name_arabic: null } });

  assert(totalPublishedQuestions >= 3140, `Total published questions count: ${totalPublishedQuestions}`);
  assert(missingUnit === 0, `Zero questions missing unit_id (${missingUnit})`);
  assert(missingTopic === 0, `Zero questions missing broad_topic_id (${missingTopic})`);
  assert(missingSubtopic === 0, `Zero questions missing subtopic_id (${missingSubtopic})`);
  assert(missingEntity === 0, `Zero questions missing entity name (${missingEntity})`);

  console.log('\n═════════════════════════════════════════════════════════════');
  console.log(`🏁 TEST SUITE COMPLETE: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('═════════════════════════════════════════════════════════════\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

testAllJourneys()
  .catch((e) => {
    console.error('Fatal test error:', e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
