import type { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/db';
import { getActiveSubjectServer } from '@/lib/subjectContext';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  BookOpen,
  Brain,
  Layers,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transparent Pricing & Free Benchmark Access | UGC NET/JRF Preparation',
  description:
    'Transparent pricing with zero hidden fees. Practice full-length free benchmark papers or unlock the complete 45+ PYQ archive with Pro Pass.',
};

export const dynamic = 'force-dynamic';

export default async function PricingPage() {
  const activeSubject = await getActiveSubjectServer();

  const [plans, freeBenchmarkPaper] = await Promise.all([
    prisma.subscriptionPlan.findMany({
      where: { is_active: true },
      orderBy: { price_inr: 'asc' },
    }),
    prisma.examPaper.findFirst({
      where: { subject_id: activeSubject.id, is_free_benchmark: true },
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 sm:py-16 text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>Honest, Transparent Access</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Clear, Transparent Pricing
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Practice full-length benchmark mock tests free forever. Upgrade to Pro when you are ready to unlock the complete 2004–2024 archive and memory engine.
          </p>
        </div>

        {/* 3-Column Plan Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          
          {/* Card 1: FREE FOREVER TIER */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-8 flex flex-col justify-between shadow-sm relative">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-stone-400 mb-2">
                Trial &amp; Exploration
              </div>
              <h2 className="text-2xl font-black text-stone-900 mb-1">Free Forever</h2>
              <p className="text-stone-500 text-xs sm:text-sm font-medium mb-6">
                Evaluate the platform with authentic NTA exam simulation.
              </p>

              <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-stone-100">
                <span className="text-4xl font-black text-stone-900">₹0</span>
                <span className="text-xs font-bold text-stone-400">/ No credit card needed</span>
              </div>

              <div className="space-y-3.5 text-xs font-bold text-stone-700 mb-8">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full 10-Unit Syllabus Explorer across all 19 subjects</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Official Benchmark Mock Exam ({freeBenchmarkPaper?.display_name || 'June 2023 Paper 2'})
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Instant scoring &amp; official NTA answer explanations</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>General Paper 1 curriculum blueprint</span>
                </div>
                <div className="flex items-start gap-2.5 text-stone-400">
                  <XCircle size={16} className="text-stone-300 shrink-0 mt-0.5" />
                  <span>Historical 45+ PYQ Papers (2004–2024)</span>
                </div>
                <div className="flex items-start gap-2.5 text-stone-400">
                  <XCircle size={16} className="text-stone-300 shrink-0 mt-0.5" />
                  <span>Personal Mistake Tracker &amp; SRS Queue</span>
                </div>
              </div>
            </div>

            <Link
              href={freeBenchmarkPaper ? `/practice?paperId=${freeBenchmarkPaper.id}` : '/pyq'}
              className="w-full py-3.5 px-6 bg-stone-100 hover:bg-stone-200 text-stone-900 font-extrabold text-sm rounded-xl text-center transition-colors shadow-xs"
            >
              Start Free Benchmark Mock
            </Link>
          </div>

          {/* Card 2: POPULAR — 6-MONTH SUBJECT PASS */}
          {plans.find((p) => p.id === 'plan_sub_6m') && (
            <div className="bg-emerald-950 text-white rounded-3xl border-2 border-emerald-500 p-8 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-stone-950 font-black text-[10px] uppercase px-4 py-1 rounded-full tracking-wider shadow-md">
                MOST POPULAR FOR JUNE / DEC 2025
              </div>

              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-2">
                  Target Exam Cycle
                </div>
                <h2 className="text-2xl font-black text-white mb-1">
                  {plans.find((p) => p.id === 'plan_sub_6m')?.name}
                </h2>
                <p className="text-emerald-200/80 text-xs sm:text-sm font-medium mb-6">
                  Complete access for your active UGC NET exam cycle.
                </p>

                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-emerald-900">
                  <span className="text-4xl font-black text-white">
                    ₹{plans.find((p) => p.id === 'plan_sub_6m')?.price_inr}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">/ 6 Months Access</span>
                </div>

                <div className="space-y-3.5 text-xs font-bold text-stone-100 mb-8">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>All 45+ Official {activeSubject.name} PYQ Papers (2004–2024)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Over 3,150+ Questions with verified NTA answer keys</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>General Paper 1 Companion Included (₹799 Value)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Personal Mistake Tracker &amp; Weak Topic Analytics</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Spaced Repetition Memory System &amp; Knowledge Graph</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>AI Visual Concept Studio Atlas Generation</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/checkout?plan=plan_sub_6m&subject=${activeSubject.slug}`}
                className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-sm rounded-xl text-center shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Unlock {activeSubject.name} Pro Pass</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {/* Card 3: 1-YEAR OR ALL-ACCESS PASS */}
          {plans.find((p) => p.id === 'plan_all_1y') && (
            <div className="bg-white rounded-3xl border border-stone-200/90 p-8 flex flex-col justify-between shadow-sm relative">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-600 mb-2">
                  Complete Mastery
                </div>
                <h2 className="text-2xl font-black text-stone-900 mb-1">
                  {plans.find((p) => p.id === 'plan_all_1y')?.name}
                </h2>
                <p className="text-stone-500 text-xs sm:text-sm font-medium mb-6">
                  Full multi-subject ecosystem for research scholars &amp; faculty.
                </p>

                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-stone-100">
                  <span className="text-4xl font-black text-stone-900">
                    ₹{plans.find((p) => p.id === 'plan_all_1y')?.price_inr}
                  </span>
                  <span className="text-xs font-bold text-stone-400">/ 1 Full Year Access</span>
                </div>

                <div className="space-y-3.5 text-xs font-bold text-stone-700 mb-8">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Access to ALL 19 UGC NET Subjects &amp; Papers</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Complete 10-Unit syllabus question banks</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Full General Paper 1 master question bank</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Priority academic support &amp; key dispute resolutions</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/checkout?plan=plan_all_1y&subject=${activeSubject.slug}`}
                className="w-full py-3.5 px-6 bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-sm rounded-xl text-center transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Get 1-Year All-Access Pass</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          )}

        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-10 mb-20 overflow-x-auto">
          <h2 className="text-2xl font-black text-stone-900 mb-6">Feature Comparison</h2>
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider">
                <th className="pb-4">Feature</th>
                <th className="pb-4 text-center">Free Forever</th>
                <th className="pb-4 text-center text-emerald-800 font-extrabold">6-Month Pro Pass</th>
                <th className="pb-4 text-center">1-Year All Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              <tr>
                <td className="py-4 font-bold text-stone-900">Official 10-Unit Syllabus Explorer</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ Included</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ Included</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ Included</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-stone-900">Free Full-Length Benchmark Mock Test</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ 1 Full Paper (100 Qs)</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ Included</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ Included</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-stone-900">Complete Historical Papers (2004–2024)</td>
                <td className="py-4 text-center text-stone-400">✕ Locked</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ 45+ Papers</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ All Subjects</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-stone-900">Personal Mistake Tracker &amp; Analytics</td>
                <td className="py-4 text-center text-stone-400">✕ Locked</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ Unlimited</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ Unlimited</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-stone-900">General Paper 1 Companion</td>
                <td className="py-4 text-center text-stone-400">✕ Syllabus Only</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ FREE Included</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ FREE Included</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-stone-900">Spaced Repetition Memory System</td>
                <td className="py-4 text-center text-stone-400">✕ Locked</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ Active</td>
                <td className="py-4 text-center text-emerald-600 font-bold">✓ Active</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Common Questions FAQ */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-stone-900">Frequently Asked Questions</h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">Everything you need to know about our subscriptions.</p>
          </div>

          {[
            {
              q: 'Is the Free Benchmark Test really 100% free?',
              a: 'Yes. You can take the full official June 2023 Paper II examination (100 questions, 200 marks, timed CBT mode) completely free with verified NTA answers and detailed bilingual explanations.',
            },
            {
              q: 'Are the questions authentic previous year UGC NET questions?',
              a: 'Yes. All 3,150+ questions are directly extracted and reconciled from official NTA question papers and official final revised answer keys from 2004 to 2024.',
            },
            {
              q: 'Is there any automatic recurring charge?',
              a: 'No. Our subscriptions are single-term access passes (e.g. 6 Months or 1 Year). There are zero automatic recurring billing surprises.',
            },
            {
              q: 'Can I switch my active subject?',
              a: 'Yes. You can switch between any of the 19 supported UGC NET subjects at any time using the 1-click switcher in the top navigation bar.',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 space-y-2">
              <h3 className="font-extrabold text-sm sm:text-base text-stone-900 flex items-center gap-2">
                <HelpCircle size={16} className="text-emerald-700 shrink-0" />
                <span>{item.q}</span>
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed pl-6 font-medium">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
