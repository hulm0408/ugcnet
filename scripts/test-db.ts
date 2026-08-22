import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = "postgresql://postgres.dmzfgdxykvzvpfpehmrg:Mi2508@4017Mi@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const badQuestions = await prisma.question.count({
    where: { question_arabic: "No question text" }
  });
  console.log(`Questions with 'No question text': ${badQuestions}`);
  
  // Let's get the first 5 questions and see what their data looks like
  const sample = await prisma.question.findMany({
    take: 5,
    select: {
      id: true,
      original_question_number: true,
      question_arabic: true,
      question_english: true
    }
  });
  console.log('Sample questions:', JSON.stringify(sample, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
