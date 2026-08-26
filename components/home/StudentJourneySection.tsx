'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Layers,
  FileCheck2,
  AlertOctagon,
  Brain,
  Repeat,
  TrendingUp,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Play,
  RotateCcw,
} from 'lucide-react';

interface StudentJourneySectionProps {
  subjectName: string;
  subjectCode: string;
  nativeName?: string;
  direction?: 'ltr' | 'rtl';
  freeBenchmarkPaperId?: string;
  freeBenchmarkPaperName?: string;
}

export default function StudentJourneySection({
  subjectName,
  subjectCode,
  nativeName,
  direction = 'ltr',
  freeBenchmarkPaperId,
  freeBenchmarkPaperName,
}: StudentJourneySectionProps) {
  const steps = [
    {
      number: '01',
      title: 'Simulate Under Exam Conditions',
      subtitle: '100 Questions • 160-Minute Real Timer',
      description: `Take full-length mock tests and authentic 2004–2024 NTA papers for ${subjectName}. Experience the exact computer-based test (CBT) palette, pacing, and question structures.`,
      ctaText: 'Take Free Benchmark Mock',
      ctaHref: freeBenchmarkPaperId ? `/practice?paperId=${freeBenchmarkPaperId}` : '/mocks',
      badge: 'CBT Simulation',
      points: [
        '100 questions covering all 10 units evenly',
        'Official NTA palette (Answered, Marked, Visited)',
        'Zero pressure, 100% free evaluation benchmark',
      ],
    },
    {
      number: '02',
      title: 'Diagnose Your Weak Units',
      subtitle: 'Granular 10-Unit Curriculum Analytics',
      description: `Immediately upon submission, view your performance broken down by syllabus units. Know whether you are losing marks in classical literature, contemporary thought, grammar, or methodology.`,
      ctaText: 'Explore 10-Unit Syllabus',
      ctaHref: '/syllabus',
      badge: 'Diagnostic Feedback',
      points: [
        'Instant unit-by-unit accuracy score',
        'Direct links from missed questions to syllabus topics',
        'Automated Personal Mistake Bank',
      ],
    },
    {
      number: '03',
      title: 'Lock Concepts with Active Recall',
      subtitle: 'Mnemonics, Spaced Review & Memory Anchors',
      description: `Attach personal memory tricks and mnemonics to confusing authors, dates, formulas, or linguistic rules. Review them on a spaced repetition schedule so you never forget them on exam day.`,
      ctaText: 'View Memory Engine',
      ctaHref: '/memories',
      badge: 'Permanent Retention',
      points: [
        'Personal memory anchors on tricky questions',
        'Spaced repetition queue based on cognitive decay',
        'Dual-script context and detailed explanations',
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7] border-b border-stone-200 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider">
            <span>Pedagogical Study Method</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            How Serious Aspirants Clear NET &amp; JRF
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Preparation is not about solving thousands of questions aimlessly. It is a systematic 3-step loop: simulate, diagnose syllabus gaps, and anchor the memories.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all hover:border-emerald-700/40 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    STEP {s.number}
                  </span>
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    {s.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                    {s.title}
                  </h3>
                  <div className="text-xs font-medium text-emerald-700 mt-1">
                    {s.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {s.description}
                </p>

                <div className="pt-2 space-y-2 border-t border-stone-100">
                  {s.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-stone-600 font-medium">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100">
                <Link
                  href={s.ctaHref}
                  className="w-full py-3 px-4 rounded-xl bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 border border-stone-200 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group-hover:border-emerald-300"
                >
                  <span>{s.ctaText}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
