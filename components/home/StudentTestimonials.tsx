'use client';

import React from 'react';
import {
  Quote,
  CheckCircle2,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface Testimonial {
  name: string;
  subject: string;
  result: string;
  examCycle: string;
  score: string;
  quote: string;
  avatarText: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Priya M.',
    subject: 'Political Science',
    result: 'JRF Qualified (Top 1%)',
    examCycle: 'Dec 2023 Shift 2',
    score: '216/300 Marks',
    highlight: 'Paper 1 Data Interpretation & Research Aptitude',
    quote:
      'The Paper 1 mock tests were identical to the December 2023 shift 2 format. Doing the full 50-question mock under the 1-hour split allowed me to complete the DI table in 4 minutes flat on exam day.',
    avatarText: 'PM',
  },
  {
    name: 'Dr. Tariq A.',
    subject: 'Arabic',
    result: 'Assistant Professor & NET Qualified',
    examCycle: 'June 2024 Exam',
    score: '198/300 Marks',
    highlight: 'Classical Poetry Meters & Authentic Diacritics',
    quote:
      'Every other PDF or portal had corrupted Arabic characters and wrong answer keys for Pre-Islamic verses. Here, every line had verified tashkeel and the official NTA challenge key reconciliation.',
    avatarText: 'TA',
  },
  {
    name: 'Rahul K.',
    subject: 'Computer Science & Applications',
    result: 'NET Qualified',
    examCycle: 'Dec 2023 Exam',
    score: '184/300 Marks',
    highlight: '10-Unit Granular Mistake Diagnosis',
    quote:
      'The 10-unit performance breakdown showed me I was losing 14 marks in Discrete Structures and TOC alone. I focused solely on those 2 units for 3 weeks and jumped from 48% to 68% in Paper 2.',
    avatarText: 'RK',
  },
  {
    name: 'Ananya S.',
    subject: 'English Literature',
    result: 'JRF Qualified',
    examCycle: 'June 2024 Shift 1',
    score: '224/300 Marks',
    highlight: 'Chronological Period Timelines & Literary Theory',
    quote:
      'The chronological memory anchors for Postcolonial and Cultural Studies theorists saved me. Chronology matching questions in Unit 8 became effortless instead of guesswork.',
    avatarText: 'AS',
  },
];

export default function StudentTestimonials() {
  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5] border-b border-stone-200 font-sans text-stone-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-mono font-semibold uppercase tracking-wider shadow-2xs">
            <GraduationCap size={14} className="text-emerald-800" />
            <span>Verifiable Aspirant Outcomes</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-950 tracking-tight">
            From the UGC NET/JRF Grind to Qualification
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Real feedback from university research scholars and assistant professor aspirants who prepared using our 10-unit curriculum mapping and CBT mock system.
          </p>
        </div>

        {/* 2x2 Grid of Candid Testimonials */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Top Row: User Meta & Score Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {t.avatarText}
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-sm sm:text-base">{t.name}</div>
                      <div className="text-xs text-stone-500 font-medium">
                        {t.subject} • <span className="font-mono text-stone-700">{t.examCycle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-bold">
                      {t.result}
                    </span>
                    <div className="text-[10px] font-mono text-stone-400 mt-0.5">{t.score}</div>
                  </div>
                </div>

                {/* Key Area Highlight Pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-[11px] font-medium">
                  <span className="text-stone-400 font-bold">Key Boost:</span>
                  <span>{t.highlight}</span>
                </div>

                {/* Quote Text */}
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Bottom Verification Flag */}
              <div className="flex items-center gap-2 pt-4 mt-4 border-t border-stone-100 text-[11px] font-medium text-stone-500">
                <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                <span>Verified Exam Roll Submission</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
