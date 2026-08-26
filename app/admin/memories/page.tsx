import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Brain, Trophy, CheckCircle2, Clock, Sparkles, Layers, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminMemoriesPage() {
  const [totalQueued, totalConnections, totalReviewLogs, level1Count, level2Count, level3Count, level4Count, level5Count] = await Promise.all([
    prisma.spacedMemoryQueue.count(),
    prisma.memoryConnection.count(),
    prisma.memoryReviewLog.count(),
    prisma.spacedMemoryQueue.count({ where: { level: 1 } }),
    prisma.spacedMemoryQueue.count({ where: { level: 2 } }),
    prisma.spacedMemoryQueue.count({ where: { level: 3 } }),
    prisma.spacedMemoryQueue.count({ where: { level: 4 } }),
    prisma.spacedMemoryQueue.count({ where: { level: 5 } }),
  ]);

  const recentConnections = await prisma.memoryConnection.findMany({
    take: 10,
    orderBy: { created_at: 'desc' },
    include: {
      user: { select: { name: true, email: true } },
      question: { select: { original_question_number: true, question_arabic: true } },
    },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Brain size={13} />
            <span>Spaced Repetition &amp; Memory Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            5-Level Memory &amp; User Reviews
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-400 font-medium">
            Monitor active recall queues, synaptic consolidation levels, and candidate mnemonic anchors.
          </p>
        </div>
      </div>

      {/* Level Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { lvl: 1, name: 'Level 1 (24h)', count: level1Count, color: 'text-rose-400' },
          { lvl: 2, name: 'Level 2 (2-3d)', count: level2Count, color: 'text-amber-400' },
          { lvl: 3, name: 'Level 3 (1w)', count: level3Count, color: 'text-yellow-400' },
          { lvl: 4, name: 'Level 4 (2-3w)', count: level4Count, color: 'text-emerald-400' },
          { lvl: 5, name: 'Level 5 (Mastery)', count: level5Count, color: 'text-purple-400' },
        ].map((item) => (
          <div key={item.lvl} className="bg-stone-900 border border-stone-800 rounded-2xl p-4 text-center">
            <div className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider">{item.name}</div>
            <div className={`text-2xl font-black mt-1 ${item.color}`}>{item.count}</div>
            <div className="text-[10px] text-stone-500 mt-0.5 font-medium">Items in Queue</div>
          </div>
        ))}
      </div>

      {/* Recent User Memory Connections */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Recent Candidate Memory Connections</h3>
          <span className="text-xs text-stone-400 font-mono">Total Created: {totalConnections}</span>
        </div>

        {recentConnections.length > 0 ? (
          <div className="divide-y divide-stone-800">
            {recentConnections.map((conn) => (
              <div key={conn.id} className="py-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400">{conn.user.name || conn.user.email}</span>
                  <span className="text-[10px] font-mono text-stone-500">
                    Type: <strong className="text-stone-300">{conn.type}</strong>
                  </span>
                </div>
                <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800 text-xs text-stone-300">
                  {conn.content}
                </div>
                <div dir="rtl" className="font-arabic text-stone-400 text-xs truncate text-right">
                  Q{conn.question.original_question_number}: {conn.question.question_arabic}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-stone-500 text-xs">
            No memory connections recorded yet. Students can attach tricks from the Question View.
          </div>
        )}
      </div>

    </div>
  );
}
