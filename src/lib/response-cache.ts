import { createHash } from "crypto";

interface CacheEntry {
  value: string;
  expiresAt: number;
}

class ResponseCache {
  private store = new Map<string, CacheEntry>();

  hash(input: string): string {
    return createHash("sha256").update(input).digest("hex").slice(0, 16);
  }

  get(key: string): string | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.value;
  }

  set(key: string, value: string, ttlMs: number = 300_000) {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    });

    if (this.store.size > 1_000) {
      this.evict();
    }
  }

  invalidate(key: string) {
    this.store.delete(key);
  }

  invalidatePrefix(prefix: string) {
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) {
        this.store.delete(key);
      }
    }
  }

  private evict() {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
      }
    }

    if (this.store.size > 1_000) {
      const keys = Array.from(this.store.keys());
      const toDelete = keys.slice(0, Math.ceil(keys.length * 0.25));
      for (const key of toDelete) {
        this.store.delete(key);
      }
    }
  }

  stats() {
    return {
      size: this.store.size,
      entries: Array.from(this.store.entries()).map(([key, entry]) => ({
        key,
        ttlRemaining: Math.max(0, entry.expiresAt - Date.now()),
      })),
    };
  }
}

export const responseCache = new ResponseCache();

export function cacheKey(service: string, messages: { role: string; content: string }[], options?: { maxTokens?: number; temperature?: number }): string {
  const payload = JSON.stringify({ service, messages, options });
  return responseCache.hash(payload);
}
