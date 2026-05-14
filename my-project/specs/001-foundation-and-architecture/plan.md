# Implementation Plan: Foundation & Architecture

**Branch**: `001-foundation-and-architecture` | **Date**: 2026-05-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-foundation-and-architecture/spec.md`

## Summary

Build a `/foundation` Next.js page that documents the complete technical architecture of the AI Prompt Enhancer app. The page uses interactive tabs to separate concerns (Tech Stack, AI Integration, Components, API, State, Deployment, Constitution Check). Each tab contains collapsible sections with syntax-highlighted code blocks, file path click-to-copy, and real snippets from the codebase. A hybrid sync strategy keeps the page accurate: CI verification for factual elements + manual updates alongside PRs.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode) — existing codebase

**Primary Dependencies**: Next.js 16.2.6, React 19, Tailwind CSS v4, Framer Motion 12, Zustand 5, Radix UI, Sonner

**Storage**: N/A — documentation page, no data persistence required

**Testing**: No test framework configured — manual verification via browser

**Target Platform**: Web (desktop + mobile, mobile-first per Constitution Principle III)

**Project Type**: Single Next.js page (documentation/reference) — no API, no AI calls, no backend

**Performance Goals**: Page load < 2s on 3G, interactive within 500ms, no layout shift during collapse/expand

**Constraints**: Must use only existing dependencies; no new packages added; must align with all 5 constitution principles; automated CI verification required for factual accuracy

**Scale/Scope**: 1 page, ~7 sections (one per tab), 20-30 file references, auto-generated directory tree

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] All AI-powered features have local generation fallbacks (Principle II) — N/A: this feature is a documentation page, no AI calls
- [x] Output quality meets structured, professional standards — N/A: no generated AI output
- [x] No new feature ships with placeholder/templated output generators — PASS: content is real code snippets and factual descriptions from codebase
- [x] Mobile-first approach considered (Principle III) — PASS: page built mobile-first per existing convention, content readable on all viewports
- [x] No unnecessary dependencies or YAGNI additions (Principle V) — PASS: uses only existing components and Framer Motion already in the project
- [x] Performance constraints achievable (< 3s load, < 500ms interaction) — PASS: static documentation page, no external fetches, collapsible sections reduce initial render cost

**Gate Result: PASS — no violations**

## Project Structure

### Documentation (this feature)

```text
specs/001-foundation-and-architecture/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/          # Skipped (no external interfaces — documentation page, no API contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/app/
├── foundation/
│   ├── page.tsx         # The new Foundation & Architecture page

# No new source directories required — page is self-contained with inline tab UI
# All dependencies already present:
# - Framer Motion (existing)
# - Radix UI tabs/accordion (existing)
# - Existing component patterns reused
```

**Structure Decision**: Web application — single documentation page. No backend, no tests, no separate packages. The page lives in `src/app/foundation/page.tsx` using existing component patterns and dependencies.

## Complexity Tracking

> No complexity violations requiring justification. Feature is a single documentation page using existing framework conventions and existing dependencies. No new patterns introduced.

---

# Phase 0: Research

## Decision: Page Architecture Pattern

The foundation page is a Next.js App Router page at `/foundation`. It uses:

- **Tab navigation**: Radix UI Tabs pattern (reuse existing Select/Tabs component patterns from codebase)
- **Collapsible sections**: Framer Motion for smooth expand/collapse animations
- **Code blocks**: Syntax highlighting via `react-syntax-highlighter` or existing styling — check if already in project before adding
- **Directory tree**: Auto-generated from filesystem at build time via Node `fs` module reading `src/` directory

**Constraint**: `react-syntax-highlighter` is NOT in `package.json`. Use `<pre>` with existing `font-mono` classes + simple color token approach from Tailwind instead, to avoid new dependency (Principle V). If better highlighting is needed, it can be added separately.

**Finding**: The codebase already uses `framer-motion` for animations, `lucide-react` for icons, and standard Tailwind `font-mono` for code. The foundation page will follow the same patterns used in `/ai-prompt-generator`, `/image-prompt`, and `/prompt-checker` pages.

---

## Decision: Auto-generated Directory Tree

The directory tree (`FR-002`) will be generated at build time by a server component reading the `src/` directory via Node `fs`. This ensures the tree always reflects the actual codebase — no manual sync needed for file paths. The tree shows file names, descriptions extracted from file headers or inferred from context.

**Pattern**: `fs.readdirSync` in a server component at page load, rendered as a collapsible tree with click-to-copy paths.

---

## Decision: Interactive Tabs Structure

**Tabs**:
1. **Tech Stack** — Full dependency list with version numbers and rationale
2. **AI Integration** — OpenRouter + Gemini initialization, routing, fallback flow
3. **Components** — Component hierarchy tree, UI primitives → page components
4. **API Routes** — All `/api/` endpoints with contracts
5. **State Management** — Zustand store structure and data flow
6. **Deployment** — Commands, env vars, Vercel config
7. **Constitution Check** — Principle → Decision mapping

**Tab switching**: Radix UI Tabs (or simple state-based tabs matching existing Select patterns) — no new dependency.

---

## Decision: CI Sync Verification

The automated CI check (FR-012) will be a Node script that:
1. Reads `package.json` and extracts dependencies + versions
2. Reads `src/` directory structure with `fs`
3. Compares against the hardcoded values in the foundation page
4. Fails the build if any mismatch is found

This ensures factual drift is caught automatically without manual review.

---

## Decision: Real Code Snippets

All code examples in the page use actual file paths and real code from the codebase:
- `src/lib/ai-service.ts` — AI service layer
- `src/app/api/generate/route.ts` — API routes
- `src/store/` — Zustand store
- `src/components/ui/*.tsx` — UI components

No fictional examples, no placeholder syntax.

---

# Phase 1: Design & Contracts

## Data Model

The page itself has no data model — it reads from the filesystem and `package.json` at render time. The only entity is the **ArchitectureReference** which is the rendered view of:
- Dependency versions (from `package.json`)
- Directory structure (from `fs.readdir`)
- Component relationships (from source code analysis)

No persistence, no user input, no API calls.

## Contracts

No external interfaces. The page is read-only documentation. No contracts to define.

## Quickstart

For a contributor working on this project:
1. Navigate to `/foundation`
2. Read the section relevant to your task
3. Copy file paths with one click
4. Refer to real code for implementation details

No setup required beyond running `npm run dev`.

## Agent Context Update

The plan reference will be updated in `.github/copilot-instructions.md` between the SPECKIT markers pointing to `specs/001-foundation-and-architecture/plan.md`.