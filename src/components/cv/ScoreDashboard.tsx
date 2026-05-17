"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { useLang } from "@/lib/i18n";

interface ScoreDashboardProps {
  score: number | null;
  feedback: string[];
  isAnalyzing: boolean;
}

export function ScoreDashboard({ score, feedback, isAnalyzing }: ScoreDashboardProps) {
  const lang = useLang();

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-slate-400";
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number | null) => {
    if (score === null) return lang === "ar" ? "لم يتم التحليل" : "Not analyzed";
    if (score >= 80) return lang === "ar" ? "ممتاز" : "Excellent";
    if (score >= 60) return lang === "ar" ? "جيد" : "Good";
    if (score >= 40) return lang === "ar" ? "يحتاج تحسين" : "Needs improvement";
    return lang === "ar" ? "ضعيف" : "Poor";
  };

  return (
    <div className="bg-white rounded-2xl border border-ivory-300 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        {lang === "ar" ? "لوحة التحليل" : "Analysis Dashboard"}
      </h3>

      {/* Score Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5E4DF"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={score !== null && score >= 60 ? "#22c55e" : score !== null && score >= 40 ? "#eab308" : "#ef4444"}
              strokeWidth="8"
              strokeDasharray={`${(score || 0) * 2.83} 283`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score !== null ? score : "--"}
            </span>
            <span className="text-xs text-slate-500">{getScoreLabel(score)}</span>
          </div>
        </div>
      </div>

      {/* Feedback */}
      {feedback.length > 0 && (
        <div className="space-y-2">
          {feedback.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: lang === "ar" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-2 p-3 rounded-lg bg-ivory-100"
            >
              {item.startsWith("✓") ? (
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              ) : item.startsWith("!") ? (
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              ) : (
                <Info className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
              )}
              <span className="text-sm text-slate-700">{item.replace(/^[✓!]\s*/, "")}</span>
            </motion.div>
          ))}
        </div>
      )}

      {isAnalyzing && (
        <div className="text-center py-4">
          <p className="text-sm text-slate-500">
            {lang === "ar" ? "جارٍ التحليل..." : "Analyzing..."}
          </p>
        </div>
      )}
    </div>
  );
}
