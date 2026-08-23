import prisma from '../lib/db';

const syllabusUnits = [
  {
    unit_number: 1,
    name_arabic: 'الشِّعْرُ الْعَرَبِيُّ',
    name_english: 'Arabic Poetry (up to Abbasid Period)',
    slug: 'arabic-poetry',
    order_index: 1,
    broad_topics: [
      { name_arabic: 'الشعر الجاهلي', name_english: 'Pre-Islamic Poetry', slug: 'pre-islamic', order_index: 1 },
      { name_arabic: 'الشعر الإسلامي والأموي', name_english: 'Islamic and Umayyad Poetry', slug: 'islamic-umayyad', order_index: 2 },
      { name_arabic: 'الشعر العباسي', name_english: 'Abbasid Poetry', slug: 'abbasid', order_index: 3 },
    ],
  },
  {
    unit_number: 2,
    name_arabic: 'النَّثْرُ الْعَرَبِيُّ',
    name_english: 'Arabic Prose (up to Abbasid Period)',
    slug: 'arabic-prose',
    order_index: 2,
    broad_topics: [
      { name_arabic: 'الخطابة والمواعظ', name_english: 'Oratory and Sermons', slug: 'oratory', order_index: 1 },
      { name_arabic: 'الرسائل والمقامات', name_english: 'Epistles and Maqamat', slug: 'epistles-maqamat', order_index: 2 },
      { name_arabic: 'الأدب العباسي', name_english: 'Abbasid Prose', slug: 'abbasid-prose', order_index: 3 },
    ],
  },
  {
    unit_number: 3,
    name_arabic: 'أَدَبُ الْمَهْجَرِ وَالْأَنْدَلُسِيُّ',
    name_english: 'Mahjar & Andalusian Literature',
    slug: 'mahjar-andalusian',
    order_index: 3,
    broad_topics: [
      { name_arabic: 'الأدب الأندلسي', name_english: 'Andalusian Literature', slug: 'andalusian', order_index: 1 },
      { name_arabic: 'أدب المهجر', name_english: 'Mahjar Literature', slug: 'mahjar', order_index: 2 },
      { name_arabic: 'الرابطة القلمية', name_english: 'The Pen League', slug: 'pen-league', order_index: 3 },
    ],
  },
  {
    unit_number: 4,
    name_arabic: 'النَّقْدُ الْأَدَبِيُّ',
    name_english: 'Literary Criticism',
    slug: 'literary-criticism',
    order_index: 4,
    broad_topics: [
      { name_arabic: 'النقد القديم', name_english: 'Classical Criticism', slug: 'classical-criticism', order_index: 1 },
      { name_arabic: 'النقد الحديث', name_english: 'Modern Criticism', slug: 'modern-criticism', order_index: 2 },
    ],
  },
  {
    unit_number: 5,
    name_arabic: 'الْبَلَاغَةُ وَالْعَرُوضُ',
    name_english: 'Rhetoric & Prosody (Arud)',
    slug: 'rhetoric-prosody',
    order_index: 5,
    broad_topics: [
      { name_arabic: 'علم البيان', name_english: 'Ilm al-Bayan (Figures of Speech)', slug: 'ilm-al-bayan', order_index: 1 },
      { name_arabic: 'علم المعاني', name_english: 'Ilm al-Maani (Semantics)', slug: 'ilm-al-maani', order_index: 2 },
      { name_arabic: 'علم البديع', name_english: 'Ilm al-Badi (Embellishments)', slug: 'ilm-al-badi', order_index: 3 },
      { name_arabic: 'العروض والقوافي', name_english: 'Prosody and Rhyme', slug: 'arud-qawafi', order_index: 4 },
    ],
  },
  {
    unit_number: 6,
    name_arabic: 'الْمَصَادِرُ وَالْمَرَاجِعُ',
    name_english: 'Sources & References',
    slug: 'sources-references',
    order_index: 6,
    broad_topics: [
      { name_arabic: 'المعاجم العربية', name_english: 'Arabic Dictionaries', slug: 'dictionaries', order_index: 1 },
      { name_arabic: 'الموسوعات', name_english: 'Encyclopedias', slug: 'encyclopedias', order_index: 2 },
    ],
  },
  {
    unit_number: 7,
    name_arabic: 'الْأَدَبُ الْحَدِيثُ',
    name_english: 'Modern Arabic Literature',
    slug: 'modern-literature',
    order_index: 7,
    broad_topics: [
      { name_arabic: 'الشعر الحديث', name_english: 'Modern Poetry', slug: 'modern-poetry', order_index: 1 },
      { name_arabic: 'الرواية والقصة', name_english: 'Novels and Short Stories', slug: 'novels-stories', order_index: 2 },
      { name_arabic: 'المسرحية', name_english: 'Drama', slug: 'drama', order_index: 3 },
    ],
  },
  {
    unit_number: 8,
    name_arabic: 'الِاتِّجَاهَاتُ وَالْمَدَارِسُ',
    name_english: 'Literary Movements & Schools',
    slug: 'literary-movements',
    order_index: 8,
    broad_topics: [
      { name_arabic: 'الكلاسيكية الجديدة', name_english: 'Neo-Classicism', slug: 'neo-classicism', order_index: 1 },
      { name_arabic: 'الرومانسية', name_english: 'Romanticism', slug: 'romanticism', order_index: 2 },
      { name_arabic: 'الواقعية', name_english: 'Realism', slug: 'realism', order_index: 3 },
      { name_arabic: 'الرمزية', name_english: 'Symbolism', slug: 'symbolism', order_index: 4 },
    ],
  },
  {
    unit_number: 9,
    name_arabic: 'الْأَدَبُ الْهِنْدِيُّ',
    name_english: 'Indo-Arabic Literature',
    slug: 'indo-arabic',
    order_index: 9,
    broad_topics: [
      { name_arabic: 'اللغة العربية في الهند', name_english: 'Arabic in India', slug: 'arabic-india', order_index: 1 },
      { name_arabic: 'أعلام الهند', name_english: 'Major Indian Scholars', slug: 'indian-scholars', order_index: 2 },
      { name_arabic: 'الإسهامات الهندية', name_english: 'Indian Contributions to Arabic', slug: 'indian-contributions', order_index: 3 },
    ],
  },
  {
    unit_number: 10,
    name_arabic: 'التَّرْجَمَةُ وَالتَّطْبِيقَاتُ',
    name_english: 'Translation & Language Applications',
    slug: 'translation-linguistics',
    order_index: 10,
    broad_topics: [
      { name_arabic: 'نظريات الترجمة', name_english: 'Translation Theory', slug: 'translation-theory', order_index: 1 },
      { name_arabic: 'علم اللغة', name_english: 'Linguistics', slug: 'linguistics', order_index: 2 },
      { name_arabic: 'علم اللغة التطبيقي', name_english: 'Applied Linguistics', slug: 'applied-linguistics', order_index: 3 },
    ],
  },
];

async function main() {
  console.log('Starting database seed...');

  for (const unit of syllabusUnits) {
    const { broad_topics, ...unitData } = unit;

    const createdUnit = await prisma.syllabusUnit.upsert({
      where: { unit_number: unit.unit_number },
      update: unitData,
      create: unitData,
    });

    console.log(`Upserted Unit: ${createdUnit.name_english}`);

    for (const topic of broad_topics) {
      await prisma.broadTopic.upsert({
        where: {
          unit_id_slug: {
            unit_id: createdUnit.id,
            slug: topic.slug,
          },
        },
        update: topic,
        create: {
          ...topic,
          unit_id: createdUnit.id,
        },
      });
      console.log(`  Upserted Topic: ${topic.name_english}`);
    }
  }

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
