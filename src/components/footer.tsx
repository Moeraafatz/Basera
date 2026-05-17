"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslate, useLang } from "@/lib/i18n";
import { Logo } from "@/components/Logo";

export function Footer() {
  const t = useTranslate();
  const lang = useLang();
  const [year, setYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 text-primary">
              <Logo variant="icon" className="h-9 w-9" />
              <span className="text-lg font-semibold tracking-tight">
                {lang === "ar" ? "بصيرة" : "Baseera"}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lang === "ar"
                ? "حوّل أفكارك إلى أوامر احترافية للذكاء الاصطناعي. مجاني، بدون تسجيل."
                : "Transform your ideas into professional AI commands. Free, no registration required."}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">{lang === "ar" ? "الأدوات" : "Tools"}</h4>
            <ul className="space-y-2">
              <li><Link href="/text" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("tools.text.name")}</Link></li>
              <li><Link href="/cv" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("tools.cv.name")}</Link></li>
              <li><Link href="/image" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("tools.image.name")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">&nbsp;</h4>
            <ul className="space-y-2">
              <li><Link href="/video" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("tools.video.name")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">{lang === "ar" ? "روابط" : "Links"}</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.terms")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {year ?? new Date().getFullYear()} {lang === "ar" ? "بصيرة" : "Baseera"}. {t("footer.rights")}.
          </p>

          <a href="https://www.rafbug.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-sm text-muted-foreground">{lang === "ar" ? "بدعم من" : "Powered By"}</span>
            <Image
              src="/rafbug-logo.png"
              alt="RAFBUG"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
          </a>

          <p className="text-sm text-muted-foreground">
            {lang === "ar" ? "منصة أوامر الذكاء الاصطناعي — مجاني بدون تسجيل" : "Free AI Prompt Platform — No registration required"}
          </p>
        </div>
      </div>
    </footer>
  );
}
