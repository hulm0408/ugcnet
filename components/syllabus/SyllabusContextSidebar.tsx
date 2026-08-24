import React from 'react';
import Link from 'next/link';
import { PlayCircle, Compass, HelpCircle } from 'lucide-react';

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
    <aside className="w-full lg:w-72 shrink-0">
      <div className="sticky top-24 space-y-4">
        {/* Main Context Card: Quiet Academic Style */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <div className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase mb-1 flex items-center gap-1">
              <Compass size={12} />
              <span>{levelBadge}</span>
            </div>

            {titleAr && (
              <h2 dir="rtl" lang="ar" className="font-arabic font-bold text-lg text-stone-900 leading-snug mb-1">
                {titleAr}
              </h2>
            )}

            {title && (
              <h3 className="text-stone-800 font-bold text-sm leading-snug">
                {title}
              </h3>
            )}

            {subtitle && (
              <p className="text-stone-500 text-xs leading-relaxed mt-1 font-medium">
                {subtitle}
              </p>
            )}
          </div>

          {/* Metrics Grid */}
          <div className="space-y-1.5 bg-stone-50/70 p-3 rounded-xl border border-stone-200/60">
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="flex items-center justify-between text-xs py-0.5">
                  <span className="text-stone-500 font-medium flex items-center gap-1.5">
                    <Icon size={13} className="text-stone-400 shrink-0" />
                    <span>{m.label}</span>
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
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white hover:text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 text-center"
            >
              <PlayCircle size={15} />
              <span>{practiceLabel}</span>
            </Link>
          )}
        </div>

        {/* Learning Tips / Info Card */}
        {quickTips && quickTips.length > 0 && (
          <div className="bg-stone-50/80 border border-stone-200/70 rounded-2xl p-4 text-xs text-stone-600 space-y-2">
            <div className="font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5 text-[10px]">
              <HelpCircle size={12} className="text-stone-400" />
              <span>Study Guidance</span>
            </div>
            <ul className="space-y-1 text-stone-500 text-[11px] font-medium">
              {quickTips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed flex items-start gap-1.5">
                  <span className="text-stone-400 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
