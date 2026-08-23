# Task Board: Arabic NET/JRF Platform

## 📋 Todo

### Epic 1: Database & Data Pipeline (DATABASE & CONTENT)
- [ ] Refine/finalize database seeds for all 10 Syllabus Units and Broad Topics
- [ ] Build robust JSON parsing script to ingest PYQ files (mapping to `Question`, `ExamPaper`, `Subtopic`)
- [ ] Ensure Arabic text, English translations, options, and explanations are preserved exactly as provided in the raw data
- [ ] Build data-validation logic for missing fields and malformed records

### Epic 2: Core User Authentication (AUTH & SECURITY)
- [ ] Enforce protected routes across Dashboard and Practice pages
- [ ] Establish Role-Based Access Control (RBAC) separating `USER`, `ADMIN`, and `SUPER_ADMIN`
- [ ] Ensure robust session persistence in Edge runtime (NextAuth v5)

### Epic 3: Foundation & Design System (UI/UX & FRONTEND)
- [ ] Define global typography (Arabic font for RTL, standard Sans font for English)
- [ ] Create base UI components (Button, Card, Input, Modal, Sidebar, Navbar)
- [ ] Implement responsive layout templates (Mobile vs Desktop)
- [ ] Implement Dark/Light mode base configuration (if required)

### Epic 4: Examination Engine (EXAM & FRONTEND)
- [ ] Create PYQ paper selection flow (Year -> Paper/Part -> Start Test)
- [ ] Build CBT (Computer-Based Test) Interface (Timer, Question Palette, Mark for Review, Clear Response)
- [ ] Implement result calculation logic (Score, Correct, Incorrect, Skipped)
- [ ] Develop detailed performance analysis (Unit-wise accuracy, time taken)

### Epic 5: Dashboard & User Progress (FRONTEND & BACKEND)
- [ ] Develop student dashboard view (Quick links, recent activity)
- [ ] Implement Bookmark functionality
- [ ] Implement Incorrect Questions review functionality
- [ ] Build overall progress tracking by Syllabus Unit

### Epic 6: Admin CMS (ADMIN)
- [ ] Build User Management interface
- [ ] Build Question CRUD interface
- [ ] Build Import JSON interface
- [ ] Build Syllabus Hierarchy editor

### Epic 7: QA & Performance (QA & DEVOPS)
- [ ] Set up comprehensive testing suite
- [ ] Audit application for N+1 query problems in Prisma
- [ ] Setup production monitoring and error logging

---

## 🏗️ In Progress
- [ ] Planning phase (CTO Orchestrator mapping the tasks)

---

## 🚫 Blocked
*(No blocked tasks currently)*

---

## ✅ Completed
- [x] Initialized NextAuth v5 Authentication logic
- [x] Prisma Schema designed for Syllabus, Exam, and Practice Attempt domains
- [x] Project architecture documentation initialized
