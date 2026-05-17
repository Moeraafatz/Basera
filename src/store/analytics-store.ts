import { create } from "zustand";

export interface UsageEntry {
  id: string;
  timestamp: number;
  service: "text" | "cv" | "image" | "video" | "code";
  model: string;
  tokensUsed: number;
  level?: string;
}

export interface ModelPerformance {
  model: string;
  provider: string;
  totalUses: number;
  avgResponseTime: number;
  successRate: number;
  costPerUse: number;
}

export interface CostEstimate {
  service: string;
  model: string;
  costPer1K: number;
  estimatedMonthly: number;
}

export interface AnalyticsStore {
  // Usage tracking
  usageEntries: UsageEntry[];
  addUsageEntry: (entry: Omit<UsageEntry, "id" | "timestamp">) => void;
  getUsageByService: (service: string) => number;
  getUsageByModel: (model: string) => number;
  getTotalUsage: () => number;

  // Model performance
  modelPerformance: ModelPerformance[];
  updateModelPerformance: (model: string, data: Partial<ModelPerformance>) => void;

  // Cost estimation
  costEstimates: CostEstimate[];
  getTotalEstimatedCost: () => number;

  // Time period
  timePeriod: "7d" | "30d" | "90d";
  setTimePeriod: (period: "7d" | "30d" | "90d") => void;

  // A/B testing
  abTests: {
    id: string;
    name: string;
    variantA: string;
    variantB: string;
    results: { a: number; b: number };
  }[];
  addAbTest: (test: Omit<AnalyticsStore["abTests"][0], "id">) => void;

  // Loading state
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const MODEL_COSTS: Record<string, number> = {
  "claude-sonnet-4": 0.015,
  "claude-opus-4": 0.02,
  "gemini-2.5-pro": 0.008,
  "gpt-4o": 0.01,
  "deepseek-chat": 0.003,
  "llama-3.3-70b": 0.005,
  "flux": 0.03,
  "dall-e-3": 0.04,
};

export const useAnalyticsStore = create<AnalyticsStore>()((set, get) => ({
  usageEntries: [],

  addUsageEntry: (entry) => set((state) => ({
    usageEntries: [
      ...state.usageEntries,
      { ...entry, id: `usage-${Date.now()}`, timestamp: Date.now() },
    ],
  })),

  getUsageByService: (service) => {
    const state = get();
    return state.usageEntries.filter((e) => e.service === service).length;
  },

  getUsageByModel: (model) => {
    const state = get();
    return state.usageEntries.filter((e) => e.model === model).length;
  },

  getTotalUsage: () => {
    const state = get();
    return state.usageEntries.length;
  },

  modelPerformance: [
    { model: "Claude Sonnet 4", provider: "Anthropic", totalUses: 0, avgResponseTime: 2.5, successRate: 98, costPerUse: 0.015 },
    { model: "Claude Opus 4", provider: "Anthropic", totalUses: 0, avgResponseTime: 3.2, successRate: 97, costPerUse: 0.02 },
    { model: "Gemini 2.5 Pro", provider: "Google", totalUses: 0, avgResponseTime: 1.8, successRate: 99, costPerUse: 0.008 },
    { model: "DeepSeek Chat", provider: "DeepSeek", totalUses: 0, avgResponseTime: 2.0, successRate: 96, costPerUse: 0.003 },
  ],

  updateModelPerformance: (model, data) => set((state) => ({
    modelPerformance: state.modelPerformance.map((m) =>
      m.model === model ? { ...m, ...data } : m
    ),
  })),

  costEstimates: [
    { service: "Text", model: "Claude Sonnet 4", costPer1K: 0.015, estimatedMonthly: 4.5 },
    { service: "Text", model: "Claude Opus 4", costPer1K: 0.02, estimatedMonthly: 6.0 },
    { service: "Image", model: "FLUX", costPer1K: 0.03, estimatedMonthly: 9.0 },
    { service: "Video", model: "VEO3", costPer1K: 0.05, estimatedMonthly: 15.0 },
    { service: "Code", model: "Claude Sonnet 4", costPer1K: 0.015, estimatedMonthly: 4.5 },
  ],

  getTotalEstimatedCost: () => {
    const state = get();
    return state.costEstimates.reduce((sum, e) => sum + e.estimatedMonthly, 0);
  },

  timePeriod: "30d",
  setTimePeriod: (period) => set({ timePeriod: period }),

  abTests: [],
  addAbTest: (test) => set((state) => ({
    abTests: [...state.abTests, { ...test, id: `ab-${Date.now()}` }],
  })),

  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
}));
