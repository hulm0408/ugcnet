import type { Metadata } from 'next';
import prisma from '@/lib/db';
import { Layers } from 'lucide-react';
import SyllabusManager from './SyllabusManager';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Manage Syllabus — Admin Panel',
  description: 'Manage the official UGC NET syllabus structure',
};

export const dynamic = 'force-dynamic';

export default async function AdminSyllabusPage() {
  const session = await auth();
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    redirect('/login');
  }

  // Fetch complete syllabus hierarchy from the database
  const units = await prisma.syllabusUnit.findMany({
    orderBy: { order_index: 'asc' },
    include: {
      broad_topics: {
        orderBy: { order_index: 'asc' },
        include: {
          subtopics: {
            orderBy: { order_index: 'asc' },
          },
        },
      },
    },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Layers size={13} />
            <span>Curriculum Hierarchy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Syllabus Knowledge Graph</h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-400 font-medium">
            Manage official NTA units, broad topics, subtopics, and concept nodes.
          </p>
        </div>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <SyllabusManager initialUnits={units as any} />
      </div>
    </div>
  );
}
