"use client";

import { useState, useCallback, useRef } from "react";

interface UseStreamingCompletionOptions {
  onChunk?: (text: string) => void;
  onComplete?: (fullText: string) => void;
  onError?: (error: Error) => void;
}

export function useStreamingCompletion(options?: UseStreamingCompletionOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stream = useCallback(
    async (
      endpoint: string,
      body: Record<string, unknown>,
      streamOptions?: UseStreamingCompletionOptions
    ) => {
      setIsLoading(true);
      setText("");
      setError(null);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify({ ...body, stream: true }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => null);
          throw new Error(errData?.error || `HTTP ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("Streaming not supported by browser");
        }

        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.delta || parsed.text || "";
                if (delta) {
                  fullText += delta;
                  setText(fullText);
                  options?.onChunk?.(fullText);
                  streamOptions?.onChunk?.(fullText);
                }
              } catch {
                fullText += data;
                setText(fullText);
                options?.onChunk?.(fullText);
                streamOptions?.onChunk?.(fullText);
              }
            }
          }
        }

        options?.onComplete?.(fullText);
        streamOptions?.onComplete?.(fullText);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        options?.onError?.(error);
        streamOptions?.onError?.(error);
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [options]
  );

  const stop = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  return { text, isLoading, error, stream, stop };
}
