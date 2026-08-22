import type { Metadata } from 'next';
import prisma from '@/lib/db';
import SyllabusList, { UnitData } from '@/components/syllabus/SyllabusList';
import { Layers, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Syllabus — UGC NET Arabic 10 Units',
  description: 'Complete UGC NET Arabic syllabus with all 10 official units. Practice unit-wise for focused preparation.',
};

export const dynamic = 'force-dynamic';

export default async function SyllabusPage() {
  // Fetch complete syllabus hierarchy from the database
  const units = await prisma.syllabusUnit.findMany({
    orderBy: { order_index: 'asc' },
    include: {
      broad_topics: {
        orderBy: { order_index: 'asc' },
        include: {
          subtopics: {
            orderBy: { order_index: 'asc' }
          }
        }
      }
    }
  });

  // Fetch question counts grouped by subtopic, broad_topic, and unit
  const [unitCounts, broadTopicCounts, subtopicCounts] = await Promise.all([
    prisma.question.groupBy({
      by: ['unit_id'],
      _count: { id: true },
      where: { content_status: 'PUBLISHED', unit_id: { not: null } }
    }),
    prisma.question.groupBy({
      by: ['broad_topic_id'],
      _count: { id: true },
      where: { content_status: 'PUBLISHED', broad_topic_id: { not: null } }
    }),
    prisma.question.groupBy({
      by: ['subtopic_id'],
      _count: { id: true },
      where: { content_status: 'PUBLISHED', subtopic_id: { not: null } }
    })
  ]);

  const unitCountMap = new Map(unitCounts.map((c: any) => [c.unit_id, c._count.id]));
  const broadTopicCountMap = new Map(broadTopicCounts.map((c: any) => [c.broad_topic_id, c._count.id]));
  const subtopicCountMap = new Map(subtopicCounts.map((c: any) => [c.subtopic_id, c._count.id]));

  // Map database records to the structure expected by SyllabusList
  const hierarchicalUnits = units.map((unit: any) => ({
    id: unit.id,
    number: unit.unit_number,
    nameAr: unit.name_arabic,
    nameEn: unit.name_english,
    questionCount: unitCountMap.get(unit.id) || 0,
    broadTopics: unit.broad_topics.map((bt: any) => ({
      id: bt.id,
      nameAr: bt.name_arabic,
      nameEn: bt.name_english,
      slug: bt.slug,
      questionCount: broadTopicCountMap.get(bt.id) || 0,
      subtopics: bt.subtopics.map((st: any) => ({
        id: st.id,
        nameAr: st.name_arabic,
        nameEn: st.name_english,
        slug: st.slug,
        questionCount: subtopicCountMap.get(st.id) || 0,
      }))
    }))
  }));

  return (
    <div className="flex-1 min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Header Section ── */}
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Syllabus</h1>
          <p className="text-stone-500 text-sm font-semibold mt-1">Official UGC NET Arabic Syllabus</p>
        </div>

        {/* ── Content Section ── */}
        <SyllabusList units={hierarchicalUnits as any} />
        
      </div>
    </div>
  );
}
