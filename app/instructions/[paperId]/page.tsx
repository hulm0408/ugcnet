import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { AlertCircle, Clock, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mock Test Instructions — Arabic NET/JRF',
};

type PageProps = {
  params: Promise<{ paperId: string }>;
};

export default async function InstructionsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const paper = await prisma.examPaper.findUnique({
    where: { id: resolvedParams.paperId },
    include: {
      _count: {
        select: { questions: { where: { content_status: 'PUBLISHED' } } }
      }
    }
  });

  if (!paper) {
    redirect('/pyq');
  }

  // Calculate generic time limit based on questions (e.g. 1 min per question or standard 120 mins)
  const questionCount = paper._count.questions;
  const timeLimit = questionCount > 50 ? 120 : 60; // Just a mock estimate

  return (
    <div className="flex-1 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-t-2xl border border-slate-200 border-b-0 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{paper.display_name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-1.5"><FileText size={16} /> {questionCount} Questions</div>
            <div className="flex items-center gap-1.5"><Clock size={16} /> {timeLimit} Minutes</div>
            <div className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">{paper.year}</div>
            {paper.session && <div className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">{paper.session}</div>}
          </div>
        </div>

        {/* Instructions Body */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="mb-6 pb-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-blue-600" /> General Instructions
            </h2>
            <ul className="space-y-3 text-sm text-slate-600 leading-relaxed list-disc list-outside ml-5">
              <li>The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination.</li>
              <li>When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.</li>
              <li>The Question Palette displayed on the right side of screen will show the status of each question.</li>
              <li>You can navigate between questions by clicking on the question number in the Question Palette at the right of your screen.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-600" /> Navigating & Answering
            </h2>
            <ul className="space-y-3 text-sm text-slate-600 leading-relaxed list-disc list-outside ml-5">
              <li>To select your answer, click on the button of one of the options.</li>
              <li>To deselect your chosen answer, click on the button of the chosen option again or click on the <b>Clear Response</b> button.</li>
              <li>To change your chosen answer, click on the button of another option.</li>
              <li>To save your answer, you MUST click on the <b>Save & Next</b> button.</li>
              <li>To mark the question for review, click on the <b>Mark for Review & Next</b> button.</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-sm text-blue-900">
            <strong>Declaration:</strong> I have read and understood the instructions. I agree that in case I do not follow the instructions, I shall be disqualified.
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-white rounded-b-2xl border border-slate-200 border-t-0 p-6 sm:p-8 flex flex-wrap justify-between items-center gap-4">
          <Link href="/pyq" className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
            Cancel
          </Link>
          <Link 
            href={`/practice?paper=${paper.id}`}
            className="px-8 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
          >
            I am ready to begin
          </Link>
        </div>

      </div>
    </div>
  );
}
