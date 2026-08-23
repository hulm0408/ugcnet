import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = "postgresql://postgres.dmzfgdxykvzvpfpehmrg:Mi2508@4017Mi@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const bt = await prisma.broadTopic.findFirst({
    where: { slug: 'the-mu-allaqat-and-their-poets' },
    include: {
      questions: {
        where: { content_status: 'PUBLISHED' },
        select: {
          id: true,
          specific_entity_name_arabic: true,
          specific_entity_name_english: true,
          question_micro_focus_arabic: true,
          question_micro_focus_english: true,
          subtopic: {
            select: {
              name_arabic: true,
              name_english: true
            }
          }
        }
      }
    }
  });

  console.log(`BroadTopic: ${bt?.name_english} (${bt?.name_arabic}) — Total Questions: ${bt?.questions.length}`);

  const entityCount = new Map<string, { count: number, nameEn: string, microFocuses: Set<string> }>();

  for (const q of bt?.questions || []) {
    const entAr = q.specific_entity_name_arabic || 'عام / متفرقات';
    const entEn = q.specific_entity_name_english || 'General / Muallaqat Overview';
    if (!entityCount.has(entAr)) {
      entityCount.set(entAr, { count: 0, nameEn: entEn, microFocuses: new Set() });
    }
    const e = entityCount.get(entAr)!;
    e.count++;
    if (q.question_micro_focus_arabic) e.microFocuses.add(q.question_micro_focus_arabic);
  }

  console.log('\nGrouped by Entity (The True Sub-Entities / Poets under this Topic):');
  for (const [entAr, data] of entityCount.entries()) {
    console.log(`  * ${data.nameEn} (${entAr}): ${data.count} Questions [${data.microFocuses.size} micro-focus themes]`);
  }
}
main().finally(() => process.exit());
