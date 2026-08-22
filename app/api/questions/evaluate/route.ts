import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { questionId, selectedOption } = body;

    if (!questionId || !selectedOption) {
      return NextResponse.json(
        { error: 'questionId and selectedOption are required' },
        { status: 400 }
      );
    }

    if (!['A', 'B', 'C', 'D'].includes(selectedOption)) {
      return NextResponse.json({ error: 'Invalid option' }, { status: 400 });
    }

    // Retrieve answer data server-side only
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: {
        correct_answer: true,
        correct_answer_text_arabic: true,
        correct_answer_text_english: true,
        explanation_arabic: true,
        explanation_english: true,
        content_status: true,
      },
    });

    if (!question || question.content_status !== 'PUBLISHED') {
      return NextResponse.json(
        { error: 'Question not found or unavailable' },
        { status: 404 }
      );
    }

    const isCorrect = question.correct_answer === selectedOption;

    return NextResponse.json({
      isCorrect,
      correctAnswer: question.correct_answer,
      correctText: question.correct_answer_text_arabic || question.correct_answer_text_english || null,
      explanation: question.explanation_arabic || question.explanation_english || null,
    });
  } catch (error) {
    console.error('[API /evaluate] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
