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
