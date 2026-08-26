'use client';

import React from 'react';

interface BilingualTextProps {
  text?: string | null;
  className?: string;
  defaultDirection?: 'ltr' | 'rtl';
  as?: React.ElementType;
}

// Regex to capture Arabic script characters (including diacritics / harakat and extended Arabic)
const ARABIC_REGEX = /([\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+[\u064B-\u065F\u0670]*)|\n+/g;

/**
 * Intelligent Bilingual Text Renderer
 * Prevents "missing glyph" boxes (🖽) when Arabic terms are embedded inside English sentences
 * or when English terms are inside Arabic sentences.
 * Isolates bidirectional text segments using unicode-bidi: isolate.
 */
export default function BilingualText({
  text,
  className = '',
  defaultDirection = 'ltr',
  as: Component = 'span',
}: BilingualTextProps) {
  if (!text) return null;

  // If text is purely ASCII, render directly in font-sans
  if (!/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text)) {
    return (
      <Component className={`font-sans ${className}`} dir={defaultDirection}>
        {text}
      </Component>
    );
  }

  // If text is purely Arabic, render in font-arabic with RTL
  if (!/[a-zA-Z]/.test(text)) {
    return (
      <Component className={`font-arabic leading-[1.8] ${className}`} dir="rtl" lang="ar">
        {text}
      </Component>
    );
  }

  // Mixed text: parse into segments and wrap Arabic segments in font-arabic
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const regex = new RegExp(ARABIC_REGEX);
  let keyIdx = 0;

  while ((match = regex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = regex.lastIndex;

    // Preceding Latin / neutral text
    if (matchStart > lastIndex) {
      const latinChunk = text.slice(lastIndex, matchStart);
      parts.push(
        <span key={`latin-${keyIdx++}`} className="font-sans bidi-isolate" dir="ltr">
          {latinChunk}
        </span>
      );
    }

    const matchedText = match[0];
    if (matchedText.startsWith('\n')) {
      parts.push(<br key={`br-${keyIdx++}`} />);
    } else {
      // Arabic chunk
      parts.push(
        <span
          key={`ar-${keyIdx++}`}
          dir="rtl"
          lang="ar"
          className="font-arabic font-bold inline-block mx-0.5 bidi-isolate text-[1.1em] leading-normal"
        >
          {matchedText}
        </span>
      );
    }

    lastIndex = matchEnd;
  }

  // Trailing Latin text
  if (lastIndex < text.length) {
    parts.push(
      <span key={`latin-${keyIdx++}`} className="font-sans bidi-isolate" dir="ltr">
        {text.slice(lastIndex)}
      </span>
    );
  }

  return (
    <Component className={`bidi-isolate ${className}`} dir={defaultDirection}>
      {parts}
    </Component>
  );
}
