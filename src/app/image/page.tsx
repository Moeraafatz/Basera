"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Image as ImageIcon, Loader2, Copy, Check, Sparkles,
  ChevronDown, Zap, Lightbulb, Camera,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslate, useLang } from "@/lib/i18n";
import { IMAGE_MODELS, IMAGE_STYLES, LIGHTING_TYPES, CAMERA_ANGLES } from "@/lib/prompts/image-guidelines";

export default function ImagePage() {
  const t = useTranslate();
  const lang = useLang();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedModel, setSelectedModel] = useState("imagen-4");
  const [selectedStyle, setSelectedStyle] = useState("photorealistic");
  const [selectedLighting, setSelectedLighting] = useState("natural");
  const [selectedCamera, setSelectedCamera] = useState("eye-level");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [generationMode, setGenerationMode] = useState<"prompt" | "image">("prompt");
  const [imageSize, setImageSize] = useState("1024x1024");

  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsGenerating(true);
    setOutput("");
    setGeneratedImageUrl("");

    try {
      const res = await fetch("/api/image/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input,
          model: selectedModel,
          style: selectedStyle,
          lighting: selectedLighting,
          camera: selectedCamera,
          language: lang,
          action: generationMode,
          size: generationMode === "image" ? imageSize : undefined,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      if (generationMode === "image") {
        setGeneratedImageUrl(data.result.url);
        toast.success(lang === "ar" ? "تم توليد الصورة!" : "Image generated!");
      } else {
        setOutput(data.result);
        toast.success(lang === "ar" ? "تم توليد أمر الصورة!" : "Image prompt generated!");
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
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-700 text-white mb-6">
              <ImageIcon className="h-7 w-7" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 font-display-ar">
              {lang === "ar" ? "بصيرة الصور" : "Image Insight"}
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {lang === "ar"
                ? "أنشئ نصوصاً إبداعية لتوليد الصور بالذكاء الاصطناعي"
                : "Create stunning AI image generation prompts"}
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
                  onClick={() => setGenerationMode("image")}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    generationMode === "image"
                      ? "bg-slate-900 text-white"
                      : "bg-ivory-200 text-slate-600 hover:bg-ivory-300"
                  }`}
                >
                  {lang === "ar" ? "صورة فعلية" : "Image"}
                </button>
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === "ar" ? "صِف الصورة التي تريد توليدها..." : "Describe the image you want to generate..."}
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
                      <span>{IMAGE_MODELS.find((m) => m.id === selectedModel)?.name || selectedModel}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {showModelDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-ivory-300 rounded-lg shadow-lg">
                        {IMAGE_MODELS.map((model) => (
                          <button
                            key={model.id}
                            onClick={() => {
                              setSelectedModel(model.id);
                              setShowModelDropdown(false);
                            }}
                            className="w-full px-3 py-2 text-sm text-left hover:bg-ivory-100 flex items-center justify-between"
                          >
                            <span>{model.name}</span>
                            <span className="text-xs text-slate-400">{model.provider}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Style */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5" />
                    {lang === "ar" ? "النمط" : "Style"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {IMAGE_STYLES.slice(0, 6).map((style) => (
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

                {/* Lighting */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block flex items-center gap-1.5">
                    <Lightbulb className="h-3.5 w-3.5" />
                    {lang === "ar" ? "الإضاءة" : "Lighting"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {LIGHTING_TYPES.map((light) => (
                      <button
                        key={light.id}
                        onClick={() => setSelectedLighting(light.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedLighting === light.id
                            ? "bg-slate-900 text-white"
                            : "bg-ivory-200 text-slate-600 hover:bg-ivory-300"
                        }`}
                      >
                        {lang === "ar" ? light.labelAr : light.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Camera */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block flex items-center gap-1.5">
                    <Camera className="h-3.5 w-3.5" />
                    {lang === "ar" ? "زاوية الكاميرا" : "Camera Angle"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CAMERA_ANGLES.map((angle) => (
                      <button
                        key={angle.id}
                        onClick={() => setSelectedCamera(angle.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedCamera === angle.id
                            ? "bg-slate-900 text-white"
                            : "bg-ivory-200 text-slate-600 hover:bg-ivory-300"
                        }`}
                      >
                        {lang === "ar" ? angle.labelAr : angle.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size (only for image mode) */}
                {generationMode === "image" && (
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      {lang === "ar" ? "الحجم" : "Size"}
                    </label>
                    <div className="flex gap-2">
                      {["1024x1024", "1024x1792", "1792x1024", "512x512"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setImageSize(s)}
                          className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            imageSize === s
                              ? "bg-slate-900 text-white"
                              : "bg-ivory-200 text-slate-600 hover:bg-ivory-300"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
                    {generationMode === "image"
                      ? (lang === "ar" ? "توليد صورة" : "Generate Image")
                      : (lang === "ar" ? "توليد أمر الصورة" : "Generate Image Prompt")}
                  </>
                )}
              </button>
            </div>

            {/* Output Panel */}
            <div className="bg-white rounded-2xl border border-ivory-300 p-6 corner-brackets grain-overlay card-depth">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  {lang === "ar" ? "أمر الصورة" : "Image Prompt"}
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

              {generationMode === "image" ? (
                generatedImageUrl ? (
                  <div className="rounded-xl bg-ivory-100 border border-ivory-300 overflow-hidden">
                    <img
                      src={generatedImageUrl}
                      alt={input}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-3 flex items-center justify-between bg-white">
                      <span className="text-xs text-slate-500">
                        {lang === "ar" ? "تم التوليد بواسطة Pollinations.ai" : "Generated via Pollinations.ai"}
                      </span>
                      <button
                        onClick={() => window.open(generatedImageUrl, "_blank")}
                        className="text-xs text-slate-600 hover:text-slate-800 flex items-center gap-1"
                      >
                        <ImageIcon className="h-3 w-3" />
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
