import type { Metadata } from 'next';
import Link from 'next/link';
import { signIn } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a free Arabic NET/JRF Practice account to track your progress.',
};

export default function SignupPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <span className="text-white font-bold text-xl font-arabic">ع</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create free account</h1>
          <p className="text-slate-500 text-sm mt-1">Start tracking your NET/JRF preparation</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <form
            action={async () => {
              'use server';
              await signIn('google', { redirectTo: '/dashboard' });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.419 L -8.284 53.419 C -8.554 54.819 -9.414 55.979 -10.564 56.769 L -10.564 59.469 L -6.704 59.469 C -4.434 57.379 -3.264 54.719 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.714 59.469 L -10.574 56.769 C -11.714 57.539 -13.144 57.969 -14.754 57.969 C -17.864 57.969 -20.494 55.889 -21.414 53.049 L -25.434 53.049 L -25.434 56.169 C -23.464 60.099 -19.414 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.414 53.049 C -21.654 52.329 -21.794 51.559 -21.794 50.769 C -21.794 49.979 -21.654 49.209 -21.414 48.489 L -21.414 45.369 L -25.434 45.369 C -26.254 46.999 -26.714 48.829 -26.714 50.769 C -26.714 52.709 -26.254 54.539 -25.434 56.169 L -21.414 53.049 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.569 C -12.984 43.569 -11.404 44.179 -10.154 45.369 L -6.634 41.849 C -8.814 39.819 -11.514 38.269 -14.754 38.269 C -19.414 38.269 -23.464 41.409 -25.434 45.369 L -21.414 48.489 C -20.494 45.649 -17.864 43.569 -14.754 43.569 Z"/>
                </g>
              </svg>
              Sign up with Google
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-100"></div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          <form className="space-y-4" action="#">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                Full name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                autoComplete="name"
                required
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                placeholder="At least 8 characters"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm mt-2"
            >
              Create Account
            </button>
          </form>

          <p className="text-xs text-slate-400 text-center mt-4 leading-relaxed">
            By signing up you agree to our{' '}
            <Link href="/terms" className="text-slate-600 hover:underline">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-slate-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-slate-900 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
