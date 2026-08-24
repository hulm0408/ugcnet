import 'dotenv/config';
import prisma from '../lib/db';

async function testAllDatabasePapers() {
  console.log('🧪 RUNNING SYSTEMATIC AUDIT ACROSS ALL 45 DATABASE PAPERS...\n');

  const papers = await prisma.examPaper.findMany({
    where: { content_status: 'PUBLISHED' },
    include: {
      _count: { select: { questions: true } },
    },
    orderBy: { year: 'asc' },
  });

  console.log(`Found ${papers.length} published exam papers in database.\n`);

  let totalQuestionsVerified = 0;
  let passedPapers = 0;
  let failedPapers = 0;

  for (let i = 0; i < papers.length; i++) {
    const paper = papers[i];
    const paperQuestions = await prisma.question.findMany({
      where: {
        exam_paper_id: paper.id,
        content_status: 'PUBLISHED',
      },
      orderBy: { original_question_number: 'asc' },
    });

    const countMatches = paperQuestions.length === paper._count.questions && paperQuestions.length > 0;
    const hasValidQuestions = paperQuestions.every(
      (q) => q.question_arabic && q.options_arabic && q.correct_answer
    );

    if (countMatches && hasValidQuestions) {
      console.log(
        `  ✅ [${i + 1}/${papers.length}] ${paper.year} - ${paper.display_name} (ID: ${paper.id}) -> ${paperQuestions.length} Questions Verified`
      );
      passedPapers++;
      totalQuestionsVerified += paperQuestions.length;
    } else {
      console.error(
        `  ❌ [${i + 1}/${papers.length}] ${paper.year} - ${paper.display_name} (ID: ${paper.id}) FAILED: countMatches=${countMatches}, hasValidQuestions=${hasValidQuestions}`
      );
      failedPapers++;
    }
  }

  console.log('\n═════════════════════════════════════════════════════════════');
  console.log(`🏁 PAPERS AUDIT COMPLETE: ${passedPapers}/${papers.length} PASSED, ${failedPapers} FAILED`);
  console.log(`🎯 Total Questions Verified in Papers: ${totalQuestionsVerified}`);
  console.log('═════════════════════════════════════════════════════════════\n');

  if (failedPapers > 0) {
    process.exit(1);
  }
}

testAllDatabasePapers().finally(() => process.exit(0));
