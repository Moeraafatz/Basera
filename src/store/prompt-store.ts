import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/auth-store";

export type PromptLevel = "simple" | "advanced" | "expert";

export interface PromptVersion {
  id: string;
  content: string;
  timestamp: number;
  model: string;
  level: PromptLevel;
}

export interface PromptStore {
  inputText: string;
  setInputText: (text: string) => void;

  level: PromptLevel;
  setLevel: (level: PromptLevel) => void;

  category: string;
  setCategory: (cat: string) => void;

  selectedModel: string;
  setSelectedModel: (model: string) => void;

  outputText: string;
  setOutputText: (text: string) => void;

  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;

  versions: PromptVersion[];
  addVersion: (version: Omit<PromptVersion, "id" | "timestamp">) => void;
  setCurrentVersion: (id: string) => void;
  currentVersionId: string | null;

  liveEdit: {
    isEditing: boolean;
    section: string | null;
    content: string;
  };
  startEdit: (section: string, content: string) => void;
  updateEditContent: (content: string) => void;
  cancelEdit: () => void;
  saveEdit: () => void;

  // Supabase sync
  syncToSupabase: () => Promise<void>;
  loadFromSupabase: () => Promise<void>;
  isSyncing: boolean;
}

export const usePromptStore = create<PromptStore>()((set, get) => ({
  inputText: "",
  setInputText: (text) => set({ inputText: text }),

  level: "advanced",
  setLevel: (level) => set({ level }),

  category: "content",
  setCategory: (cat) => set({ category: cat }),

  selectedModel: "claude-sonnet-4",
  setSelectedModel: (model) => set({ selectedModel: model }),

  outputText: "",
  setOutputText: (text) => set({ outputText: text }),

  isGenerating: false,
  setIsGenerating: (value) => set({ isGenerating: value }),

  versions: [],
  addVersion: (version) => set((state) => {
    const newVersion = {
      ...version,
      id: `v${Date.now()}`,
      timestamp: Date.now(),
    };
    return {
      versions: [...state.versions, newVersion],
      currentVersionId: newVersion.id,
    };
  }),
  setCurrentVersion: (id) => set({ currentVersionId: id }),
  currentVersionId: null,

  liveEdit: {
    isEditing: false,
    section: null,
    content: "",
  },

  startEdit: (section, content) => set({
    liveEdit: {
      isEditing: true,
      section,
      content,
    },
  }),

  updateEditContent: (content) => set((state) => ({
    liveEdit: {
      ...state.liveEdit,
      content,
    },
  })),

  cancelEdit: () => set({
    liveEdit: {
      isEditing: false,
      section: null,
      content: "",
    },
  }),

  saveEdit: () => {
    const state = get();
    if (state.liveEdit.section) {
      const updatedOutput = state.outputText.replace(
        new RegExp(`## ${state.liveEdit.section}[\\s\\S]*?(?=##|$)`),
        `## ${state.liveEdit.section}\n${state.liveEdit.content}\n\n`
      );
      set({ outputText: updatedOutput });
    }
    set({
      liveEdit: {
        isEditing: false,
        section: null,
        content: "",
      },
    });
  },

  isSyncing: false,

  syncToSupabase: async () => {
    const supabase = createClient();
    if (!supabase) return;

    set({ isSyncing: true });
    const state = get();

    await supabase.from("prompts").insert({
      service: "text",
      input: state.inputText,
      output: state.outputText,
      model: state.selectedModel,
      level: state.level,
      category: state.category,
    });

    set({ isSyncing: false });
  },

  loadFromSupabase: async () => {
    const supabase = createClient();
    if (!supabase) return;

    set({ isSyncing: true });
    const { data } = await supabase
      .from("prompts")
      .select("*")
      .eq("service", "text")
      .order("created_at", { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      const prompt = data[0];
      set({
        inputText: prompt.input || "",
        outputText: prompt.output || "",
        selectedModel: prompt.model || "claude-sonnet-4",
        level: prompt.level || "advanced",
        category: prompt.category || "content",
      });
    }

    set({ isSyncing: false });
  },
}));
