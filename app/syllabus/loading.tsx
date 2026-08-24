import React from 'react';

export default function SyllabusLoading() {
  return (
    <div className="flex-1 min-h-screen pt-10 pb-24 bg-[#FCFAF8] animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Skeleton */}
        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 mb-10 shadow-sm space-y-4">
          <div className="h-4 w-32 bg-stone-200 rounded-full animate-pulse" />
          <div className="h-10 w-80 bg-stone-200 rounded-2xl animate-pulse" />
          <div className="h-4 w-96 max-w-full bg-stone-200 rounded-full animate-pulse" />
        </div>

        {/* 2-Column Skeleton */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Units Grid */}
          <div className="flex-1 min-w-0 space-y-4">
            <div className="h-4 w-40 bg-stone-200 rounded-full mb-4 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-stone-200/90 rounded-3xl p-6 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-stone-100 animate-pulse" />
                    <div className="h-5 w-20 bg-stone-100 rounded-full animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 w-3/4 bg-stone-200 rounded-xl animate-pulse" />
                    <div className="h-4 w-1/2 bg-stone-100 rounded-lg animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="h-4 w-24 bg-stone-200 rounded-full animate-pulse" />
              <div className="h-6 w-48 bg-stone-200 rounded-xl animate-pulse" />
              <div className="h-20 bg-stone-100 rounded-2xl animate-pulse" />
              <div className="h-11 bg-stone-200 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
