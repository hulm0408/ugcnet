import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Layers, BookOpen, GraduationCap, Target } from 'lucide-react';
import prisma from '@/lib/db';
import SyllabusContextSidebar from '@/components/syllabus/SyllabusContextSidebar';
import { getActiveSubjectServer } from '@/lib/subjectContext';
import InteractiveSyllabusTree from '@/components/syllabus/InteractiveSyllabusTree';

export async function generateMetadata(): Promise<Metadata> {
  const activeSubject = await getActiveSubjectServer();
  return {
    title: `Official Syllabus — UGC NET ${activeSubject.name}`,
    description: `Browse the official UGC NET ${activeSubject.name} syllabus units with hierarchical drill-down navigation.`,
  };
}

export const dynamic = 'force-dynamic';

export default async function SyllabusLandingPage() {
  const activeSubject = await getActiveSubjectServer();

  // Fetch all official units for this active subject
  const units = await prisma.syllabusUnit.findMany({
    where: { subject_id: activeSubject.id },
    orderBy: { unit_number: 'asc' },
    select: {
      id: true,
      unit_number: true,
      name_arabic: true,
      name_english: true,
      slug: true,
      _count: {
        select: {
          broad_topics: true,
          questions: true,
        },
      },
    },
  });

  const totalTopics = units.reduce((acc, u) => acc + u._count.broad_topics, 0);
  const totalQuestions = units.reduce((acc, u) => acc + u._count.questions, 0);

  return (
    <div className="flex-1 min-h-screen pt-8 pb-20 bg-[#F8FAFC] text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="mb-8 text-left border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-2.5">
            <GraduationCap size={13} className="text-emerald-700" />
            <span>Official NTA Curriculum • {activeSubject.name} (Code {activeSubject.code})</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight mb-1.5">
            {activeSubject.name} Syllabus Units
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-2xl">
            Browse official UGC NET {activeSubject.name} units. Select a unit to explore its topics and practice questions.
          </p>
        </div>

        {/* 2-Column Academic Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Column: Units List */}
          <main className="flex-1 min-w-0 w-full">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Official Units (10)
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">
                Click a unit to view topics
              </span>
            </div>

            <div className="space-y-3">
              {units.map((unit) => (
                <Link
                  key={unit.id}
                  href={`/syllabus/${unit.unit_number}`}
                  className="group block p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500/80 hover:shadow-xs transition-all cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    
                    {/* Left: Unit Number & Arabic/English Titles */}
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-200 flex items-center justify-center font-bold text-xs shrink-0 transition-colors">
                        {unit.unit_number.toString().padStart(2, '0')}
                      </div>

                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div
                          dir="rtl"
                          lang="ar"
                          className="font-arabic font-semibold text-xl sm:text-2xl text-slate-950 leading-[2.2] group-hover:text-emerald-800 transition-colors"
                        >
                          {unit.name_arabic}
                        </div>
                        <div className="text-slate-600 text-xs sm:text-sm font-medium line-clamp-1">
                          {unit.name_english}
                        </div>
                      </div>
                    </div>

                    {/* Right: Metadata Chips & Subtle Chevron */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 font-bold">
                          {unit._count.broad_topics} Topics
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                          {unit._count.questions} Qs
                        </span>
                      </div>

                      <div className="text-slate-400 group-hover:text-emerald-700 transition-colors pl-1">
                        <ChevronRight size={16} />
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>

          </main>

          {/* Right Column: Quiet Overview Sidebar */}
          <SyllabusContextSidebar
            levelBadge="Syllabus Overview"
            title={`Complete UGC NET ${activeSubject.name} Curriculum`}
            subtitle="All questions are categorized across 10 official units, broad topics, and granular subtopics."
            metrics={[
              { label: 'Total Units', value: 10, icon: Layers },
              { label: 'Total Topics', value: totalTopics, icon: Target },
              { label: 'Verified Questions', value: totalQuestions.toLocaleString(), icon: BookOpen },
            ]}
            practiceHref="/practice"
            practiceLabel="Practice Full Syllabus"
            quickTips={[
              'Select any unit to explore its topic hierarchy.',
              'Questions are directly linked to specific authors and eras.',
              'Use progressive drill-down to master one sub-topic at a time.',
            ]}
          />

        </div>
      </div>
    </div>
  );
}
