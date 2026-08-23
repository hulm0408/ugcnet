import Link from 'next/link';
import { LayoutDashboard, FileQuestion, Users, Settings, BookOpen } from 'lucide-react';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 flex-shrink-0 hidden md:flex md:flex-col shadow-2xl relative z-20">
        <div className="h-20 flex items-center px-8 border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20" />
          <span className="text-2xl font-black text-white relative tracking-tight flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg">A</span>
            Admin Panel
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-4">
            <li>
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 rounded-xl hover:bg-white/10 hover:text-white font-medium transition-all group">
                <LayoutDashboard className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/questions" className="flex items-center gap-3 px-4 py-3 text-slate-300 rounded-xl hover:bg-white/10 hover:text-white font-medium transition-all group">
                <FileQuestion className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                Questions (3,149)
              </Link>
            </li>
            <li>
              <Link href="/admin/syllabus" className="flex items-center gap-3 px-4 py-3 text-slate-300 rounded-xl hover:bg-white/10 hover:text-white font-medium transition-all group">
                <BookOpen className="h-5 w-5 text-amber-400 group-hover:text-amber-300 transition-colors" />
                Syllabus
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-slate-300 rounded-xl hover:bg-white/10 hover:text-white font-medium transition-all group opacity-50 cursor-not-allowed">
                <Users className="h-5 w-5 text-purple-400" />
                Users (Coming Soon)
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex-1" />
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
            <form action={async () => {
              'use server';
              const { signOut } = await import('@/lib/auth');
              await signOut({ redirectTo: '/login' });
            }}>
              <button type="submit" className="text-sm font-bold px-4 py-2 bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors">
                Log Out
              </button>
            </form>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none -z-10" />
          {children}
        </main>
      </div>
    </div>
  );
}
