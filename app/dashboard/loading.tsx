import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="flex-1 bg-gradient-to-b from-primary-surface to-white min-h-screen py-10 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="h-10 w-72 bg-stone-200 rounded-2xl animate-pulse" />
          <div className="h-4 w-96 bg-stone-100 rounded-lg animate-pulse" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white/80 rounded-3xl border border-stone-200/60 p-6 space-y-3 shadow-sm"
            >
              <div className="w-11 h-11 rounded-2xl bg-stone-100 animate-pulse" />
              <div className="h-8 w-16 bg-stone-200 rounded-xl animate-pulse" />
              <div className="h-4 w-24 bg-stone-100 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="h-5 w-32 bg-stone-200 rounded-lg animate-pulse" />
          <div className="grid sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white/80 border border-stone-200/60 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
