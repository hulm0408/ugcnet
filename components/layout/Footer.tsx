'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Do not render footer on practice, test, instructions, or review pages
  if (
    pathname.startsWith('/practice') ||
    pathname.startsWith('/instructions') ||
    pathname.startsWith('/memories/review')
  ) {
    return null;
  }

  return (
    <footer className="bg-[#FCFAF8] border-t border-stone-200 mt-auto py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black tracking-tight text-stone-900 mb-2">
              Arabic <span className="text-[#107A53]">NET/JRF</span> Practice
            </h2>
            <p className="text-stone-500 text-sm">
              Free UGC NET Arabic Previous Year Questions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-semibold text-stone-600">
            <Link href="/about" className="hover:text-[#107A53] transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-[#107A53] transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-[#107A53] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#107A53] transition-colors">Terms of Service</Link>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-200 text-center text-xs text-stone-400 font-medium">
          &copy; {new Date().getFullYear()} Arabic NET/JRF Practice. All rights reserved. Not affiliated with UGC or NTA.
        </div>
      </div>
    </footer>
  );
}
