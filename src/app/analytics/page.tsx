"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart3, TrendingUp, DollarSign, Clock, Zap,
  ChevronDown, ArrowUp, ArrowDown, Minus,
} from "lucide-react";
import { useTranslate, useLang } from "@/lib/i18n";
import { useAnalyticsStore } from "@/store/analytics-store";

export default function AnalyticsPage() {
  const t = useTranslate();
  const lang = useLang();

  const {
    usageEntries,
    modelPerformance,
    costEstimates,
    timePeriod,
    setTimePeriod,
    getTotalUsage,
    getTotalEstimatedCost,
    getUsageByService,
  } = useAnalyticsStore();

  const [activeTab, setActiveTab] = useState<"overview" | "models" | "costs">("overview");

  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });

  const totalUsage = getTotalUsage();
  const totalCost = getTotalEstimatedCost();
  const textUsage = getUsageByService("text");
  const cvUsage = getUsageByService("cv");
  const imageUsage = getUsageByService("image");
  const videoUsage = getUsageByService("video");
  const codeUsage = getUsageByService("code");

  const services = [
    { name: lang === "ar" ? "النصوص" : "Text", usage: textUsage, color: "bg-slate-900" },
    { name: lang === "ar" ? "السيرة الذاتية" : "CV", usage: cvUsage, color: "bg-slate-800" },
    { name: lang === "ar" ? "الصور" : "Image", usage: imageUsage, color: "bg-slate-700" },
    { name: lang === "ar" ? "الفيديو" : "Video", usage: videoUsage, color: "bg-slate-600" },
    { name: lang === "ar" ? "الكود" : "Code", usage: codeUsage, color: "bg-slate-500" },
  ];

  const maxUsage = Math.max(...services.map((s) => s.usage), 1);

  return (
    <div className="min-h-screen bg-ivory-100">
      {/* Hero */}
      <section ref={heroRef} className="relative pt-16 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory-200/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            className="text-center"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white mb-6">
              <BarChart3 className="h-7 w-7" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              {lang === "ar" ? "لوحة التحليلات" : "Analytics Dashboard"}
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {lang === "ar"
                ? "تتبع الاستخدام وقارن بين النماذج وقدّر التكاليف"
                : "Track usage, compare models, and estimate costs"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Time Period Selector */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              {[
                { id: "7d", labelAr: "٧ أيام", labelEn: "7 Days" },
                { id: "30d", labelAr: "٣٠ يوم", labelEn: "30 Days" },
                { id: "90d", labelAr: "٩٠ يوم", labelEn: "90 Days" },
              ].map((period) => (
                <button
                  key={period.id}
                  onClick={() => setTimePeriod(period.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timePeriod === period.id
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 hover:bg-ivory-200"
                  }`}
                >
                  {lang === "ar" ? period.labelAr : period.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {[
              { id: "overview", labelAr: "نظرة عامة", labelEn: "Overview", icon: BarChart3 },
              { id: "models", labelAr: "النماذج", labelEn: "Models", icon: TrendingUp },
              { id: "costs", labelAr: "التكاليف", labelEn: "Costs", icon: DollarSign },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 hover:bg-ivory-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {lang === "ar" ? tab.labelAr : tab.labelEn}
                </button>
              );
            })}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-ivory-300 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{totalUsage}</p>
                  <p className="text-sm text-slate-500">
                    {lang === "ar" ? "إجمالي الاستخدام" : "Total Usage"}
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-ivory-300 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-book-cloth flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">${totalCost.toFixed(2)}</p>
                  <p className="text-sm text-slate-500">
                    {lang === "ar" ? "التكلفة المقدرة" : "Estimated Cost"}
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-ivory-300 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-700 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">2.4s</p>
                  <p className="text-sm text-slate-500">
                    {lang === "ar" ? "متوسط الاستجابة" : "Avg Response Time"}
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-ivory-300 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-green-600 flex items-center justify-center">
                      <ArrowUp className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">97%</p>
                  <p className="text-sm text-slate-500">
                    {lang === "ar" ? "معدل النجاح" : "Success Rate"}
                  </p>
                </div>
              </div>

              {/* Usage by Service */}
              <div className="bg-white rounded-2xl border border-ivory-300 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">
                  {lang === "ar" ? "الاستخدام حسب الخدمة" : "Usage by Service"}
                </h3>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.name} className="flex items-center gap-4">
                      <span className="text-sm text-slate-700 w-24">{service.name}</span>
                      <div className="flex-1 h-8 bg-ivory-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${service.color} rounded-full transition-all duration-500`}
                          style={{ width: `${(service.usage / maxUsage) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900 w-12 text-right">
                        {service.usage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Models Tab */}
          {activeTab === "models" && (
            <div className="bg-white rounded-2xl border border-ivory-300 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                {lang === "ar" ? "أداء النماذج" : "Model Performance"}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-ivory-300">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        {lang === "ar" ? "النموذج" : "Model"}
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        {lang === "ar" ? "المزود" : "Provider"}
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">
                        {lang === "ar" ? "الاستخدامات" : "Uses"}
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">
                        {lang === "ar" ? "وقت الاستجابة" : "Response Time"}
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">
                        {lang === "ar" ? "معدل النجاح" : "Success Rate"}
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">
                        {lang === "ar" ? "التكلفة/استخدام" : "Cost/Use"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelPerformance.map((model) => (
                      <tr key={model.model} className="border-b border-ivory-200 hover:bg-ivory-50">
                        <td className="py-3 px-4 text-sm font-medium text-slate-900">{model.model}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{model.provider}</td>
                        <td className="py-3 px-4 text-sm text-center text-slate-900">{model.totalUses}</td>
                        <td className="py-3 px-4 text-sm text-center text-slate-900">{model.avgResponseTime}s</td>
                        <td className="py-3 px-4 text-sm text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            model.successRate >= 97 ? "bg-green-100 text-green-700" :
                            model.successRate >= 95 ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {model.successRate >= 97 ? <ArrowUp className="h-3 w-3" /> :
                             model.successRate >= 95 ? <Minus className="h-3 w-3" /> :
                             <ArrowDown className="h-3 w-3" />}
                            {model.successRate}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-slate-900">${model.costPerUse.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Costs Tab */}
          {activeTab === "costs" && (
            <div className="space-y-8">
              {/* Total Cost */}
              <div className="bg-white rounded-2xl border border-ivory-300 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">
                      {lang === "ar" ? "التكلفة الشهرية المقدرة" : "Estimated Monthly Cost"}
                    </p>
                    <p className="text-4xl font-bold text-slate-900">${totalCost.toFixed(2)}</p>
                  </div>
                  <div className="h-16 w-16 rounded-2xl bg-book-cloth/10 flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-book-cloth" />
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-white rounded-2xl border border-ivory-300 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">
                  {lang === "ar" ? "تفاصيل التكلفة" : "Cost Breakdown"}
                </h3>
                <div className="space-y-4">
                  {costEstimates.map((estimate) => (
                    <div key={`${estimate.service}-${estimate.model}`} className="flex items-center justify-between p-4 rounded-lg bg-ivory-100">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{estimate.service}</p>
                        <p className="text-xs text-slate-500">{estimate.model}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-900">${estimate.estimatedMonthly.toFixed(2)}</p>
                        <p className="text-xs text-slate-500">${estimate.costPer1K}/1K tokens</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
