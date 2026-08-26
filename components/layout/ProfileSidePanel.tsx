'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X, LayoutDashboard, BookMarked, XCircle,
  LogOut, Shield, ChevronRight, BookOpen,
  Settings, Trophy, Sparkles
} from 'lucide-react';
import { signOut } from 'next-auth/react';

interface ProfileSidePanelProps {
  user: { name?: string | null; email?: string | null; role?: string | null; image?: string | null } | null;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '/studio', label: 'AI Visual Studio', icon: Sparkles, desc: 'Bespoke maps & learning plates' },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Your progress overview' },
  { href: '/memories', label: 'My Memories', icon: Trophy, desc: 'Tricks, mnemonics & graph' },
  { href: '/memories/review', label: 'Review Due', icon: BookMarked, desc: 'Spaced repetition recall' },
  { href: '/practice', label: 'Practice Now', icon: BookOpen, desc: 'Continue studying' },
  { href: '/dashboard/bookmarks', label: 'Bookmarks', icon: BookMarked, desc: 'Saved questions' },
  { href: '/dashboard/incorrect', label: 'Incorrect', icon: XCircle, desc: 'Review mistakes' },
];

export default function ProfileSidePanel({ user, isOpen, onClose }: ProfileSidePanelProps) {
  const pathname = usePathname();
  const initial = user?.name?.trim().charAt(0).toUpperCase() || 'U';
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

  return (
    <>
      {/* Backdrop — glassmorphism blur over the page body */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto bg-black/30 backdrop-blur-md'
            : 'opacity-0 pointer-events-none backdrop-blur-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — fixed to top-0 right-0, full viewport height, above backdrop */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Account panel"
        className={`fixed top-0 right-0 h-screen w-[320px] z-[70] flex flex-col bg-white border-l border-stone-200 text-stone-900 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ── TOP: User Identity ── */}
        <div className="bg-emerald-50 px-6 pt-8 pb-6 relative border-b border-stone-100">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white flex items-center justify-center text-2xl font-black select-none shadow-sm mb-4">
            {initial}
          </div>

          {/* Name + email */}
          <h2 className="text-stone-900 font-bold text-lg leading-tight">
            {user?.name || 'User'}
          </h2>
          <p className="text-stone-600 text-sm mt-0.5 truncate">
            {user?.email}
          </p>

          {/* Role badge */}
          {isAdmin && (
            <span className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-900 text-xs font-bold">
              <Shield size={11} />
              Admin
            </span>
          )}
        </div>

        {/* ── MIDDLE: Navigation ── */}
        <div className="flex-1 overflow-y-auto py-4 px-3">

          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest px-3 mb-2">
            My Learning
          </p>

          <nav className="flex flex-col gap-0.5 mb-6">
            {navItems.map(({ href, label, icon: Icon, desc }) => {
              const isActive = pathname === href || (pathname.startsWith(href + '/') && href !== '/');
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-800 font-bold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100 font-medium'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-emerald-200 text-emerald-900' : 'bg-stone-100 text-stone-500 group-hover:bg-stone-200'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm leading-tight ${isActive ? 'font-bold text-emerald-900' : 'font-semibold text-stone-800 group-hover:text-stone-900'}`}>
                      {label}
                    </div>
                    <div className={`text-xs mt-0.5 ${isActive ? 'text-emerald-700' : 'text-stone-500'}`}>{desc}</div>
                  </div>
                  <ChevronRight size={14} className={`ml-auto shrink-0 ${isActive ? 'text-emerald-700' : 'text-stone-400 group-hover:text-stone-600'}`} />
                </Link>
              );
            })}
          </nav>

          {/* Admin section */}
          {isAdmin && (
            <>
              <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest px-3 mb-2">
                Admin
              </p>
              <nav className="flex flex-col gap-0.5 mb-6">
                <Link
                  href="/admin"
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                    pathname.startsWith('/admin') ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100 font-medium'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    pathname.startsWith('/admin') ? 'bg-emerald-200 text-emerald-900' : 'bg-stone-100 text-stone-500 group-hover:bg-stone-200'
                  }`}>
                    <Shield size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm leading-tight ${pathname.startsWith('/admin') ? 'font-bold text-emerald-900' : 'font-semibold text-stone-800 group-hover:text-stone-900'}`}>Admin Panel</div>
                    <div className={`text-xs mt-0.5 ${pathname.startsWith('/admin') ? 'text-emerald-700' : 'text-stone-500'}`}>Manage questions & users</div>
                  </div>
                  <ChevronRight size={14} className={`ml-auto shrink-0 ${pathname.startsWith('/admin') ? 'text-emerald-700' : 'text-stone-400 group-hover:text-stone-600'}`} />
                </Link>
              </nav>
            </>
          )}

          {/* Stats summary strip */}
          <div className="mx-1 rounded-2xl bg-stone-50 border border-stone-200 px-4 py-3">
            <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-2">
              Quick Stats
            </p>
            <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2 text-sm text-emerald-700 font-semibold hover:underline">
              <Trophy size={14} />
              View full progress on Dashboard
            </Link>
          </div>
        </div>

        {/* ── BOTTOM: Account actions ── */}
        <div className="border-t border-stone-200 px-3 py-4 flex flex-col gap-1">
          <Link
            href="/dashboard#account-settings"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors text-sm font-medium"
          >
            <Settings size={16} className="text-stone-500" />
            Account Settings
          </Link>

          <button
            type="button"
            onClick={async () => {
              onClose();
              try {
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('auth_logout_success', '1');
                }
                await signOut({ callbackUrl: '/' });
              } catch (e) {
                console.error('Logout error:', e);
                if (typeof window !== 'undefined') {
                  sessionStorage.removeItem('auth_logout_success');
                }
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-sm font-semibold text-left"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
