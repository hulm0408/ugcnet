'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, BookMarked, Menu, X, GraduationCap, User } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/pyq', label: 'PYQs', icon: BookMarked },
  { href: '/syllabus', label: 'Syllabus', icon: GraduationCap },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export default function Header({ user }: { user: { name?: string | null, email?: string | null } | null }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
              <span className="text-white font-bold text-lg font-arabic shadow-sm">ع</span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-slate-900 font-extrabold text-[16px] tracking-tight group-hover:text-emerald-600 transition-colors">Arabic NET/JRF</span>
              <span className="text-slate-500 text-[11px] font-semibold tracking-wider uppercase mt-0.5">PYQ Platform</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/') && href !== '/';
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden sm:flex items-center gap-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full shadow-inner">
                <div className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                  <User size={14} />
                </div>
                <span className="text-sm font-bold text-slate-700 pr-1">{user.name?.split(' ')[0] || 'User'}</span>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
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
            
            <div className="border-t border-slate-100 my-2 pt-4 flex flex-col gap-3">
              {user ? (
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200">
                   <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{user.name || 'User'}</div>
                    <div className="text-xs font-medium text-slate-500">{user.email}</div>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-3 text-base font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-3 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-md"
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
  );
}
