'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function ToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handledRef = useRef(false);

  const [modalType, setModalType] = useState<'login' | 'logout' | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleLogoutStart = () => {
      setModalType('logout');
      setIsClosing(false);
    };

    window.addEventListener('app:logout-start', handleLogoutStart);
    return () => {
      window.removeEventListener('app:logout-start', handleLogoutStart);
    };
  }, []);

  useEffect(() => {
    if (handledRef.current) return;

    const loginParam = searchParams.get('login');
    const logoutParam = searchParams.get('logout');

    if (loginParam === 'success') {
      handledRef.current = true;
      setModalType('login');
      cleanUrl();
    } else if (logoutParam === 'success') {
      handledRef.current = true;
      setModalType('logout');
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

  // Auto dismiss after 2.8 seconds
  useEffect(() => {
    if (!modalType) return;

    const dismissTimer = setTimeout(() => {
      handleClose();
    }, 2800);

    return () => clearTimeout(dismissTimer);
  }, [modalType]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalType(null);
      setIsClosing(false);
    }, 350);
  };

  if (!modalType) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${
        isClosing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
      }`}
      onClick={handleClose}
      aria-live="assertive"
    >
      {/* Dark Glassmorphic Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" />

      {/* Main Animated Card */}
      <div
        className="relative bg-gradient-to-b from-stone-900/95 to-black/95 text-white border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] rounded-3xl p-8 max-w-sm w-full mx-auto flex flex-col items-center text-center overflow-hidden animate-spring-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background aura */}
        <div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
            modalType === 'login' ? 'bg-emerald-500/30' : 'bg-amber-500/20'
          }`}
        />

        {modalType === 'login' ? (
          <>
            {/* ═══ LOGIN SUCCESS ANIMATION (Swiggy / Zomato order style) ═══ */}
            <div className="relative flex items-center justify-center my-4 w-32 h-32">
              {/* Expanding Ripple Wave 1 */}
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ripple-1 pointer-events-none" />
              {/* Expanding Ripple Wave 2 */}
              <div className="absolute inset-0 rounded-full bg-emerald-500/15 animate-ripple-2 pointer-events-none" />

              {/* Central Glowing Icon Circle */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#0C6240] to-[#107A53] border-2 border-emerald-400/40 shadow-[0_0_35px_rgba(16,122,83,0.5)] flex items-center justify-center z-10">
                {/* SVG Stroke Drawing Checkmark */}
                <svg
                  className="w-14 h-14 text-white"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="26"
                    cy="26"
                    r="23"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="2.5"
                  />
                  <circle
                    className="animate-circle-draw"
                    cx="26"
                    cy="26"
                    r="23"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="145"
                    strokeDashoffset="145"
                  />
                  <path
                    className="animate-check-draw"
                    d="M15 27L23 34.5L37 18"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="50"
                    strokeDashoffset="50"
                  />
                </svg>
              </div>

              {/* Radiating Sparkle Bursts */}
              <div className="absolute -top-1 left-4 w-2 h-2 rounded-full bg-emerald-300 animate-burst-1" />
              <div className="absolute top-2 right-3 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-burst-2" />
              <div className="absolute bottom-2 left-3 w-1.5 h-1.5 rounded-full bg-emerald-200 animate-burst-3" />
              <div className="absolute -bottom-1 right-5 w-2 h-2 rounded-full bg-teal-300 animate-burst-4" />
            </div>

            {/* Typography */}
            <div className="mt-3 space-y-1">
              <span className="inline-block px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                Authenticated
              </span>
              <h3 className="text-2xl font-black tracking-tight text-white">
                Login Successful!
              </h3>
              <p className="text-stone-300 text-sm font-medium">
                Welcome back to Arabic NET/JRF prep
              </p>
            </div>
          </>
        ) : (
          <>
            {/* ═══ LOGOUT ANIMATION ═══ */}
            <div className="relative flex items-center justify-center my-4 w-32 h-32">
              {/* Expanding Ripple Wave */}
              <div className="absolute inset-0 rounded-full bg-stone-700/30 animate-ripple-1 pointer-events-none" />
              <div className="absolute inset-0 rounded-full bg-stone-700/20 animate-ripple-2 pointer-events-none" />

              {/* Central Icon Circle */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-stone-800 to-stone-700 border-2 border-stone-500/40 shadow-[0_0_30px_rgba(0,0,0,0.6)] flex items-center justify-center z-10">
                {/* SVG Animated Door & Arrow */}
                <svg
                  className="w-12 h-12 text-stone-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    className="animate-door-draw"
                    d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                    strokeDasharray="40"
                    strokeDashoffset="40"
                  />
                  <polyline
                    className="animate-arrow-draw"
                    points="16 17 21 12 16 7"
                    strokeDasharray="25"
                    strokeDashoffset="25"
                  />
                  <line
                    className="animate-arrow-draw"
                    x1="21"
                    y1="12"
                    x2="9"
                    y2="12"
                    strokeDasharray="25"
                    strokeDashoffset="25"
                  />
                </svg>
              </div>
            </div>

            {/* Typography */}
            <div className="mt-3 space-y-1">
              <span className="inline-block px-3 py-1 bg-stone-800 border border-stone-700 rounded-full text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">
                Signed Out
              </span>
              <h3 className="text-2xl font-black tracking-tight text-white">
                Logged Out Safely
              </h3>
              <p className="text-stone-400 text-sm font-medium">
                You have been safely signed out. See you soon!
              </p>
            </div>
          </>
        )}

        {/* Bottom Progress Bar to indicate auto-dismiss */}
        <div className="w-full bg-white/10 h-1.5 rounded-full mt-6 overflow-hidden">
          <div
            className={`h-full rounded-full animate-progress-shrink ${
              modalType === 'login' ? 'bg-gradient-to-r from-emerald-400 to-teal-300' : 'bg-stone-500'
            }`}
          />
        </div>
      </div>

      {/* Scoped CSS Keyframe Animations */}
      <style jsx>{`
        @keyframes springUp {
          0% {
            transform: scale(0.6) translateY(30px);
            opacity: 0;
          }
          60% {
            transform: scale(1.05) translateY(-5px);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        .animate-spring-up {
          animation: springUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes ripple1 {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ripple-1 {
          animation: ripple1 1.6s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }

        @keyframes ripple2 {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        .animate-ripple-2 {
          animation: ripple2 1.6s cubic-bezier(0, 0.2, 0.8, 1) infinite 0.4s;
        }

        @keyframes circleDraw {
          0% {
            stroke-dashoffset: 145;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-circle-draw {
          animation: circleDraw 0.6s ease-out 0.15s forwards;
        }

        @keyframes checkDraw {
          0% {
            stroke-dashoffset: 50;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-check-draw {
          animation: checkDraw 0.45s ease-out 0.45s forwards;
        }

        @keyframes doorDraw {
          0% {
            stroke-dashoffset: 40;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-door-draw {
          animation: doorDraw 0.5s ease-out 0.15s forwards;
        }

        @keyframes arrowDraw {
          0% {
            stroke-dashoffset: 25;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-arrow-draw {
          animation: arrowDraw 0.4s ease-out 0.4s forwards;
        }

        @keyframes burst1 {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-14px, -14px) scale(1.2);
            opacity: 0;
          }
        }
        .animate-burst-1 {
          animation: burst1 0.7s ease-out 0.4s forwards;
        }

        @keyframes burst2 {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(16px, -12px) scale(1.4);
            opacity: 0;
          }
        }
        .animate-burst-2 {
          animation: burst2 0.7s ease-out 0.45s forwards;
        }

        @keyframes burst3 {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-15px, 12px) scale(1.2);
            opacity: 0;
          }
        }
        .animate-burst-3 {
          animation: burst3 0.7s ease-out 0.5s forwards;
        }

        @keyframes burst4 {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(14px, 14px) scale(1.3);
            opacity: 0;
          }
        }
        .animate-burst-4 {
          animation: burst4 0.7s ease-out 0.55s forwards;
        }

        @keyframes progressShrink {
          0% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
        .animate-progress-shrink {
          animation: progressShrink 2.8s linear forwards;
        }
      `}</style>
    </div>
  );
}
