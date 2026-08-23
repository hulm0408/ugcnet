import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Layers, BookOpen, Target, PlayCircle, User } from 'lucide-react';
import prisma from '@/lib/db';
import SyllabusBreadcrumb from '@/components/syllabus/SyllabusBreadcrumb';
import SyllabusContextSidebar from '@/components/syllabus/SyllabusContextSidebar';
import { resolveCanonicalEntity, slugify } from '@/lib/syllabusHierarchy';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unit_number: string; topic_slug: string; subtopic_slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const unitNum = parseInt(resolvedParams.unit_number, 10);
  if (isNaN(unitNum)) return { title: 'Sub-topic Not Found' };

  const topic = await prisma.broadTopic.findFirst({
    where: {
      slug: resolvedParams.topic_slug,
      unit: { unit_number: unitNum },
    },
  });

  if (!topic) return { title: 'Topic Not Found' };

  return {
    title: `${resolvedParams.subtopic_slug} — ${topic.name_english} | Syllabus`,
    description: `Explore learning nodes and specific concept questions in UGC NET Arabic.`,
  };
}

export default async function SubtopicNodesPage({
  params,
}: {
  params: Promise<{ unit_number: string; topic_slug: string; subtopic_slug: string }>;
}) {
  const resolvedParams = await params;
  const unitNum = parseInt(resolvedParams.unit_number, 10);
  if (isNaN(unitNum)) return notFound();

  // Fetch Topic and all its published questions
  const topic = await prisma.broadTopic.findFirst({
    where: {
      slug: resolvedParams.topic_slug,
      unit: { unit_number: unitNum },
    },
    include: {
      unit: true,
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

  // Filter questions matching this canonical subtopic slug
  const targetSubSlug = decodeURIComponent(resolvedParams.subtopic_slug).toLowerCase();

  const matchingQuestions: typeof topic.questions = [];
  let subtopicNameAr = '';
  let subtopicNameEn = '';

  for (const q of topic.questions) {
    const canonical = resolveCanonicalEntity(q);
    if (canonical.slug === targetSubSlug) {
      matchingQuestions.push(q);
      subtopicNameAr = canonical.nameAr;
      subtopicNameEn = canonical.nameEn;
    }
  }

  // Fallback: If no direct match, check if targetSubSlug matches any subtopic slug directly
  const questionsToUse = matchingQuestions.length > 0 ? matchingQuestions : topic.questions;
  if (!subtopicNameAr && questionsToUse.length > 0) {
    const firstC = resolveCanonicalEntity(questionsToUse[0]);
    subtopicNameAr = firstC.nameAr;
    subtopicNameEn = firstC.nameEn;
  }

  // Group matching questions into distinct Learning Nodes / Micro-Themes
  const nodesMap = new Map<
    string,
    {
      nameAr: string;
      nameEn: string;
      slug: string;
      questionsCount: number;
    }
  >();

  for (const q of questionsToUse) {
    const nodeAr = q.question_micro_focus_arabic?.trim() || 'أسئلة عامة وتطبيقات';
    const nodeEn = q.question_micro_focus_english?.trim() || 'General Questions & Analysis';
    const nodeSlug = slugify(nodeEn || nodeAr);

    if (!nodesMap.has(nodeSlug)) {
      nodesMap.set(nodeSlug, {
        nameAr: nodeAr,
        nameEn: nodeEn,
        slug: nodeSlug,
        questionsCount: 0,
      });
    }

    nodesMap.get(nodeSlug)!.questionsCount += 1;
  }

  const nodesList = Array.from(nodesMap.values()).sort((a, b) => b.questionsCount - a.questionsCount);

  return (
    <div className="flex-1 min-h-screen pt-10 pb-24 bg-[#FCFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <SyllabusBreadcrumb
          items={[
            {
              label: `Unit ${topic.unit.unit_number}: ${topic.unit.name_english}`,
              labelAr: topic.unit.name_arabic,
              href: `/syllabus/${topic.unit.unit_number}`,
            },
            {
              label: topic.name_english,
              labelAr: topic.name_arabic,
              href: `/syllabus/${topic.unit.unit_number}/${topic.slug}`,
            },
            {
              label: subtopicNameEn,
              labelAr: subtopicNameAr,
            },
          ]}
        />

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Column: Nodes ONLY */}
          <main className="flex-1 min-w-0">
            {/* Subtopic Header Card */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5">
                Unit {topic.unit.unit_number} • {topic.name_english} Sub-topic
              </div>
              <h1
                dir="rtl"
                lang="ar"
                className="font-arabic font-extrabold text-3xl sm:text-4xl text-stone-900 leading-snug mb-2"
              >
                {subtopicNameAr}
              </h1>
              <p className="text-stone-500 font-semibold text-base sm:text-lg">
                {subtopicNameEn}
              </p>
            </div>

            {/* Nodes Section Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest">
                Learning Nodes & Micro-Themes ({nodesList.length})
              </h2>
              <span className="text-xs text-stone-400 font-semibold">
                Click a node to view its questions
              </span>
            </div>

            {/* Nodes Cards List */}
            <div className="space-y-4">
              {nodesList.map((nodeItem, idx) => (
                <Link
                  key={nodeItem.slug || idx}
                  href={`/syllabus/${topic.unit.unit_number}/${topic.slug}/${targetSubSlug}/${nodeItem.slug}`}
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
                          className="font-arabic font-extrabold text-xl sm:text-2xl text-stone-900 leading-snug mb-1"
                        >
                          {nodeItem.nameAr}
                        </div>
                        <div className="text-stone-500 font-semibold text-xs sm:text-sm">
                          {nodeItem.nameEn}
                        </div>
                      </div>
                    </div>

                    {/* Right: Qs Count & Arrow */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <div className="flex items-center gap-2.5 text-xs">
                        <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-100">
                          {nodeItem.questionsCount} Qs
                        </span>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-stone-50 group-hover:bg-primary group-hover:text-white text-stone-400 flex items-center justify-center transition-all group-hover:translate-x-1">
                        <ChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {nodesList.length === 0 && (
                <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 text-stone-500 font-medium">
                  No learning nodes found for this sub-topic.
                </div>
              )}
            </div>
          </main>

          {/* Right Column: Contextual Sidebar */}
          <SyllabusContextSidebar
            levelBadge="Sub-topic Context"
            titleAr={subtopicNameAr}
            title={subtopicNameEn}
            subtitle={`Contains ${nodesList.length} micro-learning nodes with ${questionsToUse.length} official questions.`}
            metrics={[
              { label: 'Learning Nodes', value: nodesList.length, icon: Target },
              { label: 'Total Questions', value: questionsToUse.length, icon: BookOpen },
            ]}
            practiceHref={`/practice?unit=${topic.unit.unit_number}&topic=${topic.slug}&subtopic=${targetSubSlug}`}
            practiceLabel="Practice Sub-topic"
            quickTips={[
              'Click any node above to inspect its verified previous year questions.',
              'Use answer reveal to check explanations and official NTA keys.',
            ]}
          />

        </div>
      </div>
    </div>
  );
}
