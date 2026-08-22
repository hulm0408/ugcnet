import React from 'react';

export default function NtaPaletteIcon({
  status,
  number,
  className = ''
}: {
  status: 'not-visited' | 'not-answered' | 'answered' | 'marked' | 'answered-marked' | 'correct' | 'incorrect';
  number: number;
  className?: string;
}) {
  const baseClasses = `flex items-center justify-center font-bold text-xs ${className}`;
  
  if (status === 'correct') {
    return (
      <div className={`${baseClasses} w-8 h-8 rounded-lg bg-[#107A53] text-white shadow-sm`}>
        {number}
      </div>
    );
  }
  
  if (status === 'incorrect') {
    return (
      <div className={`${baseClasses} w-8 h-8 rounded-lg bg-rose-500 text-white shadow-sm`}>
        {number}
      </div>
    );
  }

  if (status === 'not-visited') {
    return (
      <div className={`${baseClasses} w-8 h-8 rounded-md border border-stone-300 bg-stone-100 text-stone-600`}>
        {number}
      </div>
    );
  }
  
  if (status === 'not-answered') {
    return (
      <div className={`${baseClasses} w-8 h-8 bg-rose-500 text-white relative`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)' }}>
        {number}
      </div>
    );
  }
  
  if (status === 'answered') {
    return (
      <div className={`${baseClasses} w-8 h-8 bg-[#107A53] text-white relative`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 25% 100%, 0 75%)' }}>
        {number}
      </div>
    );
  }
  
  if (status === 'marked') {
    return (
      <div className={`${baseClasses} w-8 h-8 rounded-full bg-[#D97706] text-white`}>
        {number}
      </div>
    );
  }
  
  if (status === 'answered-marked') {
    return (
      <div className={`${baseClasses} w-8 h-8 rounded-full bg-[#D97706] text-white relative`}>
        {number}
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#107A53] rounded-full border border-white" />
      </div>
    );
  }

  return null;
}
