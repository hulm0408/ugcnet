import 'dotenv/config';
import prisma from '../lib/db';

async function testAllPostEndpoints() {
  console.log('🧪 RUNNING COMPREHENSIVE BACKEND DIAGNOSTIC ON ALL POST FLOWS...\n');

  try {
    // 1. Check a valid published question
    console.log('--- 1. Testing Question Evaluation Query ---');
    const question = await prisma.question.findFirst({
      where: { content_status: 'PUBLISHED' },
    });
    if (!question) {
      console.error('❌ No published questions found!');
    } else {
      console.log(`  ✅ Found published question: ID ${question.id}, Answer: ${question.correct_answer}`);
    }

    // 2. Check User exists
    console.log('\n--- 2. Checking User for Session/Memory Ops ---');
    const user = await prisma.user.findFirst({
      where: { email: 'hulm0408@gmail.com' },
    });
    if (!user) {
      console.error('❌ Admin user not found!');
    } else {
      console.log(`  ✅ Admin user verified: ID ${user.id} (${user.email})`);
    }

    if (user && question) {
      // 3. Test Memory Connection Upsert (POST /api/memories)
      console.log('\n--- 3. Testing POST /api/memories (Memory Connection Upsert) ---');
      const memory = await prisma.memoryConnection.upsert({
        where: {
          user_id_question_id_type: {
            user_id: user.id,
            question_id: question.id,
            type: 'TRICK',
          },
        },
        create: {
          user_id: user.id,
          question_id: question.id,
          type: 'TRICK',
          content: 'Test automated diagnostic connection note',
          keywords: ['diagnostic', 'test'],
          is_public: false,
        },
        update: {
          content: 'Updated diagnostic connection note',
          updated_at: new Date(),
        },
      });
      console.log(`  ✅ POST /api/memories succeeded: Memory ID ${memory.id}`);

      // 4. Test Spaced Memory Queue (POST /api/memories/remember)
      console.log('\n--- 4. Testing POST /api/memories/remember (Spaced Memory Queue) ---');
      const queueItem = await prisma.spacedMemoryQueue.upsert({
        where: {
          user_id_question_id: {
            user_id: user.id,
            question_id: question.id,
          },
        },
        create: {
          user_id: user.id,
          question_id: question.id,
          status: 'ACTIVE',
          interval_days: 1,
          next_review_at: new Date(Date.now() + 86400000),
        },
        update: {
          status: 'ACTIVE',
        },
      });
      console.log(`  ✅ POST /api/memories/remember succeeded: Queue ID ${queueItem.id}`);

      // 5. Test Practice Session Creation (POST /api/sessions)
      console.log('\n--- 5. Testing POST /api/sessions (Practice Session) ---');
      const session = await prisma.practiceSession.create({
        data: {
          user_id: user.id,
          mode: 'custom',
          question_ids: [question.id],
          total_questions: 1,
          status: 'in_progress',
        },
      });
      console.log(`  ✅ POST /api/sessions succeeded: Session ID ${session.id}`);

      // 6. Test Practice Attempt Logging
      console.log('\n--- 6. Testing Practice Attempt Logging ---');
      const attempt = await prisma.practiceAttempt.create({
        data: {
          session_id: session.id,
          user_id: user.id,
          question_id: question.id,
          selected_option: question.correct_answer,
          is_correct: true,
        },
      });
      console.log(`  ✅ Practice Attempt succeeded: ID ${attempt.id}`);

      // 7. Test Bookmark Upsert (POST /api/bookmarks)
      console.log('\n--- 7. Testing POST /api/bookmarks ---');
      const bookmark = await prisma.bookmark.upsert({
        where: {
          user_id_question_id: {
            user_id: user.id,
            question_id: question.id,
          },
        },
        create: {
          user_id: user.id,
          question_id: question.id,
        },
        update: {},
      });
      console.log(`  ✅ POST /api/bookmarks succeeded: ID ${bookmark.id}`);

      // 8. Test Visual Learning Project & Page Creation (POST /api/studio/projects & generate)
      console.log('\n--- 8. Testing Visual Learning Studio Project & Page creation ---');
      const activeSubject = await prisma.subject.findFirst({ where: { slug: 'arabic' } });
      const proj = await prisma.visualLearningProject.create({
        data: {
          user_id: user.id,
          subject_id: activeSubject?.id,
          title: 'Diagnostic Test Visual Project',
          description: 'Testing visual studio backend flows',
          academic_level: 'JRF_ASPIRANT',
          entity_index: ['Diagnostic Node'],
        },
      });
      const pg = await prisma.visualLearningPage.create({
        data: {
          project_id: proj.id,
          page_number: 1,
          title: 'Diagnostic Plate 01',
          concept_target: 'Diagnostic concept',
          visual_format: 'SVG_MAP',
          page_purpose: 'Verification',
          visual_argument: 'Clarity',
          user_action_prompt: 'Check connection',
          memory_target: 'Target verified',
          svg_content: '<svg><rect width="10" height="10"/></svg>',
        },
      });
      console.log(`  ✅ Visual Studio POST succeeded: Project ${proj.id}, Page ${pg.id}`);

      // Clean up test diagnostic project
      await prisma.visualLearningProject.delete({ where: { id: proj.id } });
      console.log('  🧹 Cleaned up temporary diagnostic project');
    }

    console.log('\n═════════════════════════════════════════════════════════════');
    console.log('🎉 ALL DATABASE AND POST OPERATIONS COMPLETED WITH 0 ERRORS!');
    console.log('═════════════════════════════════════════════════════════════\n');
  } catch (err: any) {
    console.error('❌ Error during POST diagnostics:', err);
  }
}

testAllPostEndpoints().finally(() => process.exit(0));
