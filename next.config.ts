import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      // Old route redirects to new Baseera routes
      {
        source: "/ai-prompt-generator",
        destination: "/text",
        permanent: true,
      },
      {
        source: "/prompt-library",
        destination: "/text",
        permanent: true,
      },
      {
        source: "/image-prompt",
        destination: "/image",
        permanent: true,
      },
      {
        source: "/veo3-prompt",
        destination: "/video",
        permanent: true,
      },
      {
        source: "/ai-humanizer",
        destination: "/text",
        permanent: true,
      },
      {
        source: "/prompt-checker",
        destination: "/text",
        permanent: true,
      },
      {
        source: "/image-to-prompt",
        destination: "/image",
        permanent: true,
      },
      {
        source: "/ai-text-detector",
        destination: "/text",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
