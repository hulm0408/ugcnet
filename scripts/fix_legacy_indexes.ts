import 'dotenv/config';
import { prisma } from '../lib/db';

async function fixLegacyIndexes() {
  console.log('Dropping legacy single-subject unique indexes on SyllabusUnit...');
  await prisma.$executeRawUnsafe(`DROP INDEX IF EXISTS "SyllabusUnit_unit_number_key";`);
  await prisma.$executeRawUnsafe(`DROP INDEX IF EXISTS "SyllabusUnit_slug_key";`);
  console.log('Legacy indexes dropped successfully!');
  await prisma.$disconnect();
}

fixLegacyIndexes().catch(console.error);
