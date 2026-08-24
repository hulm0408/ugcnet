import 'dotenv/config';
import prisma from '../lib/db';

async function setupBenchmarkPapers() {
  console.log('🔧 SETTING UP DATA-DRIVEN BENCHMARK & PREMIUM TIERS IN DATABASE...\n');

  try {
    // 1. Alter ExamPaper table safely
    console.log('1. Adding is_free_benchmark and access_tier columns...');
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "ExamPaper" ADD COLUMN IF NOT EXISTS "is_free_benchmark" BOOLEAN DEFAULT false NOT NULL;
      ALTER TABLE "ExamPaper" ADD COLUMN IF NOT EXISTS "access_tier" TEXT DEFAULT 'PREMIUM' NOT NULL;
      
      CREATE INDEX IF NOT EXISTS "ExamPaper_subject_id_is_free_benchmark_idx" ON "ExamPaper"("subject_id", "is_free_benchmark");
      CREATE INDEX IF NOT EXISTS "ExamPaper_subject_id_access_tier_idx" ON "ExamPaper"("subject_id", "access_tier");
    `);
    console.log('  ✅ Schema updated.');

    // 2. Set all papers as PREMIUM by default
    console.log('\n2. Setting default access_tier to PREMIUM for all papers...');
    await prisma.$executeRawUnsafe(`
      UPDATE "ExamPaper" SET "is_free_benchmark" = false, "access_tier" = 'PREMIUM';
    `);

    // 3. Find flagship 2023 Arabic paper and designate as FREE BENCHMARK
    console.log('\n3. Designating flagship 2023 Arabic Paper as FREE BENCHMARK...');
    const arabicSubject = await prisma.subject.findUnique({ where: { code: '29' } });
    if (!arabicSubject) throw new Error('Arabic subject not found');

    const flagship2023Paper = await prisma.examPaper.findFirst({
      where: {
        subject_id: arabicSubject.id,
        year: 2023,
      },
      orderBy: { part: 'asc' },
    });

    if (!flagship2023Paper) {
      // Fallback to highest year available
      const latestPaper = await prisma.examPaper.findFirst({
        where: { subject_id: arabicSubject.id },
        orderBy: { year: 'desc' },
      });
      if (latestPaper) {
        await prisma.examPaper.update({
          where: { id: latestPaper.id },
          data: { is_free_benchmark: true, access_tier: 'FREE' },
        });
        console.log(`  ✅ Set '${latestPaper.display_name}' (${latestPaper.id}) as FREE BENCHMARK paper!`);
      }
    } else {
      await prisma.examPaper.update({
        where: { id: flagship2023Paper.id },
        data: { is_free_benchmark: true, access_tier: 'FREE' },
      });
      console.log(`  ✅ Set '${flagship2023Paper.display_name}' (${flagship2023Paper.id}) as FREE BENCHMARK paper!`);
    }

    // 4. Verification summary
    const freeCount = await prisma.examPaper.count({ where: { is_free_benchmark: true } });
    const premiumCount = await prisma.examPaper.count({ where: { access_tier: 'PREMIUM' } });
    const totalCount = await prisma.examPaper.count({});

    console.log('\n═════════════════════════════════════════════════════════════');
    console.log(`📊 TOTAL PAPERS: ${totalCount}`);
    console.log(`🟢 FREE BENCHMARK PAPERS: ${freeCount}`);
    console.log(`🔒 PREMIUM PRO PAPERS: ${premiumCount}`);
    console.log('═════════════════════════════════════════════════════════════\n');
  } catch (err: any) {
    console.error('❌ Error setting up benchmark papers:', err);
    process.exit(1);
  }
}

setupBenchmarkPapers().finally(() => process.exit(0));
