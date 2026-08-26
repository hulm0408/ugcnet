'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle2, XCircle, Zap, ArrowRight, Brain, Lightbulb } from 'lucide-react';
import BilingualText from '@/components/ui/BilingualText';

interface DailyQuestionChallengeProps {
  subjectName: string;
  subjectCode: string;
}

export default function DailyQuestionChallenge({
  subjectName,
  subjectCode,
}: DailyQuestionChallengeProps) {
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTrick, setShowTrick] = useState(false);

  // Daily high-yield question
  const dailyQ = {
    id: 'daily-q-today',
    title: 'Daily High-Yield Question of the Day',
    meta: 'Unit 1 • Classical Poetry • 2023 June Cycle',
    arabic: 'مَنْ هُوَ الشَّاعِرُ الْمُلَقَّبُ بِـ "ذِي الْقُرُوحِ" وَ"الْمَلِكِ الضِّلِّيلِ"؟',
    english: 'Which poet was titled "Dhu al-Quruh" (The One with Sores) and "Al-Malik al-Dillil" (The Wandering King)?',
    options: [
      { id: 'A', ar: 'امرؤ القيس (Imru\' al-Qais)', en: 'Imru\' al-Qais', isCorrect: true },
      { id: 'B', ar: 'طرفة بن العبد (Tarafa)', en: 'Tarafa ibn al-Abd', isCorrect: false },
      { id: 'C', ar: 'زهير بن أبي سلمى (Zuhayr)', en: 'Zuhayr ibn Abi Sulma', isCorrect: false },
      { id: 'D', ar: 'عنترة بن شداد (Antarah)', en: 'Antarah ibn Shaddad', isCorrect: false },
    ],
    trick: 'The King (Al-Malik al-Dillil) who wandered seeking his father\'s kingdom, poisoned in exile (Dhu al-Quruh) = Imru\' al-Qais.',
    explanation: 'Imru\' al-Qais ibn Hujr was known as "The Wandering King" after the assassination of his father Hujr, and "Dhu al-Quruh" due to the poisoned robe sent by the Byzantine Emperor Justinian.',
  };

  const handleSelect = (id: string) => {
    if (isSubmitted) return;
    setSelectedOpt(id);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-[#07271D] to-stone-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-emerald-800/60 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Zap size={18} />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              DAILY POWER CHALLENGE (+50 XP)
            </div>
            <div className="text-sm font-black text-white">{dailyQ.meta}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono bg-emerald-900/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-600/40 font-bold">
            Today&apos;s Challenge
          </span>
        </div>
      </div>

      {/* Question Text */}
      <div className="space-y-4 mb-7">
        <div
          dir="rtl"
          lang="ar"
          className="font-arabic font-semibold text-2xl sm:text-3xl text-white leading-[2.4] text-right"
        >
          {dailyQ.arabic}
        </div>
        <div className="text-stone-300 text-sm sm:text-base border-l-3 border-emerald-500 pl-4 py-1 leading-relaxed">
          <BilingualText text={dailyQ.english} />
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
        {dailyQ.options.map((opt, idx) => {
          const isSelected = selectedOpt === opt.id;
          let btnCls = 'bg-stone-900/90 border-stone-700/80 text-stone-200 hover:border-emerald-500 hover:bg-emerald-950/50';

          if (isSubmitted) {
            if (opt.isCorrect) {
              btnCls = 'bg-emerald-600/90 border-emerald-400 text-white ring-2 ring-emerald-400 shadow-lg';
            } else if (isSelected && !opt.isCorrect) {
              btnCls = 'bg-rose-950 border-rose-500 text-rose-200';
            } else {
              btnCls = 'bg-stone-950/60 border-stone-800 text-stone-500 opacity-60';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={isSubmitted}
              className={`p-4 sm:p-5 rounded-2xl border-2 text-left font-medium transition-all flex items-start justify-between gap-3 ${btnCls}`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="flex flex-col items-center gap-0.5 shrink-0 pt-0.5">
                  <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-mono font-black">
                    {opt.id}
                  </span>
                  <span className="text-[9px] font-mono text-stone-400">({idx + 1})</span>
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div dir="rtl" lang="ar" className="font-arabic text-lg sm:text-xl font-semibold leading-[2.1] text-right">
                    {opt.ar}
                  </div>
                  <div className="text-xs sm:text-sm text-stone-400 leading-snug">
                    {opt.en}
                  </div>
                </div>
              </div>
              {isSubmitted && opt.isCorrect && (
                <CheckCircle2 size={18} className="text-white shrink-0 mt-1" />
              )}
              {isSubmitted && isSelected && !opt.isCorrect && (
                <XCircle size={18} className="text-rose-400 shrink-0 mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Post-Submission Instant Reward / Explanation / Memory Hook */}
      {isSubmitted && (
        <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 space-y-3 animate-slide-up">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>{selectedOpt === 'A' ? 'Correct! +50 XP Added to Your Streak' : 'Official Key: Option A (Imru\' al-Qais)'}</span>
            </div>
            <button
              onClick={() => setShowTrick(!showTrick)}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-[11px] font-mono"
            >
              <Lightbulb size={13} />
              <span>{showTrick ? 'Hide Mnemonic' : 'View Memory Trick'}</span>
            </button>
          </div>

          {showTrick && (
            <div className="p-3 bg-amber-950/60 rounded-xl border border-amber-500/40 text-amber-200 text-xs font-bold italic">
              💡 Memory Trick: &quot;{dailyQ.trick}&quot;
            </div>
          )}

          <p className="text-stone-300 text-xs leading-relaxed">
            {dailyQ.explanation}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-emerald-400 font-mono font-bold">
              🔥 1/1 Daily Goal Achieved
            </span>
            <Link
              href="/practice"
              className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-300 hover:text-white"
            >
              <span>Solve 5 More Questions</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
