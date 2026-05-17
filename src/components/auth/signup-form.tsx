"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useTranslate } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function SignupForm() {
  const t = useTranslate();
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = t("common.name") + " مطلوب";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = t("auth.login.errorInvalidEmail");
    }
    if (!password || password.length < 6) {
      e.password = t("auth.login.errorInvalidPassword");
    }
    if (password !== confirmPassword) {
      e.confirmPassword = t("auth.signup.errorPasswordMismatch");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const { error } = await signUp(email, password, name);
    setLoading(false);

    if (error) {
      if (error.message?.includes("already")) {
        toast.error(t("auth.signup.errorEmailExists"));
      } else {
        toast.error(t("auth.signup.errorGeneric"));
      }
    } else {
      toast.success(t("auth.signup.success"));
      router.push("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {t("common.name")}
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("common.name")}
          icon={<User className="size-4" />}
          error={errors.name}
          autoComplete="name"
        />
      </div>

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
          autoComplete="new-password"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {t("common.confirmPassword")}
        </label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          icon={<Lock className="size-4" />}
          error={errors.confirmPassword}
          dir="ltr"
          autoComplete="new-password"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          t("auth.signup.submit")
        )}
      </Button>

      <p className="text-center text-sm text-slate-500">
        {t("auth.signup.hasAccount")}{" "}
        <Link href="/login" className="text-book-cloth hover:underline font-medium">
          {t("auth.signup.signIn")}
        </Link>
      </p>
    </form>
  );
}
