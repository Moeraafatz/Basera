# بصيرة UI Enhancement Plan — "Refined Insight"

**Design Direction**: Minimal, editorial aesthetic where Arabian culture whispers through structural geometry and typographic rhythm — never shouts. The new calligraphic logo is the design anchor.

**Status**: `Phase 3 COMPLETE`
**Last Updated**: 2026-05-16

---

## How to Use This Plan

- Each phase has a **checklist** of tasks. Mark tasks `[x]` when complete.
- A phase is **done** when ALL its tasks are checked.
- **Pause/resume**: The AI reads this file to know exactly where we left off.
- **Phase gate**: Do NOT start the next phase until the current one is 100% complete and approved.
- Update `Status` at the top when a phase completes: `Phase 1 COMPLETE`, `Phase 2 IN PROGRESS`, etc.

---

## Phase 1: Typography & Font System

**Goal**: Establish a distinctive typographic hierarchy that echoes Arabic calligraphic warmth.

### Tasks

- [x] **1.1** Add `Amiri` as display font in `src/app/layout.tsx`
  - Keep `IBM Plex Sans Arabic` for body text
  - Use display font only for brand name "بصيرة" in hero sections and page titles
  - Variable assignment: `--font-display-arabic`
- [x] **1.2** Update typographic scale in `src/app/globals.css`
  - Hero titles: `font-bold` (700) for brand, `font-light` (300) for taglines
  - Section headers: `font-semibold` (600) with generous letter-spacing
  - Body: `font-normal` (400) with line-height 1.75 for Arabic
- [x] **1.3** Apply display font to homepage hero "بصيرة" heading in `src/app/page.tsx`
- [x] **1.4** Apply display font to tool page headings in `src/app/text/page.tsx`, `src/app/cv/page.tsx`, `src/app/image/page.tsx`, `src/app/video/page.tsx`
- [x] **1.5** Verify font loads correctly in both light and dark mode
- [x] **1.6** Verify font renders correctly in both Arabic (RTL) and English (LTR) modes

### Acceptance Criteria
- [x] Display font is visible and distinct from body font on all pages
- [x] No layout shift (CLS) from font loading
- [x] Arabic text renders with proper calligraphic warmth
- [x] English text still uses Inter/IBM Plex Sans as before

**Phase 1 Status**: `COMPLETE`

---

## Phase 2: Subtle Arabian Geometric Motifs

**Goal**: Introduce cultural identity through structural geometry — diamond dots, corner brackets, wave dividers.

### Tasks

- [x] **2.1** Create `<DiamondDot />` component at `src/components/ui/diamond-dot.tsx`
  - SVG diamond shape (4x4px), reusable with size/color props
  - Used as: section separators, card corner accents, active nav indicator, loading animation
- [x] **2.2** Add diamond dot as active page indicator in navbar (`src/components/navbar.tsx`)
  - Replace `bg-secondary` active state with a small diamond dot below the link text
- [x] **2.3** Add corner bracket accents to tool cards
  - CSS `::before`/`::after` pseudo-elements — thin 1px lines, 12px long, top-right and bottom-left
  - Hover: brackets animate inward by 4px
- [x] **2.4** Create `<WaveDivider />` component at `src/components/ui/wave-divider.tsx`
  - Gentle SVG wave inspired by the sweep of the letter "ص" in the logo
  - Used between major homepage sections only (not on tool pages)
- [x] **2.5** Add subtle geometric background pattern to hero section
  - 8-point star or interlocking diamond pattern at 2-3% opacity
  - CSS-only, no extra DOM nodes
- [x] **2.6** Create diamond-dot loading animation (4 diamonds pulsing in sequence)
  - Replace standard spinner on generate buttons
  - Echoes the four nuqat (dots) in the logo

### Acceptance Criteria
- [x] Diamond dot component renders at multiple sizes without distortion
- [x] Corner brackets appear on all tool cards and animate on hover
- [x] Wave divider is visible but subtle between homepage sections
- [x] Geometric pattern is barely noticeable — adds atmosphere, not distraction
- [x] Loading animation is smooth and recognizable as the brand motif

**Phase 2 Status**: `COMPLETE`

---

## Phase 3: Color & Atmosphere Refinement

**Goal**: Deepen the color story and add tactile atmosphere (grain, gradient mesh, warm dark mode).

### Tasks

- [x] **3.1** Add deep warm black (`#0D0D0C`) to dark mode background in `src/app/globals.css`
- [x] **3.2** Add golden accent color (`#C4956A`) for hover states and active indicators
  - Use as `--color-gold` CSS variable, exposed via Tailwind theme
- [x] **3.3** Add paper grain texture overlay to card backgrounds (light mode only)
  - CSS `background-image` with inline SVG noise filter
  - Opacity ~0.03 — tactile, manuscript-like feel
- [x] **3.4** Replace simple hero gradients with radial gradient mesh
  - Three soft color stops: ivory → warm ivory → faint book-cloth glow
  - Apply to homepage, text page, CV page, image page, video page
- [x] **3.5** Add subtle inner shadow to card backgrounds for depth
  - CSS `box-shadow: inset` — very light, barely perceptible
- [x] **3.6** Verify all color changes work in both light and dark mode
- [x] **3.7** Verify golden accent doesn't clash with book-cloth (#CC785C)

### Acceptance Criteria
- [x] Dark mode background feels richer and warmer, not flat gray
- [x] Paper grain is visible only on close inspection — adds texture without noise
- [x] Gradient mesh creates depth without being obvious
- [x] Golden accent is used sparingly and harmonizes with existing palette
- [x] No color contrast accessibility issues (WCAG AA minimum)

**Phase 3 Status**: `COMPLETE`

---

## Phase 4: Component-Level Enhancements

**Goal**: Refine individual UI components with Arabian-inspired details.

### Tasks

- [ ] **4.1** Refine Navbar (`src/components/navbar.tsx`)
  - Replace standard border-bottom with hairline border + subtle shadow
  - Diamond dot as active page indicator (from Phase 2)
  - Subtle blur intensification on scroll
- [ ] **4.2** Redesign Logo component (`src/components/Logo.tsx`)
  - Replace generic "B" icon with new calligraphic "بصيرة" SVG
  - Two variants: `full` (wordmark + subtitle) and `icon` (wordmark only)
  - Used in navbar, footer, and favicon contexts
- [ ] **4.3** Refine Button component (`src/components/ui/button.tsx`)
  - Primary: solid with 8px corners (more precise than 12px)
  - Secondary: outlined with diamond dot prefix
  - Hover: subtle scale (1.02) + shadow elevation
  - Press: tactile animation
- [ ] **4.4** Refine Input/Textarea components
  - Subtle inner glow on focus (book-cloth at 10% opacity)
  - Double-line effect on focus — inspired by manuscript ruling lines
  - Placeholder fades with calligraphic ease (not linear)
- [ ] **4.5** Apply card redesign to all pages
  - Corner bracket accents (from Phase 2)
  - Hover: border color shift to book-cloth + brackets animate inward
  - Icon containers: outlined circles instead of gradient fills
  - Subtle inner shadow
- [ ] **4.6** Refine Footer (`src/components/footer.tsx`)
  - Matching refinements: corner brackets, diamond accents, refined typography

### Acceptance Criteria
- [ ] Navbar active state uses diamond dot, not background fill
- [ ] Logo displays the new calligraphic wordmark everywhere
- [ ] Buttons feel more refined and tactile
- [ ] Inputs have a distinctive focus state
- [ ] All cards across all pages have consistent corner bracket treatment
- [ ] Footer matches the refined aesthetic

**Phase 4 Status**: `NOT STARTED`

---

## Phase 5: Motion & Interaction

**Goal**: Replace standard animations with calligraphic-inspired easing and reveal patterns.

### Tasks

- [ ] **5.1** Add custom easing curves to `src/app/globals.css`
  - Entry: `cubic-bezier(0.22, 1, 0.36, 1)` — starts slow, accelerates like a pen stroke
  - Exit: `cubic-bezier(0.55, 0, 0.67, 0.19)` — decelerates like ink drying
  - Hover: `cubic-bezier(0.34, 1.56, 0.64, 1)` — slight overshoot like a flourish
- [ ] **5.2** Implement staggered reveal animations on homepage
  - 80ms delay between elements
  - Slide up 16px with fade
  - Diagonal reveal pattern (top-right to bottom-left in RTL) — mimics Arabic reading flow
- [ ] **5.3** Create `<PageTransition />` component at `src/components/page-transition.tsx`
  - Thin horizontal line (book-cloth) sweeps across top on navigation
  - Inspired by the horizontal baseline in Arabic calligraphy
  - Integrate with Next.js navigation events in `src/app/layout.tsx`
- [ ] **5.4** Apply calligraphic easings to all Framer Motion animations
  - Replace default easings in `src/app/page.tsx`, `src/app/text/page.tsx`, etc.
- [ ] **5.5** Add hover micro-interactions to all interactive elements
  - Cards, buttons, nav links, tool icons
  - Use the hover easing curve with slight overshoot

### Acceptance Criteria
- [ ] Homepage elements reveal with staggered, diagonal timing
- [ ] Page transition line is visible but subtle on navigation
- [ ] All animations feel more organic and calligraphic
- [ ] No janky or dropped frames (60fps on mid-range devices)
- [ ] Animations respect `prefers-reduced-motion`

**Phase 5 Status**: `NOT STARTED`

---

## Phase 6: Logo Integration & Animation

**Goal**: Make the new calligraphic logo the centerpiece of the brand experience.

### Tasks

- [ ] **6.1** Convert the new logo PNG to inline SVG
  - Trace the calligraphic "بصيرة" as SVG paths
  - Preserve the flowing curves and diamond dots exactly
  - Create both `full` and `icon` variants
- [ ] **6.2** Implement logo draw animation on homepage
  - SVG stroke animation — strokes appear sequentially like a calligrapher writing
  - Duration: 1.2s total, 100ms between strokes
  - Only on homepage, not on tool pages
- [ ] **6.3** Update favicon and app icons with new logo
  - `/favicon.ico`, `/apple-touch-icon.png`, `/icons/icon-192.png`, `/icons/icon-512.png`
- [ ] **6.4** Update OpenGraph image with new logo
  - `/og-image.png` — regenerate with new calligraphic logo
- [ ] **6.5** Add logo to manifest.json
  - Update PWA manifest with new logo references
- [ ] **6.6** Test logo at all sizes (navbar 36px, hero 72px, favicon 16px)

### Acceptance Criteria
- [ ] Logo SVG renders identically to the provided PNG at all sizes
- [ ] Draw animation is smooth and recognizable as calligraphic writing
- [ ] All icons and favicons display the new logo
- [ ] OpenGraph preview shows the new logo
- [ ] Logo is crisp and readable at favicon size (16px)

**Phase 6 Status**: `NOT STARTED`

---

## Phase 7: Dark Mode Enhancement

**Goal**: Make dark mode feel warm, layered, and premium — like reading by candlelight.

### Tasks

- [ ] **7.1** Update dark mode background to layered surfaces
  - Page: `#0D0D0C` (deep warm black)
  - Cards: `#1A1A18` (slightly lighter)
  - Inputs: `#262625` (existing slate-800)
- [ ] **7.2** Add warm undertone to dark mode
  - Very subtle warm cast on backgrounds — not pure gray
  - Use `#0D0D0C` instead of pure `#000000`
- [ ] **7.3** Add accent glow to interactive elements in dark mode
  - Book-cloth glow on hover for buttons, links, cards
  - Very subtle — `box-shadow` with book-cloth at 15% opacity
- [ ] **7.4** Make diamond dots visible as decorative elements in dark mode
  - Subtle diamond accents on cards, dividers, section headers
  - Opacity ~0.3 — visible but not distracting
- [ ] **7.5** Refine dark mode typography
  - Ensure display font renders well in dark mode
  - Adjust text contrast for readability
- [ ] **7.6** Test all pages in dark mode
  - Homepage, text, CV, image, video, analytics
  - Verify no harsh contrasts or readability issues

### Acceptance Criteria
- [ ] Dark mode feels warm and layered, not flat
- [ ] Interactive elements have a subtle glow on hover
- [ ] Diamond dots add decorative interest without clutter
- [ ] All text is readable with proper contrast
- [ ] No visual regressions compared to light mode

**Phase 7 Status**: `NOT STARTED`

---

## Global Checklist

- [ ] All phases reviewed and approved
- [ ] Lint passes: `npm run lint`
- [ ] Build passes: `npm run build`
- [ ] Manual testing on desktop (Chrome, Safari, Firefox)
- [ ] Manual testing on mobile (iOS Safari, Android Chrome)
- [ ] RTL/LTR switching works correctly on all pages
- [ ] Dark/light mode switching works correctly on all pages
- [ ] No console errors or warnings
- [ ] Performance: Lighthouse score ≥ 90 on all metrics

---

## File Change Summary

| File | Action | Phase |
|------|--------|-------|
| `src/app/layout.tsx` | Modify | 1, 5 |
| `src/app/globals.css` | Modify | 1, 3, 5 |
| `src/app/page.tsx` | Modify | 1, 2, 4, 5, 6 |
| `src/components/Logo.tsx` | Replace | 4, 6 |
| `src/components/navbar.tsx` | Modify | 2, 4 |
| `src/components/footer.tsx` | Modify | 4 |
| `src/components/ui/diamond-dot.tsx` | New | 2 |
| `src/components/ui/wave-divider.tsx` | New | 2 |
| `src/components/ui/button.tsx` | Modify | 4 |
| `src/components/page-transition.tsx` | New | 5 |
| `src/app/text/page.tsx` | Modify | 1, 3, 4, 5 |
| `src/app/cv/page.tsx` | Modify | 1, 3, 4, 5 |
| `src/app/image/page.tsx` | Modify | 1, 3, 4, 5 |
| `src/app/video/page.tsx` | Modify | 1, 3, 4, 5 |
| `public/favicon.ico` | Replace | 6 |
| `public/apple-touch-icon.png` | Replace | 6 |
| `public/icons/icon-192.png` | Replace | 6 |
| `public/icons/icon-512.png` | Replace | 6 |
| `public/og-image.png` | Replace | 6 |
| `public/manifest.json` | Modify | 6 |

---

## What Stays the Same

- Color palette foundation: ivory, slate, book-cloth, kraft — all preserved
- Tailwind CSS v4 — no custom CSS framework introduced
- Arabic-first RTL — unchanged
- Component structure: Radix UI primitives preserved
- Framer Motion — kept for animations, just with new easing curves
- All functionality: zero changes to AI routing, API calls, or business logic
