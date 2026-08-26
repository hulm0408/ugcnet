'use client';

import React from 'react';
import Link from 'next/link';
import { X, Sparkles, Brain, CheckCircle2, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

interface AuthPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  targetHref: string;
}

export default function AuthPreviewModal({
  isOpen,
  onClose,
  featureName,
  targetHref,
}: AuthPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200/90 relative overflow-hidden animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Icon & Header */}
        <div className="space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Lock size={12} /> Member Feature
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Unlock {featureName}
          </h2>
          <p className="text-stone-500 text-sm font-medium leading-relaxed">
            Create a free student account to enable personalized study tools, mistake tracking, and AI-powered visual summaries.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-100 mb-6 text-xs font-bold text-stone-800">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <span>Permanent personal mistake tracker across all 45+ PYQ papers</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <span>Spaced repetition memory anchors and custom mnemonics</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <span>Interactive knowledge graph of literary figures &amp; concepts</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <span>Instant CBT test scoring with official NTA answer keys</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/signup?callbackUrl=${encodeURIComponent(targetHref)}`}
            onClick={onClose}
            className="flex-1 py-3.5 px-6 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-xl text-center shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Create Free Account</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(targetHref)}`}
            onClick={onClose}
            className="py-3.5 px-6 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm rounded-xl text-center transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
