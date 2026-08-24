import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const pageId = resolvedParams.id;
    const body = await request.json();
    const { userNotes, userAnnotations } = body;

    const page = await prisma.visualLearningPage.findUnique({
      where: { id: pageId },
      include: { project: true },
    });

    if (!page || page.project.user_id !== session.user.id) {
      return NextResponse.json({ error: 'Page not found or unauthorized' }, { status: 404 });
    }

    const updated = await prisma.visualLearningPage.update({
      where: { id: pageId },
      data: {
        ...(userNotes !== undefined ? { user_notes: userNotes } : {}),
        ...(userAnnotations !== undefined ? { user_annotations: userAnnotations } : {}),
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ success: true, page: updated });
  } catch (error) {
    console.error('[API /studio/pages/[id] PATCH] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
