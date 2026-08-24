import 'dotenv/config';
import prisma from '../lib/db';

async function applyMultiSubjectSchemaAndSeed() {
  console.log('🔧 APPLYING MULTI-SUBJECT SCHEMA DIRECTLY VIA SQL (ZERO DATA LOSS)...\n');

  try {
    // 1. Create Subject table if not exists
    console.log('1. Creating Subject table...');
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Subject" (
        "id" TEXT PRIMARY KEY,
        "code" TEXT UNIQUE NOT NULL,
        "slug" TEXT UNIQUE NOT NULL,
        "name" TEXT NOT NULL,
        "name_native" TEXT,
        "is_paper_1" BOOLEAN DEFAULT false NOT NULL,
        "direction" TEXT DEFAULT 'ltr' NOT NULL,
        "primary_language" TEXT DEFAULT 'en' NOT NULL,
        "secondary_language" TEXT,
        "is_active" BOOLEAN DEFAULT true NOT NULL,
        "order_index" INTEGER DEFAULT 0 NOT NULL,
        "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    // 2. Create SubscriptionPlan and UserSubscription tables
    console.log('2. Creating Subscription tables...');
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SubscriptionPlan" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL,
        "plan_type" TEXT NOT NULL,
        "duration_days" INTEGER NOT NULL,
        "price_inr" INTEGER NOT NULL,
        "features" JSONB,
        "is_active" BOOLEAN DEFAULT true NOT NULL,
        "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "UserSubscription" (
        "id" TEXT PRIMARY KEY,
        "user_id" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
        "plan_id" TEXT NOT NULL REFERENCES "SubscriptionPlan"("id") ON DELETE CASCADE,
        "subject_id" TEXT REFERENCES "Subject"("id") ON DELETE SET NULL,
        "status" TEXT DEFAULT 'ACTIVE' NOT NULL,
        "starts_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "expires_at" TIMESTAMP(3) NOT NULL,
        "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    // 3. Add subject_id columns to existing tables
    console.log('3. Adding subject_id columns to SyllabusUnit, ExamPaper, Question, PracticeSession, User...');
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "SyllabusUnit" ADD COLUMN IF NOT EXISTS "subject_id" TEXT REFERENCES "Subject"("id") ON DELETE SET NULL;
      ALTER TABLE "ExamPaper" ADD COLUMN IF NOT EXISTS "subject_id" TEXT REFERENCES "Subject"("id") ON DELETE SET NULL;
      ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "subject_id" TEXT REFERENCES "Subject"("id") ON DELETE SET NULL;
      ALTER TABLE "PracticeSession" ADD COLUMN IF NOT EXISTS "subject_id" TEXT REFERENCES "Subject"("id") ON DELETE SET NULL;
      ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "active_subject_id" TEXT REFERENCES "Subject"("id") ON DELETE SET NULL;
    `);

    // 4. Seed Official Subjects
    console.log('4. Seeding default subjects...');
    const now = new Date();
    await prisma.$executeRawUnsafe(`
      INSERT INTO "Subject" ("id", "code", "slug", "name", "name_native", "is_paper_1", "direction", "primary_language", "secondary_language", "is_active", "order_index", "created_at", "updated_at")
      VALUES
        ('subj_arabic_code29', '29', 'arabic', 'Arabic', 'اللغة العربية وآدابها', false, 'rtl', 'ar', 'en', true, 1, NOW(), NOW()),
        ('subj_paper1_code00', '00', 'paper-1', 'General Paper 1', 'General Paper on Teaching & Research Aptitude', true, 'ltr', 'en', 'hi', true, 0, NOW(), NOW()),
        ('subj_english_code30', '30', 'english', 'English', 'English Literature', false, 'ltr', 'en', NULL, true, 2, NOW(), NOW()),
        ('subj_commerce_code08', '08', 'commerce', 'Commerce', 'Commerce & Management', false, 'ltr', 'en', 'hi', true, 3, NOW(), NOW())
      ON CONFLICT ("code") DO UPDATE SET
        "slug" = EXCLUDED."slug",
        "name" = EXCLUDED."name",
        "name_native" = EXCLUDED."name_native",
        "direction" = EXCLUDED."direction",
        "primary_language" = EXCLUDED."primary_language",
        "secondary_language" = EXCLUDED."secondary_language",
        "updated_at" = NOW();
    `);

    // 5. Link all existing Arabic data to 'subj_arabic_code29'
    console.log('5. Linking all existing data to Arabic subject...');
    await prisma.$executeRawUnsafe(`
      UPDATE "SyllabusUnit" SET "subject_id" = 'subj_arabic_code29' WHERE "subject_id" IS NULL;
      UPDATE "ExamPaper" SET "subject_id" = 'subj_arabic_code29' WHERE "subject_id" IS NULL;
      UPDATE "Question" SET "subject_id" = 'subj_arabic_code29' WHERE "subject_id" IS NULL;
      UPDATE "PracticeSession" SET "subject_id" = 'subj_arabic_code29' WHERE "subject_id" IS NULL;
      UPDATE "User" SET "active_subject_id" = 'subj_arabic_code29' WHERE "active_subject_id" IS NULL;
    `);

    // 6. Add composite indices and constraints
    console.log('6. Adding composite indices...');
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Question_subject_id_content_status_idx" ON "Question"("subject_id", "content_status");
      CREATE INDEX IF NOT EXISTS "ExamPaper_subject_id_year_content_status_idx" ON "ExamPaper"("subject_id", "year", "content_status");
      CREATE INDEX IF NOT EXISTS "PracticeSession_subject_id_idx" ON "PracticeSession"("subject_id");
      CREATE INDEX IF NOT EXISTS "UserSubscription_user_id_status_expires_at_idx" ON "UserSubscription"("user_id", "status", "expires_at");
      CREATE INDEX IF NOT EXISTS "Subject_is_active_order_index_idx" ON "Subject"("is_active", "order_index");
      
      -- Add compound unique for SyllabusUnit (subject_id, unit_number)
      CREATE UNIQUE INDEX IF NOT EXISTS "SyllabusUnit_subject_id_unit_number_key" ON "SyllabusUnit"("subject_id", "unit_number");
      CREATE UNIQUE INDEX IF NOT EXISTS "SyllabusUnit_subject_id_slug_key" ON "SyllabusUnit"("subject_id", "slug");
    `);

    // 7. Seed default subscription plans
    console.log('7. Seeding subscription plans...');
    await prisma.$executeRawUnsafe(`
      INSERT INTO "SubscriptionPlan" ("id", "name", "plan_type", "duration_days", "price_inr", "features", "is_active", "created_at", "updated_at")
      VALUES
        ('plan_sub_6m', 'Single Subject Pro Pass (6 Months)', 'SINGLE_SUBJECT', 180, 1499, '["Complete Subject Question Bank (2004-2024)", "Full General Paper 1 Included", "Unlimited CBT Mock Tests & Timer Simulations", "Personal Mistake Tracker & Weak Topic Analytics", "Interactive 5-Tier Syllabus Drilldown"]'::jsonb, true, NOW(), NOW()),
        ('plan_sub_1y', 'Single Subject Pro Pass (1 Year)', 'SINGLE_SUBJECT', 365, 2499, '["Full 1-Year Access to Subscribed Subject + Paper 1", "All 45+ PYQ Papers & Solutions", "Unlimited Mock Tests with Detailed Explanations", "Spaced Repetition & Weak Area Memory Boosters", "Priority Doubt Resolution & Exam Updates"]'::jsonb, true, NOW(), NOW()),
        ('plan_all_1y', 'All-Access Master Pass (1 Year)', 'ALL_ACCESS', 365, 4999, '["Access to ALL Subjects on the Platform", "Full General Paper 1 Master Question Bank", "Unlimited CBT Simulations across All Subjects", "Multi-Subject Analytics & Mistake Trackers", "All Future Subject Launches Included"]'::jsonb, true, NOW(), NOW()),
        ('plan_p1_6m', 'General Paper 1 Master Pass (6 Months)', 'PAPER_1_ONLY', 180, 799, '["Complete Paper 1 Question Bank (10 Units)", "Teaching & Research Aptitude Special Modules", "Data Interpretation & Mathematical Reasoning Drills", "Timed Paper 1 Mock Tests"]'::jsonb, true, NOW(), NOW())
      ON CONFLICT ("id") DO NOTHING;
    `);

    console.log('\n═════════════════════════════════════════════════════════════');
    console.log('🏁 MULTI-SUBJECT SQL SCHEMA & SEED COMPLETE (100% SUCCESS)!');
    console.log('═════════════════════════════════════════════════════════════\n');
  } catch (err: any) {
    console.error('❌ SQL Migration Error:', err);
    process.exit(1);
  }
}

applyMultiSubjectSchemaAndSeed().finally(() => process.exit(0));
