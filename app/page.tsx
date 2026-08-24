import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Layers,
  ArrowRight,
  Brain,
  CheckCircle2,
  Trophy,
  Target,
  FileText,
  Sparkles,
} from 'lucide-react';
import prisma from '@/lib/db';
import PreparationJourneySvg from '@/components/home/PreparationJourneySvg';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const totalQuestions = await prisma.question.count({ where: { content_status: 'PUBLISHED' } });

  return {
    title: 'UGC NET Arabic Preparation — Official Syllabus, Real PYQs & Memory Retention',
    description: `Prepare for UGC NET/JRF Arabic. Study the official 10 units, solve ${totalQuestions.toLocaleString()}+ previous year questions (2004–2024), and lock your recall with 5-level spaced memory connections.`,
    alternates: { canonical: '/' },
  };
}

export default async function HomePage() {
  const [totalQuestions, totalPapers, totalUnits, papers, unitsList] = await Promise.all([
    prisma.question.count({ where: { content_status: 'PUBLISHED' } }),
    prisma.examPaper.count({ where: { content_status: 'PUBLISHED' } }),
    prisma.syllabusUnit.count(),
    prisma.examPaper.findMany({
      where: { content_status: 'PUBLISHED' },
      select: { year: true, paper_number: true, display_name: true },
      orderBy: { year: 'desc' },
    }),
    prisma.syllabusUnit.findMany({
      orderBy: { unit_number: 'asc' },
      include: {
        _count: {
          select: { broad_topics: true, questions: true },
        },
      },
    }),
  ]);

  const uniqueYears = Array.from(new Set(papers.map((p) => p.year))).sort((a, b) => b - a);

  return (
    <div className="flex-1 overflow-hidden bg-white text-stone-900">
      {/* ── 1. HERO SECTION: Value Proposition & Preparation Journey ── */}
      <section className="relative bg-stone-950 text-white pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Clear Core Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                UGC NET / JRF ARABIC • OFFICIAL PREPARATION
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
                Prepare from the actual syllabus.<br />
                Practice the actual PYQs.<br />
                <span className="text-emerald-400">Remember what you learn.</span>
              </h1>

              <div
                dir="rtl"
                lang="ar"
                className="font-arabic text-xl sm:text-2xl text-emerald-200/90 leading-relaxed font-bold pt-1"
              >
                ادرس المنهج الرسمي • تدرب على أسئلة الامتحانات السابقة • ثبّت حفظك بالروابط الذهنية
              </div>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                A focused, academic platform designed specifically for UGC NET Arabic aspirants.
                Master every author, era, diwan, and grammatical rule with authentic NTA exam papers
                and a deterministic 5-level spaced retention system.
              </p>

              {/* Two Primary CTAs Only */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/syllabus"
                  className="px-7 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg hover:shadow-emerald-900/40 text-center inline-flex items-center justify-center gap-2"
                >
                  <Layers size={18} />
                  <span>Explore Syllabus</span>
                </Link>
                <Link
                  href="/pyq"
                  className="px-7 py-3.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white font-bold text-sm sm:text-base rounded-xl transition-all text-center inline-flex items-center justify-center gap-2"
                >
                  <BookOpen size={18} />
                  <span>Browse PYQs</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Architectural SVG Visualization */}
            <div className="lg:col-span-5 flex justify-center">
              <PreparationJourneySvg />
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. DATABASE-DRIVEN METRICS BAR ── */}
      <section className="bg-stone-900 text-stone-300 py-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-800">
            <div className="pt-4 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-white">{totalQuestions.toLocaleString()}+</div>
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mt-0.5">Exam Questions</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-white">{totalPapers}</div>
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mt-0.5">Past Exam Papers</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-white">{totalUnits}</div>
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mt-0.5">Syllabus Units</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-white">{uniqueYears[uniqueYears.length - 1]} – {uniqueYears[0]}</div>
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mt-0.5">Years Archive</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HOW YOUR PREPARATION WORKS (The 4-Step Blueprint) ── */}
      <section className="py-20 bg-stone-50/60 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
              METHODOLOGY
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-stone-900">
              How Your Preparation Works
            </h2>
            <p className="text-stone-500 text-sm sm:text-base font-medium">
              A structured four-phase system engineered to take you from syllabus mastery to permanent recall.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 01 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-sm">
                  01
                </div>
                <h3 className="text-lg font-black text-stone-900">Official Syllabus</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  Know exactly what NTA expects. Explore the complete 10-unit hierarchy from Classical Poetry to Indian Arabic Literature.
                </p>
              </div>
              <div className="pt-2 text-xs font-bold text-emerald-800 flex items-center gap-1">
                <span>Unit-by-Unit Tree</span>
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-sm">
                  02
                </div>
                <h3 className="text-lg font-black text-stone-900">Real PYQs</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  Solve actual exam questions from 2004 to 2024. Full Arabic text with tashkeel, authentic options, and verified official keys.
                </p>
              </div>
              <div className="pt-2 text-xs font-bold text-emerald-800 flex items-center gap-1">
                <span>20+ Years Archive</span>
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-sm">
                  03
                </div>
                <h3 className="text-lg font-black text-stone-900">Targeted Practice</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  Simulate real CBT exams with instant evaluations, automatic mistake tracking, and unit-wise performance diagnostics.
                </p>
              </div>
              <div className="pt-2 text-xs font-bold text-emerald-800 flex items-center gap-1">
                <span>Mistake Logging</span>
              </div>
            </div>

            {/* Step 04 */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-7 border border-emerald-800 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-emerald-300 border border-emerald-700 flex items-center justify-center font-black text-sm">
                  04
                </div>
                <h3 className="text-lg font-black text-white">Memory & Recall</h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-medium">
                  Don&apos;t just solve and forget. Craft your personal memory tricks and review them across strict 5-level spaced intervals.
                </p>
              </div>
              <div className="pt-2 text-xs font-bold text-emerald-400 flex items-center gap-1">
                <span>5-Level Retention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. EXPLORE THE SYLLABUS: Concise Preview ── */}
      <section className="py-20 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 mb-1">
                SYLLABUS MATRIX
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Explore the Official 10 Units
              </h2>
              <p className="text-stone-500 text-sm font-medium mt-0.5">
                Every unit is mapped with its major authors, literary schools, and past questions.
              </p>
            </div>

            <Link
              href="/syllabus"
              className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <span>View Complete Syllabus Hierarchy</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {unitsList.slice(0, 10).map((u) => (
              <Link
                key={u.id}
                href={`/syllabus/${u.unit_number}`}
                className="bg-stone-50/80 hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-300 rounded-2xl p-4 transition-all group flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-white border border-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center">
                    {u.unit_number}
                  </span>
                  <span className="text-[11px] font-bold text-stone-400 group-hover:text-emerald-700 transition-colors">
                    {u._count.questions} Questions
                  </span>
                </div>

                <div>
                  <div
                    dir="rtl"
                    lang="ar"
                    className="font-arabic font-bold text-stone-900 text-base line-clamp-1 text-right mb-0.5"
                  >
                    {u.name_arabic}
                  </div>
                  <div className="text-xs font-bold text-stone-600 line-clamp-1">
                    {u.name_english}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PRACTICE REAL PYQs: Concise Year Preview ── */}
      <section className="py-20 bg-stone-50/50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 mb-1">
                EXAM PAPERS ARCHIVE
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Practice Real Past Papers (2004–2024)
              </h2>
              <p className="text-stone-500 text-sm font-medium mt-0.5">
                Authentic papers with Paper II (Core) and Paper III (Advanced) configurations.
              </p>
            </div>

            <Link
              href="/pyq"
              className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Browse All Exam Papers</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Clean Years Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {uniqueYears.map((yr) => {
              const count = papers.filter((p) => p.year === yr).length;
              return (
                <Link
                  key={yr}
                  href={`/pyq/${yr}`}
                  className="bg-white border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/40 rounded-2xl p-3.5 text-center transition-all group"
                >
                  <div className="text-lg font-black text-stone-900 group-hover:text-emerald-900 transition-colors">
                    {yr}
                  </div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">
                    {count} {count === 1 ? 'Paper' : 'Papers'}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. "DON'T JUST SOLVE. REMEMBER." (The Personal Memory Feature Spotlight) ── */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase">
                <Brain size={14} />
                THE MEMORY DIFFERENTIATOR
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
                Don&apos;t Just Solve.<br />
                <span className="text-emerald-700">Remember What You Learn.</span>
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-medium">
                Arabic literature requires remembering hundreds of authors, birth/death dates, diwans,
                and linguistic terms. Standard practice tools let you guess and move on.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-stone-700 font-medium">
                    <strong className="text-stone-900">Personal Mnemonics & Formulas:</strong> Write your own memory tricks on any question card.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-stone-700 font-medium">
                    <strong className="text-stone-900">Question-to-Question Linking:</strong> Connect questions sharing the same author, era, or counter-concept.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-stone-700 font-medium">
                    <strong className="text-stone-900">Strict 5-Level Spaced Recall:</strong> Review at 24h, 3d, 1w, 2-3w, and 1-2mo to lock permanent mastery.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/memories"
                  className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Explore Memory Engine</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Visual Card Demonstrating Memory Connection */}
            <div className="lg:col-span-6">
              <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-stone-800 pb-4 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[11px] border border-emerald-500/30">
                    SAMPLE QUESTION CARD
                  </span>
                  <span className="text-stone-400 font-mono">2023 Paper II • Q14</span>
                </div>

                {/* Question */}
                <div
                  dir="rtl"
                  lang="ar"
                  className="font-arabic font-extrabold text-white text-lg sm:text-xl leading-relaxed text-right"
                >
                  من مؤلف كتاب &quot;الأغاني&quot; في الأدب العربي؟
                </div>

                {/* Student's Personal Memory Anchor */}
                <div className="bg-emerald-950/60 rounded-2xl p-4 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    <span>Your Personal Memory Connection</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-800 text-white text-[10px]">Trick</span>
                  </div>
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic font-bold text-emerald-100 text-sm leading-relaxed text-right"
                  >
                    أبو الفرج الأصفهاني = (أصفهان + 24 جزء + طرب الأغاني)
                  </p>
                </div>

                {/* 5-Level Progress Visual */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                    <span>5-Level Retention Status</span>
                    <span className="text-emerald-400 font-bold">Level 3 of 5 (1 Week)</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="h-2 rounded-full bg-emerald-500" />
                    <div className="h-2 rounded-full bg-emerald-500" />
                    <div className="h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/40" />
                    <div className="h-2 rounded-full bg-stone-700" />
                    <div className="h-2 rounded-full bg-stone-700" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. FINAL CALL TO ACTION ── */}
      <section className="py-20 bg-stone-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Start your preparation with structure and clarity.
          </h2>
          <p className="text-stone-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Join students preparing for UGC NET/JRF Arabic with official syllabus coverage and previous years&apos; question papers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/syllabus"
              className="px-8 py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg text-center inline-flex items-center justify-center gap-2"
            >
              <Layers size={18} />
              <span>Explore Syllabus</span>
            </Link>
            <Link
              href="/pyq"
              className="px-8 py-4 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white font-bold text-sm sm:text-base rounded-xl transition-all text-center inline-flex items-center justify-center gap-2"
            >
              <BookOpen size={18} />
              <span>Browse PYQs</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
