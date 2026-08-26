import 'dotenv/config';
import { prisma } from '../lib/db';

async function auditDatabase() {
  console.log('=== COMPREHENSIVE DATABASE INTEGRITY AUDIT ===\n');

  // 1. Core Entity Counts
  const subjectsCount = await prisma.subject.count();
  const examPapersCount = await prisma.examPaper.count();
  const questionsCount = await prisma.question.count();
  const syllabusUnitsCount = await prisma.syllabusUnit.count();
  const broadTopicsCount = await prisma.broadTopic.count();
  const subtopicsCount = await prisma.subtopic.count();
  const usersCount = await prisma.user.count();
  const sessionsCount = await prisma.practiceSession.count();
  const attemptsCount = await prisma.practiceAttempt.count();
  const bookmarksCount = await prisma.bookmark.count();
  const subscriptionsCount = await prisma.userSubscription.count();

  console.log(`Subjects:          ${subjectsCount}`);
  console.log(`Exam Papers:       ${examPapersCount}`);
  console.log(`Total Questions:   ${questionsCount}`);
  console.log(`Syllabus Units:    ${syllabusUnitsCount}`);
  console.log(`Broad Topics:      ${broadTopicsCount}`);
  console.log(`Subtopics:         ${subtopicsCount}`);
  console.log(`Users:             ${usersCount}`);
  console.log(`Practice Sessions: ${sessionsCount}`);
  console.log(`Practice Attempts: ${attemptsCount}`);
  console.log(`Bookmarks:         ${bookmarksCount}`);
  console.log(`Subscriptions:     ${subscriptionsCount}\n`);

  // 2. Subject Breakdown
  console.log('--- SUBJECT BREAKDOWN ---');
  const subjects = await prisma.subject.findMany({
    include: {
      _count: {
        select: {
          exam_papers: true,
          questions: true,
          units: true,
        },
      },
    },
    orderBy: { order_index: 'asc' },
  });

  for (const s of subjects) {
    console.log(
      `[${s.code}] ${s.name.padEnd(30)} | Slug: ${s.slug.padEnd(20)} | Papers: ${s._count.exam_papers} | Questions: ${s._count.questions} | DB Units: ${s._count.units}`
    );
  }

  // 3. Question Classification Breakdown
  console.log('\n--- QUESTION CLASSIFICATION AUDIT ---');
  const mappedQuestions = await prisma.question.count({
    where: { unit_id: { not: null } },
  });
  const unmappedQuestions = await prisma.question.count({
    where: { unit_id: null },
  });

  console.log(`Total Questions:    ${questionsCount}`);
  console.log(`Mapped to Unit:     ${mappedQuestions}`);
  console.log(`Unmapped to Unit:   ${unmappedQuestions}`);

  // 4. Exam Papers Breakdown
  console.log('\n--- EXAM PAPERS BREAKDOWN ---');
  const papers = await prisma.examPaper.findMany({
    include: {
      subject_ref: true,
      _count: {
        select: { questions: true },
      },
    },
    orderBy: [{ year: 'desc' }, { paper_number: 'asc' }],
  });

  console.log(`Total Exam Papers: ${papers.length}`);
  for (const p of papers) {
    console.log(
      `Paper [${p.id}] Year: ${p.year} | Paper: ${p.paper_number} | Part: ${p.part || '-'} | Status: ${p.content_status} | Free: ${p.is_free_benchmark} | Title: "${p.display_name}" | Questions: ${p._count.questions} (expected: ${p.total_questions}) | Subject: ${p.subject_ref?.name || p.subject}`
    );
  }

  // 5. Check Duplicate Questions
  console.log('\n--- DUPLICATE QUESTION AUDIT ---');
  const duplicates = await prisma.question.groupBy({
    by: ['source_question_id'],
    _count: {
      id: true,
    },
    having: {
      id: {
        _count: {
          gt: 1,
        },
      },
    },
  });
  console.log(`Duplicate source_question_id count: ${duplicates.length}`);

  // 6. Free Benchmark Papers
  console.log('\n--- FREE BENCHMARK PAPERS BY SUBJECT ---');
  const freePapers = await prisma.examPaper.findMany({
    where: { is_free_benchmark: true },
    include: { subject_ref: true },
  });
  for (const fp of freePapers) {
    console.log(
      `Free Benchmark: [${fp.subject_ref?.name || fp.subject}] Year: ${fp.year} Paper ${fp.paper_number} (${fp.display_name})`
    );
  }

  await prisma.$disconnect();
}

auditDatabase().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
