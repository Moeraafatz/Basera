"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useTranslate } from "@/lib/i18n";

export function UserMenu() {
  const t = useTranslate();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    router.push("/");
  };

  if (!user) return null;

  const initials = (user.user_metadata?.name || user.email || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label={t("nav.profile")}
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-book-cloth text-white text-xs font-bold">
          {initials}
        </div>
        <ChevronDown
          className={`size-3 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800 z-50">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
              {user.user_metadata?.name || user.email}
            </p>
            <p className="text-xs text-slate-500 truncate" dir="ltr">
              {user.email}
            </p>
          </div>

          <div className="mt-1.5 space-y-0.5">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <LayoutDashboard className="size-4" />
              {t("nav.dashboard")}
            </Link>
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Settings className="size-4" />
              {t("nav.profile")}
            </Link>
          </div>

          <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-700">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2.5 w-full rounded-lg px-3 py-2 text-sm text-error hover:bg-error/5 transition-colors"
            >
              <LogOut className="size-4" />
              {t("nav.logout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
