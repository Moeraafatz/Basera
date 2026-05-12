import { create } from "zustand";

export type PromptLevel = "simple" | "advanced" | "expert";

export interface PromptStore {
  inputText: string;
  setInputText: (text: string) => void;
  level: PromptLevel;
  setLevel: (level: PromptLevel) => void;
  category: string;
  setCategory: (cat: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export const usePromptStore = create<PromptStore>()((set) => ({
  inputText: "",
  setInputText: (text) => set({ inputText: text }),
  level: "advanced",
  setLevel: (level) => set({ level }),
  category: "Content Creation",
  setCategory: (cat) => set({ category: cat }),
  selectedModel: "chatgpt",
  setSelectedModel: (model) => set({ selectedModel: model }),
}));
