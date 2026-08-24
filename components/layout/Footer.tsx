'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  return (
    <footer className="bg-stone-50 border-t border-stone-200/80 mt-auto py-8 text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div className="text-center sm:text-left">
            <div className="font-bold text-stone-900 text-sm">
              Arabic <span className="text-emerald-800">NET/JRF</span> Practice
            </div>
            <p className="text-stone-400 mt-0.5">
              Free UGC NET Arabic Previous Year Questions & Syllabus Practice.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium text-stone-500">
            <Link href="/syllabus" className="hover:text-emerald-800 transition-colors">Syllabus</Link>
            <Link href="/pyq" className="hover:text-emerald-800 transition-colors">PYQs</Link>
            <Link href="/memories" className="hover:text-emerald-800 transition-colors">Memories</Link>
            <Link href="/about" className="hover:text-emerald-800 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-emerald-800 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-emerald-800 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-emerald-800 transition-colors">Terms</Link>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200/60 text-center text-[11px] text-stone-400">
          &copy; {new Date().getFullYear()} Arabic NET/JRF Practice. Not affiliated with UGC or NTA.
        </div>
      </div>
    </footer>
  );
}
