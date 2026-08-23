import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Layers, BookOpen, GraduationCap, Compass, Target } from 'lucide-react';
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
    <div className="flex-1 min-h-screen pt-10 pb-24 bg-[#FCFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap size={14} />
            Official NTA Curriculum
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight mb-2">
            Syllabus Units
          </h1>
          <p className="text-stone-500 text-base font-medium max-w-2xl">
            Browse the official UGC NET/JRF Arabic syllabus. Select a unit below to drill down into its topics and learning nodes.
          </p>
        </div>

        {/* 2-Column Academic Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Column: Units ONLY */}
          <main className="flex-1 min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest">
                Official Units (10)
              </h2>
              <span className="text-xs text-stone-400 font-semibold">
                Click a unit to view topics
              </span>
            </div>

            <div className="space-y-4">
              {units.map((unit) => (
                <Link
                  key={unit.id}
                  href={`/syllabus/${unit.unit_number}`}
                  className="group block p-6 sm:p-7 bg-white border border-stone-200/90 rounded-3xl hover:border-primary/50 hover:shadow-[0_12px_32px_-12px_rgba(16,122,83,0.12)] hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    {/* Left: Unit Number & Names */}
                    <div className="flex items-start gap-5 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-2xl bg-stone-100 group-hover:bg-primary group-hover:text-white text-stone-700 flex items-center justify-center font-black text-lg shrink-0 transition-colors shadow-inner">
                        {unit.unit_number.toString().padStart(2, '0')}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1">
                          Unit {unit.unit_number}
                        </div>
                        <div
                          dir="rtl"
                          lang="ar"
                          className="font-arabic font-extrabold text-2xl sm:text-3xl text-stone-900 leading-snug mb-1"
                        >
                          {unit.name_arabic}
                        </div>
                        <div className="text-stone-500 font-semibold text-sm sm:text-base">
                          {unit.name_english}
                        </div>
                      </div>
                    </div>

                    {/* Right: Stats & Arrow */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="px-3 py-1.5 rounded-xl bg-stone-100 font-bold text-stone-700">
                          {unit._count.broad_topics} Topics
                        </span>
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-100">
                          {unit._count.questions} Qs
                        </span>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-stone-50 group-hover:bg-primary group-hover:text-white text-stone-400 flex items-center justify-center transition-all group-hover:translate-x-1">
                        <ChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>

          {/* Right Column: Contextual Overview Sidebar */}
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
