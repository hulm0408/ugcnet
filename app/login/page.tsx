import type { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from './LoginForm';
export const metadata: Metadata = {
  title: 'Log In',
  description: 'Log in to your Arabic NET/JRF Practice account.',
};

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <span className="text-white font-bold text-xl font-arabic">ع</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">Log in to continue your preparation</p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-slate-500 mt-5">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-slate-900 font-semibold hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
