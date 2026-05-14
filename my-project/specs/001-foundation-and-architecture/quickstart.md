# Quickstart: Foundation & Architecture Page

## What is this?

A documentation page at `/foundation` that explains the complete technical architecture of the AI Prompt Enhancer app. Contributors use it to understand how the system is built without reading source code.

## How to access

Run `npm run dev` and navigate to `http://localhost:3000/foundation` in your browser.

## Sections

| Tab | What it covers |
|-----|---------------|
| Tech Stack | All dependencies with versions and rationale |
| AI Integration | How OpenRouter + Gemini are wired together |
| Components | Full component tree from UI primitives to pages |
| API Routes | All `/api/` endpoints with contracts |
| State Management | Zustand store structure and data flow |
| Deployment | Commands, env vars, Vercel config |
| Constitution Check | How each principle shapes the architecture |

## How to work on it

### Adding a new section
Edit `src/app/foundation/page.tsx`. Follow the existing tab pattern — each tab is a self-contained section component.

### Updating tech stack info
If you add a dependency, update the Tech Stack tab AND run the CI sync check to update the auto-generated tree.

### Fixing a factual error
Navigate to the relevant tab, find the incorrect information, and update it to match the actual source code. Then verify with `npm run lint`.

### Adding a new file to the directory tree
The tree auto-generates from `src/` — no manual update needed. If a file doesn't appear, check that it has a `.ts` or `.tsx` extension inside `src/`.

## Common tasks

```bash
# Start dev server
npm run dev

# Verify no lint errors
npm run lint

# Build for production
npm run build
```

## Architecture at a glance

- **Framework**: Next.js 16 App Router — pages in `src/app/`
- **AI**: OpenRouter (openai SDK) + Gemini — service in `src/lib/`
- **State**: Zustand single store — `src/store/`
- **UI**: Radix UI primitives + CVA pattern — `src/components/ui/`
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`
- **Deployment**: Vercel — auto-deploys on push to main