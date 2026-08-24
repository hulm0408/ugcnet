import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Layers, BookOpen, GraduationCap, Target } from 'lucide-react';
import prisma from '@/lib/db';
import SyllabusContextSidebar from '@/components/syllabus/SyllabusContextSidebar';

export const metadata: Metadata = {
  title: 'Official Syllabus — UGC NET Arabic',
  description: 'Browse the 10 official UGC NET Arabic syllabus units with hierarchical drill-down navigation.',
};

export const dynamic = 'force-dynamic';

export default async function SyllabusLandingPage() {
  // Fetch all 10 official units with their broad topics and questions count
  const units = await prisma.syllabusUnit.findMany({
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
    <div className="flex-1 min-h-screen pt-8 pb-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section: Calm Academic Style */}
        <div className="mb-8 text-left border-b border-stone-200/80 pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[11px] font-semibold tracking-wider uppercase mb-2.5">
            <GraduationCap size={13} className="text-emerald-800" />
            <span>Official NTA Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-1.5">
            Syllabus Units
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm font-medium max-w-2xl">
            Browse the 10 official UGC NET Arabic units. Select a unit to explore its topics, authors, and learning nodes.
          </p>
        </div>

        {/* 2-Column Academic Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Column: Units List */}
          <main className="flex-1 min-w-0 w-full">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Official Units (10)
              </h2>
              <span className="text-[11px] text-stone-400 font-medium">
                Click a unit to view topics
              </span>
            </div>

            <div className="space-y-2.5">
              {units.map((unit) => (
                <Link
                  key={unit.id}
                  href={`/syllabus/${unit.unit_number}`}
                  className="group block p-4 sm:p-5 bg-white border border-stone-200/80 rounded-2xl hover:border-emerald-700/40 hover:bg-emerald-50/20 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    
                    {/* Left: Unit Number & Arabic/English Titles */}
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-600 group-hover:bg-emerald-800 group-hover:text-white flex items-center justify-center font-bold text-xs shrink-0 transition-colors">
                        {unit.unit_number.toString().padStart(2, '0')}
                      </div>

                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div
                          dir="rtl"
                          lang="ar"
                          className="font-arabic font-bold text-lg sm:text-xl text-stone-900 leading-snug group-hover:text-emerald-950 transition-colors"
                        >
                          {unit.name_arabic}
                        </div>
                        <div className="text-stone-500 text-xs sm:text-sm font-medium line-clamp-1">
                          {unit.name_english}
                        </div>
                      </div>
                    </div>

                    {/* Right: Metadata Chips & Subtle Chevron */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="px-2.5 py-1 rounded-lg bg-stone-100/80 text-stone-600 font-medium">
                          {unit._count.broad_topics} Topics
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 font-semibold border border-emerald-100">
                          {unit._count.questions} Qs
                        </span>
                      </div>

                      <div className="text-stone-300 group-hover:text-emerald-800 transition-colors pl-1">
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
            title="Complete UGC NET Arabic Curriculum"
            subtitle="All questions are categorized across 10 official units, 60 broad topics, and thousands of granular nodes."
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
