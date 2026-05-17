"use client";

import { useEffect } from "react";
import { useLang, i18nStore } from "@/lib/i18n";

export function DirectionLoader() {
  const lang = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    const saved = localStorage.getItem("baseera-lang");
    if (saved === "en" || saved === "ar") {
      i18nStore.getState().setLang(saved);
    } else {
      i18nStore.getState().setLang("ar");
    }
  }, []);

  useEffect(() => {
    const unsub = i18nStore.subscribe((s) => {
      localStorage.setItem("baseera-lang", s.lang);
    });
    return () => unsub();
  }, []);

  return null;
}
