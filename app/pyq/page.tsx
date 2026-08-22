import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, FileText, CheckCircle } from 'lucide-react';
import ArchBookQuillSvg from '@/components/ui/ArchBookQuillSvg';
import prisma from '@/lib/db';

export const metadata: Metadata = {
  title: 'PYQs — Previous Year Questions',
  description: 'Browse UGC NET Arabic Previous Year Questions from 2004 to 2024.',
};

export const dynamic = 'force-dynamic';

export default async function PYQPage() {
  const papers = await prisma.examPaper.findMany({
    where: { content_status: 'PUBLISHED' },
    select: { id: true, year: true, total_questions: true }
  });
  
  const totalQuestions = await prisma.question.count({
    where: { content_status: 'PUBLISHED' }
  });
  
  const totalPapers = papers.length;
  
  const yearStats = papers.reduce((acc, p) => {
    if (!acc[p.year]) acc[p.year] = { year: p.year, paperCount: 0 };
    acc[p.year].paperCount++;
    return acc;
  }, {} as Record<number, { year: number, paperCount: number }>);
  
  const years = Object.values(yearStats).sort((a, b) => b.year - a.year);
  const totalYears = years.length;
  return (
    <div className="flex-1 bg-stone-50 min-h-screen font-sans">
      {/* 01. PYQs - LANDING PAGE HERO SECTION */}
      <div className="bg-[#0A231C] text-stone-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 flex flex-col lg:flex-row items-center">
          
          {/* Left Text Content */}
          <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              Previous Year Questions
            </h1>
            <p dir="rtl" className="text-2xl lg:text-3xl font-arabic text-[#D97706] mb-6 drop-shadow-md">
              الأسئلة السابقة للسنوات
            </p>
            <p className="text-lg text-emerald-100/80 mb-10 max-w-xl mx-auto lg:mx-0">
              Practice real UGC NET Arabic questions asked in the actual exam. Track your accuracy and master the pattern.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-[#107A53]/20 border border-[#107A53]/40 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-1">{totalYears}</div>
                <div className="text-xs text-emerald-100/70 uppercase tracking-wider">Years</div>
              </div>
              <div className="bg-[#107A53]/20 border border-[#107A53]/40 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-1">{totalPapers}</div>
                <div className="text-xs text-emerald-100/70 uppercase tracking-wider">Papers</div>
              </div>
              <div className="bg-[#107A53]/20 border border-[#107A53]/40 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-1">{totalQuestions.toLocaleString()}</div>
                <div className="text-xs text-emerald-100/70 uppercase tracking-wider">Questions</div>
              </div>
              <div className="bg-[#107A53]/20 border border-[#107A53]/40 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-xs text-emerald-100/70 uppercase tracking-wider">Real Exam</div>
              </div>
            </div>
          </div>
          
          {/* Right SVG Graphic */}
          <div className="w-full lg:w-[450px] shrink-0 relative">
            {/* Soft backdrop glow behind SVG */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-600/20 rounded-full blur-[80px]" />
            <ArchBookQuillSvg className="w-full h-auto drop-shadow-2xl relative z-10" />
          </div>
        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-xl font-bold text-stone-900 mb-6">How it Works?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center border border-emerald-200">1</div>
              <div>
                <div className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                  <Calendar size={14} className="text-stone-400" /> Choose Year
                </div>
                <div className="text-xs text-stone-500 mt-1">Select the exam year you want to practice.</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center border border-emerald-200">2</div>
              <div>
                <div className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                  <FileText size={14} className="text-stone-400" /> Select Paper
                </div>
                <div className="text-xs text-stone-500 mt-1">Choose the paper/part/shift available.</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center border border-emerald-200">3</div>
              <div>
                <div className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                  <FileText size={14} className="text-stone-400" /> Read Instructions
                </div>
                <div className="text-xs text-stone-500 mt-1">Go through exam instructions & pattern.</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center border border-emerald-200">4</div>
              <div>
                <div className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                  <CheckCircle size={14} className="text-stone-400" /> Start Test
                </div>
                <div className="text-xs text-stone-500 mt-1">Take the test in real CBT mode.</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center border border-emerald-200">5</div>
              <div>
                <div className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                  <CheckCircle size={14} className="text-stone-400" /> View Result
                </div>
                <div className="text-xs text-stone-500 mt-1">Get detailed analysis and review.</div>
              </div>
            </div>
            
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
            <CheckCircle size={16} /> All questions are 100% real and based on official UGC NET exams.
          </div>
        </div>
      </div>

      {/* 02. SELECT YEAR SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-stone-900">Select Exam Year</h2>
          <p dir="rtl" className="text-lg font-arabic font-bold text-stone-600 mt-1">اختر سنة الامتحان</p>
          <p className="text-stone-500 text-sm mt-2">Choose the year of UGC NET Arabic exam you want to practice.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {years.map(({ year, paperCount }) => {
            return (
              <Link
                key={year}
                href={`/pyq/${year}`}
                className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#107A53] hover:ring-1 hover:ring-[#107A53]/50 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-stone-400 group-hover:text-[#107A53] transition-colors" />
                  <span className="text-lg font-bold text-stone-900 group-hover:text-[#107A53]">{year}</span>
                </div>
                <div className="text-xs text-stone-500 font-medium bg-stone-50 px-2 py-1 rounded-md inline-block border border-stone-100">
                  {paperCount} {paperCount === 1 ? 'Paper' : 'Papers'}
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <span className="font-bold text-xs">!</span>
          </div>
          Note: Number of papers may vary by year depending on whether there were multiple shifts or canceled exams.
        </div>
      </div>
    </div>
  );
}
