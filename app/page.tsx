import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Layers,
  ArrowRight,
  Brain,
  CheckCircle2,
  Play,
  Target,
} from 'lucide-react';
import prisma from '@/lib/db';
import { getActiveSubjectServer } from '@/lib/subjectContext';
import { getSubjectConfig } from '@/config/subjects/registry';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const activeSubject = await getActiveSubjectServer();
  const config = getSubjectConfig(activeSubject.slug, activeSubject);
  const totalQuestions = await prisma.question.count({
    where: { content_status: 'PUBLISHED', subject_id: activeSubject.id },
  });

  return {
    title: `Master UGC NET ${config.name} (${config.nativeName}) — Syllabus, Real PYQs & CBT Mock Tests`,
    description: `Master UGC NET ${config.name} (Code ${config.code}) the smart way. ${totalQuestions.toLocaleString()}+ authentic questions, official 10 units, mistake tracking, and CBT simulation.`,
    alternates: { canonical: '/' },
  };
}

export default async function HomePage() {
  const activeSubject = await getActiveSubjectServer();
  const config = getSubjectConfig(activeSubject.slug, activeSubject);

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
      {/* ── 1. HERO SECTION: Tailored Subject Identity & Bespoke Vector Art ── */}
      <section className="relative bg-stone-950 text-white pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Localized Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                UGC NET / JRF {config.name.toUpperCase()} (CODE {config.code}) • PREP PLATFORM
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.14]">
                {config.positioningHeadline} <br />
                <span className="text-emerald-400">{config.positioningHighlight}</span>
              </h1>

              {config.nativeName && (
                <div
                  dir={config.theme.scriptDirection}
                  className={`text-lg sm:text-xl text-emerald-200/90 leading-relaxed font-bold ${
                    config.theme.scriptDirection === 'rtl' ? 'font-arabic' : 'font-sans'
                  }`}
                >
                  {config.nativeName}
                </div>
              )}

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                {config.description}
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <Link
                  href={freeBenchmarkPaper ? `/practice?paperId=${freeBenchmarkPaper.id}` : '/pyq'}
                  className="px-7 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg hover:shadow-emerald-900/40 text-center inline-flex items-center justify-center gap-2 active:scale-95"
                >
                  <Play size={17} fill="currentColor" />
                  <span>
                    {freeBenchmarkPaper
                      ? `Take ${freeBenchmarkPaper.display_name} (Free Mock)`
                      : config.ctaPractice}
                  </span>
                </Link>
                <Link
                  href="/syllabus"
                  className="px-7 py-3.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white font-bold text-sm sm:text-base rounded-xl transition-all text-center inline-flex items-center justify-center gap-2"
                >
                  <Layers size={17} />
                  <span>{config.ctaSyllabus}</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Bespoke Vector Art */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                className="w-full max-w-md aspect-[500/360] drop-shadow-2xl"
                dangerouslySetInnerHTML={{ __html: config.theme.heroSvgIllustration }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. DATABASE-DRIVEN METRICS STRIP ── */}
      <section className="bg-stone-900 text-stone-300 py-5 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-stone-800">
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-white">
                {totalQuestions > 0 ? `${totalQuestions.toLocaleString()}+` : '3,000+'}
              </div>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">
                {config.name} Questions
              </div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-white">
                {totalPapers > 0 ? totalPapers : '45+'}
              </div>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">
                Past Papers
              </div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-white">
                {totalUnits > 0 ? totalUnits : 10}
              </div>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">
                Official Units
              </div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-white">
                {uniqueYears.length > 0 ? `${uniqueYears[uniqueYears.length - 1]} – ${uniqueYears[0]}` : '2004 – 2024'}
              </div>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">
                Exam Archive
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PEDAGOGY PILLARS ── */}
      <section className="py-16 bg-stone-50/70 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-1.5">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
              CURRICULUM & METHODOLOGY
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              {config.whySectionTitle}
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm font-medium">
              {config.whySectionSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-5 border shadow-sm space-y-2.5 ${
                  idx === 3
                    ? 'bg-emerald-950 text-white border-emerald-800'
                    : 'bg-white text-stone-900 border-stone-200/90'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs border ${
                    idx === 3
                      ? 'bg-emerald-800 text-emerald-300 border-emerald-700'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {pillar.number}
                </div>
                <div>
                  <h3 className={`text-base font-black ${idx === 3 ? 'text-white' : 'text-stone-900'}`}>
                    {pillar.title}
                  </h3>
                  <div
                    className={`text-[11px] font-bold uppercase tracking-wider mt-0.5 ${
                      idx === 3 ? 'text-emerald-400' : 'text-emerald-700'
                    }`}
                  >
                    {pillar.subtitle}
                  </div>
                </div>
                <p
                  className={`text-xs leading-relaxed font-medium ${
                    idx === 3 ? 'text-stone-300' : 'text-stone-600'
                  }`}
                >
                  {pillar.description}
                </p>

                {pillar.keyTerms && pillar.keyTerms.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {pillar.keyTerms.map((term, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                          idx === 3
                            ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700'
                            : 'bg-stone-100 text-stone-700 border border-stone-200'
                        }`}
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. OFFICIAL SYLLABUS SECTION ── */}
      <section className="py-16 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 mb-1">
                SYLLABUS
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                {config.name} Official Units
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-0.5">
                {config.curriculumBadge}
              </p>
            </div>

            <Link
              href="/syllabus"
              className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <span>Explore {config.name} Syllabus</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {unitsList.length > 0 ? (
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
                    {u.name_arabic && (
                      <div
                        dir={config.theme.scriptDirection}
                        className={`font-bold text-stone-900 text-sm line-clamp-1 ${
                          config.theme.scriptDirection === 'rtl' ? 'font-arabic text-right' : 'font-sans'
                        }`}
                      >
                        {u.name_arabic}
                      </div>
                    )}
                    <div className="text-[11px] font-bold text-stone-500 line-clamp-1 mt-0.5">
                      {u.name_english}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-stone-50 rounded-3xl border border-stone-200 text-center space-y-2">
              <BookOpen size={28} className="mx-auto text-stone-400" />
              <div className="text-sm font-bold text-stone-800">
                10 Units for {config.name} (Code {config.code})
              </div>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Official NTA curriculum mapping is active. Click below to view topic breakdown.
              </p>
              <div className="pt-2">
                <Link
                  href="/syllabus"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl"
                >
                  <span>View {config.name} Curriculum</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 5. "DON'T JUST SOLVE. REMEMBER." (Subject-Specific Memory Anchor) ── */}
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
                Standard practice apps let you guess answers and forget them tomorrow. Our platform helps you link difficult {config.name} questions to personal memory tricks and reinforces them through spaced repetition.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-stone-700 font-medium">
                    <strong className="text-stone-900">Personal Mnemonics & Formulas:</strong> Anchor difficult names, dates, rules, and taxonomies.
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

            {/* Subject-Specific Visual Example Card */}
            <div className="lg:col-span-6">
              <div className="bg-stone-900 text-white rounded-2xl p-5 sm:p-6 border border-stone-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3 text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] border border-emerald-500/30">
                    SAMPLE QUESTION CARD
                  </span>
                  <span className="text-stone-400 font-mono text-[11px]">{config.memoryExample.questionMeta}</span>
                </div>

                <div
                  dir={config.memoryExample.direction || config.theme.scriptDirection}
                  className={`font-extrabold text-white text-base leading-relaxed ${
                    config.memoryExample.direction === 'rtl' ? 'font-arabic text-right' : 'font-sans text-left'
                  }`}
                >
                  {config.memoryExample.questionText}
                </div>

                <div className="bg-emerald-950/60 rounded-xl p-3.5 border border-emerald-500/40 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    <span>Your Personal Memory Connection</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-800 text-white text-[9px]">Trick</span>
                  </div>
                  <p
                    dir={config.memoryExample.direction || config.theme.scriptDirection}
                    className={`font-bold text-emerald-100 text-xs leading-relaxed ${
                      config.memoryExample.direction === 'rtl' ? 'font-arabic text-right' : 'font-sans text-left'
                    }`}
                  >
                    {config.memoryExample.connectionTrick}
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

      {/* ── 6. PAST PAPERS ARCHIVE ── */}
      <section className="py-16 bg-stone-50/60 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 mb-1">
                PAST PAPERS ARCHIVE
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                {config.name} Previous Year Papers
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-0.5">
                Authentic NTA Papers with official keys and scoring.
              </p>
            </div>

            <Link
              href="/pyq"
              className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <span>Browse All {config.name} Papers</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {uniqueYears.length > 0 ? (
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
          ) : (
            <div className="p-8 bg-white rounded-3xl border border-stone-200 text-center space-y-2">
              <Calendar size={28} className="mx-auto text-stone-400" />
              <div className="text-sm font-bold text-stone-800">
                {config.name} PYQ Papers
              </div>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Practice official previous year questions in timed NTA CBT exam mode.
              </p>
              <div className="pt-2">
                <Link
                  href="/pyq"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl"
                >
                  <span>Open {config.name} Papers</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 7. FINAL CALL TO ACTION ── */}
      <section className="py-16 bg-stone-950 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Start your {config.name} preparation today.
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm max-w-lg mx-auto font-medium">
            Join students preparing for UGC NET/JRF {config.name} (Code {config.code}) with official syllabus coverage and past papers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href={freeBenchmarkPaper ? `/practice?paperId=${freeBenchmarkPaper.id}` : '/practice'}
              className="px-7 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg text-center inline-flex items-center justify-center gap-2"
            >
              <Play size={15} fill="currentColor" />
              <span>{config.ctaPractice}</span>
            </Link>
            <Link
              href="/syllabus"
              className="px-7 py-3 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white font-bold text-xs sm:text-sm rounded-xl transition-all text-center inline-flex items-center justify-center gap-2"
            >
              <Layers size={15} />
              <span>{config.ctaSyllabus}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
