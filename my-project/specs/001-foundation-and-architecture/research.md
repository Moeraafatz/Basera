# Research: Foundation & Architecture Page

## Decision: Single Page Documentation Pattern

**Chosen**: Next.js App Router page at `/foundation` using client-side tab navigation with collapsible sections.

**Rationale**: The project already uses Next.js pages for all routes. Adding a documentation page here keeps it in the same paradigm contributors already work in. No separate docs site needed — the page is discoverable via navbar and directly importable/linked. The page reads filesystem data at render time, ensuring factual accuracy without manual maintenance of file lists.

**Alternatives Considered**:
- Separate docs site (e.g., Mintlify, VitePress) — rejected: adds deployment complexity and a second docs location to maintain, contrary to Principle V (Simplicity)
- Static markdown in repo — rejected: harder to discover, no interactive features, no auto-generated directory tree
- Existing landing page section — rejected: too much content for a single page, navigation to it would be buried

---

## Decision: No New Dependencies

**Chosen**: Use only existing packages — Framer Motion, standard Tailwind classes, Lucide icons, Radix UI patterns (Select/Tabs concepts from existing code).

**Rationale**: Principle V (Zero YAGNI) prohibits adding dependencies without justification. The page needs collapsible sections and tabs — both achievable with existing Framer Motion and state-based UI. Code highlighting uses `font-mono` + syntax token colors from Tailwind theme. Directory tree auto-generates from `fs`.

**Alternatives Considered**:
- `react-syntax-highlighter` — rejected: not in `package.json`, would require new install for a non-critical feature
- `docusaurus` or similar — rejected: massive scope creep, completely out of proportion for a single documentation page

---

## Decision: Interactive Tabs with 7 Sections

**Chosen**: 7-tab layout matching the spec requirements (Tech Stack, AI Integration, Components, API, State, Deployment, Constitution Check).

**Rationale**: Each section addresses a different audience concern (contributor vs. AI tool builder vs. DevOps). Tabs let readers focus on their layer without scrolling through irrelevant content. The Constitution Check tab is unique to this project — it ties every architectural decision back to a core principle, which is the point of the constitution.

**Alternatives Considered**:
- Single long page with anchor links — rejected: harder to scan, all content visible at once is overwhelming
- Accordion with all sections — rejected: less discoverable navigation between sections

---

## Decision: Auto-generated Directory Tree at Build Time

**Chosen**: Server component reads `src/` directory via Node `fs` at page render, generates tree with file names and inferred descriptions.

**Rationale**: FR-002 requires the tree to reflect actual codebase. Manual maintenance would violate FR-009 (must be verifiable against actual code). Auto-generation at build time ensures accuracy without runtime overhead — the tree is rendered as static HTML.

**Alternatives Considered**:
- Hardcoded tree — rejected: would drift from codebase immediately after first file change
- Build-time script generating static file — rejected: adds build complexity for marginal benefit; server component approach is simpler

---

## Decision: Hybrid Sync Strategy (Automated CI + Manual)

**Chosen**: CI script reads `package.json` and `src/` structure at build time to verify hardcoded values in the page match reality. Flags drift as build warning. Contributors update narrative sections alongside relevant PRs.

**Rationale**: Automation catches factual drift (wrong versions, missing files) without human effort. Narrative sections require human context. Quarterly review ensures low-frequency drift doesn't accumulate. This matches Option D from clarification Q2.

**Alternatives Considered**:
- Fully manual — rejected: constitution Principle I requires accuracy; manual processes degrade
- Fully automated (AI-generated content) — rejected: would produce generic descriptions without real rationale per FR-010

---

## Decision: Code Examples from Actual Source Files

**Chosen**: Every code snippet references a real file in `src/` with actual code. Examples include `src/lib/ai-service.ts` for AI layer, `src/app/api/generate/route.ts` for API, `src/app/ai-prompt-generator/page.tsx` for component patterns.

**Rationale**: FR-009 requires descriptions verifiable against actual code. FR-010 requires technology rationale, not just listing tools. Real snippets demonstrate exactly how the codebase works, not an approximation.

---

## Resolved Unknowns

All NEEDS CLARIFICATION markers resolved during planning:
- Page location → `/foundation` (clarification Q1)
- Sync strategy → Hybrid automated + manual (clarification Q2)
- Interaction model → Interactive tabs + collapsible sections (clarification Q3)
- No new dependencies (Principle V verification)
- No AI features in this page (Constitution Check pass)
- Directory tree auto-generated (no manual maintenance needed)