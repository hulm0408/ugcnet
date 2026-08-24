import 'dotenv/config';
import prisma from '../lib/db';

async function main() {
  console.log('🔍 TRACING 2015 PART 1 PAPERS AND QUESTIONS IN DATABASE...\n');

  // Find all papers for 2015
  const papers = await prisma.examPaper.findMany({
    where: { year: 2015 },
    include: {
      _count: { select: { questions: true } },
    },
  });

  console.log('All 2015 ExamPaper records in DB:');
  for (const p of papers) {
    console.log(`- ID: ${p.id}`);
    console.log(`  Title: ${p.display_name}`);
    console.log(`  Source File: ${p.source_file_name}`);
    console.log(`  Content Status: ${p.content_status}`);
    console.log(`  Questions Count: ${p._count.questions}`);
  }

  console.log('\nChecking question records for paperId "cmt4kfy4k00zzskuzoqcfgr44":');
  const questionsById = await prisma.question.findMany({
    where: { exam_paper_id: 'cmt4kfy4k00zzskuzoqcfgr44' },
    select: { id: true, content_status: true, question_arabic: true, exam_paper_id: true },
  });
  console.log(`Found ${questionsById.length} questions.`);
  if (questionsById.length > 0) {
    console.log('Sample question content_status:', questionsById[0].content_status);
  }

  console.log('\nChecking all ExamPapers in DB count:');
  const allPapers = await prisma.examPaper.findMany({
    select: { id: true, year: true, display_name: true, _count: { select: { questions: true } } },
  });
  console.log(`Total ExamPapers: ${allPapers.length}`);
  const zeroCount = allPapers.filter((p) => p._count.questions === 0);
  console.log(`Papers with 0 questions: ${zeroCount.length}`);
  for (const z of zeroCount) {
    console.log(` - ${z.year} ${z.display_name} (ID: ${z.id})`);
  }
}

main().finally(() => process.exit(0));
