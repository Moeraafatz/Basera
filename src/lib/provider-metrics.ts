interface ProviderMetric {
  provider: string;
  model: string;
  service: string;
  success: boolean;
  duration: number;
  error?: string;
  timestamp: number;
}

interface ProviderStats {
  totalCalls: number;
  successCount: number;
  failureCount: number;
  fallbackCount: number;
  avgDuration: number;
  errorRate: number;
}

interface ServiceStats {
  totalCalls: number;
  successCount: number;
  primaryProvider: string;
  fallbackCount: number;
  avgDuration: number;
}

class ProviderMetrics {
  private metrics: ProviderMetric[] = [];
  private readonly maxEntries = 10_000;

  record(metric: Omit<ProviderMetric, "timestamp">) {
    this.metrics.push({ ...metric, timestamp: Date.now() });

    if (this.metrics.length > this.maxEntries) {
      this.metrics = this.metrics.slice(-this.maxEntries);
    }
  }

  getProviderStats(provider?: string): Record<string, ProviderStats> {
    const filtered = provider
      ? this.metrics.filter((m) => m.provider === provider)
      : this.metrics;

    const grouped = new Map<string, ProviderMetric[]>();
    for (const m of filtered) {
      const key = `${m.provider}/${m.model}`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(m);
    }

    const stats: Record<string, ProviderStats> = {};
    for (const [key, metrics] of grouped) {
      const successCount = metrics.filter((m) => m.success).length;
      const failureCount = metrics.filter((m) => !m.success).length;
      const totalDuration = metrics.reduce((sum, m) => sum + m.duration, 0);

      stats[key] = {
        totalCalls: metrics.length,
        successCount,
        failureCount,
        fallbackCount: failureCount,
        avgDuration: totalDuration / metrics.length,
        errorRate: failureCount / metrics.length,
      };
    }

    return stats;
  }

  getServiceStats(service?: string): Record<string, ServiceStats> {
    const filtered = service
      ? this.metrics.filter((m) => m.service === service)
      : this.metrics;

    const grouped = new Map<string, ProviderMetric[]>();
    for (const m of filtered) {
      if (!grouped.has(m.service)) grouped.set(m.service, []);
      grouped.get(m.service)!.push(m);
    }

    const stats: Record<string, ServiceStats> = {};
    for (const [svc, metrics] of grouped) {
      const successCount = metrics.filter((m) => m.success).length;
      const totalDuration = metrics.reduce((sum, m) => sum + m.duration, 0);

      const successMetrics = metrics.filter((m) => m.success);
      const primaryProvider =
        successMetrics.length > 0
          ? successMetrics[0].provider
          : metrics[0].provider;

      stats[svc] = {
        totalCalls: metrics.length,
        successCount,
        primaryProvider,
        fallbackCount: metrics.length - successCount,
        avgDuration: totalDuration / metrics.length,
      };
    }

    return stats;
  }

  getRecentFailures(limit = 20): ProviderMetric[] {
    return this.metrics
      .filter((m) => !m.success)
      .slice(-limit)
      .reverse();
  }

  getHealthSummary() {
    const recent = this.metrics.slice(-1000);
    const totalCalls = recent.length;
    const successCount = recent.filter((m) => m.success).length;
    const failureCount = totalCalls - successCount;

    const providerBreakdown: Record<string, { success: number; failure: number }> = {};
    for (const m of recent) {
      if (!providerBreakdown[m.provider]) {
        providerBreakdown[m.provider] = { success: 0, failure: 0 };
      }
      if (m.success) {
        providerBreakdown[m.provider].success++;
      } else {
        providerBreakdown[m.provider].failure++;
      }
    }

    return {
      totalCalls,
      successCount,
      failureCount,
      successRate: totalCalls > 0 ? successCount / totalCalls : 0,
      providerBreakdown,
      window: "last 1000 calls",
    };
  }

  clear() {
    this.metrics = [];
  }
}

export const providerMetrics = new ProviderMetrics();
