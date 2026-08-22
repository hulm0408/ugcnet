/**
 * DB-based Rate Limiter
 * 
 * Implements rate limiting using a PostgreSQL table instead of Redis.
 * Suitable for launch-scale traffic. Upgrade to Upstash KV when needed.
 * 
 * Usage:
 *   const result = await checkRateLimit('login', clientIp, { limit: 5, windowSeconds: 900 });
 *   if (!result.allowed) {
 *     return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
 *   }
 */

import { prisma } from '@/lib/db';

export interface RateLimitConfig {
  limit: number;       // Max attempts allowed
  windowSeconds: number; // Time window in seconds
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

/**
 * Check if the given key has exceeded its rate limit.
 * Atomically increments the counter and resets if expired.
 */
export async function checkRateLimit(
  prefix: string,
  identifier: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  const key = `${prefix}:${identifier}`;
  const now = new Date();
  const windowMs = config.windowSeconds * 1000;

  try {
    // Clean up expired entries occasionally (1 in 20 chance to avoid overhead)
    if (Math.random() < 0.05) {
      await prisma.rateLimit.deleteMany({
        where: { reset_at: { lt: now } },
      });
    }

    const existing = await prisma.rateLimit.findUnique({ where: { key } });

    if (!existing || existing.reset_at < now) {
      // Create new window
      const resetAt = new Date(now.getTime() + windowMs);
      await prisma.rateLimit.upsert({
        where: { key },
        update: { attempts: 1, reset_at: resetAt },
        create: { key, attempts: 1, reset_at: resetAt },
      });
      return { allowed: true, remaining: config.limit - 1, resetAt };
    }

    if (existing.attempts >= config.limit) {
      return { allowed: false, remaining: 0, resetAt: existing.reset_at };
    }

    // Increment
    const updated = await prisma.rateLimit.update({
      where: { key },
      data: { attempts: { increment: 1 } },
    });

    return {
      allowed: true,
      remaining: Math.max(0, config.limit - updated.attempts),
      resetAt: existing.reset_at,
    };
  } catch {
    // Fail open — if DB error, allow the request
    console.error('Rate limit DB error — failing open');
    return { allowed: true, remaining: 1, resetAt: now };
  }
}

// ── Pre-configured limiters ────────────────────────

/** Login: 5 attempts per 15 minutes per IP */
export const loginRateLimit = (ip: string) =>
  checkRateLimit('login', ip, { limit: 5, windowSeconds: 900 });

/** Signup: 3 attempts per hour per IP */
export const signupRateLimit = (ip: string) =>
  checkRateLimit('signup', ip, { limit: 3, windowSeconds: 3600 });

/** Password reset: 3 requests per hour per email */
export const passwordResetRateLimit = (email: string) =>
  checkRateLimit('pwreset', email, { limit: 3, windowSeconds: 3600 });

/** API: 100 requests per minute per user */
export const apiRateLimit = (userId: string) =>
  checkRateLimit('api', userId, { limit: 100, windowSeconds: 60 });

/** Search: 30 searches per minute per user/IP */
export const searchRateLimit = (identifier: string) =>
  checkRateLimit('search', identifier, { limit: 30, windowSeconds: 60 });
