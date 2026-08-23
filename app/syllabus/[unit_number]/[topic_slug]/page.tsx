import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, BookOpen, Target, Layers } from 'lucide-react';
import prisma from '@/lib/db';
import QuillInkPotIcon from '@/components/ui/QuillInkPotIcon';
import HierarchyTreeExplorer, { HierarchyNode, SubNodeEntity } from '@/components/syllabus/HierarchyTreeExplorer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unit_number: string; topic_slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const unitNum = parseInt(resolvedParams.unit_number);

  if (isNaN(unitNum)) return { title: 'Topic Not Found' };

  const topic = await prisma.broadTopic.findFirst({
    where: {
      slug: resolvedParams.topic_slug,
      unit: { unit_number: unitNum },
    },
    include: { unit: true },
  });

  if (!topic) return { title: 'Topic Not Found' };

  return {
    title: `${topic.name_english} — Unit ${unitNum} | UGC NET Arabic`,
    description: `Explore ${topic.name_english} (${topic.name_arabic}) deep hierarchy, learning nodes, targeted entities, and previous year questions.`,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ unit_number: string; topic_slug: string }>;
}) {
  const resolvedParams = await params;
  const unitNum = parseInt(resolvedParams.unit_number);
  if (isNaN(unitNum)) return notFound();

  // Fetch Topic with its Subtopics and published Questions classified under them
  const topic = await prisma.broadTopic.findFirst({
    where: {
      slug: resolvedParams.topic_slug,
      unit: { unit_number: unitNum },
    },
    include: {
      unit: true,
      subtopics: {
        orderBy: { order_index: 'asc' },
        include: {
          questions: {
            where: { content_status: 'PUBLISHED' },
            orderBy: { created_at: 'asc' },
            select: {
              id: true,
              original_question_number: true,
              question_arabic: true,
              question_english: true,
              options_arabic: true,
              correct_answer: true,
              correct_answer_text_arabic: true,
              specific_entity_name_arabic: true,
              specific_entity_name_english: true,
              question_micro_focus_arabic: true,
              question_micro_focus_english: true,
              exam_paper: {
                select: {
                  year: true,
                  paper_number: true,
                  display_name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!topic) return notFound();

  // Group into deep multi-level hierarchy: Node (L3) -> Entities (L4) -> MicroFocuses (L5) -> Questions (L6)
  let totalQuestionsCount = 0;
  let totalSubNodesCount = 0;

  const structuredNodes: HierarchyNode[] = topic.subtopics.map((st) => {
    totalQuestionsCount += st.questions.length;

    // Group questions by Entity / Sub-Node (Level 4)
    const entityMap = new Map<
      string,
      {
        nameAr: string;
        nameEn: string;
        totalQuestions: number;
        microFocusMap: Map<
          string,
          {
            nameAr: string;
            nameEn: string;
            questions: typeof st.questions;
          }
        >;
      }
    >();

    for (const q of st.questions) {
      const entityAr = q.specific_entity_name_arabic?.trim() || 'عام / متفرقات';
      const entityEn = q.specific_entity_name_english?.trim() || 'General / Unclassified';

      if (!entityMap.has(entityAr)) {
        entityMap.set(entityAr, {
          nameAr: entityAr,
          nameEn: entityEn,
          totalQuestions: 0,
          microFocusMap: new Map(),
        });
      }

      const entity = entityMap.get(entityAr)!;
      entity.totalQuestions += 1;

      // Group questions by Micro Focus (Level 5)
      const microAr = q.question_micro_focus_arabic?.trim() || 'أسئلة عامة';
      const microEn = q.question_micro_focus_english?.trim() || 'General Questions';

      if (!entity.microFocusMap.has(microAr)) {
        entity.microFocusMap.set(microAr, {
          nameAr: microAr,
          nameEn: microEn,
          questions: [],
        });
      }

      entity.microFocusMap.get(microAr)!.questions.push(q);
    }

    const entities: SubNodeEntity[] = Array.from(entityMap.values()).map((e) => ({
      nameAr: e.nameAr,
      nameEn: e.nameEn,
      totalQuestions: e.totalQuestions,
      microFocuses: Array.from(e.microFocusMap.values()),
    }));

    totalSubNodesCount += entities.length;

    return {
      id: st.id,
      nameAr: st.name_arabic,
      nameEn: st.name_english,
      slug: st.slug,
      totalQuestions: st.questions.length,
      entities,
    };
  });

  return (
    <div className="flex-1 min-h-screen pt-10 pb-24 bg-[#FCFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/syllabus"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-bold text-sm bg-white border border-stone-200 px-4 py-2 rounded-xl shadow-sm hover:shadow"
          >
            <ArrowLeft size={16} />
            Back to All Units
          </Link>

          <div className="text-xs font-bold text-stone-400 uppercase tracking-widest hidden sm:block">
            Unit {topic.unit.unit_number} • {topic.name_english}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Pane: Topic Details (Sticky Overview Card) */}
          <div className="w-full lg:w-1/3 shrink-0">
            <div className="sticky top-24">
              <div className="bg-white border border-stone-200/90 rounded-3xl p-7 sm:p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#107A53]"></div>

                {/* Topic Icon */}
                <div className="w-16 h-16 bg-stone-50 border border-stone-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <QuillInkPotIcon className="w-12 h-12" />
                </div>

                <div className="text-[11px] font-bold tracking-widest text-[#107A53] uppercase mb-1.5">
                  Unit {topic.unit.unit_number} Topic
                </div>

                <h1
                  dir="rtl"
                  lang="ar"
                  className="font-arabic font-extrabold text-3xl text-stone-900 leading-tight mb-2"
                >
                  {topic.name_arabic}
                </h1>

                <h2 className="text-stone-500 font-bold text-lg leading-snug mb-8">
                  {topic.name_english}
                </h2>

                {/* Hierarchy Depth Metrics */}
                <div className="space-y-3.5 bg-stone-50/70 p-4 rounded-2xl border border-stone-100 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-semibold flex items-center gap-2">
                      <Target size={15} className="text-primary" />
                      Learning Nodes
                    </span>
                    <span className="text-stone-900 font-bold">{topic.subtopics.length}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-semibold flex items-center gap-2">
                      <Layers size={15} className="text-primary" />
                      Sub-Nodes / Entities
                    </span>
                    <span className="text-stone-900 font-bold">{totalSubNodesCount}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-semibold flex items-center gap-2">
                      <BookOpen size={15} className="text-primary" />
                      Classified Questions
                    </span>
                    <span className="text-[#107A53] font-black">{totalQuestionsCount}</span>
                  </div>
                </div>

                {/* Practice Full Topic Button */}
                <Link
                  href={`/practice?unit=${topic.unit.unit_number}&topic=${topic.slug}`}
                  className="w-full bg-[#107A53] hover:bg-[#0C6240] text-white hover:text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all group/btn shadow-md shadow-[#107A53]/20 active:scale-95"
                >
                  <PlayCircle size={20} className="group-hover/btn:scale-110 transition-transform" />
                  Practice Full Topic
                </Link>
              </div>
            </div>
          </div>

          {/* Right Pane: Deep Hierarchy Tree Explorer */}
          <div className="flex-1 min-w-0">
            <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                  Learning Nodes & Hierarchy Tree
                </h3>
                <p className="text-stone-500 text-sm mt-0.5">
                  Drill down from Node ➔ Sub-Nodes / Poets ➔ Questions Preview
                </p>
              </div>
            </div>

            <HierarchyTreeExplorer
              unitNumber={unitNum}
              topicSlug={topic.slug}
              nodes={structuredNodes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
