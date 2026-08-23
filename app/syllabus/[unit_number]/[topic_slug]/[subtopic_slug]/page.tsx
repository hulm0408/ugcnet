import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Layers, BookOpen, Target, PlayCircle, User } from 'lucide-react';
import prisma from '@/lib/db';
import SyllabusBreadcrumb from '@/components/syllabus/SyllabusBreadcrumb';
import SyllabusContextSidebar from '@/components/syllabus/SyllabusContextSidebar';

function slugify(text: string): string {
  return (text || 'unnamed')
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unit_number: string; topic_slug: string; subtopic_slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const unitNum = parseInt(resolvedParams.unit_number, 10);
  if (isNaN(unitNum)) return { title: 'Sub-topic Not Found' };

  const subtopic = await prisma.subtopic.findFirst({
    where: {
      slug: resolvedParams.subtopic_slug,
      broad_topic: {
        slug: resolvedParams.topic_slug,
        unit: { unit_number: unitNum },
      },
    },
    include: {
      broad_topic: { include: { unit: true } },
    },
  });

  if (!subtopic) return { title: 'Sub-topic Not Found' };

  return {
    title: `${subtopic.name_english} (${subtopic.name_arabic}) — Nodes | Syllabus`,
    description: `Explore specific learning nodes, poets, and concepts under ${subtopic.name_english}.`,
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

  // Fetch Subtopic with its full parent chain and questions
  const subtopic = await prisma.subtopic.findFirst({
    where: {
      slug: resolvedParams.subtopic_slug,
      broad_topic: {
        slug: resolvedParams.topic_slug,
        unit: { unit_number: unitNum },
      },
    },
    include: {
      broad_topic: { include: { unit: true } },
      questions: {
        where: { content_status: 'PUBLISHED' },
        select: {
          specific_entity_name_arabic: true,
          specific_entity_name_english: true,
          question_micro_focus_arabic: true,
        },
      },
    },
  });

  if (!subtopic) return notFound();

  // Group questions into distinct Learning Nodes / Entities
  const entityMap = new Map<
    string,
    {
      nameAr: string;
      nameEn: string;
      slug: string;
      questionsCount: number;
      microFocusCount: number;
    }
  >();

  const microFocusTracker = new Map<string, Set<string>>();

  for (const q of subtopic.questions) {
    const nameAr = q.specific_entity_name_arabic?.trim() || 'عام / متفرقات';
    const nameEn = q.specific_entity_name_english?.trim() || 'General / Unclassified';
    const slug = slugify(nameEn || nameAr);

    if (!entityMap.has(nameAr)) {
      entityMap.set(nameAr, {
        nameAr,
        nameEn,
        slug,
        questionsCount: 0,
        microFocusCount: 0,
      });
      microFocusTracker.set(nameAr, new Set());
    }

    const item = entityMap.get(nameAr)!;
    item.questionsCount += 1;

    if (q.question_micro_focus_arabic) {
      microFocusTracker.get(nameAr)!.add(q.question_micro_focus_arabic.trim());
    }
  }

  // Update microFocusCount
  for (const [nameAr, setObj] of microFocusTracker.entries()) {
    if (entityMap.has(nameAr)) {
      entityMap.get(nameAr)!.microFocusCount = Math.max(setObj.size, 1);
    }
  }

  const nodes = Array.from(entityMap.values());

  return (
    <div className="flex-1 min-h-screen pt-10 pb-24 bg-[#FCFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <SyllabusBreadcrumb
          items={[
            {
              label: `Unit ${subtopic.broad_topic.unit.unit_number}: ${subtopic.broad_topic.unit.name_english}`,
              labelAr: subtopic.broad_topic.unit.name_arabic,
              href: `/syllabus/${subtopic.broad_topic.unit.unit_number}`,
            },
            {
              label: subtopic.broad_topic.name_english,
              labelAr: subtopic.broad_topic.name_arabic,
              href: `/syllabus/${subtopic.broad_topic.unit.unit_number}/${subtopic.broad_topic.slug}`,
            },
            {
              label: subtopic.name_english,
              labelAr: subtopic.name_arabic,
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
                Unit {subtopic.broad_topic.unit.unit_number} • {subtopic.broad_topic.name_english}
              </div>
              <h1
                dir="rtl"
                lang="ar"
                className="font-arabic font-extrabold text-3xl sm:text-4xl text-stone-900 leading-snug mb-2"
              >
                {subtopic.name_arabic}
              </h1>
              <p className="text-stone-500 font-semibold text-base sm:text-lg">
                {subtopic.name_english}
              </p>
            </div>

            {/* Nodes Section Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest">
                Learning Nodes / Entities ({nodes.length})
              </h2>
              <span className="text-xs text-stone-400 font-semibold">
                Click a node to view its questions
              </span>
            </div>

            {/* Nodes Cards List */}
            <div className="space-y-4">
              {nodes.map((nodeItem, idx) => (
                <Link
                  key={nodeItem.slug || idx}
                  href={`/syllabus/${subtopic.broad_topic.unit.unit_number}/${subtopic.broad_topic.slug}/${subtopic.slug}/${nodeItem.slug}`}
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
                          {nodeItem.nameAr}
                        </div>
                        <div className="text-stone-500 font-semibold text-sm sm:text-base">
                          {nodeItem.nameEn}
                        </div>
                      </div>
                    </div>

                    {/* Right: Micro themes count, Qs Count & Arrow */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <div className="flex items-center gap-2.5 text-xs">
                        <span className="px-3 py-1.5 rounded-xl bg-stone-100 font-bold text-stone-700">
                          {nodeItem.microFocusCount} Themes
                        </span>
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-100">
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

              {nodes.length === 0 && (
                <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 text-stone-500 font-medium">
                  No learning nodes found for this sub-topic.
                </div>
              )}
            </div>
          </main>

          {/* Right Column: Contextual Sidebar */}
          <SyllabusContextSidebar
            levelBadge="Sub-topic Context"
            titleAr={subtopic.name_arabic}
            title={subtopic.name_english}
            subtitle={`This sub-topic contains ${nodes.length} targeted learning nodes.`}
            metrics={[
              { label: 'Learning Nodes', value: nodes.length, icon: Target },
              { label: 'Total Questions', value: subtopic.questions.length, icon: BookOpen },
            ]}
            practiceHref={`/practice?unit=${subtopic.broad_topic.unit.unit_number}&topic=${subtopic.broad_topic.slug}&subtopic=${subtopic.slug}`}
            practiceLabel="Practice Sub-topic"
            quickTips={[
              'Click any node above to inspect its complete question bank.',
              'Each node groups questions by specific authors and works.',
            ]}
          />

        </div>
      </div>
    </div>
  );
}
