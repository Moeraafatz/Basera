# Phase 11: Advanced AI Features & Performance

## Objective
Implement response streaming, media generation, code generation enhancements, response caching, performance optimization, and PWA support.

## Context
- **Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Supabase, Zustand
- **Auth & Monetization:** Complete (Phase 9-10)
- **Current AI:** Text-only, non-streaming, multi-provider fallback
- **Performance:** No caching, no PWA, standard Next.js build

## Constraints
- Streaming must work with all existing providers (OpenRouter, Google, Groq, Cerebras, DeepSeek, Pollinations)
- Image/Video generation uses existing provider fallback pattern
- Caching must respect user quotas and subscription tiers
- PWA must support Arabic RTL layout
- All features must be bilingual (ar/en)

## Invariants
- Streaming responses must be logged to usage_logs
- Cached responses must not count against quota
- Media generation must respect tier limits
- PWA must work offline for cached content
- All new API routes must validate auth session

---

## Step 1: Response Streaming Infrastructure

**Context Brief:**
Implement streaming for all AI text generation endpoints using Next.js streaming responses.

**Tasks:**
1. Create `src/lib/streaming.ts` with provider-agnostic streaming wrapper
2. Update `api/generate/route.ts` to support streaming via `Accept: text/event-stream` header
3. Update `api/cv/analyze/route.ts` and `api/cv/enhance/route.ts` for streaming
4. Create `useStreamingCompletion` hook in `src/hooks/use-streaming.ts`
5. Update text generation UI to show streaming tokens
6. Add streaming toggle in settings

**Verification:**
```bash
npm run build
npm run dev
# Test: Generate text, verify tokens appear incrementally
# Test: Verify streaming works with all providers
```

**Exit Criteria:**
- Streaming responses work for all text endpoints
- UI shows tokens as they arrive
- Fallback to non-streaming if provider doesn't support it
- Usage logged correctly for streaming responses

**Dependencies:** None

**Model Tier:** Default

---

## Step 2: Image Generation Integration

**Context Brief:**
Integrate actual image generation using Pollinations.ai (free) and Fal.ai (premium) with provider fallback.

**Tasks:**
1. Create `src/lib/image-service.ts` with Pollinations and Fal.ai integration
2. Update `api/image/generate/route.ts` to return actual images
3. Create image gallery component with download/export
4. Add image style presets (photorealistic, illustration, 3D, anime, etc.)
5. Update image prompt page to show generated results
6. Add image generation to usage tracking

**Verification:**
```bash
npm run build
npm run dev
# Test: Generate images with different styles
# Test: Verify images download correctly
# Test: Verify usage tracking counts image generations
```

**Exit Criteria:**
- Images generated and displayed correctly
- Style presets work as expected
- Download/export functionality works
- Usage tracked per tier limits

**Dependencies:** Step 1 (streaming infrastructure for status updates)

**Model Tier:** Default

---

## Step 3: Video Generation Integration

**Context Brief:**
Integrate video generation using Pollinations.ai and Fal.ai with prompt-to-video pipeline.

**Tasks:**
1. Create `src/lib/video-service.ts` with video generation providers
2. Update `api/video/generate/route.ts` for actual video output
3. Create video preview component with playback controls
4. Add video duration and style options
5. Update video prompt page to show generated results
6. Add video generation to usage tracking

**Verification:**
```bash
npm run build
npm run dev
# Test: Generate videos with different durations
# Test: Verify video playback works
# Test: Verify usage tracking
```

**Exit Criteria:**
- Videos generated and playable
- Duration/style options work
- Usage tracked per tier limits

**Dependencies:** Step 2 (image generation patterns)

**Model Tier:** Default

---

## Step 4: Response Caching with Redis

**Context Brief:**
Implement response caching to reduce API costs for repeated prompts using Upstash Redis.

**Tasks:**
1. Add `@upstash/redis` package
2. Create `src/lib/cache.ts` with Redis client and caching utilities
3. Update existing API routes to check cache before calling AI
4. Add cache invalidation on prompt edit/version change
5. Create cache management UI in admin panel
6. Add cache hit/miss metrics to `/api/metrics`

**Verification:**
```bash
npm run build
npm run dev
# Test: Same prompt returns cached response
# Test: Cache invalidation works on edit
# Test: Metrics show cache hit rate
```

**Exit Criteria:**
- Repeated prompts return cached responses
- Cache invalidation works correctly
- Admin panel shows cache stats
- Metrics endpoint includes cache data

**Dependencies:** Step 1 (streaming - cache streaming responses differently)

**Model Tier:** Default

---

## Step 5: Code Generation Enhancement

**Context Brief:**
Enhance code generation with syntax highlighting, preview, copy-to-clipboard, and code execution sandbox.

**Tasks:**
1. Add `prismjs` or `shiki` for syntax highlighting
2. Create `CodeBlock` component with copy button and language detection
3. Create `CodePreview` component with live preview for HTML/CSS/JS
4. Add code execution sandbox using WebContainers or iframe
5. Update `api/code/generate/route.ts` for streaming code output
6. Add code export options (download as file, copy to clipboard)

**Verification:**
```bash
npm run build
npm run dev
# Test: Generate code, verify syntax highlighting
# Test: Copy button works
# Test: Preview renders HTML/CSS/JS correctly
```

**Exit Criteria:**
- Code displayed with syntax highlighting
- Copy-to-clipboard works
- Preview renders correctly for web languages
- Export options work

**Dependencies:** Step 1 (streaming for code generation)

**Model Tier:** Default

---

## Step 6: PWA Support

**Context Brief:**
Add Progressive Web App support for offline access and install prompt.

**Tasks:**
1. Add `next-pwa` package
2. Create `public/manifest.json` with app metadata
3. Create `public/sw.js` service worker with caching strategies
4. Add install prompt component
5. Configure offline fallback pages
6. Test PWA installation on mobile/desktop

**Verification:**
```bash
npm run build
npm run start
# Test: Lighthouse PWA audit passes
# Test: Install prompt appears
# Test: App works offline for cached content
```

**Exit Criteria:**
- Lighthouse PWA score > 90
- Install prompt works on supported browsers
- Offline fallback pages load correctly
- Arabic RTL layout preserved in PWA mode

**Dependencies:** None (can run in parallel with other steps)

**Model Tier:** Default

---

## Step 7: Performance Optimization

**Context Brief:**
Optimize bundle size, add edge functions, and improve Core Web Vitals.

**Tasks:**
1. Analyze bundle with `@next/bundle-analyzer`
2. Move eligible API routes to Edge runtime
3. Optimize image loading with `next/image`
4. Add font optimization with `next/font`
5. Implement route prefetching for navigation
6. Add compression middleware for API responses

**Verification:**
```bash
npm run build
# Analyze bundle size reduction
# Run Lighthouse performance audit
# Test: Edge routes respond faster
```

**Exit Criteria:**
- Bundle size reduced by 20%+
- Core Web Vitals pass (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- Edge routes deployed and functional
- Lighthouse performance score > 90

**Dependencies:** Step 6 (PWA - some optimizations overlap)

**Model Tier:** Default

---

## Step 8: Testing & Verification

**Context Brief:**
Comprehensive testing of all Phase 11 features.

**Tasks:**
1. Test streaming with all providers
2. Test image/video generation end-to-end
3. Test caching hit/miss scenarios
4. Test code generation with preview
5. Test PWA installation and offline mode
6. Run Lighthouse audits for performance
7. Test mobile responsiveness on all new features
8. Run `npm run build` and `npm run lint`

**Verification:**
```bash
npm run build
npm run lint
npm run dev
# Execute all test scenarios
```

**Exit Criteria:**
- All features work as expected
- Build succeeds with no errors
- Lint passes (no new errors)
- Lighthouse scores pass thresholds
- Mobile responsive on all new pages

**Dependencies:** Steps 1-7 complete

**Model Tier:** Default

---

## Dependency Graph

```
Step 1 (Streaming)
  ├── Step 2 (Image Generation)
  │     └── Step 3 (Video Generation)
  ├── Step 4 (Caching)
  └── Step 5 (Code Generation)

Step 6 (PWA) ──┐
               ├── Step 7 (Performance)
Step 1 (Streaming) ──┘

Step 8 (Testing) [all steps]
```

## Parallel Opportunities
- Steps 2 and 4 can run in parallel (both depend only on Step 1)
- Step 6 (PWA) can run in parallel with all other steps
- Steps 5 and 7 can run in parallel

## Rollback Strategy
- Streaming can be disabled via feature flag
- Image/video providers can fall back to prompt-only mode
- Caching can be disabled by clearing Redis
- PWA can be disabled by removing service worker registration
- Performance optimizations are incremental and safe

## Anti-Patterns to Avoid
- ❌ Streaming without proper error handling
- ❌ Caching responses that contain user-specific data
- ❌ Blocking UI while waiting for image/video generation
- ❌ Storing API keys in client-side code
- ❌ PWA caching dynamic content that should be fresh
- ❌ Over-optimizing before measuring baseline performance
- ❌ Not logging streaming usage correctly
