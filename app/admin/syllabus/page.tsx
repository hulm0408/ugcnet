import type { Metadata } from 'next';
import prisma from '@/lib/db';
import { Layers } from 'lucide-react';
import SyllabusManager from './SyllabusManager';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Manage Syllabus',
  description: 'Manage the official UGC NET Arabic syllabus structure',
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
            orderBy: { order_index: 'asc' }
          }
        }
      }
    }
  });

  return (
    <div className="flex-1 bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <Layers size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Syllabus Structure</h1>
            <p className="text-slate-500 mt-1">Manage official NTA units, topics, and subtopics.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8">
          <SyllabusManager initialUnits={units as any} />
        </div>
      </div>
    </div>
  );
}
