'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileQuestion,
  Archive,
  Layers,
  Users,
  Brain,
  BarChart3,
  Settings,
  ArrowLeft,
  Shield,
  Sparkles,
} from 'lucide-react';

const ADMIN_ROUTES = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/questions', label: 'Questions Bank', icon: FileQuestion },
  { href: '/admin/pyqs', label: 'PYQs & Papers', icon: Archive },
  { href: '/admin/syllabus', label: 'Syllabus Graph', icon: Layers },
  { href: '/admin/users', label: 'User Directory', icon: Users },
  { href: '/admin/memories', label: 'Memory / Reviews', icon: Brain },
  { href: '/admin/analytics', label: 'Analytics & Insights', icon: BarChart3 },
  { href: '/admin/settings', label: 'System Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-stone-900 border-r border-stone-800 text-stone-300 flex flex-col min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-stone-950 flex items-center justify-center font-bold text-sm shadow-md">
            <Shield size={16} />
          </div>
          <div>
            <div className="font-bold text-white text-sm tracking-tight">Admin System</div>
            <div className="text-[10px] text-stone-400 font-mono">UGC NET Practice</div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-1.5 flex-1">
        <div className="px-3 py-2 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest">
          Management
        </div>

        {ADMIN_ROUTES.map((route) => {
          const Icon = route.icon;
          const isActive = route.exact
            ? pathname === route.href
            : pathname.startsWith(route.href);

          return (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-xs'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-emerald-400' : 'text-stone-500'} />
              <span>{route.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Return to Student Portal Footer */}
      <div className="p-4 border-t border-stone-800">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-bold transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Exit to Student Site</span>
        </Link>
      </div>
    </aside>
  );
}
