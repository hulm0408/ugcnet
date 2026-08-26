import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  Clock,
  CheckCircle2,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Award,
} from 'lucide-react';
import prisma from '@/lib/db';
import { SUBJECT_REGISTRY } from '@/config/subjects/registry';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'UGC NET/JRF Mock Test Series — All 19 Subjects (100 Qs / 160 Mins CBT)',
  description:
    'Full-length 100-question NTA CBT Mock Tests across all 19 registered UGC NET subjects. Unit-by-unit syllabus distribution, real countdown timer, question palette, and detailed explanations.',
};

export default async function MockTestsHubPage() {
  // Fetch all mock test papers across all subjects with their question count
  const mockPapers = await prisma.examPaper.findMany({
    where: {
      is_mock_test: true,
      content_status: 'PUBLISHED',
    },
    include: {
      subject_ref: true,
      _count: {
        select: { questions: true },
      },
    },
    orderBy: {
      exam_name: 'asc',
    },
  });

  // Enrich with registry data for themes and native names
  const enrichedMocks = mockPapers.map((paper) => {
    const slug = paper.subject_ref?.slug || '';
    const config = SUBJECT_REGISTRY[slug];

    return {
      paper,
      slug,
      config,
      code: paper.subject_ref?.code || config?.code || '00',
      name: paper.subject_ref?.name || config?.name || paper.exam_name,
      nameNative: paper.subject_ref?.name_native || config?.nativeName || null,
      questionCount: paper._count.questions,
      themeColor: config?.theme?.primaryColor || '#059669',
      accentColor: config?.theme?.accentColor || '#10B981',
      tagline: config?.tagline || '10-Unit Full Syllabus Simulation',
    };
  });

  // Separate Paper 1 from Paper 2
  const paper1Mock = enrichedMocks.find((m) => m.code === '00' || m.slug === 'paper-1');
  const paper2Mocks = enrichedMocks
    .filter((m) => m.code !== '00' && m.slug !== 'paper-1')
    .sort((a, b) => (parseInt(a.code, 10) || 0) - (parseInt(b.code, 10) || 0));

  const totalQuestions = enrichedMocks.reduce((acc, m) => acc + m.questionCount, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124]">
      
      {/* ── HERO BANNER ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#DADCE0] bg-white py-14 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(#E8EAED_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D2E3FC] bg-[#E8F0FE] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#1A73E8]">
                <Sparkles className="h-3.5 w-3.5 text-[#1A73E8]" />
                <span>Official NTA CBT Exam Simulation</span>
              </div>

              <h1 className="font-serif text-3xl font-bold tracking-tight text-[#202124] sm:text-4xl lg:text-5xl leading-tight">
                UGC NET/JRF Mock Test Series
              </h1>

              <p className="text-sm sm:text-base leading-relaxed text-[#5F6368]">
                Authentic full-length CBT simulations across <strong className="font-semibold text-[#202124]">Paper 1 (General Aptitude)</strong> and all <strong className="font-semibold text-[#202124]">18 Paper 2 Subject Disciplines</strong>. Exactly 10 questions per unit across all 10 syllabus units with a 160-minute NTA countdown timer and verified final answer keys.
              </p>

              {/* Benchmark Highlights */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#5F6368] sm:gap-6 sm:text-sm pt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1E8E3E]" />
                  <span>100 Qs per Subject Mock</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#1A73E8]" />
                  <span>160 Minutes Exam Engine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-[#F29900]" />
                  <span>100% Free Benchmark Tests</span>
                </div>
              </div>
            </div>

            {/* Stats Badge */}
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#DADCE0] bg-white p-5 text-center shadow-sm sm:gap-4 sm:p-6">
              <div className="border-r border-[#DADCE0] pr-3 sm:pr-4">
                <div className="text-2xl font-sans font-bold tracking-tight text-[#202124] sm:text-3xl">19</div>
                <div className="mt-1 text-xs font-bold text-[#5F6368] uppercase tracking-wider">Subjects</div>
              </div>
              <div>
                <div className="text-2xl font-sans font-bold tracking-tight text-[#1A73E8] sm:text-3xl">
                  {totalQuestions.toLocaleString()}
                </div>
                <div className="mt-1 text-xs font-bold text-[#5F6368] uppercase tracking-wider">CBT Questions</div>
              </div>
              <div className="col-span-2 border-t border-[#DADCE0] pt-3 text-center text-xs font-bold text-[#5F6368]">
                ⚡ 10 Units Syllabus Covered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: MANDATORY GENERAL PAPER 1 ────────────────────────────────── */}
      {paper1Mock && (
        <section className="py-10 border-b border-[#DADCE0] bg-[#F8F9FA]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-[#DADCE0] bg-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-xs font-bold uppercase tracking-wider border border-[#D2E3FC]">
                    <span>MANDATORY FOR ALL 83+ SUBJECTS</span>
                    <span>•</span>
                    <span>CODE 00</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#202124] tracking-tight">
                    Paper 1: General Paper on Teaching &amp; Research Aptitude
                  </h2>

                  <p className="text-[#5F6368] text-xs sm:text-sm leading-relaxed font-medium">
                    Teaching Aptitude • Research Methodology • Reading Comprehension • ICT • Higher Education System • Mathematical &amp; Logical Reasoning • Data Interpretation • People &amp; Environment.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#1E8E3E] pt-1">
                    <span>✓ 50 High-Yield Questions</span>
                    <span>✓ 100 Marks Weightage</span>
                    <span>✓ 60-Min Practice Split</span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                  <Link
                    href={`/practice?paperId=${paper1Mock.paper.id}&type=mock&paperTitle=${encodeURIComponent(paper1Mock.paper.display_name || 'General Paper 1')}`}
                    className="px-6 py-3.5 bg-[#1A73E8] hover:bg-[#1557B0] text-white font-bold text-sm rounded-xl transition-all shadow-sm text-center flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Start Paper 1 Mock Test</span>
                    <ArrowRight size={15} />
                  </Link>

                  <Link
                    href="/syllabus"
                    className="px-6 py-3 bg-white hover:bg-[#F8F9FA] text-[#202124] font-bold text-xs rounded-xl transition-all text-center flex items-center justify-center gap-1.5 border border-[#DADCE0]"
                  >
                    <span>Explore Paper 1 Units</span>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 2: PAPER 2 SUBJECT-SPECIFIC DOMAIN MOCKS ─────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-[#DADCE0] pb-6 sm:flex-row sm:items-center">
            <div>
              <div className="text-xs font-bold text-[#1A73E8] uppercase tracking-widest mb-1">
                PAPER 2 DOMAIN TESTS
              </div>
              <h2 className="text-xl font-bold tracking-tight text-[#202124] sm:text-2xl font-serif">
                Select Your Registered Subject Paper
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-[#5F6368] font-medium">
                100 questions covering all 10 official syllabus units under live 160-minute CBT conditions.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#5F6368] border border-[#DADCE0] shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[#1E8E3E]" />
              <span>Full 10-Unit Distribution (10 Qs / Unit)</span>
            </div>
          </div>

          {/* Grid of Subject Mocks */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paper2Mocks.map((mock) => {
              const practiceUrl = `/practice?paperId=${mock.paper.id}&type=mock&paperTitle=${encodeURIComponent(mock.paper.display_name || mock.name)}`;
              return (
                <div
                  key={mock.paper.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#DADCE0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1A73E8] hover:shadow-md"
                >
                  {/* Card Top */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-lg bg-[#F8F9FA] border border-[#DADCE0] px-2.5 py-1 text-xs font-bold text-[#5F6368]">
                        Code {mock.code}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F0FE] border border-[#D2E3FC] px-2.5 py-0.5 text-xs font-bold text-[#1A73E8]">
                        <Zap className="h-3 w-3" />
                        100 Qs • 160m
                      </span>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-base sm:text-lg font-bold text-[#202124] group-hover:text-[#1A73E8] transition-colors">
                        {mock.name}
                      </h3>
                      {mock.nameNative && (
                        <p className="mt-0.5 text-xs sm:text-sm font-bold text-[#5F6368] font-serif">
                          {mock.nameNative}
                        </p>
                      )}
                      <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed font-medium text-[#5F6368]">
                        {mock.tagline}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="mt-5 space-y-1.5 border-t border-[#DADCE0] pt-4 text-xs font-medium text-[#5F6368]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#5F6368]">Syllabus Coverage:</span>
                        <span className="font-bold text-[#202124]">10 / 10 Units</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#5F6368]">Distribution:</span>
                        <span className="font-bold text-[#202124]">10 Qs / Unit</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#5F6368]">Exam Mode:</span>
                        <span className="font-bold text-[#1A73E8]">NTA CBT Simulator</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-6 pt-2">
                    <Link
                      href={practiceUrl}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white border border-[#DADCE0] px-4 py-3 text-center text-xs sm:text-sm font-bold text-[#1A73E8] transition-all duration-200 hover:bg-[#F8F9FA] hover:border-[#1A73E8] hover:shadow-sm active:scale-[0.99]"
                    >
                      <span>Start 100-Question Mock</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>

                    {mock.slug && (
                      <div className="mt-2 text-center">
                        <Link
                          href={`/subject/${mock.slug}`}
                          className="text-xs font-bold text-[#5F6368] hover:text-[#1A73E8] transition-colors"
                        >
                          View Subject Blueprint →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CBT INSTRUCTIONS ACCORDION / EXPLANATION ──────────────────────────── */}
      <section className="border-t border-[#DADCE0] bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#202124] sm:text-3xl tracking-tight">
              How the Live CBT Simulation Works
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6368]">
              Familiarize yourself with the exact examination controls before stepping into the exam hall.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#DADCE0] space-y-2 hover:shadow-sm transition-shadow">
              <div className="font-bold text-sm text-[#202124] flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center text-xs">1</span>
                <span>160-Minute NTA Countdown Engine</span>
              </div>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                The test strictly tracks your remaining time. Questions can be saved, cleared, or marked for review just like in the real NTA test center.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DADCE0] space-y-2 hover:shadow-sm transition-shadow">
              <div className="font-bold text-sm text-[#202124] flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center text-xs">2</span>
                <span>Exact 10-Question Per Unit Split</span>
              </div>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Every mock adheres strictly to the official syllabus balance (10 questions per unit across all 10 units), preventing bias toward favorite topics.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DADCE0] space-y-2 hover:shadow-sm transition-shadow">
              <div className="font-bold text-sm text-[#202124] flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center text-xs">3</span>
                <span>Post-Test Sectional Analytics</span>
              </div>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Upon submitting, immediately view your unit-by-unit score, identifying which units provided easy marks and where negative marks were lost.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DADCE0] space-y-2 hover:shadow-sm transition-shadow">
              <div className="font-bold text-sm text-[#202124] flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center text-xs">4</span>
                <span>Active Recall Spaced Repetition</span>
              </div>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Add tricky questions directly to your personal Memory Queue to be tested on Day 1, Day 3, Day 7, and Day 14.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
