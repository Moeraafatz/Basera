import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CustomScrollbar, HideDefaultScrollbar } from "@/components/CustomScrollbar";
import { JsonLd } from "@/components/JsonLd";

const BASE_URL = "https://1-prompteng-ai.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Prompt Engineer — Free AI Prompt Generator",
    template: "%s | Prompt Engineer",
  },
  description: "Transform your ideas into powerful, precise prompts for AI conversations. Free AI prompt generator for ChatGPT, Claude, Gemini, and more.",
  keywords: ["AI prompt generator", "ChatGPT prompts", "Claude prompts", "prompt engineering", "AI writing assistant", "free AI tools", "prompt optimization", "Midjourney prompts", "DALL-E prompts"],
  authors: [{ name: "Prompt Engineer" }],
  creator: "Prompt Engineer",
  publisher: "Prompt Engineer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      en: BASE_URL,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Prompt Engineer — Free AI Prompt Generator",
    description: "Transform your ideas into powerful, precise prompts for AI conversations. Free AI prompt generator for ChatGPT, Claude, Gemini, and more.",
    url: BASE_URL,
    siteName: "Prompt Engineer",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prompt Engineer - Free AI Prompt Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Engineer — Free AI Prompt Generator",
    description: "Transform your ideas into powerful, precise prompts for AI conversations.",
    images: ["/og-image.png"],
    creator: "@promptengineer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <HideDefaultScrollbar />
        <CustomScrollbar />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              borderRadius: "0.625rem",
            },
          }}
        />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${BASE_URL}/#website`,
              "url": BASE_URL,
              "name": "Prompt Engineer",
              "description": "Free AI prompt generator for ChatGPT, Claude, Gemini, and more",
              "publisher": { "@id": `${BASE_URL}/#organization` },
              "potentialAction": {
                "@type": "SearchAction",
                "target": { "@type": "EntryPoint", "urlTemplate": `${BASE_URL}/?s={search_term_string}` },
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "Organization",
              "@id": `${BASE_URL}/#organization`,
              "name": "Prompt Engineer",
              "url": BASE_URL,
              "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.svg`, "width": 512, "height": 512 },
              "description": "Free AI prompt generator tool for creating optimized prompts for various AI models"
            },
            {
              "@type": "WebApplication",
              "@id": `${BASE_URL}/#webapp`,
              "name": "AI Prompt Generator",
              "url": `${BASE_URL}/ai-prompt-generator`,
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Web Browser",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            }
          ]
        }}/>
      </body>
    </html>
  );
}