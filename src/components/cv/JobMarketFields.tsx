"use client";

import { useLang } from "@/lib/i18n";
import { JOB_MARKETS } from "@/data/job-markets";
import { useCVStore } from "@/store/cv-store";

export function JobMarketFields() {
  const lang = useLang();
  const { data, updatePersonal } = useCVStore();

  return (
    <div className="bg-white rounded-2xl border border-ivory-300 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        {lang === "ar" ? "سوق العمل المستهدف" : "Target Job Market"}
      </h3>

      <div className="space-y-4">
        {/* Target Market */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">
            {lang === "ar" ? "المنطقة المستهدفة" : "Target Region"} *
          </label>
          <select
            value={data.personal.targetMarket || ""}
            onChange={(e) => updatePersonal({ targetMarket: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-ivory-100 border border-ivory-300 text-sm text-slate-900 focus:border-book-cloth focus:ring-1 focus:ring-book-cloth/30"
          >
            <option value="">{lang === "ar" ? "اختر المنطقة" : "Select region"}</option>
            {JOB_MARKETS.map((market) => (
              <option key={market.id} value={market.id}>
                {market.name} ({market.region})
              </option>
            ))}
          </select>
        </div>

        {/* Work Authorization */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">
            {lang === "ar" ? "حق العمل" : "Work Authorization"} *
          </label>
          <select
            value={data.personal.workAuth || ""}
            onChange={(e) => updatePersonal({ workAuth: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-ivory-100 border border-ivory-300 text-sm text-slate-900 focus:border-book-cloth focus:ring-1 focus:ring-book-cloth/30"
          >
            <option value="">{lang === "ar" ? "اختر" : "Select"}</option>
            <option value="citizen">{lang === "ar" ? "مواطن" : "Citizen"}</option>
            <option value="pr">{lang === "ar" ? "إقامة دائمة" : "Permanent Resident"}</option>
            <option value="visa">{lang === "ar" ? "تأشيرة عمل" : "Work Visa"}</option>
            <option value="sponsorship">{lang === "ar" ? "يحتاج رعاية" : "Needs Sponsorship"}</option>
            <option value="remote">{lang === "ar" ? "عمل عن بعد" : "Remote"}</option>
          </select>
        </div>

        {/* Remote Preference */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">
            {lang === "ar" ? "تفضيل العمل" : "Work Preference"}
          </label>
          <select
            value={data.personal.workPreference || ""}
            onChange={(e) => updatePersonal({ workPreference: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-ivory-100 border border-ivory-300 text-sm text-slate-900 focus:border-book-cloth focus:ring-1 focus:ring-book-cloth/30"
          >
            <option value="">{lang === "ar" ? "اختر" : "Select"}</option>
            <option value="onsite">{lang === "ar" ? "في المكتب" : "On-site"}</option>
            <option value="hybrid">{lang === "ar" ? "هجين" : "Hybrid"}</option>
            <option value="remote">{lang === "ar" ? "عن بعد" : "Remote"}</option>
            <option value="flexible">{lang === "ar" ? "مرن" : "Flexible"}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
