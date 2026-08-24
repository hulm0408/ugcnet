import 'dotenv/config';
import prisma from '../lib/db';

async function checkUsers() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, name: true },
  });
  console.log('Current users in PostgreSQL:', users);
}

checkUsers().finally(() => process.exit(0));
