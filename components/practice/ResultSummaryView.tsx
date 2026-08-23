import React from 'react';
import ResultTrophySvg from '@/components/ui/ResultTrophySvg';
import PieChartSvg from '@/components/ui/PieChartSvg';
import Link from 'next/link';

interface ResultSummaryViewProps {
  year?: string;
  paper?: string;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  totalQuestions: number;
  timeTaken?: string;
  onViewReview: () => void;
}

export default function ResultSummaryView({
  year = '2009',
  paper = 'Paper II',
  correctCount,
  incorrectCount,
  unattemptedCount,
  totalQuestions,
  timeTaken = '01:35:12', // Mocked time taken
  onViewReview
}: ResultSummaryViewProps) {
  const percentage = (correctCount / totalQuestions) * 100;
  
  return (
    <div className="flex-1 bg-stone-50 overflow-y-auto font-sans p-6 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-stone-900">UGC NET Arabic – {year} {paper}</h1>
          <p className="text-sm text-stone-500 font-medium mt-1">Test Completed on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} – {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>

        {/* 07. RESULT SUMMARY CARD */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
          <div className="p-6 sm:p-8 md:p-10 flex-1 border-b md:border-b-0 md:border-r border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
              <div>
                <div className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-1">Your Score</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-stone-900">{correctCount * 2}</span>
                  <span className="text-lg sm:text-xl font-bold text-stone-400">/ {totalQuestions * 2}</span>
                </div>
                <div className="text-sm font-medium text-[#107A53] mt-2">Good Job! Keep Improving.</div>
              </div>
              
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <div className="text-center px-2 sm:px-4">
                  <div className="text-xl sm:text-2xl font-bold text-[#107A53] mb-1">{correctCount}</div>
                  <div className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider">Correct</div>
                </div>
                <div className="text-center px-2 sm:px-4">
                  <div className="text-xl sm:text-2xl font-bold text-rose-600 mb-1">{incorrectCount}</div>
                  <div className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider">Incorrect</div>
                </div>
                <div className="text-center px-2 sm:px-4">
                  <div className="text-xl sm:text-2xl font-bold text-stone-900 mb-1">{unattemptedCount}</div>
                  <div className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider">Unattempted</div>
                </div>
                <div className="text-center px-2 sm:px-4">
                  <div className="text-xl sm:text-2xl font-bold text-stone-900 mb-1">{percentage.toFixed(0)}%</div>
                  <div className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider">Accuracy</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-6 border-t border-b border-stone-100 mb-8">
              <div>
                <div className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Percentage</div>
                <div className="text-base sm:text-lg font-bold text-stone-900">{percentage.toFixed(0)}%</div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Rank <span className="lowercase normal-case font-normal hidden sm:inline">(If available)</span></div>
                <div className="text-base sm:text-lg font-bold text-stone-900">—</div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Time Taken</div>
                <div className="text-base sm:text-lg font-bold text-stone-900">{timeTaken}</div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Total Questions</div>
                <div className="text-base sm:text-lg font-bold text-stone-900">{totalQuestions}</div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Positive Marks</div>
                <div className="text-base sm:text-lg font-bold text-stone-900">{correctCount * 2}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={onViewReview}
                className="w-full sm:w-auto px-6 py-3 bg-[#107A53] text-white font-bold rounded-xl shadow-md hover:bg-[#0c5c3e] transition-colors"
              >
                View Question Review
              </button>
              <Link href="/dashboard" className="w-full sm:w-auto text-center px-6 py-3 bg-white text-stone-600 border border-stone-200 font-bold rounded-xl hover:bg-stone-50 transition-colors">
                Go to Dashboard
              </Link>
            </div>
          </div>
          <div className="w-full md:w-[350px] bg-[#FCFAF8] flex items-center justify-center p-8 sm:p-10 shrink-0">
            <ResultTrophySvg className="w-48 sm:w-full h-auto drop-shadow-2xl" />
          </div>
        </div>

        {/* 08. SECTIONAL ANALYSIS CARD */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
            <h3 className="text-lg font-bold text-stone-900 mb-6">Sectional Analysis</h3>
            
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                  <th className="pb-3">Section</th>
                  <th className="pb-3 text-center">Questions</th>
                  <th className="pb-3 text-center">Correct</th>
                  <th className="pb-3 text-center">Incorrect</th>
                  <th className="pb-3 text-right">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {/* Mocked sections since we can't always compute them live yet */}
                <tr>
                  <td className="py-4">
                    <div dir="rtl" className="font-arabic font-bold text-stone-900 mb-1 text-right">الأدب في العصر الجاهلي</div>
                    <div className="text-stone-500 text-xs">Pre-Islamic Literature</div>
                  </td>
                  <td className="py-4 text-center font-bold text-stone-900">10</td>
                  <td className="py-4 text-center font-bold text-[#107A53]">8</td>
                  <td className="py-4 text-center font-bold text-rose-600">2</td>
                  <td className="py-4 text-right font-bold text-stone-900">80%</td>
                </tr>
                <tr>
                  <td className="py-4">
                    <div dir="rtl" className="font-arabic font-bold text-stone-900 mb-1 text-right">الأدب في العصر العباسي</div>
                    <div className="text-stone-500 text-xs">Abbasid Period Literature</div>
                  </td>
                  <td className="py-4 text-center font-bold text-stone-900">10</td>
                  <td className="py-4 text-center font-bold text-[#107A53]">7</td>
                  <td className="py-4 text-center font-bold text-rose-600">3</td>
                  <td className="py-4 text-right font-bold text-stone-900">70%</td>
                </tr>
                <tr>
                  <td className="py-4">
                    <div dir="rtl" className="font-arabic font-bold text-stone-900 mb-1 text-right">النثر</div>
                    <div className="text-stone-500 text-xs">Prose</div>
                  </td>
                  <td className="py-4 text-center font-bold text-stone-900">10</td>
                  <td className="py-4 text-center font-bold text-[#107A53]">6</td>
                  <td className="py-4 text-center font-bold text-rose-600">4</td>
                  <td className="py-4 text-right font-bold text-stone-900">60%</td>
                </tr>
                <tr>
                  <td className="py-4">
                    <div dir="rtl" className="font-arabic font-bold text-stone-900 mb-1 text-right">النقد الأدبي</div>
                    <div className="text-stone-500 text-xs">Literary Criticism</div>
                  </td>
                  <td className="py-4 text-center font-bold text-stone-900">10</td>
                  <td className="py-4 text-center font-bold text-[#107A53]">8</td>
                  <td className="py-4 text-center font-bold text-rose-600">2</td>
                  <td className="py-4 text-right font-bold text-stone-900">80%</td>
                </tr>
                <tr>
                  <td className="py-4">
                    <div dir="rtl" className="font-arabic font-bold text-stone-900 mb-1 text-right">اللغة والأسلوب</div>
                    <div className="text-stone-500 text-xs">Language & Style</div>
                  </td>
                  <td className="py-4 text-center font-bold text-stone-900">10</td>
                  <td className="py-4 text-center font-bold text-[#107A53]">7</td>
                  <td className="py-4 text-center font-bold text-rose-600">3</td>
                  <td className="py-4 text-right font-bold text-stone-900">70%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8 flex flex-col">
            <h3 className="text-lg font-bold text-stone-900 mb-6">Performance Overview</h3>
            <div className="flex-1 flex flex-col items-center justify-center">
              <PieChartSvg percentage={percentage} className="w-48 h-48 mb-8" />
              
              <div className="grid grid-cols-2 gap-x-12 gap-y-4 w-full max-w-sm mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#107A53]" />
                  <span className="text-sm font-bold text-stone-700">Correct ({correctCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-rose-600" />
                  <span className="text-sm font-bold text-stone-700">Incorrect ({incorrectCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#FEF2F2] border border-[#FEE2E2]" />
                  <span className="text-sm font-bold text-stone-700">Unattempted ({unattemptedCount})</span>
                </div>
              </div>

              <div className="w-full bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-700 shrink-0">!</div>
                <div>
                  <span className="font-bold text-stone-800">Focus more on:</span> <span dir="rtl" className="font-arabic text-stone-900 font-bold mx-1">الأدب في العصر العباسي</span> <span className="text-stone-500">(Prose, Abbasid Literature)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
