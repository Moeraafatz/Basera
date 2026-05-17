"use client";

import { useTranslate, useLang } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, ArrowUpRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SubscriptionStatusProps {
  tier: string;
  status: string;
  currentPeriodEnd: string | null;
  billingInterval: string | null;
  onManageBilling: () => void;
  onUpgrade: () => void;
}

export function SubscriptionStatus({
  tier,
  status,
  currentPeriodEnd,
  billingInterval,
  onManageBilling,
  onUpgrade,
}: SubscriptionStatusProps) {
  const t = useTranslate();
  const lang = useLang();
  const [isLoading, setIsLoading] = useState(false);

  const statusLabels: Record<string, string> = {
    active: t("subscription.active"),
    trialing: t("subscription.trialing"),
    past_due: t("subscription.pastDue"),
    canceled: t("subscription.canceled"),
    unpaid: t("subscription.unpaid"),
  };

  const statusColors: Record<string, string> = {
    active: "bg-green-500/10 text-green-500",
    trialing: "bg-blue-500/10 text-blue-500",
    past_due: "bg-yellow-500/10 text-yellow-500",
    canceled: "bg-red-500/10 text-red-500",
    unpaid: "bg-red-500/10 text-red-500",
  };

  const tierLabels: Record<string, string> = {
    free: t("tiers.free"),
    pro: t("tiers.pro"),
    enterprise: t("tiers.enterprise"),
  };

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      await onManageBilling();
    } finally {
      setIsLoading(false);
    }
  };

  const endDate = currentPeriodEnd
    ? new Date(currentPeriodEnd).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {t("subscription.title")}
          </CardTitle>
          <Badge className={cn("px-3 py-1", statusColors[status] || "bg-muted text-muted-foreground")}>
            {statusLabels[status] || status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{t("subscription.plan")}</p>
            <p className="font-semibold">{tierLabels[tier] || tier}</p>
          </div>
          {billingInterval && (
            <div>
              <p className="text-sm text-muted-foreground">{t("subscription.billing")}</p>
              <p className="font-semibold">
                {billingInterval === "month" ? t("pricing.monthly") : t("pricing.yearly")}
              </p>
            </div>
          )}
          {endDate && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{t("subscription.renewsOn")}</p>
                <p className="font-semibold">{endDate}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {status === "active" || status === "trialing" ? (
            <Button variant="outline" onClick={handleManageBilling} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowUpRight className="mr-2 h-4 w-4" />
              )}
              {t("subscription.manageBilling")}
            </Button>
          ) : (
            <Button onClick={onUpgrade}>{t("subscription.upgrade")}</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
