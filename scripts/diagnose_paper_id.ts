import 'dotenv/config';
import prisma from '../lib/db';

async function main() {
  console.log('🔍 Checking paperId "cmt4kfy4k00zzskuzoqcfgr44"...');

  const paper = await prisma.examPaper.findUnique({
    where: { id: 'cmt4kfy4k00zzskuzoqcfgr44' },
    include: {
      _count: { select: { questions: true } },
    },
  });

  console.log('Paper query result:', paper);

  // Search 2015 papers
  const papers2015 = await prisma.examPaper.findMany({
    where: { year: 2015 },
    include: {
      _count: { select: { questions: true } },
    },
  });

  console.log('All 2015 papers in DB:', papers2015);
}

main().finally(() => process.exit(0));
