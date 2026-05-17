"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useTranslate } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DiamondDot } from "@/components/ui/diamond-dot";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const t = useTranslate();
  const resetPassword = useAuthStore((s) => s.resetPassword);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);

    if (error) {
      toast.error(t("auth.forgot.errorGeneric"));
    } else {
      setSent(true);
      toast.success(t("auth.forgot.success"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-mesh">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <DiamondDot />
            <span className="text-book-cloth text-sm font-medium">بصيرة</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {t("auth.forgot.title")}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {t("auth.forgot.subtitle")}
          </p>
        </div>

        <div className="corner-brackets bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="size-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Mail className="size-8 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-lg font-medium text-slate-800 dark:text-slate-200">
                {t("auth.forgot.success")}
              </p>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  {t("auth.forgot.back")}
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t("common.email")}
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  icon={<Mail className="size-4" />}
                  dir="ltr"
                  autoComplete="email"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  t("auth.forgot.submit")
                )}
              </Button>

              <p className="text-center text-sm text-slate-500">
                <Link href="/login" className="text-book-cloth hover:underline font-medium">
                  {t("auth.forgot.back")}
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
