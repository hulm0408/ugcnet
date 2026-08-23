import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = "postgresql://postgres.dmzfgdxykvzvpfpehmrg:Mi2508@4017Mi@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const units = await prisma.syllabusUnit.findMany({
    orderBy: { unit_number: 'asc' },
    include: {
      broad_topics: {
        orderBy: { order_index: 'asc' },
        include: {
          subtopics: {
            take: 10
          },
          _count: { select: { subtopics: true, questions: true } }
        }
      }
    }
  });

  for (const u of units) {
    console.log(`\n========================================`);
    console.log(`UNIT ${u.unit_number}: ${u.name_english} (${u.name_arabic})`);
    console.log(`Total Broad Topics: ${u.broad_topics.length}`);
    for (const bt of u.broad_topics) {
      console.log(`  -> TOPIC: ${bt.name_english} (${bt.name_arabic}) [Slug: ${bt.slug}] [${bt._count.subtopics} subtopics, ${bt._count.questions} Qs]`);
      const sampleSubtopics = bt.subtopics.map(s => `${s.name_arabic} (${s.name_english})`);
      console.log(`      Sample subtopics:`, sampleSubtopics.slice(0, 5));
    }
  }
}
main().finally(() => process.exit());
