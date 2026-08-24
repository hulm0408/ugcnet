import 'dotenv/config';
import prisma from '../lib/db';

function buildArabicRegexPattern(input: string): string {
  // Strip diacritics first
  const clean = input
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .trim();

  // Insert optional diacritics pattern between Arabic characters
  // Also normalize Alef (أ إ آ ا ٱ), Taa Marbuta (ة ه), Yaa (ي ى)
  const arabicDiacritics = '[\\u064B-\\u065F\\u0670]*';

  let pattern = '';
  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    if (/[أإآٱا]/.test(char)) {
      pattern += '[أإآٱا]' + arabicDiacritics;
    } else if (/[ةه]/.test(char)) {
      pattern += '[ةه]' + arabicDiacritics;
    } else if (/[يى]/.test(char)) {
      pattern += '[يى]' + arabicDiacritics;
    } else if (/[\u0600-\u06FF]/.test(char)) {
      pattern += char + arabicDiacritics;
    } else {
      pattern += char;
    }
  }

  return pattern;
}

async function test() {
  const pattern = buildArabicRegexPattern('الشعراء');
  console.log('Regex Pattern for "الشعراء":', pattern);

  // Test with Prisma queryRaw
  const results = await prisma.$queryRawUnsafe<any[]>(
    `SELECT id, question_arabic, specific_entity_name_arabic FROM "Question" WHERE question_arabic ~* $1 OR specific_entity_name_arabic ~* $1 LIMIT 5;`,
    pattern
  );

  console.log(`Found ${results.length} matches for "الشعراء":`);
  for (const r of results) {
    console.log(' -', r.question_arabic.substring(0, 70));
  }

  // Test "امرؤ القيس"
  const pattern2 = buildArabicRegexPattern('امرؤ القيس');
  const results2 = await prisma.$queryRawUnsafe<any[]>(
    `SELECT id, question_arabic, specific_entity_name_arabic FROM "Question" WHERE question_arabic ~* $1 OR specific_entity_name_arabic ~* $1 LIMIT 5;`,
    pattern2
  );
  console.log(`\nFound ${results2.length} matches for "امرؤ القيس":`);
  for (const r of results2) {
    console.log(' -', r.question_arabic.substring(0, 70), '| Entity:', r.specific_entity_name_arabic);
  }
}

test().finally(() => process.exit(0));
