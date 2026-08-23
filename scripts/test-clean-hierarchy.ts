import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = "postgresql://postgres.dmzfgdxykvzvpfpehmrg:Mi2508@4017Mi@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function slugify(text: string): string {
  return (text || 'unnamed')
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Clean entity / author normalization
function normalizeEntityName(rawAr: string | null, rawEn: string | null, questionText: string): { nameAr: string, nameEn: string } {
  const ar = (rawAr || '').trim();
  const en = (rawEn || '').trim();

  if (ar.includes('امرؤ القيس') || ar.includes('امْرِئِ الْقَيْسِ') || en.toLowerCase().includes('imru')) {
    return { nameAr: 'امْرُؤُ الْقَيْسِ', nameEn: "Imru' al-Qais" };
  }
  if (ar.includes('طرفة') || ar.includes('طَرَفَةَ') || en.toLowerCase().includes('tarafa')) {
    return { nameAr: 'طَرَفَةُ بْنُ الْعَبْدِ', nameEn: 'Tarafah ibn al-Abd' };
  }
  if (ar.includes('زهير') || ar.includes('زُهَيْرِ') || en.toLowerCase().includes('zuhayr')) {
    return { nameAr: 'زُهَيْرُ بْنُ أَبِي سُلْمَى', nameEn: 'Zuhayr ibn Abi Sulma' };
  }
  if (ar.includes('عنترة') || ar.includes('عَنْتَرَةَ') || en.toLowerCase().includes('antara')) {
    return { nameAr: 'عَنْتَرَةُ بْنُ شَدَّادٍ', nameEn: "'Antarah ibn Shaddad" };
  }
  if (ar.includes('عمرو بن كلثوم') || ar.includes('عَمْرِو بْنِ كُلْثُومٍ') || en.toLowerCase().includes('kulthum')) {
    return { nameAr: 'عَمْرُو بْنُ كُلْثُومٍ', nameEn: "'Amr ibn Kulthum" };
  }
  if (ar.includes('لبيد') || ar.includes('لَبِيدِ') || en.toLowerCase().includes('labid')) {
    return { nameAr: 'لَبِيدُ بْنُ رَبِيعَةَ', nameEn: 'Labid ibn Rabi\'ah' };
  }
  if (ar.includes('الحارث بن حلزة') || ar.includes('الْحَارِثُ') || en.toLowerCase().includes('harith')) {
    return { nameAr: 'الْحَارِثُ بْنُ حِلِّزَةَ', nameEn: 'Al-Harith ibn Hillizah' };
  }
  if (ar.includes('النابغة') || ar.includes('النَّابِغَةُ') || en.toLowerCase().includes('nabigha')) {
    return { nameAr: 'النَّابِغَةُ الذُّبْيَانِيُّ', nameEn: 'Al-Nabighah al-Dhubyani' };
  }
  if (ar.includes('الأعشى') || ar.includes('الْأَعْشَى') || en.toLowerCase().includes("a'sha")) {
    return { nameAr: 'الْأَعْشَى (مَيْمُونُ بْنُ قَيْسٍ)', nameEn: "Al-A'sha (Maymun ibn Qays)" };
  }
  if (ar.includes('المعلقات') || ar.includes('الْمُعَلَّقَاتُ') || en.toLowerCase().includes('muallaqat')) {
    return { nameAr: 'الْمُعَلَّقَاتُ السَّبْعُ (نَظْرَةٌ عَامَّةٌ)', nameEn: 'The Seven Mu\'allaqat Overview' };
  }

  if (ar) return { nameAr: ar, nameEn: en || ar };
  return { nameAr: 'عَامٌّ / مَفَاهِيمُ أَدَبِيَّةٌ', nameEn: 'General Literary Concepts' };
}

async function testHierarchy() {
  const bt = await prisma.broadTopic.findFirst({
    where: { slug: 'the-mu-allaqat-and-their-poets' },
    include: {
      questions: {
        where: { content_status: 'PUBLISHED' },
        select: {
          id: true,
          question_arabic: true,
          specific_entity_name_arabic: true,
          specific_entity_name_english: true,
          question_micro_focus_arabic: true,
          question_micro_focus_english: true,
        }
      }
    }
  });

  // Group into Subtopics (The Poets & Key Categories)
  const subtopicMap = new Map<string, {
    nameAr: string;
    nameEn: string;
    slug: string;
    totalQuestions: number;
    nodesMap: Map<string, {
      nameAr: string;
      nameEn: string;
      slug: string;
      questions: any[];
    }>;
  }>();

  for (const q of bt?.questions || []) {
    const { nameAr: subAr, nameEn: subEn } = normalizeEntityName(
      q.specific_entity_name_arabic,
      q.specific_entity_name_english,
      q.question_arabic
    );

    const subSlug = slugify(subEn);

    if (!subtopicMap.has(subSlug)) {
      subtopicMap.set(subSlug, {
        nameAr: subAr,
        nameEn: subEn,
        slug: subSlug,
        totalQuestions: 0,
        nodesMap: new Map()
      });
    }

    const subObj = subtopicMap.get(subSlug)!;
    subObj.totalQuestions++;

    // Micro-Theme (Learning Node)
    const nodeAr = q.question_micro_focus_arabic?.trim() || 'أسئلة عامة وتطبيقات';
    const nodeEn = q.question_micro_focus_english?.trim() || 'General Questions & Analysis';
    const nodeSlug = slugify(nodeEn || nodeAr);

    if (!subObj.nodesMap.has(nodeSlug)) {
      subObj.nodesMap.set(nodeSlug, {
        nameAr: nodeAr,
        nameEn: nodeEn,
        slug: nodeSlug,
        questions: []
      });
    }

    subObj.nodesMap.get(nodeSlug)!.questions.push(q);
  }

  console.log(`Topic: ${bt?.name_english} -> Total Clean Subtopics: ${subtopicMap.size}`);
  for (const sub of subtopicMap.values()) {
    console.log(`\n  👉 Sub-topic: ${sub.nameEn} (${sub.nameAr}) [${sub.totalQuestions} Questions, ${sub.nodesMap.size} Learning Nodes]`);
    for (const node of sub.nodesMap.values()) {
      console.log(`       * Node: ${node.nameEn} (${node.nameAr}) -> ${node.questions.length} Qs`);
    }
  }
}
testHierarchy().finally(() => process.exit());
