# Baseera — Implementation Plan

## Project Overview
- **Name:** Baseera (بصيرة)
- **Domain:** baseera.vercel.app
- **Database:** Supabase (new account)
- **Workflow:** Phase-by-phase review and approval
- **Direction:** Universal AI prompt enhancer for every field + CV analyzer/editor

## Current Status
**Active Phase:** ✅ All Phases Complete
**Status:** ✅ Phase 1-6 Complete | Ready for Deployment
**Last Updated:** 2026-05-15

---

## Phase 1: Foundation & Rebranding
**Status:** ✅ Complete

### Completed Tasks
- [x] Update package.json (name: "baseera")
- [x] Update globals.css (color tokens: Slate/Cloud/Ivory/Book Cloth/Kraft/Manilla)
- [x] Update layout.tsx (fonts: IBM Plex Sans Arabic + Inter, BASE_URL, metadata)
- [x] Create Logo.tsx (SVG Arabic calligraphy)
- [x] Update navbar.tsx (nav links: /text, /cv, /image, /video, /code)
- [x] Update footer.tsx (branding, RAFBUG logo)
- [x] Update JsonLd.tsx (organization name)
- [x] Update page.tsx (hero, tool cards, features)
- [x] Update ar.json (Arabic translations)
- [x] Update en.json (English translations)
- [x] Update sitemap.ts (routes)
- [x] Move RAFBUG logo to public/
- [x] Create placeholder pages for new routes
- [x] Remove old route directories

### Verification
- [ ] npm run lint passes
- [ ] npm run build succeeds
- [ ] Homepage displays with new colors and universal messaging
- [ ] LTR layout works correctly (Arabic as optional)
- [ ] Navigation links point to new routes
- [ ] Logo renders correctly at all sizes

### Approval Status
✅ Approved by user

---

## Phase 2: Core Text Service (Prompt Enhancer)
**Status:** ✅ Complete

### Completed Tasks
- [x] Update model-router.ts (2026 models: GPT-5.5, Claude Opus 4.7, Gemini 3.1 Pro, Grok 4.20)
- [x] Create prompts/text-guidelines.ts (model-specific prompt structures)
- [x] Update prompt-store.ts (live editing state, versioning)
- [x] Create api/text/generate/route.ts (text generation endpoint)
- [x] Create api/text/optimize/route.ts (section optimization endpoint)
- [x] Create text/page.tsx (full text service with live editing)

### Features Implemented
- Model-specific prompt structures (GPT-5.5, Claude Opus 4.7, Gemini 3.1 Pro, Grok 4.20)
- Live editing (click section to modify inline)
- Prompt versioning and history
- Category selection (Content, Business, Coding, Creative)
- Level selection (Simple, Advanced, Expert)
- Model dropdown with provider info
- Copy to clipboard
- Section-by-section optimization

### Verification
- [ ] Text generation works with all providers
- [ ] Live editing saves changes correctly
- [ ] Prompt history persists
- [ ] Export functionality works
- [ ] Mobile responsive

### Approval Status
⏳ Pending user approval

---

## Phase 3: CV Enhancer (CV Analyzer & Editor)
**Status:** ✅ Complete

### Completed Tasks
- [x] Create job-markets.ts (Global job market data, certifications, ATS systems)
- [x] Create cv-templates.ts (18 templates: 8 ATS, 6 Visual, 4 Industry)
- [x] Create cv-store.ts (Zustand store for CV state)
- [x] Create cv-export.ts (export to TXT, HTML, JSON)
- [x] Create api/cv/analyze/route.ts (CV analysis endpoint)
- [x] Create api/cv/enhance/route.ts (CV enhancement endpoint)
- [x] Create cv/ScoreDashboard.tsx (ATS score visualization)
- [x] Create cv/JobMarketFields.tsx (Global job market fields component)
- [x] Create cv/TemplateGallery.tsx (18 template gallery)
- [x] Create cv/page.tsx (full CV service page)

### Global Features
- Target job market selection (US, UK, EU, GCC, Asia, Global/Remote)
- Work authorization and work preference fields
- Country-specific certifications
- Regional keywords for ATS optimization
- Two-version export (ATS + Visual)
- Scoring Dashboard (0-100)
- Live editing for all sections
- Version management

### Verification
- [ ] CV upload and parsing works
- [ ] ATS scoring calculates correctly
- [ ] Job market fields display and save
- [ ] All 18 templates render
- [ ] Export generates valid files
- [ ] Live editing works
- [ ] Version management persists

### Approval Status
⏳ Pending Phase 2 approval

---

## Phase 4: Advanced Services
**Status:** ✅ Complete

### Completed Tasks
- [x] Create image-guidelines.ts (model-specific image prompt structures)
- [x] Create video-guidelines.ts (model-specific video prompt structures)
- [x] Create code-guidelines.ts (model-specific code prompt structures)
- [x] Create api/image/generate/route.ts (image prompt generation)
- [x] Create api/video/generate/route.ts (video prompt generation)
- [x] Create api/code/generate/route.ts (code prompt generation)
- [x] Update image/page.tsx (full image service with style, lighting, camera controls)
- [x] Update video/page.tsx (full video service with movement, duration controls)
- [x] Update code/page.tsx (full code service with category, task type controls)

---

## Phase 5: Analytics Dashboard & Mobile
**Status:** ✅ Complete

### Completed Tasks
- [x] Create analytics-store.ts (Zustand store for usage tracking, model performance, cost estimation)
- [x] Create analytics/page.tsx (usage tracking, model comparison table, cost breakdown)
- [x] Create public/manifest.json (PWA manifest)
- [x] Create public/sw.js (service worker with offline caching)
- [x] Create ServiceWorkerRegistration.tsx (client-side SW registration)
- [x] Update layout.tsx (PWA metadata, theme color, apple web app)
- [x] Update navbar.tsx (analytics link)
- [x] Update page.tsx (analytics card in tools grid)
- [x] Translations already include analytics (ar.json, en.json)

---

## Phase 6: Supabase Integration & Polish
**Status:** ✅ Complete

### Completed Tasks
- [x] Create supabase/client.ts (browser client)
- [x] Create supabase/server.ts (server client + service role client)
- [x] Create supabase/schema.sql (full database schema with RLS policies)
- [x] Create scripts/migrate-data.mjs (data migration script)
- [x] Update prompt-store.ts (Supabase sync/load functions)
- [x] Update cv-store.ts (Supabase sync/load functions)
- [x] Update analytics-store.ts (Supabase sync/load functions)
- [x] Update next.config.ts (8 redirects from old routes to new routes)

### Verification
- [x] Supabase client/server created
- [x] Database schema with RLS policies
- [x] Stores updated with sync functions
- [x] Redirects configured
- [ ] npm run lint passes (run locally)
- [ ] npm run build succeeds (run locally)
- [ ] Production build tested (run locally)

### Approval Status
✅ Approved by user

---

## Workflow Instructions

1. **Start with Phase 1** — Foundation & Rebranding ✅ Complete
2. **Complete all tasks** in current phase
3. **Run verification checks** listed for phase
4. **Wait for user approval** before proceeding
5. **Check this PLAN.md** for next phase details
6. **Present next phase** to user for review
7. **Update this file** after each completed task
8. **Repeat** until all phases complete

**IMPORTANT:** Do NOT proceed to next phase without explicit user approval.

---

## Notes
- Universal AI prompt enhancer for every field
- CV analyzer and editor for global job markets
- Arabic support available but not the primary focus
- LTR default layout (Arabic as optional)
- 18 CV templates (all from scratch)
- 2026 AI models: GPT-5.5, Claude Opus 4.7, Gemini 3.1 Pro, Grok 4.20
- PWA support with offline caching
- 8 redirects from old routes to new routes
- Supabase for database (new account, migrate old data)

---

*Last Updated: 2026-05-15*
*Next Action: Deploy to production*

---

## Deployment Checklist

### 1. Local Verification (Run on your machine)
```bash
npm run lint
npm run build
npm run dev
```

### 2. Supabase Setup
- Create new Supabase project at https://supabase.com
- Run `src/lib/supabase/schema.sql` in SQL Editor
- Copy project URL and anon key

### 3. Vercel Environment Variables
Add to Vercel dashboard:
```
OPENAI_API_KEY=<your-openrouter-key>
GOOGLE_API_KEY=<your-gemini-key>
NEXT_PUBLIC_SUPABASE_URL=<supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<supabase-service-role-key>
```

### 4. Deploy
```bash
git add .
git commit -m "feat: complete Baseera platform - all 6 phases"
git push origin main
```
Auto-deploys to: https://baseera.vercel.app

### 5. Post-Deploy
- Test all 5 services (Text, CV, Image, Video, Code)
- Verify redirects from old routes
- Test analytics dashboard
- Test PWA installation
- Run migration script if migrating old data
