'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, GraduationCap, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Do not render footer on practice, test, instructions, or review pages
  if (
    pathname?.startsWith('/practice') ||
    pathname?.startsWith('/instructions') ||
    pathname?.startsWith('/memories/review')
  ) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF9F6] border-t border-stone-200 mt-auto py-12 text-stone-600 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Platform Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
              <div className="w-7 h-7 bg-emerald-800 rounded-lg flex items-center justify-center shadow-sm">
                <GraduationCap size={16} className="text-white" />
              </div>
              <span>UGC NET/JRF Preparation Platform</span>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-md">
              Built by former UGC NET/JRF qualifiers to replace chaotic, unverified PDFs with rigorous 160-minute CBT simulations, 10-unit curriculum classification, and spaced repetition memory anchors.
            </p>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold pt-1">
              <ShieldCheck size={14} className="text-emerald-800" />
              <span>NTA Official Question Papers &amp; Reconciled Final Keys</span>
            </div>
          </div>

          {/* Col 2: Academic Resources */}
          <div className="space-y-2.5">
            <div className="text-stone-900 text-xs font-bold uppercase tracking-wider font-mono">
              Academic Hubs
            </div>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/mocks" className="hover:text-emerald-800 transition-colors">
                  100-Question Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/pyq" className="hover:text-emerald-800 transition-colors">
                  2004–2024 Past Papers
                </Link>
              </li>
              <li>
                <Link href="/syllabus" className="hover:text-emerald-800 transition-colors">
                  10-Unit Syllabus Architecture
                </Link>
              </li>
              <li>
                <Link href="/memories" className="hover:text-emerald-800 transition-colors">
                  Spaced Repetition Memory Engine
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-800 transition-colors">
                  Free Forever vs Pro Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Mentor Help & Trust */}
          <div className="space-y-2.5">
            <div className="text-stone-900 text-xs font-bold uppercase tracking-wider font-mono">
              Mentor &amp; Aspirant Desk
            </div>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/about" className="hover:text-emerald-800 transition-colors">
                  Our Story (Why We Built This)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-800 transition-colors">
                  Direct Mentor Desk &amp; Doubts
                </Link>
              </li>
              <li>
                <span className="text-stone-600">
                  support@arabic-net-jrf.com
                </span>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-800 transition-colors">
                  Privacy Policy &amp; Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer strip */}
        <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {currentYear} UGC NET/JRF Preparation Platform. All authentic exam citations belong to UGC / NTA.
          </p>
          <p className="text-[11px] text-stone-500">
            Dedicated to university postgraduates, research scholars, and assistant professor aspirants.
          </p>
        </div>
      </div>
    </footer>
  );
}
