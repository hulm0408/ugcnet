import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Target, Clock, TrendingUp, BookMarked, AlertCircle, ChevronRight, Sparkles } from 'lucide-react';
import { auth } from '@/lib/auth';
import DeleteAccountButton from '@/components/dashboard/DeleteAccountButton';
import prisma from '@/lib/db';
import { formatRelativeDate } from '@/lib/dateUtils';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your Arabic NET/JRF practice dashboard — track progress, accuracy, and weak topics.',
};

const quickActions = [
  { label: 'Continue Practice', href: '/practice', icon: BookOpen, color: 'bg-stone-900 text-white hover:bg-stone-800', desc: 'Pick up where you left off' },
  { label: 'PYQ Year-wise', href: '/pyq', icon: BookMarked, color: 'bg-primary text-white hover:bg-primary-dark', desc: 'Browse past exam papers' },
  { label: 'Syllabus Units', href: '/syllabus', icon: Target, color: 'bg-accent text-white hover:bg-amber-600', desc: 'Practice unit by unit' },
];

export default async function DashboardPage() {
  const session = await auth();
  
  let questionsAttempted = 0;
  let accuracyRate = 0;
  let bookmarkedCount = 0;
  let incorrectCount = 0;

  if (session?.user?.id) {
    // Count actual answered attempts (not session.total_questions which = session size)
    const [totalAttempted, correctCount, incorrectCountDb, bookmarkedCountDb] = await Promise.all([
      prisma.practiceAttempt.count({
        where: { user_id: session.user.id },
      }),
      prisma.practiceAttempt.count({
        where: { user_id: session.user.id, is_correct: true },
      }),
      prisma.practiceAttempt.count({
        where: { user_id: session.user.id, is_correct: false, is_skipped: false },
      }),
      prisma.bookmark.count({
        where: { user_id: session.user.id },
      }),
    ]);

    questionsAttempted = totalAttempted;
    accuracyRate = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;
    incorrectCount = incorrectCountDb;
    bookmarkedCount = bookmarkedCountDb;
  }

  // Fetch recent sessions
  let recentSessions: any[] = [];
  if (session?.user?.id) {
    recentSessions = await prisma.practiceSession.findMany({
      where: { user_id: session.user.id },
      orderBy: { completed_at: 'desc' },
      take: 3,
    });
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-primary-surface to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-stone-900 to-stone-600 tracking-tight">
              {session?.user?.name ? `Welcome back, ${session.user.name}` : 'My Dashboard'}
            </h1>
            <p className="text-stone-500 text-base mt-2">Track your NET/JRF Arabic preparation progress</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          {[
            { label: 'Questions Attempted', value: questionsAttempted.toString(), icon: Target, color: 'text-blue-600 bg-blue-50 border-blue-100', href: null },
            { label: 'Accuracy Rate', value: `${accuracyRate}%`, icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', href: null },
            { label: 'Mistakes', value: incorrectCount.toString(), icon: AlertCircle, color: 'text-red-600 bg-red-50 border-red-100', href: '/dashboard/incorrect' },
            { label: 'Time Spent', value: '—', icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-100', href: null },
            { label: 'Bookmarked', value: bookmarkedCount.toString(), icon: BookMarked, color: 'text-purple-600 bg-purple-50 border-purple-100', href: '/dashboard/bookmarks' },
          ].map(({ label, value, icon: Icon, color, href }) => {
            const CardWrapper = href ? Link : 'div';
            return (
              // @ts-ignore (dynamic component typing)
              <CardWrapper key={label} href={href || undefined} className={`bg-white/80 backdrop-blur-xl rounded-3xl border border-stone-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] hover:border-primary/20 cursor-pointer`}>
                <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-br from-primary-surface to-white opacity-50 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${color}`}>
                  <Icon size={20} strokeWidth={2.5} />
                </div>
                <div className="text-3xl font-black text-stone-900 tracking-tight">{value}</div>
                <div className="text-sm text-stone-500 font-semibold mt-1">{label}</div>
              </CardWrapper>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-accent" /> Quick Actions
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {quickActions.map(({ label, href, icon: Icon, color, desc }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-4 p-5 rounded-3xl ${color} shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon size={24} className="shrink-0 relative z-10" />
                <div className="flex-1 min-w-0 relative z-10">
                  <div className="font-bold text-base">{label}</div>
                  <div className="text-sm opacity-80 mt-0.5">{desc}</div>
                </div>
                <ChevronRight size={18} className="shrink-0 opacity-60 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity & Test History */}
        {session && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-stone-900">Recent Test Activity</h2>
              <Link
                href="/dashboard/incorrect"
                className="text-xs font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
              >
                Open Mistake Tracker <ChevronRight size={14} />
              </Link>
            </div>

            {recentSessions.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-stone-200/60 p-8 text-center shadow-sm">
                <Clock size={36} className="mx-auto text-stone-300 mb-2" />
                <p className="text-sm font-bold text-stone-700">No test attempts yet</p>
                <p className="text-xs text-stone-400 mt-1">Start practicing PYQs or Syllabus units to see your score history and mistakes logged here.</p>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden divide-y divide-stone-100">
                {recentSessions.map((rs) => {
                  const filters = (rs.filters as any) || {};
                  const dateObj = rs.completed_at ?? rs.started_at;
                  const displayTitle =
                    filters.paperTitle ||
                    filters.titleEnglish ||
                    (filters.year ? `Year ${filters.year} Paper` : `${rs.mode.replace('_', ' ').toUpperCase()} Practice`);
                  const accuracy = rs.total_questions > 0 ? Math.round((rs.correct_count / rs.total_questions) * 100) : 0;

                  return (
                    <div key={rs.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/80 transition-colors">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                            accuracy >= 70
                              ? 'bg-emerald-100 text-emerald-800'
                              : accuracy >= 40
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {accuracy}%
                        </div>
                        <div>
                          <div className="font-extrabold text-stone-900 text-sm">{displayTitle}</div>
                          <div className="text-xs text-stone-500 font-medium flex items-center gap-2 mt-0.5">
                            <span>{rs.total_questions} Questions</span>
                            <span>•</span>
                            <span>{formatRelativeDate(dateObj)}</span>
                            {rs.incorrect_count > 0 && (
                              <>
                                <span>•</span>
                                <span className="text-rose-600 font-bold">{rs.incorrect_count} Mistakes</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {rs.incorrect_count > 0 && (
                          <Link
                            href="/dashboard/incorrect"
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors"
                          >
                            Review {rs.incorrect_count} Mistakes
                          </Link>
                        )}
                        <div className="text-right pl-2 hidden sm:block">
                          <div className="font-black text-stone-900 text-sm">{rs.score} pts</div>
                          <div className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Score</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Sign In Prompt */}
        {!session && (
          <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 backdrop-blur-md z-10">
              <AlertCircle size={32} className="text-accent" />
            </div>
            <div className="flex-1 text-center md:text-left z-10">
              <h3 className="font-bold text-white text-xl">Unlock Your Full Potential</h3>
              <p className="text-stone-300 text-sm mt-2 max-w-xl">
                Create a free account to permanently save your test attempts, track your accuracy across different units, and review your bookmarked questions anytime.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 z-10 w-full md:w-auto">
              <Link href="/signup" className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-lg text-center">
                Create Free Account
              </Link>
              <Link href="/login" className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-center">
                Log In
              </Link>
            </div>
          </div>
        )}

        {session && (
          <div className="mt-12 pt-10 border-t border-stone-200">
            <details>
              <summary className="text-sm font-semibold text-stone-500 cursor-pointer hover:text-stone-700">Account Settings ›</summary>
              <div className="mt-4">
                <h2 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h2>
                <p className="text-stone-500 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
                <DeleteAccountButton />
              </div>
            </details>
          </div>
        )}

      </div>
    </div>
  );
}

