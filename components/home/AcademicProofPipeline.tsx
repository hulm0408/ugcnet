'use client';

import React from 'react';
import { ShieldCheck, Check, X, BookOpen, Layers, History, BrainCircuit } from 'lucide-react';

interface AcademicProofProps {
  subjectName: string;
  subjectCode: string;
  totalQuestions: number;
  totalPapers: number;
}

export default function AcademicProofPipeline({
  subjectName,
  subjectCode,
  totalQuestions,
  totalPapers,
}: AcademicProofProps) {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>Academic Integrity &amp; Provenance</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            The Reality of NET/JRF Preparation
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Most aspirants waste hundreds of hours on unstructured PDF scans with unverified answer keys. We built the platform we wished we had when we were preparing.
          </p>
        </div>

        {/* Side-by-Side Comparison: Traditional PDF Chaos vs Structured Platform */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left: The PDF Chaos */}
          <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                  ✕
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">The Traditional Struggle</h3>
                  <p className="text-xs text-stone-500 font-medium">Scattered PDFs, unofficial keys &amp; guesswork</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-600">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✕
                  </div>
                  <span><strong>Unreliable Provisional Keys:</strong> Unrevised PDFs that ignore NTA&apos;s final challenge key corrections and dropped questions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✕
                  </div>
                  <span><strong>Zero Unit Mapping:</strong> Solving 100 questions sequentially without knowing which of the 10 syllabus units you are actually weak in.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✕
                  </div>
                  <span><strong>Rapid Memory Decay:</strong> Reviewing an answer once, only to forget the exact author, date, or rule on exam day.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✕
                  </div>
                  <span><strong>No Real CBT Experience:</strong> Practicing on static paper without the 160-minute countdown timer and question palette.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-200 text-xs text-stone-500 font-medium italic">
              Result: Weeks spent solving questions without measurable rank improvement.
            </div>
          </div>

          {/* Right: The Structured Platform Standard */}
          <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-emerald-800 shadow-xl">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-emerald-300 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">The Verified Platform Standard</h3>
                  <p className="text-xs text-emerald-300 font-medium">Reconciled archives, 10-unit tagging &amp; active recall</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-200">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span><strong>Final Challenge Key Reconciliation:</strong> Every question reconciled against official NTA revised final answer keys.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span><strong>Granular 10-Unit Curriculum Tagging:</strong> 100% of questions classified into their exact Unit, Broad Topic, and concept node.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span><strong>Active Recall Memory Anchors:</strong> Attach personalized mnemonics and tricks to difficult questions so they stick permanently.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <span><strong>Authentic 160-Min CBT Engine:</strong> Complete exam interface with 100-question palette, instant auto-submit, and unit analysis.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-emerald-900 text-xs text-emerald-300 font-medium">
              Result: Clear diagnostic feedback, targeted revision, and maximum retention.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
