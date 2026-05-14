# AI Prompt Enhancer Constitution

## Core Principles

### I. User Experience First
Every feature MUST serve the user's actual workflow. AI tool interfaces are designed for clarity and immediate value — no feature ships with placeholder output, dead UI, or empty states that waste the user's time. The landing page demo panel is the first impression; it MUST demonstrate real value immediately, even without live API credentials. Every generated output should be structured, specific, and immediately usable — never generic, never templated.

### II. Graceful Degradation (NON-NEGOTIABLE)
All AI-powered features MUST function without external API dependencies. Every tool has a high-quality local generation fallback that produces professional-grade output. When AI APIs are unavailable or fail, the local generator activates automatically with no degraded experience visible to the user. API calls MUST be wrapped in try/catch with clear fallback paths. No feature ever shows an empty output box to the user.

### III. Progressive Enhancement
Features are built mobile-first. Every tool is functional on all devices before adding desktop-specific polish. Animations enhance experience — they never obscure functionality or block interaction. Core content and actions are always reachable regardless of JavaScript execution context. Performance is a feature: initial load under 3 seconds on 3G, interaction response under 500ms.

### IV. Production-Grade AI Integration
AI prompts sent to external services (OpenRouter, Gemini) MUST be structured, detailed, and domain-aware. Prompts include role definitions, task context, formatting requirements, and quality criteria specific to the target model. Temperature and token limits are tuned per model family. No AI integration ships with placeholder system prompts or bare user input forwarding.

### V. Simplicity & Zero YAGNI
Start with the simplest solution that works. Every new dependency, component, or abstraction must justify its existence. No AI tool ships with unused model options, unreached UI states, or scaffolding for features not yet requested. When the user asks for "fix the hoverboard", the fix is targeted and verified — no scope creep, no feature additions.

## Additional Constraints

### Technology Stack
- **Framework**: Next.js 16 + React 19 + TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` — no `tailwind.config.js`
- **UI Components**: Radix UI primitives + class-variance-authority + clsx + tailwind-merge
- **Animation**: Framer Motion for page transitions and micro-interactions
- **State**: Zustand (single store) — no Redux, no Context for global state
- **Toasts**: Sonner
- **AI**: OpenRouter (openai SDK) + Gemini (@google/generative-ai)
- **Deployment**: Vercel — auto-deploys on push to main branch

### Output Quality Standards
All generated prompts MUST include:
- Clear role/identity definition for the AI model
- Domain-specific context and constraints
- Structured output format (headers, sections, or numbered steps)
- Quality criteria and success metrics where applicable
- Model-specific terminology and parameters

No generated output reads as a template or placeholder. Professional, specific, and immediately actionable.

### Performance Constraints
- LCP < 2.5s on mobile
- FID < 100ms
- CLS < 0.1
- No layout shift during AI generation
- Loading states on every async operation

### Environment & Secrets
- All API keys stored in `.env.local` (gitignored)
- Never commit real keys or placeholder values in docs
- Environment variables documented in AGENTS.md

## Development Workflow

### Before Every Commit
1. Run `npm run lint` — must pass with no errors (warnings acceptable)
2. Manual smoke test on all AI tools — verify output quality
3. Test landing page "Try it now" panel end-to-end
4. Verify deployment builds successfully

### Before Every Deployment
1. Confirm all tools produce structured, professional output with no fallback "API unavailable" visible to users
2. Test on mobile viewport
3. Verify copy-to-clipboard works on all output areas

### Review Process
- All AI output logic reviewed for fallback completeness
- No new feature ships with generic or placeholder output generators
- Landing page demo panel is always tested — it represents the product

## Governance

This constitution supersedes all other development practices in this repository. Amendments require:
1. Documentation of the proposed change
2. A migration plan if existing features are affected
3. Testing plan that verifies no degraded user experience

Every PR review MUST verify:
- AI tools have working local fallbacks
- Output quality meets the standards in Section 2
- No regression in landing page demo panel functionality

**Version**: 1.0.0 | **Ratified**: 2026-05-14 | **Last Amended**: 2026-05-14