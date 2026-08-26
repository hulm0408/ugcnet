'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  User,
  Search,
  Lock,
  Menu,
  X,
} from 'lucide-react';
import ProfileSidePanel from '@/components/layout/ProfileSidePanel';
import SubjectSwitcher from '@/components/layout/SubjectSwitcher';
import AuthPreviewModal from '@/components/layout/AuthPreviewModal';
import AuthModal from '@/components/layout/AuthModal';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/pyq', label: 'PYQs' },
  { href: '/syllabus', label: 'Syllabus' },
  { href: '/mocks', label: 'Mock Tests' },
  { href: '/practice', label: 'Practice Sets' },
  { href: '/memories', label: '5 Level Memory' },
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
      <header className="sticky top-0 z-50 bg-[#041A12] border-b border-[#134E3A] font-sans text-white transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Brand & Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 bg-[#00E699] text-[#03140E] rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">
                  ع
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-bold text-sm tracking-tight">
                    Arabic NET/JRF
                  </span>
                  <span className="text-[#8EBDAE] text-[10px] font-mono tracking-wider">
                    PYQ Platform
                  </span>
                </div>
              </Link>

              <SubjectSwitcher />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
              {navLinks.map(({ href, label }) => {
                const isActive =
                  pathname === href || (pathname.startsWith(href + '/') && href !== '/');
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`transition-all px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#0D3A2B] text-[#00E699] font-bold border border-[#134E3A]'
                        : 'text-[#8EBDAE] hover:text-white hover:bg-[#0A3325]'
                    }`}
                  >
                    <span>{label}</span>
                  </Link>
                );
              })}

              {user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' ? (
                <Link
                  href="/admin"
                  className={`px-3 py-1.5 rounded-lg font-bold ${
                    pathname.startsWith('/admin')
                      ? 'bg-[#0D3A2B] text-[#00E699] border border-[#134E3A]'
                      : 'text-[#00E699] hover:bg-[#0A3325]'
                  }`}
                >
                  Admin
                </Link>
              ) : null}
            </nav>

            {/* Right Action Icons & User Info */}
            <div className="flex items-center gap-3">
              <Link
                href="/search"
                className="w-9 h-9 rounded-full bg-[#0A3325] hover:bg-[#0D3A2B] border border-[#134E3A] text-[#8EBDAE] hover:text-white flex items-center justify-center transition-colors hidden sm:flex"
                aria-label="Search"
              >
                <Search size={15} />
              </Link>

              {/* Bell notification */}
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  className="w-9 h-9 rounded-full bg-[#0A3325] hover:bg-[#0D3A2B] border border-[#134E3A] text-[#8EBDAE] hover:text-white flex items-center justify-center transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00E699] absolute top-2 right-2 ring-2 ring-[#041A12]" />
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </button>
              </div>

              {/* Profile Avatar / Trigger */}
              {user ? (
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 p-1 pr-3 rounded-full bg-[#0A3325] hover:bg-[#0D3A2B] border border-[#134E3A] transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#00E699] text-[#03140E] flex items-center justify-center font-bold text-xs">
                    {userName.charAt(0)}
                  </div>
                  <div className="hidden sm:flex flex-col text-left leading-tight">
                    <span className="text-xs font-bold text-white max-w-[100px] truncate">{userName}</span>
                    <span className="text-[10px] text-[#8EBDAE]">Aspirant</span>
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 bg-[#00E699] hover:bg-[#00B377] text-[#03140E] font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Sign In
                </button>
              )}

              {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-stone-300 hover:text-white rounded-lg hover:bg-[#0A3325] transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#134E3A] bg-[#041A12] px-4 py-4 space-y-2 text-white">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-xs font-semibold text-[#8EBDAE] hover:text-white hover:bg-[#0A3325]"
              >
                <span>{label}</span>
              </Link>
            ))}
            {!user && (
              <div className="pt-3 border-t border-[#134E3A] flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="flex-1 py-2 text-center text-xs font-bold text-[#03140E] bg-[#00E699] hover:bg-[#00B377] rounded-xl cursor-pointer"
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
