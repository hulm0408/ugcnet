import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, BookOpen, Target } from 'lucide-react';
import prisma from '@/lib/db';
import QuillInkPotIcon from '@/components/ui/QuillInkPotIcon';

export async function generateMetadata({ params }: { params: { unit_number: string, topic_slug: string } }): Promise<Metadata> {
  const unitNum = parseInt(params.unit_number);
  
  if (isNaN(unitNum)) return { title: 'Topic Not Found' };

  const topic = await prisma.broadTopic.findFirst({
    where: { 
      slug: params.topic_slug,
      unit: { unit_number: unitNum }
    },
    include: { unit: true }
  });

  if (!topic) return { title: 'Topic Not Found' };

  return {
    title: `${topic.name_english} — Unit ${unitNum} | UGC NET Arabic`,
    description: `Explore ${topic.name_english} (${topic.name_arabic}). Practice questions for this specific topic.`,
  };
}

export default async function TopicPage({ params }: { params: { unit_number: string, topic_slug: string } }) {
  const unitNum = parseInt(params.unit_number);
  if (isNaN(unitNum)) return notFound();

  const topic = await prisma.broadTopic.findFirst({
    where: { 
      slug: params.topic_slug,
      unit: { unit_number: unitNum }
    },
    include: { 
      unit: true,
      subtopics: {
        orderBy: { order_index: 'asc' }
      }
    }
  });

  if (!topic) return notFound();

  // Fetch question counts for subtopics
  const subtopicCounts = await prisma.question.groupBy({
    by: ['subtopic_id'],
    _count: { id: true },
    where: { 
      content_status: 'PUBLISHED', 
      broad_topic_id: topic.id 
    }
  });

  const subtopicCountMap = new Map(subtopicCounts.map((c: any) => [c.subtopic_id, c._count.id]));

  const totalQuestions = Array.from(subtopicCountMap.values()).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="flex-1 min-h-screen pt-12 pb-24 bg-[#FCFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/syllabus" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-semibold text-sm">
            <ArrowLeft size={16} />
            Back to Syllabus
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Pane: Topic Details (Sticky) */}
          <div className="w-full lg:w-1/3 shrink-0">
            <div className="sticky top-24">
              
              <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#107A53]"></div>
                
                {/* Topic Icon/SVG (Quill / Inkpot concept) */}
                <div className="w-16 h-16 bg-stone-50 border border-stone-100 rounded-2xl flex items-center justify-center mb-6">
                   <QuillInkPotIcon className="w-12 h-12" />
                </div>

                <div className="text-[11px] font-bold tracking-widest text-[#107A53] uppercase mb-2">
                  Unit {topic.unit.unit_number} Topic
                </div>
                
                <h1 dir="rtl" lang="ar" className="font-arabic font-extrabold text-3xl text-stone-900 leading-tight mb-2">
                  {topic.name_arabic}
                </h1>
                
                <h2 className="text-stone-500 font-medium text-lg leading-snug mb-8">
                  {topic.name_english}
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 py-3 border-y border-stone-100">
                    <Target className="text-stone-400" size={20} />
                    <div>
                      <div className="text-stone-900 font-bold">{topic.subtopics.length}</div>
                      <div className="text-stone-500 text-[11px] uppercase tracking-wide font-bold">Nodes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 py-3 border-b border-stone-100">
                    <BookOpen className="text-stone-400" size={20} />
                    <div>
                      <div className="text-stone-900 font-bold">{totalQuestions}</div>
                      <div className="text-stone-500 text-[11px] uppercase tracking-wide font-bold">Questions</div>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/practice?unit=${topic.unit.unit_number}&topic=${topic.slug}`}
                  className="mt-8 w-full bg-[#107A53] hover:bg-[#0c6242] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors group/btn shadow-md shadow-[#107A53]/20"
                >
                  <PlayCircle size={20} className="group-hover/btn:scale-110 transition-transform" />
                  Practice Topic
                </Link>

              </div>
            </div>
          </div>

          {/* Right Pane: Nodes List */}
          <div className="flex-1">
            <h3 className="text-xl font-extrabold text-stone-900 mb-6">Learning Nodes</h3>
            
            <div className="space-y-4">
              {topic.subtopics.map((subtopic, index) => {
                const qCount = subtopicCountMap.get(subtopic.id) || 0;
                
                return (
                  <div key={subtopic.id} className="bg-white border border-stone-200 rounded-xl p-5 hover:border-stone-300 transition-colors shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    
                    <div className="w-10 h-10 rounded-lg bg-stone-50 text-stone-400 flex items-center justify-center font-bold text-sm shrink-0 border border-stone-100">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div dir="rtl" lang="ar" className="font-arabic font-bold text-stone-900 text-xl leading-snug mb-1">
                        {subtopic.name_arabic}
                      </div>
                      <div className="text-stone-500 text-xs font-bold uppercase tracking-wide">
                        {subtopic.name_english}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <div className="text-center px-4">
                        <div className="text-stone-900 font-bold">{qCount}</div>
                        <div className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">Qs</div>
                      </div>
                      
                      <Link
                        href={`/practice?unit=${topic.unit.unit_number}&topic=${topic.slug}&subtopic=${subtopic.slug}`}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                          qCount > 0 
                            ? 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm' 
                            : 'bg-stone-100 text-stone-400 pointer-events-none'
                        }`}
                      >
                        Start
                      </Link>
                    </div>

                  </div>
                );
              })}

              {topic.subtopics.length === 0 && (
                <div className="bg-white border border-stone-200 border-dashed rounded-2xl p-12 text-center">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                    <Target size={24} />
                  </div>
                  <p className="text-stone-500 font-medium">No learning nodes found for this topic yet.</p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
