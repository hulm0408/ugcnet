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
    description: `Practice UGC NET ${config.name} (Code ${config.code}). ${totalQuestions.toLocaleString()}+ authentic NTA questions, 10 official units, Paper 1 companion, personal mistake tracking, and CBT simulation.`,
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

  const uniqueYears = Array.from(new Set(papers.filter((p) => !p.is_mock_test).map((p) => p.year))).sort((a, b) => b - a);

  return (
    <div className="flex-1 bg-[#03140E] text-white font-sans min-h-[88vh] flex flex-col justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        
        {/* ── 1. HEADER IDENTITY ── */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A3325] border border-[#134E3A] text-[#00E699] text-xs font-bold tracking-wider">
            <GraduationCap size={14} className="text-[#00E699]" />
            <span>UGC NET / JRF • {config.name} (Code {config.code})</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            What would you like to master today?
          </h1>

          {config.nativeName && (
            <div
              dir={config.theme.scriptDirection}
              className={`text-lg sm:text-xl text-[#00E699] font-bold ${
                config.theme.scriptDirection === 'rtl' ? 'font-arabic' : 'font-serif'
              }`}
            >
              {config.nativeName}
            </div>
          )}

          <p className="text-[#8EBDAE] text-xs sm:text-sm font-medium max-w-lg mx-auto">
            Access {totalQuestions.toLocaleString()}+ authentic NTA questions across {totalUnits} units and {totalPapers} historical exam papers.
          </p>
        </div>

        {/* ── 2. INSTANT ACTION SEARCH BAR (SEARCH OMNIBOX STYLE) ── */}
        <div className="rounded-full border border-[#134E3A] bg-[#082B1F] shadow-lg hover:border-[#00E699]/50 p-2 flex items-center transition-all">
          <form action="/search" method="GET" className="flex items-center gap-3 px-3 w-full">
            <input
              type="text"
              name="q"
              placeholder={`Search ${config.name} topics, authors, terms, or question text...`}
              className="w-full bg-transparent text-sm sm:text-base font-medium text-white placeholder:text-[#5A8A7C] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#00E699] hover:bg-[#00B377] text-[#03140E] font-bold rounded-full px-5 py-2 transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>Search</span>
              <ArrowRight size={13} />
            </button>
          </form>
        </div>

        {/* ── 3. QUICK PRACTICE LAUNCHPAD ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Card 1: Timed CBT Mock */}
          <Link
            href={freeBenchmarkPaper ? `/practice?paperId=${freeBenchmarkPaper.id}&type=mock` : '/mocks'}
            className="p-5 bg-[#082B1F] border border-[#134E3A] hover:border-[#00E699] rounded-2xl transition-all group space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#0A3325] text-[#00E699] flex items-center justify-center font-bold">
                <Play size={15} fill="currentColor" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00E699] bg-[#0A3325] border border-[#134E3A] px-2 py-0.5 rounded-md">
                100 Questions
              </span>
            </div>
            <div>
              <div className="font-serif font-bold text-base text-white group-hover:text-[#00E699] transition-colors">
                Full CBT Mock Test
              </div>
              <p className="text-[#8EBDAE] text-xs mt-0.5 font-medium leading-relaxed">
                160-minute real exam simulation with reconciled NTA keys.
              </p>
            </div>
          </Link>

          {/* Card 2: Syllabus Blueprint */}
          <Link
            href="/syllabus"
            className="p-5 bg-[#082B1F] border border-[#134E3A] hover:border-[#00E699] rounded-2xl transition-all group space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#0A3325] text-[#00E699] flex items-center justify-center font-bold">
                <BookOpen size={15} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00E699] bg-[#0A3325] border border-[#134E3A] px-2 py-0.5 rounded-md">
                {totalUnits} Units
              </span>
            </div>
            <div>
              <div className="font-serif font-bold text-base text-white group-hover:text-[#00E699] transition-colors">
                Syllabus Blueprint
              </div>
              <p className="text-[#8EBDAE] text-xs mt-0.5 font-medium leading-relaxed">
                Complete {config.name} NTA curriculum breakdown &amp; subtopics.
              </p>
            </div>
          </Link>

          {/* Card 3: 20-Year PYQ Archive */}
          <Link
            href="/pyq"
            className="p-5 bg-[#082B1F] border border-[#134E3A] hover:border-[#00E699] rounded-2xl transition-all group space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#0A3325] text-[#00E699] flex items-center justify-center font-bold">
                <FileText size={15} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00E699] bg-[#0A3325] border border-[#134E3A] px-2 py-0.5 rounded-md">
                2004–2024
              </span>
            </div>
            <div>
              <div className="font-serif font-bold text-base text-white group-hover:text-[#00E699] transition-colors">
                20-Year PYQ Archive
              </div>
              <p className="text-[#8EBDAE] text-xs mt-0.5 font-medium leading-relaxed">
                {totalPapers} historical exam papers with verified answers.
              </p>
            </div>
          </Link>

        </div>

        {/* ── 4. QUICK SYLLABUS UNIT JUMP ── */}
        <div className="bg-[#082B1F] border border-[#134E3A] rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00E699]">
              10-Unit Quick Jump
            </h2>
            <Link href="/syllabus" className="text-xs font-bold text-[#8EBDAE] hover:text-white flex items-center gap-1">
              <span>View Full Syllabus</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {unitsList.map((unit) => (
              <Link
                key={unit.unit_number}
                href={`/syllabus/${unit.unit_number}`}
                className="p-2.5 bg-[#0A3325] hover:bg-[#0D3A2B] border border-[#134E3A] rounded-xl text-left transition-colors space-y-1 block group"
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
