import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Info } from 'lucide-react';
import YearFolderSvg from '@/components/ui/YearFolderSvg';

export const metadata: Metadata = {
  title: 'Select Paper — PYQs',
  description: 'Choose the specific paper or part for the selected year.',
};

export default function SelectYearPaperPage({ params }: { params: { year: string } }) {
  const { year } = params;

  // Mock available papers based on historical UGC NET structure
  // Usually there's Paper 2 (100 Qs) and sometimes Paper 3 (75 Qs) or shifts.
  const papers = [
    {
      id: 'paper1',
      title: 'Paper I',
      subtitle: '(General)',
      questions: 50,
      marks: 100,
      minutes: 60,
    },
    {
      id: 'paper2',
      title: 'Paper II',
      subtitle: '(Arabic)',
      questions: 100,
      marks: 200,
      minutes: 120,
    }
  ];

  // For older years (pre-2019), they had Paper 3. Let's conditionally add it.
  if (parseInt(year) < 2019) {
    papers.push({
      id: 'paper3',
      title: 'Paper III',
      subtitle: '(Arabic)',
      questions: 75,
      marks: 150,
      minutes: 150,
    });
  }

  return (
    <div className="flex-1 bg-stone-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-stone-500 mb-8">
          <Link href="/pyq" className="hover:text-[#107A53] transition-colors">PYQs</Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-stone-900">{year}</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl border border-stone-200 shadow-sm p-8 mb-8 overflow-hidden relative">
          
          <div className="flex-1 relative z-10">
            <h1 className="text-4xl font-bold text-stone-900 mb-2">Year {year}</h1>
            <p dir="rtl" className="text-2xl font-arabic font-bold text-[#D97706] mb-4">سنة {year}</p>
            <p className="text-stone-500">Select the paper / part you want to practice.</p>
          </div>

          <div className="w-full md:w-[350px] shrink-0 mt-8 md:mt-0 relative">
            <YearFolderSvg year={year} className="w-full h-auto drop-shadow-xl" />
          </div>

        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {papers.map((paper) => (
            <Link
              key={paper.id}
              href={`/practice?year=${year}&paper=${paper.id}`}
              className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#107A53] transition-all group relative overflow-hidden flex flex-col h-full"
            >
              {/* Highlight accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-stone-200 group-hover:bg-[#107A53] transition-colors" />
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-[#107A53] transition-colors">
                  {paper.title}
                </h3>
                <p className="text-sm font-medium text-stone-500 mt-1">{paper.subtitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mt-auto mb-6">
                <div>
                  <div className="text-stone-900 font-semibold">{paper.questions} Questions</div>
                </div>
                <div>
                  <div className="text-stone-900 font-semibold">{paper.marks} Marks</div>
                </div>
                <div>
                  <div className="text-stone-900 font-semibold">{paper.minutes} Minutes</div>
                </div>
              </div>

              <div className="flex items-center justify-end text-[#107A53]">
                <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm text-emerald-700 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Info size={14} className="text-emerald-700" />
          </div>
          <span className="font-medium">Tip: Check the paper pattern before starting the test.</span>
        </div>

      </div>
    </div>
  );
}
