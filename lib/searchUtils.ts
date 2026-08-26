/**
 * Search Utilities for Question Reference & Entity Research
 */

export function buildGoogleSearchUrl(options: {
  questionArabic?: string | null;
  questionEnglish?: string | null;
  entityNameArabic?: string | null;
  entityNameEnglish?: string | null;
  microFocusArabic?: string | null;
  unitName?: string | null;
}): string {
  // Priority: Specific entity -> Micro focus -> Question excerpt
  let query = '';

  if (options.entityNameArabic) {
    query = options.entityNameArabic;
    if (options.entityNameEnglish) {
      query += ` ${options.entityNameEnglish}`;
    }
  } else if (options.microFocusArabic) {
    query = options.microFocusArabic;
  } else if (options.questionArabic) {
    // Take the first 12 words of the Arabic question to create a concise, effective search query
    const words = options.questionArabic.trim().split(/\s+/).slice(0, 12).join(' ');
    query = words;
  } else if (options.questionEnglish) {
    const words = options.questionEnglish.trim().split(/\s+/).slice(0, 12).join(' ');
    query = words;
  }

  // Append topic context if available to refine search
  if (options.unitName && !query.includes(options.unitName)) {
    query += ` ${options.unitName}`;
  }

  return `https://www.google.com/search?q=${encodeURIComponent(query.trim())}`;
}
