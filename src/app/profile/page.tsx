"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Globe, Save, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useTranslate, useLang, useSetLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ProfilePage() {
  const t = useTranslate();
  const router = useRouter();
  const lang = useLang();
  const setLang = useSetLang();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const updatePassword = useAuthStore((s) => s.updatePassword);
  const signOut = useAuthStore((s) => s.signOut);

  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.name || "");
    }
  }, [user]);

  if (isLoading) return null;
  if (!isAuthenticated) return null;

  const handleSaveProfile = async () => {
    setSaving(true);
    const { error } = await updateProfile({
      name,
      language: lang,
    });
    setSaving(false);

    if (error) {
      toast.error(t("common.error"));
    } else {
      toast.success(t("profile.saved"));
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error(t("auth.signup.errorPasswordMismatch"));
      return;
    }
    if (newPassword.length < 6) {
      toast.error(t("auth.login.errorInvalidPassword"));
      return;
    }

    setChangingPassword(true);
    const { error } = await updatePassword(newPassword);
    setChangingPassword(false);

    if (error) {
      toast.error(t("common.error"));
    } else {
      toast.success(t("profile.saved"));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm(t("dashboard.confirmDelete"))) return;
    await signOut();
    router.push("/");
  };

  const handleLangToggle = (checked: boolean) => {
    setLang(checked ? "en" : "ar");
  };

  return (
    <div className="min-h-screen px-4 py-12 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {t("profile.title")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {t("profile.subtitle")}
        </p>
      </div>

      {/* Profile Info */}
      <div className="corner-brackets bg-white dark:bg-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="size-16 rounded-full bg-book-cloth text-white text-2xl font-bold flex items-center justify-center">
            {(name || user?.email || "U").charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {name || user?.email}
            </p>
            <p className="text-sm text-slate-400" dir="ltr">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>{t("profile.name")}</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("common.name")}
            icon={<User className="size-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>{t("profile.email")}</Label>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-500">
            <Mail className="size-4" />
            <span dir="ltr">{user?.email}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label>{t("profile.language")}</Label>
          <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
            <div className="flex items-center gap-2">
              <Globe className="size-4 text-slate-400" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                {lang === "ar" ? t("profile.arabic") : t("profile.english")}
              </span>
            </div>
            <Switch
              checked={lang === "en"}
              onCheckedChange={handleLangToggle}
            />
          </div>
        </div>

        <Button onClick={handleSaveProfile} disabled={saving} className="w-full">
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <Save className="size-4" />
              {t("profile.saveChanges")}
            </>
          )}
        </Button>
      </div>

      {/* Change Password */}
      <div className="corner-brackets bg-white dark:bg-slate-800 rounded-xl p-6 mt-6 space-y-5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Lock className="size-5 text-book-cloth" />
          {t("profile.changePassword")}
        </h2>

        <div className="space-y-2">
          <Label>{t("profile.newPassword")}</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            dir="ltr"
            autoComplete="new-password"
          />
        </div>

        <div className="space-y-2">
          <Label>{t("profile.confirmNewPassword")}</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            dir="ltr"
            autoComplete="new-password"
          />
        </div>

        <Button
          onClick={handleChangePassword}
          disabled={changingPassword || !newPassword}
          variant="outline"
          className="w-full"
        >
          {changingPassword ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            t("profile.changePassword")
          )}
        </Button>
      </div>

      {/* Danger Zone */}
      <div className="border border-error/20 rounded-xl p-6 mt-6">
        <h2 className="text-lg font-semibold text-error mb-2">
          {t("profile.deleteAccount")}
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          {t("profile.deleteWarning")}
        </p>
        <Button
          onClick={handleDeleteAccount}
          variant="destructive"
          size="sm"
        >
          {t("profile.deleteAccount")}
        </Button>
      </div>
    </div>
  );
}
