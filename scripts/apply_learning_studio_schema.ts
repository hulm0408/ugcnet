import 'dotenv/config';
import prisma from '../lib/db';

async function applyLearningStudioSchema() {
  console.log('🔧 CREATING PERSONALIZED VISUAL LEARNING STUDIO TABLES IN POSTGRESQL...\n');

  try {
    // 1. Create VisualLearningProject table
    console.log('1. Creating VisualLearningProject table...');
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "VisualLearningProject" (
        "id" TEXT PRIMARY KEY,
        "user_id" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
        "subject_id" TEXT REFERENCES "Subject"("id") ON DELETE SET NULL,
        "title" TEXT NOT NULL,
        "description" TEXT,
        "academic_level" TEXT DEFAULT 'INTERMEDIATE' NOT NULL,
        "visual_theme" TEXT DEFAULT 'ACADEMIC_CLEAN' NOT NULL,
        "color_system" TEXT DEFAULT 'EMERALD_SLATE' NOT NULL,
        "entity_index" JSONB,
        "is_public" BOOLEAN DEFAULT false NOT NULL,
        "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    // 2. Create VisualLearningPage table
    console.log('2. Creating VisualLearningPage table...');
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "VisualLearningPage" (
        "id" TEXT PRIMARY KEY,
        "project_id" TEXT NOT NULL REFERENCES "VisualLearningProject"("id") ON DELETE CASCADE,
        "page_number" INTEGER NOT NULL,
        "title" TEXT NOT NULL,
        "concept_target" TEXT NOT NULL,
        "visual_format" TEXT NOT NULL,
        "page_purpose" TEXT NOT NULL,
        "visual_argument" TEXT NOT NULL,
        "user_action_prompt" TEXT NOT NULL,
        "memory_target" TEXT NOT NULL,
        "difficulty_level" TEXT DEFAULT 'INTERMEDIATE' NOT NULL,
        "svg_content" TEXT NOT NULL,
        "content_payload" JSONB,
        "thinking_space_title" TEXT DEFAULT 'Your Thinking & Connection Space',
        "thinking_space_prompt" TEXT,
        "user_notes" TEXT,
        "user_annotations" JSONB,
        "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT "VisualLearningPage_project_id_page_number_key" UNIQUE ("project_id", "page_number")
      );
    `);

    // 3. Create indices
    console.log('3. Creating indices...');
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "VisualLearningProject_user_id_updated_at_idx" ON "VisualLearningProject"("user_id", "updated_at");
      CREATE INDEX IF NOT EXISTS "VisualLearningProject_subject_id_idx" ON "VisualLearningProject"("subject_id");
      CREATE INDEX IF NOT EXISTS "VisualLearningPage_project_id_page_number_idx" ON "VisualLearningPage"("project_id", "page_number");
    `);

    console.log('🎉 VISUAL LEARNING STUDIO TABLES SUCCESSFULLY CREATED!\n');
  } catch (error) {
    console.error('❌ Error applying schema:', error);
    process.exit(1);
  }
}

applyLearningStudioSchema().finally(() => process.exit(0));
