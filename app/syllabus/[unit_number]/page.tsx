import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Target, BookOpen, Layers } from 'lucide-react';
import prisma from '@/lib/db';
import SyllabusBreadcrumb from '@/components/syllabus/SyllabusBreadcrumb';
import SyllabusContextSidebar from '@/components/syllabus/SyllabusContextSidebar';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unit_number: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const unitNum = parseInt(resolvedParams.unit_number, 10);
  if (isNaN(unitNum)) return { title: 'Unit Not Found' };

  const unit = await prisma.syllabusUnit.findFirst({
    where: { unit_number: unitNum },
    select: { name_english: true, name_arabic: true, unit_number: true },
  });

  if (!unit) return { title: 'Unit Not Found' };

  return {
    title: `Unit ${unit.unit_number}: ${unit.name_english} (${unit.name_arabic}) — Syllabus`,
    description: `Explore topics under Unit ${unit.unit_number} of the UGC NET Arabic syllabus.`,
  };
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ unit_number: string }>;
}) {
  const resolvedParams = await params;
  const unitNum = parseInt(resolvedParams.unit_number, 10);
  if (isNaN(unitNum)) return notFound();

  // Fetch the Unit and its Broad Topics with question counts
  const unit = await prisma.syllabusUnit.findFirst({
    where: { unit_number: unitNum },
    include: {
      broad_topics: {
        orderBy: { order_index: 'asc' },
        include: {
          _count: {
            select: {
              subtopics: true,
              questions: true,
            },
          },
        },
      },
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });

  if (!unit) return notFound();

  const totalSubtopics = unit.broad_topics.reduce((acc, t) => acc + t._count.subtopics, 0);

  return (
    <div className="flex-1 min-h-screen pt-8 pb-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <SyllabusBreadcrumb
          items={[
            {
              label: `Unit ${unit.unit_number}: ${unit.name_english}`,
              labelAr: unit.name_arabic,
            },
          ]}
        />

        {/* 2-Column Academic Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Column: Topics List */}
          <main className="flex-1 min-w-0 w-full">
            {/* Unit Title Header Panel */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-5 sm:p-6 mb-6 space-y-1">
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                Unit {unit.unit_number}
              </div>
              <h1
                dir="rtl"
                lang="ar"
                className="font-arabic font-bold text-2xl sm:text-3xl text-stone-900 leading-snug"
              >
                {unit.name_arabic}
              </h1>
              <p className="text-stone-500 font-medium text-xs sm:text-sm">
                {unit.name_english}
              </p>
            </div>

            {/* Topics Section Header */}
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Topics in Unit {unit.unit_number} ({unit.broad_topics.length})
              </h2>
              <span className="text-[11px] text-stone-400 font-medium">
                Click a topic to view sub-topics
              </span>
            </div>

            {/* Topics Cards List */}
            <div className="space-y-2.5">
              {unit.broad_topics.map((topic, idx) => (
                <Link
                  key={topic.id}
                  href={`/syllabus/${unit.unit_number}/${topic.slug}`}
                  className="group block p-4 sm:p-5 bg-white border border-stone-200/80 rounded-2xl hover:border-emerald-700/40 hover:bg-emerald-50/20 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    
                    {/* Left: Index & Names */}
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-600 group-hover:bg-emerald-800 group-hover:text-white flex items-center justify-center font-bold text-xs shrink-0 transition-colors">
                        {idx + 1}
                      </div>

                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div
                          dir="rtl"
                          lang="ar"
                          className="font-arabic font-bold text-base sm:text-lg text-stone-900 leading-snug group-hover:text-emerald-950 transition-colors"
                        >
                          {topic.name_arabic}
                        </div>
                        <div className="text-stone-500 font-medium text-xs sm:text-sm line-clamp-1">
                          {topic.name_english}
                        </div>
                      </div>
                    </div>

                    {/* Right: Subtopic Count, Qs Count & Arrow */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="px-2.5 py-1 rounded-lg bg-stone-100/80 text-stone-600 font-medium">
                          {topic._count.subtopics} Sub-topics
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 font-semibold border border-emerald-100">
                          {topic._count.questions} Qs
                        </span>
                      </div>

                      <div className="text-stone-300 group-hover:text-emerald-800 transition-colors pl-1">
                        <ChevronRight size={16} />
                      </div>
                    </div>

                  </div>
                </Link>
              ))}

              {unit.broad_topics.length === 0 && (
                <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs font-medium">
                  No topics found for this unit.
                </div>
              )}
            </div>
          </main>

          {/* Right Column: Contextual Sidebar */}
          <SyllabusContextSidebar
            levelBadge={`Unit ${unit.unit_number} Context`}
            titleAr={unit.name_arabic}
            title={unit.name_english}
            subtitle={`This unit covers ${unit.broad_topics.length} broad topics across classical and modern Arabic literature.`}
            metrics={[
              { label: 'Topics', value: unit.broad_topics.length, icon: Target },
              { label: 'Sub-topics', value: totalSubtopics, icon: Layers },
              { label: 'Total Questions', value: unit._count.questions, icon: BookOpen },
            ]}
            practiceHref={`/practice?unit=${unit.unit_number}`}
            practiceLabel={`Practice Unit ${unit.unit_number}`}
            quickTips={[
              'Click any topic above to explore its sub-topics.',
              'You can practice the entire unit or specific sub-topics.',
            ]}
          />

        </div>
      </div>
    </div>
  );
}
