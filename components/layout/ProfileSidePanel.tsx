'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X, LayoutDashboard, BookMarked, XCircle,
  LogOut, Shield, ChevronRight, BookOpen,
  Settings, Trophy
} from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';

interface ProfileSidePanelProps {
  user: { name?: string | null; email?: string | null; role?: string | null; image?: string | null } | null;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Your progress overview' },
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
      {/* Backdrop — full screen dark overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — slides in from right, full viewport height */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Account panel"
        className={`fixed top-0 right-0 h-screen w-[320px] z-[70] flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ── TOP: User Identity ── */}
        <div className="bg-gradient-to-br from-[#0C6240] to-[#107A53] px-6 pt-8 pb-6 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center text-2xl font-black select-none border border-white/30 shadow-inner mb-4">
            {initial}
          </div>

          {/* Name + email */}
          <h2 className="text-white font-bold text-lg leading-tight">
            {user?.name || 'User'}
          </h2>
          <p className="text-white/70 text-sm mt-0.5 truncate">
            {user?.email}
          </p>

          {/* Role badge */}
          {isAdmin && (
            <span className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 bg-white/20 border border-white/30 rounded-full text-white text-xs font-bold">
              <Shield size={11} />
              Admin
            </span>
          )}
        </div>

        {/* ── MIDDLE: Navigation ── */}
        <div className="flex-1 overflow-y-auto py-4 px-3">

          <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest px-3 mb-2">
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
                      ? 'bg-primary/8 text-primary'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-primary/15 text-primary' : 'bg-stone-100 text-stone-500 group-hover:bg-stone-200'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm font-semibold leading-tight ${isActive ? 'text-primary' : 'text-stone-800'}`}>
                      {label}
                    </div>
                    <div className="text-xs text-stone-400 mt-0.5">{desc}</div>
                  </div>
                  <ChevronRight size={14} className="ml-auto text-stone-300 group-hover:text-stone-400 shrink-0" />
                </Link>
              );
            })}
          </nav>

          {/* Admin section */}
          {isAdmin && (
            <>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest px-3 mb-2">
                Admin
              </p>
              <nav className="flex flex-col gap-0.5 mb-6">
                <Link
                  href="/admin"
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                    pathname.startsWith('/admin') ? 'bg-primary/8 text-primary' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    pathname.startsWith('/admin') ? 'bg-primary/15 text-primary' : 'bg-stone-100 text-stone-500 group-hover:bg-stone-200'
                  }`}>
                    <Shield size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-stone-800 leading-tight">Admin Panel</div>
                    <div className="text-xs text-stone-400 mt-0.5">Manage questions & users</div>
                  </div>
                  <ChevronRight size={14} className="ml-auto text-stone-300 group-hover:text-stone-400 shrink-0" />
                </Link>
              </nav>
            </>
          )}

          {/* Stats summary strip */}
          <div className="mx-1 rounded-2xl bg-stone-50 border border-stone-100 px-4 py-3">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-2">
              Quick Stats
            </p>
            <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
              <Trophy size={14} />
              View full progress on Dashboard
            </Link>
          </div>
        </div>

        {/* ── BOTTOM: Account actions ── */}
        <div className="border-t border-stone-100 px-3 py-4 flex flex-col gap-1">
          <Link
            href="/dashboard#account-settings"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-600 hover:bg-stone-50 transition-colors text-sm font-medium"
          >
            <Settings size={16} className="text-stone-400" />
            Account Settings
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-sm font-semibold"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
