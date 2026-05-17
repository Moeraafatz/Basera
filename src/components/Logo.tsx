"use client";

import { useLang } from "@/lib/i18n";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  const lang = useLang();

  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="بصيرة"
      >
        <rect width="40" height="40" rx="8" fill="currentColor" />
        <path
          d="M12 14h8c3.3 0 6 2.7 6 6s-2.7 6-6 6h-4v4h-4V14zm4 8h4c1.1 0 2-.9 2-2s-.9-2-2-2h-4v4z"
          fill="white"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 160 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={lang === "ar" ? "بصيرة" : "Baseera"}
    >
      <rect width="40" height="40" rx="8" fill="currentColor" />
      <path
        d="M12 14h8c3.3 0 6 2.7 6 6s-2.7 6-6 6h-4v4h-4V14zm4 8h4c1.1 0 2-.9 2-2s-.9-2-2-2h-4v4z"
        fill="white"
      />
      <text
        x="50"
        y="26"
        fontFamily="IBM Plex Sans Arabic, system-ui, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="0.5"
      >
        {lang === "ar" ? "بصيرة" : "Baseera"}
      </text>
    </svg>
  );
}
