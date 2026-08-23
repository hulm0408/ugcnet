import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      mode, // e.g. 'practice', 'mock'
      filters, // e.g. { year: '2023' }
      questionIds, 
      answers, 
      evaluations 
    } = body;

    if (!questionIds || !Array.isArray(questionIds)) {
      return NextResponse.json({ error: 'Invalid questionIds' }, { status: 400 });
    }

    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;

    const attemptsData = questionIds.map(qId => {
      const selectedOption = answers[qId] || null;
      const evalData = evaluations[qId];
      const isCorrect = evalData?.isCorrect ?? null;
      const isSkipped = !selectedOption;

      if (isCorrect === true) correctCount++;
      else if (isCorrect === false && !isSkipped) incorrectCount++;
      else if (isSkipped) skippedCount++;

      return {
        user_id: session.user.id,
        question_id: qId,
        selected_option: selectedOption,
        is_correct: isCorrect,
        is_skipped: isSkipped,
      };
    });

    const practiceSession = await prisma.practiceSession.create({
      data: {
        user_id: session.user.id,
        mode: mode || 'custom',
        filters: filters || {},
        question_ids: questionIds,
        total_questions: questionIds.length,
        status: 'completed',
        correct_count: correctCount,
        incorrect_count: incorrectCount,
        skipped_count: skippedCount,
        score: correctCount * 2, // Assuming 2 marks per question
        completed_at: new Date(),
        attempts: {
          create: attemptsData
        }
      }
    });

    return NextResponse.json({ success: true, sessionId: practiceSession.id });
  } catch (error) {
    console.error('[API /sessions] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
