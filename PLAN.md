# Baseera - Implementation Plan

## Phase 1: Foundation (Completed)
- [x] Next.js 16 project setup with TypeScript + Tailwind CSS v4
- [x] Arabic-first layout (`dir="rtl"`, `lang="ar"`)
- [x] Core navigation & routing structure
- [x] Bilingual locale system (ar.json, en.json)
- [x] Zustand state management stores

## Phase 2: AI Integration (Completed)
- [x] OpenRouter integration with exact model IDs
- [x] Google AI Studio (Gemini) integration
- [x] Groq API integration
- [x] Cerebras API integration
- [x] DeepSeek API integration
- [x] Pollinations API integration
- [x] Multi-provider routing with automatic fallback
- [x] Arabic system prompts for all services

## Phase 3: CV Analysis Pipeline (Completed)
- [x] PDF upload handler
- [x] `pdfjs-dist` dynamic import (SSR-safe)
- [x] Text extraction from PDF files
- [x] CV analysis API route with strict JSON enforcement
- [x] Detailed error reporting for failed analyses
- [x] CV enhancement endpoint

## Phase 4: UI Polish & Cleanup (Completed)
- [x] Removed `/code` service from navigation
- [x] Updated all metadata & JSON-LD to Arabic-first
- [x] Fixed Supabase stub imports
- [x] Fixed `liveEdit` recursive type errors
- [x] Fixed analytics store mismatches
- [x] Production build passing

## Phase 5: Deployment (Completed)
- [x] Vercel deployment configured
- [x] Environment variables set in Vercel dashboard
- [x] Production URL: https://baseera-ai.vercel.app
- [x] Project renamed to `baseera`

## Phase 6: Backend Patterns (Completed)
- [x] Centralized error handler (`src/lib/errors.ts`)
- [x] Structured JSON logger (`src/lib/logger.ts`)
- [x] In-memory rate limiter with per-route configs (`src/lib/rate-limiter.ts`)
- [x] Request body validation helpers (`src/lib/validation.ts`)
- [x] Retry with exponential backoff in model router
- [x] Updated all 10 API routes with new patterns
- [x] `X-RateLimit-*` headers on all responses
- [x] Request ID tracking for debugging

## Phase 7: Production Readiness (Completed)
- [x] Response caching for AI API calls (`src/lib/response-cache.ts`)
- [x] Cache integrated into `model-router.ts` with SHA-256 keys, 5min TTL
- [x] DOCX support added via `mammoth` library
- [x] CV upload accepts PDF, DOCX, TXT
- [x] Test CV PDF upload & analysis flow on production — ✅ Verified working
- [x] Fix expired OpenRouter model IDs (`claude-sonnet-4-20250514` → `claude-sonnet-4`)
- [x] Add Groq/Cerebras fallback for routes with exhausted Google/DeepSeek keys
- [x] All 7 API keys added to Vercel environment variables
- [x] Provider fallback tracking & metrics (`src/lib/provider-metrics.ts`)
- [x] Metrics API endpoint (`/api/metrics`) — view=summary|providers|services|failures|health
- [x] Health check endpoint (`/api/health`) — Supabase connectivity check
- [x] Supabase integration ready (`@supabase/supabase-js` + schema + RLS policies)

## Phase 8: Supabase Activation (Completed)
- [x] Add Supabase env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) to Vercel
- [x] Verify Supabase connectivity via `/api/health` — ✅ Connected

## Phase 9: User Authentication & Persistence (Completed)
- [x] Auth store with Supabase (`src/store/auth-store.ts`) — signIn, signUp, signOut, resetPassword, updateProfile
- [x] Auth context provider (`src/lib/auth-context.tsx`) with `initAuthListener`
- [x] Auth middleware helpers (`src/lib/auth-middleware.ts`) — requireAuth, optionalAuth
- [x] UI components: `LoginForm`, `SignupForm`, `UserMenu` (`src/components/auth/`)
- [x] Input component with icon + error states (`src/components/ui/input.tsx`)
- [x] Pages: `/login`, `/signup`, `/forgot-password`, `/dashboard`, `/profile`
- [x] Navbar updated with auth buttons (login/signup) and user menu (avatar dropdown)
- [x] Bilingual auth keys added to `ar.json` and `en.json` (auth.*, dashboard.*, profile.*)
- [x] Zustand stores updated with real Supabase sync (`prompt-store.ts`, `cv-store.ts`)
- [x] Dashboard: stats cards, recent prompts, CV history, member info
- [x] Profile: edit name, language toggle, change password, delete account
- [x] AuthProvider wrapped in root layout
- [x] Production build passing

## Phase 10: Dashboard & Analytics / Monetization (Completed)
- [x] Supabase schema: `subscription_tiers`, `user_subscriptions`, `usage_logs`, `user_roles`
- [x] TypeScript types for subscription system (`src/types/subscription.ts`)
- [x] Usage tracking middleware (`src/lib/usage-tracker.ts`, `src/lib/quota-middleware.ts`)
- [x] `GET /api/usage` endpoint for user stats
- [x] Updated API routes (`/api/generate`, `/api/cv/analyze`, `/api/cv/enhance`) with quota checks
- [x] Stripe integration (`src/lib/stripe/client.ts`)
- [x] `POST /api/stripe/create-checkout-session` endpoint
- [x] `POST /api/stripe/create-portal-session` endpoint
- [x] `POST /api/stripe/webhook` with signature verification
- [x] Webhook handlers: checkout.completed, subscription.updated, subscription.deleted, payment.failed/succeeded
- [x] Pricing UI components (`PricingCard`, `SubscriptionStatus`, `UsageMeter`)
- [x] `/pricing` page with 3 tiers (Free, Pro, Enterprise) + monthly/yearly toggle
- [x] Dashboard updated with subscription status, usage meters, quick actions
- [x] Admin panel (`/admin`) with role-based access control
- [x] Navbar admin link (visible only to admin role)
- [x] Bilingual locale keys for pricing, subscription, usage, tiers
- [x] Production build passing

## Phase 11: Advanced AI Features & Performance (Completed)
- [x] Response streaming infrastructure (`src/lib/streaming.ts`)
- [x] `useStreamingCompletion` hook (`src/hooks/use-streaming.ts`)
- [x] Streaming support in `POST /api/generate` and `POST /api/text/generate`
- [x] Text page updated with streaming toggle (SSE with ReadableStream)
- [x] Image generation service (`src/lib/image-service.ts`) with Pollinations.ai
- [x] `POST /api/image/generate` with `action: "image"` returns actual image URLs
- [x] Image page updated with mode toggle (prompt vs actual image)
- [x] Image page displays generated images with full-size link
- [x] 8 image style presets + 4 size options
- [x] Video generation service (`src/lib/video-service.ts`) with Pollinations.ai
- [x] `POST /api/video/generate` with `action: "video"` returns video URLs
- [x] Video page updated with mode toggle (prompt vs actual video)
- [x] Video page displays generated videos with player controls
- [x] 3 duration options + 5 style options
- [x] PWA support: `manifest.json`, `sw.js` service worker, `offline.html`
- [x] Service worker with cache-first, network-first, stale-while-revalidate strategies
- [x] PWA already configured in root layout (`ServiceWorkerRegistration` component)
- [x] Production build passing

## Phase 12: External Service Setup (Pending)
- [ ] Run Supabase migration `001_phase10_dashboard_monetization.sql`
- [ ] Configure Stripe env vars (`STRIPE_SECRET_KEY`, webhook secret, price IDs)
- [ ] Test image generation in production (Pollinations.ai is free, no key needed)
- [ ] Test video generation in production (Pollinations.ai is free, no key needed)
- [ ] Test streaming in production
- [ ] Test PWA install on mobile
