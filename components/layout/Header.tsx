'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, BookMarked, Menu, X, GraduationCap, User, Search } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/pyq', label: 'PYQs', icon: BookMarked },
  { href: '/syllabus', label: 'Syllabus', icon: GraduationCap },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export default function Header({ user }: { user: { name?: string | null, email?: string | null } | null }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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
              <button className="hover:text-stone-900 transition-colors">
                <Search size={18} strokeWidth={2.5} />
              </button>
              <button className="hover:text-stone-900 transition-colors relative">
                <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              </button>
            </div>

            {user ? (
              <div className="hidden sm:flex items-center gap-3 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-full shadow-inner">
                <div className="w-7 h-7 bg-[#107A53]/10 text-[#107A53] rounded-full flex items-center justify-center">
                  <User size={14} />
                </div>
                <span className="text-sm font-bold text-stone-700 pr-1">{user.name?.split(' ')[0] || 'User'}</span>
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
