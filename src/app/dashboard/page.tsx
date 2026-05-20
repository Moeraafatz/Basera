"use client";

import Link from "next/link";
import { FileText, Sparkles, Image, Video, Zap } from "lucide-react";
import { useTranslate } from "@/lib/i18n";

export default function DashboardPage() {
  const t = useTranslate();

  const tools = [
    { href: "/text", label: t("nav.text"), icon: Sparkles, desc: t("tools.textDesc") },
    { href: "/cv", label: t("nav.cv"), icon: FileText, desc: t("tools.cvDesc") },
    { href: "/image", label: t("nav.image"), icon: Image, desc: t("tools.imageDesc") },
    { href: "/video", label: t("nav.video"), icon: Video, desc: t("tools.videoDesc") },
  ];

  return (
    <div className="min-h-screen px-4 py-12 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {t("dashboard.title")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {t("dashboard.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.href} href={tool.href} className="group">
              <div className="corner-brackets bg-white dark:bg-slate-800 rounded-xl p-6 transition-all group-hover:shadow-lg group-hover:scale-[1.02]">
                <div className="size-12 rounded-xl bg-book-cloth/10 flex items-center justify-center mb-4 group-hover:bg-book-cloth/20 transition-colors">
                  <Icon className="size-6 text-book-cloth" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  {tool.label}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {tool.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="corner-brackets bg-white dark:bg-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Zap className="size-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {t("dashboard.welcome")}
            </h2>
            <p className="text-sm text-slate-500">{t("dashboard.freeForever")}</p>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          {t("dashboard.description")}
        </p>
      </div>
    </div>
  );
}