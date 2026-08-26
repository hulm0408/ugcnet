import React, { useState } from 'react';
import InstructionsSvg from '@/components/ui/InstructionsSvg';
import { formatTestDuration } from '@/lib/dateUtils';

interface InstructionsViewProps {
  onStart: () => void;
  onBack: () => void;
  year?: string;
  paper?: string;
  totalQuestions: number;
}

export default function InstructionsView({ onStart, onBack, year = '2009', paper = 'Paper II', totalQuestions }: InstructionsViewProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex-1 bg-gradient-to-b from-primary-surface to-white overflow-y-auto font-sans" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 animate-fade-in">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900">{paper || `UGC NET Examination – ${year}`}</h1>
          <p className="text-sm font-semibold text-stone-500 mt-1">Official NTA Computer-Based Test (CBT) Simulation</p>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Graphic */}
          <div className="lg:w-1/3 bg-primary-surface/50 p-10 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-stone-200 relative overflow-hidden">
            <InstructionsSvg className="w-full max-w-[280px] drop-shadow-2xl relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
          </div>
          
          {/* Right Content */}
          <div className="lg:w-2/3 p-8 lg:p-12">
            
            {/* Table of Details */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10 text-sm bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500 font-medium">Total Questions</span>
                <span className="font-bold text-stone-900">{totalQuestions}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500 font-medium">Total Marks</span>
                <span className="font-bold text-stone-900">{totalQuestions * 2}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500 font-medium">Duration</span>
                <span className="font-bold text-stone-900">
                  {formatTestDuration(totalQuestions).formattedText}
                  <span className="text-[11px] text-stone-400 font-normal block sm:inline sm:ml-1">
                    (1m 20s / Q)
                  </span>
                </span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500 font-medium">Negative Marking</span>
                <span className="font-bold text-red-600">No</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500 font-medium">Question Type</span>
                <span className="font-bold text-stone-900">MCQs</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500 font-medium">Medium</span>
                <span className="font-bold text-stone-900">Arabic & English</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-stone-900 mb-6">General Instructions</h3>
            
            <div className="space-y-5 text-stone-600 mb-10">
              <div className="flex gap-4">
                <div className="font-bold text-stone-900">1.</div>
                <p className="text-sm font-medium leading-relaxed">The test will start immediately after you click on &quot;Start Test&quot;.</p>
              </div>
              <div className="flex gap-4">
                <div className="font-bold text-stone-900">2.</div>
                <p className="text-sm font-medium leading-relaxed">The timer will be displayed on the top of the screen.</p>
              </div>
              <div className="flex gap-4">
                <div className="font-bold text-stone-900">3.</div>
                <p className="text-sm font-medium leading-relaxed">You can navigate between questions using the question palette.</p>
              </div>
              <div className="flex gap-4">
                <div className="font-bold text-stone-900">4.</div>
                <p className="text-sm font-medium leading-relaxed">You can mark questions for review using the &quot;Mark for Review&quot; option.</p>
              </div>
              <div className="flex gap-4">
                <div className="font-bold text-stone-900">5.</div>
                <p className="text-sm font-medium leading-relaxed">Once submitted, you cannot change your answers.</p>
              </div>
              <div className="flex gap-4">
                <div className="font-bold text-stone-900">6.</div>
                <p className="text-sm font-medium leading-relaxed">The test will be auto-submitted when the time is over.</p>
              </div>
            </div>
            
            <div className="border-t border-stone-200 pt-8">
              <label className="flex items-center gap-3 cursor-pointer mb-6 group">
                <input type="checkbox" className="hidden" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${isChecked ? 'bg-primary border-primary' : 'bg-white border-stone-300 group-hover:border-primary'}`}>
                  {isChecked && (
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-sm font-bold text-stone-800 select-none">I have read and understood all the instructions.</span>
              </label>

              <div className="flex items-center gap-4">
                <button
                  onClick={onBack}
                  className="px-8 py-3.5 font-bold text-stone-500 bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onStart}
                  disabled={!isChecked}
                  className={`flex-1 px-8 py-3.5 font-bold text-white rounded-xl shadow-md transition-all ${
                    isChecked 
                      ? 'bg-primary hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5' 
                      : 'bg-stone-300 cursor-not-allowed'
                  }`}
                >
                  Start Test
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
