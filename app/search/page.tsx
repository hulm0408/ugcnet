import type { Metadata } from 'next';
import prisma from '@/lib/db';

export async function generateMetadata(): Promise<Metadata> {
  const totalQuestions = await prisma.question.count({ where: { content_status: 'PUBLISHED' } });
  
  return {
    title: 'Search Questions',
    description: `Search ${totalQuestions.toLocaleString()} UGC NET Arabic previous year questions by keyword, topic, or year.`,
  };
}

export default function SearchPage() {
  return (
    <div className="flex-1 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Search Questions</h1>
          <p className="text-slate-500 text-sm mt-1">Find questions by keyword, year, or topic</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="relative">
            <input
              type="search"
              placeholder="Search in Arabic or English..."
              className="w-full pl-4 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all bg-slate-50"
            />
          </div>
          <p className="text-slate-400 text-xs mt-3 text-center">Full-text search coming soon. Use Practice or PYQ pages to browse questions.</p>
        </div>
      </div>
    </div>
  );
}
