import { NextResponse } from 'next/server';
import { getActiveSubjects } from '@/lib/subjectContext';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const subjects = await getActiveSubjects();
    return NextResponse.json({ subjects });
  } catch (error) {
    console.error('[API /subjects] GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subjectSlug } = body;

    if (!subjectSlug) {
      return NextResponse.json({ error: 'Missing subjectSlug' }, { status: 400 });
    }

    const subject = await prisma.subject.findUnique({
      where: { slug: subjectSlug },
    });

    if (!subject) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }

    const session = await auth();
    if (session?.user?.id) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { active_subject_id: subject.id },
      });
    }

    const response = NextResponse.json({ success: true, subject });
    // Set cookie for active subject
    response.cookies.set('ugc_active_subject', subject.slug, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('[API /subjects] POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
