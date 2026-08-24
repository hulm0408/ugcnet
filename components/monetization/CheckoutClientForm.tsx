'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

interface CheckoutClientFormProps {
  userId: string;
  subjectId: string;
  subjectSlug: string;
  subjectName: string;
  planId: string;
  planName: string;
  priceInr: number;
}

export default function CheckoutClientForm({
  userId,
  subjectId,
  subjectSlug,
  subjectName,
  planId,
  planName,
  priceInr,
}: CheckoutClientFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleActivate = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/subscriptions/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId,
          planId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to activate subscription');
      }

      setSuccess(true);

      // Set cookie for active subject
      document.cookie = `ugc_active_subject=${subjectSlug}; path=/; max-age=31536000; SameSite=Lax`;

      // Redirect after 1.5s
      setTimeout(() => {
        router.push('/pyq?unlocked=true');
        router.refresh();
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 animate-in zoom-in-95">
        <CheckCircle size={32} className="text-emerald-600 mx-auto" />
        <div className="font-extrabold text-sm text-emerald-900">Subscription Active!</div>
        <div className="text-xs text-emerald-700">Unlocking {subjectName} past papers & Paper 1...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleActivate}
        disabled={loading}
        className="w-full py-4 px-6 bg-primary hover:bg-primary-dark text-white font-black text-sm rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Activating Your Subscription...</span>
          </>
        ) : (
          <>
            <Lock size={16} />
            <span>Pay & Unlock {subjectName} (₹{priceInr})</span>
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <div className="text-center text-[10px] text-stone-400 font-semibold">
        Instant activation • 100% secure checkout
      </div>
    </div>
  );
}
