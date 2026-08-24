import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Target,
  Clock,
  TrendingUp,
  Bookmark,
  AlertCircle,
  ChevronRight,
  Zap,
  Brain,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Trophy,
  Layers,
  Play,
} from 'lucide-react';
import { auth } from '@/lib/auth';
import DeleteAccountButton from '@/components/dashboard/DeleteAccountButton';
import SpacedPyqTracker, { SpacedItem } from '@/components/dashboard/SpacedPyqTracker';
import prisma from '@/lib/db';
import { formatRelativeDate } from '@/lib/dateUtils';
import { getActiveSubjectServer } from '@/lib/subjectContext';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const activeSubject = await getActiveSubjectServer();
  return {
    title: `Dashboard — ${activeSubject.name} Preparation Progress`,
    description: `Track your UGC NET ${activeSubject.name} progress, accuracy, weak units, and next recommended action.`,
  };
}

export default async function DashboardPage() {
  const session = await auth();
  const activeSubject = await getActiveSubjectServer();

  let questionsAttempted = 0;
  let accuracyRate = 0;
  let bookmarkedCount = 0;
  let incorrectCount = 0;

  // Memory & 5-Level Spaced metrics
  let memoriesCount = 0;
  let dueReviewCount = 0;
  let rememberedTodayCount = 0;
  let connectionsCount = 0;
  let completedCount = 0;
  let totalTrackedCount = 0;
  let levelCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let completedSpacedItems: SpacedItem[] = [];
  let activeSpacedItems: SpacedItem[] = [];

  // Next best action & weak units
  let unfinishedSession: any = null;
  let weakestUnits: Array<{ unit_number: number; name_arabic: string; name_english: string; count: number }> = [];
  let recentSessions: any[] = [];

  if (session?.user?.id) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [
      totalAttempted,
      correctCount,
      incorrectCountDb,
      bookmarkedCountDb,
      memCountDb,
      dueCountDb,
      remTodayDb,
      connCountDb,
      compCountDb,
      totTrackDb,
      lvl1Db,
      lvl2Db,
      lvl3Db,
      lvl4Db,
      lvl5Db,
      compItemsDb,
      activeItemsDb,
      unfinishedDb,
      incorrectAttemptsDb,
      recentSessionsDb,
    ] = await Promise.all([
      prisma.practiceAttempt.count({
        where: {
          user_id: session.user.id,
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.practiceAttempt.count({
        where: {
          user_id: session.user.id,
          is_correct: true,
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.practiceAttempt.count({
        where: {
          user_id: session.user.id,
          is_correct: false,
          is_skipped: false,
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.bookmark.count({
        where: {
          user_id: session.user.id,
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.memoryConnection.count({
        where: {
          user_id: session.user.id,
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.spacedMemoryQueue.count({
        where: {
          user_id: session.user.id,
          status: 'ACTIVE',
          next_review_at: { lte: now },
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.spacedMemoryQueue.count({
        where: {
          user_id: session.user.id,
          updated_at: { gte: todayStart },
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.questionConnection.count({
        where: {
          user_id: session.user.id,
          source_question: { subject_id: activeSubject.id },
        },
      }),
      prisma.spacedMemoryQueue.count({
        where: {
          user_id: session.user.id,
          is_completed: true,
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.spacedMemoryQueue.count({
        where: {
          user_id: session.user.id,
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.spacedMemoryQueue.count({
        where: {
          user_id: session.user.id,
          level: 1,
          is_completed: false,
          status: 'ACTIVE',
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.spacedMemoryQueue.count({
        where: {
          user_id: session.user.id,
          level: 2,
          is_completed: false,
          status: 'ACTIVE',
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.spacedMemoryQueue.count({
        where: {
          user_id: session.user.id,
          level: 3,
          is_completed: false,
          status: 'ACTIVE',
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.spacedMemoryQueue.count({
        where: {
          user_id: session.user.id,
          level: 4,
          is_completed: false,
          status: 'ACTIVE',
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.spacedMemoryQueue.count({
        where: {
          user_id: session.user.id,
          level: 5,
          is_completed: false,
          status: 'ACTIVE',
          question: { subject_id: activeSubject.id },
        },
      }),
      prisma.spacedMemoryQueue.findMany({
        where: {
          user_id: session.user.id,
          is_completed: true,
          question: { subject_id: activeSubject.id },
        },
        include: {
          question: {
            include: {
              exam_paper: {
                select: {
                  year: true,
                  paper_number: true,
                  session: true,
                },
              },
            },
          },
        },
        orderBy: { completed_at: 'desc' },
        take: 15,
      }),
      prisma.spacedMemoryQueue.findMany({
        where: {
          user_id: session.user.id,
          is_completed: false,
          status: 'ACTIVE',
          question: { subject_id: activeSubject.id },
        },
        include: {
          question: {
            include: {
              exam_paper: {
                select: {
                  year: true,
                  paper_number: true,
                  session: true,
                },
              },
            },
          },
        },
        orderBy: { next_review_at: 'asc' },
        take: 15,
      }),
      prisma.practiceSession.findFirst({
        where: {
          user_id: session.user.id,
          subject_id: activeSubject.id,
          status: 'in_progress',
        },
        orderBy: { last_active_at: 'desc' },
      }),
      prisma.practiceAttempt.findMany({
        where: {
          user_id: session.user.id,
          is_correct: false,
          is_skipped: false,
          question: { subject_id: activeSubject.id },
        },
        include: {
          question: {
            select: {
              unit: {
                select: {
                  unit_number: true,
                  name_arabic: true,
                  name_english: true,
                },
              },
            },
          },
        },
        take: 80,
      }),
      prisma.practiceSession.findMany({
        where: {
          user_id: session.user.id,
          subject_id: activeSubject.id,
        },
        orderBy: { started_at: 'desc' },
        take: 4,
      }),
    ]);

    questionsAttempted = totalAttempted;
    accuracyRate = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;
    incorrectCount = incorrectCountDb;
    bookmarkedCount = bookmarkedCountDb;

    memoriesCount = memCountDb;
    dueReviewCount = dueCountDb;
    rememberedTodayCount = remTodayDb;
    connectionsCount = connCountDb;
    completedCount = compCountDb;
    totalTrackedCount = totTrackDb;
    levelCounts = {
      1: lvl1Db,
      2: lvl2Db,
      3: lvl3Db,
      4: lvl4Db,
      5: lvl5Db,
    };
    completedSpacedItems = compItemsDb.map((item) => ({
      id: item.id,
      question_id: item.question_id,
      level: item.level,
      interval_days: item.interval_days,
      next_review_at: item.next_review_at.toISOString(),
      due_deadline: item.due_deadline ? item.due_deadline.toISOString() : null,
      is_completed: item.is_completed,
      completed_at: item.completed_at ? item.completed_at.toISOString() : null,
      memory_strength: item.memory_strength,
      question: item.question,
    }));
    activeSpacedItems = activeItemsDb.map((item) => ({
      id: item.id,
      question_id: item.question_id,
      level: item.level,
      interval_days: item.interval_days,
      next_review_at: item.next_review_at.toISOString(),
      due_deadline: item.due_deadline ? item.due_deadline.toISOString() : null,
      is_completed: item.is_completed,
      completed_at: item.completed_at ? item.completed_at.toISOString() : null,
      memory_strength: item.memory_strength,
      question: item.question,
    }));

    unfinishedSession = unfinishedDb;
    recentSessions = recentSessionsDb;

    // Aggregate weakest units
    const unitMap: Record<number, { unit_number: number; name_arabic: string; name_english: string; count: number }> = {};
    for (const att of incorrectAttemptsDb) {
      const u = att.question?.unit;
      if (u) {
        if (!unitMap[u.unit_number]) {
          unitMap[u.unit_number] = {
            unit_number: u.unit_number,
            name_arabic: u.name_arabic || '',
            name_english: u.name_english || '',
            count: 0,
          };
        }
        unitMap[u.unit_number].count++;
      }
    }
    weakestUnits = Object.values(unitMap).sort((a, b) => b.count - a.count);
  }

  // ── Calculate ONE Dominant "NEXT BEST ACTION" ──
  let nextAction: {
    type: string;
    badge: string;
    badgeColor: string;
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaHref: string;
  };

  if (unfinishedSession) {
    const filters = (unfinishedSession.filters as any) || {};
    const title = filters.paperTitle || filters.titleEnglish || 'Mock Test';
    const currentQ = (unfinishedSession.current_index || 0) + 1;
    const totalQ = unfinishedSession.total_questions || 50;

    nextAction = {
      type: 'RESUME_PRACTICE',
      badge: 'CONTINUE SESSION',
      badgeColor: 'bg-amber-50 text-amber-900 border border-amber-200',
      title: 'Continue where you left off',
      subtitle: `${title} • Question ${currentQ} of ${totalQ}`,
      description: 'You have an active practice session waiting. Resume now to maintain your test momentum.',
      ctaText: 'Continue Practice →',
      ctaHref: `/practice?sessionId=${unfinishedSession.id}`,
    };
  } else if (dueReviewCount > 0) {
    nextAction = {
      type: 'REVIEW_MEMORIES',
      badge: 'SCHEDULED REVIEW',
      badgeColor: 'bg-emerald-50 text-emerald-900 border border-emerald-200',
      title: `${dueReviewCount} ${dueReviewCount === 1 ? 'memory is' : 'memories are'} due for review`,
      subtitle: 'Solidify your retention before the interval expires',
      description: 'Review your scheduled memory connections on time to progress them to the next retention level.',
      ctaText: 'Review Memories Now →',
      ctaHref: '/memories/review',
    };
  } else if (incorrectCount > 0) {
    nextAction = {
      type: 'REVIEW_MISTAKES',
      badge: 'WEAK AREA FOCUS',
      badgeColor: 'bg-rose-50 text-rose-900 border border-rose-200',
      title: `You have ${incorrectCount} questions to review`,
      subtitle: 'Targeted revision based on past test mistakes',
      description: 'Revisit your mistakes to eliminate weak points and prevent repeated errors in the exam.',
      ctaText: 'Review Mistakes →',
      ctaHref: '/dashboard/incorrect',
    };
  } else if (questionsAttempted === 0) {
    nextAction = {
      type: 'START_FIRST_TEST',
      badge: 'GET STARTED',
      badgeColor: 'bg-stone-100 text-stone-800 border border-stone-300',
      title: 'Start your first PYQ paper',
      subtitle: 'You haven’t started a test yet',
      description: 'Solve real past exam questions to establish your baseline accuracy and unlock personal memory tracking.',
      ctaText: 'Choose a PYQ Paper →',
      ctaHref: '/pyq',
    };
  } else if (weakestUnits.length > 0) {
    const topWeak = weakestUnits[0];
    nextAction = {
      type: 'PRACTICE_WEAK_UNIT',
      badge: 'RECOMMENDED PRACTICE',
      badgeColor: 'bg-blue-50 text-blue-900 border border-blue-200',
      title: `Practice Unit ${topWeak.unit_number}: ${topWeak.name_english}`,
      subtitle: `${topWeak.count} mistakes logged in this unit`,
      description: 'Reinforce this specific syllabus unit to improve your overall test accuracy.',
      ctaText: `Practice Unit ${topWeak.unit_number} →`,
      ctaHref: `/syllabus/${topWeak.unit_number}`,
    };
  } else {
    nextAction = {
      type: 'ALL_CLEAR',
      badge: 'PREPARATION ON TRACK',
      badgeColor: 'bg-emerald-50 text-emerald-900 border border-emerald-200',
      title: 'You are all caught up!',
      subtitle: 'All reviews and mistakes cleared',
      description: 'Challenge yourself with a full 100-question mock exam or explore a new syllabus unit.',
      ctaText: 'Browse All PYQ Papers →',
      ctaHref: '/pyq',
    };
  }

  // Determine accuracy label
  let accuracyContext = 'Based on practice attempts';
  if (questionsAttempted > 0) {
    if (accuracyRate >= 75) accuracyContext = 'Strong performance';
    else if (accuracyRate >= 50) accuracyContext = 'Developing accuracy';
    else accuracyContext = 'Needs focused practice';
  }

  return (
    <div className="flex-1 bg-stone-50/60 min-h-screen text-stone-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── 1. WELCOME + ACTIONABLE STATUS ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
              <span>{activeSubject.name} (Code {activeSubject.code})</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {activeSubject.name} NET/JRF Dashboard
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm font-medium mt-0.5">
              {dueReviewCount > 0
                ? `You have ${dueReviewCount} memories due for review today.`
                : incorrectCount > 0
                ? `You have ${incorrectCount} mistakes logged to review in ${activeSubject.name}.`
                : `Your preparation queue for ${activeSubject.name} is currently clear.`}
            </p>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-bold">
            <Link
              href="/dashboard/bookmarks"
              className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:border-stone-300 transition-colors inline-flex items-center gap-1.5"
            >
              <Bookmark size={13} className="text-amber-600" />
              <span>Bookmarks ({bookmarkedCount})</span>
            </Link>
            <Link
              href="/memories"
              className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:border-stone-300 transition-colors inline-flex items-center gap-1.5"
            >
              <Brain size={13} className="text-emerald-700" />
              <span>Knowledge Graph ({connectionsCount})</span>
            </Link>
          </div>
        </div>

        {/* ── 2. PREPARATION METRICS STRIP (Where am I?) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Questions Solved</div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">{questionsAttempted}</div>
            <div className="text-[11px] font-bold text-stone-500 mt-0.5">Attempts logged</div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Accuracy Rate</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-800 mt-1">{accuracyRate}%</div>
            <div className="text-[11px] font-bold text-stone-500 mt-0.5">{accuracyContext}</div>
          </div>

          <Link
            href="/dashboard/incorrect"
            className="bg-white hover:bg-rose-50/40 rounded-2xl p-4 sm:p-5 border border-stone-200/90 hover:border-rose-200 shadow-sm transition-all group"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 group-hover:text-rose-700">
              Mistakes to Master
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-700 mt-1">{incorrectCount}</div>
            <div className="text-[11px] font-bold text-stone-500 mt-0.5">Review mistakes →</div>
          </Link>

          <Link
            href="/memories"
            className="bg-white hover:bg-emerald-50/40 rounded-2xl p-4 sm:p-5 border border-stone-200/90 hover:border-emerald-200 shadow-sm transition-all group"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 group-hover:text-emerald-800">
              PYQs Mastered 🏆
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-800 mt-1">{completedCount}</div>
            <div className="text-[11px] font-bold text-stone-500 mt-0.5">
              {totalTrackedCount > 0 ? `${completedCount} of ${totalTrackedCount} in queue` : '5-Level retention'}
            </div>
          </Link>
        </div>

        {/* ── 3. THE DOMINANT NEXT BEST ACTION CARD (What should I do now?) ── */}
        <div className="bg-white rounded-3xl border-2 border-stone-900 shadow-md p-6 sm:p-7 mb-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold uppercase tracking-wider ${nextAction.badgeColor}`}>
                  {nextAction.badge}
                </span>
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                  NEXT BEST ACTION
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                {nextAction.title}
              </h2>

              <div className="text-xs sm:text-sm font-bold text-emerald-900">
                {nextAction.subtitle}
              </div>

              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {nextAction.description}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href={nextAction.ctaHref}
                className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-sm inline-flex items-center gap-2 active:scale-95"
              >
                <span>{nextAction.ctaText}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── 4. FOCUS NEXT / WEAK AREAS (What am I weak at?) ── */}
        {weakestUnits.length > 0 && (
          <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-sm mb-10">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-5">
              <div>
                <h3 className="text-base font-black text-stone-900">Focus Next: Weak Areas</h3>
                <p className="text-xs text-stone-500 font-medium mt-0.5">
                  Units with the highest frequency of errors in past tests.
                </p>
              </div>

              <Link
                href="/dashboard/incorrect"
                className="text-xs font-bold text-rose-700 hover:text-rose-900 transition-colors flex items-center gap-1"
              >
                <span>Review All Mistakes ({incorrectCount})</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {weakestUnits.slice(0, 3).map((w, idx) => (
                <Link
                  key={w.unit_number}
                  href={`/syllabus/${w.unit_number}`}
                  className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 hover:border-rose-300 transition-all group flex flex-col justify-between space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-900">
                      {idx + 1}. Unit {w.unit_number}
                    </span>
                    <span className="text-xs font-bold text-rose-700">
                      {w.count} {w.count === 1 ? 'mistake' : 'mistakes'}
                    </span>
                  </div>

                  <div>
                    <div
                      dir="rtl"
                      lang="ar"
                      className="font-arabic font-bold text-stone-900 text-sm line-clamp-1 text-right"
                    >
                      {w.name_arabic}
                    </div>
                    <div className="text-xs font-bold text-stone-600 line-clamp-1 mt-0.5">
                      {w.name_english}
                    </div>
                  </div>

                  <div className="text-[11px] font-bold text-rose-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Practice this unit →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── 5. YOUR MEMORY RETENTION LOOP & 5-LEVEL TRACKER (What should I remember?) ── */}
        <SpacedPyqTracker
          completedItems={completedSpacedItems}
          activeItems={activeSpacedItems}
          levelCounts={levelCounts}
          totalCompletedCount={completedCount}
          totalTrackedCount={totalTrackedCount}
          dueTodayCount={dueReviewCount}
        />

        {/* ── 6. RECENT TEST ACTIVITY (What did I do?) ── */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-sm mb-12">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-5">
            <div>
              <h3 className="text-base font-black text-stone-900">Recent Test Activity</h3>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                History of completed and ongoing mock practice sessions.
              </p>
            </div>

            <Link
              href="/pyq"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors flex items-center gap-1"
            >
              <span>Browse All Papers</span>
              <ChevronRight size={13} />
            </Link>
          </div>

          {recentSessions.length === 0 ? (
            <div className="text-center py-6 px-4 space-y-1.5">
              <Clock size={28} className="mx-auto text-stone-300" />
              <p className="text-xs font-bold text-stone-700">No test attempts yet</p>
              <p className="text-[11px] text-stone-400 max-w-sm mx-auto">
                Start practicing PYQs or Syllabus units to see your score history logged here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {recentSessions.map((rs) => {
                const filters = (rs.filters as any) || {};
                const displayTitle =
                  filters.paperTitle ||
                  filters.titleEnglish ||
                  (filters.year ? `Year ${filters.year} Paper` : `${rs.mode.replace('_', ' ').toUpperCase()} Practice`);
                const accuracy = rs.total_questions > 0 ? Math.round((rs.correct_count / rs.total_questions) * 100) : 0;
                const isOngoing = rs.status === 'in_progress';

                return (
                  <div
                    key={rs.id}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-xs sm:text-sm">{displayTitle}</span>
                        {isOngoing && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px]">
                            In Progress
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-400 font-medium">
                        {rs.started_at ? formatRelativeDate(rs.started_at) : 'Recently'} • {rs.total_questions} questions
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {!isOngoing ? (
                        <div className="text-right">
                          <div className="text-xs sm:text-sm font-black text-stone-900">{rs.score} pts</div>
                          <div className="text-[11px] font-bold text-emerald-700">{accuracy}% accuracy</div>
                        </div>
                      ) : (
                        <Link
                          href={`/practice?sessionId=${rs.id}`}
                          className="px-3 py-1 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors"
                        >
                          Resume
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── 7. ACCOUNT MANAGEMENT (Subordinate Section) ── */}
        <div id="account-settings" className="border-t border-stone-200 pt-6 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/70 rounded-2xl p-5 border border-stone-200 text-xs">
            <div>
              <div className="font-bold text-stone-900">Account Management</div>
              <div className="text-stone-500 mt-0.5">Signed in as {session?.user?.email || 'Student'}</div>
            </div>
            {session && <DeleteAccountButton />}
          </div>
        </div>

      </div>
    </div>
  );
}
