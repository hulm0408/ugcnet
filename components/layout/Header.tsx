'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  Bell,
  BookOpen,
  Brain,
  Layers,
  GraduationCap,
  Play,
} from 'lucide-react';
import ProfileSidePanel from '@/components/layout/ProfileSidePanel';
import SubjectSwitcher from '@/components/layout/SubjectSwitcher';
import AuthModal from '@/components/layout/AuthModal';

const navLinks = [
  { href: '/pyq', label: 'PYQ', icon: BookOpen },
  { href: '/mocks', label: 'Mock', icon: Play },
  { href: '/memories', label: 'Memory', icon: Brain },
  { href: '/dashboard', label: 'Dashboard', icon: Layers },
  { href: '/syllabus', label: 'Syllabus', icon: GraduationCap },
];

export default function Header({
  user,
}: {
  user: { name?: string | null; email?: string | null; role?: string | null } | null;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Do not show global header on full-screen test/practice/instructions pages
  if (pathname.startsWith('/practice') || pathname.startsWith('/instructions')) {
    return null;
  }

  const userName = user?.name || 'Ahmad Khan';

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 font-sans text-slate-900 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Brand & Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-emerald-700 transition-colors">
                  ع
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-slate-900 font-bold text-sm tracking-tight group-hover:text-emerald-700 transition-colors">
                    Arabic NET JRF
                  </span>
                  <span className="text-slate-500 text-[10px] font-medium tracking-wide">
                    UGC NET Preparation
                  </span>
                </div>
              </Link>

              <SubjectSwitcher />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
              {navLinks.map(({ href, label }) => {
                const isActive =
                  pathname === href || (pathname.startsWith(href + '/') && href !== '/');
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`transition-all px-3.5 py-2 rounded-xl flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span>{label}</span>
                  </Link>
                );
              })}

              {user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' ? (
                <Link
                  href="/admin"
                  className={`px-3 py-1.5 rounded-xl font-bold ${
                    pathname.startsWith('/admin')
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Admin
                </Link>
              ) : null}
            </nav>

            {/* Right Action Icons & User Info */}
            <div className="flex items-center gap-2.5">
              <Link
                href="/search"
                className="h-9 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors text-xs font-medium"
                aria-label="Search"
              >
                <Search size={14} className="text-slate-500" />
                <span className="hidden sm:inline text-slate-500">Search...</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-500 border border-slate-200 rounded shadow-2xs">
                  /
                </kbd>
              </Link>

              {/* Notification bell */}
              <Link
                href="/dashboard"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors relative"
                aria-label="Notifications"
              >
                <Bell size={15} />
                <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-2 right-2 ring-2 ring-white" />
              </Link>

              {/* Profile Avatar / Trigger */}
              {user ? (
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    {userName.charAt(0)}
                  </div>
                  <div className="hidden sm:flex flex-col text-left leading-tight">
                    <span className="text-xs font-bold text-slate-900 max-w-[110px] truncate">
                      {userName}
                    </span>
                    <span className="text-[10px] text-slate-500">Aspirant</span>
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Sign In
                </button>
              )}

              {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 text-slate-900 shadow-lg">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold ${
                  pathname === href || pathname.startsWith(href + '/')
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon size={16} className="text-slate-500" />
                <span>{label}</span>
              </Link>
            ))}
            {!user && (
              <div className="pt-3 border-t border-slate-200 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl cursor-pointer shadow-xs"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Profile Side Drawer */}
      <ProfileSidePanel
        user={user}
        isOpen={userMenuOpen}
        onClose={() => setUserMenuOpen(false)}
      />

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        callbackUrl={pathname}
      />
    </>
  );
}
