import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';

export async function DELETE(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Start a transaction to delete all user data
    await prisma.$transaction(async (tx) => {
      // PracticeAttempts are related to PracticeSessions, so delete attempts first
      const userSessions = await tx.practiceSession.findMany({
        where: { user_id: userId },
        select: { id: true },
      });
      const sessionIds = userSessions.map((s) => s.id);

      if (sessionIds.length > 0) {
        await tx.practiceAttempt.deleteMany({
          where: { session_id: { in: sessionIds } },
        });
        await tx.practiceSession.deleteMany({
          where: { user_id: userId },
        });
      }

      await tx.bookmark.deleteMany({
        where: { user_id: userId },
      });

      await tx.questionReport.deleteMany({
        where: { user_id: userId },
      });

      // ClassificationHistory and AuditLogs can just have user_id nullified if we want to keep the logs,
      // but to comply with deletion requests, we should delete them or keep them based on privacy policy.
      // Assuming we delete classification history tied to the user if they want total deletion:
      await tx.classificationHistory.deleteMany({
        where: { changed_by: userId },
      });
      
      // We will set user_id to null in audit logs to keep system history without PII
      // Wait, schema says user_id is String? in AuditLog, so this is valid.
      await tx.auditLog.updateMany({
        where: { user_id: userId },
        data: { user_id: null },
      });

      // Delete the user (cascades to Accounts and Sessions)
      await tx.user.delete({
        where: { id: userId },
      });
    });

    return NextResponse.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Account deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}
