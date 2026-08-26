import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Play,
  BookOpen,
  FileText,
  Brain,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Layers,
  Calendar,
} from 'lucide-react';
import prisma from '@/lib/db';
import { getActiveSubjectServer } from '@/lib/subjectContext';
import { getSubjectConfig } from '@/config/subjects/registry';
import HomeSearchBar from '@/components/home/HomeSearchBar';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const activeSubject = await getActiveSubjectServer();
  const config = getSubjectConfig(activeSubject.slug, activeSubject);
  const totalQuestions = await prisma.question.count({
    where: { content_status: 'PUBLISHED', subject_id: activeSubject.id },
  });

  return {
    title: `UGC NET/JRF ${config.name} (Code ${config.code}) — 160-Min CBT Mocks, Paper 1 & 20-Year Solved PYQs`,
    description: `Every Arabic NET paper. One honest search. ${totalQuestions.toLocaleString()}+ authentic NTA questions, 10 official units, 5-level spaced repetition, and CBT simulation.`,
    alternates: { canonical: '/' },
  };
}

export default async function HomePage() {
  const activeSubject = await getActiveSubjectServer();
  const config = getSubjectConfig(activeSubject.slug, activeSubject);

  const [totalQuestions, totalPapers, totalUnits, unitsList, freeBenchmarkPaper] = await Promise.all([
    prisma.question.count({
      where: { content_status: 'PUBLISHED', subject_id: activeSubject.id },
    }),
    prisma.examPaper.count({
      where: { content_status: 'PUBLISHED', subject_id: activeSubject.id },
    }),
    prisma.syllabusUnit.count({
      where: { subject_id: activeSubject.id },
    }),
    prisma.syllabusUnit.findMany({
      where: { subject_id: activeSubject.id },
      orderBy: { unit_number: 'asc' },
      include: {
        _count: {
          select: { broad_topics: true, questions: true },
        },
      },
    }),
    prisma.examPaper.findFirst({
      where: {
        subject_id: activeSubject.id,
        is_free_benchmark: true,
      },
    }),
  ]);

  return (
    <div className="flex-1 bg-[#F8FAFC] text-slate-900 font-sans min-h-[90vh]">
      
      {/* ── 1. HERO SECTION & UNIVERSAL SEARCH ── */}
      <section className="bg-white border-b border-slate-200/80 pt-12 pb-14 sm:pt-16 sm:pb-18">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          
          {/* Native Arabic Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide shadow-2xs">
            <span dir="rtl" className="font-arabic text-sm font-bold text-emerald-900">
              {config.nativeName || 'اللغة العربية وآدابها'}
            </span>
            <span className="text-emerald-500">•</span>
            <span>UGC NET • CODE {config.code}</span>
          </div>

          {/* Main Hero Headline */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Every Arabic NET paper. <br className="hidden sm:inline" />
              <span className="text-emerald-700">One honest search.</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
              All 46 papers (2004–2023), {totalQuestions.toLocaleString()}+ questions, fully solved and reconciled with official NTA keys.
            </p>
          </div>

          {/* Universal Search Bar */}
          <div className="pt-2">
            <HomeSearchBar />
          </div>

        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        
        {/* ── 2. FOUR CORE ACTION HUBS GRID ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Main Action Hubs
            </h2>
            <span className="text-xs text-slate-400 font-medium">Choose your study mode</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            
            {/* Hub 1: PYQ Practice */}
            <Link
              href="/pyq"
              className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-emerald-500/80 rounded-2xl p-6 transition-all shadow-xs hover:shadow-md group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200/60 shadow-2xs">
                    <FileText size={20} />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    By Year &amp; Paper
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    PYQ Practice
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
                    2004–2023 all 46 papers with official keys and detailed explanations.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                <span>Browse PYQs</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Hub 2: CBT Mock Exam */}
            <Link
              href={freeBenchmarkPaper ? `/practice?paperId=${freeBenchmarkPaper.id}&type=mock` : '/mocks'}
              className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-emerald-500/80 rounded-2xl p-6 transition-all shadow-xs hover:shadow-md group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold border border-blue-200/60 shadow-2xs">
                    <Play size={20} fill="currentColor" />
                  </div>
                  <span className="text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                    100 Qs • 160 Mins
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    CBT Mock Exam
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
                    Authentic NTA exam simulator with countdown timer and question palette.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700 group-hover:text-blue-800">
                <span>Start CBT Mock</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Hub 3: 5-Level Memory */}
            <Link
              href="/memories"
              className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-emerald-500/80 rounded-2xl p-6 transition-all shadow-xs hover:shadow-md group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold border border-purple-200/60 shadow-2xs">
                    <Brain size={20} />
                  </div>
                  <span className="text-[11px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                    Active Recall Engine
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    5-Level Memory
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
                    SM-2 spaced repetition (24h → 3d → 1w → 3w → 2mo) so you never forget.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700 group-hover:text-purple-800">
                <span>Review Due Cards</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Hub 4: Syllabus */}
            <Link
              href="/syllabus"
              className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-emerald-500/80 rounded-2xl p-6 transition-all shadow-xs hover:shadow-md group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold border border-amber-200/60 shadow-2xs">
                    <BookOpen size={20} />
                  </div>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    10 Official Units
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    Syllabus
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
                    Complete UGC NET Arabic curriculum mapped topic-by-topic to questions.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-800">
                <span>Explore Syllabus</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </section>

        {/* ── 3. STATS STRIP ── */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            <div className="space-y-1 pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
                {totalQuestions.toLocaleString()}+
              </div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Solved Questions
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                100% NTA Key Reconciled
              </div>
            </div>

            <div className="space-y-1 pt-3 md:pt-0 md:pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
                {totalPapers || 46}
              </div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Historical Papers
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                June &amp; Dec Sessions
              </div>
            </div>

            <div className="space-y-1 pt-3 md:pt-0 md:pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
                {totalUnits || 10}
              </div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Official Units
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Full Curriculum Coverage
              </div>
            </div>

            <div className="space-y-1 pt-3 md:pt-0 md:pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
                2004–2023
              </div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Every Year Covered
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                20 Years Continuous Archive
              </div>
            </div>

          </div>
        </section>

        {/* ── 4. THE 10 OFFICIAL UNITS GRID ── */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
                10 Official Syllabus Units
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Browse the complete UGC NET curriculum with Arabic calligraphy titles and topic breakdown.
              </p>
            </div>
            <Link
              href="/syllabus"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 shrink-0"
            >
              <span>View Full Syllabus</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {unitsList.map((unit) => (
              <Link
                key={unit.unit_number}
                href={`/syllabus/${unit.unit_number}`}
                className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-500/80 rounded-2xl p-4 transition-all shadow-xs hover:shadow-sm space-y-2.5 flex flex-col justify-between group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center border border-emerald-200/60">
                      {unit.unit_number}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {unit._count.questions} Qs
                    </span>
                  </div>

                  <div
                    dir="rtl"
                    lang="ar"
                    className="font-arabic font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 text-right pt-0.5"
                  >
                    {unit.name_arabic || `الوحدة ${unit.unit_number}`}
                  </div>

                  <div className="text-xs font-semibold text-slate-600 line-clamp-1">
                    {unit.name_english || `Unit ${unit.unit_number}`}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-emerald-700">
                  <span>{unit._count.broad_topics} Topics</span>
                  <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
