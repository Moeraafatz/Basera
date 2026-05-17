"use client";

import { useEffect } from "react";
import { useLang, useSetLang } from "@/lib/i18n";

export function DirectionLoader() {
  const lang = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return null;
}
