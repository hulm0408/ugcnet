'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, LayoutDashboard, BookMarked, Menu, X, GraduationCap, User, Search, LogOut, Sparkles } from 'lucide-react';
import { signOut } from 'next-auth/react';
import ProfileSidePanel from '@/components/layout/ProfileSidePanel';
import SubjectSwitcher from '@/components/layout/SubjectSwitcher';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/pyq', label: 'PYQs', icon: BookMarked },
  { href: '/syllabus', label: 'Syllabus', icon: GraduationCap },
  { href: '/studio', label: 'AI Studio', icon: Sparkles },
  { href: '/memories', label: 'Memories', icon: LayoutDashboard },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export default function Header({ user }: { user: { name?: string | null, email?: string | null, role?: string | null } | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Do not show global header on full-screen test/practice/instructions pages
  if (
    pathname.startsWith('/practice') ||
    pathname.startsWith('/instructions')
  ) {
    return null;
  }
  
  return (
    <>
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200/60 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-300">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">

          {/* Brand & Active Subject Switcher */}
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 bg-gradient-to-tr from-primary-dark to-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 group-hover:shadow-primary/30 transition-all duration-300">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div className="hidden lg:flex flex-col leading-none">
                <span className="text-stone-900 font-black text-[15px] tracking-tight">UGC NET/JRF</span>
                <span className="text-stone-400 text-[9px] font-bold tracking-widest uppercase mt-0.5">Platform</span>
              </div>
            </Link>

            {/* 1-Click Subject Switcher */}
            <SubjectSwitcher />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || (pathname.startsWith(href + '/') && href !== '/');
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-[14px] font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-stone-900 border-b-2 border-primary pb-1'
                      : 'text-stone-500 hover:text-stone-900 hover:border-b-2 hover:border-stone-300 pb-1'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            {user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' ? (
              <Link href="/admin" className={`text-[14px] font-semibold transition-all duration-200 ${pathname.startsWith('/admin') ? 'text-stone-900 border-b-2 border-primary pb-1' : 'text-primary hover:text-primary-dark hover:border-b-2 hover:border-primary/40 pb-1'}`}>Admin</Link>
            ) : null}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {/* Icons */}
            <div className="hidden sm:flex items-center gap-4 text-stone-500">
              <Link href="/search" className="hover:text-stone-900 transition-colors">
                <Search size={18} strokeWidth={2.5} />
              </Link>
            </div>

            {user ? (
              <div className="hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 bg-stone-50/80 backdrop-blur-md border border-stone-200 px-3 py-1.5 rounded-full shadow-inner hover:bg-stone-100 transition-colors"
                >
                  <div className="w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm select-none">
                    {user.name?.trim().charAt(0).toUpperCase() || <User size={14} />}
                  </div>
                  <span className="text-sm font-bold text-stone-700 pr-1">{user.name?.split(' ')[0] || 'User'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-bold text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all duration-200"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-5 py-2 text-sm font-bold text-white hover:text-white bg-[#107A53] hover:bg-[#0C6240] rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl absolute w-full shadow-2xl animate-fade-in">
          <nav className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/') && href !== '/';
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
                  {label}
                </Link>
              );
            })}
            {user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' ? (
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  pathname.startsWith('/admin')
                    ? 'bg-primary text-white shadow-md'
                    : 'text-primary hover:bg-primary/10 hover:text-primary-dark'
                }`}
              >
                Admin
              </Link>
            ) : null}
            
            <div className="border-t border-slate-100 my-2 pt-4 flex flex-col gap-3">
              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{user.name || 'User'}</div>
                      <div className="text-xs font-medium text-slate-500">{user.email}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      setMobileOpen(false);
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
                    className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-3 text-base font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 hover:text-stone-900 rounded-xl transition-all duration-200"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-3 text-base font-bold text-white hover:text-white bg-[#107A53] hover:bg-[#0C6240] rounded-xl transition-all duration-200 shadow-md active:scale-95"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
    {user && (
      <ProfileSidePanel user={user} isOpen={userMenuOpen} onClose={() => setUserMenuOpen(false)} />
    )}
    </>
  );
}
