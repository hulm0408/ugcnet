import 'dotenv/config';
import prisma from '../lib/db';

async function migrateToMultiSubject() {
  console.log('🚀 MIGRATING DATABASE TO MULTI-SUBJECT ARCHITECTURE...\n');

  // 1. Upsert Subjects
  console.log('--- 1. Seeding Official Subjects ---');
  const arabicSubject = await prisma.subject.upsert({
    where: { code: '29' },
    update: {
      slug: 'arabic',
      name: 'Arabic',
      name_native: 'اللغة العربية وآدابها',
      is_paper_1: false,
      direction: 'rtl',
      primary_language: 'ar',
      secondary_language: 'en',
      is_active: true,
      order_index: 1,
    },
    create: {
      code: '29',
      slug: 'arabic',
      name: 'Arabic',
      name_native: 'اللغة العربية وآدابها',
      is_paper_1: false,
      direction: 'rtl',
      primary_language: 'ar',
      secondary_language: 'en',
      is_active: true,
      order_index: 1,
    },
  });
  console.log(`  ✅ Subject: ${arabicSubject.name} (Code ${arabicSubject.code}, ID: ${arabicSubject.id})`);

  const paper1Subject = await prisma.subject.upsert({
    where: { code: '00' },
    update: {
      slug: 'paper-1',
      name: 'General Paper 1',
      name_native: 'General Paper on Teaching & Research Aptitude',
      is_paper_1: true,
      direction: 'ltr',
      primary_language: 'en',
      secondary_language: 'hi',
      is_active: true,
      order_index: 0,
    },
    create: {
      code: '00',
      slug: 'paper-1',
      name: 'General Paper 1',
      name_native: 'General Paper on Teaching & Research Aptitude',
      is_paper_1: true,
      direction: 'ltr',
      primary_language: 'en',
      secondary_language: 'hi',
      is_active: true,
      order_index: 0,
    },
  });
  console.log(`  ✅ Subject: ${paper1Subject.name} (Code ${paper1Subject.code}, ID: ${paper1Subject.id})`);

  const englishSubject = await prisma.subject.upsert({
    where: { code: '30' },
    update: {
      slug: 'english',
      name: 'English',
      name_native: 'English Literature',
      is_paper_1: false,
      direction: 'ltr',
      primary_language: 'en',
      is_active: true,
      order_index: 2,
    },
    create: {
      code: '30',
      slug: 'english',
      name: 'English',
      name_native: 'English Literature',
      is_paper_1: false,
      direction: 'ltr',
      primary_language: 'en',
      is_active: true,
      order_index: 2,
    },
  });
  console.log(`  ✅ Subject: ${englishSubject.name} (Code ${englishSubject.code}, ID: ${englishSubject.id})`);

  const commerceSubject = await prisma.subject.upsert({
    where: { code: '08' },
    update: {
      slug: 'commerce',
      name: 'Commerce',
      name_native: 'Commerce & Management',
      is_paper_1: false,
      direction: 'ltr',
      primary_language: 'en',
      secondary_language: 'hi',
      is_active: true,
      order_index: 3,
    },
    create: {
      code: '08',
      slug: 'commerce',
      name: 'Commerce',
      name_native: 'Commerce & Management',
      is_paper_1: false,
      direction: 'ltr',
      primary_language: 'en',
      secondary_language: 'hi',
      is_active: true,
      order_index: 3,
    },
  });
  console.log(`  ✅ Subject: ${commerceSubject.name} (Code ${commerceSubject.code}, ID: ${commerceSubject.id})`);

  // 2. Link Existing Syllabus Units to Arabic
  console.log('\n--- 2. Linking Existing Syllabus Units to Arabic ---');
  const updatedUnits = await prisma.syllabusUnit.updateMany({
    where: { subject_id: null },
    data: { subject_id: arabicSubject.id },
  });
  console.log(`  ✅ Linked ${updatedUnits.count} SyllabusUnits to Arabic`);

  // 3. Link Existing Exam Papers to Arabic
  console.log('\n--- 3. Linking Existing Exam Papers to Arabic ---');
  const updatedPapers = await prisma.examPaper.updateMany({
    where: { subject_id: null },
    data: { subject_id: arabicSubject.id },
  });
  console.log(`  ✅ Linked ${updatedPapers.count} ExamPapers to Arabic`);

  // 4. Link Existing Questions to Arabic
  console.log('\n--- 4. Linking Existing Questions to Arabic ---');
  const updatedQuestions = await prisma.question.updateMany({
    where: { subject_id: null },
    data: { subject_id: arabicSubject.id },
  });
  console.log(`  ✅ Linked ${updatedQuestions.count} Questions to Arabic`);

  // 5. Link Existing Practice Sessions to Arabic
  console.log('\n--- 5. Linking Existing Practice Sessions to Arabic ---');
  const updatedSessions = await prisma.practiceSession.updateMany({
    where: { subject_id: null },
    data: { subject_id: arabicSubject.id },
  });
  console.log(`  ✅ Linked ${updatedSessions.count} PracticeSessions to Arabic`);

  // 6. Set Active Subject for existing users
  console.log('\n--- 6. Updating User Active Subject Preferences ---');
  const updatedUsers = await prisma.user.updateMany({
    where: { active_subject_id: null },
    data: { active_subject_id: arabicSubject.id },
  });
  console.log(`  ✅ Updated ${updatedUsers.count} Users with active subject (Arabic)`);

  // 7. Seed Default Subscription Plans
  console.log('\n--- 7. Seeding Subscription Plans ---');
  const plans = [
    {
      name: 'Single Subject Pro Pass (6 Months)',
      plan_type: 'SINGLE_SUBJECT',
      duration_days: 180,
      price_inr: 1499,
      features: [
        'Complete Subject Question Bank (2004–2024)',
        'Full General Paper 1 Included',
        'Unlimited CBT Mock Tests & Timer Simulations',
        'Personal Mistake Tracker & Weak Topic Analytics',
        'Interactive 5-Tier Syllabus Drilldown',
      ],
    },
    {
      name: 'Single Subject Pro Pass (1 Year)',
      plan_type: 'SINGLE_SUBJECT',
      duration_days: 365,
      price_inr: 2499,
      features: [
        'Full 1-Year Access to Subscribed Subject + Paper 1',
        'All 45+ PYQ Papers & Solutions',
        'Unlimited Mock Tests with Detailed Explanations',
        'Spaced Repetition & Weak Area Memory Boosters',
        'Priority Doubt Resolution & Exam Updates',
      ],
    },
    {
      name: 'All-Access Master Pass (1 Year)',
      plan_type: 'ALL_ACCESS',
      duration_days: 365,
      price_inr: 4999,
      features: [
        'Access to ALL Subjects on the Platform',
        'Full General Paper 1 Master Question Bank',
        'Unlimited CBT Simulations across All Subjects',
        'Multi-Subject Analytics & Mistake Trackers',
        'All Future Subject Launches Included',
      ],
    },
    {
      name: 'General Paper 1 Master Pass (6 Months)',
      plan_type: 'PAPER_1_ONLY',
      duration_days: 180,
      price_inr: 799,
      features: [
        'Complete Paper 1 Question Bank (10 Units)',
        'Teaching & Research Aptitude Special Modules',
        'Data Interpretation & Mathematical Reasoning Drills',
        'Timed Paper 1 Mock Tests',
      ],
    },
  ];

  for (const p of plans) {
    const existing = await prisma.subscriptionPlan.findFirst({ where: { name: p.name } });
    if (!existing) {
      await prisma.subscriptionPlan.create({ data: p });
      console.log(`  ✅ Created Plan: ${p.name} (₹${p.price_inr})`);
    } else {
      console.log(`  ℹ️ Plan already exists: ${p.name}`);
    }
  }

  console.log('\n═════════════════════════════════════════════════════════════');
  console.log('🏁 MULTI-SUBJECT MIGRATION COMPLETE: ZERO ORPHANS, ALL LINKED!');
  console.log('═════════════════════════════════════════════════════════════\n');
}

migrateToMultiSubject().finally(() => process.exit(0));
