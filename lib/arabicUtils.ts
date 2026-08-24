/**
 * Arabic Text & Tashkeel Normalization Utilities
 */

/**
 * Strips Quranic/Classical Arabic diacritics (Tashkeel).
 */
export function removeTashkeel(text: string): string {
  if (!text) return '';
  return text.replace(/[\u064B-\u065F\u0670]/g, '');
}

/**
 * Normalizes Arabic letters:
 * - Unifies all Alef variants (أ, إ, آ, ٱ) into plain 'ا'
 * - Normalizes Alif Maqsura (ى) into Yaa (ي)
 * - Normalizes Taa Marbuta (ة) into Haa (ه)
 * - Strips all Tashkeel / diacritics
 * - Normalizes Tatweel (ـ)
 */
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  return removeTashkeel(text)
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ـ/g, '')
    .trim();
}

/**
 * Safely extracts text string from option value regardless of whether
 * it is a raw string or an object { arabic: string, english: string }.
 */
export function getOptionText(optValue: any, lang: 'ar' | 'en' = 'ar'): string {
  if (!optValue) return '';
  if (typeof optValue === 'string') return optValue;
  if (typeof optValue === 'object') {
    if (lang === 'ar') {
      return optValue.arabic || optValue.text || optValue.name || optValue.label || '';
    } else {
      return optValue.english || optValue.en || optValue.text || '';
    }
  }
  return String(optValue);
}

/**
 * Compiles a search string into a PostgreSQL diacritic-insensitive regular expression pattern.
 */
export function buildArabicRegexPattern(query: string): string {
  if (!query) return '';
  const trimmed = query.trim();

  // If query is not Arabic, perform standard case-insensitive regex
  if (!/[\u0600-\u06FF]/.test(trimmed)) {
    return trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const diacritics = '[\\u064B-\\u065F\\u0670]*';
  let regex = '';

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];

    if (/\s/.test(char)) {
      regex += '\\s+';
      continue;
    }

    if (/[أإآٱا]/.test(char)) {
      regex += `[أإآٱا]${diacritics}`;
    } else if (/[يى]/.test(char)) {
      regex += `[يى]${diacritics}`;
    } else if (/[ةه]/.test(char)) {
      regex += `[ةه]${diacritics}`;
    } else if (/[\u064B-\u065F\u0670]/.test(char)) {
      // ignore explicit diacritic in query string
      continue;
    } else {
      const escaped = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      regex += `${escaped}${diacritics}`;
    }
  }

  return regex;
}
