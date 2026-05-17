import OpenAI from "openai";
import { logger } from "./logger";
import { providerMetrics } from "./provider-metrics";

export interface StreamChunk {
  text: string;
  done: boolean;
  provider: string;
  model: string;
}

export type StreamCallback = (chunk: StreamChunk) => void;

export async function streamCompletion(
  service: string,
  messages: { role: string; content: string }[],
  onChunk: StreamCallback,
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const routes = getRoutesForService(service);
  if (!routes || routes.length === 0) {
    throw new Error(`No routes configured for service: ${service}`);
  }

  const errors: string[] = [];

  for (const route of routes) {
    const config = getProviderConfig(route.provider);
    if (!config?.apiKey) {
      errors.push(`[${route.provider}] no API key`);
      continue;
    }

    try {
      logger.providerCall(route.provider, route.model, service);
      const startTime = Date.now();
      let fullText = "";

      if (route.provider === "google") {
        fullText = await streamGemini(
          config.apiKey,
          route.model,
          messages,
          (text) => {
            fullText += text;
            onChunk({ text, done: false, provider: route.provider, model: route.model });
          },
          options
        );
      } else if (route.provider === "pollinations") {
        fullText = await streamPollinations(
          config.apiKey,
          route.model,
          messages,
          (text) => {
            fullText += text;
            onChunk({ text, done: false, provider: route.provider, model: route.model });
          },
          options
        );
      } else {
        fullText = await streamOpenAICompatible(
          config.baseURL,
          config.apiKey,
          route.model,
          messages,
          (text) => {
            fullText += text;
            onChunk({ text, done: false, provider: route.provider, model: route.model });
          },
          options
        );
      }

      onChunk({ text: "", done: true, provider: route.provider, model: route.model });

      const duration = Date.now() - startTime;
      logger.info("Stream succeeded", {
        provider: route.provider,
        model: route.model,
        service,
        duration,
        tokens: fullText.length,
      });

      providerMetrics.record({
        provider: route.provider,
        model: route.model,
        service,
        success: true,
        duration,
      });

      return fullText;
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

async function streamOpenAICompatible(
  baseURL: string,
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[],
  onToken: (text: string) => void,
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const client = new OpenAI({ apiKey, baseURL });

  const stream = await client.chat.completions.create({
    model,
    messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
    max_tokens: options?.maxTokens ?? 4096,
    temperature: options?.temperature ?? 0.7,
    stream: true,
  });

  let fullText = "";
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) {
      fullText += delta;
      onToken(delta);
    }
  }

  return fullText.trim();
}

async function streamGemini(
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[],
  onToken: (text: string) => void,
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const geminiModel = genAI.getGenerativeModel({
    model,
    generationConfig: {
      maxOutputTokens: options?.maxTokens ?? 4096,
      temperature: options?.temperature ?? 0.7,
    },
  });

  const lastUserMsg = messages.filter((m) => m.role === "user").pop();
  const prompt = lastUserMsg?.content || "";

  const result = await geminiModel.generateContentStream(prompt);
  let fullText = "";

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) {
      fullText += text;
      onToken(text);
    }
  }

  return fullText.trim();
}

async function streamPollinations(
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[],
  onToken: (text: string) => void,
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  return streamOpenAICompatible(
    "https://api.pollinations.ai/v1",
    apiKey,
    model,
    messages,
    onToken,
    options
  );
}

function getRoutesForService(service: string) {
  const serviceMap: Record<string, { provider: string; model: string; priority: number }[]> = {
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

  return serviceMap[service] || [];
}

function getProviderConfig(provider: string) {
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
