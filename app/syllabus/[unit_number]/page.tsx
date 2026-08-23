import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Target, BookOpen, Layers, ArrowLeft, PlayCircle } from 'lucide-react';
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

  const unit = await prisma.syllabusUnit.findUnique({
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
  const unit = await prisma.syllabusUnit.findUnique({
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
    <div className="flex-1 min-h-screen pt-10 pb-24 bg-[#FCFAF8]">
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

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Column: Topics ONLY */}
          <main className="flex-1 min-w-0">
            {/* Unit Title Header Card */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5">
                Unit {unit.unit_number}
              </div>
              <h1
                dir="rtl"
                lang="ar"
                className="font-arabic font-extrabold text-3xl sm:text-4xl text-stone-900 leading-snug mb-2"
              >
                {unit.name_arabic}
              </h1>
              <p className="text-stone-500 font-semibold text-base sm:text-lg">
                {unit.name_english}
              </p>
            </div>

            {/* Topics Section Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest">
                Topics in Unit {unit.unit_number} ({unit.broad_topics.length})
              </h2>
              <span className="text-xs text-stone-400 font-semibold">
                Click a topic to view sub-topics
              </span>
            </div>

            {/* Topics Cards List */}
            <div className="space-y-4">
              {unit.broad_topics.map((topic, idx) => (
                <Link
                  key={topic.id}
                  href={`/syllabus/${unit.unit_number}/${topic.slug}`}
                  className="group block p-6 sm:p-7 bg-white border border-stone-200/90 rounded-3xl hover:border-primary/50 hover:shadow-[0_12px_32px_-12px_rgba(16,122,83,0.12)] hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    {/* Left: Index & Names */}
                    <div className="flex items-start gap-4 sm:gap-5 min-w-0 flex-1">
                      <div className="w-11 h-11 rounded-2xl bg-stone-100 group-hover:bg-primary group-hover:text-white text-stone-700 flex items-center justify-center font-bold text-base shrink-0 transition-colors shadow-inner">
                        {idx + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div
                          dir="rtl"
                          lang="ar"
                          className="font-arabic font-extrabold text-2xl sm:text-3xl text-stone-900 leading-snug mb-1"
                        >
                          {topic.name_arabic}
                        </div>
                        <div className="text-stone-500 font-semibold text-sm sm:text-base">
                          {topic.name_english}
                        </div>
                      </div>
                    </div>

                    {/* Right: Subtopic Count, Qs Count & Arrow */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <div className="flex items-center gap-2.5 text-xs">
                        <span className="px-3 py-1.5 rounded-xl bg-stone-100 font-bold text-stone-700">
                          {topic._count.subtopics} Sub-topics
                        </span>
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-100">
                          {topic._count.questions} Qs
                        </span>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-stone-50 group-hover:bg-primary group-hover:text-white text-stone-400 flex items-center justify-center transition-all group-hover:translate-x-1">
                        <ChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {unit.broad_topics.length === 0 && (
                <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 text-stone-500 font-medium">
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
