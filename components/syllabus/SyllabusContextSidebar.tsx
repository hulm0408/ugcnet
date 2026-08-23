import React from 'react';
import Link from 'next/link';
import { BookOpen, Target, Layers, PlayCircle, Award, Compass, HelpCircle } from 'lucide-react';

interface MetricItem {
  label: string;
  value: string | number;
  icon: React.ElementType;
}

interface SyllabusContextSidebarProps {
  title?: string;
  titleAr?: string;
  subtitle?: string;
  levelBadge?: string;
  metrics: MetricItem[];
  practiceHref?: string;
  practiceLabel?: string;
  quickTips?: string[];
}

export default function SyllabusContextSidebar({
  title,
  titleAr,
  subtitle,
  levelBadge = 'Syllabus Context',
  metrics,
  practiceHref,
  practiceLabel = 'Practice Section',
  quickTips,
}: SyllabusContextSidebarProps) {
  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="sticky top-24 space-y-5">
        {/* Main Context Card */}
        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#107A53]"></div>

          <div className="text-[11px] font-bold tracking-widest text-[#107A53] uppercase mb-1.5 flex items-center gap-1.5">
            <Compass size={13} />
            {levelBadge}
          </div>

          {titleAr && (
            <h2 dir="rtl" lang="ar" className="font-arabic font-extrabold text-2xl text-stone-900 leading-snug mb-1">
              {titleAr}
            </h2>
          )}

          {title && (
            <h3 className="text-stone-700 font-bold text-base leading-snug mb-4">
              {title}
            </h3>
          )}

          {subtitle && (
            <p className="text-stone-500 text-xs leading-relaxed mb-5 font-medium">
              {subtitle}
            </p>
          )}

          {/* Metrics Grid */}
          <div className="space-y-2.5 bg-stone-50/80 p-3.5 rounded-2xl border border-stone-100 mb-5">
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="flex items-center justify-between text-xs py-1">
                  <span className="text-stone-500 font-semibold flex items-center gap-2">
                    <Icon size={14} className="text-primary shrink-0" />
                    {m.label}
                  </span>
                  <span className="text-stone-900 font-bold tabular-nums">
                    {m.value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Practice Action */}
          {practiceHref && (
            <Link
              href={practiceHref}
              className="w-full bg-[#107A53] hover:bg-[#0C6240] text-white hover:text-white px-5 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#107A53]/20 active:scale-95 text-center"
            >
              <PlayCircle size={17} />
              {practiceLabel}
            </Link>
          )}
        </div>

        {/* Learning Tips / Info Card */}
        {quickTips && quickTips.length > 0 && (
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 text-xs text-stone-600">
            <div className="font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 text-[11px]">
              <HelpCircle size={14} className="text-stone-500" />
              Syllabus Study Tip
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-stone-500 font-medium">
              {quickTips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
