import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import SyllabusBreadcrumb from '@/components/syllabus/SyllabusBreadcrumb';
import SyllabusContextSidebar from '@/components/syllabus/SyllabusContextSidebar';
import NodeQuestionsView from '@/components/syllabus/NodeQuestionsView';
import { Layers, BookOpen, Target, Compass } from 'lucide-react';
import { resolveCanonicalEntity, slugify } from '@/lib/syllabusHierarchy';

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

  const topic = await prisma.broadTopic.findFirst({
    where: {
      slug: resolvedParams.topic_slug,
      unit: { unit_number: unitNum },
    },
  });

  if (!topic) return { title: 'Topic Not Found' };

  return {
    title: `Questions for ${resolvedParams.node_slug} — ${topic.name_english} | Syllabus`,
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

  if (!topic) return notFound();

  const targetSubSlug = decodeURIComponent(resolvedParams.subtopic_slug).toLowerCase();
  const targetNodeSlug = decodeURIComponent(resolvedParams.node_slug).toLowerCase();

  // 1. Filter by canonical subtopic
  const subtopicQuestions: typeof topic.questions = [];
  let subtopicNameAr = '';
  let subtopicNameEn = '';

  for (const q of topic.questions) {
    const canonical = resolveCanonicalEntity(q);
    if (canonical.slug === targetSubSlug) {
      subtopicQuestions.push(q);
      subtopicNameAr = canonical.nameAr;
      subtopicNameEn = canonical.nameEn;
    }
  }

  const pool = subtopicQuestions.length > 0 ? subtopicQuestions : topic.questions;

  // 2. Filter by node slug
  const matchingQuestions = pool.filter((q) => {
    const nodeAr = q.question_micro_focus_arabic?.trim() || 'أسئلة عامة وتطبيقات';
    const nodeEn = q.question_micro_focus_english?.trim() || 'General Questions & Analysis';
    const slugEn = slugify(nodeEn);
    const slugAr = slugify(nodeAr);

    return (
      slugEn === targetNodeSlug ||
      slugAr === targetNodeSlug ||
      nodeEn.toLowerCase() === targetNodeSlug ||
      nodeAr === targetNodeSlug
    );
  });

  const questionsToDisplay = matchingQuestions.length > 0 ? matchingQuestions : pool;

  const firstQ = questionsToDisplay[0];
  const nodeTitleAr = firstQ?.question_micro_focus_arabic || subtopicNameAr || 'أسئلة عامة';
  const nodeTitleEn = firstQ?.question_micro_focus_english || subtopicNameEn || 'General Questions';

  const practiceUrl = `/practice?unit=${topic.unit.unit_number}&topic=${topic.slug}&subtopic=${targetSubSlug}&node=${targetNodeSlug}`;

  return (
    <div className="flex-1 min-h-screen pt-10 pb-24 bg-[#FCFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
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
              label: subtopicNameEn || 'Sub-topic',
              labelAr: subtopicNameAr,
              href: `/syllabus/${topic.unit.unit_number}/${topic.slug}/${targetSubSlug}`,
            },
            {
              label: nodeTitleEn,
              labelAr: nodeTitleAr,
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
                {subtopicNameEn || topic.name_english} • Learning Node
              </div>
              <h1
                dir="rtl"
                lang="ar"
                className="font-arabic font-extrabold text-2xl sm:text-3xl text-stone-900 leading-snug mb-2"
              >
                {nodeTitleAr}
              </h1>
              <p className="text-stone-500 font-semibold text-sm sm:text-base">
                {nodeTitleEn}
              </p>
            </div>

            {/* Questions View Client Component */}
            <NodeQuestionsView
              questions={questionsToDisplay}
              nodeNameAr={nodeTitleAr}
              nodeNameEn={nodeTitleEn}
              practiceHref={practiceUrl}
            />
          </main>

          {/* Right Column: Contextual Sidebar */}
          <SyllabusContextSidebar
            levelBadge="Node Context"
            titleAr={nodeTitleAr}
            title={nodeTitleEn}
            subtitle={`Targeted question set containing ${questionsToDisplay.length} questions sourced from NTA previous year exams.`}
            metrics={[
              { label: 'Total Questions', value: questionsToDisplay.length, icon: BookOpen },
              { label: 'Sub-topic', value: subtopicNameEn || 'General', icon: Target },
              { label: 'Unit', value: `Unit ${topic.unit.unit_number}`, icon: Layers },
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
