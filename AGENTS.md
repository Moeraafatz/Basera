# Baseera - AI Prompt Enhancement & CV Optimization Platform

## Project Type
Next.js 16.2.6 (Turbopack) + React 19 + TypeScript + Tailwind CSS v4

## Commands
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
npm run start    # Run production build
```

## Environment Variables (`.env.local`)
```
# AI Providers
OPENAI_API_KEY=<openrouter-key>
GOOGLE_API_KEY=<gemini-key>
GOOGLE_AI_STUDIO_KEY=<alternative-gemini-key>
GROQ_API_KEY=<groq-key>
CEREBRAS_API_KEY=<cerebras-key>
DEEPSEEK_API_KEY=<deepseek-key>
POLLINATIONS_API_KEY=<pollinations-key>

# Stripe (optional - for subscriptions)
STRIPE_SECRET_KEY=<stripe-secret>
STRIPE_PRO_MONTHLY_PRICE_ID=<price-id>
STRIPE_PRO_YEARLY_PRICE_ID=<price-id>
STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=<price-id>
STRIPE_ENTERPRISE_YEARLY_PRICE_ID=<price-id>

# Supabase (optional - for persistence)
NEXT_PUBLIC_SUPABASE_URL=<supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

## Key Directories
- `src/app/` - Next.js App Router pages
- `src/components/ui/` - Radix UI + Tailwind components
- `src/components/billing/` - Subscription UI components (SubscriptionStatus, UsageMeter)
- `src/lib/` - AI service integrations (OpenRouter, Gemini, Groq, Cerebras, DeepSeek, Pollinations)
- `src/lib/supabase/` - Supabase client, server, and schema
- `src/store/` - Zustand state management
- `src/data/` - Static prompt library data
- `src/locales/` - Bilingual translation files (ar.json, en.json)

## API Endpoints
- `POST /api/generate` - Prompt generation (text, image, video)
- `POST /api/cv/analyze` - CV analysis with ATS scoring
- `POST /api/cv/enhance` - CV enhancement
- `POST /api/text/generate` - Text generation
- `POST /api/text/optimize` - Text optimization
- `POST /api/humanize` - Humanize text
- `POST /api/image/generate` - Image generation
- `POST /api/video/generate` - Video prompt generation
- `POST /api/code/generate` - Code generation
- `POST /api/analyze-reference` - Reference analysis
- `POST /api/usage` - Usage tracking
- `GET /api/health` - Health check (Supabase connectivity)
- `GET /api/metrics` - Provider fallback metrics (view=summary|providers|services|failures|health)
- `POST /api/stripe/webhook` - Stripe webhook handler
- `POST /api/stripe/create-checkout-session` - Create Stripe checkout
- `POST /api/stripe/create-portal-session` - Create Stripe customer portal

## Framework Quirks
- Next.js 16 has breaking changes from earlier versions - check `node_modules/next/dist/docs/` for APIs
- Tailwind CSS v4 uses `@tailwindcss/postcss` - no `tailwind.config.js`
- ESLint v9 with flat config (`eslint.config.mjs`)
- No separate typecheck script - ESLint covers TypeScript
- `npm run verify` - Runs lint + foundation page verification (checks for drift in dependencies, file paths, API routes, store fields)

## Testing
- No test framework configured (no jest, vitest, or playwright)
- Manual testing via `npm run dev`

## Deployment
- Vercel: https://baseera-ai.vercel.app
- Project: `moeraafatz-5168s-projects/baseera`
- Auto-deploys on push to main branch
- Add environment variables in Vercel dashboard

## Architecture Notes
- Arabic-first UI with RTL layout (`dir="rtl"`, `lang="ar"`)
- Multi-provider AI routing with automatic fallback (OpenRouter → Google → Groq → Cerebras → DeepSeek → Pollinations)
- PDF text extraction via `pdfjs-dist` (dynamically imported to prevent SSR crashes)
- Supabase integration ready (env vars required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
- Provider fallback metrics tracked in-memory (`src/lib/provider-metrics.ts`)
- Response caching with SHA-256 keys, 5min TTL (`src/lib/response-cache.ts`)
- Language persistence via localStorage key: `baseera-lang`
- Strict JSON-only prompts in CV analysis API to prevent `JSON.parse` failures

## Current Status
- ✅ Multi-provider AI routing implemented
- ✅ Bilingual (Arabic/English) UI complete
- ✅ CV PDF upload & analysis pipeline working
- ✅ Stripe subscription integration (checkout, portal, webhooks)
- ✅ Deployed to production at baseera-ai.vercel.app
- ✅ Provider fallback metrics & health check endpoints
- ✅ Supabase integration ready (requires env vars)
- 🔜 Add Supabase env vars to Vercel to activate persistence
