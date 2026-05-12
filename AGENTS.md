# AI Prompt Enhancer - Agent Guide

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
OPENAI_API_KEY=<openrouter-key>
GOOGLE_API_KEY=<gemini-key>
```

## Key Directories
- `src/app/` - Next.js App Router pages
- `src/components/ui/` - Radix UI + Tailwind components
- `src/lib/` - AI service integrations (OpenRouter, Gemini)
- `src/store/` - Zustand state management
- `src/data/` - Static prompt library data

## Framework Quirks
- Next.js 16 has breaking changes from earlier versions - check `node_modules/next/dist/docs/` for APIs
- Tailwind CSS v4 uses `@tailwindcss/postcss` - no `tailwind.config.js`
- ESLint v9 with flat config (`eslint.config.mjs`)
- No separate typecheck script - ESLint covers TypeScript

## Testing
- No test framework configured (no jest, vitest, or playwright)
- Manual testing via `npm run dev`

## Deployment
- Vercel: https://prompt-eng-ebon.vercel.app
- Auto-deploys on push to main branch
- Add environment variables in Vercel dashboard