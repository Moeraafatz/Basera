"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useTranslate } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function LoginForm() {
  const t = useTranslate();
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = t("auth.login.errorInvalidEmail");
    }
    if (!password || password.length < 6) {
      e.password = t("auth.login.errorInvalidPassword");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast.error(t("auth.login.errorWrongCredentials"));
    } else {
      toast.success(t("common.success"));
      router.push("/dashboard");
    }
  };

  return (
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
          error={errors.email}
          dir="ltr"
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {t("common.password")}
        </label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          icon={<Lock className="size-4" />}
          error={errors.password}
          dir="ltr"
          autoComplete="current-password"
        />
      </div>

      <div className="flex items-center justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-book-cloth hover:underline"
        >
          {t("common.forgotPassword")}
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          t("auth.login.submit")
        )}
      </Button>

      <p className="text-center text-sm text-slate-500">
        {t("auth.login.noAccount")}{" "}
        <Link href="/signup" className="text-book-cloth hover:underline font-medium">
          {t("auth.login.createOne")}
        </Link>
      </p>
    </form>
  );
}
