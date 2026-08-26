import 'dotenv/config';
import { prisma } from '../lib/db';
import { SUBJECT_REGISTRY, getSubjectConfig } from '../config/subjects/registry';
import { resolvePracticeContext, buildQuestionsApiUrl } from '../lib/practiceContext';
import { verifyPaperAccess } from '../lib/accessControl';

async function runMasterAcceptanceAudit() {
  console.log('===============================================================');
  console.log('     MASTER DIRECTIVE — MULTI-SUBJECT ACCEPTANCE AUDIT        ');
  console.log('===============================================================\n');

  let passedChecks = 0;
  let totalChecks = 0;

  function assert(name: string, condition: boolean, detail?: string) {
    totalChecks++;
    if (condition) {
      passedChecks++;
      console.log(`  [PASS] ${name}`);
    } else {
      console.error(`  [FAIL] ${name} — ${detail || 'Condition not met'}`);
    }
  }

  // 1. SUBJECT CONFIGURATION & REGISTRY AUDIT
  console.log('--- PHASE 1: SUBJECT REGISTRY & PEDAGOGY AUDIT ---');
  const subjects = Object.values(SUBJECT_REGISTRY);
  assert('19 active handcrafted subjects registered', subjects.length === 19, `Found ${subjects.length}`);

  const svgSet = new Set<string>();
  const headlineSet = new Set<string>();
  let totalUnitsConfig = 0;
  let totalTopicsConfig = 0;
  let totalSubtopicsConfig = 0;

  for (const s of subjects) {
    assert(`Subject [${s.code}] ${s.name} has valid slug`, !!s.slug && s.slug.length > 0);
    assert(`Subject [${s.code}] ${s.name} has unique SVG`, !svgSet.has(s.theme.heroSvgIllustration));
    svgSet.add(s.theme.heroSvgIllustration);

    assert(`Subject [${s.code}] ${s.name} has unique headline`, !headlineSet.has(s.positioningHeadline));
    headlineSet.add(s.positioningHeadline);

    assert(`Subject [${s.code}] ${s.name} has 4 distinct pedagogy pillars`, s.pillars.length === 4);
    assert(`Subject [${s.code}] ${s.name} has authentic memory example`, !!s.memoryExample?.connectionTrick);

    const units = s.officialSyllabus || [];
    assert(`Subject [${s.code}] ${s.name} has exactly 10 units`, units.length === 10, `Found ${units.length}`);
    totalUnitsConfig += units.length;

    let subjectTopics = 0;
    let subjectSubtopics = 0;
    for (const u of units) {
      subjectTopics += u.topics.length;
      for (const t of u.topics) {
        subjectSubtopics += (t.subtopics?.length || 0);
      }
    }
    totalTopicsConfig += subjectTopics;
    totalSubtopicsConfig += subjectSubtopics;

    assert(`Subject [${s.code}] ${s.name} has deep granular topics (>15 topics)`, subjectTopics > 15, `Found ${subjectTopics}`);
  }

  console.log(`  Summary Config: 19 Subjects | ${totalUnitsConfig} Units | ${totalTopicsConfig} Topics | ${totalSubtopicsConfig} Subtopics\n`);

  // 2. DATABASE INTEGRITY AUDIT
  console.log('--- PHASE 2: DATABASE MODELS & INTEGRITY AUDIT ---');
  const dbSubjects = await prisma.subject.findMany({ where: { is_active: true } });
  assert('Database has active subjects registered', dbSubjects.length >= 19, `Found ${dbSubjects.length}`);

  const dbUnits = await prisma.syllabusUnit.count();
  assert('Database has 190 syllabus units (10 per subject)', dbUnits === 190, `Found ${dbUnits}`);

  const dbTopics = await prisma.broadTopic.count();
  assert('Database has >500 authentic broad topics synced', dbTopics >= 500, `Found ${dbTopics}`);

  const dbQuestions = await prisma.question.count({ where: { content_status: 'PUBLISHED' } });
  assert('Database has published questions', dbQuestions === 3150, `Found ${dbQuestions}`);

  const unmappedQuestions = await prisma.question.count({ where: { unit_id: null } });
  assert('0 unmapped questions in database', unmappedQuestions === 0, `Found ${unmappedQuestions}`);

  const dbPapers = await prisma.examPaper.findMany({ where: { content_status: 'PUBLISHED' } });
  assert('Database has 45 published exam papers', dbPapers.length === 45, `Found ${dbPapers.length}`);

  // 3. MULTI-PAPER YEAR SEPARATION AUDIT
  console.log('--- PHASE 3: MULTI-PAPER YEAR SEPARATION AUDIT ---');
  const yearsWithMultiplePapers = [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
  for (const yr of yearsWithMultiplePapers) {
    const yrPapers = dbPapers.filter(p => p.year === yr);
    assert(`Year ${yr} has distinct papers/parts separated (${yrPapers.length} papers)`, yrPapers.length >= 2, `Found ${yrPapers.length}`);
  }

  // 4. PRACTICE CONTEXT DETERMINISM AUDIT
  console.log('--- PHASE 4: PRACTICE CONTEXT ENGINE AUDIT ---');
  const dummyPaper = dbPapers[0];

  // A. Paper mode
  const paperCtx = resolvePracticeContext({ get: (k: string) => k === 'paperId' ? dummyPaper.id : null });
  assert('Paper mode resolves deterministically', paperCtx.mode === 'paper' && paperCtx.paperId === dummyPaper.id);
  const paperUrl = buildQuestionsApiUrl(paperCtx);
  assert('Paper API URL contains paperId', paperUrl.includes(`paperId=${dummyPaper.id}`));

  // B. Unit mode
  const unitCtx = resolvePracticeContext({ get: (k: string) => k === 'unit' ? '3' : null });
  assert('Unit mode resolves deterministically', unitCtx.mode === 'unit' && unitCtx.unitNumber === 3);
  const unitUrl = buildQuestionsApiUrl(unitCtx);
  assert('Unit API URL contains unit=3', unitUrl.includes('unit=3'));

  // C. Topic mode
  const topicCtx = resolvePracticeContext({ get: (k: string) => k === 'topic' ? 'classical-poetry' : k === 'unit' ? '1' : null });
  assert('Topic mode resolves deterministically', topicCtx.mode === 'topic' && topicCtx.topicSlug === 'classical-poetry');
  const topicUrl = buildQuestionsApiUrl(topicCtx);
  assert('Topic API URL contains topic slug and unit', topicUrl.includes('topic=classical-poetry') && topicUrl.includes('unit=1'));

  // D. Incorrect mistakes mode
  const incorrectCtx = resolvePracticeContext({ get: (k: string) => k === 'mode' ? 'incorrect' : null });
  assert('Incorrect mode resolves deterministically', incorrectCtx.mode === 'incorrect');

  // E. Bookmarked mode
  const bookmarkedCtx = resolvePracticeContext({ get: (k: string) => k === 'mode' ? 'bookmarked' : null });
  assert('Bookmarked mode resolves deterministically', bookmarkedCtx.mode === 'bookmarked');

  // 5. ACCESS CONTROL & FREE BENCHMARK AUDIT
  console.log('--- PHASE 5: ACCESS CONTROL AUDIT ---');
  const freePaper = dbPapers.find(p => p.is_free_benchmark);
  assert('Free benchmark paper exists in DB', !!freePaper);
  if (freePaper) {
    const guestAccess = await verifyPaperAccess(undefined, freePaper.id);
    assert('Guest has access to free benchmark paper', guestAccess.hasAccess === true);
  }

  const premiumPaper = dbPapers.find(p => !p.is_free_benchmark && p.access_tier === 'PRO');
  if (premiumPaper) {
    const guestPremiumAccess = await verifyPaperAccess(undefined, premiumPaper.id);
    assert('Guest is denied access to premium paper without subscription', guestPremiumAccess.hasAccess === false);
  }

  console.log('\n===============================================================');
  console.log(`FINAL RESULT: ${passedChecks}/${totalChecks} CHECKS PASSED (${Math.round((passedChecks / totalChecks) * 100)}%)`);
  console.log('===============================================================');

  await prisma.$disconnect();
}

runMasterAcceptanceAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
