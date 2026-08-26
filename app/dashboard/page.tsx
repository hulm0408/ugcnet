import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
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
  Flame,
  Sparkles,
  Award,
  Calendar,
  ShieldCheck,
  Lightbulb,
  FileCheck2,
} from 'lucide-react';
import { auth } from '@/lib/auth';
import DeleteAccountButton from '@/components/dashboard/DeleteAccountButton';
import { getActiveSubjectServer } from '@/lib/subjectContext';
import { getDeterministicDashboardData } from '@/lib/dashboardEngine';
import { formatRelativeDate } from '@/lib/dateUtils';
import BilingualText from '@/components/ui/BilingualText';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const activeSubject = await getActiveSubjectServer();
  return {
    title: `Candidate Dashboard — ${activeSubject.name} UGC NET/JRF Preparation`,
    description: `Track your preparation status, verified accuracy, weak unit diagnostics, and memory recall for ${activeSubject.name}.`,
  };
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/dashboard');
  }

  const activeSubject = await getActiveSubjectServer();
  const data = await getDeterministicDashboardData(
    session.user.id,
    activeSubject.id,
    activeSubject.name,
    activeSubject.code
  );

  const userName = session.user.name?.split(' ')[0] || 'Scholar';

  return (
    <div className="flex-1 bg-[#F8FAFC] text-slate-900 font-sans min-h-screen pb-16">
      
      {/* ── 1. GREETING HEADER & QUICK NAVIGATION ── */}
      <section className="bg-white border-b border-slate-200 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <Sparkles size={14} className="text-emerald-700" />
                <span>Scholar Preparation Hub • {data.subjectName} (Code {data.subjectCode})</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight">
                Welcome back, {userName}!
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                {data.prepStatusDescription}
              </p>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard/bookmarks"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
                title="Saved Bookmarks"
              >
                <Bookmark size={15} className="text-amber-500" />
                <span>Bookmarks ({data.bookmarkedCount})</span>
              </Link>
              <Link
                href="/memories"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
                title="5 Level Memory System"
              >
                <Brain size={15} className="text-purple-600" />
                <span>5 Level Memory ({data.memoryConnectionsCount})</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. MAIN DASHBOARD CONTENT ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Dominant Action Card */}
        <div className="bg-white rounded-2xl border-2 border-emerald-500/80 p-6 sm:p-8 shadow-xs hover:border-emerald-600 transition-colors relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {data.primaryAction.badge}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  TODAY&apos;S PRIMARY PRIORITY
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                {data.primaryAction.title}
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                {data.primaryAction.description}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href={data.primaryAction.ctaHref}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base rounded-xl transition-all shadow-xs inline-flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{data.primaryAction.ctaText}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>

        {/* ── 3. PREPARATION METRICS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Questions Solved */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Questions Solved
            </div>
            <div className="text-2xl sm:text-4xl font-sans font-bold text-slate-900">
              {data.totalAttempted}
            </div>
            <div className="text-xs text-slate-500 font-medium pt-1">
              {data.totalAttempted > 0
                ? `${data.totalCorrect} correct • ${data.totalIncorrect} incorrect`
                : '0 attempts logged in this subject'}
            </div>
          </div>

          {/* Card 2: Verified Accuracy Rate */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verified Accuracy
            </div>
            <div className="text-2xl sm:text-4xl font-sans font-bold text-blue-600">
              {data.totalAttempted >= 5 ? `${data.overallAccuracyPct}%` : '—'}
            </div>
            <div className="text-xs text-slate-500 font-medium pt-1">
              {data.totalAttempted >= 5
                ? data.prepStatusLabel
                : 'Need 5+ attempts for accuracy metric'}
            </div>
          </div>

          {/* Card 3: Recoverable Marks */}
          <Link
            href="/dashboard/incorrect"
            className="bg-white hover:bg-rose-50/20 rounded-2xl p-5 border border-slate-200 hover:border-rose-300 shadow-xs transition-all group space-y-1 cursor-pointer"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-rose-600">
              Recoverable Marks
            </div>
            <div className="text-2xl sm:text-4xl font-sans font-bold text-rose-600">
              {data.recoverableMarks > 0 ? `+${data.recoverableMarks}` : '0'}
            </div>
            <div className="text-xs text-slate-500 group-hover:text-rose-600 font-medium pt-1">
              {data.totalIncorrect > 0
                ? `${data.totalIncorrect} missed questions × 2 marks each →`
                : 'Zero unmastered mistakes logged'}
            </div>
          </Link>

          {/* Card 4: Real Continuous Daily Streak */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Daily Study Streak
            </div>
            <div className="text-2xl sm:text-4xl font-sans font-bold text-slate-900 flex items-center gap-1.5">
              <span>{data.streakDays}</span>
              <span className="text-amber-500 text-xl font-bold">Days 🔥</span>
            </div>
            <div className="text-xs text-slate-500 font-medium pt-1">
              {data.practicedToday
                ? '✓ Completed practice today'
                : 'Practice 1 question today to maintain streak'}
            </div>
          </div>

        </div>

        {/* ── 4. WEAK AREAS DIAGNOSTIC (FOR RETURNING USERS WITH MISTAKES) ── */}
        {data.weakestUnits.length > 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 mb-0.5">
                  MISTAKE BANK DIAGNOSTIC
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Focus Next: Units with High Error Frequency
                </h2>
              </div>
              <Link
                href="/dashboard/incorrect"
                className="text-xs font-bold text-rose-700 hover:text-rose-800 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Review All {data.totalIncorrect} Mistakes</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.weakestUnits.slice(0, 3).map((w) => (
                <Link
                  key={w.unitNumber}
                  href={`/syllabus/${w.unitNumber}`}
                  className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200 hover:border-rose-400 hover:bg-rose-50 transition-all flex flex-col justify-between space-y-3 group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-900 font-mono font-bold text-xs flex items-center justify-center">
                      U{w.unitNumber}
                    </span>
                    <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                      {w.totalIncorrect} {w.totalIncorrect === 1 ? 'Error' : 'Errors'}
                    </span>
                  </div>

                  <div>
                    {w.nameArabic && (
                      <div
                        dir="rtl"
                        lang="ar"
                        className="font-arabic font-bold text-slate-900 text-sm line-clamp-1 text-right mb-0.5"
                      >
                        {w.nameArabic}
                      </div>
                    )}
                    <div className="text-xs font-bold text-slate-700 line-clamp-1">
                      {w.nameEnglish}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-rose-200 flex items-center justify-between text-xs font-bold text-rose-800 group-hover:text-rose-950">
                    <span>Practice this unit ({w.accuracyPct ?? 0}% accuracy)</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── 5. COMPACT 10-UNIT SYLLABUS MASTERY RADAR (PROGRESS BARS) ── */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-0.5">
                CURRICULUM COVERAGE
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                {data.subjectName} — 10-Unit Preparation Progress
              </h2>
            </div>
            <Link
              href="/syllabus"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Complete Syllabus Tree</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {data.unitMastery.map((u) => {
              const hasActivity = u.totalAttempted > 0;
              const isWeak = u.status === 'NEEDS_FOCUS';
              const isStrong = u.status === 'STRONG';

              return (
                <Link
                  key={u.unitNumber}
                  href={`/syllabus/${u.unitNumber}`}
                  className="p-3.5 sm:p-4 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 sm:w-1/3">
                    <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold text-xs text-slate-700 flex items-center justify-center shrink-0">
                      U{u.unitNumber}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {u.nameEnglish}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {u.totalQuestionsInDb} Questions in syllabus
                      </div>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="flex-1 min-w-0 sm:px-6">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
                      <span>{hasActivity ? `${u.totalAttempted} Attempted` : 'Not Attempted Yet'}</span>
                      <span>{hasActivity ? `${u.accuracyPct}% Accuracy` : '—'}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isStrong
                            ? 'bg-emerald-600'
                            : isWeak
                            ? 'bg-rose-500'
                            : hasActivity
                            ? 'bg-blue-600'
                            : 'bg-slate-300'
                        }`}
                        style={{ width: `${Math.max(5, u.coveragePct)}%` }}
                      />
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0 flex items-center gap-2 text-xs font-bold">
                    {hasActivity ? (
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider ${
                          isStrong
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : isWeak
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {isStrong ? 'Strong' : isWeak ? 'Needs Focus' : 'Developing'}
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] uppercase tracking-wider border border-slate-200">
                        Not Started
                      </span>
                    )}
                    <ChevronRight size={14} className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── 6. RECENT TEST HISTORY ── */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                EXAM LOGS
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Recent Test History
              </h2>
            </div>
            <Link
              href="/pyq"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Browse All Papers</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {data.recentSessions.length === 0 ? (
            <div className="text-center py-8 px-4 space-y-2">
              <Clock size={32} className="mx-auto text-slate-400" />
              <p className="text-sm font-bold text-slate-700">No test attempts logged yet</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Solve a timed previous year paper or unit mock test to see your score analysis recorded here.
              </p>
              <div className="pt-2">
                <Link
                  href={data.freeBenchmarkPaper ? `/practice?paperId=${data.freeBenchmarkPaper.id}` : '/pyq'}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Play size={13} fill="currentColor" />
                  <span>Start Practice Session</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {data.recentSessions.map((rs) => {
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
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{displayTitle}</span>
                        {isOngoing && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[10px]">
                            In Progress
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {rs.started_at ? formatRelativeDate(rs.started_at) : 'Recently'} • {rs.total_questions} questions
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {!isOngoing ? (
                        <div className="text-right">
                          <div className="text-sm font-bold text-slate-900">{rs.score} pts</div>
                          <div className="text-xs font-bold text-emerald-700">{accuracy}% accuracy</div>
                        </div>
                      ) : (
                        <Link
                          href={`/practice?sessionId=${rs.id}`}
                          className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs hover:bg-slate-200 transition-colors shadow-2xs cursor-pointer"
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

        {/* ── 7. COLLAPSIBLE ACCOUNT SETTINGS ── */}
        <details className="bg-white rounded-2xl border border-slate-200 p-5 group transition-all">
          <summary className="font-bold text-xs text-slate-500 cursor-pointer flex items-center justify-between select-none">
            <span>Account &amp; Security Settings</span>
            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="font-bold text-slate-900">Registered Email</div>
              <div className="text-slate-500 mt-0.5">{session?.user?.email || 'Scholar'}</div>
            </div>
            {session && <DeleteAccountButton />}
          </div>
        </details>

      </main>
    </div>
  );
}
