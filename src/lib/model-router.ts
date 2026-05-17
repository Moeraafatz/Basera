import OpenAI from "openai";
import { logger } from "./logger";
import { responseCache, cacheKey } from "./response-cache";
import { providerMetrics } from "./provider-metrics";

/**
 * Model Router — distributes AI requests across all configured providers.
 *
 * Providers (from .env.local):
 * - OpenRouter (OPENAI_API_KEY) — gateway to Claude, GPT, Gemini, Llama, etc.
 * - Google AI Studio (GOOGLE_AI_STUDIO_KEY) — Gemini native
 * - Groq (GROQ_API_KEY) — ultra-low latency Llama
 * - Cerebras (CEREBRAS_API_KEY) — high-throughput Llama
 * - DeepSeek (DEEPSEEK_API_KEY) — best reasoning, 1M context
 * - Pollinations (POLLINATIONS_API_KEY) — image generation
 */

type Service =
  | "text-generate"
  | "text-optimize"
  | "text-edit"
  | "image-prompt"
  | "video-prompt"
  | "humanize"
  | "cv-analyze"
  | "cv-enhance"
  | "image-analyze"
  | "code-generate"
  | "image-generate";

interface ModelRoute {
  provider: "openrouter" | "google" | "groq" | "cerebras" | "deepseek" | "pollinations";
  model: string;
  priority: number;
}

const ROUTES: Record<Service, ModelRoute[]> = {
  "text-generate": [
    { provider: "openrouter", model: "anthropic/claude-sonnet-4", priority: 1 },
    { provider: "google", model: "gemini-2.0-flash", priority: 2 },
    { provider: "deepseek", model: "deepseek-chat", priority: 3 },
    { provider: "groq", model: "llama-3.3-70b-versatile", priority: 4 },
    { provider: "cerebras", model: "llama3.1-70b", priority: 5 },
  ],
  "text-optimize": [
    { provider: "openrouter", model: "anthropic/claude-sonnet-4", priority: 1 },
    { provider: "google", model: "gemini-2.0-flash", priority: 2 },
    { provider: "deepseek", model: "deepseek-chat", priority: 3 },
    { provider: "groq", model: "llama-3.3-70b-versatile", priority: 4 },
  ],
  "text-edit": [
    { provider: "groq", model: "llama-3.3-70b-versatile", priority: 1 },
    { provider: "cerebras", model: "llama3.1-70b", priority: 2 },
    { provider: "openrouter", model: "openai/gpt-4o-mini", priority: 3 },
  ],
  "image-prompt": [
    { provider: "openrouter", model: "anthropic/claude-sonnet-4", priority: 1 },
    { provider: "google", model: "gemini-2.0-flash", priority: 2 },
    { provider: "groq", model: "llama-3.3-70b-versatile", priority: 3 },
    { provider: "deepseek", model: "deepseek-chat", priority: 4 },
  ],
  "video-prompt": [
    { provider: "openrouter", model: "anthropic/claude-sonnet-4", priority: 1 },
    { provider: "google", model: "gemini-2.0-flash", priority: 2 },
    { provider: "groq", model: "llama-3.3-70b-versatile", priority: 3 },
    { provider: "deepseek", model: "deepseek-chat", priority: 4 },
  ],
  humanize: [
    { provider: "groq", model: "llama-3.3-70b-versatile", priority: 1 },
    { provider: "cerebras", model: "llama3.1-70b", priority: 2 },
    { provider: "deepseek", model: "deepseek-chat", priority: 3 },
  ],
  "cv-analyze": [
    { provider: "openrouter", model: "anthropic/claude-sonnet-4", priority: 1 },
    { provider: "google", model: "gemini-2.0-flash", priority: 2 },
    { provider: "groq", model: "llama-3.3-70b-versatile", priority: 3 },
    { provider: "cerebras", model: "llama3.1-70b", priority: 4 },
    { provider: "deepseek", model: "deepseek-chat", priority: 5 },
  ],
  "cv-enhance": [
    { provider: "openrouter", model: "anthropic/claude-sonnet-4", priority: 1 },
    { provider: "google", model: "gemini-2.0-flash", priority: 2 },
    { provider: "groq", model: "llama-3.3-70b-versatile", priority: 3 },
    { provider: "cerebras", model: "llama3.1-70b", priority: 4 },
    { provider: "deepseek", model: "deepseek-chat", priority: 5 },
  ],
  "image-analyze": [
    { provider: "groq", model: "llama-3.3-70b-versatile", priority: 1 },
    { provider: "cerebras", model: "llama3.1-70b", priority: 2 },
    { provider: "openrouter", model: "openai/gpt-4o-mini", priority: 3 },
  ],
  "code-generate": [
    { provider: "openrouter", model: "anthropic/claude-sonnet-4", priority: 1 },
    { provider: "google", model: "gemini-2.0-flash", priority: 2 },
    { provider: "deepseek", model: "deepseek-chat", priority: 3 },
    { provider: "groq", model: "llama-3.3-70b-versatile", priority: 4 },
  ],
  "image-generate": [
    { provider: "pollinations", model: "flux", priority: 1 },
    { provider: "pollinations", model: "dall-e-3", priority: 2 },
  ],
};

interface ProviderClient {
  baseURL: string;
  apiKey: string | undefined;
}

function getProviderConfig(provider: string): ProviderClient | null {
  switch (provider) {
    case "openrouter":
      return {
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENAI_API_KEY,
      };
    case "google":
      return {
        baseURL: "",
        apiKey: process.env.GOOGLE_AI_STUDIO_KEY || process.env.GOOGLE_API_KEY,
      };
    case "groq":
      return {
        baseURL: "https://api.groq.com/openai/v1",
        apiKey: process.env.GROQ_API_KEY,
      };
    case "cerebras":
      return {
        baseURL: "https://api.cerebras.ai/v1",
        apiKey: process.env.CEREBRAS_API_KEY,
      };
    case "deepseek":
      return {
        baseURL: "https://api.deepseek.com/v1",
        apiKey: process.env.DEEPSEEK_API_KEY,
      };
    case "pollinations":
      return {
        baseURL: "https://api.pollinations.ai/v1",
        apiKey: process.env.POLLINATIONS_API_KEY,
      };
    default:
      return null;
  }
}

async function callWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 2,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (i < maxRetries) {
        const delay = baseDelay * Math.pow(2, i);
        logger.warn(`Retry attempt ${i + 1}/${maxRetries} after ${delay}ms`, {
          error: lastError.message,
        });
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
}

export async function routeCompletion(
  service: Service,
  messages: { role: string; content: string }[],
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const routes = ROUTES[service];
  if (!routes || routes.length === 0) {
    throw new Error(`No routes configured for service: ${service}`);
  }

  const key = cacheKey(service, messages, options);
  const cached = responseCache.get(key);
  if (cached) {
    logger.info("Cache hit", { service, key });
    return cached;
  }

  const errors: string[] = [];

  for (const route of routes) {
    const config = getProviderConfig(route.provider);
    if (!config?.apiKey) {
      errors.push(`[${route.provider}] no API key`);
      providerMetrics.record({
        provider: route.provider,
        model: route.model,
        service,
        success: false,
        duration: 0,
        error: "no API key",
      });
      continue;
    }

    try {
      logger.providerCall(route.provider, route.model, service);
      let result: string;
      const startTime = Date.now();
      if (route.provider === "google") {
        result = await callWithRetry(
          () => callGemini(config.apiKey!, route.model, messages, options),
          2,
          1000
        );
      } else if (route.provider === "pollinations") {
        result = await callWithRetry(
          () => callPollinations(config.apiKey!, route.model, messages, options),
          2,
          1000
        );
      } else {
        result = await callWithRetry(
          () => callOpenAICompatible(config.baseURL, config.apiKey!, route.model, messages, options),
          2,
          1000
        );
      }

      const duration = Date.now() - startTime;
      logger.info("Provider call succeeded", {
        provider: route.provider,
        model: route.model,
        service,
        duration,
      });

      providerMetrics.record({
        provider: route.provider,
        model: route.model,
        service,
        success: true,
        duration,
      });

      responseCache.set(key, result, 300_000);

      return result;
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      errors.push(`[${route.provider}/${route.model}] ${errMsg}`);
      logger.providerFallback(route.provider, route.model, errMsg);

      providerMetrics.record({
        provider: route.provider,
        model: route.model,
        service,
        success: false,
        duration: 0,
        error: errMsg,
      });

      continue;
    }
  }

  throw new Error(`All routes failed for ${service}:\n${errors.join("\n")}`);
}

async function callOpenAICompatible(
  baseURL: string,
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[],
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const client = new OpenAI({ apiKey, baseURL });

  const completion = await client.chat.completions.create({
    model,
    messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
    max_tokens: options?.maxTokens ?? 2048,
    temperature: options?.temperature ?? 0.7,
  });

  return completion.choices[0]?.message?.content?.trim() || "";
}

async function callGemini(
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[],
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const geminiModel = genAI.getGenerativeModel({
    model,
    generationConfig: {
      maxOutputTokens: options?.maxTokens ?? 2048,
      temperature: options?.temperature ?? 0.7,
    },
  });

  const lastUserMsg = messages.filter((m) => m.role === "user").pop();
  const prompt = lastUserMsg?.content || "";

  const result = await geminiModel.generateContent(prompt);
  return result.response.text().trim();
}

async function callPollinations(
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[],
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  return callOpenAICompatible(
    "https://api.pollinations.ai/v1",
    apiKey,
    model,
    messages,
    options
  );
}

export function getDefaultModel(service: Service): string {
  const route = ROUTES[service]?.[0];
  if (!route) return "unknown";
  return `${route.provider}/${route.model}`;
}

export function getAvailableProviders(): string[] {
  const providers = ["openrouter", "google", "groq", "cerebras", "deepseek", "pollinations"];
  return providers.filter((p) => {
    const config = getProviderConfig(p);
    return !!config?.apiKey;
  });
}

export type { Service };
