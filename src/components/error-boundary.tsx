"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorCount: number;
}

const MAX_ERROR_COUNT = 3;

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorCount: 0 };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error("ErrorBoundary caught:", error.message);
    return { hasError: true, error, errorCount: 1 };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error details:", error, errorInfo);
  }

  static getDerivedStateFromProps(props: Props, state: State): State | null {
    if (state.hasError && state.errorCount > MAX_ERROR_COUNT) {
      return { hasError: false, error: null, errorCount: 0 };
    }
    return null;
  }

  render() {
    if (this.state.hasError) {
      const errorMsg = this.state.error?.message || "Unknown error";
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7]" dir="rtl">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">حدث خطأ</h1>
            <p className="text-slate-500 mb-2 text-sm">{errorMsg}</p>
            <p className="text-slate-400 mb-4 text-xs">حدثت مشكلة في تحميل الصفحة</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}