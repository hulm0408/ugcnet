/**
 * Date and relative time formatting helpers
 */

export function formatRelativeDate(dateInput: Date | string | number): string {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '—';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  if (diffDays === 0) {
    if (diffMin < 2) return 'Just now';
    if (diffMin < 60) return `${diffMin} mins ago`;
    return `Today at ${timeStr}`;
  }

  if (diffDays === 1) {
    return `Yesterday at ${timeStr}`;
  }

  if (diffDays < 7) {
    return `${diffDays} days ago (${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
  }

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago (${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
  }

  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago (${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})`;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatFullDateTime(dateInput: Date | string | number): string {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '—';

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Calculates CBT / mock test duration based on 1 minute 20 seconds (80 seconds) per question.
 */
export function calculateTestDurationSeconds(totalQuestions: number): number {
  const count = Math.max(1, totalQuestions || 1);
  return count * 80;
}

/**
 * Formats duration in human-readable text (e.g. "66 Mins 40 Secs", "1 Hr 6 Mins 40 Secs", etc.)
 */
export function formatTestDuration(totalQuestions: number): {
  totalSeconds: number;
  minutes: number;
  formattedText: string;
  shortText: string;
} {
  const totalSeconds = calculateTestDurationSeconds(totalQuestions);
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  let formattedText = '';
  if (hours > 0) {
    formattedText = `${hours} hr${hours > 1 ? 's' : ''}${mins > 0 ? ` ${mins} min${mins > 1 ? 's' : ''}` : ''}${secs > 0 ? ` ${secs} sec${secs > 1 ? 's' : ''}` : ''}`.trim();
  } else if (mins > 0) {
    formattedText = `${mins} min${mins > 1 ? 's' : ''}${secs > 0 ? ` ${secs} sec${secs > 1 ? 's' : ''}` : ''}`.trim();
  } else {
    formattedText = `${secs} sec${secs > 1 ? 's' : ''}`;
  }

  const shortText = `${Math.ceil(totalSeconds / 60)} Mins`;

  return {
    totalSeconds,
    minutes: Math.ceil(totalSeconds / 60),
    formattedText,
    shortText,
  };
}

