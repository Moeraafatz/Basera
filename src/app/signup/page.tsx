import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import { DiamondDot } from "@/components/ui/diamond-dot";

export const metadata: Metadata = {
  title: "إنشاء حساب | بصيرة",
  description: "انضم إلى بصيرة واحفظ عملك",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-mesh">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <DiamondDot />
            <span className="text-book-cloth text-sm font-medium">بصيرة</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            أنشئ حسابك
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            انضم إلى بصيرة واحفظ عملك
          </p>
        </div>

        <div className="corner-brackets bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
