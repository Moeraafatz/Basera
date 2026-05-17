"use client";

import { createContext, useContext, useCallback, type ReactNode } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export type Lang = "ar" | "en";

interface I18nState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export const i18nStore = createStore<I18nState>((set, get) => ({
  lang: "ar",
  setLang: (lang) => set({ lang }),
  toggleLang: () => set({ lang: get().lang === "ar" ? "en" : "ar" }),
}));

const I18nContext = createContext<typeof i18nStore | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nContext.Provider value={i18nStore}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18nStore() {
  const store = useContext(I18nContext);
  if (!store) throw new Error("Missing I18nProvider");
  return store;
}

export function useLang() {
  const store = useI18nStore();
  return useStore(store, (s) => s.lang);
}

export function useSetLang() {
  const store = useI18nStore();
  return useStore(store, (s) => s.setLang);
}

export function useToggleLang() {
  const store = useI18nStore();
  return useStore(store, (s) => s.toggleLang);
}

let arDict: Record<string, unknown> | null = null;
let enDict: Record<string, unknown> | null = null;

async function loadAr(): Promise<Record<string, unknown>> {
  if (!arDict) {
    arDict = (await import("@/locales/ar.json")).default as Record<string, unknown>;
  }
  return arDict!;
}

async function loadEn(): Promise<Record<string, unknown>> {
  if (!enDict) {
    enDict = (await import("@/locales/en.json")).default as Record<string, unknown>;
  }
  return enDict!;
}

function getNested(obj: Record<string, unknown>, path: string): string {
  return path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj as unknown) as string || path;
}

export function t(lang: Lang, key: string): string {
  const dict = lang === "ar" ? arDict : enDict;
  if (!dict) return key;
  const val = getNested(dict, key);
  return val;
}

// Hook version
export function useTranslate() {
  const lang = useLang();
  return useCallback(
    (key: string) => t(lang, key),
    [lang]
  );
}
