'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, LayoutDashboard, BookMarked, Menu, X, GraduationCap, User, Search, LogOut } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/pyq', label: 'PYQs', icon: BookMarked },
  { href: '/syllabus', label: 'Syllabus', icon: GraduationCap },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export default function Header({ user }: { user: { name?: string | null, email?: string | null } | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Do not show header on Home page if we want a different one, but usually it's global.
  // Actually, the mockup shows the header on the home page too with the same style but transparent maybe? No, the home page in the mockup has a white rounded pill navbar. Wait, the user said "HOME PAGE CHOR KAR ISKI STYLES KO COPY KARO".
  // Let's check if we are on home page to use a different style, or just keep it global white. The home page currently uses this header and it looks fine.
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200/80 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-300">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 bg-[#107A53] rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-all">
              <span className="text-white font-bold text-lg font-arabic">ع</span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-stone-900 font-extrabold text-[15px] tracking-tight transition-colors">Arabic NET/JRF</span>
              <span className="text-stone-500 text-[10px] font-bold tracking-[0.15em] uppercase mt-1">PYQ Platform</span>
            </div>
          </Link>

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
                      ? 'text-stone-900 border-b-2 border-[#107A53] pb-1'
                      : 'text-stone-500 hover:text-stone-900 hover:border-b-2 hover:border-stone-300 pb-1'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
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
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-full shadow-inner hover:bg-stone-100 transition-colors"
                >
                  <div className="w-7 h-7 bg-[#107A53]/10 text-[#107A53] rounded-full flex items-center justify-center">
                    <User size={14} />
                  </div>
                  <span className="text-sm font-bold text-stone-700 pr-1">{user.name?.split(' ')[0] || 'User'}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-stone-200 rounded-2xl shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-semibold text-stone-900 truncate">{user.name || 'User'}</p>
                      <p className="text-xs text-stone-500 truncate">{user.email}</p>
                    </div>
                    <form action={logoutAction}>
                      <button type="submit" className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut size={15} />
                        Log out
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center text-sm font-bold text-stone-700 hover:text-stone-900 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-5 py-2 text-sm font-bold text-white bg-[#107A53] hover:bg-[#0C6240] rounded-full transition-all shadow-sm"
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
                  <form action={logoutAction}>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
                      <LogOut size={16} />
                      Log out
                    </button>
                  </form>
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
