'use client';

import React from 'react';

export default function PreparationJourneySvg() {
  return (
    <div className="w-full max-w-lg mx-auto bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-6">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
          LEARNING ARCHITECTURE
        </span>
        <span className="text-xs font-mono text-stone-500">NTA UGC NET</span>
      </div>

      <svg
        viewBox="0 0 400 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-white"
      >
        {/* Connection Curves */}
        <path
          d="M 80 55 C 160 55, 160 130, 240 130"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          className="opacity-60"
        />
        <path
          d="M 240 130 C 300 130, 300 205, 160 205"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          className="opacity-60"
        />
        <path
          d="M 160 205 C 100 205, 100 280, 260 280"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          className="opacity-80"
        />

        {/* Node 1: Official Syllabus */}
        <g transform="translate(20, 25)">
          <rect
            width="130"
            height="56"
            rx="14"
            fill="#1c1917"
            stroke="#44403c"
            strokeWidth="1.5"
          />
          <circle cx="24" cy="28" r="10" fill="#065f46" />
          <text x="24" y="32" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
            01
          </text>
          <text x="44" y="24" fill="#f5f5f4" fontSize="11" fontWeight="bold">
            Syllabus
          </text>
          <text x="44" y="40" fill="#a8a29e" fontSize="9">
            10 Official Units
          </text>
        </g>

        {/* Node 2: Real PYQs */}
        <g transform="translate(220, 100)">
          <rect
            width="150"
            height="56"
            rx="14"
            fill="#1c1917"
            stroke="#44403c"
            strokeWidth="1.5"
          />
          <circle cx="24" cy="28" r="10" fill="#065f46" />
          <text x="24" y="32" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
            02
          </text>
          <text x="44" y="24" fill="#f5f5f4" fontSize="11" fontWeight="bold">
            2004–2024 PYQs
          </text>
          <text x="44" y="40" fill="#a8a29e" fontSize="9">
            3,150+ Exam Questions
          </text>
        </g>

        {/* Node 3: Targeted Practice */}
        <g transform="translate(40, 175)">
          <rect
            width="150"
            height="56"
            rx="14"
            fill="#1c1917"
            stroke="#44403c"
            strokeWidth="1.5"
          />
          <circle cx="24" cy="28" r="10" fill="#065f46" />
          <text x="24" y="32" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
            03
          </text>
          <text x="44" y="24" fill="#f5f5f4" fontSize="11" fontWeight="bold">
            CBT Practice
          </text>
          <text x="44" y="40" fill="#a8a29e" fontSize="9">
            Unit & Topic Drills
          </text>
        </g>

        {/* Node 4: Personal Memory & Spaced Mastery */}
        <g transform="translate(180, 250)">
          <rect
            width="190"
            height="56"
            rx="14"
            fill="#064e3b"
            stroke="#10b981"
            strokeWidth="2"
          />
          <circle cx="24" cy="28" r="10" fill="#10b981" />
          <text x="24" y="32" textAnchor="middle" fill="#022c22" fontSize="10" fontWeight="bold">
            04
          </text>
          <text x="44" y="24" fill="#ffffff" fontSize="11" fontWeight="bold">
            5-Level Retention
          </text>
          <text x="44" y="40" fill="#a7f3d0" fontSize="9">
            Personal Tricks & Recall
          </text>
        </g>
      </svg>

      <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400 font-mono">
        <span>Syllabus → PYQ → Memory</span>
        <span className="text-emerald-400 font-bold">100% Deterministic</span>
      </div>
    </div>
  );
}
