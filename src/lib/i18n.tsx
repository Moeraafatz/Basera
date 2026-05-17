"use client";

import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import arJson from "@/locales/ar.json";
import enJson from "@/locales/en.json";

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

const arDict = arJson as Record<string, unknown>;
const enDict = enJson as Record<string, unknown>;

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
