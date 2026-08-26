import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BookOpen,
  Calendar,
  Layers,
  ArrowRight,
  Brain,
  CheckCircle2,
  Play,
  ChevronRight,
  ShieldCheck,
  GraduationCap,
  UserCheck,
} from 'lucide-react';
import prisma from '@/lib/db';
import { getSubjectConfig } from '@/config/subjects/registry';
import RealCbtInterfacePreview from '@/components/home/RealCbtInterfacePreview';
import StudentTestimonials from '@/components/home/StudentTestimonials';

export const dynamic = 'force-dynamic';

interface SubjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SubjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const subjectDb = await prisma.subject.findFirst({
    where: {
      OR: [
        { slug },
        { slug: { startsWith: slug } },
        { slug: slug.replace(/-and-applications$/, '') },
        { slug: `${slug}-and-applications` },
      ],
    },
  });
  if (!subjectDb) {
    return { title: 'Subject Not Found' };
  }

  const config = getSubjectConfig(subjectDb.slug, subjectDb);
  const totalQuestions = await prisma.question.count({
    where: { content_status: 'PUBLISHED', subject_id: subjectDb.id },
  });

  return {
    title: `UGC NET ${config.name} (${config.nativeName}) — 100-Question Mock Test, Syllabus & Solved PYQs`,
    description: `Prepare for UGC NET ${config.name} (Code ${config.code}). ${totalQuestions.toLocaleString()}+ authentic NTA questions, 10 official units, personal mistake tracking, and CBT simulation.`,
    alternates: { canonical: `/subject/${subjectDb.slug}` },
  };
}

export default async function DedicatedSubjectLandingPage({ params }: SubjectPageProps) {
  const { slug } = await params;

  const subjectDb = await prisma.subject.findFirst({
    where: {
      OR: [
        { slug },
        { slug: { startsWith: slug } },
        { slug: slug.replace(/-and-applications$/, '') },
        { slug: `${slug}-and-applications` },
      ],
    },
  });
  if (!subjectDb) {
    notFound();
  }

  const config = getSubjectConfig(subjectDb.slug, subjectDb);

  const [totalQuestions, totalPapers, totalUnits, papers, unitsList, mockPaper] = await Promise.all([
    prisma.question.count({
      where: { content_status: 'PUBLISHED', subject_id: subjectDb.id },
    }),
    prisma.examPaper.count({
      where: { content_status: 'PUBLISHED', subject_id: subjectDb.id },
    }),
    prisma.syllabusUnit.count({
      where: { subject_id: subjectDb.id },
    }),
    prisma.examPaper.findMany({
      where: { content_status: 'PUBLISHED', subject_id: subjectDb.id },
      select: { year: true, paper_number: true, display_name: true, is_free_benchmark: true, id: true, is_mock_test: true },
      orderBy: { year: 'desc' },
    }),
    prisma.syllabusUnit.findMany({
      where: { subject_id: subjectDb.id },
      orderBy: { unit_number: 'asc' },
      include: {
        _count: {
          select: { broad_topics: true, questions: true },
        },
      },
    }),
    prisma.examPaper.findFirst({
      where: {
        subject_id: subjectDb.id,
        is_mock_test: true,
      },
    }),
  ]);

  const uniqueYears = Array.from(new Set(papers.filter((p) => !p.is_mock_test).map((p) => p.year))).sort((a, b) => b - a);

  return (
    <div className="flex-1 bg-[#FBF9F5] text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* ── 1. DEDICATED SUBJECT HERO ── */}
      <section className="border-b border-stone-200/90 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-mono font-semibold uppercase tracking-wider shadow-2xs">
                <GraduationCap size={14} className="text-emerald-800" />
                <span>UGC NET / JRF • Code {config.code}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-stone-950 leading-[1.15]">
                UGC NET &amp; JRF in{' '}
                <span className="text-emerald-800 italic">{config.name}</span>.
              </h1>

              {config.nativeName && (
                <div
                  dir={config.theme.scriptDirection}
                  className={`text-xl sm:text-2xl text-stone-700 font-bold ${
                    config.theme.scriptDirection === 'rtl' ? 'font-arabic' : 'font-serif'
                  }`}
                >
                  {config.nativeName}
                </div>
              )}

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                {config.description} Solve authentic 2004–2024 NTA exam papers under real 160-minute CBT conditions, link missed questions to personal memory anchors, and master the complete 10-unit curriculum.
              </p>

              {/* Direct Study Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={mockPaper ? `/practice?paperId=${mockPaper.id}&type=mock` : '/mocks'}
                  className="px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm text-center inline-flex items-center justify-center gap-2 active:scale-95"
                >
                  <Play size={16} fill="currentColor" />
                  <span>Start 100-Question Mock Test 1</span>
                </Link>
                <Link
                  href="/syllabus"
                  className="px-7 py-3.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 hover:text-stone-900 font-semibold text-sm rounded-xl transition-all text-center inline-flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Layers size={16} />
                  <span>Explore 10-Unit Syllabus</span>
                </Link>
              </div>

              {/* Reassurance Strip */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-medium pt-1">
                <span>✓ 100% Free Benchmark Exam</span>
                <span>✓ Reconciled Final Keys</span>
                <span>✓ No Signup Required to Start</span>
              </div>

            </div>

            {/* Right Column: Real CBT Interface Preview */}
            <div className="lg:col-span-6 flex justify-center">
              <RealCbtInterfacePreview
                subjectName={config.name}
                subjectCode={config.code}
                nativeName={config.nativeName}
                direction={config.theme.scriptDirection}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. METRICS STRIP ── */}
      <section className="bg-stone-900 text-stone-300 py-6 border-b border-stone-800 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-stone-800">
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {totalQuestions > 0 ? `${totalQuestions.toLocaleString()}+` : '3,150+'}
              </div>
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mt-0.5">
                {config.name} Solved Questions
              </div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {totalPapers > 0 ? totalPapers : '45+'}
              </div>
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mt-0.5">
                Exam Papers &amp; Mocks
              </div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {totalUnits > 0 ? totalUnits : 10} Units
              </div>
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mt-0.5">
                Full Curriculum Blueprint
              </div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {uniqueYears.length > 0 ? `${uniqueYears[uniqueYears.length - 1]} – ${uniqueYears[0]}` : '2004 – 2024'}
              </div>
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mt-0.5">
                20-Year Archive
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. 10-UNIT SYLLABUS BLUEPRINT ── */}
      <section className="py-16 md:py-24 bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 mb-1">
                CURRICULUM ARCHITECTURE
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                {config.name} — 10-Unit Syllabus Architecture
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-0.5">
                Explore every unit, topic, and concept node for {config.name}.
              </p>
            </div>

            <Link
              href="/syllabus"
              className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <span>View Full Syllabus Tree</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unitsList.map((unit) => (
              <Link
                key={unit.id}
                href={`/syllabus/${unit.unit_number}`}
                className="group block p-5 bg-[#FAF9F6] hover:bg-emerald-50/40 border border-stone-200/90 hover:border-emerald-700/50 rounded-2xl transition-all shadow-2xs hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 text-stone-700 group-hover:bg-emerald-800 group-hover:text-white group-hover:border-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 transition-colors mt-0.5">
                      {unit.unit_number.toString().padStart(2, '0')}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div
                        dir={config.theme.scriptDirection}
                        lang={config.theme.scriptDirection === 'rtl' ? 'ar' : undefined}
                        className={`font-bold text-base sm:text-lg text-stone-900 group-hover:text-emerald-950 transition-colors ${
                          config.theme.scriptDirection === 'rtl' ? 'font-arabic text-right' : 'font-sans text-left'
                        }`}
                      >
                        {unit.name_arabic || unit.name_english}
                      </div>
                      {unit.name_english && unit.name_arabic && (
                        <div className="text-stone-500 text-xs sm:text-sm font-medium line-clamp-1">
                          {unit.name_english}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-stone-300 group-hover:text-emerald-800 transition-colors pl-1 shrink-0 pt-1">
                    <ChevronRight size={18} />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-stone-200/60 text-[11px] font-medium text-stone-500">
                  <span>{unit._count.broad_topics} Broad Topics</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-emerald-900 font-bold">
                    {unit._count.questions} Solved Questions
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. 20-YEAR PAST EXAMINATION ARCHIVE ── */}
      <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 mb-1">
                20-YEAR ARCHIVE
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                {config.name} Previous Year Papers (2004–2024)
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mt-0.5">
                Every year contains authentic separated examination papers.
              </p>
            </div>

            <Link
              href="/pyq"
              className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <span>Browse All Papers</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {uniqueYears.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
              {uniqueYears.map((yr) => {
                const count = papers.filter((p) => p.year === yr && !p.is_mock_test).length;
                return (
                  <Link
                    key={yr}
                    href={`/pyq/${yr}`}
                    className="bg-white border border-stone-200 hover:border-emerald-700 hover:bg-emerald-50/40 rounded-2xl p-3.5 text-center transition-all group shadow-2xs hover:shadow-sm"
                  >
                    <div className="text-base font-bold text-stone-900 group-hover:text-emerald-950 transition-colors">
                      {yr}
                    </div>
                    <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mt-0.5">
                      {count} {count === 1 ? 'Paper' : 'Papers'}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── 5. VERIFIABLE STUDENT TESTIMONIALS ── */}
      <StudentTestimonials />

      {/* ── 6. CALL TO ACTION ── */}
      <section className="py-16 md:py-24 bg-stone-950 text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight">
            Begin your {config.name} journey today.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
            Practice full-length 100-question CBT mock tests and historical papers with verified curriculum tagging.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href={mockPaper ? `/practice?paperId=${mockPaper.id}&type=mock` : '/mocks'}
              className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-all shadow-sm text-center inline-flex items-center justify-center gap-2 active:scale-95"
            >
              <Play size={16} fill="currentColor" />
              <span>Start 100-Question Mock Test 1</span>
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white font-semibold text-sm rounded-xl transition-all text-center inline-flex items-center justify-center gap-2"
            >
              <span>View Access Plans</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
