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
    <div className="flex-1 bg-slate-50 min-h-screen">
      
      {/* ── Header Section ── */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-md">
            <Layers size={16} className="text-blue-400" />
            <span className="text-slate-300">Official NTA Structure</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            UGC NET Arabic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Syllabus</span>
          </h1>
          <p dir="rtl" lang="ar" className="font-arabic text-2xl text-slate-300 mb-2">
            وحدات المنهج الرسمية وتفرعاتها
          </p>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explore all 10 official units and browse questions systematically by topic and subtopic.
          </p>
        </div>
      </section>

      {/* ── Content Section ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Sparkles size={20} className="text-blue-500" />
          <h2 className="text-xl font-bold text-slate-900">Syllabus Explorer</h2>
        </div>
        
        <SyllabusList units={hierarchicalUnits as any} />
      </div>
    </div>
  );
}
