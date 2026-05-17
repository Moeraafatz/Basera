"use client";

import { useEffect } from "react";
import { useLang, useSetLang } from "@/lib/i18n";

export function DirectionLoader() {
  const lang = useLang();
  const setLang = useSetLang();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("baseera-lang");
      if (saved === "en" || saved === "ar") {
        setLang(saved);
      }
    } catch {}
  }, [setLang]);

  return null;
}
