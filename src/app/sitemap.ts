import { MetadataRoute } from "next";

const BASE_URL = "https://1-prompteng-ai.vercel.app";

const TOOL_PAGES = [
  { path: "/ai-prompt-generator", priority: "1.0", changefreq: "weekly" },
  { path: "/prompt-checker", priority: "0.9", changefreq: "weekly" },
  { path: "/image-prompt", priority: "0.9", changefreq: "weekly" },
  { path: "/veo3-prompt", priority: "0.9", changefreq: "weekly" },
  { path: "/ai-humanizer", priority: "0.9", changefreq: "weekly" },
  { path: "/image-to-prompt", priority: "0.9", changefreq: "weekly" },
  { path: "/ai-text-detector", priority: "0.8", changefreq: "weekly" },
  { path: "/prompt-library", priority: "0.8", changefreq: "weekly" },
  { path: "/terms", priority: "0.5", changefreq: "monthly" },
  { path: "/privacy", priority: "0.5", changefreq: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = TOOL_PAGES.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changefreq as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: parseFloat(page.priority),
  }));

  return [...staticPages, ...toolPages];
}