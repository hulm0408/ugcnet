'use client';

import React from 'react';
import { X, Lock, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface SubjectUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectName?: string;
  subjectSlug?: string;
  freeBenchmarkPaperId?: string | null;
  freeBenchmarkPaperName?: string | null;
}

export default function SubjectUnlockModal({
  isOpen,
  onClose,
  subjectName = 'Arabic',
  subjectSlug = 'arabic',
  freeBenchmarkPaperId,
  freeBenchmarkPaperName = '2023 Free Benchmark Paper',
}: SubjectUnlockModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200/80 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Banner */}
        <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-primary-dark p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-amber-300 text-xs font-bold mb-3">
            <Sparkles size={13} /> Complete Subject Preparation
          </div>

          <h3 className="text-2xl font-black tracking-tight">
            Unlock {subjectName} NET/JRF
          </h3>
          <p className="text-stone-300 text-xs mt-1">
            Get unlimited access to all previous year papers, full Paper 1, and personal mistake tracking.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Key Inclusions Checklist */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
              What is included in {subjectName} Pro:
            </div>
            {[
              `All 45+ ${subjectName} PYQ Papers (2004–2024 with full solutions)`,
              'Full UGC NET General Paper 1 (10 Units included at no extra cost)',
              'Interactive 5-Tier Syllabus Drilldown & Concept Explorer',
              'Personal Mistake Tracker & Weak Topic Analytics',
              'Timed NTA CBT Exam Simulator with Official Scoring',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-stone-700">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Pricing Card */}
          <div className="bg-primary-surface/60 rounded-2xl border border-primary/20 p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-primary-dark">
                Subject Pro Pass (6 Months)
              </div>
              <div className="text-xs text-stone-500 mt-0.5">Single payment • Full cycle access</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-stone-900">₹1,499</div>
              <div className="text-[10px] text-stone-400 font-bold">All papers included</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <Link
              href={`/checkout?subject=${subjectSlug}&plan=plan_sub_6m`}
              className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <span>Unlock {subjectName} Pro</span>
              <ArrowRight size={16} />
            </Link>

            {freeBenchmarkPaperId && (
              <Link
                href={`/practice?paperId=${freeBenchmarkPaperId}`}
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Take the Free Benchmark Exam Instead ({freeBenchmarkPaperName})</span>
              </Link>
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 font-medium pt-1">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Instant activation • 100% official NTA answer keys</span>
          </div>
        </div>
      </div>
    </div>
  );
}
