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

// Extract canonical author / entity from question metadata
export function resolveCanonicalEntity(q: {
  specific_entity_name_arabic?: string | null;
  specific_entity_name_english?: string | null;
  question_micro_focus_arabic?: string | null;
  question_arabic: string;
}): { nameAr: string; nameEn: string; slug: string } {
  const combined = `${q.specific_entity_name_arabic || ''} ${q.specific_entity_name_english || ''} ${q.question_micro_focus_arabic || ''} ${q.question_arabic}`.toLowerCase();

  // Unit 1 Poets & Figures
  if (combined.includes('امرؤ القيس') || combined.includes('امْرِئِ الْقَيْسِ') || combined.includes('امرى القيس') || combined.includes('imru')) {
    return { nameAr: 'امْرُؤُ الْقَيْسِ', nameEn: "Imru' al-Qais", slug: 'imru-al-qays' };
  }
  if (combined.includes('طرفة بن العبد') || combined.includes('طَرَفَةَ') || combined.includes('tarafa')) {
    return { nameAr: 'طَرَفَةُ بْنُ الْعَبْدِ', nameEn: 'Tarafah ibn al-Abd', slug: 'tarafa-ibn-al-abd' };
  }
  if (combined.includes('زهير بن أبي سلمى') || combined.includes('زُهَيْرِ') || combined.includes('zuhayr')) {
    return { nameAr: 'زُهَيْرُ بْنُ أَبِي سُلْمَى', nameEn: 'Zuhayr ibn Abi Sulma', slug: 'zuhayr-ibn-abi-sulma' };
  }
  if (combined.includes('عنترة بن شداد') || combined.includes('عَنْتَرَةَ') || combined.includes('antara')) {
    return { nameAr: 'عَنْتَرَةُ بْنُ شَدَّادٍ', nameEn: "'Antarah ibn Shaddad", slug: 'antara-ibn-shaddad' };
  }
  if (combined.includes('عمرو بن كلثوم') || combined.includes('عَمْرِو بْنِ كُلْثُومٍ') || combined.includes('kulthum')) {
    return { nameAr: 'عَمْرُو بْنُ كُلْثُومٍ', nameEn: "'Amr ibn Kulthum", slug: 'amr-ibn-kulthum' };
  }
  if (combined.includes('لبيد بن ربيعة') || combined.includes('لَبِيدِ') || combined.includes('labid')) {
    return { nameAr: 'لَبِيدُ بْنُ رَبِيعَةَ', nameEn: 'Labid ibn Rabi\'ah', slug: 'labid-ibn-rabi-a' };
  }
  if (combined.includes('الحارث بن حلزة') || combined.includes('الْحَارِثُ') || combined.includes('harith')) {
    return { nameAr: 'الْحَارِثُ بْنُ حِلِّزَةَ', nameEn: 'Al-Harith ibn Hillizah', slug: 'al-harith-ibn-hilliza' };
  }
  if (combined.includes('النابغة الذبياني') || combined.includes('النَّابِغَةُ') || combined.includes('nabigha')) {
    return { nameAr: 'النَّابِغَةُ الذُّبْيَانِيُّ', nameEn: 'Al-Nabighah al-Dhubyani', slug: 'al-nabigha-al-dhubyani' };
  }
  if (combined.includes('الأعشى') || combined.includes('الْأَعْشَى') || combined.includes("a'sha")) {
    return { nameAr: 'الْأَعْشَى (مَيْمُونُ بْنُ قَيْسٍ)', nameEn: "Al-A'sha", slug: 'al-a-sha' };
  }
  if (combined.includes('حاتم الطائي') || combined.includes('حَاتِمٍ') || combined.includes('hatim')) {
    return { nameAr: 'حَاتِمٌ الطَّائِيُّ', nameEn: "Hatim al-Ta'i", slug: 'hatim-al-tai' };
  }
  if (combined.includes('عبيد بن الأبرص') || combined.includes('الْأَبْرَصِ') || combined.includes('ubayd')) {
    return { nameAr: 'عَبِيدُ بْنُ الْأَبْرَصِ', nameEn: 'Ubayd ibn al-Abras', slug: 'ubayd-ibn-al-abras' };
  }
  if (combined.includes('حماد الراوية') || combined.includes('حَمَّادٍ الرَّاوِيَةِ') || combined.includes('hammad')) {
    return { nameAr: 'حَمَّادٌ الرَّاوِيَةُ', nameEn: 'Hammad al-Rawiyah', slug: 'hammad-al-rawiyah' };
  }
  if (combined.includes('الشنفرى') || combined.includes('shanfara')) {
    return { nameAr: 'الشَّنْفَرَى', nameEn: 'Al-Shanfara', slug: 'al-shanfara' };
  }
  if (combined.includes('تأبط شرا') || combined.includes('taabbata')) {
    return { nameAr: 'تَأَبَّطَ شَرًّا', nameEn: 'Ta\'abbata Sharran', slug: 'taabbata-sharran' };
  }
  if (combined.includes('عروة بن الورد') || combined.includes('urwah')) {
    return { nameAr: 'عُرْوَةُ بْنُ الْوَرْدِ', nameEn: 'Urwah ibn al-Ward', slug: 'urwah-ibn-al-ward' };
  }
  if (combined.includes('حسان بن ثابت') || combined.includes('hassan')) {
    return { nameAr: 'حَسَّانُ بْنُ ثَابِتٍ', nameEn: 'Hassan ibn Thabit', slug: 'hassan-ibn-thabit' };
  }
  if (combined.includes('كعب بن زهير') || combined.includes("ka'b")) {
    return { nameAr: 'كَعْبُ بْنُ زُهَيْرٍ', nameEn: 'Ka\'b ibn Zuhayr', slug: 'kab-ibn-zuhayr' };
  }
  if (combined.includes('الخنساء') || combined.includes('khansa')) {
    return { nameAr: 'الْخَنْسَاءُ', nameEn: 'Al-Khansa', slug: 'al-khansa' };
  }
  if (combined.includes('الحطيئة') || combined.includes('hutay')) {
    return { nameAr: 'الْحُطَيْئَةُ', nameEn: 'Al-Hutay\'ah', slug: 'al-hutayah' };
  }
  if (combined.includes('جرير') || combined.includes('jarir')) {
    return { nameAr: 'جَرِيرٌ', nameEn: 'Jarir', slug: 'jarir' };
  }
  if (combined.includes('الفرزدق') || combined.includes('farazdaq')) {
    return { nameAr: 'الْفَرَزْدَقُ', nameEn: 'Al-Farazdaq', slug: 'al-farazdaq' };
  }
  if (combined.includes('الأخطل') || combined.includes('akhtal')) {
    return { nameAr: 'الْأَخْطَلُ', nameEn: 'Al-Akhtal', slug: 'al-akhtal' };
  }
  if (combined.includes('عمر بن أبي ربيعة') || combined.includes('umar ibn abi')) {
    return { nameAr: 'عُمَرُ بْنُ أَبِي رَبِيعَةَ', nameEn: 'Umar ibn Abi Rabi\'ah', slug: 'umar-ibn-abi-rabiah' };
  }
  if (combined.includes('المتنبي') || combined.includes('mutanabbi')) {
    return { nameAr: 'أَبُو الطَّيِّبِ الْمُتَنَبِّي', nameEn: 'Al-Mutanabbi', slug: 'al-mutanabbi' };
  }
  if (combined.includes('المعري') || combined.includes('maari') || combined.includes("ma'arri")) {
    return { nameAr: 'أَبُو الْعَلَاءِ الْمَعَرِّيُّ', nameEn: 'Abu al-Ala al-Ma\'arri', slug: 'abu-al-ala-al-maarri' };
  }
  if (combined.includes('أبو تمام') || combined.includes('abu tammam')) {
    return { nameAr: 'أَبُو تَمَّامٍ', nameEn: 'Abu Tammam', slug: 'abu-tammam' };
  }
  if (combined.includes('البحتري') || combined.includes('buhturi')) {
    return { nameAr: 'الْبُحْتُرِيُّ', nameEn: 'Al-Buhturi', slug: 'al-buhturi' };
  }
  if (combined.includes('أبو نواس') || combined.includes('abu nuwas')) {
    return { nameAr: 'أَبُو نُوَاسٍ', nameEn: 'Abu Nuwas', slug: 'abu-nuwas' };
  }
  if (combined.includes('بشار بن برد') || combined.includes('bashshar')) {
    return { nameAr: 'بَشَّارُ بْنُ بُرْدٍ', nameEn: 'Bashshar ibn Burd', slug: 'bashshar-ibn-burd' };
  }
  if (combined.includes('ابن الرومي') || combined.includes('ibn al-rumi')) {
    return { nameAr: 'ابْنُ الرُّومِيِّ', nameEn: 'Ibn al-Rumi', slug: 'ibn-al-rumi' };
  }
  if (combined.includes('ابن زيدون') || combined.includes('ibn zaydun')) {
    return { nameAr: 'ابْنُ زَيْدُونَ', nameEn: 'Ibn Zaydun', slug: 'ibn-zaydun' };
  }
  if (combined.includes('الجاحظ') || combined.includes('al-jahiz')) {
    return { nameAr: 'الْجَاحِظُ', nameEn: 'Al-Jahiz', slug: 'al-jahiz' };
  }
  if (combined.includes('بديع الزمان') || combined.includes('hamadhani')) {
    return { nameAr: 'بَدِيعُ الزَّمَانِ الْهَمَذَانِيُّ', nameEn: 'Badi al-Zaman al-Hamadhani', slug: 'badi-al-zaman-al-hamadhani' };
  }
  if (combined.includes('الحريري') || combined.includes('al-hariri')) {
    return { nameAr: 'الْحَرِيرِيُّ', nameEn: 'Al-Hariri', slug: 'al-hariri' };
  }
  if (combined.includes('ابن المقفع') || combined.includes('ibn al-muqaffa')) {
    return { nameAr: 'ابْنُ الْمُقَفَّعِ', nameEn: 'Ibn al-Muqaffa', slug: 'ibn-al-muqaffa' };
  }
  if (combined.includes('طه حسين') || combined.includes('taha hussein')) {
    return { nameAr: 'طَهَ حُسَيْن', nameEn: 'Taha Hussein', slug: 'taha-hussein' };
  }
  if (combined.includes('محمود سامي البارودي') || combined.includes('al-barudi') || combined.includes('baroudi')) {
    return { nameAr: 'مَحْمُود سَامِي الْبَارُودِيّ', nameEn: 'Mahmoud Sami al-Baroudi', slug: 'mahmoud-sami-al-baroudi' };
  }
  if (combined.includes('أحمد شوقي') || combined.includes('shawqi') || combined.includes('shawki')) {
    return { nameAr: 'أَحْمَد شَوْقِي', nameEn: 'Ahmad Shawqi', slug: 'ahmad-shawqi' };
  }
  if (combined.includes('حافظ إبراهيم') || combined.includes('hafiz ibrahim')) {
    return { nameAr: 'حَافِظ إِبْرَاهِيم', nameEn: 'Hafiz Ibrahim', slug: 'hafiz-ibrahim' };
  }
  if (combined.includes('جبران خليل جبران') || combined.includes('gibran')) {
    return { nameAr: 'جُبْرَان خَلِيل جُبْرَان', nameEn: 'Kahlil Gibran', slug: 'kahlil-gibran' };
  }
  if (combined.includes('إيليا أبو ماضي') || combined.includes('elia abu madi') || combined.includes('abu madhi')) {
    return { nameAr: 'إِيلِيَّا أَبُو مَاضِي', nameEn: 'Elia Abu Madi', slug: 'elia-abu-madi' };
  }
  if (combined.includes('ميخائيل نعيمة') || combined.includes('mikhail naimy')) {
    return { nameAr: 'مِيخَائِيل نُعَيْمَة', nameEn: 'Mikhail Naimy', slug: 'mikhail-naimy' };
  }
  if (combined.includes('نجيب محفوظ') || combined.includes('naguib mahfouz')) {
    return { nameAr: 'نَجِيب مَحْفُوظ', nameEn: 'Naguib Mahfouz', slug: 'naguib-mahfouz' };
  }
  if (combined.includes('توفيق الحكيم') || combined.includes('tawfiq al-hakim')) {
    return { nameAr: 'تَوْفِيق الْحَكِيم', nameEn: 'Tawfiq al-Hakim', slug: 'tawfiq-al-hakim' };
  }
  if (combined.includes('الشاه ولي الله') || combined.includes('shah waliullah')) {
    return { nameAr: 'الشَّاهُ وَلِيُّ اللَّهِ الدِّهْلَوِيُّ', nameEn: 'Shah Waliullah al-Dihlawi', slug: 'shah-waliullah' };
  }
  if (combined.includes('علي الحسني الندوي') || combined.includes('ali hasani nadwi')) {
    return { nameAr: 'أَبُو الْحَسَنِ عَلِيٌّ الْحَسَنِيُّ النَّدْوِيُّ', nameEn: 'Abul Hasan Ali Nadwi', slug: 'abul-hasan-ali-nadwi' };
  }

  // Fallback to specific_entity_name if available
  if (q.specific_entity_name_arabic && q.specific_entity_name_arabic !== 'عام' && q.specific_entity_name_arabic !== 'General') {
    return {
      nameAr: q.specific_entity_name_arabic,
      nameEn: q.specific_entity_name_english || q.specific_entity_name_arabic,
      slug: slugify(q.specific_entity_name_english || q.specific_entity_name_arabic)
    };
  }

  return {
    nameAr: 'الْمَفَاهِيمُ وَالْقَضَايَا الْعَامَّةُ',
    nameEn: 'General Concepts & Overview',
    slug: 'general-overview'
  };
}

async function main() {
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

  const subtopicMap = new Map<string, {
    nameAr: string;
    nameEn: string;
    slug: string;
    totalQuestions: number;
    nodesMap: Map<string, {
      nameAr: string;
      nameEn: string;
      slug: string;
      questionsCount: number;
    }>;
  }>();

  for (const q of bt?.questions || []) {
    const canonical = resolveCanonicalEntity(q);

    if (!subtopicMap.has(canonical.slug)) {
      subtopicMap.set(canonical.slug, {
        nameAr: canonical.nameAr,
        nameEn: canonical.nameEn,
        slug: canonical.slug,
        totalQuestions: 0,
        nodesMap: new Map()
      });
    }

    const sub = subtopicMap.get(canonical.slug)!;
    sub.totalQuestions++;

    const nodeAr = q.question_micro_focus_arabic?.trim() || 'أسئلة عامة وتطبيقات';
    const nodeEn = q.question_micro_focus_english?.trim() || 'General Questions & Analysis';
    const nodeSlug = slugify(nodeEn || nodeAr);

    if (!sub.nodesMap.has(nodeSlug)) {
      sub.nodesMap.set(nodeSlug, {
        nameAr: nodeAr,
        nameEn: nodeEn,
        slug: nodeSlug,
        questionsCount: 0
      });
    }

    sub.nodesMap.get(nodeSlug)!.questionsCount++;
  }

  console.log(`\n========================================`);
  console.log(`Topic: The Mu'allaqat and Their Poets`);
  console.log(`Clean Sub-topics Count: ${subtopicMap.size}`);
  const sorted = Array.from(subtopicMap.values()).sort((a, b) => b.totalQuestions - a.totalQuestions);
  for (const sub of sorted) {
    console.log(`  👉 Sub-topic (Poet/Category): ${sub.nameEn} (${sub.nameAr}) [${sub.totalQuestions} Questions, ${sub.nodesMap.size} Learning Nodes]`);
  }
}
main().finally(() => process.exit());
