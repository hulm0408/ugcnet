import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import SyllabusBreadcrumb from '@/components/syllabus/SyllabusBreadcrumb';
import SyllabusContextSidebar from '@/components/syllabus/SyllabusContextSidebar';
import NodeQuestionsView from '@/components/syllabus/NodeQuestionsView';
import { Layers, BookOpen, Target, Compass } from 'lucide-react';

function slugify(text: string): string {
  return (text || 'unnamed')
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    unit_number: string;
    topic_slug: string;
    subtopic_slug: string;
    node_slug: string;
  }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const unitNum = parseInt(resolvedParams.unit_number, 10);
  if (isNaN(unitNum)) return { title: 'Node Not Found' };

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

  if (!subtopic) return { title: 'Node Not Found' };

  return {
    title: `Questions for ${resolvedParams.node_slug} — ${subtopic.name_english} | Syllabus`,
    description: `Browse official UGC NET Arabic previous year questions categorized under ${resolvedParams.node_slug}.`,
  };
}

export default async function NodeQuestionsPage({
  params,
}: {
  params: Promise<{
    unit_number: string;
    topic_slug: string;
    subtopic_slug: string;
    node_slug: string;
  }>;
}) {
  const resolvedParams = await params;
  const unitNum = parseInt(resolvedParams.unit_number, 10);
  if (isNaN(unitNum)) return notFound();

  // Fetch the subtopic and its questions
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
        orderBy: { exam_paper: { year: 'desc' } },
        select: {
          id: true,
          original_question_number: true,
          question_arabic: true,
          question_english: true,
          options_arabic: true,
          options_english: true,
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
              session: true,
              display_name: true,
            },
          },
        },
      },
    },
  });

  if (!subtopic) return notFound();

  // Filter questions matching this node slug
  const targetSlug = decodeURIComponent(resolvedParams.node_slug).toLowerCase();

  const matchingQuestions = subtopic.questions.filter((q) => {
    const entityAr = q.specific_entity_name_arabic?.trim() || 'عام / متفرقات';
    const entityEn = q.specific_entity_name_english?.trim() || 'General / Unclassified';
    const slugEn = slugify(entityEn);
    const slugAr = slugify(entityAr);

    return (
      slugEn === targetSlug ||
      slugAr === targetSlug ||
      entityEn.toLowerCase() === targetSlug ||
      entityAr === targetSlug
    );
  });

  // Fallback: If no exact slug match, take all questions if target is 'all' or default
  const questionsToDisplay = matchingQuestions.length > 0 ? matchingQuestions : subtopic.questions;

  const firstQ = questionsToDisplay[0];
  const nodeNameAr = firstQ?.specific_entity_name_arabic || subtopic.name_arabic;
  const nodeNameEn = firstQ?.specific_entity_name_english || subtopic.name_english;

  const distinctThemes = Array.from(
    new Set(
      questionsToDisplay
        .map((q) => q.question_micro_focus_arabic)
        .filter(Boolean) as string[]
    )
  );

  const practiceUrl = `/practice?unit=${subtopic.broad_topic.unit.unit_number}&topic=${subtopic.broad_topic.slug}&subtopic=${subtopic.slug}&entity=${encodeURIComponent(nodeNameAr)}`;

  return (
    <div className="flex-1 min-h-screen pt-10 pb-24 bg-[#FCFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
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
              href: `/syllabus/${subtopic.broad_topic.unit.unit_number}/${subtopic.broad_topic.slug}/${subtopic.slug}`,
            },
            {
              label: nodeNameEn,
              labelAr: nodeNameAr,
            },
          ]}
        />

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Column: Questions ONLY */}
          <main className="flex-1 min-w-0">
            {/* Node Title Header Card */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5">
                Unit {subtopic.broad_topic.unit.unit_number} • {subtopic.name_english} Node
              </div>
              <h1
                dir="rtl"
                lang="ar"
                className="font-arabic font-extrabold text-3xl sm:text-4xl text-stone-900 leading-snug mb-2"
              >
                {nodeNameAr}
              </h1>
              <p className="text-stone-500 font-semibold text-base sm:text-lg">
                {nodeNameEn}
              </p>
            </div>

            {/* Questions View Client Component */}
            <NodeQuestionsView
              questions={questionsToDisplay}
              nodeNameAr={nodeNameAr}
              nodeNameEn={nodeNameEn}
              practiceHref={practiceUrl}
            />
          </main>

          {/* Right Column: Contextual Sidebar */}
          <SyllabusContextSidebar
            levelBadge="Node Context"
            titleAr={nodeNameAr}
            title={nodeNameEn}
            subtitle={`Targeted question set containing ${questionsToDisplay.length} questions sourced from NTA previous year exams.`}
            metrics={[
              { label: 'Total Questions', value: questionsToDisplay.length, icon: BookOpen },
              { label: 'Micro Themes', value: distinctThemes.length || 1, icon: Target },
              { label: 'Unit', value: `Unit ${subtopic.broad_topic.unit.unit_number}`, icon: Layers },
            ]}
            practiceHref={practiceUrl}
            practiceLabel="Practice These Questions"
            quickTips={[
              'Click Reveal Answer on any question to check the official answer key.',
              'Click "Practice These Questions" to test yourself in interactive exam mode.',
            ]}
          />

        </div>
      </div>
    </div>
  );
}
