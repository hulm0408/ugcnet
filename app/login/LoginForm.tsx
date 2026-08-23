'use client';

import Link from 'next/link';
import { useState, useActionState } from 'react';
import { signIn } from 'next-auth/react';
import { loginAction } from '@/app/actions/auth';
import { AlertCircle } from 'lucide-react';

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, { error: null });
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    try {
      await signIn('google', { callbackUrl: '/dashboard?login=success' });
    } catch {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-stone-200/60 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] p-8">
      {state?.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm font-medium">
          <AlertCircle size={18} />
          {state.error}
        </div>
      )}

      {/* Google Login — uses next-auth/react client signIn() which performs the browser redirect correctly */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-stone-200 text-stone-700 text-sm font-bold rounded-2xl hover:bg-stone-50 hover:shadow-md transition-all duration-300 shadow-sm group disabled:opacity-60 disabled:cursor-wait"
      >
        {googleLoading ? (
          <span className="w-5 h-5 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin" />
        ) : (
          <svg className="group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.419 L -8.284 53.419 C -8.554 54.819 -9.414 55.979 -10.564 56.769 L -10.564 59.469 L -6.704 59.469 C -4.434 57.379 -3.264 54.719 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.714 59.469 L -10.574 56.769 C -11.714 57.539 -13.144 57.969 -14.754 57.969 C -17.864 57.969 -20.494 55.889 -21.414 53.049 L -25.434 53.049 L -25.434 56.169 C -23.464 60.099 -19.414 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -21.414 53.049 C -21.654 52.329 -21.794 51.559 -21.794 50.769 C -21.794 49.979 -21.654 49.209 -21.414 48.489 L -21.414 45.369 L -25.434 45.369 C -26.254 46.999 -26.714 48.829 -26.714 50.769 C -26.714 52.709 -26.254 54.539 -25.434 56.169 L -21.414 53.049 Z"/>
              <path fill="#EA4335" d="M -14.754 43.569 C -12.984 43.569 -11.404 44.179 -10.154 45.369 L -6.634 41.849 C -8.814 39.819 -11.514 38.269 -14.754 38.269 C -19.414 38.269 -23.464 41.409 -25.434 45.369 L -21.414 48.489 C -20.494 45.649 -17.864 43.569 -14.754 43.569 Z"/>
            </g>
          </svg>
        )}
        {googleLoading ? 'Redirecting to Google...' : 'Continue with Google'}
      </button>

      <div className="flex items-center gap-3 my-8">
        <div className="flex-1 h-px bg-stone-100"></div>
        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">or email</span>
        <div className="flex-1 h-px bg-stone-100"></div>
      </div>

      <form className="space-y-5" action={formAction}>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-stone-700 mb-2">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all duration-300"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm font-bold text-stone-700">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all duration-300"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 bg-gradient-to-r from-primary-dark to-primary text-white text-sm font-bold rounded-2xl hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 shadow-sm mt-4 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center"
        >
          {isPending ? (
            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
          ) : (
            'Log In'
          )}
        </button>
      </form>
    </div>
  );
}
