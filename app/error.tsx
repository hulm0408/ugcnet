'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="flex-1 min-h-[70vh] flex items-center justify-center p-6 bg-[#FCFAF8]">
      <div className="bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-10 max-w-lg w-full text-center shadow-sm">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-rose-100 shadow-sm">
          <AlertTriangle size={28} />
        </div>

        <h1 className="text-2xl font-black text-stone-900 mb-2">Something went wrong</h1>
        <p className="text-stone-500 text-sm font-medium mb-6 leading-relaxed">
          {error.message || 'An unexpected error occurred while loading this page. Please try again.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} /> Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Home size={16} /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
