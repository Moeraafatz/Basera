"use client";

import { createContext, useContext, useCallback, useState, type ReactNode } from "react";
import arJson from "@/locales/ar.json";
import enJson from "@/locales/en.json";

export type Lang = "ar" | "en";

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const arDict = arJson as Record<string, unknown>;
const enDict = enJson as Record<string, unknown>;

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "ar";
  try {
    const saved = localStorage.getItem("baseera-lang");
    if (saved === "en" || saved === "ar") return saved;
  } catch {}
  return "ar";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => getInitialLang());

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("baseera-lang", l);
    } catch {}
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "ar" ? "en" : "ar";
      try {
        localStorage.setItem("baseera-lang", next);
      } catch {}
      return next;
    });
  }, []);

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("Missing I18nProvider");
  return ctx;
}

export function useLang(): Lang {
  return useI18n().lang;
}

export function useSetLang() {
  return useI18n().setLang;
}

export function useToggleLang() {
  return useI18n().toggleLang;
}

function getNested(obj: Record<string, unknown>, path: string): string {
  return path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj as unknown) as string || path;
}

export function t(lang: Lang, key: string): string {
  const dict = lang === "ar" ? arDict : enDict;
  const val = getNested(dict, key);
  return val;
}

export function useTranslate() {
  const lang = useLang();
  return useCallback(
    (key: string) => t(lang, key),
    [lang]
  );
}

export const i18nStore = {
  getState: () => ({ lang: "ar" as Lang }),
  setState: () => {},
  subscribe: () => () => {},
};
