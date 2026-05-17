# بصيرة (Baseera) — Implementation Plan

## Project Overview

**Rebrand:** AI Prompt Enhancer → **بصيرة (Baseera)**  
**Vision:** Arabic-first AI prompt engineering platform with GCC-specific CV optimization, live editing, analytics, and PWA support.  
**Domain:** baseera.vercel.app  
**Database:** Supabase (new account, migrate old data)  
**Workflow:** Phase-by-phase review and approval

---

## Color Palette (From Reference)

```css
--slate-dark: #191919      /* Deep backgrounds */
--slate-medium: #262625    /* Cards, sections */
--slate-light: #40403E     /* Borders */

--cloud-dark: #666663      /* Secondary text */
--cloud-medium: #91918D    /* Placeholder */
--cloud-light: #BFBFBA     /* Light borders */

--ivory-dark: #E5E4DF      /* Light backgrounds */
--ivory-medium: #F0F0EB    /* Card backgrounds */
--ivory-light: #FAFAF7     /* Main background */

--book-cloth: #CC785C      /* Primary accent (terracotta) */
--kraft: #D4A27F           /* Secondary accent */
--manilla: #EBDBBC         /* Tertiary accent */

--focus: #61AAF2           /* Focus states */
--error: #BF4D43           /* Error states */
```

---

## Typography

- **Arabic:** IBM Plex Sans Arabic (modern, highly legible)
- **English:** Inter (clean, professional)
- **Logo:** Custom SVG Arabic calligraphy (Kufic style for modern tech brand)

---

## Service Architecture

1. **بصيرة النصوص (Text Insight)** — Flagship service
2. **بصيرة السيرة الذاتية (CV Insight)** — New with full GCC optimization
3. **بصيرة الصور (Image Insight)** — Migrated from image-prompt
4. **بصيرة الفيديو (Video Insight)** — Migrated from veo3-prompt
5. **بصيرة الكود (Code Insight)** — New service
6. **لوحة التحليلات (Analytics Dashboard)** — New feature

---

## Implementation Phases

### Phase 1: Foundation & Rebranding
**Status:** ⏳ Pending approval

**Objective:** Establish new brand identity, design system, and project structure.

**Files to Modify:**
- `package.json` — Update name to "baseera"
- `src/app/globals.css` — Replace color tokens, add RTL support
- `src/app/layout.tsx` — Update fonts (IBM Plex Sans Arabic + Inter), metadata, BASE_URL
- `src/components/navbar.tsx` — Update nav links, brand name
- `src/components/footer.tsx` — Update branding
- `src/components/JsonLd.tsx` — Update organization name
- `src/app/page.tsx` — Update hero, tool cards, features
- `src/locales/ar.json` — Complete Arabic translations
- `src/locales/en.json` — Complete English translations
- `src/app/sitemap.ts` — Update routes
- `README.md` — Update documentation
- `AGENTS.md` — Update agent guide

**Files to Create:**
- `src/components/Logo.tsx` — SVG Arabic calligraphy logo component
- `public/icons/` — Favicon and app icons

**Verification:**
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Homepage displays with new colors and Arabic text
- [ ] RTL layout works correctly
- [ ] Navigation links point to new routes
- [ ] Logo renders correctly at all sizes

**Approval Checkpoint:** Review Phase 1 before proceeding to Phase 2.

---

### Phase 2: Core Text Service (بصيرة النصوص)
**Status:** ⏳ Pending approval

**Objective:** Rebuild text enhancement service with 2026 model guidelines and live editing.

**Files to Create:**
- `src/app/text/page.tsx` — New text service page
- `src/components/live-editor/InlineEditable.tsx` — Live editing component
- `src/lib/prompts/text-guidelines.ts` — 2026 prompt guidelines
- `src/app/api/generate/route.ts` — Updated API route

**Files to Modify:**
- `src/lib/model-router.ts` — Update with 2026 model names
- `src/store/prompt-store.ts` — Add live editing state

**Features:**
- Model-specific prompt structures (Claude XML, GPT-5 conversational, Gemini direct)
- Live editing: Click any section to modify inline
- Prompt versioning and history
- Export in multiple formats
- 2026 best practices (context engineering, few-shot examples, positive framing)

**Verification:**
- [ ] Text generation works with all providers
- [ ] Live editing saves changes correctly
- [ ] Prompt history persists across sessions
- [ ] Export functionality works
- [ ] Mobile responsive

**Approval Checkpoint:** Review Phase 2 before proceeding to Phase 3.

---

### Phase 3: CV Enhancer (بصيرة السيرة الذاتية)
**Status:** ⏳ Pending approval

**Objective:** Build comprehensive CV enhancement service with full GCC optimization.

**Files to Create:**
- `src/app/cv/page.tsx` — CV service page
- `src/store/cv-store.ts` — CV state management
- `src/data/gcc-countries.ts` — GCC country configurations
- `src/data/cv-templates.ts` — 18 CV template definitions
- `src/components/cv/ScoreDashboard.tsx` — Scoring dashboard
- `src/components/cv/ATSTemplate.tsx` — ATS template renderer
- `src/components/cv/GCCFields.tsx` — GCC-specific fields
- `src/components/cv/TemplateGallery.tsx` — Template selection
- `src/lib/cv-export.ts` — Export utilities (PDF, DOCX, TXT)
- `src/app/api/cv-analyze/route.ts` — CV analysis API
- `src/app/api/cv-enhance/route.ts` — CV enhancement API

**CV Templates (18 Total):**

**ATS-Safe Templates (8):**
1. Chronological Clean — Standard reverse-chronological
2. Hybrid Skills-First — Skills above experience
3. Executive Summary Lead — Senior roles
4. Technical Specialist — IT/Engineering
5. Healthcare Credential — Medical/Nursing
6. Finance Quantified — Banking/Accounting
7. Education Academic — Teaching/Research
8. Oil & Gas Compliance — Energy sector

**Visual Templates (6):**
9. Navy Accent Professional — Corporate/Finance
10. Minimalist Gray — Tech/Consulting
11. Gold Accent Executive — C-suite/Luxury
12. Two-Tone Modern — Creative/Marketing
13. Border Frame Classic — Government/Traditional
14. Timeline Visual — Project Management

**Industry-Specific (4):**
15. Engineering Project Portfolio — Civil/Mechanical/Electrical
16. Healthcare Clinical — Doctors/Nurses/Allied Health
17. Creative Portfolio Link — Design/Media/Architecture
18. GCC Standard — Universal Gulf format

**GCC-Specific Features:**
- Visa status field (Visit Visa, Transferable Iqama, NOC Available)
- Nationality field (required for all GCC states)
- Date of Birth (expected in GCC)
- Photo guidance (ATS vs human versions)
- Country-specific certifications (DHA, RERA, PMP, UPDA, SCFHS)
- Regional keywords ("GCC experience", "UAE market", "Vision 2030")
- Two-version export: ATS-safe + Visual
- Scoring Dashboard (0-100 composite score)
- Live editing for all CV sections
- Version management with history

**Verification:**
- [ ] CV upload and parsing works
- [ ] ATS scoring engine calculates correctly
- [ ] GCC fields display and save properly
- [ ] All 18 templates render correctly
- [ ] Export generates valid PDF/DOCX/TXT
- [ ] Live editing works for all sections
- [ ] Version management persists

**Approval Checkpoint:** Review Phase 3 before proceeding to Phase 4.

---

### Phase 4: Advanced Services
**Status:** ⏳ Pending approval

**Objective:** Migrate and enhance image/video services, add code service.

**Files to Create:**
- `src/app/image/page.tsx` — Image service page
- `src/app/video/page.tsx` — Video service page
- `src/app/code/page.tsx` — Code service page
- `src/app/api/image-prompt/route.ts` — Image prompt API
- `src/app/api/video-prompt/route.ts` — Video prompt API
- `src/app/api/code-prompt/route.ts` — Code prompt API

**Files to Modify:**
- `src/lib/model-router.ts` — Add image/video/code routing
- `src/lib/ai-service.ts` — Update service functions

**Features:**
- Image prompts for Imagen 4 Ultra, Flux 2 Pro, Ideogram v3, Seedream v5.0
- Video prompts for Seedance 2.0, Veo 3.1, Kling 3.0, Sora 2
- Code prompts for Claude Code, GPT-5.5 Codex, Gemini CLI
- Live editing for all services
- Style transfer from reference images
- Camera movement and composition guidance for video
- Context window optimization for code

**Verification:**
- [ ] Image prompt generation works
- [ ] Video prompt generation works
- [ ] Code prompt generation works
- [ ] Live editing works for all services
- [ ] Model routing selects correct providers
- [ ] Mobile responsive

**Approval Checkpoint:** Review Phase 4 before proceeding to Phase 5.

---

### Phase 5: Analytics Dashboard & Mobile
**Status:** ⏳ Pending approval

**Objective:** Add analytics tracking and PWA support.

**Files to Create:**
- `src/app/analytics/page.tsx` — Analytics dashboard
- `src/store/analytics-store.ts` — Analytics state management
- `public/manifest.json` — PWA manifest
- `public/sw.js` — Service worker
- `public/icons/icon-192.png` — PWA icon
- `public/icons/icon-512.png` — PWA icon

**Files to Modify:**
- `src/app/layout.tsx` — Add PWA metadata
- `src/components/navbar.tsx` — Add analytics link
- `src/app/page.tsx` — Add analytics card
- `src/app/globals.css` — Add mobile utilities

**Features:**
- Prompt usage tracking
- Model performance comparison
- Cost estimation
- A/B testing results
- PWA install prompt
- Offline caching
- Mobile-responsive design
- Touch-friendly interfaces

**Verification:**
- [ ] Analytics dashboard displays correctly
- [ ] Prompt tracking records usage
- [ ] Model comparison table works
- [ ] Cost estimation calculates correctly
- [ ] PWA manifest validates
- [ ] Service worker caches assets
- [ ] Mobile responsive at 375px, 414px, 390px
- [ ] Touch targets meet 44px minimum

**Approval Checkpoint:** Review Phase 5 before proceeding to Phase 6.

---

### Phase 6: Supabase Integration & Polish
**Status:** ⏳ Pending approval

**Objective:** Migrate to Supabase, finalize SEO, prepare for deployment.

**Files to Create:**
- `src/lib/supabase/client.ts` — Supabase client
- `src/lib/supabase/server.ts` — Supabase server utilities
- `src/lib/supabase/schema.sql` — Database schema
- `scripts/migrate-data.mjs` — Data migration script
- `scripts/verify-rebrand.mjs` — Verification script

**Files to Modify:**
- `src/store/prompt-store.ts` — Add Supabase persistence
- `src/store/cv-store.ts` — Add Supabase persistence
- `src/store/analytics-store.ts` — Add Supabase persistence
- `src/app/api/generate/route.ts` — Add analytics tracking
- `src/app/api/cv-analyze/route.ts` — Add analytics tracking
- `src/app/api/cv-enhance/route.ts` — Add analytics tracking
- `next.config.ts` — Add redirects for old routes

**Supabase Schema:**
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT UNIQUE,
  name TEXT,
  avatar_url TEXT
);

-- Prompts table
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  service TEXT NOT NULL,
  input TEXT NOT NULL,
  output TEXT NOT NULL,
  model TEXT NOT NULL,
  rating INTEGER,
  tokens_used INTEGER,
  cost_estimate DECIMAL(10, 4),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CVs table
CREATE TABLE cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  template_id TEXT NOT NULL,
  content JSONB NOT NULL,
  analysis JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Versions table
CREATE TABLE cv_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cv_id UUID REFERENCES cvs(id),
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Redirects:**
```typescript
// next.config.ts
async redirects() {
  return [
    { source: "/ai-prompt-generator", destination: "/text", permanent: true },
    { source: "/image-prompt", destination: "/image", permanent: true },
    { source: "/veo3-prompt", destination: "/video", permanent: true },
    { source: "/ai-humanizer", destination: "/text", permanent: true },
    { source: "/prompt-checker", destination: "/text", permanent: true },
    { source: "/image-to-prompt", destination: "/image", permanent: true },
    { source: "/ai-text-detector", destination: "/text", permanent: true },
    { source: "/prompt-library", destination: "/text", permanent: true },
  ];
}
```

**Verification:**
- [ ] Supabase client connects successfully
- [ ] Database schema creates all tables
- [ ] Data migration script runs without errors
- [ ] All stores persist to Supabase
- [ ] Analytics tracking records to database
- [ ] Redirects work for old routes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Production build tested locally

**Approval Checkpoint:** Review Phase 6 before deployment.

---

## File Structure (Final)

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts, providers
│   ├── page.tsx                # Homepage with 6 service cards
│   ├── globals.css             # Design system tokens
│   ├── text/page.tsx           # بصيرة النصوص
│   ├── cv/page.tsx             # بصيرة السيرة الذاتية
│   ├── image/page.tsx          # بصيرة الصور
│   ├── video/page.tsx          # بصيرة الفيديو
│   ├── code/page.tsx           # بصيرة الكود
│   ├── analytics/page.tsx      # لوحة التحليلات
│   └── api/
│       ├── generate/route.ts
│       ├── cv-analyze/route.ts
│       ├── cv-enhance/route.ts
│       ├── image-prompt/route.ts
│       ├── video-prompt/route.ts
│       └── code-prompt/route.ts
── components/
│   ├── Logo.tsx                # Arabic calligraphy logo
│   ├── navbar.tsx              # Updated navigation
│   ├── footer.tsx              # Updated branding
│   ├── language-switcher.tsx
│   ├── direction-loader.tsx
│   ├── CustomScrollbar.tsx
│   ├── JsonLd.tsx
│   ├── live-editor/
│   │   └── InlineEditable.tsx  # Live editing component
│   └── cv/
│       ├── ScoreDashboard.tsx
│       ├── ATSTemplate.tsx
│       ├── GCCFields.tsx
│       └── TemplateGallery.tsx
├── lib/
│   ├── i18n.tsx
│   ├── model-router.ts         # Updated 2026 models
│   ├── ai-service.ts
│   ├── utils.ts
│   ├── cv-export.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── schema.sql
│   └── prompts/
│       └── text-guidelines.ts
├── store/
│   ├── prompt-store.ts
│   ├── cv-store.ts
│   └── analytics-store.ts
├── data/
│   ├── prompt-library.ts
│   ├── gcc-countries.ts
│   └── cv-templates.ts
├── locales/
│   ├── ar.json                 # Complete Arabic translations
│   └── en.json                 # Complete English translations
└── public/
    ├── manifest.json           # PWA manifest
    ├── sw.js                   # Service worker
    └── icons/
        ├── icon-192.png
        └── icon-512.png
```

---

## Environment Variables

```bash
# Core AI Providers
GOOGLE_AI_STUDIO_KEY=AIzaSyD1jdYr07N02ArzISLxoaOEv5wAEUG1juk
GROQ_API_KEY=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
CEREBRAS_API_KEY=csk-xv8h2eymryp8hnpwmvk5mxh5kt5664k25ft8mmmfwr4wkfv9
DEEPSEEK_API_KEY=sk-900eb5be2e95462f9240139727fde6c9
POLLINATIONS_API_KEY=sk_MBDtHgc4GZWLcDZ68uwYG3NZqz9EYxml
POLLINATIONS_API_KEY_2=sk_dUQGeB834CLccgxAuPe7De2st0S0Z86U

# Supabase
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>

# App Configuration
NEXT_PUBLIC_SITE_URL=https://baseera.vercel.app
```

---

## Testing Strategy

**Manual Verification (No test framework):**
1. Visual regression: Run `npm run dev`, compare each page against design
2. RTL verification: Switch between ar/en, verify all layouts flip correctly
3. API testing: Test each endpoint with sample requests
4. Mobile testing: Chrome DevTools at 375px, 414px, 390px
5. PWA testing: Chrome Lighthouse PWA audit
6. ATS export test: Generate CV, verify ATS-parsable output
7. Live editing test: Test edit/save/cancel/refine on all services
8. GCC fields test: Verify all country-specific fields work correctly
9. Supabase integration test: Verify data persists correctly
10. Redirect test: Verify old routes redirect to new routes

---

## Deployment Checklist

- [ ] Create new Supabase project
- [ ] Run database schema migration
- [ ] Migrate old data using migration script
- [ ] Add all environment variables in Vercel dashboard
- [ ] Connect Git repository to Vercel
- [ ] Configure custom domain (baseera.vercel.app)
- [ ] Test production build locally
- [ ] Verify all API routes work in production
- [ ] Test PWA installation on mobile
- [ ] Verify analytics tracking works
- [ ] Set up error monitoring (Sentry/LogRocket)
- [ ] Test all redirects for old routes

---

## Success Metrics

1. **User Engagement:**
   - Average session duration > 5 minutes
   - Prompt generation rate > 10 per session
   - CV upload conversion rate > 30%

2. **Technical Performance:**
   - Lighthouse score > 90 (Performance, Accessibility, SEO, PWA)
   - First Contentful Paint < 1.5s
   - Time to Interactive < 3s

3. **Business Metrics:**
   - User retention rate > 40% (weekly)
   - CV enhancement usage > 25% of total users
   - Analytics dashboard adoption > 15% of users

---

## Workflow Instructions

1. **Start with Phase 1** — Foundation & Rebranding
2. **Complete all tasks** in the current phase
3. **Run verification checks** listed for the phase
4. **Wait for user approval** before proceeding
5. **Check this plan.md** for the next phase details
6. **Present next phase** to user for review
7. **Repeat** until all phases are complete

**Important:** Do not proceed to the next phase without explicit user approval.

---

## Notes

- **No deployment files in project** — Vercel handles deployment automatically
- **Supabase for database** — New account, migrate old data
- **Arabic-first design** — RTL by default, English technical elements
- **Live editing** — Roll out service by service (Text → CV → Image → Video → Code)
- **18 CV templates** — All created from scratch, ATS-compliant and GCC-optimized
- **Arabic calligraphy logo** — SVG-based, Kufic style for modern tech brand

---

*Last updated: 2026-05-15*
*Status: Plan created, awaiting Phase 1 approval*
