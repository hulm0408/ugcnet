import type { Metadata } from 'next';
import Link from 'next/link';
import { Target, Lightbulb, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Arabic NET/JRF Practice and our mission.',
};

export default function AboutPage() {
  return (
    <div className="flex-1 bg-stone-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">About Us</h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Democratizing access to high-quality preparation material for the UGC NET/JRF Arabic examination.
          </p>
        </div>

        {/* Mission / Vision Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm text-center">
            <div className="w-14 h-14 bg-primary-surface text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Our Mission</h3>
            <p className="text-stone-500 text-sm leading-relaxed">
              To provide a seamless, modern, and highly effective platform for practicing previous year questions, strictly adhering to the official syllabus and pattern.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm text-center">
            <div className="w-14 h-14 bg-primary-surface text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb size={28} />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">The Problem</h3>
            <p className="text-stone-500 text-sm leading-relaxed">
              Arabic students often face scattered resources, poor UI, and lack of systematic tracking for PYQs. We solved this by organizing every question by Year, Unit, and Topic.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm text-center">
            <div className="w-14 h-14 bg-primary-surface text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">For The Community</h3>
            <p className="text-stone-500 text-sm leading-relaxed">
              Built freely for the academic community to ensure language barrier or lack of technological access does not hinder any student's path to JRF.
            </p>
          </div>
        </div>

        {/* The Platform Section */}
        <div className="bg-[#0A231C] text-stone-100 rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-4">Why we built this platform</h2>
            <div className="space-y-4 text-emerald-100/80 leading-relaxed max-w-3xl">
              <p>
                Preparing for the UGC NET Arabic exam requires deep analysis of past trends, question patterns, and rigorous practice. However, most available materials are PDFs, offline books, or unstructured websites.
              </p>
              <p>
                <strong>Arabic NET/JRF Practice</strong> was engineered to bridge this gap. By utilizing a modern tech stack (Next.js, PostgreSQL) and a meticulously categorized database, we offer Computer Based Test (CBT) simulations that mirror the actual NTA exam environment.
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-4">
              <Link href="/pyq" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-colors">
                Practice PYQs
              </Link>
              <Link href="/syllabus" className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-colors backdrop-blur-sm">
                Browse Syllabus
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
