import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { questionId, bookmarked } = await request.json();

    if (!questionId) {
      return NextResponse.json({ error: 'questionId is required' }, { status: 400 });
    }

    if (bookmarked) {
      // Add bookmark (use upsert to handle duplicates cleanly)
      await prisma.bookmark.upsert({
        where: {
          user_id_question_id: {
            user_id: session.user.id,
            question_id: questionId
          }
        },
        update: {},
        create: {
          user_id: session.user.id,
          question_id: questionId
        }
      });
    } else {
      // Remove bookmark
      await prisma.bookmark.delete({
        where: {
          user_id_question_id: {
            user_id: session.user.id,
            question_id: questionId
          }
        }
      }).catch(() => {
        // Ignore error if it doesn't exist
      });
    }

    return NextResponse.json({ success: true, bookmarked });
  } catch (error) {
    console.error('[API /bookmarks] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
