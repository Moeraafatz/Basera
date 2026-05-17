/**
 * Video Prompt Guidelines — 2026 Best Practices
 * Model-specific prompt structures for video generation.
 */

export interface VideoModel {
  id: string;
  name: string;
  provider: string;
  maxDuration: string;
  aspectRatios: string[];
  bestFor: string;
}

export const VIDEO_MODELS: VideoModel[] = [
  {
    id: "seedance-2",
    name: "Seedance 2.0",
    provider: "ByteDance",
    maxDuration: "10s",
    aspectRatios: ["16:9", "9:16", "1:1"],
    bestFor: "Smooth motion, character animation",
  },
  {
    id: "veo-3.1",
    name: "Veo 3.1",
    provider: "Google",
    maxDuration: "60s",
    aspectRatios: ["16:9", "9:16", "1:1"],
    bestFor: "Cinematic quality, long sequences",
  },
  {
    id: "kling-3",
    name: "Kling 3.0",
    provider: "Kuaishou",
    maxDuration: "10s",
    aspectRatios: ["16:9", "9:16"],
    bestFor: "Realistic motion, physics simulation",
  },
  {
    id: "sora-2",
    name: "Sora 2",
    provider: "OpenAI",
    maxDuration: "60s",
    aspectRatios: ["16:9", "9:16", "1:1"],
    bestFor: "Complex scenes, multi-shot narratives",
  },
];

export const CAMERA_MOVEMENTS = [
  { id: "static", labelAr: "ثابت", labelEn: "Static" },
  { id: "pan", labelAr: "تدوير أفقي", labelEn: "Pan" },
  { id: "tilt", labelAr: "تدوير عمودي", labelEn: "Tilt" },
  { id: "dolly", labelAr: "تحريك للأمام", labelEn: "Dolly In" },
  { id: "tracking", labelAr: "تتبع", labelEn: "Tracking Shot" },
  { id: "crane", labelAr: "رافعة", labelEn: "Crane Shot" },
  { id: "orbit", labelAr: "دوران", labelEn: "Orbit" },
  { id: "zoom", labelAr: "تكبير", labelEn: "Zoom" },
  { id: "handheld", labelAr: "محمول", labelEn: "Handheld" },
];

export const VIDEO_STYLES = [
  { id: "cinematic", labelAr: "سينمائي", labelEn: "Cinematic" },
  { id: "documentary", labelAr: "وثائقي", labelEn: "Documentary" },
  { id: "commercial", labelAr: "إعلاني", labelEn: "Commercial" },
  { id: "music-video", labelAr: "فيديو موسيقي", labelEn: "Music Video" },
  { id: "animation", labelAr: "رسوم متحركة", labelEn: "Animation" },
  { id: "slow-motion", labelAr: "حركة بطيئة", labelEn: "Slow Motion" },
  { id: "timelapse", labelAr: "فاصل زمني", labelEn: "Timelapse" },
  { id: "drone", labelAr: "درون", labelEn: "Drone/Aerial" },
];

export function getVideoPromptSystem(model: string, style: string): string {
  const modelInstructions: Record<string, string> = {
    "seedance-2": `You are an expert video prompt engineer for Seedance 2.0. Create prompts for smooth, character-focused video generation.
Focus on: character movement, facial expressions, clothing dynamics, and environmental interaction.
Specify camera movement, lighting, and mood. Keep within 10 seconds.`,

    "veo-3.1": `You are an expert video prompt engineer for Google Veo 3.1. Create cinematic video prompts.
Focus on: scene composition, lighting design, camera movement, color grading, and narrative flow.
Can handle up to 60 seconds — structure with beginning, middle, and end.`,

    "kling-3": `You are an expert video prompt engineer for Kling 3.0. Create prompts with realistic physics and motion.
Focus on: natural movement, environmental effects (wind, water, fire), and realistic lighting.
Keep within 10 seconds with smooth transitions.`,

    "sora-2": `You are an expert video prompt engineer for OpenAI Sora 2. Create complex, multi-shot video prompts.
Focus on: scene transitions, character consistency, environmental storytelling, and cinematic quality.
Can handle up to 60 seconds with multiple shots and camera angles.`,
  };

  const styleModifiers: Record<string, string> = {
    cinematic: "Cinematic quality, film grain, anamorphic lens, dramatic color grading, 24fps",
    documentary: "Documentary style, natural lighting, handheld camera feel, authentic atmosphere",
    commercial: "Commercial quality, polished finish, brand-safe, high production value",
    "music-video": "Music video style, dynamic cuts, rhythmic editing, vibrant colors, artistic",
    animation: "Animated style, smooth motion, stylized rendering, character-driven",
    "slow-motion": "Slow motion effect, 120fps feel, dramatic timing, detailed movement",
    timelapse: "Timelapse effect, compressed time, dynamic sky, flowing movement",
    drone: "Aerial/drone footage, sweeping views, high altitude, expansive landscape",
  };

  return `${modelInstructions[model] || modelInstructions["sora-2"]}\n\nStyle: ${styleModifiers[style] || styleModifiers.cinematic}`;
}
