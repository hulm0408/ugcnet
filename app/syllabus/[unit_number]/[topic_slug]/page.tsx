import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Layers, BookOpen, Target } from 'lucide-react';
import prisma from '@/lib/db';
import SyllabusBreadcrumb from '@/components/syllabus/SyllabusBreadcrumb';
import SyllabusContextSidebar from '@/components/syllabus/SyllabusContextSidebar';
import { resolveCanonicalEntity } from '@/lib/syllabusHierarchy';
import { getActiveSubjectServer } from '@/lib/subjectContext';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unit_number: string; topic_slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const unitNum = parseInt(resolvedParams.unit_number, 10);
  if (isNaN(unitNum)) return { title: 'Topic Not Found' };

  const activeSubject = await getActiveSubjectServer();
  const topic = await prisma.broadTopic.findFirst({
    where: {
      slug: resolvedParams.topic_slug,
      unit: { unit_number: unitNum, subject_id: activeSubject.id },
    },
    include: { unit: true },
  });

  if (!topic) return { title: 'Topic Not Found' };

  return {
    title: `${topic.name_english || topic.name_arabic} — Unit ${unitNum} | ${activeSubject.name} Syllabus`,
    description: `Browse sub-topics under ${topic.name_english} in the UGC NET ${activeSubject.name} syllabus.`,
  };
}

export const dynamic = 'force-dynamic';

export default async function TopicSubtopicsPage({
  params,
}: {
  params: Promise<{ unit_number: string; topic_slug: string }>;
}) {
  const resolvedParams = await params;
  const unitNum = parseInt(resolvedParams.unit_number, 10);
  if (isNaN(unitNum)) return notFound();

  const activeSubject = await getActiveSubjectServer();

  // Fetch Topic and all its published questions scoped to active subject
  const topic = await prisma.broadTopic.findFirst({
    where: {
      slug: resolvedParams.topic_slug,
      unit: { unit_number: unitNum, subject_id: activeSubject.id },
    },
    include: {
      unit: true,
      subtopics: {
        orderBy: { order_index: 'asc' },
      },
      questions: {
        where: { content_status: 'PUBLISHED' },
        select: {
          id: true,
          question_arabic: true,
          specific_entity_name_arabic: true,
          specific_entity_name_english: true,
          question_micro_focus_arabic: true,
          question_micro_focus_english: true,
        },
      },
    },
  });

  if (!topic) return notFound();

  // Group questions into canonical sub-topics if questions exist
  const subtopicMap = new Map<
    string,
    {
      nameAr: string;
      nameEn: string;
      slug: string;
      questionsCount: number;
      nodesSet: Set<string>;
    }
  >();

  if (topic.questions.length > 0) {
    for (const q of topic.questions) {
      const canonical = resolveCanonicalEntity(q);

      if (!subtopicMap.has(canonical.slug)) {
        subtopicMap.set(canonical.slug, {
          nameAr: canonical.nameAr,
          nameEn: canonical.nameEn,
          slug: canonical.slug,
          questionsCount: 0,
          nodesSet: new Set(),
        });
      }

      const subObj = subtopicMap.get(canonical.slug)!;
      subObj.questionsCount += 1;

      const nodeAr = q.question_micro_focus_arabic?.trim() || 'Core Curriculum Concept';
      subObj.nodesSet.add(nodeAr);
    }
  } else if (topic.subtopics.length > 0) {
    // Fallback to database Subtopics
    for (const st of topic.subtopics) {
      subtopicMap.set(st.slug, {
        nameAr: st.name_arabic || st.name_english,
        nameEn: st.name_english,
        slug: st.slug,
        questionsCount: 0,
        nodesSet: new Set(['Core Concept']),
      });
    }
  }

  // Sort subtopics
  const subtopicsList = Array.from(subtopicMap.values()).sort((a, b) => {
    if (a.slug === 'general-overview') return 1;
    if (b.slug === 'general-overview') return -1;
    return b.questionsCount - a.questionsCount;
  });

  return (
    <div className="flex-1 min-h-screen pt-10 pb-24 bg-[#FCFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <SyllabusBreadcrumb
          items={[
            {
              label: `Unit ${topic.unit.unit_number}: ${topic.unit.name_english}`,
              labelAr: topic.unit.name_arabic || undefined,
              href: `/syllabus/${topic.unit.unit_number}`,
            },
            {
              label: topic.name_english || topic.name_arabic,
              labelAr: topic.name_arabic || undefined,
            },
          ]}
        />

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Column: Subtopics ONLY */}
          <main className="flex-1 min-w-0">
            {/* Topic Header Card */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5">
                {activeSubject.name} • Unit {topic.unit.unit_number} Topic
              </div>
              <h1
                dir={activeSubject.direction}
                lang={activeSubject.primary_language}
                className={`font-extrabold text-3xl sm:text-4xl text-stone-900 leading-snug mb-2 ${
                  activeSubject.direction === 'rtl' ? 'font-arabic' : 'font-sans'
                }`}
              >
                {topic.name_arabic || topic.name_english}
              </h1>
              {topic.name_arabic && topic.name_english && topic.name_arabic !== topic.name_english && (
                <p className="text-stone-500 font-semibold text-base sm:text-lg">
                  {topic.name_english}
                </p>
              )}
            </div>

            {/* Sub-topics Section Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest">
                Official Sub-topics ({subtopicsList.length})
              </h2>
              <span className="text-xs text-stone-400 font-semibold">
                Click a sub-topic to view learning nodes
              </span>
            </div>

            {/* Subtopics Cards List */}
            <div className="space-y-4">
              {subtopicsList.map((st, idx) => (
                <Link
                  key={st.slug || idx}
                  href={`/syllabus/${topic.unit.unit_number}/${topic.slug}/${st.slug}`}
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
                          dir={activeSubject.direction}
                          lang={activeSubject.primary_language}
                          className={`font-extrabold text-2xl sm:text-3xl text-stone-900 leading-snug mb-1 ${
                            activeSubject.direction === 'rtl' ? 'font-arabic' : 'font-sans'
                          }`}
                        >
                          {st.nameAr}
                        </div>
                        {st.nameAr !== st.nameEn && (
                          <div className="text-stone-500 font-semibold text-sm sm:text-base">
                            {st.nameEn}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Nodes Count, Qs Count & Arrow */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <div className="flex items-center gap-2.5 text-xs">
                        <span className="px-3 py-1.5 rounded-xl bg-stone-100 font-bold text-stone-700">
                          {st.nodesSet.size} Nodes
                        </span>
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-100">
                          {st.questionsCount} Qs
                        </span>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-stone-50 group-hover:bg-primary group-hover:text-white text-stone-400 flex items-center justify-center transition-all group-hover:translate-x-1">
                        <ChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {subtopicsList.length === 0 && (
                <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 text-stone-500 font-medium">
                  No sub-topics found for this topic.
                </div>
              )}
            </div>
          </main>

          {/* Right Column: Contextual Sidebar */}
          <SyllabusContextSidebar
            levelBadge="Topic Context"
            titleAr={topic.name_arabic || undefined}
            title={topic.name_english}
            subtitle={`Contains ${subtopicsList.length} targeted official sub-topics in ${activeSubject.name}.`}
            metrics={[
              { label: 'Sub-topics', value: subtopicsList.length, icon: Layers },
              { label: 'Total Questions', value: topic.questions.length, icon: BookOpen },
            ]}
            practiceHref={`/practice?unit=${topic.unit.unit_number}&topic=${topic.slug}&subject=${activeSubject.slug}`}
            practiceLabel="Practice This Topic"
            quickTips={[
              'Select any sub-topic above to view individual concept nodes.',
              'Practice questions mapped directly to official UGC NET exam papers.',
            ]}
          />

        </div>
      </div>
    </div>
  );
}
