import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter, Amiri } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CustomScrollbar, HideDefaultScrollbar } from "@/components/CustomScrollbar";
import { JsonLd } from "@/components/JsonLd";
import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth-context";
import { DirectionLoader } from "@/components/direction-loader";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { ErrorBoundary } from "@/components/error-boundary";
import { ClientOnly } from "@/components/client-only";

const BASE_URL = "https://baseera-ai.vercel.app";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["arabic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-display-arabic",
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#191919",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "بصيرة — حوّل أفكارك إلى أوامر احترافية للذكاء الاصطناعي",
    template: "%s | بصيرة",
  },
  description: "منصة شاملة لتحسين أوامر الذكاء الاصطناعي في كل مجال - النصوص، الصور، الفيديو، الكود، والسيرة الذاتية",
  keywords: ["بصيرة", "Baseera", "محسن الأوامر", "أوامر الذكاء الاصطناعي", "محسن السيرة الذاتية", "AI prompt generator", "prompt engineering", "CV analyzer"],
  authors: [{ name: "بصيرة" }],
  creator: "بصيرة",
  publisher: "بصيرة",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "بصيرة",
  },
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
      ar: BASE_URL,
      en: `${BASE_URL}/en`,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/icons/icon-192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/icons/icon-512.png",
      },
    ],
  },
  openGraph: {
    title: "بصيرة — حوّل أفكارك إلى أوامر احترافية للذكاء الاصطناعي",
    description: "منصة شاملة لتحسين أوامر الذكاء الاصطناعي في كل مجال - النصوص، الصور، الفيديو، الكود، والسيرة الذاتية",
    url: BASE_URL,
    siteName: "بصيرة",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "بصيرة - حوّل أفكارك إلى أوامر احترافية للذكاء الاصطناعي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "بصيرة — حوّل أفكارك إلى أوامر احترافية للذكاء الاصطناعي",
    description: "منصة شاملة لتحسين أوامر الذكاء الاصطناعي في كل مجال - النصوص، الصور، الفيديو، الكود، والسيرة الذاتية",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${ibmPlexSansArabic.variable} ${inter.variable} ${amiri.variable} antialiased`} suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: `
          window.onerror = function(msg, url, line, col, error) {
            console.error("Global error:", msg, "line:", line, "col:", col, error);
          };
          window.onunhandledrejection = function(e) {
            console.error("Unhandled promise rejection:", e.reason);
          };
        ` }} />
        <ErrorBoundary>
          <ClientOnly>
            <I18nProvider>
              <AuthProvider>
                <DirectionLoader />
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
                      borderRadius: "0.75rem",
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
                      "name": "بصيرة",
                      "description": "حوّل أفكارك إلى أوامر احترافية للذكاء الاصطناعي",
                      "publisher": { "@id": `${BASE_URL}/#organization` },
                      "inLanguage": ["ar", "en"],
                    },
                    {
                      "@type": "Organization",
                      "@id": `${BASE_URL}/#organization`,
                      "name": "بصيرة",
                      "url": BASE_URL,
                      "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.svg`, "width": 512, "height": 512 },
                      "description": "منصة شاملة لتحسين أوامر الذكاء الاصطناعي في كل مجال",
                    },
                    {
                      "@type": "WebApplication",
                      "@id": `${BASE_URL}/#webapp`,
                      "name": "بصيرة - محسّن الأوامر",
                      "url": `${BASE_URL}/text`,
                      "applicationCategory": "UtilitiesApplication",
                      "operatingSystem": "Web Browser",
                      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                    }
                  ]
                }}/>
                <ServiceWorkerRegistration />
              </AuthProvider>
            </I18nProvider>
          </ClientOnly>
        </ErrorBoundary>
      </body>
    </html>
  );
}
