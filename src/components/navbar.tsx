"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, Zap, Wand2, Image, Video, Shield, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Zap },
  { href: "/ai-prompt-generator", label: "AI Prompt", icon: Sparkles },
  { href: "/prompt-library", label: "Library", icon: BookOpen },
  { href: "/image-prompt", label: "Image", icon: Image },
  { href: "/veo3-prompt", label: "VEO3", icon: Video },
  { href: "/ai-humanizer", label: "Humanizer", icon: Shield },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Zap className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Prompt Engineer
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <div
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                    {link.label}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/ai-prompt-generator" className="hidden md:block">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 rounded-lg text-sm font-medium shadow-sm flex items-center gap-2 transition-colors">
                <Wand2 className="h-4 w-4" />
                Start Creating
              </button>
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                </div>
              </Link>
            );
          })}
          <div className="pt-3">
            <Link href="/ai-prompt-generator" onClick={() => setMobileOpen(false)}>
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full h-11 rounded-lg text-sm font-medium shadow-sm flex items-center justify-center gap-2">
                <Wand2 className="h-4 w-4" />
                Start Creating
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}