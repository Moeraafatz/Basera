"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Image, Video, FileText, Zap, BarChart3, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslate, useLang } from "@/lib/i18n";
import { Logo } from "@/components/Logo";
import { DiamondDot } from "@/components/ui/diamond-dot";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/auth/user-menu";
import { useAuthStore } from "@/store/auth-store";

const ICONS = {
  Sparkles, Image, Video, FileText,
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslate();
  const lang = useLang();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const userId = useAuthStore((s) => s.user?.id);
  const userEmail = useAuthStore((s) => s.user?.email);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    async function checkAdmin() {
      const supabase = (await import("@/lib/supabase/client")).createClient();
      if (!supabase || cancelled) return;
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();
      if (!cancelled) setIsAdmin(role?.role === "admin");
    }
    checkAdmin();
    return () => { cancelled = true; };
  }, [userId]);

  const NAV_LINKS = [
    { href: "/", label: t("nav.home"), icon: Zap },
    { href: "/text", label: t("nav.text"), icon: Sparkles },
    { href: "/cv", label: t("nav.cv"), icon: FileText },
    { href: "/image", label: t("nav.image"), icon: Image },
    { href: "/video", label: t("nav.video"), icon: Video },
    { href: "/analytics", label: t("nav.analytics"), icon: BarChart3 },
  ];

  const AUTH_LINKS = isAuthenticated
    ? [
        { href: "/dashboard", label: t("nav.dashboard"), icon: BarChart3 },
        ...(isAdmin ? [{ href: "/admin", label: "Admin", icon: BarChart3 }] : []),
      ]
    : [];

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled
        ? "border-b border-ivory-300/50 bg-background/95 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-background/60"
        : "border-b border-ivory-300/30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group text-primary">
            <Logo variant="icon" className="h-9 w-9" />
            <span className="text-lg font-semibold tracking-tight font-display-ar">
              {lang === "ar" ? "بصيرة" : "Baseera"}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {[...NAV_LINKS, ...AUTH_LINKS].map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative">
                  <div
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                    {link.label}
                  </div>
                  {isActive && (
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2">
                      <DiamondDot size={5} color="var(--book-cloth)" />
                    </div>
                  )}
                </Link>
              );
            })}
            <LanguageSwitcher />

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="flex items-center gap-2 mr-1">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <LogIn className="size-3.5" />
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="gap-1.5">
                    <UserPlus className="size-3.5" />
                    {t("nav.signup")}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
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
          {[...NAV_LINKS, ...AUTH_LINKS].map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                  {isActive && <DiamondDot size={4} color="var(--book-cloth)" className="mr-auto" />}
                </div>
              </Link>
            );
          })}

          <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <BarChart3 className="size-4" />
                    {t("nav.dashboard")}
                  </Button>
                </Link>
                <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    {t("nav.profile")}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <LogIn className="size-4" />
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button className="w-full gap-2">
                    <UserPlus className="size-4" />
                    {t("nav.signup")}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
