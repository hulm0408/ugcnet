import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and Data Handling for Arabic NET/JRF Practice.',
};

export default function PrivacyPage() {
  return (
    <div className="flex-1 bg-stone-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8 md:p-12">
          <div className="w-16 h-16 bg-primary-surface text-primary rounded-2xl flex items-center justify-center mb-6">
             <Shield size={32} />
          </div>
          
          <h1 className="text-3xl font-extrabold text-stone-900 mb-2">Privacy Policy</h1>
          <p className="text-stone-500 font-medium mb-10">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-stone max-w-none">
            <p>
              Welcome to <strong>Arabic NET/JRF Practice</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information when you use our website.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">1. Data We Collect</h3>
            <p>
              When you log in to our platform via Google OAuth, we collect basic profile information strictly necessary to provide our services:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600">
              <li><strong>Name and Email:</strong> Used to uniquely identify your account and personalize your dashboard.</li>
              <li><strong>Profile Picture:</strong> Used solely for display purposes within your dashboard UI.</li>
              <li><strong>Practice Data:</strong> We store your mock test sessions, bookmarked questions, and incorrectly answered questions to help you track your progress over time.</li>
            </ul>

            <h3 className="text-xl font-bold mt-8 mb-4">2. How We Use Your Data</h3>
            <p>
              Your data is used <strong>exclusively</strong> to enhance your educational experience on this platform. We do not sell, rent, or share your personal data with third-party advertisers or data brokers.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">3. Data Security</h3>
            <p>
              We implement industry-standard security measures to protect your data. All authentication is securely handled by NextAuth (Auth.js) using secure JWT sessions, and our database is strictly governed by server-side authorization checks.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">4. Your Rights & Data Deletion</h3>
            <p>
              You have the right to request the deletion of your account and all associated practice data at any time. If you wish to permanently delete your data from our servers, please contact us.
            </p>

            <div className="mt-12 p-6 bg-stone-50 rounded-2xl border border-stone-100">
              <h4 className="font-bold text-stone-900 mb-2">Questions regarding this policy?</h4>
              <p className="text-stone-600">
                Please reach out to us via our <Link href="/contact" className="text-primary hover:underline font-bold">Contact Page</Link>.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
