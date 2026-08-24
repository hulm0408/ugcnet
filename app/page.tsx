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
  RotateCcw,
  Play,
} from 'lucide-react';
import prisma from '@/lib/db';
import PreparationJourneySvg from '@/components/home/PreparationJourneySvg';
import { getActiveSubjectServer } from '@/lib/subjectContext';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const activeSubject = await getActiveSubjectServer();
  const totalQuestions = await prisma.question.count({
    where: { content_status: 'PUBLISHED', subject_id: activeSubject.id },
  });

  return {
    title: `Master UGC NET ${activeSubject.name} — Official Syllabus, Real PYQs & Mock Tests`,
    description: `Master UGC NET ${activeSubject.name} the smart way. Solve real past exam questions (${totalQuestions.toLocaleString()}+ Qs), track your weak areas, and practice authentic NTA CBT tests.`,
    alternates: { canonical: '/' },
  };
}

export default async function HomePage() {
  const activeSubject = await getActiveSubjectServer();

  const [totalQuestions, totalPapers, totalUnits, papers, unitsList, freeBenchmarkPaper] = await Promise.all([
    prisma.question.count({
      where: { content_status: 'PUBLISHED', subject_id: activeSubject.id },
    }),
    prisma.examPaper.count({
      where: { content_status: 'PUBLISHED', subject_id: activeSubject.id },
    }),
    prisma.syllabusUnit.count({
      where: { subject_id: activeSubject.id },
    }),
    prisma.examPaper.findMany({
      where: { content_status: 'PUBLISHED', subject_id: activeSubject.id },
      select: { year: true, paper_number: true, display_name: true, is_free_benchmark: true, id: true },
      orderBy: { year: 'desc' },
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

  const uniqueYears = Array.from(new Set(papers.map((p) => p.year))).sort((a, b) => b - a);

  return (
    <div className="flex-1 overflow-hidden bg-white text-stone-900">
      {/* ── 1. HERO SECTION: Dynamic Subject Context ── */}
      <section className="relative bg-stone-950 text-white pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Focused Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                UGC NET / JRF {activeSubject.name.toUpperCase()} (CODE {activeSubject.code}) • PREP PLATFORM
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                Master UGC NET {activeSubject.name} — <br />
                <span className="text-emerald-400">the smart way.</span>
              </h1>

              {activeSubject.name_native && (
                <div
                  dir={activeSubject.direction}
                  className={`text-lg sm:text-xl text-emerald-200/90 leading-relaxed font-bold ${
                    activeSubject.direction === 'rtl' ? 'font-arabic' : 'font-sans'
                  }`}
                >
                  {activeSubject.name_native}
                </div>
              )}

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                Practice authentic {activeSubject.name} PYQs under official NTA exam conditions. Track your weak syllabus units and reinforce key concepts.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <Link
                  href={freeBenchmarkPaper ? `/practice?paperId=${freeBenchmarkPaper.id}` : '/pyq'}
                  className="px-7 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg hover:shadow-emerald-900/40 text-center inline-flex items-center justify-center gap-2 active:scale-95"
                >
                  <Play size={17} fill="currentColor" />
                  <span>{freeBenchmarkPaper ? 'Take Free Benchmark Mock Test' : 'Browse Exam Papers'}</span>
                </Link>
                <Link
                  href="/syllabus"
                  className="px-7 py-3.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white font-bold text-sm sm:text-base rounded-xl transition-all text-center inline-flex items-center justify-center gap-2"
                >
                  <Layers size={17} />
                  <span>Explore Syllabus</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive / Flow Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <PreparationJourneySvg />
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. DATABASE-DRIVEN METRICS STRIP ── */}
      <section className="bg-stone-900 text-stone-300 py-5 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-stone-800">
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-white">{totalQuestions.toLocaleString()}+</div>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">Exam Questions</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-white">{totalPapers}</div>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">Past Papers</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-white">{totalUnits}</div>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">Official Units</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-white">{uniqueYears[uniqueYears.length - 1]} – {uniqueYears[0]}</div>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">Years Archive</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THE PREPARATION & RETENTION LOOP ── */}
      <section className="py-16 bg-stone-50/70 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-1.5">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
              THE CORE METHODOLOGY
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              From Syllabus to Permanent Recall
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm font-medium">
              Solve past exam questions, identify weak spots, and lock difficult concepts into long-term memory.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 01 */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-xs">
                01
              </div>
              <h3 className="text-base font-black text-stone-900">Official Syllabus</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Know exactly what NTA expects. 10 structured units mapped down to authors, eras, and literary movements.
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-xs">
                02
              </div>
              <h3 className="text-base font-black text-stone-900">Authentic PYQs</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Solve 20+ years of official papers with Arabic tashkeel, verified answer keys, and dual-language explanations.
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-xs">
                03
              </div>
              <h3 className="text-base font-black text-stone-900">Targeted Practice</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Simulate timed CBT exams with instant evaluations and automatic logging of every mistaken question.
              </p>
            </div>

            {/* Step 04 */}
            <div className="bg-emerald-950 text-white rounded-2xl p-5 border border-emerald-800 shadow-md space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 text-emerald-300 border border-emerald-700 flex items-center justify-center font-black text-xs">
                04
              </div>
              <h3 className="text-base font-black text-white">Memory & Spaced Recall</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-medium">
                Don&apos;t just solve and forget. Craft your personal memory tricks and review them at 24h, 3d, 1w, 2-3w, and 1-2mo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. EXPLORE THE SYLLABUS: Compact, Quiet Overview ── */}
      <section className="py-16 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 mb-1">
                SYLLABUS
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                The 10 Official Units
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-0.5">
                Every unit organized by its core topics and past question bank.
              </p>
            </div>

            <Link
              href="/syllabus"
              className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <span>View Full Syllabus Matrix</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {unitsList.slice(0, 10).map((u) => (
              <Link
                key={u.id}
                href={`/syllabus/${u.unit_number}`}
                className="p-3.5 bg-stone-50 hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-300 rounded-2xl transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="w-6 h-6 rounded-lg bg-white border border-stone-200 text-stone-700 font-bold text-[11px] flex items-center justify-center">
                    {u.unit_number}
                  </span>
                  <span className="text-[11px] font-bold text-stone-400 group-hover:text-emerald-700 transition-colors">
                    {u._count.questions} Qs
                  </span>
                </div>

                <div>
                  <div
                    dir="rtl"
                    lang="ar"
                    className="font-arabic font-bold text-stone-900 text-sm line-clamp-1 text-right"
                  >
                    {u.name_arabic}
                  </div>
                  <div className="text-[11px] font-bold text-stone-500 line-clamp-1 mt-0.5">
                    {u.name_english}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PRACTICE REAL PYQs: Concise Timeline ── */}
      <section className="py-16 bg-stone-50/60 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 mb-1">
                PAST PAPERS
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                20 Years of Exam Archive (2004–2024)
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-0.5">
                Authentic NTA Papers with Paper II and Paper III configurations.
              </p>
            </div>

            <Link
              href="/pyq"
              className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <span>Browse All Exam Papers</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {uniqueYears.map((yr) => {
              const count = papers.filter((p) => p.year === yr).length;
              return (
                <Link
                  key={yr}
                  href={`/pyq/${yr}`}
                  className="bg-white border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/40 rounded-xl p-3 text-center transition-all group"
                >
                  <div className="text-base font-black text-stone-900 group-hover:text-emerald-900 transition-colors">
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

      {/* ── 6. "DON'T JUST SOLVE. REMEMBER." (The Memory Differentiator) ── */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase">
                <Brain size={14} />
                THE MEMORY DIFFERENTIATOR
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-tight">
                Don&apos;t Just Solve.<br />
                <span className="text-emerald-700">Remember What You Learn.</span>
              </h2>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-medium">
                Standard practice apps let you guess answers and forget them tomorrow. Our platform helps you link difficult questions to personal memory tricks and reinforces them through spaced repetition.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-stone-700 font-medium">
                    <strong className="text-stone-900">Personal Mnemonics & Formulas:</strong> Anchor author names, dates, and diwans.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-stone-700 font-medium">
                    <strong className="text-stone-900">Strict 5-Level Spaced Recall:</strong> Review at 24h, 3d, 1w, 2-3w, and 1-2mo to lock retention.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/memories"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-all inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>Explore Memory Engine</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Visual Example Card */}
            <div className="lg:col-span-6">
              <div className="bg-stone-900 text-white rounded-2xl p-5 sm:p-6 border border-stone-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3 text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] border border-emerald-500/30">
                    SAMPLE QUESTION CARD
                  </span>
                  <span className="text-stone-400 font-mono text-[11px]">2023 Paper II • Q14</span>
                </div>

                <div
                  dir="rtl"
                  lang="ar"
                  className="font-arabic font-extrabold text-white text-base leading-relaxed text-right"
                >
                  من مؤلف كتاب &quot;الأغاني&quot; في الأدب العربي؟
                </div>

                <div className="bg-emerald-950/60 rounded-xl p-3.5 border border-emerald-500/40 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    <span>Your Personal Memory Connection</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-800 text-white text-[9px]">Trick</span>
                  </div>
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic font-bold text-emerald-100 text-xs leading-relaxed text-right"
                  >
                    أبو الفرج الأصفهاني = (أصفهان + 24 جزء + طرب الأغاني)
                  </p>
                </div>

                <div className="pt-1 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span>5-Level Retention Status</span>
                    <span className="text-emerald-400 font-bold">Level 3 of 5 (1 Week)</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    <div className="h-1.5 rounded-full bg-emerald-500" />
                    <div className="h-1.5 rounded-full bg-emerald-500" />
                    <div className="h-1.5 rounded-full bg-emerald-400 ring-1 ring-emerald-400/40" />
                    <div className="h-1.5 rounded-full bg-stone-700" />
                    <div className="h-1.5 rounded-full bg-stone-700" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. FINAL CLEAN CALL TO ACTION ── */}
      <section className="py-16 bg-stone-950 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Start your preparation today.
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm max-w-lg mx-auto font-medium">
            Join students preparing for UGC NET/JRF Arabic with official syllabus coverage and past papers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/practice"
              className="px-7 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg text-center inline-flex items-center justify-center gap-2"
            >
              <Play size={15} fill="currentColor" />
              <span>Start Practicing</span>
            </Link>
            <Link
              href="/syllabus"
              className="px-7 py-3 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white font-bold text-xs sm:text-sm rounded-xl transition-all text-center inline-flex items-center justify-center gap-2"
            >
              <Layers size={15} />
              <span>Explore Syllabus</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
