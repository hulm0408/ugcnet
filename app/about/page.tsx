import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Mail,
  MessageCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story & Academic Mission — Built by UGC NET/JRF Qualifiers',
  description:
    'Learn why former UGC NET/JRF qualifiers built this dedicated academic preparation platform to fix the chaos of corrupted PDFs and conflicting answer keys.',
};

export default function AboutPage() {
  return (
    <div className="flex-1 bg-white text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="bg-[#FAF8F5] border-b border-stone-200/90 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-mono font-semibold uppercase tracking-wider shadow-2xs">
            <GraduationCap size={14} className="text-emerald-800" />
            <span>FOUNDER&apos;S STORY &amp; ACADEMIC MISSION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-stone-950 leading-tight">
            We Built This Because We Lived the <span className="text-emerald-800 italic">NET/JRF Grind</span>.
          </h1>

          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            We spent months sorting through broken PDFs, unofficial answer keys, and missing Arabic/Devanagari scripts. Here is why we built the platform we wished we had.
          </p>
        </div>
      </section>

      {/* ── 2. THE REAL STORY: THE STRUGGLE THAT STARTED IT ALL ── */}
      <section className="py-16 md:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 leading-relaxed text-stone-700">
        
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            1. The PDF Chaos in 2022
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            In 2022, when preparing for the UGC NET &amp; Junior Research Fellowship, we realized that 40% of our daily preparation time was being wasted on logistics rather than actual studying.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            Official NTA question papers were scattered across arbitrary Telegram channels in 40MB scanned PDFs. Half of the classical poetry verses in Arabic and Sanskrit were corrupted by OCR errors. Even worse, the answer keys circulating online were outdated provisional keys that ignored subsequent NTA challenge revisions and dropped questions.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-2">
          <div className="font-bold text-sm uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
            <ShieldCheck size={16} />
            <span>The Core Problem</span>
          </div>
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            Aspirants were memorizing wrong answer keys, getting blindsided by the 160-minute CBT countdown timer on exam day, and having no way to track which of the 10 syllabus units was dragging down their cutoff score.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            2. The 3 Academic Principles We Refuse to Compromise On
          </h2>

          <div className="space-y-6 pt-2">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-1">
                1
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-stone-900">
                  Reconciled Final Keys Only
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Every single question in our 2004–2024 database is reconciled against official NTA challenge notifications and expert academic committee reviews. If NTA dropped a question or awarded multiple correct options, it is explicitly annotated.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-1">
                2
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-stone-900">
                  Strict 10-Unit Syllabus Architecture
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Solving random 100-question sets without knowing your weak unit is ineffective. We categorized every past paper and mock question into its exact unit and topic, so you know whether you need to revise Unit 2 or Unit 7.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-1">
                3
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-stone-900">
                  True NTA Computer-Based Test (CBT) Realism
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Exam stress causes retrieval failure if you only practice in books. Our interface simulates the exact 160-minute NTA countdown timer, 1–100 question palette, option selector, and review workflows.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            3. Who We Are Today
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Today, our academic review board is led by former JRF awardees and university research scholars from Central Universities (AMU, DU, JNU). We are not an anonymous corporate test company — we are scholars building for the next generation of researchers and professors.
          </p>
        </div>

        {/* Action strip */}
        <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-stone-900 text-base">Have a question or spotted a typo?</div>
            <div className="text-xs text-stone-500">Our academic board personally reviews every student query.</div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Contact Mentor Desk
            </Link>
            <Link
              href="/mocks"
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Start Free Mock
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
}
