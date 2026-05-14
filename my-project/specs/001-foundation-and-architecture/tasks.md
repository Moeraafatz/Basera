# Tasks: Foundation & Architecture

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Generated**: 2026-05-14

## Status Overview

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 0 (Research) | ✅ Done | All decisions made, artifacts created |
| Phase 1 (Design & Contracts) | ⚠️ Partial | Page implemented; CI script not yet created |
| Phase 2 (Implementation) | 🔲 Not started | CI script, hardcoded tree note, full mobile test |

---

## Phase 1 Remaining

### Task 1.1 — Document hardcoded directory tree decision

**What**: Update `research.md` to note that the directory tree is hardcoded (not auto-generated via `fs.readdirSync`) because server component complexity wasn't justified for a single page. This is a documented deviation from the plan.

**Owner**: AI agent
**Estimate**: 5 min
**Acceptance**: `research.md` contains a note about the hardcoded vs auto-generated decision
**Status**: 🔲 Not started

---

### Task 1.2 — Create CI sync verification script

**What**: Create `scripts/verify-foundation.mjs` that reads `package.json` and `src/` structure, then compares against hardcoded values in `src/app/foundation/page.tsx`.

**Checks**:
- Dependency versions in page match `package.json`
- File paths in directory tree actually exist in `src/`
- API route patterns in page match files in `src/app/api/`
- Store field names in page match `src/store/prompt-store.ts`

**Fails**: Exits with code 1 + mismatch list on any drift
**Passes**: Silent success (or `--verbose` flag for output)

**Output**: `scripts/verify-foundation.mjs`
**Integration**: Add to `package.json` scripts as `"verify:foundation": "node scripts/verify-foundation.mjs"`
**Update lint script**: Include `verify:foundation` in the `lint` script chain so it runs on `npm run lint`

**Owner**: AI agent
**Estimate**: 45 min
**Acceptance**:
- Script runs without errors on current codebase
- Script correctly identifies a deliberate mismatch (test by temporarily changing a version in the page)
- Script exits 0 when page is accurate
- Script exits 1 with useful message when page has drift
**Status**: 🔲 Not started

---

## Phase 2

### Task 2.1 — Mobile viewport test

**What**: Open the `/foundation` page in mobile viewport (375px wide) and verify:
- All 7 tabs are accessible (horizontal scroll is acceptable per spec)
- Code blocks are readable without horizontal scrolling
- Directory tree doesn't break layout
- Collapsible sections work on touch

**Owner**: Human
**Estimate**: 10 min
**Acceptance**: Page readable and functional at 375px
**Status**: 🔲 Not started

---

### Task 2.2 — Constitution Check gate re-verification

**What**: Re-run the Constitution Check gate from plan.md line 33 after Phase 1 design decisions are finalized. Update the gate result with final decisions.

**Owner**: AI agent
**Estimate**: 10 min
**Acceptance**: Gate result updated with current decisions
**Status**: 🔲 Not started

---

## Completed

- [x] Phase 0 research — all decisions made
- [x] Data model defined
- [x] Quickstart written
- [x] Contracts documented (none needed)
- [x] Agent context updated
- [x] `/foundation/page.tsx` created with all 7 tabs
- [x] Task 1.2 — `scripts/verify-foundation.mjs` created and integrated into package.json
- [x] `/foundation` linked in navbar
- [x] All lint warnings in foundation page fixed
- [x] CI script verified: passes on accurate page, fails on deliberate mismatch, exits 1 with useful message