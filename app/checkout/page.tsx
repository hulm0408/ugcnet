import type { Metadata } from 'next';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Sparkles, ChevronLeft, ArrowRight, Lock } from 'lucide-react';
import CheckoutClientForm from '@/components/monetization/CheckoutClientForm';

export const metadata: Metadata = {
  title: 'Complete Your Preparation Subscription | UGC NET/JRF',
  description: 'Unlock full access to your subject question bank, past papers, and General Paper 1.',
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; plan?: string }>;
}) {
  const resolvedParams = await searchParams;
  const subjectSlug = resolvedParams.subject || 'arabic';
  const planId = resolvedParams.plan || 'plan_sub_6m';

  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/checkout?subject=${subjectSlug}&plan=${planId}`);
  }

  // Fetch subject details
  const subject = await prisma.subject.findUnique({
    where: { slug: subjectSlug },
    include: {
      _count: {
        select: {
          exam_papers: true,
          questions: true,
        },
      },
    },
  });

  if (!subject) {
    redirect('/dashboard');
  }

  // Fetch subscription plans
  const [selectedPlan, allPlans] = await Promise.all([
    prisma.subscriptionPlan.findUnique({ where: { id: planId } }),
    prisma.subscriptionPlan.findMany({ where: { is_active: true }, orderBy: { price_inr: 'asc' } }),
  ]);

  const activePlan = selectedPlan || allPlans[0];

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/pyq"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 mb-6 transition-colors"
        >
          <ChevronLeft size={16} /> Back to Papers
        </Link>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left Column: Plan Benefits & Inclusions */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-xs font-extrabold mb-3">
                <Sparkles size={13} /> UGC NET/JRF Subscription
              </div>
              <h1 className="text-3xl font-black text-stone-900 tracking-tight">
                Unlock {subject.name} Preparation
              </h1>
              {subject.name_native && (
                <div className="text-sm font-semibold text-stone-500 mt-1 font-arabic">
                  {subject.name_native} (Code {subject.code})
                </div>
              )}
            </div>

            {/* Inclusions Card */}
            <div className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Included in your subscription:
              </div>

              <div className="space-y-3">
                {[
                  `All ${subject._count.exam_papers || 45}+ Official ${subject.name} PYQ Papers (2004–2024)`,
                  `Over ${subject._count.questions || 3150}+ Authentic Subject Questions with Official Keys`,
                  'Full UGC NET General Paper 1 Included (All 10 Units)',
                  'Full-Length Timed CBT Mock Test Simulation Engine',
                  'Permanent Personal Mistake Tracker & Weak Topic Analytics',
                  'Interactive 5-Tier Syllabus Knowledge Hierarchy',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs font-bold text-stone-800">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="flex items-center gap-3 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-emerald-900 text-xs font-semibold">
              <ShieldCheck size={24} className="text-emerald-600 shrink-0" />
              <div>
                <div className="font-extrabold">100% Authentic Preparation Material</div>
                <div className="text-emerald-700 text-[11px] mt-0.5">Official NTA answer keys, verified classifications, and instant activation.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Form */}
          <div className="md:col-span-2">
            <div className="sticky top-8 bg-white rounded-3xl border border-stone-200/90 shadow-xl p-6 space-y-6">
              <h2 className="text-base font-extrabold text-stone-900">Order Summary</h2>

              {/* Plan Details */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-black text-sm text-stone-900">{activePlan.name}</div>
                    <div className="text-xs text-stone-500">{activePlan.duration_days} Days Access</div>
                  </div>
                  <div className="font-black text-lg text-stone-900">₹{activePlan.price_inr}</div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2 text-xs font-semibold text-stone-600 border-t border-stone-100 pt-4">
                <div className="flex justify-between">
                  <span>Subject Access ({subject.name})</span>
                  <span className="text-stone-900">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>General Paper 1 Companion</span>
                  <span className="text-emerald-600 font-bold">FREE (₹799 Value)</span>
                </div>
                <div className="flex justify-between text-sm font-black text-stone-900 border-t border-stone-100 pt-2">
                  <span>Total Amount</span>
                  <span>₹{activePlan.price_inr}</span>
                </div>
              </div>

              {/* Client Activation Component */}
              <CheckoutClientForm
                userId={session.user.id}
                subjectId={subject.id}
                subjectSlug={subject.slug}
                subjectName={subject.name}
                planId={activePlan.id}
                planName={activePlan.name}
                priceInr={activePlan.price_inr}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
