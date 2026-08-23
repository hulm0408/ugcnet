import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = "postgresql://postgres.dmzfgdxykvzvpfpehmrg:Mi2508@4017Mi@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const nullSubtopics = await prisma.question.count({
    where: { subtopic_id: null }
  });
  const totalQuestions = await prisma.question.count();
  console.log(`Questions with subtopic_id = null: ${nullSubtopics} out of ${totalQuestions}`);

  const nullEntities = await prisma.question.count({
    where: { specific_entity_name_arabic: null }
  });
  console.log(`Questions with specific_entity_name_arabic = null: ${nullEntities} out of ${totalQuestions}`);
}
main().finally(() => process.exit());
