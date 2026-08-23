import type { Metadata } from 'next';
import Link from 'next/link';
import SignupForm from './SignupForm';
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

        <SignupForm />

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
