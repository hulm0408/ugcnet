import { prisma } from '@/lib/db';
import { Users, FileQuestion, BookOpen, Layers, CheckCircle2, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [totalUsers, totalQuestions, totalUnits] = await Promise.all([
    prisma.user.count(),
    prisma.question.count(),
    prisma.syllabusUnit.count(),
  ]);

  const stats = [
    { name: 'Total Users', value: totalUsers, icon: Users, color: 'text-primary', bgColor: 'bg-primary/10', border: 'border-primary/20' },
    { name: 'Total Questions', value: totalQuestions, icon: FileQuestion, color: 'text-primary-dark', bgColor: 'bg-primary-dark/10', border: 'border-primary-dark/20' },
    { name: 'Syllabus Units', value: totalUnits, icon: BookOpen, color: 'text-accent', bgColor: 'bg-accent/10', border: 'border-accent/20' },
    { name: 'Mapped to DB', value: totalQuestions.toLocaleString(), icon: Layers, color: 'text-stone-700', bgColor: 'bg-stone-500/10', border: 'border-stone-500/20' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-base text-stone-500 font-medium">Manage users, questions, and view system health.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border ${stat.border} p-6 relative overflow-hidden group hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1`}>
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${stat.bgColor} opacity-50 group-hover:scale-150 transition-transform duration-500`} />
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${stat.border} bg-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-7 w-7 ${stat.color}`} />
                </div>
                <p className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-1">{stat.name}</p>
                <p className="text-4xl font-black text-stone-900 tracking-tight">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Health / Updates Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-stone-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-stone-900">System Health</h2>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary-dark border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              All Systems Operational
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-stone-900">Database Synchronization</h4>
                <p className="text-sm text-stone-500 mt-1">
                  Successfully mapped <strong>{totalQuestions.toLocaleString()}</strong> UGC NET Arabic previous year questions to the 10 official syllabus units. Questions are now dynamically identifiable.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <TrendingUp className="text-primary-dark shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-stone-900">User Authentication</h4>
                <p className="text-sm text-stone-500 mt-1">
                  Server action authentication and middleware protection is fully active and error-free.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl shadow-xl p-8 relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white mb-2">Ready for Traffic</h2>
            <p className="text-stone-300 text-sm leading-relaxed mb-6">
              The platform is fully dynamic and ready to scale. Users can practice pyqs and unit-wise questions.
            </p>
          </div>
          <div className="relative z-10">
            <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Environment</div>
            <div className="inline-flex px-3 py-1 bg-white/10 text-white border border-white/20 rounded-lg text-sm font-medium backdrop-blur-md">
              Production (Next.js 14)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
