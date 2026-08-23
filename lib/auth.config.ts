import type { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
    verifyRequest: '/verify-email',
    newUser: '/dashboard',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? 'USER';
      }
      if (trigger === 'update' && session) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? 'USER';
      }
      return session;
    },
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      if (pathname.startsWith('/admin')) {
        return isLoggedIn && (auth?.user?.role === 'ADMIN' || auth?.user?.role === 'SUPER_ADMIN');
      }

      if (
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/bookmarks') ||
        pathname.startsWith('/incorrect') ||
        pathname.startsWith('/profile')
      ) {
        return isLoggedIn;
      }

      return true;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ], // Database-dependent providers are appended in auth.ts
} satisfies NextAuthConfig;
