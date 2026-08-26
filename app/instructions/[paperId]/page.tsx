import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { AlertCircle, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { formatTestDuration } from '@/lib/dateUtils';

import InstructionsClient from './InstructionsClient';

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

  // Calculate dynamic time limit based on 1 minute 20 seconds (80s) per question
  const questionCount = paper._count.questions;
  const durationInfo = formatTestDuration(questionCount);

  return (
    <div className="flex-1 bg-[#FAF9F6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-t-2xl border border-stone-200 border-b-0 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-stone-900 mb-2">{paper.display_name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-stone-500">
            <div className="flex items-center gap-1.5"><FileText size={16} /> {questionCount} Questions</div>
            <div className="flex items-center gap-1.5"><Clock size={16} /> {durationInfo.formattedText} (1m 20s / Q)</div>
            <div className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold">{paper.year}</div>
            {paper.session && <div className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-semibold">{paper.session}</div>}
          </div>
        </div>

        {/* Instructions Body */}
        <div className="bg-white border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="mb-6 pb-6 border-b border-stone-100">
            <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-emerald-800" /> General Instructions
            </h2>
            <ul className="space-y-3 text-sm text-stone-600 leading-relaxed list-disc list-outside ml-5">
              <li>The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination.</li>
              <li>When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.</li>
              <li>The Question Palette displayed on the right side of screen will show the status of each question.</li>
              <li>You can navigate between questions by clicking on the question number in the Question Palette at the right of your screen.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-800" /> Navigating & Answering
            </h2>
            <ul className="space-y-3 text-sm text-stone-600 leading-relaxed list-disc list-outside ml-5">
              <li>To select your answer, click on the button of one of the options.</li>
              <li>To deselect your chosen answer, click on the button of the chosen option again or click on the <b>Clear Response</b> button.</li>
              <li>To change your chosen answer, click on the button of another option.</li>
              <li>To save your answer, you MUST click on the <b>Save & Next</b> button.</li>
              <li>To mark the question for review, click on the <b>Mark for Review & Next</b> button.</li>
            </ul>
          </div>

          <InstructionsClient paperId={paper.id} />
        </div>
      </div>
    </div>
  );
}
