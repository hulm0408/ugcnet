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
  // Sample progress topics for the progress table
  const progressTopics = [
    {
      id: '1',
      topicArabic: 'الأدب الجاهلي',
      topicEnglish: 'Pre-Islamic Literature',
      level: 2,
    },
    {
      id: '2',
      topicArabic: 'شعر العصر العباسي',
      topicEnglish: 'Abbasid Poetry',
      level: 3,
    },
    {
      id: '3',
      topicArabic: 'النقد الأدبي القديم',
      topicEnglish: 'Classical Literary Criticism',
      level: 1,
    },
    {
      id: '4',
      topicArabic: 'علم البلاغة',
      topicEnglish: 'Rhetoric & Eloquence',
      level: 4,
    },
    {
      id: '5',
      topicArabic: 'النحو العربي',
      topicEnglish: 'Arabic Grammar & Syntax',
      level: 5,
    },
  ];

  return (
    <div className="flex-1 bg-[#03140E] text-white font-sans min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* ── 1. PAGE HEADER & TITLE ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#134E3A] pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              5 LEVEL MEMORY (LEARNING SYSTEM)
            </h1>
            <p className="text-[#8EBDAE] text-xs sm:text-sm mt-1 font-medium">
              Scientific revision system for maximum retention and perfect preparation.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A3325] border border-[#134E3A] rounded-xl text-xs text-[#8EBDAE]">
            <HelpCircle size={15} className="text-[#00E699] shrink-0" />
            <div>
              <span className="font-bold text-white">How it works?</span>{' '}
              <span className="text-[#8EBDAE]">Each level strengthens your memory. Miss a review and you go back!</span>
            </div>
          </div>
        </div>

        {/* ── 2. 5 LEVEL PROGRESSION CARDS ROW ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          
          {/* Level 1 */}
          <div className="bg-[#082B1F] border border-[#134E3A] rounded-2xl p-4 flex flex-col justify-between space-y-3 relative group hover:border-[#05DF8E] transition-colors">
            <div className="space-y-2 text-center">
              <span className="text-[11px] font-mono font-bold text-[#8EBDAE] uppercase tracking-wider block">
                LEVEL 1
              </span>
              <div className="w-12 h-12 rounded-full bg-[#041A12] border border-[#05DF8E]/40 text-[#05DF8E] flex items-center justify-center mx-auto shadow-sm">
                <BookOpen size={20} />
              </div>
              <div className="font-bold text-xs text-[#05DF8E] uppercase tracking-wider pt-1">
                FIRST LEARNING
              </div>
              <div dir="rtl" className="font-arabic font-bold text-base text-white">
                التعلم الأول
              </div>
              <p className="text-[11px] text-[#8EBDAE] leading-relaxed">
                Learn the topic and take the test
              </p>
            </div>
            <div className="pt-2 border-t border-[#134E3A] text-center">
              <span className="text-[10px] text-[#5A8A7C] block">If missed, goes back to</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-[#0A3325] border border-[#05DF8E]/30 text-[#05DF8E] font-mono font-bold text-[10px]">
                LEVEL 1
              </span>
            </div>
          </div>

          {/* Level 2 */}
          <div className="bg-[#082B1F] border border-[#134E3A] rounded-2xl p-4 flex flex-col justify-between space-y-3 relative group hover:border-[#F9AB00] transition-colors">
            <div className="space-y-2 text-center">
              <span className="text-[11px] font-mono font-bold text-[#8EBDAE] uppercase tracking-wider block">
                LEVEL 2
              </span>
              <div className="w-12 h-12 rounded-full bg-[#041A12] border border-[#F9AB00]/40 text-[#F9AB00] flex items-center justify-center mx-auto shadow-sm">
                <Calendar size={20} />
              </div>
              <div className="font-bold text-xs text-[#F9AB00] uppercase tracking-wider pt-1">
                1ST REVIEW
              </div>
              <div dir="rtl" className="font-arabic font-bold text-base text-white">
                المراجعة الأولى
              </div>
              <p className="text-[11px] text-[#8EBDAE] leading-relaxed">
                Within 24 hours of first learning
              </p>
            </div>
            <div className="pt-2 border-t border-[#134E3A] text-center">
              <span className="text-[10px] text-[#5A8A7C] block">If missed, goes back to</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-[#0A3325] border border-[#F9AB00]/30 text-[#F9AB00] font-mono font-bold text-[10px]">
                LEVEL 1
              </span>
            </div>
          </div>

          {/* Level 3 */}
          <div className="bg-[#082B1F] border border-[#134E3A] rounded-2xl p-4 flex flex-col justify-between space-y-3 relative group hover:border-[#EA580C] transition-colors">
            <div className="space-y-2 text-center">
              <span className="text-[11px] font-mono font-bold text-[#8EBDAE] uppercase tracking-wider block">
                LEVEL 3
              </span>
              <div className="w-12 h-12 rounded-full bg-[#041A12] border border-[#EA580C]/40 text-[#EA580C] flex items-center justify-center mx-auto shadow-sm">
                <Calendar size={20} />
              </div>
              <div className="font-bold text-xs text-[#EA580C] uppercase tracking-wider pt-1">
                2ND REVIEW
              </div>
              <div dir="rtl" className="font-arabic font-bold text-base text-white">
                المراجعة الثانية
              </div>
              <p className="text-[11px] text-[#8EBDAE] leading-relaxed">
                2 to 3 days later
              </p>
            </div>
            <div className="pt-2 border-t border-[#134E3A] text-center">
              <span className="text-[10px] text-[#5A8A7C] block">If missed, goes back to</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-[#0A3325] border border-[#EA580C]/30 text-[#EA580C] font-mono font-bold text-[10px]">
                LEVEL 2
              </span>
            </div>
          </div>

          {/* Level 4 */}
          <div className="bg-[#082B1F] border border-[#134E3A] rounded-2xl p-4 flex flex-col justify-between space-y-3 relative group hover:border-[#8B5CF6] transition-colors">
            <div className="space-y-2 text-center">
              <span className="text-[11px] font-mono font-bold text-[#8EBDAE] uppercase tracking-wider block">
                LEVEL 4
              </span>
              <div className="w-12 h-12 rounded-full bg-[#041A12] border border-[#8B5CF6]/40 text-[#8B5CF6] flex items-center justify-center mx-auto shadow-sm">
                <Calendar size={20} />
              </div>
              <div className="font-bold text-xs text-[#8B5CF6] uppercase tracking-wider pt-1">
                3RD REVIEW
              </div>
              <div dir="rtl" className="font-arabic font-bold text-base text-white">
                المراجعة الثالثة
              </div>
              <p className="text-[11px] text-[#8EBDAE] leading-relaxed">
                1 week later
              </p>
            </div>
            <div className="pt-2 border-t border-[#134E3A] text-center">
              <span className="text-[10px] text-[#5A8A7C] block">If missed, goes back to</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-[#0A3325] border border-[#8B5CF6]/30 text-[#8B5CF6] font-mono font-bold text-[10px]">
                LEVEL 3
              </span>
            </div>
          </div>

          {/* Level 5 - 4th Review */}
          <div className="bg-[#082B1F] border border-[#134E3A] rounded-2xl p-4 flex flex-col justify-between space-y-3 relative group hover:border-[#3B82F6] transition-colors">
            <div className="space-y-2 text-center">
              <span className="text-[11px] font-mono font-bold text-[#8EBDAE] uppercase tracking-wider block">
                LEVEL 5
              </span>
              <div className="w-12 h-12 rounded-full bg-[#041A12] border border-[#3B82F6]/40 text-[#3B82F6] flex items-center justify-center mx-auto shadow-sm">
                <Trophy size={20} />
              </div>
              <div className="font-bold text-xs text-[#3B82F6] uppercase tracking-wider pt-1">
                4TH REVIEW
              </div>
              <div dir="rtl" className="font-arabic font-bold text-base text-white">
                المراجعة الرابعة
              </div>
              <p className="text-[11px] text-[#8EBDAE] leading-relaxed">
                2 to 3 weeks later
              </p>
            </div>
            <div className="pt-2 border-t border-[#134E3A] text-center">
              <span className="text-[10px] text-[#5A8A7C] block">If missed, goes back to</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-[#0A3325] border border-[#3B82F6]/30 text-[#3B82F6] font-mono font-bold text-[10px]">
                LEVEL 3
              </span>
            </div>
          </div>

          {/* Level 5 - 5th Review (Mastery) */}
          <div className="bg-[#082B1F] border border-[#134E3A] rounded-2xl p-4 flex flex-col justify-between space-y-3 relative group hover:border-[#06B6D4] transition-colors">
            <div className="space-y-2 text-center">
              <span className="text-[11px] font-mono font-bold text-[#8EBDAE] uppercase tracking-wider block">
                LEVEL 5
              </span>
              <div className="w-12 h-12 rounded-full bg-[#041A12] border border-[#06B6D4]/40 text-[#06B6D4] flex items-center justify-center mx-auto shadow-sm">
                <Sparkles size={20} />
              </div>
              <div className="font-bold text-xs text-[#06B6D4] uppercase tracking-wider pt-1">
                5TH REVIEW
              </div>
              <div dir="rtl" className="font-arabic font-bold text-base text-white">
                المراجعة الخامسة
              </div>
              <p className="text-[11px] text-[#8EBDAE] leading-relaxed">
                1 to 2 months later
              </p>
            </div>
            <div className="pt-2 border-t border-[#134E3A] text-center">
              <span className="text-[10px] text-[#5A8A7C] block">If missed, goes back to</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-[#0A3325] border border-[#06B6D4]/30 text-[#06B6D4] font-mono font-bold text-[10px]">
                LEVEL 5
              </span>
            </div>
          </div>

        </div>

        {/* ── 3. MIDDLE 2-COLUMN WORKFLOW & RULES ROW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* The Golden Rule */}
          <div className="lg:col-span-4 bg-[#082B1F] border border-[#134E3A] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0A3325] border border-[#134E3A] text-rose-400 flex items-center justify-center shrink-0">
              <RefreshCw size={22} />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#00E699] uppercase tracking-wider">
                The Golden Rule
              </div>
              <p className="text-xs text-[#8EBDAE] leading-relaxed">
                Revision is the key to long-term memory. If you miss the review within the given time, you will go back to the previous level.
              </p>
            </div>
          </div>

          {/* Workflow Diagram */}
          <div className="lg:col-span-8 bg-[#082B1F] border border-[#134E3A] rounded-2xl p-5 flex items-center justify-between gap-2 overflow-x-auto">
            
            <div className="flex items-center gap-2 text-center shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#0A3325] border border-[#134E3A] text-[#00E699] flex items-center justify-center">
                <Brain size={18} />
              </div>
              <span className="text-xs font-bold text-white">Learn</span>
            </div>

            <ArrowRight size={16} className="text-[#00E699] shrink-0" />

            <div className="flex items-center gap-2 text-center shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#0A3325] border border-[#134E3A] text-[#00E699] flex items-center justify-center">
                <CheckSquare size={18} />
              </div>
              <span className="text-xs font-bold text-white">Take Test</span>
            </div>

            <ArrowRight size={16} className="text-[#00E699] shrink-0" />

            <div className="flex items-center gap-2 text-center shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#0A3325] border border-[#134E3A] text-[#00E699] flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <span className="text-xs font-bold text-white">Review on Time</span>
            </div>

            <ArrowRight size={16} className="text-[#00E699] shrink-0" />

            <div className="flex items-center gap-2 text-center shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#0A3325] border border-[#134E3A] text-[#00E699] flex items-center justify-center">
                <Brain size={18} />
              </div>
              <span className="text-xs font-bold text-white">Memory Strong</span>
            </div>

            <ArrowRight size={16} className="text-[#00E699] shrink-0" />

            <div className="flex items-center gap-2 text-center shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#0A3325] border border-[#134E3A] text-[#00E699] flex items-center justify-center">
                <Trophy size={18} />
              </div>
              <span className="text-xs font-bold text-white">Perfect Retention</span>
            </div>

          </div>

        </div>

        {/* ── 4. BOTTOM 3-COLUMN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Card 1: YOUR 5 LEVEL PROGRESS TABLE */}
          <div className="lg:col-span-5 bg-[#082B1F] border border-[#134E3A] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#134E3A] pb-3">
              <h2 className="text-xs font-mono font-bold text-[#00E699] uppercase tracking-wider">
                YOUR 5 LEVEL PROGRESS
              </h2>
            </div>

            <div className="space-y-2.5">
              {progressTopics.map((pt) => (
                <div
                  key={pt.id}
                  className="p-3 bg-[#0A3325] border border-[#134E3A] rounded-xl flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div dir="rtl" className="font-arabic font-bold text-sm text-white truncate">
                      {pt.topicArabic}
                    </div>
                    <div className="text-[11px] text-[#8EBDAE] truncate font-medium">
                      {pt.topicEnglish}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        pt.level === 1
                          ? 'bg-[#05DF8E]/20 text-[#05DF8E] border border-[#05DF8E]/40'
                          : pt.level === 2
                          ? 'bg-[#F9AB00]/20 text-[#F9AB00] border border-[#F9AB00]/40'
                          : pt.level === 3
                          ? 'bg-[#EA580C]/20 text-[#EA580C] border border-[#EA580C]/40'
                          : pt.level === 4
                          ? 'bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/40'
                          : 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/40'
                      }`}
                    >
                      Level {pt.level}
                    </span>

                    <Link
                      href="/practice"
                      className="px-3 py-1 bg-[#00E699] hover:bg-[#00B377] text-[#03140E] font-bold text-[11px] rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      Start Test
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center border-t border-[#134E3A]">
              <Link
                href="/syllabus"
                className="text-xs font-bold text-[#00E699] hover:text-white inline-flex items-center gap-1"
              >
                <span>View All Topics</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Card 2: YOUR MEMORY STATS */}
          <div className="lg:col-span-4 bg-[#082B1F] border border-[#134E3A] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#134E3A] pb-3">
              <h2 className="text-xs font-mono font-bold text-[#00E699] uppercase tracking-wider">
                YOUR MEMORY STATS
              </h2>
              <span className="text-[11px] text-[#00E699] font-bold cursor-pointer">
                View Analytics
              </span>
            </div>

            {/* Donut Stats Visual */}
            <div className="flex items-center justify-center py-2 relative">
              <div className="w-28 h-28 rounded-full border-8 border-[#05DF8E] border-t-[#EA580C] border-r-[#F9AB00] flex items-center justify-center text-center">
                <div>
                  <div className="text-2xl font-black text-white">72%</div>
                  <div className="text-[9px] text-[#8EBDAE] uppercase font-bold">Overall Retention</div>
                </div>
              </div>
            </div>

            {/* Retention Legend */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium border-t border-b border-[#134E3A] py-2.5">
              <div>
                <span className="w-2 h-2 rounded-full bg-[#05DF8E] inline-block mr-1" />
                <span className="text-[#8EBDAE]">On Track</span>
                <div className="font-bold text-white mt-0.5">72%</div>
              </div>
              <div>
                <span className="w-2 h-2 rounded-full bg-[#F9AB00] inline-block mr-1" />
                <span className="text-[#8EBDAE]">At Risk</span>
                <div className="font-bold text-white mt-0.5">18%</div>
              </div>
              <div>
                <span className="w-2 h-2 rounded-full bg-[#EA580C] inline-block mr-1" />
                <span className="text-[#8EBDAE]">Missed</span>
                <div className="font-bold text-white mt-0.5">10%</div>
              </div>
            </div>

            {/* 3 Metric Boxes */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#0A3325] border border-[#134E3A] rounded-xl p-2.5">
                <div className="text-lg font-bold text-[#00E699]">28</div>
                <div className="text-[9px] text-[#8EBDAE] leading-tight">Reviews Due This Week</div>
              </div>
              <div className="bg-[#0A3325] border border-[#134E3A] rounded-xl p-2.5">
                <div className="text-lg font-bold text-[#00E699]">92%</div>
                <div className="text-[9px] text-[#8EBDAE] leading-tight">On Time Reviews</div>
              </div>
              <div className="bg-[#0A3325] border border-[#134E3A] rounded-xl p-2.5">
                <div className="text-lg font-bold text-[#00E699]">145</div>
                <div className="text-[9px] text-[#8EBDAE] leading-tight">Topics Completed</div>
              </div>
            </div>
          </div>

          {/* Card 3: BENEFITS & QUOTE BOX */}
          <div className="lg:col-span-3 bg-[#082B1F] border border-[#134E3A] rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-mono font-bold text-[#00E699] uppercase tracking-wider border-b border-[#134E3A] pb-3 mb-3">
                BENEFITS OF 5 LEVEL MEMORY
              </h2>

              <div className="space-y-2 text-xs font-medium text-white">
                {[
                  'Improves Long Term Retention',
                  'Stronger Concept Clarity',
                  'Boosts Exam Performance',
                  'Saves Time & Effort',
                  'Builds Consistent Study Habit',
                  'Scientifically Proven Method',
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#05DF8E] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Arabic Quote Box */}
            <div className="bg-[#0D3A2B] border border-[#134E3A] rounded-xl p-3 text-center space-y-1">
              <div dir="rtl" className="font-arabic font-bold text-sm text-[#00E699]">
                المراجعة تجعل العلم راسخاً في القلب
              </div>
              <p className="text-[10px] text-[#8EBDAE] font-medium">
                Revision makes knowledge permanent in the heart.
              </p>
            </div>
          </div>

        </div>

        {/* ── 5. BOTTOM WARM SAND ALERT BANNER ── */}
        <div className="bg-[#F5E6C8] text-[#5B4314] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg border border-[#E6D4B0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E6D4B0] flex items-center justify-center shrink-0 text-[#5B4314]">
              <Bell size={20} />
            </div>
            <div>
              <div className="font-mono font-bold text-xs uppercase tracking-wider text-[#7A5B1C]">
                IMPORTANT REMINDER
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#42310E]">
                Don&apos;t miss your reviews! Timely revision is the secret to success in UGC NET Arabic.
              </p>
            </div>
          </div>

          <Link
            href="/memories/review"
            className="px-5 py-2.5 bg-[#42310E] hover:bg-[#2F230A] text-white font-bold text-xs rounded-xl transition-colors shrink-0 inline-flex items-center justify-center gap-1.5"
          >
            <span>View Due Reviews</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function MemoriesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Loading Memory Engine...</div>}>
      <MemoriesContent />
    </Suspense>
  );
}
