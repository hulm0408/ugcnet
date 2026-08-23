import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Fetching questions...');
  const questions = await prisma.question.findMany();
  
  console.log('Fetching syllabus units...');
  const units = await prisma.syllabusUnit.findMany();
  
  console.log('Fetching broad topics...');
  const broadTopics = await prisma.broadTopic.findMany();
  
  console.log('Fetching users...');
  const users = await prisma.user.findMany();

  const backupData = {
    questions,
    units,
    broadTopics,
    users
  };

  const backupPath = path.join(process.cwd(), 'database_backup_pre_deploy.json');
  fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
  console.log(`Backup created successfully at ${backupPath}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
