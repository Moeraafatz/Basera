"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Sparkles, BarChart3, Clock, Zap, Image, Video, Code } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useTranslate } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SubscriptionStatus } from "@/components/billing/SubscriptionStatus";
import { UsageMeter } from "@/components/billing/UsageMeter";
import Link from "next/link";
import { toast } from "sonner";

interface PromptRecord {
  id: string;
  service: string;
  model: string;
  input: string;
  created_at: string;
  tokens_used: number;
}

interface CVRecord {
  id: string;
  ats_score: number;
  created_at: string;
  updated_at: string;
}

interface UsageData {
  service: string;
  used: number;
}

interface SubscriptionData {
  tier_name: string;
  status: string;
  current_period_end: string;
  billing_interval: string;
  limits: Record<string, number>;
}

export default function DashboardPage() {
  const t = useTranslate();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const [prompts, setPrompts] = useState<PromptRecord[]>([]);
  const [cvs, setCVs] = useState<CVRecord[]>([]);
  const [usage, setUsage] = useState<UsageData[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!user) return;

    const userId = user.id;

    async function fetchData() {
      const supabase = createClient();
      if (!supabase) return;

      const [{ data: promptsData }, { data: cvsData }, { data: usageData }] = await Promise.all([
        supabase
          .from("prompts")
          .select("id, service, model, input, created_at, tokens_used")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("cvs")
          .select("id, ats_score, created_at, updated_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(10),
        supabase.rpc("get_user_subscription", { user_uuid: userId }),
      ]);

      setPrompts(promptsData || []);
      setCVs(cvsData || []);

      if (usageData && usageData.length > 0) {
        setSubscription(usageData[0] as SubscriptionData);
      }

      const { data: usageLogs } = await supabase
        .from("usage_logs")
        .select("service")
        .eq("user_id", userId)
        .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .eq("status", "success");

      const usageCounts: Record<string, number> = {};
      if (usageLogs) {
        for (const log of usageLogs) {
          usageCounts[log.service] = (usageCounts[log.service] || 0) + 1;
        }
      }

      setUsage(Object.entries(usageCounts).map(([service, used]) => ({ service, used })));
      setLoading(false);
    }

    fetchData();
  }, [user]);

  const handleManageBilling = async () => {
    try {
      const res = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create portal session");
      }

      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to open billing portal");
    }
  };

  const handleUpgrade = () => {
    router.push("/pricing");
  };

  if (isLoading || (isAuthenticated && loading)) {
    return (
      <div className="min-h-screen px-4 py-12 max-w-6xl mx-auto">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-96 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const serviceLabels: Record<string, string> = {
    text: t("nav.text"),
    cv: t("nav.cv"),
    image: t("nav.image"),
    video: t("nav.video"),
  };

  const serviceIcons: Record<string, React.ReactNode> = {
    "text-generate": <Zap className="h-4 w-4" />,
    "cv-analyze": <FileText className="h-4 w-4" />,
    "image-generate": <Image className="h-4 w-4" />,
    "video-generate": <Video className="h-4 w-4" />,
    "code-generate": <Code className="h-4 w-4" />,
  };

  const limits = subscription?.limits || {};
  const usageMap = Object.fromEntries(usage.map((u) => [u.service, u.used]));

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

      {/* Subscription Status */}
      {subscription && (
        <div className="mb-8">
          <SubscriptionStatus
            tier={subscription.tier_name}
            status={subscription.status}
            currentPeriodEnd={subscription.current_period_end}
            billingInterval={subscription.billing_interval}
            onManageBilling={handleManageBilling}
            onUpgrade={handleUpgrade}
          />
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="corner-brackets bg-white dark:bg-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-lg bg-book-cloth/10 flex items-center justify-center">
              <Sparkles className="size-5 text-book-cloth" />
            </div>
            <span className="text-sm text-slate-500">{t("dashboard.totalPrompts")}</span>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{prompts.length}</p>
        </div>

        <div className="corner-brackets bg-white dark:bg-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-lg bg-kraft/10 flex items-center justify-center">
              <FileText className="size-5 text-kraft" />
            </div>
            <span className="text-sm text-slate-500">{t("dashboard.totalCVs")}</span>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{cvs.length}</p>
        </div>

        <div className="corner-brackets bg-white dark:bg-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-lg bg-manilla/30 flex items-center justify-center">
              <BarChart3 className="size-5 text-book-cloth" />
            </div>
            <span className="text-sm text-slate-500">{t("dashboard.totalTokens")}</span>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {prompts.reduce((sum, p) => sum + (p.tokens_used || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Usage Meters */}
      {limits && Object.keys(limits).length > 0 && (
        <div className="corner-brackets bg-white dark:bg-slate-800 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="size-5 text-primary" />
            {t("dashboard.usage")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {limits.daily_prompts !== undefined && (
              <UsageMeter
                label={t("usage.prompts")}
                used={usageMap["text-generate"] || 0}
                limit={limits.daily_prompts}
                icon={<Zap className="h-4 w-4" />}
              />
            )}
            {limits.monthly_cv_analyses !== undefined && (
              <UsageMeter
                label={t("usage.cvAnalyses")}
                used={usageMap["cv-analyze"] || 0}
                limit={limits.monthly_cv_analyses}
                icon={<FileText className="h-4 w-4" />}
              />
            )}
            {limits.image_generations !== undefined && (
              <UsageMeter
                label={t("usage.imageGenerations")}
                used={usageMap["image-generate"] || 0}
                limit={limits.image_generations}
                icon={<Image className="h-4 w-4" />}
              />
            )}
            {limits.video_generations !== undefined && (
              <UsageMeter
                label={t("usage.videoGenerations")}
                used={usageMap["video-generate"] || 0}
                limit={limits.video_generations}
                icon={<Video className="h-4 w-4" />}
              />
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Prompts */}
        <div className="corner-brackets bg-white dark:bg-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="size-5 text-book-cloth" />
            {t("dashboard.recentActivity")}
          </h2>

          {prompts.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">{t("dashboard.noPrompts")}</p>
          ) : (
            <div className="space-y-3">
              {prompts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {serviceLabels[p.service] || p.service}
                      </Badge>
                      <span className="text-xs text-slate-400" dir="ltr">{p.model}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 truncate">
                      {p.input}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mr-3">
                    <Clock className="size-3.5 text-slate-400" />
                    <span className="text-xs text-slate-400">
                      {new Date(p.created_at).toLocaleDateString("ar")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent CVs */}
        <div className="corner-brackets bg-white dark:bg-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="size-5 text-kraft" />
            {t("dashboard.cvHistory")}
          </h2>

          {cvs.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">{t("dashboard.noCVs")}</p>
          ) : (
            <div className="space-y-3">
              {cvs.map((cv) => (
                <div
                  key={cv.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-kraft/10 flex items-center justify-center">
                      <FileText className="size-5 text-kraft" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        CV {cv.id.slice(0, 8)}
                      </p>
                      {cv.ats_score && (
                        <p className="text-xs text-slate-400">
                          ATS: {Math.round(cv.ats_score)}%
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(cv.updated_at).toLocaleDateString("ar")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/text">
          <Button variant="outline" className="w-full h-20 flex flex-col gap-1">
            <Sparkles className="size-5" />
            <span className="text-xs">{t("nav.text")}</span>
          </Button>
        </Link>
        <Link href="/cv">
          <Button variant="outline" className="w-full h-20 flex flex-col gap-1">
            <FileText className="size-5" />
            <span className="text-xs">{t("nav.cv")}</span>
          </Button>
        </Link>
        <Link href="/image">
          <Button variant="outline" className="w-full h-20 flex flex-col gap-1">
            <Image className="size-5" />
            <span className="text-xs">{t("nav.image")}</span>
          </Button>
        </Link>
        <Link href="/video">
          <Button variant="outline" className="w-full h-20 flex flex-col gap-1">
            <Video className="size-5" />
            <span className="text-xs">{t("nav.video")}</span>
          </Button>
        </Link>
      </div>

      {/* Member info */}
      <div className="mt-8 text-center text-sm text-slate-400">
        {t("dashboard.memberSince")}{" "}
        {user?.created_at
          ? new Date(user.created_at).toLocaleDateString("ar", { year: "numeric", month: "long" })
          : ""}
      </div>
    </div>
  );
}
