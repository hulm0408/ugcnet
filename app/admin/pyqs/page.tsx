import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Archive, Plus, CheckCircle2, Clock, Sparkles, Lock, ArrowLeft, Layers, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPyqsPage() {
  const papers = await prisma.examPaper.findMany({
    orderBy: [{ year: 'desc' }, { paper_number: 'asc' }],
    include: {
      _count: {
        select: { questions: true },
      },
    },
  });

  const totalQuestions = papers.reduce((acc, p) => acc + p._count.questions, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Archive size={13} />
            <span>PYQ Repository Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Exam Papers &amp; PYQs ({papers.length})
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-400 font-medium">
            Manage {totalQuestions.toLocaleString()} questions across {papers.length} historical UGC NET papers.
          </p>
        </div>

        <Link
          href="/pyq"
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl transition-colors border border-stone-700 flex items-center gap-1.5"
        >
          <span>Preview in Student View</span>
        </Link>
      </div>

      {/* Papers Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950/60 text-stone-400 uppercase font-mono text-[10px] tracking-wider border-b border-stone-800">
              <tr>
                <th className="py-3.5 px-5">Year &amp; Paper</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4 text-center">Questions</th>
                <th className="py-3.5 px-4 text-center">Access Tier</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-medium">
              {papers.map((paper) => (
                <tr key={paper.id} className="hover:bg-stone-800/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-white text-sm">
                      {paper.year} • {paper.display_name || paper.paper_number}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {paper.session || 'Official Session'} {paper.part ? `(${paper.part})` : ''}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-stone-400">
                    {paper.subject || 'Arabic (029)'}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-lg bg-stone-800 text-emerald-400 font-mono font-bold">
                      {paper._count.questions} Qs
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {paper.is_free_benchmark ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[10px]">
                        Free Benchmark
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-stone-800 text-stone-400 font-bold text-[10px]">
                        Pro Tier
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">
                      {paper.content_status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <Link
                      href={`/practice?paperId=${paper.id}&type=practice`}
                      className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                    >
                      <span>Inspect</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
