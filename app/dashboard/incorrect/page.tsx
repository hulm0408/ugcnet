import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import MistakesTrackerClient, {
  SessionHistoryItem,
  TestMistakeItem,
  UnitMistakeStat,
} from '@/components/dashboard/MistakesTrackerClient';
import { formatRelativeDate, formatFullDateTime } from '@/lib/dateUtils';

import { getActiveSubjectServer } from '@/lib/subjectContext';

export const metadata: Metadata = {
  title: 'Mistake Tracker & Test History | Dashboard',
  description: 'Review your past test attempts, track mistakes by date and paper, and practice weak topics.',
};

export default async function IncorrectQuestionsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/dashboard/incorrect');
  }

  const userId = session.user.id;
  const activeSubject = await getActiveSubjectServer();

  // 1. Fetch test sessions for the user scoped strictly to the active subject
  const [sessionsDb, allAttemptsDb, unitsDb] = await Promise.all([
    prisma.practiceSession.findMany({
      where: {
        user_id: userId,
        subject_id: activeSubject.id,
      },
      orderBy: { completed_at: 'desc' },
      include: {
        attempts: {
          include: {
            question: {
              include: {
                unit: true,
                exam_paper: true,
              },
            },
          },
          orderBy: { attempted_at: 'asc' },
        },
      },
    }),
    prisma.practiceAttempt.findMany({
      where: {
        user_id: userId,
        question: { subject_id: activeSubject.id },
      },
      select: {
        id: true,
        question_id: true,
        is_correct: true,
        is_skipped: true,
        selected_option: true,
        attempted_at: true,
        session_id: true,
      },
      orderBy: { attempted_at: 'asc' },
    }),
    prisma.syllabusUnit.findMany({
      where: { subject_id: activeSubject.id },
      orderBy: { unit_number: 'asc' },
    }),
  ]);

  // Determine question resolution status (if answered correctly in ANY later attempt)
  const questionLatestStatus = new Map<string, boolean>();
  for (const att of allAttemptsDb) {
    if (att.is_correct === true) {
      questionLatestStatus.set(att.question_id, true);
    } else if (att.is_correct === false && !att.is_skipped) {
      if (!questionLatestStatus.has(att.question_id)) {
        questionLatestStatus.set(att.question_id, false);
      }
    }
  }

  // 2. Format Sessions for Timeline View
  const sessions: SessionHistoryItem[] = sessionsDb.map((s) => {
    const filters = (s.filters as any) || {};
    const dateObj = s.completed_at ?? s.started_at;

    // Extract mistakes in this session
    const sessionMistakes: TestMistakeItem[] = s.attempts
      .filter((a) => a.is_correct === false && !a.is_skipped)
      .map((a) => {
        const q = a.question;
        return {
          questionId: q.id,
          question_arabic: q.question_arabic,
          question_english: q.question_english,
          selected_option: a.selected_option || 'None',
          correct_answer: q.correct_answer,
          options_arabic: (q.options_arabic as Record<string, string>) || {},
          options_english: q.options_english as Record<string, string> | null,
          explanation_arabic: q.explanation_arabic,
          explanation_english: q.explanation_english,
          unit_number: q.unit?.unit_number ?? null,
          unit_name: q.unit?.name_english ?? null,
          paper_name: q.exam_paper?.display_name ?? null,
          paper_year: q.exam_paper?.year ?? null,
          isResolved: questionLatestStatus.get(q.id) === true,
        };
      });

    let displayTitle = filters.paperTitle || filters.titleEnglish;
    if (!displayTitle) {
      if (s.mode === 'year_wise' || filters.year) displayTitle = `Year ${filters.year} Exam Paper`;
      else if (s.mode === 'unit_wise' || filters.unitNumber) displayTitle = `Unit ${filters.unitNumber} Practice Test`;
      else displayTitle = `${s.mode.replace('_', ' ').toUpperCase()} Practice`;
    }

    const accuracy = s.total_questions > 0 ? Math.round((s.correct_count / s.total_questions) * 100) : 0;

    return {
      id: s.id,
      mode: s.mode,
      paperTitle: displayTitle,
      year: filters.year ?? null,
      paperId: filters.paperId ?? null,
      unitNumber: filters.unitNumber ?? null,
      total_questions: s.total_questions,
      score: s.score,
      correct_count: s.correct_count,
      incorrect_count: s.incorrect_count,
      skipped_count: s.skipped_count,
      accuracy,
      completed_at: dateObj.toISOString(),
      relativeTime: formatRelativeDate(dateObj),
      fullDateTime: formatFullDateTime(dateObj),
      mistakes: sessionMistakes,
    };
  });

  // 3. Build unique mistakes collection across all sessions
  const uniqueMistakesMap = new Map<string, TestMistakeItem>();

  for (const s of sessions) {
    for (const m of s.mistakes) {
      if (!uniqueMistakesMap.has(m.questionId)) {
        uniqueMistakesMap.set(m.questionId, m);
      }
    }
  }

  const allMistakes = Array.from(uniqueMistakesMap.values());

  // 4. Calculate Unit Mistakes Statistics
  const unitStats: UnitMistakeStat[] = unitsDb.map((u) => {
    const unitMistakes = allMistakes.filter((m) => m.unit_number === u.unit_number);
    const unresolved = unitMistakes.filter((m) => !m.isResolved);

    return {
      unitNumber: u.unit_number,
      nameArabic: u.name_arabic,
      nameEnglish: u.name_english,
      mistakeCount: unitMistakes.length,
      unresolvedCount: unresolved.length,
    };
  });

  // 5. Summary Statistics
  const unresolvedMistakes = allMistakes.filter((m) => !m.isResolved).length;
  const resolvedMistakes = allMistakes.filter((m) => m.isResolved).length;

  return (
    <div className="flex-1 bg-stone-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 mb-6 transition-colors"
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </Link>

        <MistakesTrackerClient
          sessions={sessions}
          allMistakes={allMistakes}
          unitStats={unitStats}
          summaryStats={{
            totalMistakes: allMistakes.length,
            unresolvedMistakes,
            resolvedMistakes,
            totalSessions: sessions.length,
          }}
        />
      </div>
    </div>
  );
}
