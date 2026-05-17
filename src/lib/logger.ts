interface LogContext {
  requestId?: string;
  method?: string;
  path?: string;
  service?: string;
  provider?: string;
  duration?: number;
  [key: string]: unknown;
}

class Logger {
  private formatEntry(
    level: "info" | "warn" | "error",
    message: string,
    context?: LogContext
  ): string {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...context,
    });
  }

  info(message: string, context?: LogContext) {
    console.log(this.formatEntry("info", message, context));
  }

  warn(message: string, context?: LogContext) {
    console.warn(this.formatEntry("warn", message, context));
  }

  error(message: string, context?: LogContext) {
    console.error(this.formatEntry("error", message, context));
  }

  requestStart(requestId: string, method: string, path: string) {
    this.info("Request started", { requestId, method, path });
  }

  requestEnd(requestId: string, method: string, path: string, status: number, duration: number) {
    this.info("Request completed", { requestId, method, path, status, duration });
  }

  requestError(requestId: string, method: string, path: string, error: Error, duration: number) {
    this.error("Request failed", {
      requestId,
      method,
      path,
      duration,
      errorMessage: error.message,
      stack: error.stack,
    });
  }

  providerCall(provider: string, model: string, service: string) {
    this.info("Provider call", { provider, model, service });
  }

  providerFallback(provider: string, model: string, error: string) {
    this.warn("Provider failed, falling back", { provider, model, error });
  }

  rateLimitExceeded(identifier: string, path: string) {
    this.warn("Rate limit exceeded", { identifier, path });
  }
}

export const logger = new Logger();
