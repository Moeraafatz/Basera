# Prompt Engineer - Free AI Prompt Generator

A modern, colorful AI prompt generator with multiple tools for creating professional prompts for ChatGPT, Claude, Gemini, and more.

**Live Site:** https://prompt-eng-ebon.vercel.app

## Features

- **AI Prompt Generator** - Transform ideas into professional AI prompts
- **Image Prompt Generator** - Create prompts for DALL-E, Midjourney, Stable Diffusion, FLUX
- **VEO3 Video Prompts** - Professional prompts for AI video generation
- **AI Humanizer** - Make AI content sound natural and human-written
- **Prompt Checker** - Verify and improve your prompt quality
- **Prompt Library** - 100+ pre-built prompts for various use cases
- **Image to Prompt** - Convert any image into detailed AI prompts

## Tech Stack

- Next.js 16.2.6 with Turbopack
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- Lucide React (icons)
- Sonner (toasts)
- OpenRouter API + Google Gemini (AI backend)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## Environment Variables

Create a `.env.local` file with:

```env
OPENAI_API_KEY=your-openrouter-api-key
GOOGLE_API_KEY=your-gemini-api-key
```

## Colorful Design

Each tool has a unique gradient color scheme:
- AI Prompt Generator: Violet/Purple
- Image Prompts: Pink/Rose
- VEO3 Video Prompts: Amber/Orange
- AI Humanizer: Cyan/Blue
- Prompt Checker: Emerald/Teal
- Image to Prompt: Indigo/Violet
- Prompt Library: Rose/Pink

## Deployment

Deployed on Vercel: https://prompt-eng-ebon.vercel.app

### Vercel Setup

1. Connect your Git repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `GOOGLE_API_KEY`
3. Deploy automatically on push to main branch