import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm transition-colors",
            "placeholder:text-slate-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-book-cloth/50 focus-visible:border-book-cloth",
            "disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pr-10",
            error && "border-error focus-visible:ring-error/50 focus-visible:border-error",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-error">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
