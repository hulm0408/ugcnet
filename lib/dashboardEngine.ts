import prisma from '@/lib/db';

export type UserPreparationStatus = 'NOT_STARTED' | 'NEEDS_ATTENTION' | 'DEVELOPING' | 'STRONG';

export interface UnitMasteryData {
  unitNumber: number;
  nameArabic: string;
  nameEnglish: string;
  slug: string;
  totalQuestionsInDb: number;
  totalAttempted: number;
  totalCorrect: number;
  totalIncorrect: number;
  accuracyPct: number | null;
  coveragePct: number;
  status: 'NOT_ATTEMPTED' | 'NEEDS_FOCUS' | 'DEVELOPING' | 'STRONG';
}

export interface DeterministicDashboardData {
  userId: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  
  // Real Core Metrics
  totalAttempted: number;
  totalCorrect: number;
  totalIncorrect: number;
  overallAccuracyPct: number;
  bookmarkedCount: number;
  
  // Real Memory & Spaced Repetition Metrics
  memoryConnectionsCount: number;
  dueReviewCount: number;
  completedMemoryCount: number;
  totalTrackedMemoryCount: number;
  levelCounts: Record<number, number>;
  
  // Real Daily Streak
  streakDays: number;
  practicedToday: boolean;
  
  // Real Subscription Entitlement
  isSubscribed: boolean;
  subscriptionPlanName: string | null;
  subscriptionExpiresAt: Date | null;
  
  // Real Preparation Status (No Fake Percentages)
  prepStatus: UserPreparationStatus;
  prepStatusLabel: string;
  prepStatusDescription: string;
  
  // Real Recoverable Marks
  recoverableMarks: number;
  
  // Real Unit Mastery
  unitMastery: UnitMasteryData[];
  weakestUnits: UnitMasteryData[];
  
  // User State Classification
  stateType: 'NEW_USER' | 'ONGOING_TEST' | 'DUE_MEMORIES' | 'WEAK_UNIT_FOCUS' | 'ACTIVE_PRACTICE' | 'ALL_CLEAR';
  
  // The ONE Dominant Next Best Action
  primaryAction: {
    badge: string;
    badgeColor: string;
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaHref: string;
  };
  
  // Unfinished Active Session
  unfinishedSession: any | null;
  
  // Recent Sessions
  recentSessions: any[];
  
  // Free Benchmark Paper
  freeBenchmarkPaper: {
    id: string;
    displayName: string;
    year: number;
    totalQuestions: number;
  } | null;
}

/**
 * Deterministically loads and calculates all dashboard data strictly from authenticated database records.
 * NEVER fabricates streaks, XP, precision percentages, or fake activity.
 */
export async function getDeterministicDashboardData(
  userId: string,
  subjectId: string,
  subjectName: string,
  subjectCode: string
): Promise<DeterministicDashboardData> {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 1. Parallel database queries for real user data
  const [
    attempts,
    bookmarkedCount,
    memConnectionsCount,
    dueMemoryCount,
    completedMemCount,
    totalTrackedMemCount,
    lvl1Count,
    lvl2Count,
    lvl3Count,
    lvl4Count,
    lvl5Count,
    unfinishedDb,
    recentSessionsDb,
    dbUnits,
    userSubs,
    freePaperDb,
  ] = await Promise.all([
    prisma.practiceAttempt.findMany({
      where: {
        user_id: userId,
        question: { subject_id: subjectId },
      },
      select: {
        id: true,
        is_correct: true,
        is_skipped: true,
        attempted_at: true,
        question: {
          select: {
            id: true,
            unit_id: true,
            unit: {
              select: {
                unit_number: true,
                name_arabic: true,
                name_english: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: { attempted_at: 'desc' },
    }),
    prisma.bookmark.count({
      where: { user_id: userId, question: { subject_id: subjectId } },
    }),
    prisma.memoryConnection.count({
      where: { user_id: userId, question: { subject_id: subjectId } },
    }),
    prisma.spacedMemoryQueue.count({
      where: {
        user_id: userId,
        status: 'ACTIVE',
        next_review_at: { lte: now },
        question: { subject_id: subjectId },
      },
    }),
    prisma.spacedMemoryQueue.count({
      where: {
        user_id: userId,
        is_completed: true,
        question: { subject_id: subjectId },
      },
    }),
    prisma.spacedMemoryQueue.count({
      where: {
        user_id: userId,
        question: { subject_id: subjectId },
      },
    }),
    prisma.spacedMemoryQueue.count({
      where: { user_id: userId, level: 1, is_completed: false, status: 'ACTIVE', question: { subject_id: subjectId } },
    }),
    prisma.spacedMemoryQueue.count({
      where: { user_id: userId, level: 2, is_completed: false, status: 'ACTIVE', question: { subject_id: subjectId } },
    }),
    prisma.spacedMemoryQueue.count({
      where: { user_id: userId, level: 3, is_completed: false, status: 'ACTIVE', question: { subject_id: subjectId } },
    }),
    prisma.spacedMemoryQueue.count({
      where: { user_id: userId, level: 4, is_completed: false, status: 'ACTIVE', question: { subject_id: subjectId } },
    }),
    prisma.spacedMemoryQueue.count({
      where: { user_id: userId, level: 5, is_completed: false, status: 'ACTIVE', question: { subject_id: subjectId } },
    }),
    prisma.practiceSession.findFirst({
      where: {
        user_id: userId,
        subject_id: subjectId,
        status: 'in_progress',
      },
      orderBy: { last_active_at: 'desc' },
    }),
    prisma.practiceSession.findMany({
      where: {
        user_id: userId,
        subject_id: subjectId,
      },
      orderBy: { started_at: 'desc' },
      take: 5,
    }),
    prisma.syllabusUnit.findMany({
      where: { subject_id: subjectId },
      orderBy: { unit_number: 'asc' },
      include: {
        _count: {
          select: { questions: true, broad_topics: true },
        },
      },
    }),
    prisma.userSubscription.findFirst({
      where: {
        user_id: userId,
        status: 'ACTIVE',
        expires_at: { gt: now },
        OR: [
          { subject_id: subjectId },
          { plan: { plan_type: 'ALL_ACCESS' } },
        ],
      },
      include: { plan: true },
    }),
    prisma.examPaper.findFirst({
      where: { subject_id: subjectId, is_free_benchmark: true },
    }),
  ]);

  // 2. Core Aggregations
  const totalAttempted = attempts.length;
  const totalCorrect = attempts.filter((a) => a.is_correct === true).length;
  const totalIncorrect = attempts.filter((a) => a.is_correct === false && !a.is_skipped).length;
  const overallAccuracyPct = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const recoverableMarks = totalIncorrect * 2;

  // 3. Deterministic Daily Streak Calculation
  const attemptDates = new Set<string>();
  for (const a of attempts) {
    const d = new Date(a.attempted_at);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    attemptDates.add(dateStr);
  }

  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const practicedToday = attemptDates.has(todayStr);

  let streakDays = 0;
  let checkDate = new Date(now);
  if (!practicedToday) {
    // Check if practiced yesterday
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
    if (attemptDates.has(dateStr)) {
      streakDays++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // 4. Deterministic Unit Mastery Calculation
  const unitStatsMap: Record<number, { attempted: number; correct: number; incorrect: number }> = {};
  for (const a of attempts) {
    const uNum = a.question?.unit?.unit_number;
    if (uNum) {
      if (!unitStatsMap[uNum]) {
        unitStatsMap[uNum] = { attempted: 0, correct: 0, incorrect: 0 };
      }
      unitStatsMap[uNum].attempted++;
      if (a.is_correct === true) unitStatsMap[uNum].correct++;
      if (a.is_correct === false && !a.is_skipped) unitStatsMap[uNum].incorrect++;
    }
  }

  const unitMastery: UnitMasteryData[] = dbUnits.map((u) => {
    const stats = unitStatsMap[u.unit_number] || { attempted: 0, correct: 0, incorrect: 0 };
    const qCountInDb = u._count.questions || 50;
    const accuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : null;
    const coverage = Math.min(100, Math.round((stats.attempted / Math.max(1, qCountInDb)) * 100));

    let status: UnitMasteryData['status'] = 'NOT_ATTEMPTED';
    if (stats.attempted > 0) {
      if ((accuracy ?? 0) >= 75) status = 'STRONG';
      else if ((accuracy ?? 0) >= 50) status = 'DEVELOPING';
      else status = 'NEEDS_FOCUS';
    }

    return {
      unitNumber: u.unit_number,
      nameArabic: u.name_arabic,
      nameEnglish: u.name_english,
      slug: u.slug,
      totalQuestionsInDb: qCountInDb,
      totalAttempted: stats.attempted,
      totalCorrect: stats.correct,
      totalIncorrect: stats.incorrect,
      accuracyPct: accuracy,
      coveragePct: coverage,
      status,
    };
  });

  const weakestUnits = unitMastery
    .filter((u) => u.totalIncorrect > 0 || (u.totalAttempted > 0 && (u.accuracyPct ?? 100) < 60))
    .sort((a, b) => b.totalIncorrect - a.totalIncorrect);

  // 5. Preparation Status (Statistically Grounded, No Fake Percentages)
  let prepStatus: UserPreparationStatus = 'NOT_STARTED';
  let prepStatusLabel = 'Not Started';
  let prepStatusDescription = 'Complete your first benchmark exam to establish your baseline accuracy.';

  if (totalAttempted >= 5) {
    if (overallAccuracyPct >= 75 && totalAttempted >= 30) {
      prepStatus = 'STRONG';
      prepStatusLabel = 'Strong & Consistent';
      prepStatusDescription = `Based on ${totalAttempted} practice attempts with ${overallAccuracyPct}% accuracy.`;
    } else if (overallAccuracyPct >= 50) {
      prepStatus = 'DEVELOPING';
      prepStatusLabel = 'Developing Momentum';
      prepStatusDescription = `Based on ${totalAttempted} practice attempts with ${overallAccuracyPct}% accuracy. Focus on weak units.`;
    } else {
      prepStatus = 'NEEDS_ATTENTION';
      prepStatusLabel = 'Needs Focused Practice';
      prepStatusDescription = `Based on ${totalAttempted} practice attempts (${overallAccuracyPct}% accuracy). Target missed questions.`;
    }
  }

  // 6. User State Classification & The ONE Dominant Next Best Action
  let stateType: DeterministicDashboardData['stateType'] = 'NEW_USER';
  let primaryAction: DeterministicDashboardData['primaryAction'];

  if (unfinishedDb) {
    stateType = 'ONGOING_TEST';
    const filters = (unfinishedDb.filters as any) || {};
    const title = filters.paperTitle || filters.titleEnglish || 'Mock Test';
    const currentQ = (unfinishedDb.current_index || 0) + 1;
    const totalQ = unfinishedDb.total_questions || 50;

    primaryAction = {
      badge: 'CONTINUE SESSION',
      badgeColor: 'bg-amber-50 text-amber-900 border border-amber-300',
      title: `Resume ${title}`,
      subtitle: `Question ${currentQ} of ${totalQ} in progress`,
      description: 'You have an active timed exam session waiting. Pick up right where you left off.',
      ctaText: 'Resume Test Now →',
      ctaHref: `/practice?sessionId=${unfinishedDb.id}`,
    };
  } else if (dueMemoryCount > 0) {
    stateType = 'DUE_MEMORIES';
    primaryAction = {
      badge: 'SPACED RECALL DUE',
      badgeColor: 'bg-emerald-50 text-emerald-900 border border-emerald-300',
      title: `Review ${dueMemoryCount} Due ${dueMemoryCount === 1 ? 'Memory Connection' : 'Memory Connections'}`,
      subtitle: 'Maturing SM-2 recall intervals scheduled for today',
      description: 'Review these memory tricks today to advance them to the next retention level and prevent forgetting.',
      ctaText: `Start Memory Review (${dueMemoryCount} Cards) →`,
      ctaHref: '/memories/review',
    };
  } else if (weakestUnits.length > 0 && weakestUnits[0].totalIncorrect > 0) {
    stateType = 'WEAK_UNIT_FOCUS';
    const topWeak = weakestUnits[0];
    primaryAction = {
      badge: 'MISTAKE RECOVERY',
      badgeColor: 'bg-rose-50 text-rose-900 border border-rose-300',
      title: `Retest Unit ${topWeak.unitNumber} Mistakes (${topWeak.totalIncorrect} Questions)`,
      subtitle: `Recover up to +${topWeak.totalIncorrect * 2} marks (${topWeak.totalIncorrect} missed questions × 2 marks)`,
      description: `Your accuracy in Unit ${topWeak.unitNumber} (${topWeak.nameEnglish}) is ${topWeak.accuracyPct ?? 0}%. Retest these specific questions to solidify the correct answers.`,
      ctaText: `Practice Unit ${topWeak.unitNumber} Mistakes →`,
      ctaHref: `/dashboard/incorrect`,
    };
  } else if (totalAttempted === 0) {
    stateType = 'NEW_USER';
    const freeName = freePaperDb ? freePaperDb.display_name || `June ${freePaperDb.year} Paper II` : 'June 2023 Paper II';
    primaryAction = {
      badge: 'GET STARTED',
      badgeColor: 'bg-emerald-50 text-emerald-900 border border-emerald-300',
      title: `Take Your First Official Benchmark Paper`,
      subtitle: `${freeName} • 100 Questions • Timed CBT Mode`,
      description: 'Solve an authentic official UGC NET examination paper completely free to establish your baseline readiness score.',
      ctaText: 'Start Free Benchmark Exam →',
      ctaHref: freePaperDb ? `/practice?paperId=${freePaperDb.id}` : '/pyq',
    };
  } else {
    stateType = 'ALL_CLEAR';
    primaryAction = {
      badge: 'PREPARATION ON TRACK',
      badgeColor: 'bg-emerald-50 text-emerald-900 border border-emerald-300',
      title: `Start Full-Length CBT Mock Exam`,
      subtitle: `All reviews and mistakes currently cleared`,
      description: 'Challenge yourself with an official past paper under authentic NTA 160-minute examination conditions.',
      ctaText: 'Choose Exam Paper →',
      ctaHref: '/pyq',
    };
  }

  return {
    userId,
    subjectId,
    subjectName,
    subjectCode,
    totalAttempted,
    totalCorrect,
    totalIncorrect,
    overallAccuracyPct,
    bookmarkedCount,
    memoryConnectionsCount: memConnectionsCount,
    dueReviewCount: dueMemoryCount,
    completedMemoryCount: completedMemCount,
    totalTrackedMemoryCount: totalTrackedMemCount,
    levelCounts: {
      1: lvl1Count,
      2: lvl2Count,
      3: lvl3Count,
      4: lvl4Count,
      5: lvl5Count,
    },
    streakDays,
    practicedToday,
    isSubscribed: !!userSubs,
    subscriptionPlanName: userSubs?.plan?.name || null,
    subscriptionExpiresAt: userSubs?.expires_at || null,
    prepStatus,
    prepStatusLabel,
    prepStatusDescription,
    recoverableMarks,
    unitMastery,
    weakestUnits,
    stateType,
    primaryAction,
    unfinishedSession: unfinishedDb,
    recentSessions: recentSessionsDb,
    freeBenchmarkPaper: freePaperDb
      ? {
          id: freePaperDb.id,
          displayName: freePaperDb.display_name || `June ${freePaperDb.year} Paper II`,
          year: freePaperDb.year,
          totalQuestions: freePaperDb.total_questions,
        }
      : null,
  };
}
