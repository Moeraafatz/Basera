import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";

const QUICK_LINKS = [
  { href: "/ai-prompt-generator", label: "AI Prompt Generator" },
  { href: "/prompt-library", label: "Prompt Library" },
  { href: "/image-prompt", label: "Image Prompt Generator" },
  { href: "/veo3-prompt", label: "VEO3 Video Prompts" },
  { href: "/ai-humanizer", label: "AI Humanizer" },
  { href: "/prompt-checker", label: "Prompt Checker" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Prompt Engineer
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transform your ideas into powerful AI prompts. Free, no registration required.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Tools</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">&nbsp;</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.slice(3).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Prompt Engineer. All rights reserved.
          </p>
          
          <a href="https://www.rafbug.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-sm text-muted-foreground">Powered By</span>
            <Image
              src="/rafbug-logo.png"
              alt="RAFBUG"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
          </a>
          
          <p className="text-sm text-muted-foreground">
            Free AI Prompt Generator — No registration required
          </p>
        </div>
      </div>
    </footer>
  );
}