import React from 'react';

export default function PYQLoading() {
  return (
    <div className="flex-1 bg-stone-50 min-h-screen animate-fade-in">
      {/* Hero Skeleton */}
      <div className="bg-[#0A231C] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-10 w-72 bg-emerald-900/60 rounded-2xl animate-pulse" />
          <div className="h-8 w-48 bg-emerald-900/40 rounded-xl animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl pt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-emerald-900/30 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Years Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div
              key={i}
              className="bg-white border border-stone-200 rounded-2xl p-6 text-center space-y-3 shadow-sm"
            >
              <div className="h-8 w-16 bg-stone-200 rounded-lg mx-auto animate-pulse" />
              <div className="h-4 w-12 bg-stone-100 rounded mx-auto animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
