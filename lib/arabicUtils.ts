/**
 * Arabic Text Normalization & Regex Builder
 * Handles tashkeel/diacritics, alef variants, taa marbuta, and yaa variants.
 */

export function normalizeArabicText(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // strip tashkeel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim();
}

export function buildArabicRegexPattern(input: string): string {
  const clean = input
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .trim();

  const arabicDiacritics = '[\\u064B-\\u065F\\u0670]*';

  let pattern = '';
  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    if (/[أإآٱا]/.test(char)) {
      pattern += '[أإآٱا]' + arabicDiacritics;
    } else if (/[ةه]/.test(char)) {
      pattern += '[ةه]' + arabicDiacritics;
    } else if (/[يى]/.test(char)) {
      pattern += '[يى]' + arabicDiacritics;
    } else if (/[\u0600-\u06FF]/.test(char)) {
      pattern += char + arabicDiacritics;
    } else {
      pattern += char;
    }
  }

  return pattern;
}
