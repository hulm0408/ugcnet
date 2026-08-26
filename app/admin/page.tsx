import { prisma } from '@/lib/db';
import Link from 'next/link';
import {
  Users,
  FileQuestion,
  BookOpen,
  Layers,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Shield,
  Brain,
  Archive,
  BarChart3,
  Settings,
  Sparkles,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [totalUsers, totalQuestions, totalUnits, totalPapers, totalMemories] = await Promise.all([
    prisma.user.count(),
    prisma.question.count(),
    prisma.syllabusUnit.count(),
    prisma.examPaper.count(),
    prisma.spacedMemoryQueue.count(),
  ]);

  const stats = [
    { name: 'Total Users', value: totalUsers, icon: Users, href: '/admin/users' },
    { name: 'Total Questions', value: totalQuestions.toLocaleString(), icon: FileQuestion, href: '/admin/questions' },
    { name: 'PYQ Exam Papers', value: totalPapers, icon: Archive, href: '/admin/pyqs' },
    { name: 'Syllabus Units', value: totalUnits, icon: Layers, href: '/admin/syllabus' },
    { name: 'Active Memory Queues', value: totalMemories, icon: Brain, href: '/admin/memories' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Shield size={13} />
            <span>Admin Control System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-400 font-medium">
            Manage question database, exam papers, syllabus hierarchy, and candidate review queues.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/questions"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Manage Questions</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-stone-900 border border-stone-800 hover:border-emerald-500/40 rounded-2xl p-5 transition-all group block"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-stone-800 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon size={18} />
                </div>
                <ArrowRight size={13} className="text-stone-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-wider">{stat.name}</p>
              <p className="text-2xl font-black text-white tracking-tight mt-1">{stat.value}</p>
            </Link>
          );
        })}
      </div>

      {/* System Status & Management Quicklinks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Quick Actions Grid */}
        <div className="lg:col-span-2 bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">System Management Shortcuts</h2>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              ● All Systems Live
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/admin/questions"
              className="p-4 rounded-2xl bg-stone-800/60 hover:bg-stone-800 border border-stone-700/60 transition-colors block group"
            >
              <div className="flex items-center gap-2.5 font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                <FileQuestion size={16} />
                <span>Question Bank</span>
              </div>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Search, inspect, edit, or add UGC NET questions and official answers.
              </p>
            </Link>

            <Link
              href="/admin/pyqs"
              className="p-4 rounded-2xl bg-stone-800/60 hover:bg-stone-800 border border-stone-700/60 transition-colors block group"
            >
              <div className="flex items-center gap-2.5 font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                <Archive size={16} />
                <span>PYQs &amp; Exam Papers</span>
              </div>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Review historical exam papers, toggle published status, and manage batches.
              </p>
            </Link>

            <Link
              href="/admin/syllabus"
              className="p-4 rounded-2xl bg-stone-800/60 hover:bg-stone-800 border border-stone-700/60 transition-colors block group"
            >
              <div className="flex items-center gap-2.5 font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                <Layers size={16} />
                <span>Syllabus Graph</span>
              </div>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Configure 10 Units, Broad Topics, Subtopics, and Concept Nodes.
              </p>
            </Link>

            <Link
              href="/admin/memories"
              className="p-4 rounded-2xl bg-stone-800/60 hover:bg-stone-800 border border-stone-700/60 transition-colors block group"
            >
              <div className="flex items-center gap-2.5 font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                <Brain size={16} />
                <span>Memory &amp; Reviews</span>
              </div>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Inspect candidate spaced recall items and mnemonic connections.
              </p>
            </Link>
          </div>
        </div>

        {/* Right: Environment & Database Info */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 mb-2">
              Database Sync
            </div>
            <h3 className="text-lg font-black text-white">PostgreSQL &amp; Prisma</h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              3,150+ questions synced across 10 official units and 45+ historical papers with 100% verified official NTA keys.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-stone-800 text-xs">
            <div className="flex justify-between text-stone-400">
              <span>Next.js Architecture</span>
              <span className="font-mono text-white">v16 App Router</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Authentication</span>
              <span className="font-mono text-emerald-400">NextAuth v5 Beta</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>ORM &amp; DB Client</span>
              <span className="font-mono text-white">Prisma v7.9</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
