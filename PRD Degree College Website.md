# PRD: Degree College Website

*Product Requirements Document, written to guide a build agent. Replace every `[PLACEHOLDER]` with real college details before launch.*

## 1. Overview

**Product:** Official public website for Captain Rakesh Mohan Shyam Degree College, a degree college affiliated to **D****r.** **B. R. Ambedkar**** ****Un****iversi****ty**.

**Why it exists:** The site is a required item for an eligibility or compliance application. It must therefore be complete, accurate, easy to verify, and publicly reachable at a stable URL.

**Reference:** An existing college site was reviewed for structure and ideas only. This build must use original content, original layout, original visual design, and original assets. Nothing is to be copied from the reference (text, images, logos, or code).

## 2. Goals and Non-Goals

### Goals

1. Present the college credibly: identity, affiliation, approvals, management, and contact details.
2. Publish all mandatory disclosures and committee pages in one findable place.
3. Help prospective students find courses, eligibility, fees, and the admission process quickly.
4. Let staff update notices without developer help.
5. Work well on low-end phones and slow networks (the primary audience is mobile).

### Non-Goals (v1)

- Online payments, full student/ERP portal, LMS, or result processing.
- Multi-language CMS workflows (a Hindi/English toggle is optional, see section 9).
- Native mobile app.

## 3. Users and Key Tasks

| User | What they need to do |
| --- | --- |
| Prospective student / parent | Check courses, eligibility, fees, admission dates, apply or enquire, find the campus |
| Current student | Read notices, exam and timetable updates, find forms, reach the office |
| Faculty and staff | View directory, post or update notices |
| Regulator / reviewer / university inspector | Verify affiliation, approvals, committees, policies, and contact details quickly |
| Admin (college office) | Add or edit notices, events, gallery items, documents |

## 4. Success Criteria

- Every mandatory disclosure item (section 6) has a live, linked page or document.
- A first-time visitor can reach admission info, fees, and contact in **two taps or fewer** from the home page.
- Lighthouse mobile scores: Performance 85+, Accessibility 95+, SEO 95+, Best Practices 90+.
- No broken links, no placeholder text, no lorem ipsum at launch.
- Notice posting takes a non-technical admin under 2 minutes.

## 5. Information Architecture

```
Home
About
  ├─ History and Vision/Mission
  ├─ Management (Chairman, Manager, Director, Principal)
  └─ Approvals and Affiliation
Academics
  ├─ Courses and Programmes (B.A., B.Sc., B.Com., etc.)
  ├─ Departments (one page each)
  ├─ Syllabus and Academic Calendar
  └─ Timetable
Admissions
  ├─ Process and Eligibility
  ├─ Fee Structure
  ├─ Fee Refund Policy
  └─ Enquiry / Apply form
Faculty and Staff (directory)
Committees and Policies
  ├─ Anti-Ragging Committee
  ├─ Internal Complaints Committee (ICC) / Sexual Harassment
  ├─ Grievance Redressal Committee
  ├─ RTI
  ├─ Rules and Regulations / Code of Conduct
  └─ Safety and Security
Facilities (library, labs, transport, hostel, etc.)
Notices and Events
Gallery
Contact (address, phone, email, map, office hours)
Legal: Privacy Policy, Terms of Use, Accessibility Statement
```

Navigation rules: maximum two levels of dropdown; no duplicated menu entries; every page reachable from the primary menu or footer.

## 6. Mandatory Disclosures Checklist

> **Agent note:** The exact list depends on the affiliating university and the application this site supports. Treat the list below as a *starting point* and confirm against the official requirement document supplied by the college. Mark each item `Provided / Pending / Not applicable`.

| Item | Page | Status |
| --- | --- | --- |
| College name, address, contact, registration/college code | About, Contact, Footer | Pending |
| Affiliating university and affiliation letter (PDF) | Approvals and Affiliation | Pending |
| Governing body / management details | About > Management | Pending |
| Principal and faculty list with qualifications | Faculty and Staff | Pending |
| Courses offered, intake, eligibility | Courses | Pending |
| Fee structure and refund policy | Admissions | Pending |
| Anti-Ragging committee, members, contact, helpline | Committees | Pending |
| ICC / sexual harassment committee | Committees | Pending |
| Grievance redressal committee and procedure | Committees | Pending |
| RTI information and officer contact | Committees | Pending |
| Infrastructure and facilities | Facilities | Pending |
| Academic calendar | Academics | Pending |
| Privacy policy, terms | Footer | Pending |

## 7. Functional Requirements

### 7.1 Global

- **FR-1** Responsive header with logo, college name, and primary navigation; collapses to a menu on mobile.
- **FR-2** Sticky quick-action bar on mobile: Call, WhatsApp/Enquiry, Admissions.
- **FR-3** Footer with address, phone, email, quick links, committees, legal pages, social links, copyright with year.
- **FR-4** Breadcrumbs on all inner pages.
- **FR-5** Site search (optional in v1; simple client-side search over page titles and notices is acceptable).

### 7.2 Home page (top to bottom)

1. Header and navigation.
2. **Notice ticker or banner** showing the latest 3 to 5 notices with dates, linking to Notices.
3. **Hero**: college name, affiliation line, one primary call to action ("Admissions") and one secondary ("Enquire"). Use a single strong image; avoid heavy carousels.
4. **Quick links grid**: Admissions, Courses, Fees, Faculty, Notices, Committees, Contact.
5. **About snippet** with "Read more".
6. **Leadership strip**: Chairman, Manager, Director/Principal with photo, name, role.
7. **Courses overview**: each course card links to a real course page (no dead `#` links).
8. **Facilities highlights**.
9. **Latest events or news**.
10. **Location**: embedded map plus address and directions link.
11. Footer.

### 7.3 Course and department pages

- Programme name, duration, intake, eligibility, subjects offered, department faculty, syllabus link (PDF), and fee summary.

### 7.4 Admissions

- Step-by-step process, important dates, documents required, eligibility table, downloadable forms.
- **Enquiry form**: name, phone, email (optional), course of interest, message. Server-side validation, spam protection (honeypot or CAPTCHA), and delivery to the college email. Show a clear success message.
- Do **not** make unverifiable promises (guaranteed scholarships, free devices, placements). Only state offers the college confirms in writing, with source and dates.

### 7.5 Faculty and staff directory

- Card or table with photo (optional), name, designation, department, qualification. Filter by department.
- Collect consent before publishing personal details such as phone numbers or personal emails.

### 7.6 Committees and policies

- One page per committee: purpose, members (name, role, contact), complaint procedure, relevant circular or PDF, last-updated date.
- Each page shows a "Last updated" date.

### 7.7 Notices and events

- List view with date, title, category (Admission, Exam, General, Event), and optional attachment (PDF).
- Newest first, pagination, category filter.
- Admin can add, edit, unpublish, and delete notices (see section 8).

### 7.8 Gallery

- Grid of optimized images grouped by event or year, with captions and alt text. Lazy-load images.

### 7.9 Contact

- Full address, phone, email, office hours, embedded map, and the same enquiry form. Include the nearest landmark and transport info.

## 8. Content Management

Minimum viable option, in order of preference:

1. **Git-based or file-based content** (Markdown/JSON for notices, faculty, courses) with a simple admin page or a headless CMS UI for non-developers.
2. A lightweight CMS or database-backed admin panel with login, limited to notices, events, gallery, and documents.

Admin requirements:

- Authenticated login (no shared default passwords); role separation between Admin and Editor if feasible.
- File uploads restricted to PDF/JPG/PNG/WebP with size limits and filename sanitization.
- Every content type has a `published` flag and `updatedAt` date.

## 9. Non-Functional Requirements

| Area | Requirement |
| --- | --- |
| Performance | Pages under 1.5 MB on first load; images compressed (WebP), responsive sizes, lazy loading; no autoplaying video |
| Mobile-first | Design for 360 px width first; tap targets at least 44 px; allow pinch-zoom (do not disable it) |
| Accessibility | WCAG 2.1 AA: semantic HTML, alt text, keyboard navigation, visible focus, contrast 4.5:1, labelled form fields |
| SEO | Unique title and meta description per page, Open Graph tags, sitemap.xml, robots.txt, structured data (`CollegeOrUniversity` / `EducationalOrganization`) |
| Security | HTTPS only, input validation, rate-limited forms, secure headers, no secrets in the repo, dependencies kept current |
| Privacy | Privacy policy page; collect only the data the forms need; state how enquiry data is used and for how long it's kept |
| Reliability | Static or cached delivery where possible; uptime monitoring; backups of content and uploads |
| Browser support | Last two versions of Chrome, Edge, Firefox, Safari; Android Chrome; basic function on older Android WebView |
| Language | English at launch. Optional Hindi toggle: structure the content files so translations can be added without code changes |

## 10. Design Direction

- **Tone:** trustworthy, academic, calm. Not flashy.
- **Palette:** pick one primary colour from the college logo, one accent, and neutrals. Confirm contrast for text on every background.
- **Typography:** one readable sans-serif for UI and body; optionally one serif for headings. Use a font stack with fallbacks. If Hindi is used, pair with a suitable Devanagari font.
- **Layout:** generous spacing, clear section headings, consistent card components, max content width around 1100 to 1200 px on desktop.
- **Imagery:** only original or licensed photos of the real campus, with permission from anyone clearly identifiable. No stock photos presented as the campus.
- **Components to build once and reuse:** header, footer, notice list, card, page header with breadcrumb, data table, form field set, button, alert.

### Lessons from the reference site (what to do differently)

- Avoid duplicated menu entries and duplicate login links.
- Avoid dead placeholder links on course cards.
- Avoid cluttered footers with unrelated external links.
- Add what was missing: departments, fee structure, approvals and recognition documents, accessibility statement, "last updated" dates.
- Keep the good ideas: a clear notice banner, quick-access tiles, and a well-organized Committees section.

## 11. Suggested Technical Approach

The agent should confirm the stack with the owner. Recommended default:

- **Static-first site** using a modern static framework (for example Astro or Next.js with static export), plain CSS or Tailwind, no heavy UI libraries.
- **Content in Markdown/JSON** under a `/content` folder: `notices/`, `faculty/`, `courses/`, `committees/`, `pages/`.
- **Forms** via a small serverless function or a form service, with email delivery and spam protection.
- **Hosting** on a free or low-cost static host with HTTPS and a custom domain.
- **Repository layout:** `/src/components`, `/src/pages`, `/content`, `/public/docs` (PDFs), `/public/images`.

If the owner prefers a no-code route (for example a hosted site builder), the same IA, content model, and checklist still apply.

## 12. Content Model

- **Notice:** `title`, `date`, `category`, `summary`, `attachmentUrl`, `published`.
- **Faculty:** `name`, `designation`, `department`, `qualification`, `photo`, `email` (optional), `order`.
- **Course:** `name`, `duration`, `eligibility`, `intake`, `subjects[]`, `syllabusUrl`, `feeSummary`.
- **Committee:** `name`, `purpose`, `members[] {name, role, contact}`, `procedure`, `documentUrl`, `updatedAt`.
- **Event / Gallery item:** `title`, `date`, `images[] {src, alt, caption}`.
- **Document:** `title`, `type`, `fileUrl`, `updatedAt`.

## 13. Rules for the Build Agent

1. **Never invent facts.** If a detail (affiliation number, fees, member names, dates, approvals) is not supplied, render a clearly marked `[PLACEHOLDER]` and list it in the open-items report. Do not fabricate officials, numbers, or certificates.
2. **Do not copy** text, images, or code from the reference site or any third party. Write original copy in a neutral institutional tone.
3. **Build in this order:** content model and sitemap, global layout and components, Home, Admissions and Courses, Committees and Disclosures, Notices, Faculty, Gallery, Contact, SEO and accessibility pass, performance pass.
4. **After each milestone,** run a link check, an accessibility check, and a mobile viewport check, and report results.
5. **Keep a running `OPEN_ITEMS.md`** listing every placeholder and missing document, grouped by owner (college office, management, developer).
6. **Ask before** adding dependencies beyond the agreed stack, collecting any new personal data, or adding third-party scripts.
7. **No unverifiable marketing claims** (scholarships, free devices, rankings, placement percentages) unless the owner provides written confirmation and the date it applies.

## 14. Milestones

| Phase | Deliverable | Done when |
| --- | --- | --- |
| 0. Discovery | Confirm mandatory list, collect content and documents | Disclosure checklist signed off by the college |
| 1. Foundation | Repo, design tokens, layout, components | Header/footer and one sample page render on mobile |
| 2. Core pages | Home, About, Courses, Admissions, Contact | All linked, no placeholders except flagged items |
| 3. Compliance pages | Committees, policies, approvals, RTI, fees | Every checklist row is Provided or flagged |
| 4. Dynamic content | Notices, events, gallery, faculty, enquiry form | Admin can publish a notice end to end |
| 5. Quality | SEO, accessibility, performance, security pass | Meets section 4 success criteria |
| 6. Launch | Domain, HTTPS, analytics (optional), monitoring | Site live and verified on real phones |

## 15. Acceptance Criteria (launch gate)

- [ ] All pages in section 5 exist and are reachable from navigation.
- [ ] Every item in section 6 is Provided or has a documented reason.
- [ ] Zero broken internal links; external links open correctly.
- [ ] Enquiry form delivers email and shows success and error states.
- [ ] Lighthouse targets met on mobile for Home, Admissions, and one Committee page.
- [ ] Keyboard-only navigation works; images have alt text; contrast passes.
- [ ] Privacy policy and terms published and linked in the footer.
- [ ] Each committee page shows a last-updated date.
- [ ] College representative has reviewed and approved the content.
- [ ] Backups and an owner-controlled admin login are in place.

## 16. Open Questions for the College

1. Which exact document or checklist defines the legal requirement for this website?
2. Official college name, address, college code, and affiliation details?
3. Which courses and subject combinations are offered, with intake and fees?
4. Names, roles, and contact details for management, principal, and each committee?
5. Does the college already own a domain, and who manages it?
6. Who will maintain notices after launch?
7. Is a Hindi version required?
8. Are there logo, brand colours, and campus photos available, and are permissions in place for people shown?
9. Is a student or staff login actually required in v1, or only linked externally?

## 17. Risks

| Risk | Mitigation |
| --- | --- |
| Missing or late documents delay launch | Track in `OPEN_ITEMS.md`, escalate weekly |
| Inaccurate or unverifiable claims on a compliance site | Source every factual statement; owner review before publish |
| Site becomes stale after launch | "Last updated" dates, named maintainer, simple admin workflow |
| Copying from the reference causes legal or credibility issues | Original content and assets only (agent rule 2) |
| Heavy pages on slow rural networks | Performance budget and image optimization |
