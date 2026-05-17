"use client";

import { useState } from "react";
import { useTranslate, useLang } from "@/lib/i18n";
import { useAuthStore } from "@/store/auth-store";
import { PricingCard } from "@/components/pricing/PricingCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { WaveDivider } from "@/components/ui/wave-divider";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const TIERS = [
  {
    id: "free",
    name: "free",
    displayNameAr: "مجاني",
    displayNameEn: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    featuresAr: [
      "نماذج ذكاء اصطناعي أساسية",
      "5 مطالبات يومياً",
      "تحليل سيرة ذاتية واحد شهرياً",
      "دعم قياسي",
    ],
    featuresEn: [
      "Basic AI models",
      "5 prompts per day",
      "1 CV analysis per month",
      "Standard support",
    ],
  },
  {
    id: "pro",
    name: "pro",
    displayNameAr: "احترافي",
    displayNameEn: "Pro",
    priceMonthly: 19.99,
    priceYearly: 199.99,
    isPopular: true,
    featuresAr: [
      "نماذج ذكاء اصطناعي متقدمة",
      "مطالبات غير محدودة",
      "10 تحليلات سيرة ذاتية شهرياً",
      "دعم ذو أولوية",
      "تصدير إلى PDF/DOCX",
      "قوالب مخصصة",
    ],
    featuresEn: [
      "Advanced AI models",
      "Unlimited prompts",
      "10 CV analyses per month",
      "Priority support",
      "Export to PDF/DOCX",
      "Custom templates",
    ],
  },
  {
    id: "enterprise",
    name: "enterprise",
    displayNameAr: "مؤسسات",
    displayNameEn: "Enterprise",
    priceMonthly: 99.99,
    priceYearly: 999.99,
    isEnterprise: true,
    featuresAr: [
      "جميع نماذج الذكاء الاصطناعي",
      "كل شيء غير محدود",
      "تحليلات سيرة ذاتية غير محدودة",
      "دعم مخصص",
      "الوصول إلى API",
      "تعاون الفريق",
      "تكاملات مخصصة",
      "ضمان SLA",
    ],
    featuresEn: [
      "All AI models",
      "Unlimited everything",
      "Unlimited CV analyses",
      "Dedicated support",
      "API access",
      "Team collaboration",
      "Custom integrations",
      "SLA guarantee",
    ],
  },
];

export default function PricingPage() {
  const t = useTranslate();
  const lang = useLang();
  const { session } = useAuthStore();
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (tier: string, interval: "month" | "year") => {
    if (!session) {
      toast.error(t("auth.loginRequired"));
      window.location.href = `/login?redirect=/pricing`;
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, interval }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create checkout session");
      }

      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("pricing.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("pricing.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("pricing.subtitle")}
          </p>

          <div className="flex items-center justify-center gap-3">
            <Label>{t("pricing.monthly")}</Label>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <Label>{t("pricing.yearly")}</Label>
            {isYearly && (
              <span className="text-sm text-primary font-medium">
                {t("pricing.save20")}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TIERS.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={{
                id: tier.id,
                name: tier.name,
                displayName: lang === "ar" ? tier.displayNameAr : tier.displayNameEn,
                priceMonthly: tier.priceMonthly,
                priceYearly: tier.priceYearly,
                features: lang === "ar" ? tier.featuresAr : tier.featuresEn,
                isPopular: tier.isPopular,
                isEnterprise: tier.isEnterprise,
              }}
              isYearly={isYearly}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg shadow-lg flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>{t("pricing.redirecting")}</span>
            </div>
          </div>
        )}
      </div>

      <WaveDivider />
    </div>
  );
}
