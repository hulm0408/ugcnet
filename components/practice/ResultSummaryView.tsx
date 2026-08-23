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
  questions?: any[];
  answers?: Record<string, string>;
  evaluations?: Record<string, any>;
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
  questions = [],
  answers = {},
  evaluations = {},
  onViewReview
}: ResultSummaryViewProps) {
  const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  
  // Compute Sectional Analysis
  const sectionsMap = new Map<string, { name_arabic: string, name_english: string, total: number, correct: number, incorrect: number, unit_number: number }>();
  
  questions.forEach(q => {
    const unit = q.unit || { name_arabic: 'مواضيع أخرى', name_english: 'Other Topics', unit_number: 99 };
    const key = String(unit.unit_number);
    
    if (!sectionsMap.has(key)) {
      sectionsMap.set(key, { 
        name_arabic: unit.name_arabic, 
        name_english: unit.name_english, 
        total: 0, correct: 0, incorrect: 0, 
        unit_number: unit.unit_number 
      });
    }
    
    const stat = sectionsMap.get(key)!;
    stat.total += 1;
    
    if (answers[q.id] !== undefined) {
      if (evaluations[q.id]?.isCorrect) {
        stat.correct += 1;
      } else {
        stat.incorrect += 1;
      }
    }
  });

  const sections = Array.from(sectionsMap.values()).sort((a, b) => a.unit_number - b.unit_number);
  
  // Find weakest section
  const weakestSection = sections.reduce((weakest, current) => {
    if (!weakest) return current;
    // Section with most incorrect answers, or lowest accuracy if tied
    if (current.incorrect > weakest.incorrect) return current;
    return weakest;
  }, null as any);

  return (
    <div className="flex-1 bg-gradient-to-b from-primary-surface to-white overflow-y-auto font-sans p-6 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-stone-900 to-stone-600 tracking-tight">UGC NET Arabic – {year} {paper}</h1>
          <p className="text-sm text-stone-500 font-medium mt-2">Test Completed on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} – {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>

        {/* 07. RESULT SUMMARY CARD */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-stone-200/60 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="p-6 sm:p-8 md:p-10 flex-1 border-b md:border-b-0 md:border-r border-stone-200/60 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
              <div>
                <div className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-1">Your Score</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-stone-900">{correctCount * 2}</span>
                  <span className="text-lg sm:text-xl font-bold text-stone-400">/ {totalQuestions * 2}</span>
                </div>
                <div className="text-sm font-medium text-primary mt-2">Good Job! Keep Improving.</div>
              </div>
              
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <div className="text-center px-2 sm:px-4">
                  <div className="text-xl sm:text-2xl font-bold text-primary mb-1">{correctCount}</div>
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

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
              <button
                onClick={onViewReview}
                className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-bold rounded-xl shadow-[0_8px_20px_-8px_rgba(16,122,83,0.5)] hover:bg-primary-dark hover:-translate-y-0.5 transition-all"
              >
                View Question Review
              </button>
              <Link href="/dashboard" className="w-full sm:w-auto text-center px-8 py-3.5 bg-white text-stone-600 border border-stone-200 font-bold rounded-xl hover:bg-stone-50 hover:shadow-sm transition-all">
                Go to Dashboard
              </Link>
            </div>
          </div>
          <div className="w-full md:w-[350px] bg-primary-surface/30 flex items-center justify-center p-8 sm:p-10 shrink-0 relative z-10">
            <ResultTrophySvg className="w-48 sm:w-full h-auto drop-shadow-2xl" />
          </div>
        </div>

        {/* 08. SECTIONAL ANALYSIS CARD */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-stone-200/60 shadow-sm p-8">
            <h3 className="text-xl font-bold text-stone-900 mb-6">Sectional Analysis</h3>
            
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
                {sections.length > 0 ? (
                  sections.map((section, idx) => {
                    const secAccuracy = section.total > 0 ? ((section.correct / section.total) * 100).toFixed(0) : '0';
                    return (
                      <tr key={idx}>
                        <td className="py-4">
                          <div dir="rtl" className="font-arabic font-bold text-stone-900 mb-1 text-right">{section.name_arabic}</div>
                          <div className="text-stone-500 text-xs">{section.name_english}</div>
                        </td>
                        <td className="py-4 text-center font-bold text-stone-900">{section.total}</td>
                        <td className="py-4 text-center font-bold text-primary">{section.correct}</td>
                        <td className="py-4 text-center font-bold text-rose-600">{section.incorrect}</td>
                        <td className="py-4 text-right font-bold text-stone-900">{secAccuracy}%</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-stone-500 text-sm">No sectional data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-stone-200/60 shadow-sm p-8 flex flex-col">
            <h3 className="text-xl font-bold text-stone-900 mb-6">Performance Overview</h3>
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

              {weakestSection && weakestSection.incorrect > 0 && (
                <div className="w-full bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-700 shrink-0">!</div>
                  <div>
                    <span className="font-bold text-stone-800">Focus more on:</span> <span dir="rtl" className="font-arabic text-stone-900 font-bold mx-1">{weakestSection.name_arabic}</span> <span className="text-stone-500">({weakestSection.name_english})</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
