'use client';

import React from 'react';

export default function GlobalLoading() {
  return (
    <div className="flex-1 min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#FCFAF8] animate-fade-in">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-28 bg-stone-200 rounded-full animate-pulse" />
          <div className="h-8 w-64 bg-stone-200 rounded-2xl animate-pulse" />
          <div className="h-4 w-96 max-w-full bg-stone-200 rounded-full animate-pulse" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white border border-stone-200/80 rounded-3xl p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-stone-100 animate-pulse" />
                <div className="h-5 w-16 bg-stone-100 rounded-full animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-6 w-3/4 bg-stone-200 rounded-xl animate-pulse" />
                <div className="h-4 w-1/2 bg-stone-100 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
