import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Target, Clock, TrendingUp, BookMarked, AlertCircle, ChevronRight, LogOut, Sparkles } from 'lucide-react';
import { auth, signOut } from '@/lib/auth';

import prisma from '@/lib/db';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your Arabic NET/JRF practice dashboard — track progress, accuracy, and weak topics.',
};

const quickActions = [
  { label: 'Continue Practice', href: '/practice', icon: BookOpen, color: 'bg-slate-900 text-white hover:bg-slate-800', desc: 'Pick up where you left off' },
  { label: 'PYQ Year-wise', href: '/pyq', icon: BookMarked, color: 'bg-emerald-600 text-white hover:bg-emerald-500', desc: 'Browse past exam papers' },
  { label: 'Syllabus Units', href: '/syllabus', icon: Target, color: 'bg-blue-600 text-white hover:bg-blue-500', desc: 'Practice unit by unit' },
];

export default async function DashboardPage() {
  const session = await auth();
  
  let questionsAttempted = 0;
  let accuracyRate = 0;
  let bookmarkedCount = 0;

  if (session?.user?.id) {
    const stats = await prisma.practiceSession.aggregate({
      where: { user_id: session.user.id },
      _sum: {
        total_questions: true,
        correct_count: true,
      },
    });

    questionsAttempted = stats._sum.total_questions || 0;
    const correct = stats._sum.correct_count || 0;
    accuracyRate = questionsAttempted > 0 ? Math.round((correct / questionsAttempted) * 100) : 0;

    bookmarkedCount = await prisma.bookmark.count({
      where: { user_id: session.user.id },
    });
  }

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {session?.user?.name ? `Welcome back, ${session.user.name}` : 'My Dashboard'}
            </h1>
            <p className="text-slate-500 text-base mt-2">Track your NET/JRF Arabic preparation progress</p>
          </div>
          {session && (
            <form action={async () => {
              'use server';
              await signOut();
            }}>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 shadow-sm hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-xl transition-all"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </form>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            { label: 'Questions Attempted', value: questionsAttempted.toString(), icon: Target, color: 'text-blue-600 bg-blue-50 border-blue-100' },
            { label: 'Accuracy Rate', value: `${accuracyRate}%`, icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
            { label: 'Time Spent', value: '0h', icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-100' },
            { label: 'Bookmarked', value: bookmarkedCount.toString(), icon: BookMarked, color: 'text-purple-600 bg-purple-50 border-purple-100' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-slate-50 opacity-50 group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${color}`}>
                <Icon size={24} />
              </div>
              <div className="text-3xl font-black text-slate-900">{value}</div>
              <div className="text-sm text-slate-500 font-medium mt-1 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-emerald-500" />
            <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {quickActions.map(({ label, href, icon: Icon, color, desc }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-4 p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all group ${color}`}
              >
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <Icon size={24} className="shrink-0" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-base">{label}</div>
                  <div className="text-xs opacity-90 mt-1 font-medium">{desc}</div>
                </div>
                <ChevronRight size={20} className="shrink-0 opacity-60 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Sign In Prompt */}
        {!session && (
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 backdrop-blur-md z-10">
              <AlertCircle size={32} className="text-emerald-400" />
            </div>
            <div className="flex-1 text-center md:text-left z-10">
              <h3 className="font-bold text-white text-xl">Unlock Your Full Potential</h3>
              <p className="text-slate-300 text-sm mt-2 max-w-xl">
                Create a free account to permanently save your test attempts, track your accuracy across different units, and review your bookmarked questions anytime.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 z-10 w-full md:w-auto">
              <Link href="/signup" className="px-6 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors shadow-lg text-center">
                Create Free Account
              </Link>
              <Link href="/login" className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-center">
                Log In
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
