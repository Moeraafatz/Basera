"use client";

import { useTranslate } from "@/lib/i18n";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UsageMeterProps {
  label: string;
  used: number;
  limit: number;
  icon?: React.ReactNode;
  className?: string;
}

export function UsageMeter({ label, used, limit, icon, className }: UsageMeterProps) {
  const t = useTranslate();
  const isUnlimited = limit === -1;
  const percentage = isUnlimited ? 0 : Math.min(100, (used / limit) * 100);
  const isNearLimit = !isUnlimited && percentage >= 80;
  const isExceeded = !isUnlimited && used >= limit;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span
          className={cn(
            "text-sm",
            isExceeded && "text-destructive",
            isNearLimit && !isExceeded && "text-yellow-500"
          )}
        >
          {isUnlimited
            ? t("usage.unlimited")
            : isExceeded
            ? t("usage.exceeded")
            : `${used} / ${limit}`}
        </span>
      </div>
      {!isUnlimited && (
        <Progress
          value={percentage}
          className={cn(
            "h-2",
            isExceeded && "[&>div]:bg-destructive",
            isNearLimit && !isExceeded && "[&>div]:bg-yellow-500"
          )}
        />
      )}
    </div>
  );
}
