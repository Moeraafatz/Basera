"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Video, Loader2, Copy, Check, Sparkles,
  ChevronDown, Camera, Clock,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslate, useLang } from "@/lib/i18n";
import { VIDEO_MODELS, CAMERA_MOVEMENTS, VIDEO_STYLES } from "@/lib/prompts/video-guidelines";

export default function VideoPage() {
  const t = useTranslate();
  const lang = useLang();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedModel, setSelectedModel] = useState("veo-3.1");
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [selectedMovement, setSelectedMovement] = useState("static");
  const [duration, setDuration] = useState("10");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [generationMode, setGenerationMode] = useState<"prompt" | "video">("prompt");

  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsGenerating(true);
    setOutput("");
    setGeneratedVideoUrl("");

    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input,
          model: selectedModel,
          style: selectedStyle,
          cameraMovement: selectedMovement,
          duration,
          language: lang,
          action: generationMode,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      if (generationMode === "video") {
        setGeneratedVideoUrl(data.result.url);
        toast.success(lang === "ar" ? "تم توليد الفيديو!" : "Video generated!");
      } else {
        setOutput(data.result);
        toast.success(lang === "ar" ? "تم توليد أمر الفيديو!" : "Video prompt generated!");
      }
    } catch (err) {
      toast.error(lang === "ar" ? "فشل التوليد" : "Generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success(lang === "ar" ? "تم النسخ!" : "Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-ivory-100">
      {/* Hero */}
      <section ref={heroRef} className="relative pt-16 pb-12 gradient-mesh">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            className="text-center"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-white mb-6">
              <Video className="h-7 w-7" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 font-display-ar">
              {lang === "ar" ? "بصيرة الفيديو" : "Video Insight"}
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {lang === "ar"
                ? "نصوص احترافية لتوليد الفيديو بالذكاء الاصطناعي"
                : "Professional video generation prompts"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="bg-white rounded-2xl border border-ivory-300 p-6 corner-brackets grain-overlay card-depth">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                {lang === "ar" ? "الإدخال" : "Input"}
              </h2>

              {/* Mode Toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setGenerationMode("prompt")}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    generationMode === "prompt"
                      ? "bg-slate-900 text-white"
                      : "bg-ivory-200 text-slate-600 hover:bg-ivory-300"
                  }`}
                >
                  {lang === "ar" ? "أمر نصي" : "Prompt"}
                </button>
                <button
                  onClick={() => setGenerationMode("video")}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    generationMode === "video"
                      ? "bg-slate-900 text-white"
                      : "bg-ivory-200 text-slate-600 hover:bg-ivory-300"
                  }`}
                >
                  {lang === "ar" ? "فيديو فعلي" : "Video"}
                </button>
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === "ar" ? "صِف الفيديو الذي تريد توليده..." : "Describe the video you want to generate..."}
                className="w-full min-h-[150px] rounded-xl bg-ivory-100 border border-ivory-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-book-cloth focus:ring-1 focus:ring-book-cloth/30 resize-none mb-4 transition-colors"
                dir={lang === "ar" ? "rtl" : "ltr"}
              />

              {/* Controls */}
              <div className="space-y-4 mb-6">
                {/* Model */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    {lang === "ar" ? "النموذج" : "Model"}
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowModelDropdown(!showModelDropdown)}
                      className="w-full px-3 py-2 rounded-lg bg-ivory-200 text-sm text-slate-700 flex items-center justify-between hover:bg-ivory-300 transition-colors"
                    >
                      <span>{VIDEO_MODELS.find((m) => m.id === selectedModel)?.name || selectedModel}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {showModelDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-ivory-300 rounded-lg shadow-lg">
                        {VIDEO_MODELS.map((model) => (
                          <button
                            key={model.id}
                            onClick={() => {
                              setSelectedModel(model.id);
                              setShowModelDropdown(false);
                            }}
                            className="w-full px-3 py-2 text-sm text-left hover:bg-ivory-100 flex items-center justify-between"
                          >
                            <span>{model.name}</span>
                            <span className="text-xs text-slate-400">{model.maxDuration}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Style */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    {lang === "ar" ? "النمط" : "Style"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {VIDEO_STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedStyle === style.id
                            ? "bg-slate-900 text-white"
                            : "bg-ivory-200 text-slate-600 hover:bg-ivory-300"
                        }`}
                      >
                        {lang === "ar" ? style.labelAr : style.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Camera Movement */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block flex items-center gap-1.5">
                    <Camera className="h-3.5 w-3.5" />
                    {lang === "ar" ? "حركة الكاميرا" : "Camera Movement"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CAMERA_MOVEMENTS.map((move) => (
                      <button
                        key={move.id}
                        onClick={() => setSelectedMovement(move.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedMovement === move.id
                            ? "bg-slate-900 text-white"
                            : "bg-ivory-200 text-slate-600 hover:bg-ivory-300"
                        }`}
                      >
                        {lang === "ar" ? move.labelAr : move.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {lang === "ar" ? "المدة (ثواني)" : "Duration (seconds)"}
                  </label>
                  <div className="flex gap-2">
                    {["5", "10", "15", "30", "60"].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          duration === d
                            ? "bg-slate-900 text-white"
                            : "bg-ivory-200 text-slate-600 hover:bg-ivory-300"
                        }`}
                      >
                        {d}s
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!input.trim() || isGenerating}
                className="w-full bg-slate-900 text-white h-12 rounded-xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-slate-800 transition-colors"
              >
                {isGenerating ? (
                  <>
                    <span className="diamond-loading"><span /><span /><span /><span /></span>
                    {lang === "ar" ? "جارٍ التوليد..." : "Generating..."}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    {generationMode === "video"
                      ? (lang === "ar" ? "توليد فيديو" : "Generate Video")
                      : (lang === "ar" ? "توليد أمر الفيديو" : "Generate Video Prompt")}
                  </>
                )}
              </button>
            </div>

            {/* Output Panel */}
            <div className="bg-white rounded-2xl border border-ivory-300 p-6 corner-brackets grain-overlay card-depth">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  {lang === "ar" ? "أمر الفيديو" : "Video Prompt"}
                </h2>
                {output && (
                  <button
                    onClick={handleCopy}
                    className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-600" />
                        {lang === "ar" ? "تم النسخ" : "Copied"}
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        {lang === "ar" ? "نسخ" : "Copy"}
                      </>
                    )}
                  </button>
                )}
              </div>

              {generationMode === "video" ? (
                generatedVideoUrl ? (
                  <div className="rounded-xl bg-ivory-100 border border-ivory-300 overflow-hidden">
                    <video
                      src={generatedVideoUrl}
                      controls
                      className="w-full h-auto"
                    />
                    <div className="p-3 flex items-center justify-between bg-white">
                      <span className="text-xs text-slate-500">
                        {lang === "ar" ? "تم التوليد بواسطة Pollinations.ai" : "Generated via Pollinations.ai"}
                      </span>
                      <button
                        onClick={() => window.open(generatedVideoUrl, "_blank")}
                        className="text-xs text-slate-600 hover:text-slate-800 flex items-center gap-1"
                      >
                        <Video className="h-3 w-3" />
                        {lang === "ar" ? "فتح بالحجم الكامل" : "Full size"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[300px] flex items-center justify-center rounded-xl bg-ivory-100 border border-ivory-300">
                    <p className="text-slate-400 text-sm">
                      {lang === "ar" ? "أدخل وصفاً واضغط توليد" : "Enter a description and click Generate"}
                    </p>
                  </div>
                )
              ) : output ? (
                <div className="rounded-xl bg-ivory-100 border border-ivory-300 p-4">
                  <pre className="text-sm text-slate-800 whitespace-pre-wrap font-sans" dir={lang === "ar" ? "rtl" : "ltr"}>
                    {output}
                  </pre>
                </div>
              ) : (
                <div className="min-h-[300px] flex items-center justify-center rounded-xl bg-ivory-100 border border-ivory-300">
                  <p className="text-slate-400 text-sm">
                    {lang === "ar" ? "أدخل وصفاً واضغط توليد" : "Enter a description and click Generate"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
