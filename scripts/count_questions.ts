import prisma from '../lib/db';

async function main() {
  const count = await prisma.question.count();
  console.log(`Total questions in DB: ${count}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
