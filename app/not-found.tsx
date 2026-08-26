import React from 'react';
import Link from 'next/link';
import { Compass, Home, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 min-h-[75vh] flex items-center justify-center p-6 bg-[#FCFAF8]">
      <div className="bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center shadow-sm">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-amber-100 shadow-sm">
          <Compass size={32} />
        </div>

        <div className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">
          404 Error
        </div>
        <h1 className="text-3xl font-black text-stone-900 mb-3">Page Not Found</h1>
        <p className="text-stone-500 text-sm font-medium mb-6 leading-relaxed">
          The page or learning topic you are looking for does not exist or has been relocated in the syllabus hierarchy.
        </p>

        <form action="/search" method="GET" className="mb-8 max-w-sm mx-auto">
          <input 
            type="text" 
            name="q" 
            placeholder="Search for a question or topic..." 
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/syllabus"
            className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <BookOpen size={16} /> Browse Syllabus
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Home size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
