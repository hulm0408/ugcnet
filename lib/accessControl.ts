import prisma from './db';

export interface AccessCheckResult {
  hasAccess: boolean;
  paper?: {
    id: string;
    display_name: string;
    year: number;
    subject_id: string | null;
    is_free_benchmark: boolean;
    access_tier: string;
  };
  subject?: {
    id: string;
    code: string;
    slug: string;
    name: string;
    name_native: string | null;
  } | null;
}

/**
 * Verify whether a user (or guest) is entitled to practice a given paper.
 * - Free Benchmark papers: Always allowed for everyone (visitors & subscribers).
 * - Premium Pro papers: Requires active subscription for the paper's subject or All-Access pass.
 */
export async function verifyPaperAccess(
  userId: string | undefined | null,
  paperId: string
): Promise<AccessCheckResult> {
  try {
    const paper = await prisma.examPaper.findUnique({
      where: { id: paperId },
      select: {
        id: true,
        display_name: true,
        year: true,
        subject_id: true,
        is_free_benchmark: true,
        access_tier: true,
        subject_ref: {
          select: {
            id: true,
            code: true,
            slug: true,
            name: true,
            name_native: true,
          },
        },
      },
    });

    if (!paper) {
      return { hasAccess: false };
    }

    // 1. If paper is marked as FREE BENCHMARK, allow access to everyone
    if (paper.is_free_benchmark || paper.access_tier === 'FREE') {
      return {
        hasAccess: true,
        paper,
        subject: paper.subject_ref,
      };
    }

    // 2. If user is authenticated, check for active subscription
    if (userId && paper.subject_id) {
      const activeSubscription = await prisma.userSubscription.findFirst({
        where: {
          user_id: userId,
          status: 'ACTIVE',
          expires_at: { gt: new Date() },
          OR: [
            { subject_id: paper.subject_id }, // Target subject pass
            { subject_id: null },             // All-Access pass
          ],
        },
      });

      if (activeSubscription) {
        return {
          hasAccess: true,
          paper,
          subject: paper.subject_ref,
        };
      }
    }

    // 3. User is not subscribed for this premium paper
    return {
      hasAccess: false,
      paper,
      subject: paper.subject_ref,
    };
  } catch (error) {
    console.error('[AccessControl] Error verifying paper access:', error);
    return { hasAccess: false };
  }
}

/**
 * Get all active subscribed subjects for a user
 */
export async function getUserSubscribedSubjectIds(userId: string | undefined | null): Promise<string[]> {
  if (!userId) return [];
  try {
    const subscriptions = await prisma.userSubscription.findMany({
      where: {
        user_id: userId,
        status: 'ACTIVE',
        expires_at: { gt: new Date() },
      },
      select: {
        subject_id: true,
      },
    });

    return subscriptions.map((s) => s.subject_id).filter(Boolean) as string[];
  } catch (error) {
    console.error('[AccessControl] Error fetching user subscriptions:', error);
    return [];
  }
}
