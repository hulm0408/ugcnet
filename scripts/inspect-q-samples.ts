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
        where: {
          content_status: 'PUBLISHED',
          specific_entity_name_arabic: null
        },
        take: 10,
        select: {
          id: true,
          original_question_number: true,
          question_arabic: true,
          subtopic: {
            select: {
              name_arabic: true,
              name_english: true
            }
          },
          folder_path_arabic: true,
          folder_path_english: true,
          final_folder_arabic: true,
          final_folder_english: true,
          question_micro_focus_arabic: true
        }
      }
    }
  });

  console.log(`Sample questions with null entity under The Muallaqat:`, bt?.questions);
}
main().finally(() => process.exit());
