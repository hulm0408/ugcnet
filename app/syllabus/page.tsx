import type { Metadata } from 'next';
import prisma from '@/lib/db';
import SyllabusList, { UnitData } from '@/components/syllabus/SyllabusList';
import { Layers, Sparkles } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const unitsCount = await prisma.syllabusUnit.count();
  return {
    title: `Syllabus — UGC NET Arabic ${unitsCount} Units`,
    description: `Complete UGC NET Arabic syllabus with all ${unitsCount} official units. Practice unit-wise for focused preparation.`,
  };
}

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

  let totalTopics = 0;
  let totalNodes = 0;
  const totalQuestions = await prisma.question.count({ where: { content_status: 'PUBLISHED' } });
  
  // Map database records to the structure expected by SyllabusList
  const hierarchicalUnits = units.map((unit: any) => {
    const unitQCount = unitCountMap.get(unit.id) || 0;
    totalTopics += unit.broad_topics.length;
    
    return {
      id: unit.id,
      number: unit.unit_number,
      nameAr: unit.name_arabic,
      nameEn: unit.name_english,
      questionCount: unitQCount,
      broadTopics: unit.broad_topics.map((bt: any) => {
        totalNodes += bt.subtopics.length;
        return {
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
        };
      })
    };
  });

  return (
    <div className="flex-1 min-h-screen pt-12 pb-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ✨ Header Section ✨ */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">Syllabus</h1>
          <p className="text-stone-500 text-base font-medium mt-2">Official UGC NET Arabic Syllabus</p>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm text-center">
            <div className="text-3xl font-extrabold text-stone-900 mb-1">{units.length}</div>
            <div className="text-xs font-bold tracking-wider text-stone-400 uppercase">Units</div>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm text-center">
            <div className="text-3xl font-extrabold text-stone-900 mb-1">{totalTopics}</div>
            <div className="text-xs font-bold tracking-wider text-stone-400 uppercase">Topics</div>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm text-center">
            <div className="text-3xl font-extrabold text-stone-900 mb-1">{totalNodes}</div>
            <div className="text-xs font-bold tracking-wider text-stone-400 uppercase">Nodes</div>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#107A53]/10 rounded-full blur-xl -mr-4 -mt-4"></div>
            <div className="text-3xl font-extrabold text-[#107A53] mb-1 relative z-10">{totalQuestions.toLocaleString()}</div>
            <div className="text-xs font-bold tracking-wider text-[#107A53]/70 uppercase relative z-10">Questions</div>
          </div>
        </div>

        {/* ── Content Section ── */}
        <SyllabusList units={hierarchicalUnits as any} />
        
      </div>
    </div>
  );
}
