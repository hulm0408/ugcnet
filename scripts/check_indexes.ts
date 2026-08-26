import 'dotenv/config';
import { prisma } from '../lib/db';

async function checkAllIndexes() {
  const tables = ['SyllabusUnit', 'BroadTopic', 'Subtopic', 'ExamPaper', 'Question'];
  for (const t of tables) {
    const result: any = await prisma.$queryRawUnsafe(`
      SELECT indexname, indexdef 
      FROM pg_indexes 
      WHERE tablename = '${t}';
    `);
    console.log(`\n=== Indexes for ${t} ===`);
    for (const r of result) {
      console.log(`${r.indexname}: ${r.indexdef}`);
    }
  }
  await prisma.$disconnect();
}

checkAllIndexes().catch(console.error);
