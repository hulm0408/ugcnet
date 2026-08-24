import 'dotenv/config';
import prisma from '../lib/db';

const PROD_BASE = 'https://arabic-net-jrf.vercel.app';

async function testAllPapersProductionLive() {
  console.log('🧪 COMMENCING LIVE PRODUCTION AUDIT ACROSS ALL 45 PAPERS...\n');

  const papers = await prisma.examPaper.findMany({
    where: { content_status: 'PUBLISHED' },
    orderBy: { year: 'asc' },
    select: {
      id: true,
      year: true,
      display_name: true,
      _count: { select: { questions: true } },
    },
  });

  console.log(`Auditing ${papers.length} papers directly against ${PROD_BASE}/api/questions...\n`);

  let passed = 0;
  let failed = 0;
  const failures: any[] = [];

  for (let i = 0; i < papers.length; i++) {
    const paper = papers[i];
    const expectedCount = paper._count.questions;
    const apiUrl = `${PROD_BASE}/api/questions?published=true&limit=250&paperId=${paper.id}`;

    try {
      const res = await fetch(apiUrl, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();
      const actualCount = json.meta?.total ?? 0;
      const returnedQuestions = json.data ?? [];

      if (actualCount !== expectedCount || returnedQuestions.length === 0) {
        throw new Error(
          `Count mismatch: Expected ${expectedCount}, got total ${actualCount}, returned ${returnedQuestions.length}`
        );
      }

      const firstQ = returnedQuestions[0];
      const lastQ = returnedQuestions[returnedQuestions.length - 1];

      if (!firstQ.question_arabic || !firstQ.options_arabic || !lastQ.question_arabic) {
        throw new Error('Question missing Arabic body or options');
      }

      console.log(
        `  ✅ [${i + 1}/${papers.length}] ${paper.year} | ${paper.display_name} (ID: ${paper.id}) -> ${actualCount}/${expectedCount} Qs (First: ${firstQ.id.slice(0, 8)}..., Last: ${lastQ.id.slice(0, 8)}...)`
      );
      passed++;
    } catch (err: any) {
      console.error(
        `  ❌ [${i + 1}/${papers.length}] ${paper.year} | ${paper.display_name} (ID: ${paper.id}) FAILED: ${err.message}`
      );
      failed++;
      failures.push({
        paperId: paper.id,
        year: paper.year,
        title: paper.display_name,
        error: err.message,
      });
    }
  }

  console.log('\n═════════════════════════════════════════════════════════════');
  console.log(`🏁 LIVE PRODUCTION 45-PAPER AUDIT: ${passed}/${papers.length} PASSED, ${failed} FAILED`);
  console.log('═════════════════════════════════════════════════════════════\n');

  if (failed > 0) {
    console.error('Failures summary:', failures);
    process.exit(1);
  }
}

testAllPapersProductionLive().finally(() => process.exit(0));
