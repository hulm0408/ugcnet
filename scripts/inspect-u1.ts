import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = "postgresql://postgres.dmzfgdxykvzvpfpehmrg:Mi2508@4017Mi@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const u1 = await prisma.syllabusUnit.findFirst({
    where: { unit_number: 1 },
    include: {
      broad_topics: {
        include: {
          subtopics: true,
          _count: { select: { subtopics: true, questions: true } }
        }
      }
    }
  });

  console.log(`UNIT 1: ${u1?.name_english} (${u1?.name_arabic})`);
  for (const bt of u1?.broad_topics || []) {
    console.log(`\n-----------------------------------------`);
    console.log(`BroadTopic ID: ${bt.id}, Name: ${bt.name_english} (${bt.name_arabic}), Slug: ${bt.slug}, Total Subtopics: ${bt._count.subtopics}, Qs: ${bt._count.questions}`);
    console.log(`Sample 5 subtopics:`);
    bt.subtopics.slice(0, 10).forEach((st, i) => {
      console.log(`  ${i+1}. [${st.id}] ${st.name_arabic} | ${st.name_english}`);
    });
  }
}
main().finally(() => process.exit());
