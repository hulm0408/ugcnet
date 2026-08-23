# Phase 2: Functional Audit Report

## 1. Authentication / Google Login

**Issue:** Google Login completely crashed, creating empty sessions or failing to link accounts.
**Root Cause:** `@auth/prisma-adapter` explicitly expects standard camelCase mappings for all property names when translating NextAuth `Session` and `Account` objects into database writes (e.g. `providerAccountId`, `emailVerified`). The existing `schema.prisma` defined these entirely in snake_case (e.g., `provider_account_id`). 
**Resolution:** Updated `schema.prisma` so the Prisma Client properties use camelCase but map down to the underlying SQL using `@map("...")`. The database structure did not have to change, preventing data loss.
**Status:** ✅ RESOLVED

## 2. API Data Fetching / Routing

**Issue:** Pages were crashing; some data fetching (Next.js server components and client queries) yielded broken logic or 404s.
**Root Cause:** Type and property collisions from the unmapped snake_case properties extended into server components like the Admin `/admin/users` page which queried `created_at` instead of `createdAt`.
**Resolution:** Re-generated Prisma Types and mapped standard fields. Used tests against localhost API endpoints to confirm payload accuracy.
**Status:** ✅ RESOLVED

## 3. PYQ Flow: "Can't tick checkbox" 

**Issue:** "Cancel / Start Test I CANT TICK THE CHECK LIST BUTTON"
**Root Cause:** The `app/instructions/[paperId]/page.tsx` page was completely static and didn't even contain a `<input type="checkbox">` for the declaration, preventing the user from completing the validation flow.
**Resolution:** Factored the footer section out into a client component `InstructionsClient.tsx` holding a controlled checkbox state that gates the navigation button to `/practice`.
**Status:** ✅ RESOLVED

## 4. Practice & Mock Test Flow (Other Topics bug)

**Issue:** The user's Sectional Analysis displayed `100` questions classified under "Other Topics" during a mock test.
**Root Cause:** The classification mapping `unit_id` was broken at the dataset level, meaning `q.unit` resolved to `null` in `/api/questions` payload. The React component `ResultSummaryView.tsx` defensively falls back to `{ name_english: "Other Topics", unit_number: 99 }` if `q.unit` is null.
**Resolution:** Fully fixed natively by the successful completion of Phase 1 (Database Rebuild). Manually checked the `/api/questions` endpoint to guarantee relational population of the `unit` object for PYQ tests.
**Status:** ✅ RESOLVED

## 5. Dashboard & Admin

**Issue:** General potential broken fields.
**Resolution:** Refactored `Dashboard` and `Admin` route Server Components to respect NextAuth and Prisma client field naming conventions (`userId`, `createdAt`, `lastActiveAt`). Verified all `/admin/*` and `/dashboard/*` page routing endpoints return 200 HTTP OK in production build configuration.
**Status:** ✅ RESOLVED

---

**Conclusion:** All critical blocker issues flagged in Phase 2 have been structurally analyzed, repaired, and type-checked against a full production build (`npm run build`). Phase 3 (UI Polish) can commence.
