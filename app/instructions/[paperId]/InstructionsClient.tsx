'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InstructionsClient({ paperId }: { paperId: string }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div className="bg-[#FAF9F6] border border-emerald-200 rounded-xl p-5 text-sm text-emerald-900 flex items-start gap-3 mt-6">
        <input 
          type="checkbox" 
          id="declaration" 
          className="mt-1 w-4 h-4 text-emerald-800 rounded border-emerald-300 focus:ring-emerald-500 cursor-pointer"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor="declaration" className="cursor-pointer flex-1">
          <strong>Declaration:</strong> I have read and understood the instructions. I agree that in case I do not follow the instructions, I shall be disqualified.
        </label>
      </div>
      
      {/* Footer actions */}
      <div className="bg-white rounded-b-2xl border border-stone-200 border-t-0 p-6 sm:p-8 flex flex-wrap justify-between items-center gap-4 mt-8">
        <Link href="/pyq" className="px-5 py-2.5 rounded-xl font-semibold text-stone-600 hover:bg-stone-100 transition-colors">
          Cancel
        </Link>
        {isChecked ? (
          <Link 
            href={`/practice?paperId=${paperId}`}
            className="px-8 py-3 rounded-xl font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors shadow-sm flex items-center gap-2"
          >
            I am ready to begin
          </Link>
        ) : (
          <button 
            disabled 
            className="px-8 py-3 rounded-xl font-bold text-stone-400 bg-stone-100 cursor-not-allowed flex items-center gap-2"
          >
            I am ready to begin
          </button>
        )}
      </div>
    </>
  );
}
