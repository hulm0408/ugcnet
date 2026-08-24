/**
 * Automated Verification Script for Personal Memory + Connection Engine
 * Tests strict user isolation, 5-Level Spaced Repetition Schedule, time limits, and completion achievements.
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { calculate5LevelReview, getInitialEnrollment, SPACING_LEVELS, generateSmartMemoryPrompts } from '../lib/memoryEngine';
import { normalizeArabicText } from '../lib/arabicUtils';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function runTests() {
  console.log('════════════════════════════════════════════════════════════');
  console.log('🧪 RUNNING 5-LEVEL SPACED REPETITION AUTOMATED TEST MATRIX');
  console.log('════════════════════════════════════════════════════════════\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${msg}`);
      failed++;
    }
  }

  try {
    // ── 1. Setup Test Users and Sample Questions ──
    console.log('1. Setting up test users and questions...');
    const userA = await prisma.user.upsert({
      where: { email: 'test_memory_user_a@example.com' },
      update: { name: 'User A Test' },
      create: {
        email: 'test_memory_user_a@example.com',
        name: 'User A Test',
        role: 'USER',
      },
    });

    const userB = await prisma.user.upsert({
      where: { email: 'test_memory_user_b@example.com' },
      update: { name: 'User B Test' },
      create: {
        email: 'test_memory_user_b@example.com',
        name: 'User B Test',
        role: 'USER',
      },
    });

    // Fetch two test questions
    const questions = await prisma.question.findMany({
      take: 2,
      select: { id: true, question_arabic: true },
    });

    if (questions.length < 2) {
      throw new Error('Need at least 2 questions in database for test matrix');
    }

    const q1 = questions[0];
    const q2 = questions[1];

    // Clean up previous test artifacts
    await prisma.memoryReviewLog.deleteMany({
      where: { user_id: { in: [userA.id, userB.id] } },
    });
    await prisma.spacedMemoryQueue.deleteMany({
      where: { user_id: { in: [userA.id, userB.id] } },
    });
    await prisma.questionConnection.deleteMany({
      where: { user_id: { in: [userA.id, userB.id] } },
    });
    await prisma.memoryConnection.deleteMany({
      where: { user_id: { in: [userA.id, userB.id] } },
    });

    // ── 2. Test User Isolation (Memory Creation) ──
    console.log('\n2. Testing User Isolation on Personal Memories...');
    
    // User A creates a memory trick
    const memA = await prisma.memoryConnection.create({
      data: {
        user_id: userA.id,
        question_id: q1.id,
        type: 'TRICK',
        content: 'Mir Taqi Mir → remember M = Mir = Masnavi',
        keywords: ['Mir', 'Masnavi', 'Poetry'],
      },
    });

    assert(memA.id !== undefined, 'User A memory created successfully');

    // Query memories for User A on Q1
    const memoriesForUserA = await prisma.memoryConnection.findMany({
      where: { user_id: userA.id, question_id: q1.id },
    });
    assert(memoriesForUserA.length === 1, 'User A can see their memory on Question 1');
    assert(memoriesForUserA[0].content === memA.content, 'User A memory content matches');

    // Query memories for User B on Q1
    const memoriesForUserB = await prisma.memoryConnection.findMany({
      where: { user_id: userB.id, question_id: q1.id },
    });
    assert(memoriesForUserB.length === 0, 'User B CANNOT see User A private memory on Question 1');

    // Direct access by ID under User B scope
    const directAccessUserB = await prisma.memoryConnection.findFirst({
      where: { id: memA.id, user_id: userB.id },
    });
    assert(directAccessUserB === null, 'User B cannot query User A memory by ID');

    // ── 3. Test Question-to-Question Knowledge Graph Linking ──
    console.log('\n3. Testing Question Connection Linking & Isolation...');
    
    // User A links Q1 to Q2
    const connA = await prisma.questionConnection.create({
      data: {
        user_id: userA.id,
        source_question_id: q1.id,
        target_question_id: q2.id,
        relationship_type: 'SAME_AUTHOR',
        note: 'Both related to Jahili poetry',
      },
    });

    assert(connA.id !== undefined, 'User A linked Question 1 to Question 2');

    // Verify User A can see this connection
    const connListA = await prisma.questionConnection.findMany({
      where: { user_id: userA.id },
    });
    assert(connListA.length === 1, 'User A knowledge graph contains 1 connection');

    // Verify User B cannot see User A connection
    const connListB = await prisma.questionConnection.findMany({
      where: { user_id: userB.id },
    });
    assert(connListB.length === 0, 'User B knowledge graph does NOT contain User A connection');

    // ── 4. Test 5-Level Spaced Repetition Progression & Time Limits ──
    console.log('\n4. Testing 5-Level Spaced Repetition Schedule...');
    
    // Enrollment: Level 1 (24h)
    const enrollment = getInitialEnrollment();
    assert(enrollment.level === 1, 'Initial enrollment starts at Level 1');
    assert(enrollment.intervalDays === 1, 'Level 1 interval is 24 hours (1 day)');

    // Step 1: Complete Level 1 on time -> advances to Level 2 (3 days)
    const step1 = calculate5LevelReview({
      currentLevel: 1,
      currentStrength: 1.0,
      dueDeadline: enrollment.dueDeadline,
      wasHelpful: true,
    });
    assert(step1.level === 2, 'Passing Level 1 advances to Level 2');
    assert(step1.intervalDays === 3, 'Level 2 interval is 3 days (2-3 days later)');
    assert(!step1.isCompleted, 'Level 2 is not yet marked as completed achievement');

    // Step 2: Complete Level 2 on time -> advances to Level 3 (7 days)
    const step2 = calculate5LevelReview({
      currentLevel: 2,
      currentStrength: step1.memoryStrength,
      dueDeadline: step1.dueDeadline,
      wasHelpful: true,
    });
    assert(step2.level === 3, 'Passing Level 2 advances to Level 3');
    assert(step2.intervalDays === 7, 'Level 3 interval is 7 days (~1 week later)');

    // Step 3: Complete Level 3 on time -> advances to Level 4 (16 days)
    const step3 = calculate5LevelReview({
      currentLevel: 3,
      currentStrength: step2.memoryStrength,
      dueDeadline: step2.dueDeadline,
      wasHelpful: true,
    });
    assert(step3.level === 4, 'Passing Level 3 advances to Level 4');
    assert(step3.intervalDays === 16, 'Level 4 interval is 16 days (2-3 weeks later)');

    // Step 4: Complete Level 4 on time -> advances to Level 5 (45 days)
    const step4 = calculate5LevelReview({
      currentLevel: 4,
      currentStrength: step3.memoryStrength,
      dueDeadline: step3.dueDeadline,
      wasHelpful: true,
    });
    assert(step4.level === 5, 'Passing Level 4 advances to Level 5');
    assert(step4.intervalDays === 45, 'Level 5 interval is 45 days (1-2 months later)');
    assert(!step4.isCompleted, 'Level 5 is not yet completed until final review passes');

    // Step 5: Complete Level 5 on time -> FULL MASTERY & COMPLETION ACHIEVEMENT!
    const step5 = calculate5LevelReview({
      currentLevel: 5,
      currentStrength: step4.memoryStrength,
      dueDeadline: step4.dueDeadline,
      wasHelpful: true,
    });
    assert(step5.isCompleted === true, 'Passing Level 5 marks PYQ as COMPLETED Achievement!');
    assert(step5.status === 'COMPLETED', 'Status changed to COMPLETED');
    assert(step5.completedAt !== null, 'completedAt timestamp set');

    // Test Rule: If NOT completed on given time (missed/overdue) -> Resets to Level 1 and NOT created as achievement
    const missedDeadlineInPast = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000); // 5 days ago
    const lateReview = calculate5LevelReview({
      currentLevel: 4,
      currentStrength: 3.5,
      dueDeadline: missedDeadlineInPast,
      wasHelpful: true,
    });
    assert(lateReview.level === 1, 'Missed deadline resets question back to Level 1');
    assert(lateReview.isCompleted === false, 'Late review does NOT grant completion achievement');
    assert(lateReview.onTime === false, 'onTime flag is false');

    // ── 5. Test Arabic Tashkeel & Diacritics Normalization ──
    console.log('\n5. Testing Arabic Normalization Utilities...');
    
    const rawWithTashkeel = 'مَرْحَلَةٌ فِي الْأَدَبِ';
    const normalized = normalizeArabicText(rawWithTashkeel);
    assert(!normalized.includes('َ') && !normalized.includes('ْ'), 'Tashkeel is stripped cleanly');
    assert(normalized.includes('مرحله'), 'Taa marbuta (ة) normalized to (ه)');

    const alefVariant = 'أَحْمَدُ إِبْرَاهِيمُ آثَار';
    const normAlef = normalizeArabicText(alefVariant);
    assert(normAlef.startsWith('احمد ابراهيم اثار'), 'All Alef variants normalized to plain Alef');

    // ── 6. Test Smart Contextual Prompts ──
    console.log('\n6. Testing Smart Memory Prompts Generator...');
    const prompts = generateSmartMemoryPrompts({
      question_arabic: 'من مؤلف كتاب الأغاني؟',
      specific_entity_name_arabic: 'أبو الفرج الأصفهاني',
    });
    assert(prompts.length >= 2, 'Generated multiple smart contextual prompts for author & book');
    assert(prompts.some((p) => p.id === 'author_formula'), 'Generated author formula prompt');
    assert(prompts.some((p) => p.id === 'title_anchor'), 'Generated title anchor prompt');

    // ── Clean up test data ──
    await prisma.questionConnection.deleteMany({ where: { user_id: { in: [userA.id, userB.id] } } });
    await prisma.spacedMemoryQueue.deleteMany({ where: { user_id: { in: [userA.id, userB.id] } } });
    await prisma.memoryConnection.deleteMany({ where: { user_id: { in: [userA.id, userB.id] } } });
    await prisma.user.deleteMany({ where: { id: { in: [userA.id, userB.id] } } });

    console.log('\n════════════════════════════════════════════════════════════');
    console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('════════════════════════════════════════════════════════════\n');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal test error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runTests();
