import type { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from './LoginForm';
import { AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Log In',
  description: 'Log in to your Arabic NET/JRF Practice account.',
};

const errorMessages: Record<string, string> = {
  Configuration: 'Server configuration error. Please contact support.',
  AccessDenied: 'Access was denied. Please try again.',
  Verification: 'Verification failed. Please try again.',
  OAuthCallback: 'Google sign-in failed. Please try again.',
  OAuthAccountNotLinked: 'This email is already registered. Please log in with email & password.',
  MissingCSRF: 'Session expired. Please refresh and try again.',
  Default: 'An error occurred. Please try again.',
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params?.error;
  const errorMsg = error ? (errorMessages[error] ?? errorMessages.Default) : null;

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-primary-surface to-white px-4 py-12 min-h-screen">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10 transform scale-150"></div>
          <div className="w-14 h-14 bg-gradient-to-tr from-primary-dark to-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-2xl font-arabic">ع</span>
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-stone-900 to-stone-600 tracking-tight">Welcome back</h1>
          <p className="text-stone-500 text-sm mt-2 font-medium">Log in to continue your preparation</p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm font-medium">
            <AlertCircle size={18} className="shrink-0" />
            {errorMsg}
          </div>
        )}

        <LoginForm />

        <p className="text-center text-sm text-stone-500 mt-5">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}

