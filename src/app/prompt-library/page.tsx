"use client";

import { useState } from "react";
import { Search, Sparkles, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, PROMPTS } from "@/data/prompt-library";

export default function PromptLibraryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const navCategories = [
    { id: "all", name: "All", icon: "✨" },
    { id: "content", name: "Content", icon: "📝" },
    { id: "social", name: "Social Media", icon: "📱" },
    { id: "marketing", name: "Marketing", icon: "📣" },
    { id: "coding", name: "Coding", icon: "💻" },
    { id: "design", name: "Design", icon: "🎨" },
    { id: "business", name: "Business", icon: "💼" },
    { id: "email", name: "Email", icon: "✉️" },
  ];

  const categoryNameMap: Record<string, string> = {
    blog: "content", newsletter: "content", "long-form": "content", script: "content",
    instagram: "social", tiktok: "social", linkedin: "social", "twitter-x": "social", youtube: "social",
    seo: "marketing", "copywriting": "marketing", advertising: "marketing",
    coding: "coding", "code-review": "coding", documentation: "coding",
    design: "design", ux: "design",
    business: "business", sales: "business",
    email: "email",
  };

  const filteredPrompts = PROMPTS.filter((prompt) => {
    const mappedCategory = categoryNameMap[prompt.category] || categoryNameMap[prompt.subcategory || ""] || prompt.category;
    const matchesCategory = selectedCategory === "all" || mappedCategory === selectedCategory;
    const matchesSearch = !search ||
      prompt.title.toLowerCase().includes(search.toLowerCase()) ||
      prompt.description.toLowerCase().includes(search.toLowerCase()) ||
      (prompt.tags && prompt.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const handleCopy = async (prompt: typeof PROMPTS[0]) => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopiedId(prompt.id);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Prompt <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Library</span>
          </h1>
          <p className="text-gray-600">Browse and use {PROMPTS.length.toLocaleString()}+ pre-built prompts for various use cases.</p>
        </div>

        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {navCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrompts.map((prompt) => (
            <Card
              key={prompt.id}
              className="p-5 bg-white/80 border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleCopy(prompt)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-rose-500" />
                  <h3 className="font-semibold text-gray-900">{prompt.title}</h3>
                </div>
                {copiedId === prompt.id ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">{prompt.description}</p>
              <div className="flex flex-wrap gap-1">
                {prompt.tags?.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} className="bg-gray-100 text-gray-600 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No prompts found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}