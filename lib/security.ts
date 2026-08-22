/**
 * Security Utilities
 * 
 * - Server-side admin authorization check
 * - Audit logging
 * - IP address extraction
 * - Content status filtering (CRITICAL: always call for public queries)
 */

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

// ═══════════════════════════════════════════════════
// AUTHORIZATION
// ═══════════════════════════════════════════════════

/**
 * Get the current authenticated session.
 * Returns null if not authenticated.
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

/**
 * Require authentication. Redirects to login if not authenticated.
 * Use in Server Components and API routes.
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

/**
 * Require ADMIN or SUPER_ADMIN role.
 * Returns 403 in API routes, redirects in Server Components.
 */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
    redirect('/dashboard');
  }
  return user;
}

/**
 * Check if user is admin (for use in API routes without redirect).
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
}

// ═══════════════════════════════════════════════════
// CONTENT STATUS (CRITICAL SECURITY)
// ═══════════════════════════════════════════════════

/**
 * The ONLY content status that students can see.
 * This filter MUST be applied to every public/student API query.
 * 
 * NEVER skip this filter on public endpoints.
 */
export const PUBLIC_CONTENT_STATUS = 'PUBLISHED' as const;

/**
 * WHERE clause filter for public question queries.
 * Always include this in student-facing Prisma queries.
 */
export const publicQuestionFilter = {
  content_status: PUBLIC_CONTENT_STATUS,
  exam_paper: {
    content_status: PUBLIC_CONTENT_STATUS,
  },
} as const;

/**
 * WHERE clause filter for public exam paper queries.
 */
export const publicPaperFilter = {
  content_status: PUBLIC_CONTENT_STATUS,
} as const;

// ═══════════════════════════════════════════════════
// AUDIT LOGGING
// ═══════════════════════════════════════════════════

export type AuditAction =
  | 'QUESTION_ARCHIVED'
  | 'QUESTION_STATUS_CHANGED'
  | 'QUESTION_CLASSIFICATION_CHANGED'
  | 'EXAM_PAPER_STATUS_CHANGED'
  | 'USER_ROLE_CHANGED'
  | 'USER_ACTIVATED'
  | 'USER_DEACTIVATED'
  | 'IMPORT_STARTED'
  | 'IMPORT_COMPLETED'
  | 'HIERARCHY_CHANGED'
  | 'SETTING_CHANGED'
  | 'REPORT_RESOLVED'
  | 'REPORT_DISMISSED';

export async function auditLog(params: {
  userId: string;
  action: AuditAction;
  entityType?: string;
  entityId?: string;
  oldValue?: any;
  newValue?: any;
  ipAddress?: string;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        user_id: params.userId,
        action: params.action,
        entity_type: params.entityType,
        entity_id: params.entityId,
        old_value: params.oldValue,
        new_value: params.newValue,
        ip_address: params.ipAddress,
      },
    });
  } catch {
    // Audit log failure should not break the operation
    console.error('Failed to write audit log:', params);
  }
}

// ═══════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════

/**
 * Extract the client IP address from the request.
 * Respects Vercel's x-forwarded-for header.
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? '127.0.0.1';
}

/**
 * Strip the correct_answer from question data before sending to client.
 * CRITICAL: Never expose correct_answer in question GET responses.
 */
export function stripAnswer<T extends { correct_answer?: unknown }>(
  question: T,
): Omit<T, 'correct_answer'> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { correct_answer, ...safe } = question;
  return safe;
}
