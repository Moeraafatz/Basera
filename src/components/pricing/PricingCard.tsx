"use client";

import { useState } from "react";
import { useTranslate, useLang } from "@/lib/i18n";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
  id: string;
  name: string;
  displayName: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  isPopular?: boolean;
  isEnterprise?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  isYearly: boolean;
  currentTier?: string;
  onSubscribe: (tier: string, interval: "month" | "year") => void;
}

export function PricingCard({ tier, isYearly, currentTier, onSubscribe }: PricingCardProps) {
  const t = useTranslate();
  const [isLoading, setIsLoading] = useState(false);

  const price = isYearly ? tier.priceYearly : tier.priceMonthly;
  const isCurrentTier = currentTier === tier.id;

  const handleSubscribe = async () => {
    if (isCurrentTier || tier.isEnterprise) return;

    setIsLoading(true);
    try {
      await onSubscribe(tier.id, isYearly ? "year" : "month");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={cn(
        "relative flex flex-col transition-all duration-300 hover:shadow-lg",
        tier.isPopular && "border-primary shadow-lg scale-105"
      )}
    >
      {tier.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="default" className="px-3 py-1">
            {t("pricing.popular")}
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <h3 className="text-2xl font-bold">{tier.displayName}</h3>
        <div className="mt-4">
          {price === 0 ? (
            <span className="text-4xl font-bold">{t("pricing.free")}</span>
          ) : (
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold">${price}</span>
              <span className="text-muted-foreground">
                /{isYearly ? t("pricing.year") : t("pricing.month")}
              </span>
            </div>
          )}
          {isYearly && price > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {t("pricing.saveYearly").replace("{{savings}}", String(Math.round((1 - tier.priceYearly / (tier.priceMonthly * 12)) * 100)))}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          className={cn("w-full", tier.isPopular && "bg-primary hover:bg-primary/90")}
          variant={tier.isPopular ? "default" : "outline"}
          disabled={isCurrentTier || isLoading || tier.isEnterprise}
          onClick={handleSubscribe}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("pricing.loading")}
            </>
          ) : isCurrentTier ? (
            t("pricing.currentPlan")
          ) : tier.isEnterprise ? (
            t("pricing.contactSales")
          ) : (
            t("pricing.upgrade")
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
