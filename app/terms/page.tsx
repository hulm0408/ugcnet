import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Arabic NET/JRF Practice.',
};

export default function TermsPage() {
  return (
    <div className="flex-1 bg-stone-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8 md:p-12">
          <div className="w-16 h-16 bg-primary-surface text-primary rounded-2xl flex items-center justify-center mb-6">
             <FileText size={32} />
          </div>
          
          <h1 className="text-3xl font-extrabold text-stone-900 mb-2">Terms of Service</h1>
          <p className="text-stone-500 font-medium mb-10">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-stone max-w-none">
            <h3 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h3>
            <p>
              By accessing and using <strong>Arabic NET/JRF Practice</strong> (the "Service"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">2. Educational Purpose & Disclaimer</h3>
            <p>
              This platform is an independent educational tool created to assist students in preparing for the UGC NET/JRF Arabic examination. 
            </p>
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl my-4">
              <strong>Disclaimer:</strong> We are <strong>not</strong> affiliated with, endorsed by, or connected to the University Grants Commission (UGC) or the National Testing Agency (NTA). The questions provided on this platform are Previous Year Questions (PYQs) made publicly available in past examinations. All intellectual property rights regarding the original exam content belong to the respective testing authorities.
            </div>

            <h3 className="text-xl font-bold mt-8 mb-4">3. User Accounts</h3>
            <p>
              To access personalized features like mock test tracking and bookmarking, you must authenticate using your Google account. You are responsible for maintaining the security of your Google account credentials. We reserve the right to terminate accounts that attempt to abuse or manipulate the platform's API or database.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">4. Acceptable Use</h3>
            <p>
              You agree not to misuse the Service or help anyone else to do so. Specifically, you must not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600">
              <li>Attempt to extract or scrape the underlying database using automated scripts or bots.</li>
              <li>Attempt to bypass security constraints, authorization checks, or rate limits.</li>
              <li>Use the platform for any commercial purpose without prior written consent.</li>
            </ul>

            <h3 className="text-xl font-bold mt-8 mb-4">5. Modifications to Service</h3>
            <p>
              We reserve the right to modify, suspend, or discontinue the Service at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
            </p>

            <div className="mt-12 p-6 bg-stone-50 rounded-2xl border border-stone-100">
              <h4 className="font-bold text-stone-900 mb-2">Need Clarification?</h4>
              <p className="text-stone-600">
                If you have questions about these terms, please visit our <Link href="/contact" className="text-primary hover:underline font-bold">Contact Page</Link>.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
