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
              <div className="bg-primary/20 border border-primary/40 rounded-2xl p-5 text-center backdrop-blur-md shadow-lg">
                <div className="text-3xl font-black text-white mb-1 drop-shadow-sm">{totalYears}</div>
                <div className="text-xs text-primary-light/80 uppercase tracking-wider font-semibold">Years</div>
              </div>
              <div className="bg-primary/20 border border-primary/40 rounded-2xl p-5 text-center backdrop-blur-md shadow-lg">
                <div className="text-3xl font-black text-white mb-1 drop-shadow-sm">{totalPapers}</div>
                <div className="text-xs text-primary-light/80 uppercase tracking-wider font-semibold">Papers</div>
              </div>
              <div className="bg-primary/20 border border-primary/40 rounded-2xl p-5 text-center backdrop-blur-md shadow-lg">
                <div className="text-3xl font-black text-white mb-1 drop-shadow-sm">{totalQuestions.toLocaleString()}</div>
                <div className="text-xs text-primary-light/80 uppercase tracking-wider font-semibold">Questions</div>
              </div>
              <div className="bg-primary/20 border border-primary/40 rounded-2xl p-5 text-center backdrop-blur-md shadow-lg">
                <div className="text-3xl font-black text-white mb-1 drop-shadow-sm">100%</div>
                <div className="text-xs text-primary-light/80 uppercase tracking-wider font-semibold">Real Exam</div>
              </div>
            </div>
          </div>
          
          {/* Right SVG Graphic */}
          <div className="w-full lg:w-[450px] shrink-0 relative">
            {/* Soft backdrop glow behind SVG */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/30 rounded-full blur-[100px]" />
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
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-surface text-primary-dark font-black flex items-center justify-center border border-primary/20 shadow-sm">1</div>
              <div>
                <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <Calendar size={16} className="text-primary" /> Choose Year
                </div>
                <div className="text-xs text-stone-500 mt-1 font-medium">Select the exam year you want to practice.</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-surface text-primary-dark font-black flex items-center justify-center border border-primary/20 shadow-sm">2</div>
              <div>
                <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <FileText size={16} className="text-primary" /> Select Paper
                </div>
                <div className="text-xs text-stone-500 mt-1 font-medium">Choose the paper/part/shift available.</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-surface text-primary-dark font-black flex items-center justify-center border border-primary/20 shadow-sm">3</div>
              <div>
                <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <FileText size={16} className="text-primary" /> Read Instructions
                </div>
                <div className="text-xs text-stone-500 mt-1 font-medium">Go through exam instructions & pattern.</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-surface text-primary-dark font-black flex items-center justify-center border border-primary/20 shadow-sm">4</div>
              <div>
                <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" /> Start Test
                </div>
                <div className="text-xs text-stone-500 mt-1 font-medium">Take the test in real CBT mode.</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-surface text-primary-dark font-black flex items-center justify-center border border-primary/20 shadow-sm">5</div>
              <div>
                <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" /> View Result
                </div>
                <div className="text-xs text-stone-500 mt-1 font-medium">Get detailed analysis and review.</div>
              </div>
            </div>
            
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary-dark bg-primary-surface p-4 rounded-xl border border-primary/20 shadow-sm">
            <CheckCircle size={18} className="text-primary" /> All questions are 100% real and based on official UGC NET exams.
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
                className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-primary/40 hover:ring-1 hover:ring-primary/20 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-stone-50 flex items-center justify-center group-hover:bg-primary-surface transition-colors">
                    <Calendar size={18} className="text-stone-400 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xl font-extrabold text-stone-900 group-hover:text-primary">{year}</span>
                </div>
                <div className="text-xs font-bold text-stone-500 bg-stone-50/80 px-3 py-1.5 rounded-lg inline-flex items-center border border-stone-200/60 w-fit">
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
