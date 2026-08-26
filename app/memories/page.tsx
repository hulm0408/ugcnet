'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  CheckSquare,
  Trophy,
  Sparkles,
  RefreshCw,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Bell,
  Brain,
} from 'lucide-react';

function MemoriesContent() {
  const progressTopics = [
    {
      id: '1',
      topicArabic: 'الأدب الجاهلي والمعلقات السبع',
      topicEnglish: 'Pre-Islamic Literature & The Muallaqat',
      level: 2,
    },
    {
      id: '2',
      topicArabic: 'شعر العصر العباسي والمتنبي',
      topicEnglish: 'Abbasid Poetry & Al-Mutanabbi',
      level: 3,
    },
    {
      id: '3',
      topicArabic: 'النقد الأدبي والمدارس النقدية',
      topicEnglish: 'Classical Literary Criticism',
      level: 1,
    },
    {
      id: '4',
      topicArabic: 'علم البلاغة والمعاني والبيان',
      topicEnglish: 'Rhetoric, Eloquence & Stylistics',
      level: 4,
    },
    {
      id: '5',
      topicArabic: 'النحو والصرف وتاريخ اللغة',
      topicEnglish: 'Arabic Grammar, Syntax & Morphology',
      level: 5,
    },
  ];

  return (
    <div className="flex-1 bg-[#F8FAFC] text-slate-900 font-sans min-h-screen pb-16">
      
      {/* ── 1. HEADER SECTION ── */}
      <section className="bg-white border-b border-slate-200 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider">
                <Brain size={13} className="text-purple-700" />
                <span>SM-2 Spaced Repetition Engine</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight">
                5-Level Memory Revision System
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm font-medium">
                Active recall and scientific spaced repetition for 100% long-term retention.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 max-w-sm">
              <HelpCircle size={16} className="text-emerald-700 shrink-0" />
              <div>
                <span className="font-bold text-slate-900">How it works:</span> Each level strengthens retention. Miss a review and the algorithm steps back!
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        
        {/* ── 2. 5-LEVEL PROGRESSION CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          
          {/* Level 1 */}
          <div className="bg-white border border-slate-200 hover:border-emerald-500/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all shadow-xs group">
            <div className="space-y-2 text-center">
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md uppercase tracking-wider inline-block">
                LEVEL 1
              </span>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
                <BookOpen size={18} />
              </div>
              <div className="font-bold text-xs text-emerald-800 uppercase tracking-wider">
                First Learning
              </div>
              <div dir="rtl" className="font-arabic font-bold text-base text-slate-900">
                التعلم الأول
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Learn the topic &amp; take test
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">If missed, reset to</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-bold text-[10px]">
                LEVEL 1
              </span>
            </div>
          </div>

          {/* Level 2 */}
          <div className="bg-white border border-slate-200 hover:border-amber-500/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all shadow-xs group">
            <div className="space-y-2 text-center">
              <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md uppercase tracking-wider inline-block">
                LEVEL 2
              </span>
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto shadow-2xs">
                <Calendar size={18} />
              </div>
              <div className="font-bold text-xs text-amber-800 uppercase tracking-wider">
                1st Review
              </div>
              <div dir="rtl" className="font-arabic font-bold text-base text-slate-900">
                المراجعة الأولى
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Within 24 hours of learning
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">If missed, reset to</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-bold text-[10px]">
                LEVEL 1
              </span>
            </div>
          </div>

          {/* Level 3 */}
          <div className="bg-white border border-slate-200 hover:border-orange-500/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all shadow-xs group">
            <div className="space-y-2 text-center">
              <span className="text-[10px] font-mono font-bold text-orange-800 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md uppercase tracking-wider inline-block">
                LEVEL 3
              </span>
              <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 flex items-center justify-center mx-auto shadow-2xs">
                <Calendar size={18} />
              </div>
              <div className="font-bold text-xs text-orange-800 uppercase tracking-wider">
                2nd Review
              </div>
              <div dir="rtl" className="font-arabic font-bold text-base text-slate-900">
                المراجعة الثانية
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                2 to 3 days later
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">If missed, step back to</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-bold text-[10px]">
                LEVEL 2
              </span>
            </div>
          </div>

          {/* Level 4 */}
          <div className="bg-white border border-slate-200 hover:border-purple-500/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all shadow-xs group">
            <div className="space-y-2 text-center">
              <span className="text-[10px] font-mono font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md uppercase tracking-wider inline-block">
                LEVEL 4
              </span>
              <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center mx-auto shadow-2xs">
                <Calendar size={18} />
              </div>
              <div className="font-bold text-xs text-purple-800 uppercase tracking-wider">
                3rd Review
              </div>
              <div dir="rtl" className="font-arabic font-bold text-base text-slate-900">
                المراجعة الثالثة
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                1 week later
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">If missed, step back to</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-bold text-[10px]">
                LEVEL 3
              </span>
            </div>
          </div>

          {/* Level 5 - 4th Review */}
          <div className="bg-white border border-slate-200 hover:border-blue-500/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all shadow-xs group">
            <div className="space-y-2 text-center">
              <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md uppercase tracking-wider inline-block">
                LEVEL 5
              </span>
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mx-auto shadow-2xs">
                <Trophy size={18} />
              </div>
              <div className="font-bold text-xs text-blue-800 uppercase tracking-wider">
                4th Review
              </div>
              <div dir="rtl" className="font-arabic font-bold text-base text-slate-900">
                المراجعة الرابعة
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                2 to 3 weeks later
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">If missed, step back to</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-bold text-[10px]">
                LEVEL 3
              </span>
            </div>
          </div>

          {/* Level 5 - Mastery */}
          <div className="bg-white border border-slate-200 hover:border-cyan-500/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all shadow-xs group">
            <div className="space-y-2 text-center">
              <span className="text-[10px] font-mono font-bold text-cyan-800 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-md uppercase tracking-wider inline-block">
                MASTERY
              </span>
              <div className="w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center mx-auto shadow-2xs">
                <Sparkles size={18} />
              </div>
              <div className="font-bold text-xs text-cyan-800 uppercase tracking-wider">
                Permanent
              </div>
              <div dir="rtl" className="font-arabic font-bold text-base text-slate-900">
                المراجعة الخامسة
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                1 to 2 months later
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">Permanent Mastery</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                LEVEL 5
              </span>
            </div>
          </div>

        </div>

        {/* ── 3. WORKFLOW ROADMAP & GOLDEN RULE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
              <RefreshCw size={22} />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                The Golden Rule
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Revision is the key to long-term memory. If you miss a scheduled review, the algorithm steps back to protect retention.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-2 overflow-x-auto shadow-xs">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Brain size={17} />
              </div>
              <span className="text-xs font-bold text-slate-900">1. Learn</span>
            </div>

            <ArrowRight size={14} className="text-slate-300 shrink-0" />

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <CheckSquare size={17} />
              </div>
              <span className="text-xs font-bold text-slate-900">2. Take Test</span>
            </div>

            <ArrowRight size={14} className="text-slate-300 shrink-0" />

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Calendar size={17} />
              </div>
              <span className="text-xs font-bold text-slate-900">3. Review on Time</span>
            </div>

            <ArrowRight size={14} className="text-slate-300 shrink-0" />

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Brain size={17} />
              </div>
              <span className="text-xs font-bold text-slate-900">4. Memory Anchor</span>
            </div>

            <ArrowRight size={14} className="text-slate-300 shrink-0" />

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Trophy size={17} />
              </div>
              <span className="text-xs font-bold text-slate-900">5. 100% Retention</span>
            </div>
          </div>

        </div>

        {/* ── 4. PROGRESS TABLE & STATS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Topics in Memory System */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Your 5-Level Progress
              </h2>
              <span className="text-[11px] text-slate-400 font-medium">5 Topics Active</span>
            </div>

            <div className="space-y-2.5">
              {progressTopics.map((pt) => (
                <div
                  key={pt.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div dir="rtl" className="font-arabic font-bold text-sm text-slate-900 truncate">
                      {pt.topicArabic}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate font-medium">
                      {pt.topicEnglish}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        pt.level === 1
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : pt.level === 2
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : pt.level === 3
                          ? 'bg-orange-50 text-orange-800 border border-orange-200'
                          : pt.level === 4
                          ? 'bg-purple-50 text-purple-800 border border-purple-200'
                          : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}
                    >
                      Level {pt.level}
                    </span>

                    <Link
                      href="/practice"
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg transition-colors inline-flex items-center gap-1 shadow-2xs"
                    >
                      Start Test
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center border-t border-slate-100">
              <Link
                href="/syllabus"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
              >
                <span>View All Syllabus Topics</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Retention Stats */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Memory Analytics
              </h2>
              <span className="text-[11px] text-emerald-700 font-bold">
                Calculated Live
              </span>
            </div>

            <div className="flex items-center justify-center py-3">
              <div className="w-28 h-28 rounded-full border-8 border-emerald-500 border-t-orange-500 border-r-amber-400 flex items-center justify-center text-center">
                <div>
                  <div className="text-2xl font-black text-slate-900">72%</div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">Overall Retention</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium border-t border-b border-slate-100 py-2.5">
              <div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-1" />
                <span className="text-slate-500">On Track</span>
                <div className="font-bold text-slate-900 mt-0.5">72%</div>
              </div>
              <div>
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block mr-1" />
                <span className="text-slate-500">At Risk</span>
                <div className="font-bold text-slate-900 mt-0.5">18%</div>
              </div>
              <div>
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block mr-1" />
                <span className="text-slate-500">Missed</span>
                <div className="font-bold text-slate-900 mt-0.5">10%</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                <div className="text-lg font-bold text-emerald-700">28</div>
                <div className="text-[9px] text-slate-500 leading-tight">Reviews Due</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                <div className="text-lg font-bold text-emerald-700">92%</div>
                <div className="text-[9px] text-slate-500 leading-tight">On Time</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                <div className="text-lg font-bold text-emerald-700">145</div>
                <div className="text-[9px] text-slate-500 leading-tight">Completed</div>
              </div>
            </div>
          </div>

          {/* Benefits & Arabic Calligraphy Box */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-xs">
            <div>
              <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-3">
                System Benefits
              </h2>

              <div className="space-y-2 text-xs font-medium text-slate-700">
                {[
                  'Improves Long-Term Retention',
                  'Stronger Concept Clarity',
                  'Boosts Exam Performance',
                  'Saves Valuable Study Time',
                  'Builds Consistent Daily Habits',
                  'Scientifically Validated',
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Arabic Quote */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-center space-y-1">
              <div dir="rtl" className="font-arabic font-bold text-sm text-emerald-900">
                المراجعة تجعل العلم راسخاً في القلب
              </div>
              <p className="text-[10px] text-emerald-800 font-medium">
                Revision makes knowledge permanent in the heart.
              </p>
            </div>
          </div>

        </div>

        {/* ── 5. BOTTOM REMINDER BANNER ── */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Bell size={20} />
            </div>
            <div>
              <div className="font-mono font-bold text-xs uppercase tracking-wider text-amber-800">
                Daily Revision Reminder
              </div>
              <p className="text-xs sm:text-sm font-bold text-amber-950 mt-0.5">
                Don&apos;t miss your reviews! Timely revision is the secret to cracking UGC NET/JRF Arabic.
              </p>
            </div>
          </div>

          <Link
            href="/memories/review"
            className="px-5 py-2.5 bg-amber-900 hover:bg-amber-950 text-white font-bold text-xs rounded-xl transition-colors shrink-0 inline-flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Review Due Cards (28)</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function MemoriesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Memory Engine...</div>}>
      <MemoriesContent />
    </Suspense>
  );
}
