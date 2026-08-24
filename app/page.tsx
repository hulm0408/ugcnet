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
  Sparkles,
} from 'lucide-react';
import prisma from '@/lib/db';
import PreparationJourneySvg from '@/components/home/PreparationJourneySvg';
import { getActiveSubjectServer } from '@/lib/subjectContext';
import { getSubjectLocalizedContent } from '@/lib/subjectContent';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const activeSubject = await getActiveSubjectServer();
  const totalQuestions = await prisma.question.count({
    where: { content_status: 'PUBLISHED', subject_id: activeSubject.id },
  });

  return {
    title: `Master UGC NET ${activeSubject.name} — Official Syllabus, Real PYQs & Mock Tests`,
    description: `Master UGC NET ${activeSubject.name} (Code ${activeSubject.code}) the smart way. Solve real past exam questions (${totalQuestions.toLocaleString()}+ Qs), track your weak areas, and practice authentic NTA CBT tests.`,
    alternates: { canonical: '/' },
  };
}

export default async function HomePage() {
  const activeSubject = await getActiveSubjectServer();
  const content = getSubjectLocalizedContent(activeSubject);

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
      {/* ── 1. HERO SECTION: Dynamically Localized to Active Subject ── */}
      <section className="relative bg-stone-950 text-white pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Localized Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {content.heroBadge}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.14]">
                {content.headline} <br />
                <span className="text-emerald-400">{content.headlineHighlight}</span>
              </h1>

              {content.headlineNative && (
                <div
                  dir={content.direction}
                  className={`text-lg sm:text-xl text-emerald-200/90 leading-relaxed font-bold ${
                    content.direction === 'rtl' ? 'font-arabic' : 'font-sans'
                  }`}
                >
                  {content.headlineNative}
                </div>
              )}

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                {content.description}
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
                      : content.ctaPractice}
                  </span>
                </Link>
                <Link
                  href="/syllabus"
                  className="px-7 py-3.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white font-bold text-sm sm:text-base rounded-xl transition-all text-center inline-flex items-center justify-center gap-2"
                >
                  <Layers size={17} />
                  <span>{content.ctaSyllabus}</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Flow Graphic */}
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
              <div className="text-2xl sm:text-3xl font-black text-white">
                {totalQuestions > 0 ? `${totalQuestions.toLocaleString()}+` : '3,000+'}
              </div>
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">
                {activeSubject.name} Questions
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

      {/* ── 3. SUBJECT PEDAGOGY & CORE METHODOLOGY ── */}
      <section className="py-16 bg-stone-50/70 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-1.5">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
              CURRICULUM & METHODOLOGY
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              {content.whySectionTitle}
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm font-medium">
              {content.whySectionSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.features.map((feat, idx) => (
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
                  0{idx + 1}
                </div>
                <div>
                  <h3 className={`text-base font-black ${idx === 3 ? 'text-white' : 'text-stone-900'}`}>
                    {feat.title}
                  </h3>
                  <div
                    className={`text-[11px] font-bold uppercase tracking-wider mt-0.5 ${
                      idx === 3 ? 'text-emerald-400' : 'text-emerald-700'
                    }`}
                  >
                    {feat.subtitle}
                  </div>
                </div>
                <p
                  className={`text-xs leading-relaxed font-medium ${
                    idx === 3 ? 'text-stone-300' : 'text-stone-600'
                  }`}
                >
                  {feat.description}
                </p>
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
                {activeSubject.name} Official Units
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-0.5">
                {content.curriculumBadge}
              </p>
            </div>

            <Link
              href="/syllabus"
              className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <span>Explore {activeSubject.name} Syllabus</span>
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
                        dir={activeSubject.direction}
                        className={`font-bold text-stone-900 text-sm line-clamp-1 ${
                          activeSubject.direction === 'rtl' ? 'font-arabic text-right' : 'font-sans'
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
                10 Units for {activeSubject.name} (Code {activeSubject.code})
              </div>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Official NTA curriculum mapping is active. Click below to view topic breakdown.
              </p>
              <div className="pt-2">
                <Link
                  href="/syllabus"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl"
                >
                  <span>View {activeSubject.name} Curriculum</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 5. PAST PAPERS ARCHIVE ── */}
      <section className="py-16 bg-stone-50/60 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 mb-1">
                PAST PAPERS ARCHIVE
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                {activeSubject.name} Previous Year Papers
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-0.5">
                Authentic NTA Papers with official keys and scoring.
              </p>
            </div>

            <Link
              href="/pyq"
              className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <span>Browse All {activeSubject.name} Papers</span>
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
                {activeSubject.name} PYQ Papers
              </div>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Practice official previous year questions in timed NTA CBT exam mode.
              </p>
              <div className="pt-2">
                <Link
                  href="/pyq"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl"
                >
                  <span>Open {activeSubject.name} Papers</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 6. FINAL CALL TO ACTION ── */}
      <section className="py-16 bg-stone-950 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Start your {activeSubject.name} preparation today.
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm max-w-lg mx-auto font-medium">
            Join students preparing for UGC NET/JRF {activeSubject.name} (Code {activeSubject.code}) with official syllabus coverage and past papers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href={freeBenchmarkPaper ? `/practice?paperId=${freeBenchmarkPaper.id}` : '/practice'}
              className="px-7 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg text-center inline-flex items-center justify-center gap-2"
            >
              <Play size={15} fill="currentColor" />
              <span>{content.ctaPractice}</span>
            </Link>
            <Link
              href="/syllabus"
              className="px-7 py-3 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white font-bold text-xs sm:text-sm rounded-xl transition-all text-center inline-flex items-center justify-center gap-2"
            >
              <Layers size={15} />
              <span>{content.ctaSyllabus}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
