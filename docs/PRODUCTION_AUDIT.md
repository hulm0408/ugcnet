# PRODUCTION AUDIT & FAILURE MAP
**Date**: August 2026
**Status**: IN PROGRESS / DISCOVERY PHASE

This document serves as the central audit report for diagnosing the functional failures in the current Arabic NET/JRF platform. 

---

## 1. PYQ Data Fetching & Missing Data
**Symptoms:** 
- PYQ data is not fetching correctly.
- Some questions/data are missing during the fetch (e.g., only a partial paper loads).

**Root Cause:**
- **API Hard Capping**: The endpoint `/api/questions/route.ts` enforces a strict hard limit on the number of returned questions:
  `const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100);`
- **Frontend Expectation vs Backend Reality**: The frontend `app/practice/page.tsx` requests `limit=200` to fetch an entire year's worth of papers or a combined Paper II & III. The API clamps this to 100.
- **Lack of Pagination**: The frontend test engine (`PracticeContent`) does not implement pagination when loading a test. It expects the API to return the full set of questions in one go. Thus, if a paper has 100 questions and another has 75 in the same year, 75 questions are silently dropped.

**Proposed Fix:**
- **Backend**: Increase the maximum limit in `/api/questions/route.ts` to accommodate the maximum possible questions in a single exam sitting (e.g., 200 or 250).
- **Frontend**: Modify `app/practice/page.tsx` to handle paginated fetching (fetching pages sequentially until `meta.totalPages` is reached) if the set is larger than the API limit.

---

## 2. Google Authentication Failures
**Symptoms:**
- Google login is failing.
- Production Google login shows: "NextAuth Configuration error".

**Root Cause:**
- **Missing or Invalid Environment Variables**: NextAuth (Auth.js v5) throws a Configuration Error during initialization if the OAuth Provider is misconfigured. In `lib/auth.ts`, the Google Provider is initialized with:
  ```typescript
  clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || '',
  ```
  If Vercel does not have these exact variables injected in the production environment, the provider receives an empty string `''`, which triggers an immediate `OAuthCallbackError` or `ConfigurationError`.
- **Missing AUTH_SECRET**: Auth.js v5 requires `AUTH_SECRET` to function securely. If only `NEXTAUTH_SECRET` is set in Vercel and Auth.js strictly checks for `AUTH_SECRET` during the Edge/Node runtime initialization, it will fail.
- **Redirect URI Mismatch**: Even if variables exist, if the Google Cloud Console does not have `https://ugcnetarabic.vercel.app/api/auth/callback/google` registered as an authorized redirect URI, Google will reject the handshake.

**Proposed Fix:**
- Verify and standardize the Vercel environment variables: Ensure `AUTH_SECRET`, `AUTH_GOOGLE_ID`, and `AUTH_GOOGLE_SECRET` are strictly populated.
- Update Google Cloud Console OAuth 2.0 Client IDs to include the production callback URL.

---

## 3. Page Load Failures (500 Server Errors)
**Symptoms:**
- Some pages fail to load completely.

**Root Cause:**
- **Unsafe Param Parsing in Dynamic Routes**: In dynamic routes like `app/pyq/[year]/page.tsx`, the `year` parameter is extracted and parsed into an integer:
  ```typescript
  const yearInt = parseInt(year);
  const dbPapers = await prisma.examPaper.findMany({ where: { year: yearInt } });
  ```
  If `year` is an invalid string or `NaN` (e.g., a bot scraping a malformed URL), Prisma will throw a validation error (`Int expected, got NaN`), causing an unhandled exception and a 500 error instead of a graceful 404.

**Proposed Fix:**
- Add explicit `isNaN` checks after `parseInt` in all dynamic routes (`app/pyq/[year]/page.tsx`, etc.). If `isNaN`, return `notFound()`.

---

## 4. API & Database Responses (Incomplete/Incorrect)
**Symptoms:**
- Database/API responses may be incomplete.
- Some frontend pages are not receiving the expected backend data.

**Root Cause:**
- **Content Status Filtering**: Queries in `app/pyq/[year]/page.tsx` and `app/api/questions/route.ts` correctly filter by `content_status: 'PUBLISHED'`. However, if the database has imported questions with lowercase `'published'` or another state (`'DRAFT'`, `'UNVERIFIED'`), they are excluded.
- **Data Import Stability**: The script `scripts/import/run-import.ts` suffers from `Connection terminated unexpectedly` during large JSON ingestions (likely due to `pg-pool` exhaustion or statement timeouts). This results in partially imported databases where Exam Papers exist but their child Questions are missing.

**Proposed Fix:**
- **Audit Database Integrity**: Run a database verification query to ensure `total_questions` on `ExamPaper` matches the actual `count()` of related `Question` records.
- **Fix Import Script**: Implement batching (e.g., `prisma.$transaction` with chunking) and connection pooling limits in the import script.

---

## Next Steps (Phase 2 - Execution Plan)
1. Check production environment variables on Vercel.
2. Fix the `/api/questions` hard limit and add `isNaN` checks to dynamic routes.
3. Validate database integrity of imported PYQs.
