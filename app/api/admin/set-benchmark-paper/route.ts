import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { subjectId, paperId } = body;

    if (!subjectId || !paperId) {
      return NextResponse.json({ error: 'Missing subjectId or paperId' }, { status: 400 });
    }

    const targetPaper = await prisma.examPaper.findUnique({
      where: { id: paperId },
    });

    if (!targetPaper || targetPaper.subject_id !== subjectId) {
      return NextResponse.json({ error: 'Paper not found or does not belong to this subject' }, { status: 404 });
    }

    // Atomically reset existing benchmark papers and set the new one
    await prisma.$transaction([
      prisma.examPaper.updateMany({
        where: {
          subject_id: subjectId,
          is_free_benchmark: true,
        },
        data: {
          is_free_benchmark: false,
          access_tier: 'PREMIUM',
        },
      }),
      prisma.examPaper.update({
        where: { id: paperId },
        data: {
          is_free_benchmark: true,
          access_tier: 'FREE',
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: `Set '${targetPaper.display_name}' as the new Free Benchmark Paper!`,
      paperId: targetPaper.id,
    });
  } catch (error) {
    console.error('[Admin Set Benchmark] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
