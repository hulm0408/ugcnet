import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Layers,
  ArrowRight,
  Play,
  ChevronRight,
  GraduationCap,
  BookOpen,
  FileText,
  Brain,
  Sparkles,
  Trophy,
  CheckCircle2,
  Clock,
  Compass,
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
    title: `UGC NET/JRF ${config.name} (Code ${config.code}) — 160-Min CBT Mocks, Paper 1 & 20-Year Solved PYQs`,
    description: `Practice UGC NET ${config.name} (Code ${config.code}). ${totalQuestions.toLocaleString()}+ authentic NTA questions, 10 official units, 5-level spaced repetition, and CBT simulation.`,
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
      select: { year: true, paper_number: true, display_name: true, is_free_benchmark: true, id: true, is_mock_test: true },
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
        is_mock_test: true,
      },
    }),
  ]);

  return (
    <div className="flex-1 bg-[#03140E] text-white font-sans min-h-[90vh] flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full space-y-10">
        
        {/* ── 1. HEADER IDENTITY & HERO OVERVIEW ── */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A3325] border border-[#134E3A] text-[#00E699] text-xs font-bold tracking-wider">
            <GraduationCap size={14} className="text-[#00E699]" />
            <span>UGC NET / JRF • {config.name} (Code {config.code})</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            Master UGC NET with Precision &amp; Active Recall
          </h1>

          {config.nativeName && (
            <div
              dir={config.theme.scriptDirection}
              className={`text-xl sm:text-2xl text-[#00E699] font-bold ${
                config.theme.scriptDirection === 'rtl' ? 'font-arabic' : 'font-serif'
              }`}
            >
              {config.nativeName}
            </div>
          )}

          <p className="text-[#8EBDAE] text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            {totalQuestions.toLocaleString()}+ authentic NTA questions across {totalUnits} official units and {totalPapers} historical papers. Solved with official keys, 5-level spaced memory revision, and CBT test simulation.
          </p>

          {/* Primary & Secondary Call to Action */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/pyq"
              className="px-7 py-3.5 bg-[#00E699] hover:bg-[#00B377] text-[#03140E] font-extrabold text-sm rounded-2xl shadow-lg shadow-[#00E699]/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Start Learning</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href={freeBenchmarkPaper ? `/practice?paperId=${freeBenchmarkPaper.id}&type=mock` : '/mocks'}
              className="px-6 py-3.5 bg-[#0A3325] hover:bg-[#0D3A2B] text-white border border-[#134E3A] hover:border-[#00E699]/50 font-bold text-sm rounded-2xl transition-all flex items-center gap-2"
            >
              <Play size={14} fill="currentColor" className="text-[#00E699]" />
              <span>Take CBT Mock Exam</span>
            </Link>
          </div>
        </div>

        {/* ── 2. CORE STUDY FLOW ROADMAP ── */}
        <div className="bg-[#082B1F]/90 border border-[#134E3A] rounded-2xl p-4 sm:p-5">
          <div className="text-[11px] font-mono font-bold text-[#8EBDAE] uppercase tracking-wider mb-3 text-center sm:text-left">
            Recommended Preparation Workflow
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-white">
            <div className="flex items-center gap-2 bg-[#0A3325] px-3 py-1.5 rounded-xl border border-[#134E3A]">
              <span className="w-5 h-5 rounded-full bg-[#00E699] text-[#03140E] flex items-center justify-center text-[10px]">1</span>
              <span>PYQ / Syllabus</span>
            </div>
            <ChevronRight size={14} className="text-[#134E3A] hidden sm:block" />
            
            <div className="flex items-center gap-2 bg-[#0A3325] px-3 py-1.5 rounded-xl border border-[#134E3A]">
              <span className="w-5 h-5 rounded-full bg-[#00E699] text-[#03140E] flex items-center justify-center text-[10px]">2</span>
              <span>Learn &amp; Practice</span>
            </div>
            <ChevronRight size={14} className="text-[#134E3A] hidden sm:block" />

            <div className="flex items-center gap-2 bg-[#0A3325] px-3 py-1.5 rounded-xl border border-[#134E3A]">
              <span className="w-5 h-5 rounded-full bg-[#00E699] text-[#03140E] flex items-center justify-center text-[10px]">3</span>
              <span>CBT Mock</span>
            </div>
            <ChevronRight size={14} className="text-[#134E3A] hidden sm:block" />

            <div className="flex items-center gap-2 bg-[#0A3325] px-3 py-1.5 rounded-xl border border-[#134E3A]">
              <span className="w-5 h-5 rounded-full bg-[#00E699] text-[#03140E] flex items-center justify-center text-[10px]">4</span>
              <span>Result &amp; Weak Areas</span>
            </div>
            <ChevronRight size={14} className="text-[#134E3A] hidden sm:block" />

            <div className="flex items-center gap-2 bg-[#0A3325] px-3 py-1.5 rounded-xl border border-[#134E3A]">
              <span className="w-5 h-5 rounded-full bg-[#00E699] text-[#03140E] flex items-center justify-center text-[10px]">5</span>
              <span>5-Level Memory</span>
            </div>
          </div>
        </div>

        {/* ── 3. FOUR CORE PILLARS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Pillar 1: PYQ Library */}
          <Link
            href="/pyq"
            className="p-5 bg-[#082B1F] border border-[#134E3A] hover:border-[#00E699] rounded-2xl transition-all group space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[#0A3325] text-[#00E699] flex items-center justify-center font-bold">
                  <FileText size={17} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00E699] bg-[#0A3325] border border-[#134E3A] px-2 py-0.5 rounded-md">
                  2004–2023
                </span>
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-white group-hover:text-[#00E699] transition-colors">
                  PYQ Library
                </div>
                <p className="text-[#8EBDAE] text-xs mt-1 font-medium leading-relaxed">
                  Year → Paper → Part → Questions with official answer keys &amp; Google search.
                </p>
              </div>
            </div>
            <div className="pt-2 text-xs font-bold text-[#00E699] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Browse Papers</span>
              <ArrowRight size={12} />
            </div>
          </Link>

          {/* Pillar 2: Syllabus Knowledge Graph */}
          <Link
            href="/syllabus"
            className="p-5 bg-[#082B1F] border border-[#134E3A] hover:border-[#00E699] rounded-2xl transition-all group space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[#0A3325] text-[#00E699] flex items-center justify-center font-bold">
                  <BookOpen size={17} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00E699] bg-[#0A3325] border border-[#134E3A] px-2 py-0.5 rounded-md">
                  10 Units
                </span>
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-white group-hover:text-[#00E699] transition-colors">
                  Syllabus Graph
                </div>
                <p className="text-[#8EBDAE] text-xs mt-1 font-medium leading-relaxed">
                  Unit → Topic → Node → Questions hierarchy mapped to the official curriculum.
                </p>
              </div>
            </div>
            <div className="pt-2 text-xs font-bold text-[#00E699] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore Units</span>
              <ArrowRight size={12} />
            </div>
          </Link>

          {/* Pillar 3: CBT Mock Simulator */}
          <Link
            href="/mocks"
            className="p-5 bg-[#082B1F] border border-[#134E3A] hover:border-[#00E699] rounded-2xl transition-all group space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[#0A3325] text-[#00E699] flex items-center justify-center font-bold">
                  <Play size={17} fill="currentColor" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00E699] bg-[#0A3325] border border-[#134E3A] px-2 py-0.5 rounded-md">
                  160 Mins
                </span>
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-white group-hover:text-[#00E699] transition-colors">
                  CBT Mock Simulator
                </div>
                <p className="text-[#8EBDAE] text-xs mt-1 font-medium leading-relaxed">
                  Authentic NTA interface with 5-color palette, timer, and detailed score report.
                </p>
              </div>
            </div>
            <div className="pt-2 text-xs font-bold text-[#00E699] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Start Mock</span>
              <ArrowRight size={12} />
            </div>
          </Link>

          {/* Pillar 4: 5-Level Memory System */}
          <Link
            href="/memories"
            className="p-5 bg-[#082B1F] border border-[#134E3A] hover:border-[#00E699] rounded-2xl transition-all group space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[#0A3325] text-[#00E699] flex items-center justify-center font-bold">
                  <Brain size={17} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00E699] bg-[#0A3325] border border-[#134E3A] px-2 py-0.5 rounded-md">
                  SM-2
                </span>
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-white group-hover:text-[#00E699] transition-colors">
                  5-Level Memory
                </div>
                <p className="text-[#8EBDAE] text-xs mt-1 font-medium leading-relaxed">
                  24h → 3d → 1w → 3w → 2mo active recall engine for permanent mastery.
                </p>
              </div>
            </div>
            <div className="pt-2 text-xs font-bold text-[#00E699] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Review Due</span>
              <ArrowRight size={12} />
            </div>
          </Link>

        </div>

        {/* ── 4. QUICK SYLLABUS UNIT JUMP ── */}
        <div className="bg-[#082B1F] border border-[#134E3A] rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00E699]">
              10 Official Syllabus Units
            </h2>
            <Link href="/syllabus" className="text-xs font-bold text-[#8EBDAE] hover:text-white flex items-center gap-1">
              <span>Explore All Topics</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {unitsList.map((unit) => (
              <Link
                key={unit.unit_number}
                href={`/syllabus/${unit.unit_number}`}
                className="p-3 bg-[#0A3325] hover:bg-[#0D3A2B] border border-[#134E3A] rounded-xl text-left transition-colors space-y-1 block group"
              >
                <div className="text-[10px] font-mono font-bold text-[#00E699]">
                  UNIT {unit.unit_number}
                </div>
                <div dir="auto" className="text-xs font-bold text-white group-hover:text-[#00E699] truncate">
                  {unit.name_english || unit.name_arabic}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
