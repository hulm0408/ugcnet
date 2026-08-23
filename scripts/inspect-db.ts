import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const paper = await prisma.examPaper.findFirst();
  console.log('ExamPaper sample:', JSON.stringify(paper, null, 2));
  
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true } });
  console.log('All users:', JSON.stringify(users, null, 2));
  
  const attemptCount = await prisma.practiceAttempt.count();
  const sessionData = await prisma.practiceSession.findMany({
    select: { id: true, total_questions: true, correct_count: true, current_index: true, status: true }
  });
  console.log('Actual attempt records:', attemptCount);
  console.log('Sessions:', JSON.stringify(sessionData, null, 2));

  // Promote latest user to ADMIN
  const latestUser = users[users.length - 1];
  if (latestUser && latestUser.role !== 'ADMIN') {
    await prisma.user.update({ where: { id: latestUser.id }, data: { role: 'ADMIN' } });
    console.log(`✅ Promoted ${latestUser.name} (${latestUser.email}) to ADMIN`);
  } else if (latestUser) {
    console.log(`User ${latestUser.name} is already ${latestUser.role}`);
  }
}

main().catch(console.error).finally(() => pool.end());
