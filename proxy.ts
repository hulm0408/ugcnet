/**
 * proxy.ts (Next.js 16 "proxy" = former middleware)
 *
 * IMPORTANT: This runs in the Edge runtime.
 * Do NOT import anything that uses Node.js APIs (PrismaClient, pg, etc.)
 * Use only the edge-safe authConfig (JWT-only, no DB adapter).
 */
import { authConfig } from '@/lib/auth.config';
import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

// Edge-safe auth — uses JWT only, no database adapter
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session?.user;
  const userRole = (session?.user as { role?: string } | undefined)?.role;

  // ── Admin routes: require ADMIN or SUPER_ADMIN ──
  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login?callbackUrl=/admin', req.url));
    }
    if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // ── Admin API routes: require ADMIN ──
  if (pathname.startsWith('/api/admin')) {
    if (!isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.next();
  }

  // ── Protected API routes: require login ──
  if (
    pathname.startsWith('/api/practice') ||
    pathname.startsWith('/api/bookmarks') ||
    pathname.startsWith('/api/dashboard') ||
    pathname.startsWith('/api/reports')
  ) {
    if (!isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  // ── Protected pages: require login ──
  const protectedPaths = ['/dashboard', '/bookmarks', '/incorrect', '/profile'];
  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    if (!isLoggedIn) {
      const callbackUrl = encodeURIComponent(req.url);
      return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.url));
    }
    return NextResponse.next();
  }

  // ── Auth pages: redirect to dashboard if already logged in ──
  if (['/login', '/signup'].includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
