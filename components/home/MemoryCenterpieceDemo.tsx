'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Brain,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Bookmark,
  Calendar,
} from 'lucide-react';

interface MemoryCenterpieceProps {
  subjectName: string;
  subjectCode: string;
  nativeName?: string;
  direction?: 'ltr' | 'rtl';
  exampleQuestion?: string;
  exampleTrick?: string;
  exampleMeta?: string;
}

export default function MemoryCenterpieceDemo({
  subjectName,
  subjectCode,
  nativeName,
  direction = 'ltr',
  exampleQuestion = 'مَنْ هُوَ صَاحِبُ مُعَلَّقَةِ "قِفَا نَبْكِ مِنْ ذِكْرَى حَبِيبٍ وَمَنْزِلِ"؟',
  exampleTrick = 'Imru\' al-Qais stood weeping (Qifa Nabki) at the deserted campsite like an exiled poet-king.',
  exampleMeta = 'Unit 1 • Pre-Islamic Poetry • Mu\'allaqat',
}: MemoryCenterpieceProps) {
  const [activeTab, setActiveTab] = useState<'card' | 'schedule'>('card');
  const [revealed, setRevealed] = useState(true);

  const reviewIntervals = [
    { day: 'Day 1', label: 'Initial Attempt', desc: 'Identify the mistake in a mock test and attach a personalized mnemonic.' },
    { day: 'Day 3', label: 'First Recall', desc: 'Test yourself without looking at the answer key.' },
    { day: 'Day 7', label: 'Consolidation', desc: 'Strengthen the neural memory trace before decay sets in.' },
    { day: 'Day 14', label: 'Long-Term Shift', desc: 'Concept moves from working memory to permanent academic storage.' },
    { day: 'Exam Day', label: 'Instant Retrieval', desc: 'Recall the correct answer under exam timing in under 15 seconds.' },
  ];

  return (
    <section className="py-16 md:py-24 bg-stone-900 text-white font-sans border-b border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 border border-stone-700 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Brain size={14} className="text-emerald-400" />
            <span>Active Recall &amp; Memory Anchors</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Don&apos;t Just Guess Answers.<br />
            <span className="text-emerald-400">Remember Them on Exam Day.</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Standard test portals let you solve questions and forget them in 48 hours. Our Spaced Repetition Memory Engine lets you anchor confusing {subjectName} names, chronologies, and rules into long-term recall.
          </p>
        </div>

        {/* Interactive Centerpiece Box */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Left Column: Interactive Memory Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                {exampleMeta}
              </div>
              <div className="text-xs text-stone-400 font-medium">
                Official NTA Question
              </div>
            </div>

            {/* Question Text */}
            <div
              dir={direction}
              className={`p-5 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 text-base sm:text-lg font-medium leading-relaxed ${
                direction === 'rtl' ? 'font-arabic text-right' : 'font-sans text-left'
              }`}
            >
              {exampleQuestion}
            </div>

            {/* Memory Anchor Box */}
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                <Lightbulb size={15} className="text-amber-400" />
                <span>Personal Memory Anchor / Mnemonic</span>
              </div>
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-medium">
                &ldquo;{exampleTrick}&rdquo;
              </p>
            </div>

            {/* Why This Works */}
            <div className="grid grid-cols-2 gap-3 text-xs text-stone-300">
              <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800">
                <span className="text-stone-400 block font-semibold mb-0.5">Common Trap</span>
                <span>Confusing similar opening lines across pre-Islamic odes.</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800">
                <span className="text-emerald-400 block font-semibold mb-0.5">The Solution</span>
                <span>An episodic visual association fixes the retrieval key.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Spaced Repetition Schedule */}
          <div className="lg:col-span-5 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Calendar size={16} className="text-emerald-400" />
              <span>5-Stage Spaced Repetition Timeline</span>
            </div>

            <div className="space-y-3 pt-2">
              {reviewIntervals.map((int, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <span className="w-14 shrink-0 font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800/60 text-center">
                    {int.day}
                  </span>
                  <div>
                    <span className="font-bold text-stone-200 block">{int.label}</span>
                    <span className="text-stone-400 text-[11px] leading-relaxed">{int.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-800">
              <Link
                href="/memories"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Open Memory Revision Hub</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
