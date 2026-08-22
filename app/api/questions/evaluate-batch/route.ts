import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers } = body;

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'answers object is required' },
        { status: 400 }
      );
    }

    const questionIds = Object.keys(answers);

    if (questionIds.length === 0) {
      return NextResponse.json({ results: {} });
    }

    // Retrieve answer data server-side only for all requested questions
    const questions = await prisma.question.findMany({
      where: { 
        id: { in: questionIds },
        content_status: 'PUBLISHED'
      },
      select: {
        id: true,
        correct_answer: true,
        correct_answer_text_arabic: true,
        correct_answer_text_english: true,
        explanation_arabic: true,
        explanation_english: true,
      },
    });

    const results: Record<string, any> = {};

    for (const q of questions) {
      const selectedOption = answers[q.id];
      const isCorrect = q.correct_answer === selectedOption;

      results[q.id] = {
        isCorrect,
        correctAnswer: q.correct_answer,
        correctText: q.correct_answer_text_arabic || q.correct_answer_text_english || null,
        explanation: q.explanation_arabic || q.explanation_english || null,
      };
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('[API /evaluate-batch] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
