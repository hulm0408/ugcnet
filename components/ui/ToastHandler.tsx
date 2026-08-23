'use client';

import React, { useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle2, LogOut, X, Sparkles } from 'lucide-react';

export default function ToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handledRef = useRef(false);

  useEffect(() => {
    // Only fire once per mount/param change
    if (handledRef.current) return;

    const loginParam = searchParams.get('login');
    const logoutParam = searchParams.get('logout');

    if (loginParam === 'success') {
      handledRef.current = true;
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-in fade-in slide-in-from-top-5' : 'animate-out fade-out slide-out-to-top-3'
            } max-w-md w-full bg-stone-900/95 backdrop-blur-xl text-white shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-emerald-500/30 p-4 items-center gap-3.5 transition-all duration-300 border border-emerald-500/20`}
          >
            {/* Animated SVG Icon Container */}
            <div className="relative flex items-center justify-center shrink-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5 animate-pulse text-emerald-400" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-white tracking-tight">Successfully Logged In</p>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="text-xs text-stone-400 mt-0.5 truncate">Welcome back! Your session is now active.</p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => toast.dismiss(t.id)}
              className="shrink-0 p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ),
        {
          duration: 4000,
          position: 'top-center',
        }
      );
      cleanUrl();
    } else if (logoutParam === 'success') {
      handledRef.current = true;
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-in fade-in slide-in-from-top-5' : 'animate-out fade-out slide-out-to-top-3'
            } max-w-md w-full bg-stone-900/95 backdrop-blur-xl text-white shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-stone-700 p-4 items-center gap-3.5 transition-all duration-300 border border-stone-700/50`}
          >
            {/* Animated SVG Icon Container */}
            <div className="w-10 h-10 rounded-xl bg-stone-800 text-stone-300 flex items-center justify-center border border-stone-700 shrink-0">
              <LogOut className="w-5 h-5 text-stone-300" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white tracking-tight">Logged Out</p>
              <p className="text-xs text-stone-400 mt-0.5 truncate">You have been safely signed out.</p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => toast.dismiss(t.id)}
              className="shrink-0 p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ),
        {
          duration: 4000,
          position: 'top-center',
        }
      );
      cleanUrl();
    }

    function cleanUrl() {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('login');
      newParams.delete('logout');
      const search = newParams.toString();
      const newUrl = search ? `${pathname}?${search}` : pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return <Toaster position="top-center" />;
}
