import type { Metadata } from 'next';
import Link from 'next/link';
import SignupForm from './SignupForm';
export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a free Arabic NET/JRF Practice account to track your progress.',
};

export default function SignupPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-primary-surface to-white px-4 py-12 min-h-screen">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10 transform scale-150"></div>
          <div className="w-14 h-14 bg-gradient-to-tr from-primary-dark to-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-2xl font-arabic">ع</span>
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-stone-900 to-stone-600 tracking-tight">Create free account</h1>
          <p className="text-stone-500 text-sm mt-2 font-medium">Start tracking your NET/JRF preparation</p>
        </div>

        <SignupForm />

        <p className="text-center text-sm text-stone-500 mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
