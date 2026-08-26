'use client';

import React, { useState } from 'react';
import ResultTrophySvg from '@/components/ui/ResultTrophySvg';
import PieChartSvg from '@/components/ui/PieChartSvg';
import Link from 'next/link';
import { Brain, CheckCircle2, Sparkles, ArrowRight, AlertTriangle, BookOpen, Clock, Target } from 'lucide-react';
import toast from 'react-hot-toast';

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
  year,
  paper,
  correctCount,
  incorrectCount,
  unattemptedCount,
  totalQuestions,
  timeTaken = '00:00',
  questions = [],
  answers = {},
  evaluations = {},
  onViewReview,
}: ResultSummaryViewProps) {
  const [memoryAdded, setMemoryAdded] = useState(false);
  const [memoryLoading, setMemoryLoading] = useState(false);

  const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  const headerTitle =
    paper ||
    questions[0]?.exam_paper?.display_name ||
    questions[0]?.exam_paper?.exam_name ||
    (year ? `UGC NET – ${year}` : 'UGC NET CBT Results');

  // Compute Sectional Analysis
  const sectionsMap = new Map<
    string,
    {
      name_arabic: string;
      name_english: string;
      total: number;
      correct: number;
      incorrect: number;
      unit_number: number;
    }
  >();

  const incorrectQuestionIds: string[] = [];

  questions.forEach((q) => {
    const unit = q.unit || { name_arabic: 'مواضيع أخرى', name_english: 'Other Topics', unit_number: 99 };
    const key = String(unit.unit_number);

    if (!sectionsMap.has(key)) {
      sectionsMap.set(key, {
        name_arabic: unit.name_arabic,
        name_english: unit.name_english,
        total: 0,
        correct: 0,
        incorrect: 0,
        unit_number: unit.unit_number,
      });
    }

    const stat = sectionsMap.get(key)!;
    stat.total += 1;

    if (answers[q.id] !== undefined) {
      if (evaluations[q.id]?.isCorrect) {
        stat.correct += 1;
      } else {
        stat.incorrect += 1;
        incorrectQuestionIds.push(q.id);
      }
    } else {
      // Unattempted also count as missed
      incorrectQuestionIds.push(q.id);
    }
  });

  const sections = Array.from(sectionsMap.values()).sort((a, b) => a.unit_number - b.unit_number);

  // Weak areas: sections with < 50% accuracy
  const weakSections = sections.filter((s) => s.total > 0 && s.correct / s.total < 0.5);

  async function handleAddIncorrectToMemory() {
    if (incorrectQuestionIds.length === 0) {
      toast.success('Congratulations! You scored 100% correct!');
      return;
    }

    try {
      setMemoryLoading(true);
      const res = await fetch('/api/memories/remember', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionIds: incorrectQuestionIds,
          remember: true,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to add to memory queue');
      }

      setMemoryAdded(true);
      toast.success(`Enrolled ${incorrectQuestionIds.length} missed questions into 5-Level Memory (Level 1: 24h)!`);
    } catch {
      toast.error('Unable to queue to memory. Please make sure you are logged in.');
    } finally {
      setMemoryLoading(false);
    }
  }

  return (
    <div className="flex-1 bg-stone-50 overflow-y-auto font-sans p-4 sm:p-6 lg:p-10 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 size={13} /> Official CBT Exam Evaluation
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">{headerTitle}</h1>
            <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
              Completed on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onViewReview}
              className="px-5 py-2.5 bg-[#0C6240] hover:bg-[#094d32] text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all"
            >
              View Full Solutions
            </button>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs sm:text-sm rounded-xl transition-all"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* ── 1. MAIN SCORECARD ── */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col md:flex-row">
          <div className="p-6 sm:p-8 md:p-10 flex-1 border-b md:border-b-0 md:border-r border-stone-200/90">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
              <div>
                <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Total Score</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-stone-900">{correctCount * 2}</span>
                  <span className="text-lg sm:text-xl font-bold text-stone-400">/ {totalQuestions * 2} Marks</span>
                </div>
                <div className="text-xs font-bold text-emerald-700 mt-2">
                  {percentage >= 60 ? '🌟 JRF Cutoff Qualified Performance' : percentage >= 45 ? '👍 Good Effort — Focus on Weak Units' : '⚡ Systematic Revision Recommended'}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <div className="text-center px-3 sm:px-4 py-2 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="text-xl sm:text-2xl font-black text-emerald-700 mb-0.5">{correctCount}</div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Correct</div>
                </div>
                <div className="text-center px-3 sm:px-4 py-2 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="text-xl sm:text-2xl font-black text-rose-600 mb-0.5">{incorrectCount}</div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Incorrect</div>
                </div>
                <div className="text-center px-3 sm:px-4 py-2 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="text-xl sm:text-2xl font-black text-stone-700 mb-0.5">{unattemptedCount}</div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Unattempted</div>
                </div>
                <div className="text-center px-3 sm:px-4 py-2 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="text-xl sm:text-2xl font-black text-stone-900 mb-0.5">{percentage.toFixed(0)}%</div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Accuracy</div>
                </div>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-t border-b border-stone-100 mb-6">
              <div>
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Accuracy</div>
                <div className="text-base sm:text-lg font-bold text-stone-900">{percentage.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Time Taken</div>
                <div className="text-base sm:text-lg font-bold text-stone-900">{timeTaken}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Speed</div>
                <div className="text-base sm:text-lg font-bold text-stone-900">
                  {totalQuestions > 0 ? (160 / totalQuestions).toFixed(1) : 0} min / Q
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Negative Marks</div>
                <div className="text-base sm:text-lg font-bold text-emerald-700">0 (NTA Rule)</div>
              </div>
            </div>

            {/* 1-Click 5-Level Memory Action Banner */}
            {incorrectQuestionIds.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 border border-violet-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Brain size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-violet-950">
                      Anchor {incorrectQuestionIds.length} Missed Questions in Memory
                    </div>
                    <div className="text-xs text-violet-700 font-medium mt-0.5">
                      1-click adds all incorrect questions to your 5-level spaced repetition system (Level 1: 24h).
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddIncorrectToMemory}
                  disabled={memoryAdded || memoryLoading}
                  className={`shrink-0 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                    memoryAdded
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-violet-600 hover:bg-violet-700 text-white active:scale-95'
                  }`}
                >
                  {memoryLoading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : memoryAdded ? (
                    <>
                      <CheckCircle2 size={14} />
                      <span>Queued into Level 1 (24h)</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>Add to 5-Level Revision</span>
                    </>
                  )}
                </button>
              </div>
            )}

          </div>

          <div className="w-full md:w-[320px] bg-stone-50 flex items-center justify-center p-8 shrink-0">
            <ResultTrophySvg className="w-44 sm:w-full h-auto drop-shadow-lg" />
          </div>
        </div>

        {/* ── 2. SECTIONAL BREAKDOWN & WEAK AREAS ── */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Sectional Analysis Table */}
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-stone-900">Sectional Performance (10 Units)</h3>
              <span className="text-xs text-stone-400 font-medium">Syllabus Breakdown</span>
            </div>
            
            <div className="divide-y divide-stone-100 max-h-[380px] overflow-y-auto pr-1">
              {sections.length > 0 ? (
                sections.map((section, idx) => {
                  const secAccuracy = section.total > 0 ? (section.correct / section.total) * 100 : 0;
                  const isWeak = secAccuracy < 50;

                  return (
                    <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-stone-400">
                            UNIT {section.unit_number}
                          </span>
                          {isWeak && (
                            <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                              Weak Area
                            </span>
                          )}
                        </div>
                        <div dir="rtl" className="font-arabic font-bold text-stone-900 text-sm truncate mt-0.5">
                          {section.name_arabic}
                        </div>
                        <div className="text-stone-500 text-xs truncate">{section.name_english}</div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-stone-900">
                          {section.correct}/{section.total} Qs
                        </div>
                        <div className={`text-xs font-bold ${isWeak ? 'text-rose-600' : 'text-emerald-700'}`}>
                          {secAccuracy.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-stone-400 text-sm">No sectional data recorded.</div>
              )}
            </div>
          </div>

          {/* Performance Chart & Weak Areas Card */}
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-lg font-bold text-stone-900 mb-4">Weak Topics &amp; Recommendations</h3>
              
              {weakSections.length > 0 ? (
                <div className="space-y-3">
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                    <AlertTriangle size={18} className="text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-amber-900">Focus on these units before next mock:</div>
                      <ul className="mt-1 space-y-1 text-xs text-amber-800 font-medium list-disc list-inside">
                        {weakSections.slice(0, 3).map((w, i) => (
                          <li key={i}>
                            Unit {w.unit_number}: {w.name_english} ({((w.correct / w.total) * 100).toFixed(0)}%)
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href={`/syllabus/${weakSections[0].unit_number}`}
                    className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors block text-center"
                  >
                    <span>Practice Weak Unit {weakSections[0].unit_number}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-medium">
                  🎉 Great balance across all units! Keep up your consistency with daily spaced memory review.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-center">
              <PieChartSvg percentage={percentage} className="w-40 h-40" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
