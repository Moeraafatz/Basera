import { routeCompletion } from "./model-router";

/**
 * AI Service Layer — unified interface for all AI operations.
 *
 * All requests route through model-router.ts which distributes across:
 * - OpenRouter (Claude, GPT, Gemini via single key)
 * - Google AI Studio (Gemini native)
 * - Groq (ultra-low latency Llama)
 * - Cerebras (high-throughput Llama)
 * - DeepSeek (best reasoning)
 * - Pollinations (image generation)
 */

export async function generateAIPrompt(params: {
  input: string;
  level: "simple" | "advanced" | "expert";
  category: string;
  model: string;
}): Promise<string> {
  const { input, level, category } = params;

  if (!input.trim()) return "";

  const prefixes: Record<string, string> = {
    simple: "أنت مساعد ذكاء اصطناعي مفيد. هدفك تقديم إجابات واضحة ومختصرة وعملية.",
    advanced: "أنت خبير ذكاء اصطناعي متمرس بمعرفة عميقة في المجال. تقدم إجابات منظمة ومفصلة وقابلة للتطبيق.",
    expert: "أنت متخصص من الطراز العالمي وقائد فكري. تقدم مخرجات استثنائية بجودة احترافية تعكس خبرة عميقة وتحليل دقيق.",
  };

  const categoryContext: Record<string, string> = {
    "Content Creation": "أنشئ محتوى جذاباً ومنظماً ومحسّناً للجمهور المستهدف. استخدم عناوين واضحة وسرد مقنع ولغة مؤثرة.",
    "Business & Marketing": "طوّر استراتيجيات مبنية على البيانات مع مقترحات قيمة واضحة. ركّز على النتائج القابلة للقياس والتموضع في السوق.",
    "Coding & Tech": "اكتب كوداً نظيفاً وقابلاً للصيانة وموثّقاً جيداً. قدّم إرشادات تنفيذية مفصلة مع قرارات معمارية ومعالجة الأخطاء.",
    "Creative Writing": "صِغ محتوى حياً ومؤثراً بصوت سردي قوي. استخدم لغة وصفية واستعارات مقنعة ونبرة أصيلة.",
    "Education & Learning": "اشرح المفاهيم المعقدة بلغة واضحة وتشبيهات قريبة من الواقع. قدّم تطبيقات عملية ومراجعات معرفية.",
    "Research & Analysis": "أجرِ تحليلاً شاملاً مبنياً على الأدلة مع هيكل منطقي. قدّم النتائج مع البيانات الداعمة والوجهات البديلة.",
  };

  const levelDetail: Record<string, string> = {
    simple: `المهمة: ${input}

نسّق إجابتك كالتالي:
1. مقدمة موجزة (1-2 جملة)
2. الإجابة الأساسية (مختصرة وعملية)
3. الخلاصة (خطوة عملية قابلة للتنفيذ)

حافظ على الإجابة تحت 200 كلمة. قدّم الوضوح والفورية.`,
    advanced: `المهمة: ${input}

قدّم إجابة شاملة تتضمن:
- شرح واضح للنهج المتبع
- تفصيل خطوة بخطوة مع التبرير
- أمثلة عملية أو توضيحات
- اعتبارات رئيسية والمخاطر المحتملة
- ملخص لأفضل الممارسات والتوصيات

نسّق المخرجات بأقسام واضحة. استخدم النقاط والترقيم حيث مناسب.`,
    expert: `الدور: متخصص أول بخبرة مثبتة في هذا المجال.

المهمة: ${input}

المتطلبات:
- قدّم إجابة استثنائية مفصلة وشاملة
- تضمين تحليل متعدد الزوايا مع الأدلة والتبريرات
- منهجية خطوة بخطوة مع إرشادات التنفيذ
- معالجة الحالات الاستثنائية وأنماط الفشل واستراتيجيات التخفيف
- أمثلة من العالم الحقيقي أو دراسات حالة أو مراجع تنفيذية
- معايير جودة واضحة ومقاييس النجاح
- توصيات لمتابعة الاستكشاف

تنسيق المخرجات:
## نظرة عامة
[ملخص تنفيذي موجز للنهج]

## التحليل التفصيلي
[استكشاف معمّق مع التبريرات]

## دليل التنفيذ
[خطوات عملية مع الأولويات]

## أفضل الممارسات
[أهم 5-7 توصيات مع الشرح]

## قائمة الجودة
[معايير تقييم النجاح]

## اعتبارات إضافية
[مواضيع ذات صلة ومفاهيم متقدمة]`,
  };

  const systemPrompt = `${prefixes[level] || prefixes.advanced}\n\n${categoryContext[category] || categoryContext["Content Creation"]}\n\n${levelDetail[level] || levelDetail.advanced}`;

  return routeCompletion(
    "text-generate",
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: input },
    ],
    { maxTokens: 2048, temperature: 0.7 }
  );
}

export async function generateImagePrompt(params: {
  input: string;
  model: string;
  style: string;
  ratio: string;
  quality: string;
}): Promise<string> {
  const { input, model, style, ratio, quality } = params;

  if (!input.trim()) return "";

  const modelInstructions: Record<string, string> = {
    "dall-e": `أنت مهندس أوامر صور خبير. أنشئ أمر صورة سينمائي مفصّل لـ DALL-E 3 عن: "${input}"

النمط: ${style || "واقعي"}
الجودة: ${quality || "عالية"}

المتطلبات:
- صف الموضوع بتفاصيل غنية ومحددة (المظهر، الوضعية، التعبير، الإعداد)
- حدّد جودة الإضاءة واتجاهها
- عيّن التركيب ومنظور الكاميرا
- بيّن النمط الفني ولوحة الألوان
- أضف الجو العام والنبرة العاطفية

اكتب كأمر طبيعي متدفق — بدون نقاط أو قوائم.`,
    midjourney: `أنت مهندس أوامر Midjourney خبير. أنشئ أمر سينمائي احترافي عن: "${input}"

النمط: ${style || "واقعي"}

المتطلبات:
- الموضوع: وصف تفصيلي مع خصائص محددة
- البيئة: الإعداد والخلفية والعناصر الجوية
- الإضاءة: جودة محددة واتجاه
- التركيب: زاوية الكاميرا وعمق المجال
- المراجع الفنية: التأثيرات الفنية
- المزاج والجو: النبرة العاطفية
- أنهِ بمعاملات Midjourney: --ar ${ratio || "1:1"} --style raw --s 750 --q 2 --v 6.1`,
    "stable-diffusion": `أنت مهندس أوامر Stable Diffusion XL خبير. أنشئ أمر مفصّل وعالي الجودة عن: "${input}"

النمط: ${style || "واقعي"}

المتطلبات:
- تركيز الموضوع: وصف تفصيلي مع مميزات محددة
- تفاصيل البيئة: الإعداد والدعامات وعناصر الخلفية
- إعداد الإضاءة: النوع والاتجاه والجودة
- الكاميرا/الزاوية: المنظور وعمق المجال والتركيب
- معزّزات الجودة: (masterpiece, best quality, ultra-detailed, 8K, HDR)
- النمط الفني: واصفات أسلوب محددة`,
    flux: `أنت مهندس أوامر FLUX Pro خبير. أنشئ أمر محسّن لـ FLUX Pro/Seedream عن: "${input}"

النمط: ${style || "واقعي"}

المتطلبات:
- الموضوع الأساسي: وصف شديد التفصيل مع سمات محددة
- بيئة المشهد: الإعداد والجو والعناصر السياقية
- تصميم الإضاءة: جودة محددة واتجاه ودرجة حرارة اللون
- التركيب البصري: منظور الكاميرا والعمق والتأطير
- دقة النمط: اتجاه فني دقيق ونقاط مرجعية
- الجودة التقنية: 8K, واقعي, سينمائي, تفاصيل حادة`,
  };

  const instruction = modelInstructions[model] || modelInstructions["dall-e"];

  return routeCompletion(
    "image-prompt",
    [
      { role: "system", content: instruction },
      { role: "user", content: "أنشئ أمر الصورة هذا." },
    ],
    { maxTokens: 1024, temperature: 0.7 }
  );
}

export async function generateVideoPrompt(params: {
  input: string;
  dimension: string;
}): Promise<string> {
  const { input, dimension } = params;

  if (!input.trim()) return "";

  const dimensionSpecs: Record<string, string> = {
    "16:9": "مشهد سينمائي واسع، لقطات بيئية درامية، مشاهد تأسيسية شاملة",
    "9:16": "تنسيق عمودي، لقطات مقربة حميمة، عمق عاطفي، تأطير مركز",
    "1:1": "تنسيق مربع، تركيب متوازن، تأطير متعدد الاستخدامات",
    "4:3": "تنسيق تلفزيوني كلاسيكي، سينما تقليدية، تأطير وثائقي",
  };

  return routeCompletion(
    "video-prompt",
    [
      {
        role: "system",
        content: `أنت مهندس أوامر فيديو خبير لـ VEO3 و Sora. أنشئ أمر توليد فيديو سينمائي احترافي.

## وصف المشهد
${input}

## المواصفات التقنية
- نسبة العرض: ${dimension}
- التأطير: ${dimensionSpecs[dimension] || dimensionSpecs["16:9"]}

## الكاميرا والإنتاج
- حركة الكاميرا: ديناميكية وهادفة — استخدم دوللي أو رافعة لحركة سينمائية سلسة
- نوع اللقطة: مزيج من اللقطات الواسعة التأسيسية والمقربة الحميمة
- التركيز: انتقالات تركيكية بين مستويات الموضوع للعمق
- عمق المجال: ضحل مع بوكيه سينمائي حيث مناسب

## الإضاءة والجو
- الإضاءة الأساسية: ساعة ذهبية طبيعية مع أشعة ضوء حجمية
- الثانوية: إضاءة حافة لفصل الموضوع
- الجو: مزاج مؤثر مع عمق جوي (ضباب أو جزيئات)
- التدرج اللوني: سينمائي بتباين غني ودرجة حرارة لون متوازنة

## الجودة البصرية
- الجودة: سينمائي فائق، دقة 4K+، ملمس حبيبي
- التركيب: قاعدة الأثلاث، خطوط قيادة ديناميكية، مساحة سلبية متوازنة`,
      },
      { role: "user", content: input },
    ],
    { maxTokens: 1024, temperature: 0.7 }
  );
}

export async function analyzeReference(
  imageBase64: string,
  type?: string,
  context?: string
): Promise<string> {
  const instruction = `أنت مصمم بصري خبير ومحلل علامات تجارية. حلّل صورة المرجع المقدمة واستخرج خصائص التصميم التفصيلية.

المهمة: حلّل صورة المرجع هذه لاستخدامها في سياق تصميم ${type || "عام"}${context ? ` حول ${context}` : ""}.

أبعاد التحليل:
1. لوحة الألوان: 5-8 ألوان سائدة مع رموز HEX
2. الخطوط: العائلات والأوزان والأحجام والتسلسل الهرمي
3. النمط البصري: واقعي، مسطح، بسيط، maximalist، brutalist، عضوي، هندسي
4. التخطيط والتركيب: قائم على الشبكة أم حر، المساحة البيضاء، المحاذاة
5. عناصر التصميم: رسوم توضيحية، أيقونات، أسلوب التصوير، أنماط، تدرجات
6. المزاج والعاطفة: ما الشعور الذي ينقله هذا التصميم؟
7. شخصية العلامة التجارية: احترافي، مرح، فاخر، صديق للبيئة، تقني
8. التفاصيل التقنية: نسب العرض، الوسيط، أنماط التصميم

كن محدّداً. سيُستخدم هذا التحليل كمرجع لتوليد أوامر تصميم جديدة.`;

  const apiKey = process.env.GOOGLE_AI_STUDIO_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("Google API key not configured");

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType: "image/jpeg",
    },
  };

  const result = await model.generateContent([instruction, imagePart]);
  return result.response.text().trim();
}

export async function optimizeTextPrompt(
  textInput: string,
  promptTemplate?: string,
  category?: string
): Promise<string> {
  const instruction = `أنت مهندس أوامر خبير ومتخصص في الذكاء الاصطناعي. مهمتك تحسين وتعزيز أوامر المستخدمين للحصول على أفضل مخرجات ممكنة من نماذج الذكاء الاصطناعي.

المهمة: حوّل مدخل المستخدم إلى أمر محسّن ومفصّل للغاية.

المدخل: "${textInput}"
${promptTemplate ? `\nقالب الأمر: "${promptTemplate}"` : ""}
${category ? `\nالفئة: ${category}` : ""}

التعليمات:
1. حلّل نية المستخدم والهدف
2. استخدم هيكل القالب إن وُجد، أو أنشئ هيكل أمثل
3. أضف تفاصيل وسياق وقيود محددة
4. تضمين مواصفات تنسيق المخرجات
5. أضف معرفة مجال ذات صلة لنتائج أفضل
6. اجعله واضحاً وغير غامض

أعد الأمر المحسّن فقط، بدون شروحات أو markdown.`;

  return routeCompletion(
    "text-optimize",
    [{ role: "user", content: instruction }],
    { maxTokens: 2048, temperature: 0.5 }
  );
}

export async function generateCodePrompt(params: {
  input: string;
  language?: string;
  framework?: string;
  complexity?: string;
}): Promise<string> {
  const { input, language, framework, complexity } = params;

  if (!input.trim()) return "";

  const instruction = `أنت مهندس برمجيات خبير ومهندس أوامر كود. أنشئ أمر كود دقيق ومحسّن.

الطلب: "${input}"
${language ? `لغة البرمجة: ${language}` : ""}
${framework ? `الإطار: ${framework}` : ""}
${complexity ? `مستوى التعقيد: ${complexity}` : ""}

المتطلبات:
- حدّد بنية المشروع والمعمارية
- ضمّن معالجة الأخطاء والحالات الاستثنائية
- أضف اختبارات وحدود
- قدّم أمثلة كود واضحة
- تضمين اعتبارات الأمان والأداء
- أضف توثيق وتعليقات

أعد أمر الكود المحسّن فقط.`;

  return routeCompletion(
    "code-generate",
    [
      { role: "system", content: instruction },
      { role: "user", content: "أنشئ أمر الكود هذا." },
    ],
    { maxTokens: 2048, temperature: 0.6 }
  );
}

export { routeCompletion };
export type { Service } from "./model-router";
