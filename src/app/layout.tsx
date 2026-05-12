import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prompt Engineer — Free AI Prompt Generator",
  description: "Transform your ideas into powerful, precise prompts for AI conversations. Free AI prompt generator for ChatGPT, Claude, Gemini, and more.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Prompt Engineer — Free AI Prompt Generator",
    description: "Transform your ideas into powerful, precise prompts for AI conversations. Free AI prompt generator for ChatGPT, Claude, Gemini, and more.",
    url: "https://prompt.eng",
    siteName: "Prompt Engineer",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "Prompt Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Engineer — Free AI Prompt Generator",
    description: "Transform your ideas into powerful, precise prompts for AI conversations.",
    images: ["/logo.svg"],
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
      </body>
    </html>
  );
}