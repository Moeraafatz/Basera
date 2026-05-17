"use client";

import { useToggleLang, useLang } from "@/lib/i18n";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const toggle = useToggleLang();
  const lang = useLang();

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
      aria-label="Toggle language"
    >
      <Languages className="h-3.5 w-3.5" />
      <span>{lang === "ar" ? "English" : "العربية"}</span>
    </button>
  );
}
