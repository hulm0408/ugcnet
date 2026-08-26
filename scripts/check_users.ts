import 'dotenv/config';
import prisma from '../lib/db';

async function checkUsers() {
  const subjects = await prisma.subject.findMany({
    orderBy: { order_index: 'asc' },
    include: {
      _count: {
        select: { units: true, exam_papers: true, questions: true },
      },
    },
  });

  console.log(`Registered Subjects Count: ${subjects.length}`);
  for (const s of subjects) {
    console.log(`- [Code ${s.code}] ${s.name} (id: ${s.id}, slug: ${s.slug}, lang: ${s.primary_language}, dir: ${s.direction}) | Units: ${s._count.units} | Papers: ${s._count.exam_papers} | Questions: ${s._count.questions}`);
  }
}

checkUsers().finally(() => process.exit(0));
