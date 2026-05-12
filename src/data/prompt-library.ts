// @ts-nocheck
export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  tags: string[];
  subcategories?: { id: string; name: string; count: number }[];
};

export type Prompt = {
  id: string;
  title: string;
  prompt: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  model?: string;
  useCase: string;
  variables: string[];
};

export const CATEGORIES: Category[] = [
  {
    id: "seo",
    name: "SEO & Search",
    icon: "Search",
    color: "from-green-400 to-emerald-600",
    description: "Rank higher, drive organic traffic, master search algorithms",
    tags: ["SEO", "Ranking", "Organic Traffic", "Keywords", "AI SEO"],
    subcategories: [
      { id: "blog-seo", name: "Blog SEO", count: 15 },
      { id: "technical-seo", name: "Technical SEO", count: 12 },
      { id: "local-seo", name: "Local SEO", count: 10 },
      { id: "ai-seo", name: "AI SEO", count: 8 },
    ],
  },
  {
    id: "social-media",
    name: "Social Media",
    icon: "Share2",
    color: "from-pink-400 to-rose-600",
    description: "Viral hooks, captions, hashtag strategies for every platform",
    tags: ["Instagram", "TikTok", "LinkedIn", "X", "YouTube", "Shorts"],
    subcategories: [
      { id: "instagram", name: "Instagram", count: 20 },
      { id: "tiktok", name: "TikTok", count: 15 },
      { id: "linkedin", name: "LinkedIn", count: 18 },
      { id: "twitter-x", name: "X / Twitter", count: 12 },
      { id: "youtube", name: "YouTube", count: 14 },
    ],
  },
  {
    id: "content-creation",
    name: "Content Creation",
    icon: "FileText",
    color: "from-violet-400 to-purple-600",
    description: "Blog posts, newsletters, scripts, and long-form content",
    tags: ["Blog", "Newsletter", "Script", "Long-form", "Copywriting"],
    subcategories: [
      { id: "blog", name: "Blog Posts", count: 15 },
      { id: "newsletter", name: "Newsletters", count: 12 },
      { id: "script", name: "Video Scripts", count: 10 },
      { id: "copywriting", name: "Copywriting", count: 14 },
    ],
  },
  {
    id: "email-marketing",
    name: "Email Marketing",
    icon: "Mail",
    color: "from-blue-400 to-indigo-600",
    description: "Subject lines that open, emails that convert, sequences that sell",
    tags: ["Cold Email", "Newsletter", "Sales", "Retention", "Klaviyo"],
    subcategories: [
      { id: "cold-email", name: "Cold Email", count: 15 },
      { id: "sales", name: "Sales Sequences", count: 12 },
      { id: "welcome", name: "Welcome Series", count: 10 },
      { id: "retention", name: "Retention", count: 8 },
    ],
  },
  {
    id: "designer-creator",
    name: "Design & Creators",
    icon: "Palette",
    color: "from-amber-400 to-orange-600",
    description: "YouTube thumbnails, carousels, brand kits, visual identity",
    tags: ["Thumbnail", "Carousel", "Brand", "Visual", "Canva", "Figma"],
    subcategories: [
      { id: "youtube-thumb", name: "YouTube Thumbnails", count: 12 },
      { id: "carousel", name: "Social Carousels", count: 10 },
      { id: "brand-kit", name: "Brand Kit", count: 8 },
      { id: "presentation", name: "Presentations", count: 8 },
    ],
  },
  {
    id: "coding-tech",
    name: "Coding & Tech",
    icon: "Code",
    color: "from-cyan-400 to-teal-600",
    description: "Code review, debugging, architecture, documentation",
    tags: ["Code Review", "Debug", "Architecture", "Docs", "React", "Python"],
    subcategories: [
      { id: "code-review", name: "Code Review", count: 10 },
      { id: "debug", name: "Debugging", count: 8 },
      { id: "docs", name: "Documentation", count: 7 },
      { id: "architecture", name: "Architecture", count: 6 },
    ],
  },
  {
    id: "business-strategy",
    name: "Business & Strategy",
    icon: "Briefcase",
    color: "from-red-400 to-red-700",
    description: "Plans, pitches, analysis, competitive research, growth",
    tags: ["Business Plan", "Pitch Deck", "Analysis", "Growth", "Strategy"],
    subcategories: [
      { id: "pitch", name: "Pitch Decks", count: 10 },
      { id: "analysis", name: "Market Analysis", count: 8 },
      { id: "growth", name: "Growth Strategy", count: 10 },
      { id: "saas", name: "SaaS", count: 8 },
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    icon: "ShoppingCart",
    color: "from-fuchsia-400 to-pink-600",
    description: "Product descriptions, reviews, ad copy, store copy",
    tags: ["Product Copy", "ADS", "Amazon", "Shopify", "WooCommerce"],
    subcategories: [
      { id: "product", name: "Product Copy", count: 14 },
      { id: "ads", name: "Ad Copy", count: 10 },
      { id: "amazon", name: "Amazon Listing", count: 10 },
      { id: "checkout", name: "Checkout Flow", count: 6 },
    ],
  },
  {
    id: "education",
    name: "Education & Training",
    icon: "GraduationCap",
    color: "from-sky-400 to-blue-600",
    description: "Courses, lesson plans, training programs, assessments",
    tags: ["Course", "Lesson", "Training", "Quiz", "LearnDash"],
    subcategories: [
      { id: "course", name: "Course Design", count: 10 },
      { id: "lesson", name: "Lesson Plans", count: 8 },
      { id: "assessment", name: "Assessments", count: 7 },
    ],
  },
  {
    id: "hr-recruitment",
    name: "HR & Recruitment",
    icon: "Users",
    color: "from-lime-400 to-green-600",
    description: "JD writing, interview questions, onboarding, culture docs",
    tags: ["Job Description", "Interview", "Onboarding", "Culture"],
    subcategories: [
      { id: "jd", name: "Job Descriptions", count: 10 },
      { id: "interview", name: "Interview Questions", count: 8 },
      { id: "onboarding", name: "Onboarding", count: 7 },
    ],
  },
  {
    id: "video-podcast",
    name: "Video & Podcast",
    icon: "Video",
    color: "from-rose-400 to-red-600",
    description: "Video scripts, podcast outlines, episode hooks, show notes",
    tags: ["YouTube", "Podcast", "Shorts", "Reels", "Streaming"],
    subcategories: [
      { id: "youtube", name: "YouTube Scripts", count: 14 },
      { id: "podcast", name: "Podcast", count: 12 },
      { id: "shorts", name: "Shorts/Reels", count: 10 },
    ],
  },
  {
    id: "ai-automation",
    name: "AI & Automation",
    icon: "Bot",
    color: "from-purple-400 to-violet-600",
    description: "AI workflows, automation sequences, bot scripts, prompts",
    tags: ["Automation", "Workflow", "AI Agent", "Zapier", "Make"],
    subcategories: [
      { id: "workflow", name: "Workflows", count: 10 },
      { id: "agent", name: "AI Agents", count: 8 },
      { id: "chatbot", name: "Chatbots", count: 6 },
    ],
  },
  {
    id: "local-business",
    name: "Local Business",
    icon: "MapPin",
    color: "from-teal-400 to-cyan-600",
    description: "Local SEO, Google Business, review responses, neighborhood marketing",
    tags: ["Local SEO", "Google Business", "Reviews", "Neighborhood"],
    subcategories: [
      { id: "google-business", name: "Google Business", count: 8 },
      { id: "reviews", name: "Review Management", count: 6 },
      { id: "local-content", name: "Local Content", count: 8 },
    ],
  },
  {
    id: "influencer",
    name: "Influencer & Creator",
    icon: "Star",
    color: "from-yellow-400 to-amber-600",
    description: "Brand deals, collaboration pitches, creator portfolios, sponsorship",
    tags: ["Influencer", "Brand Deal", "Sponsorship", "Creator"],
    subcategories: [
      { id: "pitches", name: "Brand Pitches", count: 10 },
      { id: "portfolio", name: "Creator Portfolio", count: 6 },
      { id: "collab", name: "Collaboration", count: 8 },
    ],
  },
  {
    id: "crisis-management",
    name: "Crisis & PR",
    icon: "AlertTriangle",
    color: "from-orange-400 to-red-600",
    description: "Crisis responses, PR statements, reputation management",
    tags: ["Crisis", "PR", "Reputation", "Damage Control"],
    subcategories: [
      { id: "crisis", name: "Crisis Response", count: 8 },
      { id: "pr", name: "PR Statements", count: 6 },
      { id: "reputation", name: "Reputation", count: 6 },
    ],
  },
];

export const PROMPTS: Prompt[] = [
  // ===== SEO & SEARCH - 2026 AI-Optimized =====
  {
    id: "seo-blog-intro-2026",
    title: "E-E-A-T Blog Introduction (2026)",
    prompt: `You are an expert SEO content strategist specializing in 2026 Google's E-E-A-T signals. Create a blog introduction that demonstrates Experience, Expertise, Authoritativeness, and Trustworthiness.

TASK: Write an engaging blog intro for "[TOPIC]" targeting [KEYWORD].

REQUIREMENTS:
- Begin with a personal story or specific experience (Experience signal)
- Demonstrate deep knowledge within first 50 words
- Include primary keyword "[KEYWORD]" naturally
- Add 1-2 secondary keywords from [SECONDARY_KEYWORDS]
- Address reader's specific pain point immediately
- Signal what unique value they'll get
- 100-150 words maximum
- Conversational, authoritative tone
- End with smooth transition to body
- Include year-relevant data or stats (mark as [ADD STAT])
- No generic openers like "In today's digital world..."

FORMAT: Publication-ready paragraph with clear E-E-A-T signals embedded naturally.`,
    description: "Google E-E-A-T optimized blog intro that ranks in 2026",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Blog", "E-E-A-T", "Ranking", "2026"],
    useCase: "Write blog intros that satisfy 2026 Google's quality signals",
    variables: ["TOPIC", "KEYWORD", "SECONDARY_KEYWORDS"],
  },
  {
    id: "seo-meta-description-2026",
    title: "Zero-Click Meta Description",
    prompt: `You are an SEO copywriter for 2026. Generate meta descriptions optimized for featured snippets and zero-click searches.

TASK: Write a meta description for "[TOPIC]" that captures featured snippet potential.

REQUIREMENTS:
- Exactly 150-160 characters
- Include "[KEYWORD]" naturally
- Answer the search query directly (featured snippet format)
- Include structured data potential (list, table, or direct answer)
- Value proposition in first 80 characters
- Action-oriented language
- No emojis, no quotes
- Match user intent for "[SEARCH_INTENT]"

FORMAT: Return only the meta description. No preamble.`,
    description: "Meta descriptions optimized for featured snippets and zero-click",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Meta", "Featured Snippet", "Zero-Click"],
    useCase: "Create meta descriptions that win featured snippets",
    variables: ["TOPIC", "KEYWORD", "SEARCH_INTENT"],
  },
  {
    id: "seo-faq-schema-2026",
    title: "People Also Ask Optimizer",
    prompt: `You are an SEO expert optimizing for Google's People Also Ask in 2026. Create FAQ content that captures PAA boxes.

TASK: Generate 7-10 FAQs for "[TOPIC]" targeting [KEYWORD].

REQUIREMENTS:
- Each question appears as someone would actually Google it
- Answers: 40-50 words, direct, factual
- Include "[KEYWORD]" in at least 4 questions
- Answer format: [DIRECT_ANSWER] then brief explanation
- Cover different angles: how, what, why, when, cost, best
- At least 2 questions should challenge common misconceptions
- Consider voice search queries (conversational phrasing)
- Mark questions as: [PAA_HIGH] (most likely to appear in PAA)

FORMAT: Return as structured Q&A pairs. Label PAA likelihood.`,
    description: "FAQ content optimized for People Also Ask boxes 2026",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "FAQ", "PAA", "Voice Search"],
    useCase: "Build FAQs that dominate People Also Ask results",
    variables: ["TOPIC", "KEYWORD"],
  },
  {
    id: "seo-cluster-strategy",
    title: "Topic Cluster Strategy",
    prompt: `You are an SEO content strategist. Design a complete topic cluster strategy for "[CORE_TOPIC]".

TASK: Create a hub-and-spoke content architecture that builds topical authority.

REQUIREMENTS:
- 1 Pillar page (3000+ words target)
- 8-12 cluster content pieces
- Each cluster targets long-tail variations of [CORE_KEYWORD]
- Internal linking strategy for each piece
- Content gap analysis against [COMPETITOR_URLS]
- Semantic SEO integration points

CLUSTER STRUCTURE:
- Pillar: [PILLAR_TITLE] - comprehensive guide
- Cluster 1: [CLUSTER_1_THEME] - practical how-to
- Cluster 2: [CLUSTER_2_THEME] - list/roundup
- Cluster 3: [CLUSTER_3_THEME] - comparison
- Cluster 4: [CLUSTER_4_THEME] - case study
- [Additional clusters]

INCLUDE:
- Word count targets per piece
- Target keywords per cluster
- Suggested publish sequence (priority order)
- Internal link anchor text recommendations

FORMAT: Return as visual cluster map + detailed content plan per piece.`,
    description: "Complete topic cluster strategy for topical authority",
    category: "seo",
    subcategory: "technical-seo",
    tags: ["SEO", "Topic Cluster", "Authority", "Content Strategy"],
    useCase: "Build topical authority with strategic content clusters",
    variables: ["CORE_TOPIC", "CORE_KEYWORD", "COMPETITOR_URLS", "PILLAR_TITLE", "CLUSTER_1_THEME", "CLUSTER_2_THEME", "CLUSTER_3_THEME", "CLUSTER_4_THEME"],
  },
  {
    id: "seo-video-schema",
    title: "Video SEO Schema Builder",
    prompt: `You are a video SEO specialist. Optimize [VIDEO_TOPIC] for YouTube and Google video results.

TASK: Create a complete video SEO package including schema markup, title, and description.

REQUIREMENTS:
- YouTube title: Max 100 chars, keyword "[KEYWORD]" front-loaded
- YouTube description: First 150 chars must hook + include keyword
- 5 video tags optimized for [NICHE]
- Chapter markers (5-7 timestamps with descriptions)
- Schema markup: VideoObject JSON-LD
- Transcript summary (3 key timestamps highlighted)
- Thumbnail text recommendations (2 options)

YOUTUBE SEO:
- Title structure: [KEYWORD] | [HOOK/WHY_WORTH_WATCHING]
- Description template with timestamps, links, CTAs
- End screen elements recommendation

GOOGLE VIDEO RESULTS:
- Match search intent for "[VIDEO_INTENT]"
- Include timestamp schema for step-by-step content

FORMAT: Return as ready-to-use YouTube optimization package. Include JSON-LD code block.`,
    description: "Complete YouTube and Google video SEO package",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["Video SEO", "YouTube", "Schema", "Google"],
    useCase: "Optimize videos for YouTube and Google video search",
    variables: ["VIDEO_TOPIC", "KEYWORD", "NICHE", "VIDEO_INTENT"],
  },
  {
    id: "seo-internal-link-strategy",
    title: "Internal Link Strategy Builder",
    prompt: `You are an SEO architect. Create an internal linking strategy for new content "[NEW_CONTENT]" on [NEW_CONTENT_URL].

TASK: Map out internal link opportunities across existing content.

EXISTING CONTENT TO ANALYZE:
[PAGES_TO_LINK_FROM]

LINKING OPPORTUNITIES:
- 5-7 anchor text suggestions for links TO new content
- 3-5 outbound links from new content TO existing pages
- Contextual placement recommendations
- Link equity flow strategy

REQUIREMENTS:
- Anchor textsvaried (exact match, partial match, branded, natural)
- Each suggestion includes: source page, suggested anchor, reason
- Consider user journey: where would reader click next?
- Avoid over-optimization (natural distribution)
- Include 404 fix opportunities if any found

FORMAT: Return as link opportunity map with source URLs, anchor texts, and placement notes.`,
    description: "Strategic internal linking plan for new content",
    category: "seo",
    subcategory: "technical-seo",
    tags: ["SEO", "Internal Links", "Link Building", "Architecture"],
    useCase: "Build internal linking strategy that passes authority",
    variables: ["NEW_CONTENT", "NEW_CONTENT_URL", "PAGES_TO_LINK_FROM"],
  },
  {
    id: "local-seo-google-profile",
    title: "Google Business Profile Optimizer",
    prompt: `You are a local SEO specialist. Optimize a Google Business Profile for [BUSINESS_NAME] in [LOCATION].

TASK: Create a complete GBP optimization strategy.

BUSINESS INFO:
- Category: [PRIMARY_CATEGORY]
- Secondary categories: [SECONDARY_CATEGORIES]
- Services: [SERVICES_LIST]
- Hours: [HOURS]
- Specialties: [SPECIALTIES]

REQUIREMENTS:
- Business Description: 750 characters, keyword-rich, conversational
- Google Posts strategy: 4-week content calendar
- Review response templates: positive, negative, neutral
- Q&A builder: 10 most asked questions with answers
- Service area optimization
- Photo strategy: what images to upload and when

POST CALENDAR:
- Week 1: [POST_1_THEME]
- Week 2: [POST_2_THEME]
- Week 3: [POST_3_THEME]
- Week 4: [POST_4_THEME]

REVIEW RESPONSE TONES:
- 5-star: Grateful, specific, invite return visit
- 3-star: Apologetic, solutions, off平台link
- 1-star: Professional, rectify, follow up offline

FORMAT: Return as GBP audit and action plan with character counts.`,
    description: "Complete Google Business Profile optimization strategy",
    category: "seo",
    subcategory: "local-seo",
    tags: ["Local SEO", "Google Business", "GBP", "Reviews"],
    useCase: "Optimize Google Business Profile for local rankings",
    variables: ["BUSINESS_NAME", "LOCATION", "PRIMARY_CATEGORY", "SECONDARY_CATEGORIES", "SERVICES_LIST", "HOURS", "SPECIALTIES", "POST_1_THEME", "POST_2_THEME", "POST_3_THEME", "POST_4_THEME"],
  },
  {
    id: "ai-seo-automation",
    title: "AI-Powered SEO Audit Prompt",
    prompt: `You are an SEO analyst using AI for comprehensive site audits. Perform a technical SEO audit of [WEBSITE_URL].

TASK: Create an actionable SEO audit report with prioritized fixes.

AUDIT CATEGORIES:
1. Technical SEO (crawl errors, indexing, Core Web Vitals)
2. On-page SEO (title tags, meta descriptions, heading structure)
3. Content quality (thin content, duplicates, keyword cannibalization)
4. Backlink profile (toxic links, opportunities, anchor text)
5. User experience (mobile usability, page speed, engagement)

REQUIREMENTS:
- Identify top 5 critical issues (Priority: CRITICAL)
- Identify top 10 recommended improvements (Priority: HIGH)
- Suggest 5 quick wins (Priority: MEDIUM)
- Include specific URLs where issues found
- Estimate impact of each fix (High/Medium/Low traffic potential)
- Reference 2026 Google algorithm updates

FORMAT: Return as structured audit with severity levels, URLs, and recommended actions. Include actionable snippets where possible.`,
    description: "AI-powered comprehensive SEO audit with prioritized fixes",
    category: "seo",
    subcategory: "ai-seo",
    tags: ["SEO Audit", "AI", "Technical SEO", "Analysis"],
    useCase: "Conduct thorough SEO audits using AI analysis",
    variables: ["WEBSITE_URL"],
  },
  {
    id: "seo-rank追踪-report",
    title: "AI SEO Rank Tracker Report",
    prompt: `You are an SEO analyst tracking ranking movements. Create a weekly ranking report for [DOMAIN].

TRACKING DATA:
- Keywords: [KEYWORD_LIST]
- Competitors: [COMPETITOR_DOMAINS]
- Date range: [DATE_RANGE]
- SERP changes observed: [OBSERVED_CHANGES]

REQUIREMENTS:
- Position changes summary (gained/lost/stable)
- Featured snippet opportunities (where ranking 2-5)
- Share of voice comparison vs [COMPETITOR_1], [COMPETITOR_2]
- Algorithm update correlation (if any detected)
- Content opportunities identified
- Next week's action priorities

VISUAL ELEMENTS:
- Traffic projection based on position changes
- Ranking distribution chart data
- Keyword cluster performance

FORMAT: Return as executive summary + detailed tracking tables. Include 3 actionable recommendations for next week.`,
    description: "Weekly SEO ranking report with AI-powered insights",
    category: "seo",
    subcategory: "ai-seo",
    tags: ["SEO", "Rank Tracking", "Report", "Analytics"],
    useCase: "Create weekly SEO ranking reports with insights",
    variables: ["DOMAIN", "KEYWORD_LIST", "COMPETITOR_DOMAINS", "DATE_RANGE", "OBSERVED_CHANGES", "COMPETITOR_1", "COMPETITOR_2"],
  },

  // ===== SOCIAL MEDIA - Viral 2026 =====
  {
    id: "social-hook-generator-2026",
    title: "Algorithm-Proof Hook Generator",
    prompt: `You are a viral content strategist for 2026 algorithms. Create scroll-stopping hooks optimized for TikTok, Reels, and Shorts.

TASK: Generate 15 hooks for [TOPIC] that beat the algorithm.

REQUIREMENTS:
- Hook types: stat, question, bold claim, story, pattern interrupt, contrast, mystery, fear, aspiration, reverse psychology
- Each hook: under 10 words
- At least 5 must create curiosity gaps
- At least 3 must challenge beliefs
- At least 3 must use specific numbers
- Every hook must work WITHOUT video context (text-only hook)
- Include [HOOK_TYPE] label for each

HOOK CATEGORIES TO COVER:
1. Emotional hooks (curiosity, fear, anger, awe, surprise)
2. Intellectual hooks (puzzle, pattern, prediction, paradox)
3. Social hooks (in-group, status, authority, rebellion)

FORMAT: Numbered list. Include hook type in brackets. Example: "(CURIOSITY) [hook text]".`,
    description: "15 algorithm-proof hooks for short-form video 2026",
    category: "social-media",
    subcategory: "tiktok",
    tags: ["TikTok", "Hook", "Viral", "Reels", "Shorts"],
    useCase: "Generate hooks that beat 2026 algorithms",
    variables: ["TOPIC"],
  },
  {
    id: "social-ig-carousel-2026",
    title: "High-Save Carousel Designer",
    prompt: `You are a social media strategist for 2026 Instagram. Create carousels that drive saves and shares.

TASK: Design a [SLIDE_COUNT]-slide carousel about [TOPIC].

CAROUSEL OBJECTIVE: [OBJECTIVE] (educational, inspirational, actionable, controversial)

REQUIREMENTS:
- Slide 1 (Hook): Stop scroll, promise value, NO full answer
- Slides 2-[SLIDE_COUNT-1]: Build value progressively
- Slide [SLIDE_COUNT] (CTA): Clear, specific action
- Max 25 words per slide
- Hook slide: max 10 words
- Visual direction for each slide
- Brand elements: [BRAND_COLORS], [BRAND_FONT]
- Caption strategy: hook line + 3 key points + CTA

SLIDE CONTENT:
Slide 1: [HOOK_CONCEPT]
Slide 2: [POINT_1]
Slide 3: [POINT_2]
Slide 4: [POINT_3]
Slide 5: [POINT_4]
Slide 6: [POINT_5] (if needed)
Slide [SLIDE_COUNT]: [CTA_SLIDE]

SAVE TRIGGER: What would make someone save this for later?

FORMAT: Return as slide-by-slide design brief with content and visual notes.`,
    description: "Instagram carousel optimized for saves in 2026",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Instagram", "Carousel", "Saves", "Engagement"],
    useCase: "Design carousels that get saved and shared",
    variables: ["SLIDE_COUNT", "TOPIC", "OBJECTIVE", "BRAND_COLORS", "BRAND_FONT", "HOOK_CONCEPT", "POINT_1", "POINT_2", "POINT_3", "POINT_4", "POINT_5", "CTA_SLIDE"],
  },
  {
    id: "social-tiktok-script-2026",
    title: "60-Second Viral Script",
    prompt: `You are a TikTok scriptwriter for 2026. Create a viral script that maximizes watch time and algorithm favor.

TASK: Write a [DURATION]-second TikTok script for [TOPIC].

SCRIPT REQUIREMENTS:
- Hook (0-3s): "[HOOK_LINE]" — must stop scroll immediately
- Pattern interrupt at [MARKER_TIME] — change visual/voice/setting
- Micro-hooks every [INTERVAL] seconds (hook phrase to retain attention)
- CTA at [CTA_TIME] — specific, not generic "follow for more"
- Trending audio: [TRENDING_AUDIO] or style reference

TECHNICAL SPECS:
- VO word count: [WORD_COUNT] (speaking pace: 150 words/minute)
- Max 10 words per sentence
- Include [B-ROLL_IDEA] for visual cuts
- On-screen text: [ON_SCREEN_TEXT] suggestions
- Emoji usage: 1-2 strategic emojis

ATTENTION ARCHITECTURE:
0-3s: Hook
3-10s: Problem/Promise
10-30s: Core content (micro-hook every [INTERVAL] seconds)
30-45s: Value delivery
45-[DURATION]s: CTA

FORMAT: Return as two-column script (time | VO | visuals). Mark HOOK, MICRO_HOOK, CTA sections.`,
    description: "Viral TikTok script with 2026 algorithm optimization",
    category: "social-media",
    subcategory: "tiktok",
    tags: ["TikTok", "Script", "Viral", "Watch Time"],
    useCase: "Write viral TikToks that maximize retention",
    variables: ["DURATION", "TOPIC", "HOOK_LINE", "MARKER_TIME", "INTERVAL", "TRENDING_AUDIO", "WORD_COUNT", "B-ROLL_IDEA", "ON_SCREEN_TEXT", "CTA_TIME"],
  },
  {
    id: "social-linkedin-thought-leadership",
    title: "LinkedIn Authority Post (2026)",
    prompt: `You are a LinkedIn thought leader for B2B. Create a post that builds authority and sparks engagement.

TASK: Write a LinkedIn post about [TOPIC] from perspective of [PERSONA/BRAND].

POST REQUIREMENTS:
- Opening: Start mid-conversation or with contrarian take
- Length: 300-800 words
- Voice: Direct, assertive, first-person, no hedging
- Include 1 specific story or case study
- Make 1 bold claim that challenges conventional wisdom
- Structure: Hook → Point 1 → Point 2 → Point 3 → Takeaway → Question
- End with question that sparks debate (not "let me know below")
- Hashtags: 3-5 (mix broad + niche)

AVOID:
- "Today I want to share..."
- "In today's world..."
- Corporate buzzwords
- Passive voice

FORMAT: Return as publish-ready post. Include suggested hashtags at bottom.`,
    description: "LinkedIn thought leadership post for B2B authority",
    category: "social-media",
    subcategory: "linkedin",
    tags: ["LinkedIn", "Thought Leadership", "B2B", "Authority"],
    useCase: "Build LinkedIn authority with strategic posts",
    variables: ["TOPIC", "PERSONA/BRAND"],
  },
  {
    id: "social-twitter-thread-2026",
    title: "Viral Twitter Thread (2026)",
    prompt: `You are a viral Twitter/X content strategist. Create a thread about [TOPIC] that grows followers and drives engagement.

TASK: Write a [TWEET_COUNT]-tweet thread optimized for 2026 X algorithm.

ALGORITHM FACTORS:
- Saves > Retweets > Replies > Likes (prioritize)
- Early engagement velocity matters
- Thread expandability boosts reach
- Punctuation slows engagement

THREAD STRUCTURE:
Tweet 1 [HOOK]: Stop immediately. One impactful sentence.
Tweet 2-3 [CONTEXT]: Brief setup, why this matters
Tweet 4-[TWEET_COUNT-2] [CONTENT]: Core value delivery
Tweet [TWEET_COUNT-1] [INSIGHT]: One surprising stat or counterintuitive take
Tweet [TWEET_COUNT] [CTA]: Follow + engage + click link

REQUIREMENTS:
- Max 280 characters per tweet (count included)
- Vary sentence structure
- 1-2 emojis max per tweet
- End each tweet (except last) with implicit hook to next
- At least 2 tweets should contain data or specific examples
- CTA must be specific, not "follow for more"

FORMAT: Numbered tweets with character count in brackets. Label sections.`,
    description: "Algorithm-optimized Twitter thread for maximum reach",
    category: "social-media",
    subcategory: "twitter-x",
    tags: ["Twitter", "X", "Thread", "Viral", "Engagement"],
    useCase: "Write threads that grow followers through engagement",
    variables: ["TOPIC", "TWEET_COUNT"],
  },
  {
    id: "social-youtube-shorts",
    title: "YouTube Shorts Script",
    prompt: `You are a YouTube Shorts strategist. Create a script optimized for YouTube Shorts feed discovery.

TASK: Write a [DURATION]-second Shorts script for [TOPIC].

SHORTS ALGORITHM FACTORS:
- Watch percentage > views
- Loop-back potential (hook at end brings viewer back)
- Trending audio boost
- High engagement in first hour

REQUIREMENTS:
- Hook: "[HOOK]" — 0-2 seconds, must create loop-back curiosity
- Content: [CORE_IDEA] — deliver value fast
- Pattern interrupt: At [MARKER] change pace or visual
- Ending: [ENDING_HOOK] — hook that makes viewer rewatch

TECHNICAL:
- VO: [WORD_COUNT] words max (fast pace 180wpm)
- On-screen text: [TEXT_OVERLAY]
- Audio: Suggest trending sound or style

FORMAT: Return as timed script with VO and on-screen elements.`,
    description: "YouTube Shorts script optimized for Shorts feed",
    category: "social-media",
    subcategory: "youtube",
    tags: ["YouTube Shorts", "Shorts", "Script", "Discovery"],
    useCase: "Create Shorts that get discovered and watched",
    variables: ["DURATION", "TOPIC", "HOOK", "CORE_IDEA", "MARKER", "ENDING_HOOK", "WORD_COUNT", "TEXT_OVERLAY"],
  },
  {
    id: "social-instagram-reel-caption",
    title: "Reel Caption + Hashtag Strategy",
    prompt: `You are an Instagram Reels strategist. Create caption and hashtag strategy for [TOPIC].

TASK: Generate optimized Reel caption and hashtag set.

CAPTION STRUCTURE:
- Hook line (1 sentence, stops scroll)
- Context (1-2 sentences, why should they watch?)
- Value (2-3 sentences, what will they learn/gain?)
- CTA (1 specific action)
- Line breaks for readability
- 0 emojis in body (1 in hook only)

CAPTION TEXT: [CAPTION_IDEA]

HASHTAG STRATEGY:
- 3 Mega hashtags (1M+ posts) — [MEGA_1], [MEGA_2], [MEGA_3]
- 5 Macro hashtags (100K-1M) — [MACRO_1], [MACRO_2], [MACRO_3], [MACRO_4], [MACRO_5]
- 7 Micro hashtags (10K-100K) — [MICRO_1], [MICRO_2], [MICRO_3], [MICRO_4], [MICRO_5], [MICRO_6], [MICRO_7]
- 5 Nano hashtags (1K-10K) — [NANO_1], [NANO_2], [NANO_3], [NANO_4], [NANO_5]
- Note any to AVOID (banned, oversaturated)

FORMAT: Return caption with line breaks and hashtags separately.`,
    description: "Reels caption with hashtag strategy for reach",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Instagram Reels", "Caption", "Hashtags", "Strategy"],
    useCase: "Create Reels captions and hashtag sets for reach",
    variables: ["TOPIC", "CAPTION_IDEA", "MEGA_1", "MEGA_2", "MEGA_3", "MACRO_1", "MACRO_2", "MACRO_3", "MACRO_4", "MACRO_5", "MICRO_1", "MICRO_2", "MICRO_3", "MICRO_4", "MICRO_5", "MICRO_6", "MICRO_7", "NANO_1", "NANO_2", "NANO_3", "NANO_4", "NANO_5"],
  },
  {
    id: "social-content-calendar-2026",
    title: "30-Day Content Calendar",
    prompt: `You are a content strategist. Create a 30-day content calendar for [BRAND/NICHE] on [PLATFORMS].

TASK: Design content themes and posting strategy for one month.

CALENDAR STRUCTURE:
Week 1 Theme: [WEEK_1_THEME]
- Day 1: [POST_1] - [FORMAT_1] - [HOOK_1]
- Day 2: [POST_2] - [FORMAT_2] - [HOOK_2]
- Day 3: [POST_3] - [FORMAT_3] - [HOOK_3]
- Day 4: Rest/Reels
- Day 5: [POST_5] - [FORMAT_5] - [HOOK_5]
- Day 6: [POST_6] - [FORMAT_6] - [HOOK_6]
- Day 7: Engagement/Cross-engagement

[Repeat for Weeks 2-4]

POST FORMATS TO MIX:
- Educational carousels
- Behind-the-scenes
- User-generated content reposts
- Trend participation
- Thought leadership
- Product demos
- FAQs/答疑
- Customer testimonials

REQUIREMENTS:
- Mix of content types throughout month
- 1 viral-optimized post per week
- 1 engagement/relationship post per week
- 1 promotional post per week
- Theme continuity within each week

FORMAT: Return as weekly breakdown with day, format, topic, and hook for each.`,
    description: "30-day content calendar with themes and posting strategy",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Content Calendar", "Planning", "Strategy", "Consistency"],
    useCase: "Plan a month of strategic social content",
    variables: ["BRAND/NICHE", "PLATFORMS", "WEEK_1_THEME", "POST_1", "FORMAT_1", "HOOK_1", "POST_2", "FORMAT_2", "HOOK_2", "POST_3", "FORMAT_3", "HOOK_3", "POST_5", "FORMAT_5", "HOOK_5", "POST_6", "FORMAT_6", "HOOK_6"],
  },

  // ===== CONTENT CREATION - 2026 SEO =====
  {
    id: "content-blog-seo-2026",
    title: "SEO-Optimized Long-Form Article",
    prompt: `You are an expert SEO content strategist for 2026. Create a comprehensive article optimized for search and AI overview panels.

TASK: Write complete SEO article for "[TOPIC]" targeting [PRIMARY_KEYWORD].

ARTICLE SPECS:
- Target word count: [WORD_COUNT]
- Reading level: [READABILITY] (simple/intermediate/advanced)
- Content format: [FORMAT] (how-to/list/guide/comparison/review)

STRUCTURE REQUIREMENTS:
- Introduction: E-E-A-T optimized, 100-150 words
- Table of contents (auto-generated)
- H2 sections: [H2_1], [H2_2], [H2_3], [H2_4]
- Each H2: 2-3 H3 subsections
- FAQ section: 5 questions with direct answers
- Conclusion: Unique takeaway + CTA

SEO ELEMENTS:
- Primary keyword in: title, first 100 words, 1 H2, 2-3 H3s, conclusion
- Secondary keywords: [SECONDARY_KEYWORDS]
- Internal links: [INTERNAL_LINK_1], [INTERNAL_LINK_2]
- External links: 2-3 authoritative sources

AI OVERVIEW OPTIMIZATION:
- Clear, direct answers within first 200 words
- Structured data format for key points
- Bullet points for steps/processes
- No fluff or filler

FORMAT: Return as complete article with proper heading hierarchy and SEO elements marked.`,
    description: "Complete SEO article optimized for 2026 rankings",
    category: "content-creation",
    subcategory: "blog",
    tags: ["SEO", "Blog", "Long-form", "Content", "2026"],
    useCase: "Write comprehensive SEO articles that rank",
    variables: ["TOPIC", "PRIMARY_KEYWORD", "WORD_COUNT", "READABILITY", "FORMAT", "H2_1", "H2_2", "H2_3", "H2_4", "SECONDARY_KEYWORDS", "INTERNAL_LINK_1", "INTERNAL_LINK_2"],
  },
  {
    id: "content-newsletter-2026",
    title: "Newsletter That Converts (2026)",
    prompt: `You are a newsletter strategist. Write a newsletter issue that drives engagement and conversions.

TASK: Create newsletter for [AUDIENCE] about [TOPIC].

NEWSLETTER ELEMENTS:
- Subject line: 40-60 chars, curiosity + value
- Preview text: 85-100 chars, adds urgency
- From name: [FROM_NAME] (should feel personal)

OPENING OPTIONS:
1. "[OPENING_HOOK]" — direct start
2. "[STORY_OPENING]" — personal story
3. "[QUESTION_OPENING]" — engage curiosity

BODY REQUIREMENTS:
- Length: [WORD_COUNT] words
- Tone: [TONE] (conversational/professional/witty)
- Include 1 story or example
- Include 1 surprising stat or data point
- Challenge conventional thinking in 1 section
- Practical takeaway they can apply

SECTIONS:
- Section 1: [SECTION_1_THEME] — [WORD_COUNT_1] words
- Section 2: [SECTION_2_THEME] — [WORD_COUNT_2] words
- [Optional Section 3]: [SECTION_3_THEME] — [WORD_COUNT_3] words

CTA: [PRIMARY_CTA] — specific, actionable

FORMAT: Return as complete newsletter with subject, preview, body, and CTA.`,
    description: "Newsletter that gets opened, read, and drives action",
    category: "content-creation",
    subcategory: "newsletter",
    tags: ["Newsletter", "Email", "Copy", "Conversion"],
    useCase: "Write newsletters that convert subscribers",
    variables: ["AUDIENCE", "TOPIC", "FROM_NAME", "OPENING_HOOK", "STORY_OPENING", "QUESTION_OPENING", "WORD_COUNT", "TONE", "SECTION_1_THEME", "WORD_COUNT_1", "SECTION_2_THEME", "WORD_COUNT_2", "SECTION_3_THEME", "WORD_COUNT_3", "PRIMARY_CTA"],
  },
  {
    id: "content-youtube-script-2026",
    title: "YouTube Algorithm Script (2026)",
    prompt: `You are a YouTube strategist optimizing for 2026 algorithm. Create video script for [TOPIC].

TASK: Write [DURATION]-minute YouTube script optimized for retention and watch time.

ALGORITHM FACTORS:
- Audience retention curve
- Click-through rate on thumbnails
- Viewer feedback (likes, comments, saves)
- Watch time percentage
- Session start points

SCRIPT STRUCTURE:
0:00-0:30 [HOOK]: Must hook before any intro music
0:30-1:00 [PREVIEW]: Promise what's coming
1:00-[DURATION-2:00] [BODY]: Core content with micro-hooks every [INTERVAL] seconds
[DURATION-2:00]-[DURATION-1:00] [VALUE]: Peak value delivery
[DURATION-1:00]-[DURATION] [CTA]: Subscribe + watch next + comment

RETENTION TACTICS:
- Pattern interrupts at [MARKER_1], [MARKER_2]
- Story element by [STORY_MARKER]
- Data visualization request: [DATA_VISUALIZATION]

AUDIENCE: [TARGET_AUDIENCE]
EXPECTED VALUE: [VALUE_PROPOSITION]

SPEAKER NOTES:
- Pace: 150 words per minute
- Emphasis on key phrases: [EMPHASIS_WORDS]
- Pause points for B-roll: [BROLL_MARKERS]

FORMAT: Return as timed script with VO, B-roll notes, and retention markers.`,
    description: "YouTube script optimized for 2026 algorithm",
    category: "content-creation",
    subcategory: "script",
    tags: ["YouTube", "Script", "Retention", "Algorithm"],
    useCase: "Write YouTube scripts that rank and retain viewers",
    variables: ["TOPIC", "DURATION", "INTERVAL", "MARKER_1", "MARKER_2", "STORY_MARKER", "DATA_VISUALIZATION", "TARGET_AUDIENCE", "VALUE_PROPOSITION", "EMPHASIS_WORDS", "BROLL_MARKERS"],
  },
  {
    id: "content-copywriting-framework",
    title: "Persuasive Copy Framework",
    prompt: `You are a direct response copywriter. Create persuasive copy using proven frameworks.

TASK: Write [CONTENT_TYPE] for [PRODUCT/SERVICE] using [FRAMEWORK].

FRAMEWORK OPTIONS:
1. AIDA (Attention, Interest, Desire, Action)
2. PAS (Problem, Agitate, Solution)
3. BAB (Before, After, Bridge)
4. 4Ps (Promise, Picture, Proof, Push)

[CONTENT_TYPE] DETAILS:
- Format: [FORMAT]
- Length: [LENGTH]
- Target: [TARGET_AUDIENCE]
- Goal: [GOAL]

TONE REQUIREMENTS:
- Voice: [VOICE]
- Emotional trigger: [EMOTIONAL_TRIGGER]
- Urgency level: [URGENCY] (none/low/medium/high)

BENEFITS TO HIGHLIGHT:
1. [BENEFIT_1]
2. [BENEFIT_2]
3. [BENEFIT_3]

PROOF ELEMENTS:
- [TESTIMONIAL_SNIPPET] or
- [STAT_OR_DATA]

OBJECTION HANDLING:
- [COMMON_OBJECTION]: Response

FORMAT: Return as complete copy using specified framework structure. Include headline options.`,
    description: "Persuasive copy using proven direct response frameworks",
    category: "content-creation",
    subcategory: "copywriting",
    tags: ["Copywriting", "Persuasion", "Conversion", "Sales"],
    useCase: "Write persuasive copy that drives action",
    variables: ["CONTENT_TYPE", "PRODUCT/SERVICE", "FRAMEWORK", "FORMAT", "LENGTH", "TARGET_AUDIENCE", "GOAL", "VOICE", "EMOTIONAL_TRIGGER", "URGENCY", "BENEFIT_1", "BENEFIT_2", "BENEFIT_3", "TESTIMONIAL_SNIPPET", "COMMON_OBJECTION"],
  },
  {
    id: "content-landing-page",
    title: "High-Converting Landing Page",
    prompt: `You are a conversion rate optimization specialist. Design a landing page for [OFFER].

TASK: Create complete landing page copy and structure.

LANDING PAGE ELEMENTS:
1. Headline: [HEADLINE] — promise-focused, outcome-oriented
2. Subheadline: [SUBHEADLINE] — expand on the promise
3. Hero image/video: [VISUAL_DIRECTION]

SECTION STRUCTURE:
Section 1 (Problem): [PROBLEM_STATEMENT] — make them feel the pain
Section 2 (Agitation): [AGITATION_POINT] — deepen the pain
Section 3 (Solution intro): [SOLUTION_INTRO] — reveal the solution
Section 4 (Features/Benefits): [FEATURES], [BENEFITS]
Section 5 (Social proof): [PROOF_TYPE] — testimonials/stats/case studies
Section 6 (Offer details): [OFFER_DETAILS]
Section 7 (Risk reversal): [GUARANTEE] — reduce friction
Section 8 (CTA): [PRIMARY_CTA], [SECONDARY_CTA]

TRUST ELEMENTS TO INCLUDE:
- [TRUST_BADGE_1]
- [TRUST_BADGE_2]
- [TRUST_BADGE_3]

MOBILE CONSIDERATIONS:
- Above-fold must work without scroll
- Sticky CTA suggestion
- Thumb-friendly button placement

FORMAT: Return as landing page structure with copy for each section.`,
    description: "Complete landing page optimized for conversions",
    category: "content-creation",
    subcategory: "copywriting",
    tags: ["Landing Page", "Conversion", "CVR", "Sales"],
    useCase: "Design landing pages that convert",
    variables: ["OFFER", "HEADLINE", "SUBHEADLINE", "VISUAL_DIRECTION", "PROBLEM_STATEMENT", "AGITATION_POINT", "SOLUTION_INTRO", "FEATURES", "BENEFITS", "PROOF_TYPE", "OFFER_DETAILS", "GUARANTEE", "PRIMARY_CTA", "SECONDARY_CTA", "TRUST_BADGE_1", "TRUST_BADGE_2", "TRUST_BADGE_3"],
  },

  // ===== EMAIL MARKETING - 2026 =====
  {
    id: "email-cold-outreach-2026",
    title: "Cold Email Sequence (2026)",
    prompt: `You are a B2B sales copywriter. Create cold email sequence for [OFFER/PRODUCT].

TASK: Write 3-email cold outreach sequence optimized for 2026 deliverability and response rates.

EMAIL SETUP:
- Email 1 (Day 0): Initial touch
- Email 2 (Day 5): Follow-up with new angle
- Email 3 (Day 10): Breakup or final attempt

PROSPECT DATA:
- Industry: [INDUSTRY]
- Role: [ROLE]
- Company: [COMPANY]
- Pain point: [PAIN_POINT]
- personalization: [PERSONALIZATION_NOTE]

EMAIL REQUIREMENTS:
- Subject lines: 5 options per email (curiosity, outcome, personalization, question, stat)
- Preview text: 1 per email (max 100 chars)
- Body: 50-100 words (shorter = better reply rate)
- One CTA per email (reply, demo, call — NOT buy)
- No attachments in Email 1
- Signature: Minimal (name, title, one link)

EMAIL 1 FOCUS: [EMAIL_1_FOCUS]
EMAIL 2 FOCUS: [EMAIL_2_FOCUS]
EMAIL 3 FOCUS: [EMAIL_3_FOCUS]

AVOID SPAM TRIGGERS:
- No "free", "act now", "limited time"
- No excessive punctuation (!!!)
- No all-caps words

FORMAT: Return as numbered sequence. Each email: subjects, preview, body, signature.`,
    description: "Cold email sequence optimized for 2026 deliverability",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Cold Email", "Sales", "Outreach", "B2B"],
    useCase: "Write cold emails that get opened and replied to",
    variables: ["OFFER/PRODUCT", "INDUSTRY", "ROLE", "COMPANY", "PAIN_POINT", "PERSONALIZATION_NOTE", "EMAIL_1_FOCUS", "EMAIL_2_FOCUS", "EMAIL_3_FOCUS"],
  },
  {
    id: "email-welcome-series-2026",
    title: "Welcome Sequence (2026)",
    prompt: `You are an email marketing strategist. Create onboarding sequence for [PRODUCT/SERVICE].

TASK: Design 5-email welcome sequence that activates and educates.

SEQUENCE GOAL: [PRIMARY_GOAL] (first purchase/activation/engagement)

EMAIL SCHEDULE:
- Email 1 (Day 0): Welcome + immediate value
- Email 2 (Day 2): Story + trust building
- Email 3 (Day 5): Product deep dive
- Email 4 (Day 8): Social proof
- Email 5 (Day 12): First CTA

BRAND VOICE: [VOICE]

EMAIL 1 CONTENT:
- Subject: [EMAIL_1_SUBJECT]
- Hook: [EMAIL_1_HOOK]
- Body: [EMAIL_1_BODY]
- CTA: [EMAIL_1_CTA]

EMAIL 2 CONTENT:
- Subject: [EMAIL_2_SUBJECT]
- Hook: [EMAIL_2_HOOK]
- Body: [EMAIL_2_BODY]
- CTA: [EMAIL_2_CTA]

[Continue for all 5 emails]

ENGAGEMENT TRIGGERS:
- Quick win in Email 1 (lead magnet or easy action)
- Story arc across sequence
- Progressive disclosure of value

UNSUBSCRIBE NOTE: Required in all emails

FORMAT: Return as 5-email sequence with subject, preview, body, and CTA for each.`,
    description: "Welcome sequence that activates new subscribers",
    category: "email-marketing",
    subcategory: "welcome",
    tags: ["Email", "Onboarding", "Welcome", "Sequence"],
    useCase: "Build welcome sequences that activate customers",
    variables: ["PRODUCT/SERVICE", "PRIMARY_GOAL", "VOICE", "EMAIL_1_SUBJECT", "EMAIL_1_HOOK", "EMAIL_1_BODY", "EMAIL_1_CTA", "EMAIL_2_SUBJECT", "EMAIL_2_HOOK", "EMAIL_2_BODY", "EMAIL_2_CTA"],
  },
  {
    id: "email-abandoned-cart",
    title: "Abandoned Cart Recovery",
    prompt: `You are an ecommerce email strategist. Create abandoned cart email sequence for [PRODUCT_TYPE].

TASK: Design recovery sequence for abandoned carts.

SEQUENCE STRUCTURE:
- Email 1 (1 hour): Cart reminder
- Email 2 (24 hours): Urgency + incentive
- Email 3 (72 hours): Social proof + ask
- Email 4 (5 days): Last chance + sacrifice

CART DETAILS:
- Product: [PRODUCT_NAME]
- Price: [PRICE]
- Cart value: [CART_VALUE]
- Urgency factor: [URGENCY_FACTOR]

EMAIL CUSTOMIZATION:
- Use [PERSONALIZATION] in subject/body
- Include product image description: [PRODUCT_IMAGE_NOTE]
- Checkout link: [CHECKOUT_LINK]

SUBJECT LINE STRATEGIES:
- Email 1: "[SUBJECT_1]" (friendly reminder)
- Email 2: "[SUBJECT_2]" (urgency)
- Email 3: "[SUBJECT_3]" (social proof)
- Email 4: "[SUBJECT_4]" (loss aversion)

INCENTIVE OPTIONS:
- [INCENTIVE_1] (discount)
- [INCENTIVE_2] (free shipping)
- [INCENTIVE_3] (bonus)

FORMAT: Return as 4-email sequence with timing, subjects, body copy, and CTA.`,
    description: "Abandoned cart email sequence for ecommerce recovery",
    category: "email-marketing",
    subcategory: "retention",
    tags: ["Abandoned Cart", "Ecommerce", "Recovery", "Email"],
    useCase: "Recover abandoned carts with strategic emails",
    variables: ["PRODUCT_TYPE", "PRODUCT_NAME", "PRICE", "CART_VALUE", "URGENCY_FACTOR", "PERSONALIZATION", "PRODUCT_IMAGE_NOTE", "CHECKOUT_LINK", "SUBJECT_1", "SUBJECT_2", "SUBJECT_3", "SUBJECT_4", "INCENTIVE_1", "INCENTIVE_2", "INCENTIVE_3"],
  },
  {
    id: "email-reengagement",
    title: "Win-Back Campaign",
    prompt: `You are an email strategist. Create reengagement sequence for inactive subscribers.

TASK: Win back subscribers inactive for [INACTIVITY_DAYS] days.

SEGMENT: [SEGMENT_DESCRIPTION]
Last active: [LAST_ACTIVE_DATE]
Total subscribers: [SUBSCRIBER_COUNT]

EMAIL SEQUENCE:
- Email 1 (Day 0): We miss you + value reminder
- Email 2 (Day 7): New content/capability
- Email 3 (Day 14): Last chance survey

REENGAGEMENT STRATEGIES:
- Apologize for inactivity: [APOLOGY_NOTE]
- Highlight new content: [NEW_CONTENT_NOTE]
- Offer preference update: [PREFERENCE_OPTION]

EMAIL 1:
- Subject: "[SUBJECT_1]"
- Hook: "[HOOK_1]"
- Body: Why they should re-engage
- CTA: [CTA_1]

EMAIL 2:
- Subject: "[SUBJECT_2]"
- Hook: "[HOOK_2]"
- Body: What's new and valuable
- CTA: [CTA_2]

EMAIL 3:
- Subject: "[SUBJECT_3]"
- Hook: "[HOOK_3]"
- Body: Final ask with survey option
- CTA: [CTA_3] + preference center link

FAIL CRITERIA: If no open after Email 3, suggest removal

FORMAT: Return as 3-email sequence.`,
    description: "Reengagement campaign for inactive subscribers",
    category: "email-marketing",
    subcategory: "retention",
    tags: ["Reengagement", "Win-Back", "Inactive", "Email"],
    useCase: "Win back subscribers before list cleaning",
    variables: ["INACTIVITY_DAYS", "SEGMENT_DESCRIPTION", "LAST_ACTIVE_DATE", "SUBSCRIBER_COUNT", "APOLOGY_NOTE", "NEW_CONTENT_NOTE", "PREFERENCE_OPTION", "SUBJECT_1", "HOOK_1", "CTA_1", "SUBJECT_2", "HOOK_2", "CTA_2", "SUBJECT_3", "HOOK_3", "CTA_3"],
  },

  // ===== DESIGN & CREATORS =====
  {
    id: "designer-thumbnail-2026",
    title: "YouTube Thumbnail Optimizer (2026)",
    prompt: `You are a YouTube thumbnail designer. Create high-CTR thumbnail for [VIDEO_TOPIC].

TASK: Generate thumbnail design specs optimized for 2026 YouTube algorithm.

REFERENCE ANALYSIS:
[REFERENCE_ANALYSIS]

VIDEO DETAILS:
- Title: [VIDEO_TITLE]
- Niche: [NICHE]
- Audience: [AUDIENCE]
- Promise: [WHAT_VIEWER_GETS]

THUMBNAIL SPECS:
- Size: 1280x720px (16:9)
- Must be readable at 12px font size

ELEMENTS TO INCLUDE:
1. Subject/Face: [FACE_EXPRESSION] (exaggerated reaction)
2. Background: [BACKGROUND_STYLE] (simple, high contrast)
3. Text: [TEXT_OPTION_1] or [TEXT_OPTION_2] (max 5-6 words)
4. Brand accent: [BRAND_ACCENT]
5. Emotional trigger: [EMOTIONAL_TRIGGER]

DESIGN RULES:
- Rule of thirds: face in upper third
- Maximum 2-3 visual elements
- Bright, saturated colors against muted background
- Face/expression must be clearly visible
- Contrast: Text readable at small sizes

COLOR PALETTE:
- Primary: [PRIMARY_COLOR]
- Accent: [ACCENT_COLOR]
- Text: [TEXT_COLOR] (high contrast)

CLICK OPTIMIZATION:
- Curiosity gap: [CURIOSITY_ELEMENT]
- Outcome promise: [OUTCOME_PROMISE]
- Pattern interrupt: [INTERRUPT_ELEMENT]

FORMAT: Return as detailed thumbnail design brief with color codes and element placement.`,
    description: "YouTube thumbnail optimized for 2026 CTR",
    category: "designer-creator",
    subcategory: "youtube-thumb",
    tags: ["YouTube", "Thumbnail", "CTR", "Design"],
    useCase: "Design thumbnails that maximize click-through rate",
    variables: ["VIDEO_TOPIC", "VIDEO_TITLE", "NICHE", "AUDIENCE", "WHAT_VIEWER_GETS", "REFERENCE_ANALYSIS", "FACE_EXPRESSION", "BACKGROUND_STYLE", "TEXT_OPTION_1", "TEXT_OPTION_2", "BRAND_ACCENT", "EMOTIONAL_TRIGGER", "PRIMARY_COLOR", "ACCENT_COLOR", "TEXT_COLOR", "CURIOSITY_ELEMENT", "OUTCOME_PROMISE", "INTERRUPT_ELEMENT"],
  },
  {
    id: "designer-brand-kit-2026",
    title: "Brand Identity System (2026)",
    prompt: `You are a brand designer. Create complete brand identity for [BRAND_NAME].

TASK: Build brand kit including logo concepts, color palette, typography, and voice.

BRAND BRIEF:
- Industry: [INDUSTRY]
- Audience: [AUDIENCE]
- Personality: [BRAND_PERSONALITY]
- Competitors: [COMPETITORS]
- Mood: [MOOD]

REFERENCE ANALYSIS:
[REFERENCE_ANALYSIS]

DELIVERABLES:

1. LOGO CONCEPTS (3 directions):
- Minimal: [MINIMAL_CONCEPT]
- Bold: [BOLD_CONCEPT]
- Playful: [PLAYFUL_CONCEPT]

2. COLOR PALETTE:
- Primary: [PRIMARY_COLOR_HEX] — [USAGE]
- Secondary: [SECONDARY_COLOR_HEX] — [USAGE]
- Accent: [ACCENT_COLOR_HEX] — [USAGE]
- Dark: [DARK_COLOR_HEX] — [USAGE]
- Light: [LIGHT_COLOR_HEX] — [USAGE]

3. TYPOGRAPHY:
- Display: [DISPLAY_FONT] — for headlines
- Body: [BODY_FONT] — for paragraphs
- Accent: [ACCENT_FONT] — for quotes, special text

4. VOICE & TONE:
- Primary: [VOICE_1]
- Secondary: [VOICE_2]
- Never use: [AVOID_WORDS]

5. VISUAL ELEMENTS:
- Icon style: [ICON_STYLE]
- Pattern/Texture: [PATTERN_IDEA]
- Image treatment: [IMAGE_STYLE]

6. BRAND APPLICATIONS:
- Business card
- Social post
- App icon
- Packaging

FORMAT: Return as comprehensive brand guidelines document with swatches, font links, and concept descriptions.`,
    description: "Complete brand identity system for 2026",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Brand", "Identity", "Logo", "Design", "Typography"],
    useCase: "Build complete visual brand identity",
    variables: ["BRAND_NAME", "INDUSTRY", "AUDIENCE", "BRAND_PERSONALITY", "COMPETITORS", "MOOD", "REFERENCE_ANALYSIS", "MINIMAL_CONCEPT", "BOLD_CONCEPT", "PLAYFUL_CONCEPT", "PRIMARY_COLOR_HEX", "USAGE", "SECONDARY_COLOR_HEX", "ACCENT_COLOR_HEX", "DARK_COLOR_HEX", "LIGHT_COLOR_HEX", "DISPLAY_FONT", "BODY_FONT", "ACCENT_FONT", "VOICE_1", "VOICE_2", "AVOID_WORDS", "ICON_STYLE", "PATTERN_IDEA", "IMAGE_STYLE"],
  },
  {
    id: "designer-presentation-2026",
    title: "Pitch Deck Master",
    prompt: `You are a presentation designer. Create pitch deck structure for [COMPANY/BRAND].

TASK: Design investor/customer pitch deck with compelling narrative.

AUDIENCE: [AUDIENCE] (investors/customers/partners)

SLIDE COUNT: [SLIDE_COUNT]

NARRATIVE ARC:
1. Problem: [PROBLEM] — make them feel the pain
2. Solution: [SOLUTION] — what you built
3. Market: [MARKET_SIZE] — opportunity size
4. Business Model: [HOW_YOU_MAKE_MONEY]
5. Traction: [TRACTION] — metrics, users, revenue
6. Competition: [COMPETITIVE_ADVANTAGE]
7. Team: [TEAM_STRENGTHS]
8. Financials: [FINANCIAL_PROJECTION]
9. Ask: [THE_ASK]

SLIDE DESIGN RULES:
- One idea per slide (max 30 words)
- Data viz over text where possible
- [BRAND_COLORS], [BRAND_FONT]
- Every slide answers: "Why should I care?"

TALKING POINTS per slide:
Slide 1 (Title): [TALKING_POINT_1]
Slide 2 (Problem): [TALKING_POINT_2]
Slide 3 (Solution): [TALKING_POINT_3]
[Continue for all slides]

DESIGN NOTES:
- Layout style: [LAYOUT_STYLE]
- Visual elements: [VISUAL_ELEMENTS]
- Animation: [ANIMATION_STYLE]

FORMAT: Return as slide-by-slide brief with design specs and talking points.`,
    description: "Investor-grade pitch deck with narrative structure",
    category: "designer-creator",
    subcategory: "presentation",
    tags: ["Pitch Deck", "Presentation", "Investors", "Startup"],
    useCase: "Create pitch decks that win funding",
    variables: ["COMPANY/BRAND", "AUDIENCE", "SLIDE_COUNT", "PROBLEM", "SOLUTION", "MARKET_SIZE", "HOW_YOU_MAKE_MONEY", "TRACTION", "COMPETITIVE_ADVANTAGE", "TEAM_STRENGTHS", "FINANCIAL_PROJECTION", "THE_ASK", "BRAND_COLORS", "BRAND_FONT", "TALKING_POINT_1", "TALKING_POINT_2", "TALKING_POINT_3", "LAYOUT_STYLE", "VISUAL_ELEMENTS", "ANIMATION_STYLE"],
  },

  // ===== CODING & TECH =====
  {
    id: "code-review-comprehensive",
    title: "Senior Engineer Code Review",
    prompt: `You are a senior software engineer with 15+ years experience. Perform comprehensive code review.

TASK: Review [LANGUAGE/FRAMEWORK] code for [PURPOSE].

CODE TO REVIEW:
[CODE_HERE]

REVIEW CATEGORIES:

1. SECURITY (CRITICAL):
- Injection vulnerabilities
- Authentication/authorization flaws
- Data exposure risks
- Secrets in code
- Input validation

2. PERFORMANCE:
- Algorithm efficiency
- Database query optimization
- Caching opportunities
- Memory management
- Async/blocking issues

3. BEST PRACTICES:
- SOLID principles adherence
- Design patterns usage
- Error handling
- Testing coverage
- Documentation

4. SCALABILITY:
- Hardcoded values
- Single points of failure
- Database connection limits
- API rate limiting

5. CODE QUALITY:
- Naming conventions
- Function complexity
- Comment quality
- Dead code

REVIEW FORMAT:
1. Summary (1-10 rating with reasoning)
2. Critical Issues (must fix immediately)
3. Recommended Changes (should fix)
4. Suggestions (could fix)
5. Positives (what was done well)
6. Line-specific notes

OUTPUT REQUIREMENTS:
- Severity level for each issue
- Code snippet for suggested fixes
- Estimated impact on system

FORMAT: Return as structured review document. CRITICAL issues clearly labeled.`,
    description: "Comprehensive code review from senior engineer perspective",
    category: "coding-tech",
    subcategory: "code-review",
    tags: ["Code Review", "Security", "Performance", "Best Practices"],
    useCase: "Review code for security, performance, and best practices",
    variables: ["LANGUAGE/FRAMEWORK", "PURPOSE", "CODE_HERE"],
  },
  {
    id: "code-architecture-design",
    title: "System Architecture Design",
    prompt: `You are a software architect. Design system architecture for [PROJECT_TYPE].

TASK: Create scalable, maintainable system design for [REQUIREMENTS].

PROJECT CONTEXT:
- Type: [PROJECT_TYPE]
- Scale: [SCALE] (MVP/startup/enterprise)
- Users: [EXPECTED_USERS]
- Tech stack: [CURRENT_STACK]

ARCHITECTURE COMPONENTS:

1. SYSTEM OVERVIEW:
- High-level architecture diagram description
- Component responsibilities
- Data flow

2. FRONTEND:
- Framework: [FRONTEND_FRAMEWORK]
- State management: [STATE_MGMT]
- API integration pattern

3. BACKEND:
- Server architecture: [SERVER_TYPE]
- API design: [API_STYLE] (REST/GraphQL/gRPC)
- Authentication: [AUTH_STRATEGY]

4. DATABASE:
- Primary: [PRIMARY_DB]
- Caching: [CACHING_LAYER]
- Search: [SEARCH_ENGINE]

5. DEPLOYMENT:
- Infrastructure: [INFRASTRUCTURE]
- CI/CD: [CICD_PIPELINE]
- Monitoring: [MONITORING]

SCALABILITY CONSIDERATIONS:
- [SCALE_STRATEGY_1]
- [SCALE_STRATEGY_2]

COST ESTIMATION:
- [COST_FACTOR_1]
- [COST_FACTOR_2]

RISKS & MITIGATIONS:
- [RISK_1]: [MITIGATION_1]
- [RISK_2]: [MITIGATION_2]

FORMAT: Return as technical architecture document with diagrams described in text, component responsibilities, and implementation recommendations.`,
    description: "System architecture design for scalable applications",
    category: "coding-tech",
    subcategory: "architecture",
    tags: ["Architecture", "System Design", "Scalability", "Tech"],
    useCase: "Design scalable system architectures",
    variables: ["PROJECT_TYPE", "REQUIREMENTS", "SCALE", "EXPECTED_USERS", "CURRENT_STACK", "FRONTEND_FRAMEWORK", "STATE_MGMT", "SERVER_TYPE", "API_STYLE", "AUTH_STRATEGY", "PRIMARY_DB", "CACHING_LAYER", "SEARCH_ENGINE", "INFRASTRUCTURE", "CICD_PIPELINE", "MONITORING", "SCALE_STRATEGY_1", "SCALE_STRATEGY_2", "COST_FACTOR_1", "COST_FACTOR_2", "RISK_1", "MITIGATION_1", "RISK_2", "MITIGATION_2"],
  },
  {
    id: "code-api-documentation",
    title: "API Documentation Generator",
    prompt: `You are a technical writer specializing in developer experience. Create comprehensive API documentation.

TASK: Document [API_NAME] API for [AUDIENCE].

API OVERVIEW:
- Base URL: [BASE_URL]
- Auth method: [AUTH_METHOD]
- Version: [API_VERSION]
- Rate limits: [RATE_LIMITS]

ENDPOINTS TO DOCUMENT:

1. [ENDPOINT_1]:
- Method: [METHOD_1]
- Path: [PATH_1]
- Description: [DESCRIPTION_1]
- Auth required: [AUTH_1]
- Request body: [BODY_1]
- Response: [RESPONSE_1]
- Error codes: [ERROR_CODES_1]
- Example: [EXAMPLE_1]

2. [ENDPOINT_2]:
[Continue for all endpoints]

PARAMETERS TABLE:
- Name: [PARAM_NAME]
- Type: [PARAM_TYPE]
- Required: [PARAM_REQUIRED]
- Description: [PARAM_DESC]
- Default: [PARAM_DEFAULT]

AUTHENTICATION GUIDE:
- [AUTH_EXPLANATION]
- Example request with auth

ERROR HANDLING:
- [ERROR_CODE_1]: [MEANING_1]
- [ERROR_CODE_2]: [MEANING_2]
- [ERROR_CODE_3]: [MEANING_3]

CODE EXAMPLES:
- cURL: [CURL_EXAMPLE]
- Python: [PYTHON_EXAMPLE]
- JavaScript: [JS_EXAMPLE]

FORMAT: Return as comprehensive API documentation with proper structure, code examples, and error handling sections.`,
    description: "Complete API documentation for developer experience",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["API", "Documentation", "Developer Experience", "Technical Writing"],
    useCase: "Create comprehensive, developer-friendly API docs",
    variables: ["API_NAME", "AUDIENCE", "BASE_URL", "AUTH_METHOD", "API_VERSION", "RATE_LIMITS", "ENDPOINT_1", "METHOD_1", "PATH_1", "DESCRIPTION_1", "AUTH_1", "BODY_1", "RESPONSE_1", "ERROR_CODES_1", "EXAMPLE_1", "ENDPOINT_2", "PARAM_NAME", "PARAM_TYPE", "PARAM_REQUIRED", "PARAM_DESC", "PARAM_DEFAULT", "AUTH_EXPLANATION", "ERROR_CODE_1", "MEANING_1", "ERROR_CODE_2", "MEANING_2", "ERROR_CODE_3", "MEANING_3", "CURL_EXAMPLE", "PYTHON_EXAMPLE", "JS_EXAMPLE"],
  },

  // ===== BUSINESS & STRATEGY =====
  {
    id: "business-saas-growth",
    title: "SaaS Growth Strategy (2026)",
    prompt: `You are a SaaS growth strategist. Create comprehensive growth strategy for [PRODUCT].

TASK: Design multi-channel growth strategy for [TIMEFRAME].

CURRENT STATE:
- MRR: [CURRENT_MRR]
- Users: [CURRENT_USERS]
- Churn: [CURRENT_CHURN]
- CAC: [CURRENT_CAC]

TARGET:
- MRR goal: [MRR_GOAL]
- Timeframe: [TIMEFRAME]

GROWTH CHANNELS:

1. PRODUCT-LED GROWTH:
- [PLG_STRATEGY_1]
- [PLG_STRATEGY_2]
- Viral coefficient: [VIRAL_COEFFICIENT_TARGET]

2. CONTENT MARKETING:
- [CONTENT_STRATEGY]
- SEO targets: [SEO_TARGETS]
- Blog calendar: [BLOG_CALENDAR]

3. PAID ACQUISITION:
- Channels: [PAID_CHANNELS]
- Budget: [PAID_BUDGET]
- Expected CAC: [EXPECTED_CAC]

4. PARTNERSHIPS:
- [PARTNER_TYPE_1]
- [PARTNER_TYPE_2]
- Revenue share: [REV_SHARE]

5. REFERRAL:
- [REFERRAL_PROGRAM]
- Incentive: [INCENTIVE]

METRICS TO TRACK:
- [METRIC_1]
- [METRIC_2]
- [METRIC_3]

BOTTLELOCKS TO ADDRESS:
- [BOTTLENECK_1]: [SOLUTION_1]
- [BOTTLENECK_2]: [SOLUTION_2]

FORMAT: Return as comprehensive growth strategy with channel breakdown, metrics, and timeline.`,
    description: "SaaS growth strategy for 2026",
    category: "business-strategy",
    subcategory: "saas",
    tags: ["SaaS", "Growth", "Strategy", "Marketing", "Metrics"],
    useCase: "Build comprehensive SaaS growth plan",
    variables: ["PRODUCT", "TIMEFRAME", "CURRENT_MRR", "CURRENT_USERS", "CURRENT_CHURN", "CURRENT_CAC", "MRR_GOAL", "PLG_STRATEGY_1", "PLG_STRATEGY_2", "VIRAL_COEFFICIENT_TARGET", "CONTENT_STRATEGY", "SEO_TARGETS", "BLOG_CALENDAR", "PAID_CHANNELS", "PAID_BUDGET", "EXPECTED_CAC", "PARTNER_TYPE_1", "PARTNER_TYPE_2", "REV_SHARE", "REFERRAL_PROGRAM", "INCENTIVE", "METRIC_1", "METRIC_2", "METRIC_3", "BOTTLENECK_1", "SOLUTION_1", "BOTTLENECK_2", "SOLUTION_2"],
  },
  {
    id: "business-market-analysis",
    title: "Market Analysis Report",
    prompt: `You are a business analyst. Create market analysis for [INDUSTRY/NICHE].

TASK: Research and document market landscape for strategic planning.

MARKET OVERVIEW:
- Industry: [INDUSTRY]
- Market size: [MARKET_SIZE]
- Growth rate: [GROWTH_RATE]
- Key trends: [TRENDS]

COMPETITIVE LANDSCAPE:

1. DIRECT COMPETITORS:
- [COMP_1]: [STRENGTH_1], [WEAKNESS_1]
- [COMP_2]: [STRENGTH_2], [WEAKNESS_2]
- [COMP_3]: [STRENGTH_3], [WEAKNESS_3]

2. INDIRECT COMPETITORS:
- [INDIRECT_1]: [HOW_THEY_COMPETE]

3. EMERGING PLAYERS:
- [NEW_PLAYER_1]: [THREAT_LEVEL]
- [NEW_PLAYER_2]: [THREAT_LEVEL]

MARKET OPPORTUNITIES:
- [OPPORTUNITY_1]
- [OPPORTUNITY_2]
- [OPPORTUNITY_3]

MARKET CHALLENGES:
- [CHALLENGE_1]
- [CHALLENGE_2]

CUSTOMER INSIGHTS:
- Pain points: [PAIN_POINTS]
- Willingness to pay: [PRICE_SENSITIVITY]
- Decision factors: [DECISION_FACTORS]

SWOT ANALYSIS:
- Strengths: [STRENGTHS]
- Weaknesses: [WEAKNESSES]
- Opportunities: [OPPORTUNITIES]
- Threats: [THREATS]

STRATEGIC RECOMMENDATIONS:
1. [RECOMMENDATION_1]
2. [RECOMMENDATION_2]
3. [RECOMMENDATION_3]

FORMAT: Return as comprehensive market analysis with competitive mapping, opportunities, and strategic recommendations.`,
    description: "Comprehensive market analysis for strategic planning",
    category: "business-strategy",
    subcategory: "analysis",
    tags: ["Market Analysis", "Competition", "Strategy", "Research"],
    useCase: "Conduct strategic market research and analysis",
    variables: ["INDUSTRY", "MARKET_SIZE", "GROWTH_RATE", "TRENDS", "COMP_1", "STRENGTH_1", "WEAKNESS_1", "COMP_2", "STRENGTH_2", "WEAKNESS_2", "COMP_3", "STRENGTH_3", "WEAKNESS_3", "INDIRECT_1", "NEW_PLAYER_1", "THREAT_LEVEL", "NEW_PLAYER_2", "OPPORTUNITY_1", "OPPORTUNITY_2", "OPPORTUNITY_3", "CHALLENGE_1", "CHALLENGE_2", "PAIN_POINTS", "PRICE_SENSITIVITY", "DECISION_FACTORS", "STRENGTHS", "WEAKNESSES", "OPPORTUNITIES", "THREATS", "RECOMMENDATION_1", "RECOMMENDATION_2", "RECOMMENDATION_3"],
  },

  // ===== E-COMMERCE =====
  {
    id: "ecom-amazon-listing-2026",
    title: "Amazon Listing Optimizer (2026)",
    prompt: `You are an Amazon SEO expert. Create optimized product listing for [PRODUCT].

TASK: Write complete Amazon listing with A+ content for [PRODUCT_NAME].

PRODUCT DETAILS:
- Category: [CATEGORY]
- Price: [PRICE]
- Key features: [FEATURES]
- Target audience: [AUDIENCE]

SEO KEYWORDS:
- Primary keyword: [PRIMARY_KW]
- Secondary keywords: [SECONDARY_KW]
- Backend search terms: [SEARCH_TERMS]

LISTING COMPONENTS:

1. TITLE (200 chars max):
- Include: primary keyword + benefit + feature + audience

2. BULLETS (5-7):
- Start each with [FEATURE_NAME]: specific detail
- Focus on benefits, not just specs

3. DESCRIPTION (2000 chars):
- Story + specs + social proof hook

4. A+ CONTENT:
- Headline: [A_PLUS_HEADLINE]
- Benefits section 1: [BENEFIT_BLOCK_1]
- Benefits section 2: [BENEFIT_BLOCK_2]
- Comparison chart (if applicable)

COMPETITOR ANALYSIS:
- [COMPETITOR] — differentiate by [DIFFERENTIATOR]

ENHANCED BRAND CONTENT:
- Lifestyle images: [LIFESTYLE_IDEA]
- Infographic: [INFOGRAPHIC_IDEA]

FORMAT: Return as complete listing with all components labeled. Include character counts.`,
    description: "Amazon listing optimized for 2026 A9 algorithm",
    category: "ecommerce",
    subcategory: "amazon",
    tags: ["Amazon", "Listing", "SEO", "Ecommerce", "A+"],
    useCase: "Create Amazon listings that rank and convert",
    variables: ["PRODUCT", "PRODUCT_NAME", "CATEGORY", "PRICE", "FEATURES", "AUDIENCE", "PRIMARY_KW", "SECONDARY_KW", "SEARCH_TERMS", "A_PLUS_HEADLINE", "BENEFIT_BLOCK_1", "BENEFIT_BLOCK_2", "COMPETITOR", "DIFFERENTIATOR", "LIFESTYLE_IDEA", "INFOGRAPHIC_IDEA"],
  },
  {
    id: "ecom-product-description-2026",
    title: "Shopify Product Copy (2026)",
    prompt: `You are an ecommerce copywriter. Write product descriptions for [PRODUCT_TYPE].

TASK: Create descriptions that convert browsers into buyers.

BRAND VOICE: [BRAND_VOICE]

PRODUCTS TO WRITE:

1. [PRODUCT_1]:
- Price: [PRICE_1]
- Features: [FEATURES_1]
- Benefits: [BENEFITS_1]
- Target audience: [AUDIENCE_1]

2. [PRODUCT_2]:
[Continue for each product]

DESCRIPTION STRUCTURE:
- Headline: Benefit-focused, emotional
- Hook paragraph: Problem → solution → transformation
- Features section: Specific, measurable
- Social proof: [PROOF_ELEMENT]
- CTA: [BUY_NOW_CTA]

CONVERSION ELEMENTS:
- Urgency: [URGENCY_ELEMENT]
- Scarcity: [SCARCITY_ELEMENT]
- Guarantee: [GUARANTEE]

MOBILE OPTIMIZATION:
- Above fold must convert without scroll
- Bullet points for scannability
- Clear CTA placement

FORMAT: Return as complete product descriptions ready to paste. Include headline, body, features, and CTA.`,
    description: "Shopify product descriptions optimized for conversions",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Shopify", "Product Copy", "Ecommerce", "Conversion"],
    useCase: "Write product descriptions that convert",
    variables: ["PRODUCT_TYPE", "BRAND_VOICE", "PRODUCT_1", "PRICE_1", "FEATURES_1", "BENEFITS_1", "AUDIENCE_1", "PRODUCT_2", "PROOF_ELEMENT", "BUY_NOW_CTA", "URGENCY_ELEMENT", "SCARCITY_ELEMENT", "GUARANTEE"],
  },

  // ===== VIDEO & PODCAST =====
  {
    id: "video-podcast-2026",
    title: "Podcast Episode Blueprint (2026)",
    prompt: `You are a podcast strategist. Create episode structure for [TOPIC].

TASK: Design podcast episode optimized for engagement and discoverability.

EPISODE SPECS:
- Duration: [DURATION] minutes
- Format: [FORMAT] (interview/solo/panel)
- Goal: [EPISODE_GOAL]

EPISODE STRUCTURE:
0:00-1:00 [HOOK]: Grab attention immediately
1:00-5:00 [INTRO]: Who you are, why this matters
5:00-[DURATION-5:00] [BODY]:
  - Segment 1: [SEGMENT_1] — [DURATION_1] minutes
  - Segment 2: [SEGMENT_2] — [DURATION_2] minutes
  - Segment 3: [SEGMENT_3] — [DURATION_3] minutes
[DURATION-5:00]-[DURATION] [OUTRO]: Summary + CTA

GUEST (if interview):
- Name: [GUEST_NAME]
- Role: [GUEST_ROLE]
- Expertise: [GUEST_EXPERTISE]
- Controversial take: [GUEST_TAKE]

ENGAGEMENT HOOKS:
- [HOOK_1] at [TIME_1]
- [HOOK_2] at [TIME_2]

CLIP-WORTHY MOMENTS:
- [CLIP_MOMENT_1]
- [CLIP_MOMENT_2]

PRODUCTION NOTES:
- Music: [MUSIC_CUE]
- Sound effects: [SFX]
- Sponsor read placement: [SPONSOR_PLACEMENT]

SHOWNOTES STRUCTURE:
- [TIMESTAMP_1]: [TOPIC_1]
- [TIMESTAMP_2]: [TOPIC_2]
- [TIMESTAMP_3]: [TOPIC_3]

EPISODE DESCRIPTION (Apple/Spotify):
- 150-200 words
- SEO-optimized for [KEYWORD]
- Include guest handle: [GUEST_SOCIAL]

FORMAT: Return as episode blueprint with timing, segment notes, and production cues.`,
    description: "Podcast episode structure for 2026 audience engagement",
    category: "video-podcast",
    subcategory: "podcast",
    tags: ["Podcast", "Audio", "Script", "Engagement"],
    useCase: "Plan podcast episodes that keep listeners engaged",
    variables: ["TOPIC", "DURATION", "FORMAT", "EPISODE_GOAL", "SEGMENT_1", "DURATION_1", "SEGMENT_2", "DURATION_2", "SEGMENT_3", "DURATION_3", "GUEST_NAME", "GUEST_ROLE", "GUEST_EXPERTISE", "GUEST_TAKE", "HOOK_1", "TIME_1", "HOOK_2", "TIME_2", "CLIP_MOMENT_1", "CLIP_MOMENT_2", "MUSIC_CUE", "SFX", "SPONSOR_PLACEMENT", "TIMESTAMP_1", "TOPIC_1", "TIMESTAMP_2", "TOPIC_2", "TIMESTAMP_3", "TOPIC_3", "KEYWORD", "GUEST_SOCIAL"],
  },
  {
    id: "video-youtube-2026",
    title: "YouTube Video Master Script",
    prompt: `You are a YouTube strategist. Create full video script for [TOPIC].

TASK: Write [DURATION]-minute YouTube script optimized for retention and algorithm.

RETENTION STRATEGY:
- Hook before intro music (0-30s)
- Pattern interrupt every [INTERVAL] seconds
- Story element by [STORY_MARKER]
- Value spike at [VALUE_SPIKE_TIME]

SCRIPT SECTIONS:

0:00-0:30 [HOOK]:
"[HOOK_LINE]" — Must create curiosity gap

0:30-1:00 [PREVIEW]:
"[PREVIEW_TEXT]" — Promise what's coming

1:00-[DURATION-3:00] [MAIN CONTENT]:
- Section 1: [SECTION_1_TITLE] — practical value
- Section 2: [SECTION_2_TITLE] — deeper dive
- Section 3: [SECTION_3_TITLE] — actionable takeaways

[DURATION-3:00]-[DURATION-1:00] [PEAK VALUE]:
"[PEAK_CONTENT]" — Most valuable moment

[DURATION-1:00]-[DURATION] [CTA]:
- Subscribe: [SUB_CTA]
- Watch next: [NEXT_VIDEO_PITCH]
- Comment: [COMMENT_PROMPT]

AUDIENCE: [TARGET_AUDIENCE]
EXPECTED OUTCOME: [VIEWER_WILL_LEARN]

SPEAKER NOTES:
- Pace: 150wpm
- Emphasis words: [EMPHASIS_WORDS]
- B-roll cues: [BROLL_NOTES]

END CARD:
- [END_CARD_ELEMENT_1]
- [END_CARD_ELEMENT_2]

FORMAT: Return as timed script with VO, B-roll, and retention markers.`,
    description: "Full YouTube script optimized for 2026 algorithm",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["YouTube", "Script", "Video", "Retention"],
    useCase: "Write YouTube videos that rank and retain",
    variables: ["TOPIC", "DURATION", "INTERVAL", "STORY_MARKER", "VALUE_SPIKE_TIME", "HOOK_LINE", "PREVIEW_TEXT", "SECTION_1_TITLE", "SECTION_2_TITLE", "SECTION_3_TITLE", "PEAK_CONTENT", "SUB_CTA", "NEXT_VIDEO_PITCH", "COMMENT_PROMPT", "TARGET_AUDIENCE", "VIEWER_WILL_LEARN", "EMPHASIS_WORDS", "BROLL_NOTES", "END_CARD_ELEMENT_1", "END_CARD_ELEMENT_2"],
  },

  // ===== AI & AUTOMATION =====
  {
    id: "ai-workflow-automation",
    title: "AI Automation Workflow Designer",
    prompt: `You are an automation specialist. Create AI-powered workflow for [USE_CASE].

TASK: Design workflow using [PLATFORM] for [AUTOMATION_GOAL].

WORKFLOW STEPS:

STEP 1: Trigger
- Event: [TRIGGER_EVENT]
- Condition: [TRIGGER_CONDITION]

STEP 2: Action 1
- Tool: [TOOL_1]
- Operation: [OPERATION_1]
- Input: [INPUT_1]

STEP 3: AI Processing
- AI Model: [AI_MODEL]
- Prompt: [AI_PROMPT]
- Output variable: [OUTPUT_VAR]

STEP 4: Action 2
- Tool: [TOOL_2]
- Operation: [OPERATION_2]
- Input: [USE_OUTPUT_FROM_STEP_3]

STEP 5: Conditional Logic
- If [CONDITION]: [THEN_ACTION]
- If not [CONDITION]: [ELSE_ACTION]

STEP 6: Final Action
- Notification: [NOTIFICATION]
- Storage: [STORAGE_DESTINATION]

ERROR HANDLING:
- Timeout: [TIMEOUT_ACTION]
- Failure: [FAILURE_ACTION]

WORKFLOW FLOW:
[TRIGGER] → [ACTION_1] → [AI_PROCESS] → [ACTION_2] → [CONDITIONAL] → [FINAL]

EXPECTED OUTCOMES:
- Time saved: [TIME_SAVED]
- Error reduction: [ERROR_REDUCTION]
- Scaling capacity: [SCALING_BENEFIT]

FORMAT: Return as workflow diagram (text-based) + step-by-step configuration guide.`,
    description: "AI-powered automation workflow design",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["Automation", "AI", "Workflow", "Zapier", "Make"],
    useCase: "Design AI-powered automation workflows",
    variables: ["USE_CASE", "PLATFORM", "AUTOMATION_GOAL", "TRIGGER_EVENT", "TRIGGER_CONDITION", "TOOL_1", "OPERATION_1", "INPUT_1", "AI_MODEL", "AI_PROMPT", "OUTPUT_VAR", "TOOL_2", "OPERATION_2", "CONDITION", "THEN_ACTION", "ELSE_ACTION", "NOTIFICATION", "STORAGE_DESTINATION", "TIMEOUT_ACTION", "FAILURE_ACTION", "TIME_SAVED", "ERROR_REDUCTION", "SCALING_BENEFIT"],
  },
  {
    id: "ai-chatbot-script",
    title: "AI Chatbot Script Builder",
    prompt: `You are a chatbot designer. Create conversation flow for [USE_CASE].

TASK: Build chatbot script for [PLATFORM] that handles [SCENARIOS].

BOT PERSONALITY:
- Name: [BOT_NAME]
- Tone: [TONE]
- Response style: [RESPONSE_STYLE]

CONVERSATION FLOWS:

FLOW 1: [SCENARIO_1]
- User input: [USER_INPUT_1]
- Bot response: [BOT_RESPONSE_1]
- Next step: [NEXT_STEP_1]

FLOW 2: [SCENARIO_2]
- User input: [USER_INPUT_2]
- Bot response: [BOT_RESPONSE_2]
- Next step: [NEXT_STEP_2]

[Continue for all scenarios]

FALLBACK HANDLING:
- Unknown input: [FALLBACK_RESPONSE]
- Escalation trigger: [ESCALATION_TRIGGER]
- Human handoff: [HANDOFF_PROCESS]

ERROR MESSAGES:
- [ERROR_1]: [ERROR_RESPONSE_1]
- [ERROR_2]: [ERROR_RESPONSE_2]

QUICK REPLIES:
- [QUICK_REPLY_1]
- [QUICK_REPLY_2]
- [QUICK_REPLY_3]

INTEGRATIONS:
- CRM: [CRM_INTEGRATION]
- Knowledge base: [KB_INTEGRATION]
- Analytics: [ANALYTICS]

SUCCESS METRICS:
- Resolution rate target: [RESOLUTION_TARGET]
- Avg response time: [RESPONSE_TIME]
- Satisfaction score: [SAT_SCORE]

FORMAT: Return as complete chatbot script with decision trees, fallback handling, and integration notes.`,
    description: "AI chatbot conversation script with flows",
    category: "ai-automation",
    subcategory: "chatbot",
    tags: ["Chatbot", "AI", "Conversation", "Script"],
    useCase: "Build AI chatbot conversation flows",
    variables: ["USE_CASE", "PLATFORM", "SCENARIOS", "BOT_NAME", "TONE", "RESPONSE_STYLE", "SCENARIO_1", "USER_INPUT_1", "BOT_RESPONSE_1", "NEXT_STEP_1", "SCENARIO_2", "USER_INPUT_2", "BOT_RESPONSE_2", "NEXT_STEP_2", "FALLBACK_RESPONSE", "ESCALATION_TRIGGER", "HANDOFF_PROCESS", "ERROR_1", "ERROR_RESPONSE_1", "ERROR_2", "ERROR_RESPONSE_2", "QUICK_REPLY_1", "QUICK_REPLY_2", "QUICK_REPLY_3", "CRM_INTEGRATION", "KB_INTEGRATION", "ANALYTICS", "RESOLUTION_TARGET", "RESPONSE_TIME", "SAT_SCORE"],
  },

  // ===== INFLUENCER & CREATOR =====
  {
    id: "influencer-brand-pitch",
    title: "Brand Deal Pitch Template",
    prompt: `You are an influencer strategist. Create brand partnership pitch for [BRAND/NICHE].

TASK: Write compelling pitch to [BRAND_NAME] for collaboration.

CREATOR PROFILE:
- Platform: [PLATFORM]
- Followers: [FOLLOWER_COUNT]
- Engagement rate: [ENGAGEMENT_RATE]
- Niche: [NICHE]
- Audience demographics: [AUDIENCE_DEMO]

BRAND INFO:
- Brand: [BRAND_NAME]
- Industry: [INDUSTRY]
- Previous collaborations: [PREVIOUS_COLLABS]

PITCH STRUCTURE:

1. HOOK (Opening):
"[HOOK_LINE]" — Compelling reason to read

2. INTRODUCTION:
- Who you are: [INTRO]
- Your audience: [AUDIENCE_DESC]
- Why you're relevant: [RELEVANCE]

3. VALUE PROPOSITION:
- What you offer: [OFFER]
- Audience alignment: [ALIGNMENT]
- Proof points: [PROOF_1], [PROOF_2], [PROOF_3]

4. COLLABORATION IDEAS:
- Option A: [COLLAB_OPTION_A]
- Option B: [COLLAB_OPTION_B]
- Custom: [CUSTOM_IDEA]

5. TERMS:
- Compensation: [COMPENSATION]
- Timeline: [TIMELINE]
- Deliverables: [DELIVERABLES]

6. CALL TO ACTION:
"[CTA]" — Next step

ATTACHMENTS TO INCLUDE:
- [ATTACHMENT_1]
- [ATTACHMENT_2]

FORMAT: Return as professional pitch email ready to send. Include subject lines.`,
    description: "Professional brand partnership pitch for influencers",
    category: "influencer",
    subcategory: "pitches",
    tags: ["Influencer", "Brand Deal", "Pitch", "Collaboration"],
    useCase: "Write brand pitches that get accepted",
    variables: ["BRAND/NICHE", "BRAND_NAME", "PLATFORM", "FOLLOWER_COUNT", "ENGAGEMENT_RATE", "NICHE", "AUDIENCE_DEMO", "INDUSTRY", "PREVIOUS_COLLABS", "HOOK_LINE", "INTRO", "AUDIENCE_DESC", "RELEVANCE", "OFFER", "ALIGNMENT", "PROOF_1", "PROOF_2", "PROOF_3", "COLLAB_OPTION_A", "COLLAB_OPTION_B", "CUSTOM_IDEA", "COMPENSATION", "TIMELINE", "DELIVERABLES", "CTA", "ATTACHMENT_1", "ATTACHMENT_2"],
  },

  // ===== LOCAL BUSINESS =====
  {
    id: "local-review-response",
    title: "Review Response Templates",
    prompt: `You are a local business reputation manager. Create response templates for [BUSINESS_TYPE].

TASK: Build review response system for all scenarios.

RESPONSE TYPES:

1. POSITIVE 5-STAR:
- Tone: Grateful, specific, personal
- Template: [POSITIVE_TEMPLATE]
- Elements to include: [SPECIFIC_ELEMENT_1], [SPECIFIC_ELEMENT_2]

2. NEUTRAL 3-4 STARS:
- Tone: Appreciative, solution-oriented
- Template: [NEUTRAL_TEMPLATE]
- Ask for feedback: [FEEDBACK_ASK]

3. NEGATIVE 1-2 STARS:
- Tone: Professional, apologetic, actionable
- Template: [NEGATIVE_TEMPLATE]
- Off-platform follow-up: [OFFLINE_STEP]

4. SPECIFIC COMPLAINTS:
- "[COMPLAINT_TYPE]": [RESPONSE_TEMPLATE]
- [COMPLAINT_2]: [RESPONSE_2]

5. COMPETITOR MENTIONS:
- "[COMPETITOR_NAME]": [COMPETITOR_RESPONSE]

PERSONALIZATION ELEMENTS:
- Use reviewer name: [NAME_STRATEGY]
- Reference specific review: [REVIEW_REFERENCE]
- Add local flavor: [LOCAL_ELEMENT]

ESCALATION TRIGGERS:
- [TRIGGER_1]: [ESCALATION_ACTION]
- [TRIGGER_2]: [ESCALATION_ACTION_2]

RESPONSE TIMING:
- Target response time: [RESPONSE_TIME]
- Best times to respond: [BEST_TIMES]

FORMAT: Return as review response templates with tone guidance and personalization notes.`,
    description: "Local business review response templates",
    category: "local-business",
    subcategory: "reviews",
    tags: ["Reviews", "Local SEO", "Reputation", "Response"],
    useCase: "Manage online reviews professionally",
    variables: ["BUSINESS_TYPE", "POSITIVE_TEMPLATE", "SPECIFIC_ELEMENT_1", "SPECIFIC_ELEMENT_2", "NEUTRAL_TEMPLATE", "FEEDBACK_ASK", "NEGATIVE_TEMPLATE", "OFFLINE_STEP", "COMPLAINT_TYPE", "RESPONSE_TEMPLATE", "COMPLAINT_2", "RESPONSE_2", "COMPETITOR_NAME", "COMPETITOR_RESPONSE", "NAME_STRATEGY", "REVIEW_REFERENCE", "LOCAL_ELEMENT", "TRIGGER_1", "ESCALATION_ACTION", "TRIGGER_2", "ESCALATION_ACTION_2", "RESPONSE_TIME", "BEST_TIMES"],
  },

  // ===== EDUCATION & TRAINING =====
  {
    id: "edu-course-curriculum-2026",
    title: "Online Course Curriculum (2026)",
    prompt: `You are an instructional designer. Create course curriculum for [TOPIC].

TASK: Design complete course structure with learning outcomes.

COURSE DETAILS:
- Title: [COURSE_TITLE]
- Target audience: [AUDIENCE]
- Prior knowledge needed: [PREREQUISITES]
- Duration: [TOTAL_DURATION]
- Format: [FORMAT] (video/text/live/hybrid)

LEARNING OUTCOMES:
By the end, learners will be able to:
1. [OUTCOME_1]
2. [OUTCOME_2]
3. [OUTCOME_3]
4. [OUTCOME_4]

MODULE STRUCTURE:

MODULE 1: [MODULE_1_TITLE]
- Lessons: [LESSON_1A], [LESSON_1B], [LESSON_1C]
- Duration: [M1_DURATION]
- Assessment: [M1_ASSESSMENT]

MODULE 2: [MODULE_2_TITLE]
- Lessons: [LESSON_2A], [LESSON_2B], [LESSON_2C]
- Duration: [M2_DURATION]
- Assessment: [M2_ASSESSMENT]

MODULE 3: [MODULE_3_TITLE]
[Continue for all modules]

LESSON TEMPLATE:
- Title: [LESSON_TITLE]
- Type: [LESSON_TYPE] (video/reading/activity)
- Duration: [LESSON_DURATION]
- Objectives: [LESSON_OBJECTIVES]
- Content: [CONTENT_DESCRIPTION]
- Action item: [ACTION_ITEM]

ENGAGEMENT ELEMENTS:
- [ENGAGEMENT_1] (quiz/poll/discussion)
- [ENGAGEMENT_2]
- [ENGAGEMENT_3]

COMPLETION TRIGGERS:
- Certificate: [CERTIFICATE_IF_APPLICABLE]
- Badges: [BADGE_SYSTEM]
- Community access: [COMMUNITY_BENEFIT]

FORMAT: Return as complete course blueprint with module breakdown, lesson details, and engagement strategy.`,
    description: "Complete online course curriculum with learning design",
    category: "education",
    subcategory: "course",
    tags: ["Course", "Curriculum", "Instructional Design", "Learning"],
    useCase: "Build structured online courses",
    variables: ["TOPIC", "COURSE_TITLE", "AUDIENCE", "PREREQUISITES", "TOTAL_DURATION", "FORMAT", "OUTCOME_1", "OUTCOME_2", "OUTCOME_3", "OUTCOME_4", "MODULE_1_TITLE", "LESSON_1A", "LESSON_1B", "LESSON_1C", "M1_DURATION", "M1_ASSESSMENT", "MODULE_2_TITLE", "LESSON_2A", "LESSON_2B", "LESSON_2C", "M2_DURATION", "M2_ASSESSMENT", "MODULE_3_TITLE", "LESSON_TITLE", "LESSON_TYPE", "LESSON_DURATION", "LESSON_OBJECTIVES", "CONTENT_DESCRIPTION", "ACTION_ITEM", "ENGAGEMENT_1", "ENGAGEMENT_2", "ENGAGEMENT_3", "CERTIFICATE_IF_APPLICABLE", "BADGE_SYSTEM", "COMMUNITY_BENEFIT"],
  },

  // ===== HR & RECRUITMENT =====
  {
    id: "hr-job-description-2026",
    title: "JD Generator (2026)",
    prompt: `You are an HR strategist. Create job description that attracts A-players for [ROLE].

TASK: Write compelling, inclusive JD for [COMPANY_NAME].

JOB DETAILS:
- Title: [JOB_TITLE]
- Location: [LOCATION] (+ remote/hybrid options)
- Salary range: [SALARY_RANGE]
- Level: [LEVEL] (entry/mid/senior/executive)

COMPANY CONTEXT:
- Company: [COMPANY_NAME]
- Industry: [INDUSTRY]
- Stage: [STAGE]
- Culture: [CULTURE]
- Mission: [MISSION]
- Tech stack: [TECH_STACK]

ROLE SECTION:
- What you'll do: [RESPONSIBILITIES]
- What we're looking for: [REQUIREMENTS]
- Nice to have: [NICE_TO_HAVE]
- Why this matters: [ROLE_IMPACT]

BENEFITS & PERKS:
- [BENEFIT_1]
- [BENEFIT_2]
- [BENEFIT_3]

EQUAL OPPORTUNITY: [EO_STATEMENT]

TONE REQUIREMENTS:
- Inclusive language (avoid gendered terms)
- Specific requirements (not "other duties as assigned")
- Honest about tradeoffs (what's hard about this role)

APPLICATION PROCESS:
- [APPLICATION_STEPS]
- Timeline: [HIRING_TIMELINE]

FORMAT: Return as complete job description ready to post on [JOB_BOARD]. Include all sections labeled.`,
    description: "Job description that attracts top talent in 2026",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["Job Description", "Recruiting", "HR", "Talent"],
    useCase: "Write JDs that attract A-players",
    variables: ["ROLE", "COMPANY_NAME", "JOB_TITLE", "LOCATION", "SALARY_RANGE", "LEVEL", "INDUSTRY", "STAGE", "CULTURE", "MISSION", "TECH_STACK", "RESPONSIBILITIES", "REQUIREMENTS", "NICE_TO_HAVE", "ROLE_IMPACT", "BENEFIT_1", "BENEFIT_2", "BENEFIT_3", "EO_STATEMENT", "APPLICATION_STEPS", "HIRING_TIMELINE", "JOB_BOARD"],
  },
  {
    id: "hr-interview-questions",
    title: "Structured Interview Questions",
    prompt: `You are an HR professional. Create interview question bank for [ROLE].

TASK: Design structured interview with questions, scoring criteria, and red flags.

ROLE: [JOB_TITLE]
LEVEL: [LEVEL]

INTERVIEW SECTIONS:

SECTION 1: Culture Fit (15 min)
- Q1: [CULTURE_Q1] — What you're looking for: [CULTURE_ANSWER_1]
- Q2: [CULTURE_Q2] — What you're looking for: [CULTURE_ANSWER_2]
- Q3: [CULTURE_Q3] — What you're looking for: [CULTURE_ANSWER_3]

SECTION 2: Technical Skills (20 min)
- Q1: [TECH_Q1] — What you're looking for: [TECH_ANSWER_1]
- Q2: [TECH_Q2] — What you're looking for: [TECH_ANSWER_2]
- Q3: [TECH_Q3] — What you're looking for: [TECH_ANSWER_3]

SECTION 3: Problem Solving (15 min)
- Q1: [PROBLEM_Q1] — What you're looking for: [PROBLEM_ANSWER_1]
- Q2: [PROBLEM_Q2] — What you're looking for: [PROBLEM_ANSWER_2]

SECTION 4: Motivation (10 min)
- Q1: [MOTIVATION_Q1] — What you're looking for: [MOTIVATION_ANSWER_1]
- Q2: [MOTIVATION_Q2] — What you're looking for: [MOTIVATION_ANSWER_2]

SCORING RUBRIC:
- 1 (Fail): [SCORE_1]
- 3 (Borderline): [SCORE_3]
- 5 (Strong): [SCORE_5]

RED FLAGS:
- [RED_FLAG_1]
- [RED_FLAG_2]
- [RED_FLAG_3]

GREEN FLAGS:
- [GREEN_FLAG_1]
- [GREEN_FLAG_2]

CANDIDATE QUESTIONS (allow 10 min):
- Prepare to answer: [YOUR_PREPARATION]

FORMAT: Return as structured interview guide with questions, ideal answers, and evaluation criteria.`,
    description: "Structured interview questions with scoring criteria",
    category: "hr-recruitment",
    subcategory: "interview",
    tags: ["Interview", "Questions", "Hiring", "Evaluation"],
    useCase: "Conduct effective structured interviews",
    variables: ["ROLE", "JOB_TITLE", "LEVEL", "CULTURE_Q1", "CULTURE_ANSWER_1", "CULTURE_Q2", "CULTURE_ANSWER_2", "CULTURE_Q3", "CULTURE_ANSWER_3", "TECH_Q1", "TECH_ANSWER_1", "TECH_Q2", "TECH_ANSWER_2", "TECH_Q3", "TECH_ANSWER_3", "PROBLEM_Q1", "PROBLEM_ANSWER_1", "PROBLEM_Q2", "PROBLEM_ANSWER_2", "MOTIVATION_Q1", "MOTIVATION_ANSWER_1", "MOTIVATION_Q2", "MOTIVATION_ANSWER_2", "SCORE_1", "SCORE_3", "SCORE_5", "RED_FLAG_1", "RED_FLAG_2", "RED_FLAG_3", "GREEN_FLAG_1", "GREEN_FLAG_2", "YOUR_PREPARATION"],
  },

  // ===== CRISIS MANAGEMENT =====
  {
    id: "crisis-response-plan",
    title: "Crisis Response Framework",
    prompt: `You are a PR crisis manager. Create response framework for potential crisis at [COMPANY_TYPE].

TASK: Build crisis response system for [POTENTIAL_CRISIS_TYPE].

CRISIS SCENARIOS:

SCENARIO 1: [CRISIS_TYPE_1]
- Severity: [SEVERITY_1]
- Response timeline: [TIMELINE_1]
- spokesperson: [SPOKESPERSON_1]
- Key messages: [MESSAGES_1]
- Channels: [CHANNELS_1]
- Stakeholders: [STAKEHOLDERS_1]

SCENARIO 2: [CRISIS_TYPE_2]
[Continue for all scenarios]

RESPONSE PROTOCOL:

Hour 0-1 (Immediate):
- [IMMEDIATE_STEP_1]
- [IMMEDIATE_STEP_2]
- [IMMEDIATE_STEP_3]

Hour 1-4 (Assessment):
- [ASSESSMENT_STEP_1]
- [ASSESSMENT_STEP_2]

Hour 4-24 (Response):
- [RESPONSE_STEP_1]
- [RESPONSE_STEP_2]
- [RESPONSE_STEP_3]

Day 2-7 (Follow-up):
- [FOLLOWUP_STEP_1]
- [FOLLOWUP_STEP_2]

MESSAGE FRAMEWORK:
- Facts: [FACT_STATEMENT]
- Acknowledge: [ACKNOWLEDGMENT]
- Action: [ACTION_TAKEN]
- Commitment: [FUTURE_COMMITMENT]

INTERNAL COMMUNICATION:
- Team notification: [INTERNAL_NOTE]
- Management briefing: [MGMT_BRIEF]

EXTERNAL COMMUNICATION:
- Press statement: [PRESS_STATEMENT]
- Social response: [SOCIAL_RESPONSE]
- Customer email: [CUSTOMER_EMAIL]

RECOVERY METRICS:
- [METRIC_1]
- [METRIC_2]

POST-CRISIS:
- Review process: [REVIEW_PROCESS]
- Prevention: [PREVENTION_STEPS]

FORMAT: Return as crisis response playbook with scenarios, protocols, and message templates.`,
    description: "Crisis response framework and protocols",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["Crisis", "PR", "Response", "Damage Control"],
    useCase: "Prepare crisis response plans",
    variables: ["COMPANY_TYPE", "POTENTIAL_CRISIS_TYPE", "CRISIS_TYPE_1", "SEVERITY_1", "TIMELINE_1", "SPOKESPERSON_1", "MESSAGES_1", "CHANNELS_1", "STAKEHOLDERS_1", "CRISIS_TYPE_2", "IMMEDIATE_STEP_1", "IMMEDIATE_STEP_2", "IMMEDIATE_STEP_3", "ASSESSMENT_STEP_1", "ASSESSMENT_STEP_2", "RESPONSE_STEP_1", "RESPONSE_STEP_2", "RESPONSE_STEP_3", "FOLLOWUP_STEP_1", "FOLLOWUP_STEP_2", "FACT_STATEMENT", "ACKNOWLEDGMENT", "ACTION_TAKEN", "FUTURE_COMMITMENT", "INTERNAL_NOTE", "MGMT_BRIEF", "PRESS_STATEMENT", "SOCIAL_RESPONSE", "CUSTOMER_EMAIL", "METRIC_1", "METRIC_2", "REVIEW_PROCESS", "PREVENTION_STEPS"],
  },,

  {
    id: "edu-course-blueprint",
    title: "Course Blueprint Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Create comprehensive course curriculum from scratch

VARIABLES TO FILL:
- TOPIC, AUDIENCE, LEVEL, DURATION, DELIVERY_FORMAT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete course blueprint generator ready for use.`,
    description: "Create comprehensive course curriculum from scratch",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create course blueprint generator for professional use",
    variables: ['TOPIC', 'AUDIENCE', 'LEVEL', 'DURATION', 'DELIVERY_FORMAT'],
  },
  {
    id: "edu-lesson-plan",
    title: "Lesson Plan Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: lesson
- Purpose: Detailed lesson plans with activities and assessments

VARIABLES TO FILL:
- SUBJECT, GRADE_LEVEL, TOPIC, DURATION, LEARNING_OBJECTIVES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete lesson plan generator ready for use.`,
    description: "Detailed lesson plans with activities and assessments",
    category: "education",
    subcategory: "lesson",
    tags: ["education", "lesson", "Professional"],
    useCase: "Create lesson plan generator for professional use",
    variables: ['SUBJECT', 'GRADE_LEVEL', 'TOPIC', 'DURATION', 'LEARNING_OBJECTIVES'],
  },
  {
    id: "edu-workshop-design",
    title: "Workshop Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Interactive workshop with exercises and facilitation

VARIABLES TO FILL:
- TOPIC, AUDIENCE_SIZE, DURATION, OBJECTIVES, MATERIALS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete workshop design ready for use.`,
    description: "Interactive workshop with exercises and facilitation",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create workshop design for professional use",
    variables: ['TOPIC', 'AUDIENCE_SIZE', 'DURATION', 'OBJECTIVES', 'MATERIALS'],
  },
  {
    id: "edu-assessment-quiz",
    title: "Assessment & Quiz Builder",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: assessment
- Purpose: Multiple choice and fill-in-the-blank assessments

VARIABLES TO FILL:
- TOPIC, DIFFICULTY, NUM_QUESTIONS, FORMAT, ANSWER_KEY

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete assessment & quiz builder ready for use.`,
    description: "Multiple choice and fill-in-the-blank assessments",
    category: "education",
    subcategory: "assessment",
    tags: ["education", "assessment", "Professional"],
    useCase: "Create assessment & quiz builder for professional use",
    variables: ['TOPIC', 'DIFFICULTY', 'NUM_QUESTIONS', 'FORMAT', 'ANSWER_KEY'],
  },
  {
    id: "edu-flashcard-set",
    title: "Flashcard Set Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: assessment
- Purpose: Spaced repetition flashcard sets

VARIABLES TO FILL:
- TOPIC, NUM_CARDS, LEVEL, FORMAT, SPACED_REPETITION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete flashcard set generator ready for use.`,
    description: "Spaced repetition flashcard sets",
    category: "education",
    subcategory: "assessment",
    tags: ["education", "assessment", "Professional"],
    useCase: "Create flashcard set generator for professional use",
    variables: ['TOPIC', 'NUM_CARDS', 'LEVEL', 'FORMAT', 'SPACED_REPETITION'],
  },
  {
    id: "edu-study-guide",
    title: "Study Guide Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Comprehensive study guides with summaries and practice

VARIABLES TO FILL:
- TOPIC, DEPTH, AUDIENCE, FORMAT, PRACTICE_QUESTIONS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete study guide generator ready for use.`,
    description: "Comprehensive study guides with summaries and practice",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create study guide generator for professional use",
    variables: ['TOPIC', 'DEPTH', 'AUDIENCE', 'FORMAT', 'PRACTICE_QUESTIONS'],
  },
  {
    id: "edu-syllabus-builder",
    title: "Syllabus Builder",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Academic syllabi with schedule and policies

VARIABLES TO FILL:
- COURSE_NAME, DURATION, CREDITS, OBJECTIVES, GRADING_POLICY

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete syllabus builder ready for use.`,
    description: "Academic syllabi with schedule and policies",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create syllabus builder for professional use",
    variables: ['COURSE_NAME', 'DURATION', 'CREDITS', 'OBJECTIVES', 'GRADING_POLICY'],
  },
  {
    id: "edu-parent-letter",
    title: "Parent Communication Letter",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Professional parent letters for various situations

VARIABLES TO FILL:
- PURPOSE, STUDENT_INFO, TEACHER_NAME, SCHOOL_NAME, TOPIC

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete parent communication letter ready for use.`,
    description: "Professional parent letters for various situations",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create parent communication letter for professional use",
    variables: ['PURPOSE', 'STUDENT_INFO', 'TEACHER_NAME', 'SCHOOL_NAME', 'TOPIC'],
  },
  {
    id: "edu-iep-goals",
    title: "IEP Goal Writing",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Individualized Education Program goals

VARIABLES TO FILL:
- STUDENT_NAME, GRADE, DISABILITY, AREA_OF_NEED, BASELINE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete iep goal writing ready for use.`,
    description: "Individualized Education Program goals",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create iep goal writing for professional use",
    variables: ['STUDENT_NAME', 'GRADE', 'DISABILITY', 'AREA_OF_NEED', 'BASELINE'],
  },
  {
    id: "edu-differentiated-instruction",
    title: "Differentiated Instruction Plan",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: lesson
- Purpose: Lesson plans for multiple learning styles

VARIABLES TO FILL:
- TOPIC, CLASS_SIZE, LEARNING_STYLES, RESOURCES, ASSESSMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete differentiated instruction plan ready for use.`,
    description: "Lesson plans for multiple learning styles",
    category: "education",
    subcategory: "lesson",
    tags: ["education", "lesson", "Professional"],
    useCase: "Create differentiated instruction plan for professional use",
    variables: ['TOPIC', 'CLASS_SIZE', 'LEARNING_STYLES', 'RESOURCES', 'ASSESSMENT'],
  },
  {
    id: "edu-gamification-design",
    title: "Gamification Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Game-based learning elements

VARIABLES TO FILL:
- TOPIC, AUDIENCE, GOALS, MECHANICS, REWARDS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete gamification design ready for use.`,
    description: "Game-based learning elements",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create gamification design for professional use",
    variables: ['TOPIC', 'AUDIENCE', 'GOALS', 'MECHANICS', 'REWARDS'],
  },
  {
    id: "edu-project-based-learning",
    title: "Project-Based Learning Unit",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: PBL units with real-world applications

VARIABLES TO FILL:
- TOPIC, STANDARDS, DURATION, DELIVERABLES, ASSESSMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete project-based learning unit ready for use.`,
    description: "PBL units with real-world applications",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create project-based learning unit for professional use",
    variables: ['TOPIC', 'STANDARDS', 'DURATION', 'DELIVERABLES', 'ASSESSMENT'],
  },
  {
    id: "edu-socratic-seminar",
    title: "Socratic Seminar Guide",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: lesson
- Purpose: Facilitated discussion around texts

VARIABLES TO FILL:
- TEXT, GRADE_LEVEL, OBJECTIVES, QUESTIONS, ASSESSMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete socratic seminar guide ready for use.`,
    description: "Facilitated discussion around texts",
    category: "education",
    subcategory: "lesson",
    tags: ["education", "lesson", "Professional"],
    useCase: "Create socratic seminar guide for professional use",
    variables: ['TEXT', 'GRADE_LEVEL', 'OBJECTIVES', 'QUESTIONS', 'ASSESSMENT'],
  },
  {
    id: "edu-flipped-classroom",
    title: "Flipped Classroom Setup",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Video lessons and in-class activities

VARIABLES TO FILL:
- TOPIC, AUDIENCE, OBJECTIVES, VIDEO_LENGTH, ACTIVITIES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete flipped classroom setup ready for use.`,
    description: "Video lessons and in-class activities",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create flipped classroom setup for professional use",
    variables: ['TOPIC', 'AUDIENCE', 'OBJECTIVES', 'VIDEO_LENGTH', 'ACTIVITIES'],
  },
  {
    id: "edu-scaffold-design",
    title: "Scaffolding Strategies",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Support structures for struggling learners

VARIABLES TO FILL:
- TOPIC, DIFFICULTY, STUDENT_NEEDS, SUPPORT_TYPES, ASSESSMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete scaffolding strategies ready for use.`,
    description: "Support structures for struggling learners",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create scaffolding strategies for professional use",
    variables: ['TOPIC', 'DIFFICULTY', 'STUDENT_NEEDS', 'SUPPORT_TYPES', 'ASSESSMENT'],
  },
  {
    id: "edu-formative-assessment",
    title: "Formative Assessment Tools",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: assessment
- Purpose: Quick checks for understanding

VARIABLES TO FILL:
- TOPIC, FORMAT, TIMING, PURPOSE, FEEDBACK

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete formative assessment tools ready for use.`,
    description: "Quick checks for understanding",
    category: "education",
    subcategory: "assessment",
    tags: ["education", "assessment", "Professional"],
    useCase: "Create formative assessment tools for professional use",
    variables: ['TOPIC', 'FORMAT', 'TIMING', 'PURPOSE', 'FEEDBACK'],
  },
  {
    id: "edu-summative-exam",
    title: "Summative Exam Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: assessment
- Purpose: End-of-unit comprehensive exams

VARIABLES TO FILL:
- TOPIC, DURATION, FORMAT, WEIGHT, STANDARDS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete summative exam design ready for use.`,
    description: "End-of-unit comprehensive exams",
    category: "education",
    subcategory: "assessment",
    tags: ["education", "assessment", "Professional"],
    useCase: "Create summative exam design for professional use",
    variables: ['TOPIC', 'DURATION', 'FORMAT', 'WEIGHT', 'STANDARDS'],
  },
  {
    id: "edu-rubric-creation",
    title: "Rubric Creation",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: assessment
- Purpose: Analytic and holistic rubrics

VARIABLES TO FILL:
- TASK, CRITERIA, LEVELS, WEIGHTS, DESCRIPTORS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete rubric creation ready for use.`,
    description: "Analytic and holistic rubrics",
    category: "education",
    subcategory: "assessment",
    tags: ["education", "assessment", "Professional"],
    useCase: "Create rubric creation for professional use",
    variables: ['TASK', 'CRITERIA', 'LEVELS', 'WEIGHTS', 'DESCRIPTORS'],
  },
  {
    id: "edu-student-feedback",
    title: "Student Feedback Templates",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Constructive feedback for students

VARIABLES TO FILL:
- CONTEXT, STUDENT_LEVEL, PURPOSE, TONE, FORMAT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete student feedback templates ready for use.`,
    description: "Constructive feedback for students",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create student feedback templates for professional use",
    variables: ['CONTEXT', 'STUDENT_LEVEL', 'PURPOSE', 'TONE', 'FORMAT'],
  },
  {
    id: "edu-progress-report",
    title: "Progress Report Writing",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Student progress narratives

VARIABLES TO FILL:
- STUDENT_NAME, GRADE, PERIOD, PROGRESS, CONCERNS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete progress report writing ready for use.`,
    description: "Student progress narratives",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create progress report writing for professional use",
    variables: ['STUDENT_NAME', 'GRADE', 'PERIOD', 'PROGRESS', 'CONCERNS'],
  },
  {
    id: "edu-behavior-plan",
    title: "Behavior Intervention Plan",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: BIP with strategies and data tracking

VARIABLES TO FILL:
- STUDENT, BEHAVIOR, FUNCTION, INTERVENTIONS, DATA

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete behavior intervention plan ready for use.`,
    description: "BIP with strategies and data tracking",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create behavior intervention plan for professional use",
    variables: ['STUDENT', 'BEHAVIOR', 'FUNCTION', 'INTERVENTIONS', 'DATA'],
  },
  {
    id: "edu-culturally-responsive",
    title: "Culturally Responsive Lesson",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: lesson
- Purpose: Lessons that honor student backgrounds

VARIABLES TO FILL:
- TOPIC, CULTURES, OBJECTIVES, MATERIALS, ASSESSMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete culturally responsive lesson ready for use.`,
    description: "Lessons that honor student backgrounds",
    category: "education",
    subcategory: "lesson",
    tags: ["education", "lesson", "Professional"],
    useCase: "Create culturally responsive lesson for professional use",
    variables: ['TOPIC', 'CULTURES', 'OBJECTIVES', 'MATERIALS', 'ASSESSMENT'],
  },
  {
    id: "edu-stem-activity",
    title: "STEM Activity Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Hands-on science and math activities

VARIABLES TO FILL:
- TOPIC, GRADE_LEVEL, MATERIALS, DURATION, STANDARDS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete stem activity design ready for use.`,
    description: "Hands-on science and math activities",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create stem activity design for professional use",
    variables: ['TOPIC', 'GRADE_LEVEL', 'MATERIALS', 'DURATION', 'STANDARDS'],
  },
  {
    id: "edu-esl-lesson",
    title: "ESL/ELL Lesson Plan",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: lesson
- Purpose: English language learner lessons

VARIABLES TO FILL:
- PROFICIENCY_LEVEL, TOPIC, OBJECTIVES, SUPPORTS, ASSESSMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete esl/ell lesson plan ready for use.`,
    description: "English language learner lessons",
    category: "education",
    subcategory: "lesson",
    tags: ["education", "lesson", "Professional"],
    useCase: "Create esl/ell lesson plan for professional use",
    variables: ['PROFICIENCY_LEVEL', 'TOPIC', 'OBJECTIVES', 'SUPPORTS', 'ASSESSMENT'],
  },
  {
    id: "edu-special-ed-accommodations",
    title: "Special Ed Accommodations",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: IEP accommodations and modifications

VARIABLES TO FILL:
- STUDENT_NEEDS, CLASSwork, ASSIGNMENTS, ASSESSMENT, ENVIRONMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete special ed accommodations ready for use.`,
    description: "IEP accommodations and modifications",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create special ed accommodations for professional use",
    variables: ['STUDENT_NEEDS', 'CLASSwork', 'ASSIGNMENTS', 'ASSESSMENT', 'ENVIRONMENT'],
  },
  {
    id: "edu-engagement-strategies",
    title: "Student Engagement Strategies",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Increase participation and motivation

VARIABLES TO FILL:
- CONTEXT, CHALLENGE, STRATEGIES, MATERIALS, MEASUREMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete student engagement strategies ready for use.`,
    description: "Increase participation and motivation",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create student engagement strategies for professional use",
    variables: ['CONTEXT', 'CHALLENGE', 'STRATEGIES', 'MATERIALS', 'MEASUREMENT'],
  },
  {
    id: "edu-homework-design",
    title: "Homework Assignment Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Purposeful homework that reinforces learning

VARIABLES TO FILL:
- TOPIC, PURPOSE, TIME_LIMIT, FORMAT, FEEDBACK

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete homework assignment design ready for use.`,
    description: "Purposeful homework that reinforces learning",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create homework assignment design for professional use",
    variables: ['TOPIC', 'PURPOSE', 'TIME_LIMIT', 'FORMAT', 'FEEDBACK'],
  },
  {
    id: "edu-cross-curricular",
    title: "Cross-Curricular Unit",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Units connecting multiple subjects

VARIABLES TO FILL:
- TOPICS, SUBJECTS, STANDARDS, ACTIVITIES, ASSESSMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete cross-curricular unit ready for use.`,
    description: "Units connecting multiple subjects",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create cross-curricular unit for professional use",
    variables: ['TOPICS', 'SUBJECTS', 'STANDARDS', 'ACTIVITIES', 'ASSESSMENT'],
  },
  {
    id: "edu-exit-ticket",
    title: "Exit Ticket Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: assessment
- Purpose: Quick end-of-class checks

VARIABLES TO FILL:
- TOPIC, FORMAT, OBJECTIVES, QUESTIONS, ANALYSIS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete exit ticket generator ready for use.`,
    description: "Quick end-of-class checks",
    category: "education",
    subcategory: "assessment",
    tags: ["education", "assessment", "Professional"],
    useCase: "Create exit ticket generator for professional use",
    variables: ['TOPIC', 'FORMAT', 'OBJECTIVES', 'QUESTIONS', 'ANALYSIS'],
  },
  {
    id: "edu-learning-centers",
    title: "Learning Center Setup",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Rotating station activities

VARIABLES TO FILL:
- TOPIC, NUM_STATIONS, DURATION, MATERIALS, ACCOUNTABILITY

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete learning center setup ready for use.`,
    description: "Rotating station activities",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create learning center setup for professional use",
    variables: ['TOPIC', 'NUM_STATIONS', 'DURATION', 'MATERIALS', 'ACCOUNTABILITY'],
  },
  {
    id: "edu-caption-writing",
    title: "Educational Caption Writing",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Captions for videos and visuals

VARIABLES TO FILL:
- IMAGE, AUDIENCE, PURPOSE, LENGTH, KEY_POINTS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete educational caption writing ready for use.`,
    description: "Captions for videos and visuals",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create educational caption writing for professional use",
    variables: ['IMAGE', 'AUDIENCE', 'PURPOSE', 'LENGTH', 'KEY_POINTS'],
  },
  {
    id: "edu-anchor-chart",
    title: "Anchor Chart Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Visual reference charts for classroom

VARIABLES TO FILL:
- TOPIC, GRADE_LEVEL, KEY_CONCEPTS, FORMAT, EXAMPLES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete anchor chart design ready for use.`,
    description: "Visual reference charts for classroom",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create anchor chart design for professional use",
    variables: ['TOPIC', 'GRADE_LEVEL', 'KEY_CONCEPTS', 'FORMAT', 'EXAMPLES'],
  },
  {
    id: "edu-concept-map",
    title: "Concept Map Creation",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Visual concept organization

VARIABLES TO FILL:
- TOPIC, CONCEPTS, RELATIONSHIPS, FORMAT, COMPLEXITY

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete concept map creation ready for use.`,
    description: "Visual concept organization",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create concept map creation for professional use",
    variables: ['TOPIC', 'CONCEPTS', 'RELATIONSHIPS', 'FORMAT', 'COMPLEXITY'],
  },
  {
    id: "edu-kahoot-quiz",
    title: "Kahoot-style Quiz",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: assessment
- Purpose: Gamified quiz questions

VARIABLES TO FILL:
- TOPIC, NUM_QUESTIONS, DIFFICULTY, TIME_LIMIT, FORMAT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete kahoot-style quiz ready for use.`,
    description: "Gamified quiz questions",
    category: "education",
    subcategory: "assessment",
    tags: ["education", "assessment", "Professional"],
    useCase: "Create kahoot-style quiz for professional use",
    variables: ['TOPIC', 'NUM_QUESTIONS', 'DIFFICULTY', 'TIME_LIMIT', 'FORMAT'],
  },
  {
    id: "edu-digital-scavenger-hunt",
    title: "Digital Scavenger Hunt",
    prompt: `You are a professional prompt engineer. Create [TASK] for education use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: education
- Subcategory: course
- Purpose: Technology-based exploration activities

VARIABLES TO FILL:
- TOPIC, PLATFORM, OBJECTIVES, CLUES, ANSWERS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete digital scavenger hunt ready for use.`,
    description: "Technology-based exploration activities",
    category: "education",
    subcategory: "course",
    tags: ["education", "course", "Professional"],
    useCase: "Create digital scavenger hunt for professional use",
    variables: ['TOPIC', 'PLATFORM', 'OBJECTIVES', 'CLUES', 'ANSWERS'],
  },
  {
    id: "hr-job-description",
    title: "Job Description Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Detailed job postings that attract right candidates

VARIABLES TO FILL:
- ROLE, LEVEL, DEPARTMENT, KEY_RESPONSIBILITIES, REQUIREMENTS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete job description generator ready for use.`,
    description: "Detailed job postings that attract right candidates",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create job description generator for professional use",
    variables: ['ROLE', 'LEVEL', 'DEPARTMENT', 'KEY_RESPONSIBILITIES', 'REQUIREMENTS'],
  },
  {
    id: "hr-interview-questions",
    title: "Interview Question Bank",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: interview
- Purpose: Behavioral and situational questions

VARIABLES TO FILL:
- ROLE, LEVEL, COMPETENCIES, CULTURE_FIT, SENIORITY

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete interview question bank ready for use.`,
    description: "Behavioral and situational questions",
    category: "hr-recruitment",
    subcategory: "interview",
    tags: ["hr recruitment", "interview", "Professional"],
    useCase: "Create interview question bank for professional use",
    variables: ['ROLE', 'LEVEL', 'COMPETENCIES', 'CULTURE_FIT', 'SENIORITY'],
  },
  {
    id: "hr-interview-guide",
    title: "Structured Interview Guide",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: interview
- Purpose: Panel interview preparation

VARIABLES TO FILL:
- CANDIDATE_NAME, POSITION, INTERVIEWERS, KEY_AREAS, SCORING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete structured interview guide ready for use.`,
    description: "Panel interview preparation",
    category: "hr-recruitment",
    subcategory: "interview",
    tags: ["hr recruitment", "interview", "Professional"],
    useCase: "Create structured interview guide for professional use",
    variables: ['CANDIDATE_NAME', 'POSITION', 'INTERVIEWERS', 'KEY_AREAS', 'SCORING'],
  },
  {
    id: "hr-reference-check",
    title: "Reference Check Questions",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: interview
- Purpose: Strategic reference check calls

VARIABLES TO FILL:
- CANDIDATE_NAME, POSITION, REFERENCES, QUESTIONS, RED_FLAGS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete reference check questions ready for use.`,
    description: "Strategic reference check calls",
    category: "hr-recruitment",
    subcategory: "interview",
    tags: ["hr recruitment", "interview", "Professional"],
    useCase: "Create reference check questions for professional use",
    variables: ['CANDIDATE_NAME', 'POSITION', 'REFERENCES', 'QUESTIONS', 'RED_FLAGS'],
  },
  {
    id: "hr-offer-letter",
    title: "Offer Letter Generation",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Professional offer letters

VARIABLES TO FILL:
- CANDIDATE_NAME, POSITION, SALARY, BENEFITS, START_DATE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete offer letter generation ready for use.`,
    description: "Professional offer letters",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create offer letter generation for professional use",
    variables: ['CANDIDATE_NAME', 'POSITION', 'SALARY', 'BENEFITS', 'START_DATE'],
  },
  {
    id: "hr-rejection-email",
    title: "Rejection Email Template",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Compassionate candidate communication

VARIABLES TO FILL:
- CANDIDATE_NAME, POSITION, STAGE, FEEDBACK, TIMING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete rejection email template ready for use.`,
    description: "Compassionate candidate communication",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create rejection email template for professional use",
    variables: ['CANDIDATE_NAME', 'POSITION', 'STAGE', 'FEEDBACK', 'TIMING'],
  },
  {
    id: "hr-onboarding-checklist",
    title: "Onboarding Checklist",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: Day 1-90 onboarding roadmap

VARIABLES TO FILL:
- ROLE, DEPARTMENT, START_DATE, MANAGER, EQUIPMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete onboarding checklist ready for use.`,
    description: "Day 1-90 onboarding roadmap",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create onboarding checklist for professional use",
    variables: ['ROLE', 'DEPARTMENT', 'START_DATE', 'MANAGER', 'EQUIPMENT'],
  },
  {
    id: "hr-performance-review",
    title: "Performance Review Template",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: Annual performance evaluations

VARIABLES TO FILL:
- EMPLOYEE_NAME, ROLE, PERIOD, GOALS, ACHIEVEMENTS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete performance review template ready for use.`,
    description: "Annual performance evaluations",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create performance review template for professional use",
    variables: ['EMPLOYEE_NAME', 'ROLE', 'PERIOD', 'GOALS', 'ACHIEVEMENTS'],
  },
  {
    id: "hr-360-feedback",
    title: "360 Feedback Questions",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: Multi-source feedback forms

VARIABLES TO FILL:
- EMPLOYEE, RELATIONSHIPS, COMPETENCIES, ANONYMITY, PURPOSE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete 360 feedback questions ready for use.`,
    description: "Multi-source feedback forms",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create 360 feedback questions for professional use",
    variables: ['EMPLOYEE', 'RELATIONSHIPS', 'COMPETENCIES', 'ANONYMITY', 'PURPOSE'],
  },
  {
    id: "hr-improvement-plan",
    title: "Performance Improvement Plan",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: PIP with clear expectations

VARIABLES TO FILL:
- EMPLOYEE, ISSUES, EXPECTATIONS, TIMELINE, SUPPORT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete performance improvement plan ready for use.`,
    description: "PIP with clear expectations",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create performance improvement plan for professional use",
    variables: ['EMPLOYEE', 'ISSUES', 'EXPECTATIONS', 'TIMELINE', 'SUPPORT'],
  },
  {
    id: "hr-termination-letter",
    title: "Termination Documentation",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: Professional termination letters

VARIABLES TO FILL:
- EMPLOYEE_NAME, REASON, DATE, SEVERANCE, NEXT_STEPS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete termination documentation ready for use.`,
    description: "Professional termination letters",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create termination documentation for professional use",
    variables: ['EMPLOYEE_NAME', 'REASON', 'DATE', 'SEVERANCE', 'NEXT_STEPS'],
  },
  {
    id: "hr-org-chart",
    title: "Organizational Chart Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Company structure visualization

VARIABLES TO FILL:
- COMPANY_NAME, DEPARTMENTS, ROLES, HEADCOUNT, LEVELS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete organizational chart design ready for use.`,
    description: "Company structure visualization",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create organizational chart design for professional use",
    variables: ['COMPANY_NAME', 'DEPARTMENTS', 'ROLES', 'HEADCOUNT', 'LEVELS'],
  },
  {
    id: "hr-succession-plan",
    title: "Succession Planning",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Leadership pipeline development

VARIABLES TO FILL:
- ROLE, TIMELINE, CANDIDATES, DEVELOPMENT, RISKS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete succession planning ready for use.`,
    description: "Leadership pipeline development",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create succession planning for professional use",
    variables: ['ROLE', 'TIMELINE', 'CANDIDATES', 'DEVELOPMENT', 'RISKS'],
  },
  {
    id: "hr-compensation-benchmark",
    title: "Compensation Analysis",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Salary benchmarking reports

VARIABLES TO FILL:
- ROLE, LOCATION, INDUSTRY, LEVEL, BENCHMARKS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete compensation analysis ready for use.`,
    description: "Salary benchmarking reports",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create compensation analysis for professional use",
    variables: ['ROLE', 'LOCATION', 'INDUSTRY', 'LEVEL', 'BENCHMARKS'],
  },
  {
    id: "hr-employee-handbook",
    title: "Employee Handbook Section",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: Policy writing for handbooks

VARIABLES TO FILL:
- POLICY_TOPIC, JURISDICTION, TONE, EXAMPLES, COMPLIANCE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete employee handbook section ready for use.`,
    description: "Policy writing for handbooks",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create employee handbook section for professional use",
    variables: ['POLICY_TOPIC', 'JURISDICTION', 'TONE', 'EXAMPLES', 'COMPLIANCE'],
  },
  {
    id: "hr-conflict-resolution",
    title: "Conflict Resolution Script",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: Mediation conversation guides

VARIABLES TO FILL:
- PARTIES, ISSUE, RELATIONSHIP, GOAL, APPROACH

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete conflict resolution script ready for use.`,
    description: "Mediation conversation guides",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create conflict resolution script for professional use",
    variables: ['PARTIES', 'ISSUE', 'RELATIONSHIP', 'GOAL', 'APPROACH'],
  },
  {
    id: "hr-volunteer-management",
    title: "Volunteer Program Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Volunteer recruitment and management

VARIABLES TO FILL:
- PROGRAM, ROLES, REQUIREMENTS, TRAINING, SCHEDULING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete volunteer program design ready for use.`,
    description: "Volunteer recruitment and management",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create volunteer program design for professional use",
    variables: ['PROGRAM', 'ROLES', 'REQUIREMENTS', 'TRAINING', 'SCHEDULING'],
  },
  {
    id: "hr-workforce-planning",
    title: "Workforce Planning Analysis",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Staffing needs assessment

VARIABLES TO FILL:
- DEPARTMENT, CURRENT_HEADCOUNT, PROJECTIONS, GAPS, PLAN

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete workforce planning analysis ready for use.`,
    description: "Staffing needs assessment",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create workforce planning analysis for professional use",
    variables: ['DEPARTMENT', 'CURRENT_HEADCOUNT', 'PROJECTIONS', 'GAPS', 'PLAN'],
  },
  {
    id: "hr-remote-policy",
    title: "Remote Work Policy",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: Hybrid and remote guidelines

VARIABLES TO FILL:
- POLICY_TYPE, ELIGIBILITY, EXPECTATIONS, EQUIPMENT, SECURITY

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete remote work policy ready for use.`,
    description: "Hybrid and remote guidelines",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create remote work policy for professional use",
    variables: ['POLICY_TYPE', 'ELIGIBILITY', 'EXPECTATIONS', 'EQUIPMENT', 'SECURITY'],
  },
  {
    id: "hr-disciplinury-action",
    title: "Disciplinary Action Documentation",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: Written warnings and documentation

VARIABLES TO FILL:
- EMPLOYEE, VIOLATION, PRIOR_OFFENSES, POLICY, ACTION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete disciplinary action documentation ready for use.`,
    description: "Written warnings and documentation",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create disciplinary action documentation for professional use",
    variables: ['EMPLOYEE', 'VIOLATION', 'PRIOR_OFFENSES', 'POLICY', 'ACTION'],
  },
  {
    id: "hr-remote-interview",
    title: "Virtual Interview Guide",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: interview
- Purpose: Effective remote hiring process

VARIABLES TO FILL:
- ROLE, TECH_STACK, PANEL, QUESTIONS, ASSESSMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete virtual interview guide ready for use.`,
    description: "Effective remote hiring process",
    category: "hr-recruitment",
    subcategory: "interview",
    tags: ["hr recruitment", "interview", "Professional"],
    useCase: "Create virtual interview guide for professional use",
    variables: ['ROLE', 'TECH_STACK', 'PANEL', 'QUESTIONS', 'ASSESSMENT'],
  },
  {
    id: "hr-internship-program",
    title: "Internship Program Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Structured internship curriculum

VARIABLES TO FILL:
- DEPARTMENT, DURATION, OBJECTIVES, PROJECTS, MENTORSHIP

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete internship program design ready for use.`,
    description: "Structured internship curriculum",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create internship program design for professional use",
    variables: ['DEPARTMENT', 'DURATION', 'OBJECTIVES', 'PROJECTS', 'MENTORSHIP'],
  },
  {
    id: "hr-employee-survey",
    title: "Employee Survey Questions",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: Engagement and satisfaction surveys

VARIABLES TO FILL:
- SURVEY_TYPE, TOPICS, CONFIDENTIALITY, BENCHMARKS, ACTION_PLAN

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete employee survey questions ready for use.`,
    description: "Engagement and satisfaction surveys",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create employee survey questions for professional use",
    variables: ['SURVEY_TYPE', 'TOPICS', 'CONFIDENTIALITY', 'BENCHMARKS', 'ACTION_PLAN'],
  },
  {
    id: "hr-exit-interview",
    title: "Exit Interview Questions",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: Departure conversations

VARIABLES TO FILL:
- EMPLOYEE, TENURE, REASON, QUESTIONS, ANALYSIS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete exit interview questions ready for use.`,
    description: "Departure conversations",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create exit interview questions for professional use",
    variables: ['EMPLOYEE', 'TENURE', 'REASON', 'QUESTIONS', 'ANALYSIS'],
  },
  {
    id: "hr-career-ladder",
    title: "Career Ladder Framework",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Level progression documentation

VARIABLES TO FILL:
- FUNCTION, LEVELS, REQUIREMENTS, COMPENSATION, TIMELINE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete career ladder framework ready for use.`,
    description: "Level progression documentation",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create career ladder framework for professional use",
    variables: ['FUNCTION', 'LEVELS', 'REQUIREMENTS', 'COMPENSATION', 'TIMELINE'],
  },
  {
    id: "hr-job-classification",
    title: "Job Classification System",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: FLSA and grade level assignments

VARIABLES TO FILL:
- ROLE, DUTIES, COMPLEXITY, SUPERVISION, QUALIFICATIONS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete job classification system ready for use.`,
    description: "FLSA and grade level assignments",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create job classification system for professional use",
    variables: ['ROLE', 'DUTIES', 'COMPLEXITY', 'SUPERVISION', 'QUALIFICATIONS'],
  },
  {
    id: "hr-background-check",
    title: "Background Check Policy",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Screening procedures and criteria

VARIABLES TO FILL:
- POSITION, SCREENING_LEVEL, CRITERIA, PROCESS, COMPLIANCE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete background check policy ready for use.`,
    description: "Screening procedures and criteria",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create background check policy for professional use",
    variables: ['POSITION', 'SCREENING_LEVEL', 'CRITERIA', 'PROCESS', 'COMPLIANCE'],
  },
  {
    id: "hr-drug-policy",
    title: "Drug Testing Policy",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Testing procedures and handling

VARIABLES TO FILL:
- JURISDICTION, TESTING_TRIGGERS, PROCEDURES, CONSEQUENCES, ACCOMMODATIONS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete drug testing policy ready for use.`,
    description: "Testing procedures and handling",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create drug testing policy for professional use",
    variables: ['JURISDICTION', 'TESTING_TRIGGERS', 'PROCEDURES', 'CONSEQUENCES', 'ACCOMMODATIONS'],
  },
  {
    id: "hr-accommodation-request",
    title: "Accommodation Request Process",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: ADA accommodation workflow

VARIABLES TO FILL:
- REQUEST_TYPE, EMPLOYEE, DISABILITY, RESTRICTION, ACCOMMODATION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete accommodation request process ready for use.`,
    description: "ADA accommodation workflow",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create accommodation request process for professional use",
    variables: ['REQUEST_TYPE', 'EMPLOYEE', 'DISABILITY', 'RESTRICTION', 'ACCOMMODATION'],
  },
  {
    id: "hr-loyalty-program",
    title: "Employee Retention Program",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Retention strategies and incentives

VARIABLES TO FILL:
- DEMOGRAPHIC, TURNOVER_RATE, RETENTION_GOALS, PROGRAMS, COST

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete employee retention program ready for use.`,
    description: "Retention strategies and incentives",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create employee retention program for professional use",
    variables: ['DEMOGRAPHIC', 'TURNOVER_RATE', 'RETENTION_GOALS', 'PROGRAMS', 'COST'],
  },
  {
    id: "hr-peer-review",
    title: "Peer Review Process",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: Colleague feedback systems

VARIABLES TO FILL:
- PURPOSE, CRITERIA, PROCESS, CONFIDENTIALITY, WEIGHT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete peer review process ready for use.`,
    description: "Colleague feedback systems",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create peer review process for professional use",
    variables: ['PURPOSE', 'CRITERIA', 'PROCESS', 'CONFIDENTIALITY', 'WEIGHT'],
  },
  {
    id: "hr-skills-matrix",
    title: "Skills Matrix Creation",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Team capability mapping

VARIABLES TO FILL:
- TEAM, SKILLS, LEVELS, GAPS, DEVELOPMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete skills matrix creation ready for use.`,
    description: "Team capability mapping",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create skills matrix creation for professional use",
    variables: ['TEAM', 'SKILLS', 'LEVELS', 'GAPS', 'DEVELOPMENT'],
  },
  {
    id: "hr-team-charter",
    title: "Team Charter Creation",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Team norms and expectations

VARIABLES TO FILL:
- TEAM_NAME, MEMBERS, PURPOSE, NORMS, GOALS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete team charter creation ready for use.`,
    description: "Team norms and expectations",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create team charter creation for professional use",
    variables: ['TEAM_NAME', 'MEMBERS', 'PURPOSE', 'NORMS', 'GOALS'],
  },
  {
    id: "hr-probation-review",
    title: "Probation Period Review",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: onboarding
- Purpose: New hire evaluation process

VARIABLES TO FILL:
- EMPLOYEE, ROLE, START_DATE, EXPECTATIONS, CRITERIA

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete probation period review ready for use.`,
    description: "New hire evaluation process",
    category: "hr-recruitment",
    subcategory: "onboarding",
    tags: ["hr recruitment", "onboarding", "Professional"],
    useCase: "Create probation period review for professional use",
    variables: ['EMPLOYEE', 'ROLE', 'START_DATE', 'EXPECTATIONS', 'CRITERIA'],
  },
  {
    id: "hr-award-nomination",
    title: "Award Nomination Writing",
    prompt: `You are a professional prompt engineer. Create [TASK] for hr recruitment use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: hr-recruitment
- Subcategory: jd
- Purpose: Recognition nomination templates

VARIABLES TO FILL:
- AWARD_TYPE, NOMINEE, ACHIEVEMENTS, IMPACT, NOMINATOR

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete award nomination writing ready for use.`,
    description: "Recognition nomination templates",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["hr recruitment", "jd", "Professional"],
    useCase: "Create award nomination writing for professional use",
    variables: ['AWARD_TYPE', 'NOMINEE', 'ACHIEVEMENTS', 'IMPACT', 'NOMINATOR'],
  },
  {
    id: "local-event-flyer",
    title: "Local Event Flyer Copy",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: local-content
- Purpose: Event promotion materials

VARIABLES TO FILL:
- EVENT, VENUE, DATE, AUDIENCE, CTA

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete local event flyer copy ready for use.`,
    description: "Event promotion materials",
    category: "local-business",
    subcategory: "local-content",
    tags: ["local business", "local-content", "Professional"],
    useCase: "Create local event flyer copy for professional use",
    variables: ['EVENT', 'VENUE', 'DATE', 'AUDIENCE', 'CTA'],
  },
  {
    id: "local-newsletter",
    title: "Local Business Newsletter",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: local-content
- Purpose: Monthly community newsletters

VARIABLES TO FILL:
- BUSINESS, AUDIENCE, UPDATES, OFFERS, COMMUNITY_NEWS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete local business newsletter ready for use.`,
    description: "Monthly community newsletters",
    category: "local-business",
    subcategory: "local-content",
    tags: ["local business", "local-content", "Professional"],
    useCase: "Create local business newsletter for professional use",
    variables: ['BUSINESS', 'AUDIENCE', 'UPDATES', 'OFFERS', 'COMMUNITY_NEWS'],
  },
  {
    id: "local-partnership-proposal",
    title: "Local Partnership Proposal",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: local-content
- Purpose: Cross-promotion with nearby businesses

VARIABLES TO FILL:
- BUSINESS_NAME, PARTNER_BUSINESS, BENEFITS, OFFER, TIMELINE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete local partnership proposal ready for use.`,
    description: "Cross-promotion with nearby businesses",
    category: "local-business",
    subcategory: "local-content",
    tags: ["local business", "local-content", "Professional"],
    useCase: "Create local partnership proposal for professional use",
    variables: ['BUSINESS_NAME', 'PARTNER_BUSINESS', 'BENEFITS', 'OFFER', 'TIMELINE'],
  },
  {
    id: "local-customer-appreciation",
    title: "Customer Appreciation Event",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: local-content
- Purpose: Loyalty program events

VARIABLES TO FILL:
- BUSINESS, EVENT_TYPE, AUDIENCE, DATE, INCENTIVES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete customer appreciation event ready for use.`,
    description: "Loyalty program events",
    category: "local-business",
    subcategory: "local-content",
    tags: ["local business", "local-content", "Professional"],
    useCase: "Create customer appreciation event for professional use",
    variables: ['BUSINESS', 'EVENT_TYPE', 'AUDIENCE', 'DATE', 'INCENTIVES'],
  },
  {
    id: "local-sponsorship-request",
    title: "Sponsorship Request Letter",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: local-content
- Purpose: Sponsor local events and teams

VARIABLES TO FILL:
- BUSINESS, EVENT, SPONSORSHIP_LEVEL, BENEFITS, ASK

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete sponsorship request letter ready for use.`,
    description: "Sponsor local events and teams",
    category: "local-business",
    subcategory: "local-content",
    tags: ["local business", "local-content", "Professional"],
    useCase: "Create sponsorship request letter for professional use",
    variables: ['BUSINESS', 'EVENT', 'SPONSORSHIP_LEVEL', 'BENEFITS', 'ASK'],
  },
  {
    id: "local-milestone-announcement",
    title: "Business Milestone Announcement",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: local-content
- Purpose: Anniversary and achievement posts

VARIABLES TO FILL:
- MILESTONE, BUSINESS_NAME, YEARS, THANK_YOU, OFFER

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete business milestone announcement ready for use.`,
    description: "Anniversary and achievement posts",
    category: "local-business",
    subcategory: "local-content",
    tags: ["local business", "local-content", "Professional"],
    useCase: "Create business milestone announcement for professional use",
    variables: ['MILESTONE', 'BUSINESS_NAME', 'YEARS', 'THANK_YOU', 'OFFER'],
  },
  {
    id: "local-seasonal-campaign",
    title: "Seasonal Marketing Campaign",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: local-content
- Purpose: Holiday and seasonal promotions

VARIABLES TO FILL:
- SEASON, BUSINESS, CAMPAIGN_THEME, OFFERS, CHANNELS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete seasonal marketing campaign ready for use.`,
    description: "Holiday and seasonal promotions",
    category: "local-business",
    subcategory: "local-content",
    tags: ["local business", "local-content", "Professional"],
    useCase: "Create seasonal marketing campaign for professional use",
    variables: ['SEASON', 'BUSINESS', 'CAMPAIGN_THEME', 'OFFERS', 'CHANNELS'],
  },
  {
    id: "local-popup-shop",
    title: "Popup Shop Promotion",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: google-business
- Purpose: Temporary location marketing

VARIABLES TO FILL:
- LOCATION, DATES, PRODUCTS, SPECIALS, DIRECTIONS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete popup shop promotion ready for use.`,
    description: "Temporary location marketing",
    category: "local-business",
    subcategory: "google-business",
    tags: ["local business", "google-business", "Professional"],
    useCase: "Create popup shop promotion for professional use",
    variables: ['LOCATION', 'DATES', 'PRODUCTS', 'SPECIALS', 'DIRECTIONS'],
  },
  {
    id: "local-cleanup-campaign",
    title: "Community Cleanup Initiative",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: local-content
- Purpose: Neighborhood improvement events

VARIABLES TO FILL:
- AREA, DATE, SPONSORS, VOLUNTEERS, SUPPLIES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete community cleanup initiative ready for use.`,
    description: "Neighborhood improvement events",
    category: "local-business",
    subcategory: "local-content",
    tags: ["local business", "local-content", "Professional"],
    useCase: "Create community cleanup initiative for professional use",
    variables: ['AREA', 'DATE', 'SPONSORS', 'VOLUNTEERS', 'SUPPLIES'],
  },
  {
    id: "local-school-partnership",
    title: "School Partnership Proposal",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: local-content
- Purpose: Educational sponsorships and partnerships

VARIABLES TO FILL:
- BUSINESS, SCHOOL, PROGRAMS, BENEFITS, COMMITMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete school partnership proposal ready for use.`,
    description: "Educational sponsorships and partnerships",
    category: "local-business",
    subcategory: "local-content",
    tags: ["local business", "local-content", "Professional"],
    useCase: "Create school partnership proposal for professional use",
    variables: ['BUSINESS', 'SCHOOL', 'PROGRAMS', 'BENEFITS', 'COMMITMENT'],
  },
  {
    id: "local-year-review",
    title: "Year in Review Newsletter",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: local-content
- Purpose: Annual community update

VARIABLES TO FILL:
- BUSINESS, YEAR, HIGHLIGHTS, CUSTOMERS, GOALS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete year in review newsletter ready for use.`,
    description: "Annual community update",
    category: "local-business",
    subcategory: "local-content",
    tags: ["local business", "local-content", "Professional"],
    useCase: "Create year in review newsletter for professional use",
    variables: ['BUSINESS', 'YEAR', 'HIGHLIGHTS', 'CUSTOMERS', 'GOALS'],
  },
  {
    id: "local-referral-program",
    title: "Referral Program Launch",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: google-business
- Purpose: Word-of-mouth incentives

VARIABLES TO FILL:
- BUSINESS, INCENTIVE, PROCESS, TRACKING, COMMUNICATION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete referral program launch ready for use.`,
    description: "Word-of-mouth incentives",
    category: "local-business",
    subcategory: "google-business",
    tags: ["local business", "google-business", "Professional"],
    useCase: "Create referral program launch for professional use",
    variables: ['BUSINESS', 'INCENTIVE', 'PROCESS', 'TRACKING', 'COMMUNICATION'],
  },
  {
    id: "local-teacher-discount",
    title: "Teacher Discount Program",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: google-business
- Purpose: Educator appreciation initiatives

VARIABLES TO FILL:
- BUSINESS, DISCOUNT, ELIGIBILITY, VERIFICATION, PROMOTION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete teacher discount program ready for use.`,
    description: "Educator appreciation initiatives",
    category: "local-business",
    subcategory: "google-business",
    tags: ["local business", "google-business", "Professional"],
    useCase: "Create teacher discount program for professional use",
    variables: ['BUSINESS', 'DISCOUNT', 'ELIGIBILITY', 'VERIFICATION', 'PROMOTION'],
  },
  {
    id: "local-pet-adoption",
    title: "Pet Adoption Event Promotion",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: local-content
- Purpose: Animal shelter collaboration

VARIABLES TO FILL:
- EVENT, SHELTER, DATE, LOCATION, ADOPTION_FEES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete pet adoption event promotion ready for use.`,
    description: "Animal shelter collaboration",
    category: "local-business",
    subcategory: "local-content",
    tags: ["local business", "local-content", "Professional"],
    useCase: "Create pet adoption event promotion for professional use",
    variables: ['EVENT', 'SHELTER', 'DATE', 'LOCATION', 'ADOPTION_FEES'],
  },
  {
    id: "local-farmers-market",
    title: "Farmers Market Vendor Setup",
    prompt: `You are a professional prompt engineer. Create [TASK] for local business use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: local-business
- Subcategory: google-business
- Purpose: Weekly market booth optimization

VARIABLES TO FILL:
- VENDOR, PRODUCTS, BOOTH_SETUP, PRICING, MARKET_DATES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete farmers market vendor setup ready for use.`,
    description: "Weekly market booth optimization",
    category: "local-business",
    subcategory: "google-business",
    tags: ["local business", "google-business", "Professional"],
    useCase: "Create farmers market vendor setup for professional use",
    variables: ['VENDOR', 'PRODUCTS', 'BOOTH_SETUP', 'PRICING', 'MARKET_DATES'],
  },
  {
    id: "influencer-media-kit",
    title: "Media Kit Creation",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: portfolio
- Purpose: Professional influencer media kit

VARIABLES TO FILL:
- CREATOR_NAME, PLATFORMS, FOLLOWERS, DEMOGRAPHICS, PAST_WORK

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete media kit creation ready for use.`,
    description: "Professional influencer media kit",
    category: "influencer",
    subcategory: "portfolio",
    tags: ["influencer", "portfolio", "Professional"],
    useCase: "Create media kit creation for professional use",
    variables: ['CREATOR_NAME', 'PLATFORMS', 'FOLLOWERS', 'DEMOGRAPHICS', 'PAST_WORK'],
  },
  {
    id: "influencer-sponsorship-deck",
    title: "Sponsorship Deck",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: pitches
- Purpose: Brand partnership presentation

VARIABLES TO FILL:
- CREATOR, BRAND, AUDIENCE, CONTENT_IDEAS, RATES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete sponsorship deck ready for use.`,
    description: "Brand partnership presentation",
    category: "influencer",
    subcategory: "pitches",
    tags: ["influencer", "pitches", "Professional"],
    useCase: "Create sponsorship deck for professional use",
    variables: ['CREATOR', 'BRAND', 'AUDIENCE', 'CONTENT_IDEAS', 'RATES'],
  },
  {
    id: "influencer-collaboration-brief",
    title: "Brand Collaboration Brief",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: collab
- Purpose: Creative brief for brand work

VARIABLES TO FILL:
- BRAND, PRODUCT, MESSAGE, DELIVERABLES, TIMELINE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete brand collaboration brief ready for use.`,
    description: "Creative brief for brand work",
    category: "influencer",
    subcategory: "collab",
    tags: ["influencer", "collab", "Professional"],
    useCase: "Create brand collaboration brief for professional use",
    variables: ['BRAND', 'PRODUCT', 'MESSAGE', 'DELIVERABLES', 'TIMELINE'],
  },
  {
    id: "influencer-product-launch",
    title: "Product Launch Collaboration",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: collab
- Purpose: Launch content strategy with brand

VARIABLES TO FILL:
- PRODUCT, LAUNCH_DATE, CONTENT_TYPES, PLATFORMS, EXCLUSIVITY

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete product launch collaboration ready for use.`,
    description: "Launch content strategy with brand",
    category: "influencer",
    subcategory: "collab",
    tags: ["influencer", "collab", "Professional"],
    useCase: "Create product launch collaboration for professional use",
    variables: ['PRODUCT', 'LAUNCH_DATE', 'CONTENT_TYPES', 'PLATFORMS', 'EXCLUSIVITY'],
  },
  {
    id: "influencer-reviews-policy",
    title: "Review Policy Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: portfolio
- Purpose: Honest review disclosure policies

VARIABLES TO FILL:
- POLICY_TYPE, STANDARDS, DISCLOSURE, COMPENSATION, CRITERIA

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete review policy generator ready for use.`,
    description: "Honest review disclosure policies",
    category: "influencer",
    subcategory: "portfolio",
    tags: ["influencer", "portfolio", "Professional"],
    useCase: "Create review policy generator for professional use",
    variables: ['POLICY_TYPE', 'STANDARDS', 'DISCLOSURE', 'COMPENSATION', 'CRITERIA'],
  },
  {
    id: "influencer-email-signature",
    title: "Professional Email Signature",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: portfolio
- Purpose: Brand email templates

VARIABLES TO FILL:
- CREATOR_NAME, HANDLES, BRANDS, LINKS, AESTHETIC

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete professional email signature ready for use.`,
    description: "Brand email templates",
    category: "influencer",
    subcategory: "portfolio",
    tags: ["influencer", "portfolio", "Professional"],
    useCase: "Create professional email signature for professional use",
    variables: ['CREATOR_NAME', 'HANDLES', 'BRANDS', 'LINKS', 'AESTHETIC'],
  },
  {
    id: "influencer-brand-story",
    title: "Personal Brand Story",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: portfolio
- Purpose: Creator origin and mission story

VARIABLES TO FILL:
- NAME, JOURNEY, MISSION, VALUES, AUDIENCE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete personal brand story ready for use.`,
    description: "Creator origin and mission story",
    category: "influencer",
    subcategory: "portfolio",
    tags: ["influencer", "portfolio", "Professional"],
    useCase: "Create personal brand story for professional use",
    variables: ['NAME', 'JOURNEY', 'MISSION', 'VALUES', 'AUDIENCE'],
  },
  {
    id: "influencer-content-calendar",
    title: "Creator Content Calendar",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: portfolio
- Purpose: Monthly content planning

VARIABLES TO FILL:
- PLATFORMS, TOPICS, BRANDS, HOLIDAYS, GOALS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete creator content calendar ready for use.`,
    description: "Monthly content planning",
    category: "influencer",
    subcategory: "portfolio",
    tags: ["influencer", "portfolio", "Professional"],
    useCase: "Create creator content calendar for professional use",
    variables: ['PLATFORMS', 'TOPICS', 'BRANDS', 'HOLIDAYS', 'GOALS'],
  },
  {
    id: "influencer-collaboration-email",
    title: "Collaboration Inquiry Email",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: pitches
- Purpose: Initial brand outreach

VARIABLES TO FILL:
- CREATOR, BRAND_NAME, PROPOSAL, RATE, PORTFOLIO

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete collaboration inquiry email ready for use.`,
    description: "Initial brand outreach",
    category: "influencer",
    subcategory: "pitches",
    tags: ["influencer", "pitches", "Professional"],
    useCase: "Create collaboration inquiry email for professional use",
    variables: ['CREATOR', 'BRAND_NAME', 'PROPOSAL', 'RATE', 'PORTFOLIO'],
  },
  {
    id: "influencer-press-release",
    title: "Creator Press Release",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: portfolio
- Purpose: News announcements about milestones

VARIABLES TO FILL:
- MILESTONE, CREATOR_NAME, DETAILS, QUOTES, CONTACT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete creator press release ready for use.`,
    description: "News announcements about milestones",
    category: "influencer",
    subcategory: "portfolio",
    tags: ["influencer", "portfolio", "Professional"],
    useCase: "Create creator press release for professional use",
    variables: ['MILESTONE', 'CREATOR_NAME', 'DETAILS', 'QUOTES', 'CONTACT'],
  },
  {
    id: "influencer-sponsorship-contract",
    title: "Sponsorship Contract",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: collab
- Purpose: Legal agreement for brand deals

VARIABLES TO FILL:
- CREATOR, BRAND, DELIVERABLES, PAYMENT, TERMS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete sponsorship contract ready for use.`,
    description: "Legal agreement for brand deals",
    category: "influencer",
    subcategory: "collab",
    tags: ["influencer", "collab", "Professional"],
    useCase: "Create sponsorship contract for professional use",
    variables: ['CREATOR', 'BRAND', 'DELIVERABLES', 'PAYMENT', 'TERMS'],
  },
  {
    id: "influencer-nda-template",
    title: "Non-Disclosure Agreement",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: collab
- Purpose: Confidentiality for product launches

VARIABLES TO FILL:
- PARTIES, PURPOSE, TERMS, DURATION, EXCLUSIONS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete non-disclosure agreement ready for use.`,
    description: "Confidentiality for product launches",
    category: "influencer",
    subcategory: "collab",
    tags: ["influencer", "collab", "Professional"],
    useCase: "Create non-disclosure agreement for professional use",
    variables: ['PARTIES', 'PURPOSE', 'TERMS', 'DURATION', 'EXCLUSIONS'],
  },
  {
    id: "influencer-event-appearance",
    title: "Event Appearance Agreement",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: collab
- Purpose: Speaking and appearance contracts

VARIABLES TO FILL:
- EVENT, CREATOR, DATE, COMPENSATION, OBLIGATIONS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete event appearance agreement ready for use.`,
    description: "Speaking and appearance contracts",
    category: "influencer",
    subcategory: "collab",
    tags: ["influencer", "collab", "Professional"],
    useCase: "Create event appearance agreement for professional use",
    variables: ['EVENT', 'CREATOR', 'DATE', 'COMPENSATION', 'OBLIGATIONS'],
  },
  {
    id: "influencer-affiliate-link",
    title: "Affiliate Link Strategy",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: portfolio
- Purpose: Commission link optimization

VARIABLES TO FILL:
- PRODUCTS, PLATFORMS, AUDIENCE, PROMOTION, TRACKING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete affiliate link strategy ready for use.`,
    description: "Commission link optimization",
    category: "influencer",
    subcategory: "portfolio",
    tags: ["influencer", "portfolio", "Professional"],
    useCase: "Create affiliate link strategy for professional use",
    variables: ['PRODUCTS', 'PLATFORMS', 'AUDIENCE', 'PROMOTION', 'TRACKING'],
  },
  {
    id: "influencer-youtube-banner",
    title: "YouTube Channel Art",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: portfolio
- Purpose: Banner and branding design specs

VARIABLES TO FILL:
- CHANNEL_NAME, BRAND_COLORS, NICHES, ELEMENTS, DIMENSIONS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete youtube channel art ready for use.`,
    description: "Banner and branding design specs",
    category: "influencer",
    subcategory: "portfolio",
    tags: ["influencer", "portfolio", "Professional"],
    useCase: "Create youtube channel art for professional use",
    variables: ['CHANNEL_NAME', 'BRAND_COLORS', 'NICHES', 'ELEMENTS', 'DIMENSIONS'],
  },
  {
    id: "influencer-podcast-launch",
    title: "Podcast Launch Plan",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: portfolio
- Purpose: Podcast creation roadmap

VARIABLES TO FILL:
- TOPIC, AUDIENCE, FORMAT, FREQUENCY, MONETIZATION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete podcast launch plan ready for use.`,
    description: "Podcast creation roadmap",
    category: "influencer",
    subcategory: "portfolio",
    tags: ["influencer", "portfolio", "Professional"],
    useCase: "Create podcast launch plan for professional use",
    variables: ['TOPIC', 'AUDIENCE', 'FORMAT', 'FREQUENCY', 'MONETIZATION'],
  },
  {
    id: "influencer-merchandise",
    title: "Merchandise Design Brief",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: portfolio
- Purpose: Creator merch product specs

VARIABLES TO FILL:
- BRAND, PRODUCTS, DESIGNS, QUALITY, PRICING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete merchandise design brief ready for use.`,
    description: "Creator merch product specs",
    category: "influencer",
    subcategory: "portfolio",
    tags: ["influencer", "portfolio", "Professional"],
    useCase: "Create merchandise design brief for professional use",
    variables: ['BRAND', 'PRODUCTS', 'DESIGNS', 'QUALITY', 'PRICING'],
  },
  {
    id: "influencer-email-newsletter",
    title: "Creator Newsletter Setup",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: portfolio
- Purpose: Email list building and content

VARIABLES TO FILL:
- NICHE, AUDIENCE, FREQUENCY, CONTENT, MONETIZATION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete creator newsletter setup ready for use.`,
    description: "Email list building and content",
    category: "influencer",
    subcategory: "portfolio",
    tags: ["influencer", "portfolio", "Professional"],
    useCase: "Create creator newsletter setup for professional use",
    variables: ['NICHE', 'AUDIENCE', 'FREQUENCY', 'CONTENT', 'MONETIZATION'],
  },
  {
    id: "influencer-course-outline",
    title: "Online Course Outline",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: portfolio
- Purpose: Educational content creation

VARIABLES TO FILL:
- SKILL, AUDIENCE, FORMAT, MODULES, PRICING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete online course outline ready for use.`,
    description: "Educational content creation",
    category: "influencer",
    subcategory: "portfolio",
    tags: ["influencer", "portfolio", "Professional"],
    useCase: "Create online course outline for professional use",
    variables: ['SKILL', 'AUDIENCE', 'FORMAT', 'MODULES', 'PRICING'],
  },
  {
    id: "influencer-community-guidelines",
    title: "Community Guidelines",
    prompt: `You are a professional prompt engineer. Create [TASK] for influencer use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: influencer
- Subcategory: portfolio
- Purpose: Discord/forum moderation rules

VARIABLES TO FILL:
- PLATFORM, VALUES, RULES, ENFORCEMENT, APPEALS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete community guidelines ready for use.`,
    description: "Discord/forum moderation rules",
    category: "influencer",
    subcategory: "portfolio",
    tags: ["influencer", "portfolio", "Professional"],
    useCase: "Create community guidelines for professional use",
    variables: ['PLATFORM', 'VALUES', 'RULES', 'ENFORCEMENT', 'APPEALS'],
  },
  {
    id: "crisis-social-response",
    title: "Social Media Crisis Response",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: crisis
- Purpose: Handle viral negative attention

VARIABLES TO FILL:
- SITUATION, PLATFORM, TONE, RESPONSE, FOLLOW_UP

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete social media crisis response ready for use.`,
    description: "Handle viral negative attention",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["crisis management", "crisis", "Professional"],
    useCase: "Create social media crisis response for professional use",
    variables: ['SITUATION', 'PLATFORM', 'TONE', 'RESPONSE', 'FOLLOW_UP'],
  },
  {
    id: "crisis-press-statement",
    title: "Press Statement Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: pr
- Purpose: Official statements for media

VARIABLES TO FILL:
- SITUATION, FACTS, STANCE, QUOTE, CONTACT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete press statement generator ready for use.`,
    description: "Official statements for media",
    category: "crisis-management",
    subcategory: "pr",
    tags: ["crisis management", "pr", "Professional"],
    useCase: "Create press statement generator for professional use",
    variables: ['SITUATION', 'FACTS', 'STANCE', 'QUOTE', 'CONTACT'],
  },
  {
    id: "crisis-customer-email",
    title: "Customer Crisis Communication",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: crisis
- Purpose: Direct customer outreach

VARIABLES TO FILL:
- SITUATION, AFFECTED_CUSTOMERS, RESOLUTION, COMPENSATION, NEXT_STEPS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete customer crisis communication ready for use.`,
    description: "Direct customer outreach",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["crisis management", "crisis", "Professional"],
    useCase: "Create customer crisis communication for professional use",
    variables: ['SITUATION', 'AFFECTED_CUSTOMERS', 'RESOLUTION', 'COMPENSATION', 'NEXT_STEPS'],
  },
  {
    id: "crisis-internal-memo",
    title: "Internal Crisis Memo",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: crisis
- Purpose: Employee communication during crisis

VARIABLES TO FILL:
- SITUATION, FACTS, GUIDANCE, DO_DONTS, CONTACTS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete internal crisis memo ready for use.`,
    description: "Employee communication during crisis",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["crisis management", "crisis", "Professional"],
    useCase: "Create internal crisis memo for professional use",
    variables: ['SITUATION', 'FACTS', 'GUIDANCE', 'DO_DONTS', 'CONTACTS'],
  },
  {
    id: "crisis-leader-statement",
    title: "CEO/Leader Public Statement",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: pr
- Purpose: Executive crisis communication

VARIABLES TO FILL:
- SITUATION, LEADER_ROLE, RESPONSIBILITY, ACTION_PLAN, APOLOGY

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete ceo/leader public statement ready for use.`,
    description: "Executive crisis communication",
    category: "crisis-management",
    subcategory: "pr",
    tags: ["crisis management", "pr", "Professional"],
    useCase: "Create ceo/leader public statement for professional use",
    variables: ['SITUATION', 'LEADER_ROLE', 'RESPONSIBILITY', 'ACTION_PLAN', 'APOLOGY'],
  },
  {
    id: "crisis-review-process",
    title: "Post-Crisis Review",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: reputation
- Purpose: After-action reports

VARIABLES TO FILL:
- CRISIS, RESPONSE, OUTCOMES, LESSONS, CHANGES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete post-crisis review ready for use.`,
    description: "After-action reports",
    category: "crisis-management",
    subcategory: "reputation",
    tags: ["crisis management", "reputation", "Professional"],
    useCase: "Create post-crisis review for professional use",
    variables: ['CRISIS', 'RESPONSE', 'OUTCOMES', 'LESSONS', 'CHANGES'],
  },
  {
    id: "crisis-monitoring-plan",
    title: "Crisis Monitoring Setup",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: crisis
- Purpose: Real-time monitoring during crisis

VARIABLES TO FILL:
- CHANNELS, METRICS, THRESHOLDS, TEAM, ESCALATION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete crisis monitoring setup ready for use.`,
    description: "Real-time monitoring during crisis",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["crisis management", "crisis", "Professional"],
    useCase: "Create crisis monitoring setup for professional use",
    variables: ['CHANNELS', 'METRICS', 'THRESHOLDS', 'TEAM', 'ESCALATION'],
  },
  {
    id: "crisis-spokesperson-guide",
    title: "Spokesperson Talking Points",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: pr
- Purpose: Media interview preparation

VARIABLES TO FILL:
- TOPIC, KEY_MESSAGES, DIFFICULT_QUESTIONS, DOs, DONTs

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete spokesperson talking points ready for use.`,
    description: "Media interview preparation",
    category: "crisis-management",
    subcategory: "pr",
    tags: ["crisis management", "pr", "Professional"],
    useCase: "Create spokesperson talking points for professional use",
    variables: ['TOPIC', 'KEY_MESSAGES', 'DIFFICULT_QUESTIONS', 'DOs', 'DONTs'],
  },
  {
    id: "crisis-product-recall",
    title: "Product Recall Communication",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: crisis
- Purpose: Safety alert messaging

VARIABLES TO FILL:
- PRODUCT, ISSUE, RISK, ACTION, CONTACT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete product recall communication ready for use.`,
    description: "Safety alert messaging",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["crisis management", "crisis", "Professional"],
    useCase: "Create product recall communication for professional use",
    variables: ['PRODUCT', 'ISSUE', 'RISK', 'ACTION', 'CONTACT'],
  },
  {
    id: "crisis-data-breach",
    title: "Data Breach Notification",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: crisis
- Purpose: Customer breach communication

VARIABLES TO FILL:
- BREACH_TYPE, AFFECTED_DATA, ACTIONS, PREVENTION, SUPPORT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete data breach notification ready for use.`,
    description: "Customer breach communication",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["crisis management", "crisis", "Professional"],
    useCase: "Create data breach notification for professional use",
    variables: ['BREACH_TYPE', 'AFFECTED_DATA', 'ACTIONS', 'PREVENTION', 'SUPPORT'],
  },
  {
    id: "crisis-layoff-comm",
    title: "Layoff Communication Plan",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: crisis
- Purpose: Workforce reduction messaging

VARIABLES TO FILL:
- TIMELINE, AFFECTED, SUPPORT, MESSAGE, MANAGERS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete layoff communication plan ready for use.`,
    description: "Workforce reduction messaging",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["crisis management", "crisis", "Professional"],
    useCase: "Create layoff communication plan for professional use",
    variables: ['TIMELINE', 'AFFECTED', 'SUPPORT', 'MESSAGE', 'MANAGERS'],
  },
  {
    id: "crisis-legal-hold",
    title: "Legal Hold Notice",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: crisis
- Purpose: Litigation preservation guidance

VARIABLES TO FILL:
- REASON, EMPLOYEES, DATA_TYPES, OBLIGATIONS, CONTACTS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete legal hold notice ready for use.`,
    description: "Litigation preservation guidance",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["crisis management", "crisis", "Professional"],
    useCase: "Create legal hold notice for professional use",
    variables: ['REASON', 'EMPLOYEES', 'DATA_TYPES', 'OBLIGATIONS', 'CONTACTS'],
  },
  {
    id: "crisis-executive-safety",
    title: "Executive Safety Protocol",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: crisis
- Purpose: Personal security during threats

VARIABLES TO FILL:
- THREAT, EXECUTIVE, PROTOCOL, AUTHORITIES, COMMUNICATION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete executive safety protocol ready for use.`,
    description: "Personal security during threats",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["crisis management", "crisis", "Professional"],
    useCase: "Create executive safety protocol for professional use",
    variables: ['THREAT', 'EXECUTIVE', 'PROTOCOL', 'AUTHORITIES', 'COMMUNICATION'],
  },
  {
    id: "crisis-supplier-failure",
    title: "Supplier Failure Communication",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: crisis
- Purpose: Supply chain disruption messaging

VARIABLES TO FILL:
- SUPPLIER, IMPACT, ALTERNATIVES, TIMELINE, CUSTOMER_MSG

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete supplier failure communication ready for use.`,
    description: "Supply chain disruption messaging",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["crisis management", "crisis", "Professional"],
    useCase: "Create supplier failure communication for professional use",
    variables: ['SUPPLIER', 'IMPACT', 'ALTERNATIVES', 'TIMELINE', 'CUSTOMER_MSG'],
  },
  {
    id: "crisis-reputation-repair",
    title: "Reputation Repair Campaign",
    prompt: `You are a professional prompt engineer. Create [TASK] for crisis management use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: crisis-management
- Subcategory: reputation
- Purpose: Post-crisis brand recovery

VARIABLES TO FILL:
- CRISIS, DAMAGE, STRATEGY, CHANNELS, TIMELINE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete reputation repair campaign ready for use.`,
    description: "Post-crisis brand recovery",
    category: "crisis-management",
    subcategory: "reputation",
    tags: ["crisis management", "reputation", "Professional"],
    useCase: "Create reputation repair campaign for professional use",
    variables: ['CRISIS', 'DAMAGE', 'STRATEGY', 'CHANNELS', 'TIMELINE'],
  },
  {
    id: "video-episode-outline",
    title: "Podcast Episode Outline",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: podcast
- Purpose: Detailed episode structure

VARIABLES TO FILL:
- TOPIC, GUEST, DURATION, SEGMENTS, TAKEAWAYS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete podcast episode outline ready for use.`,
    description: "Detailed episode structure",
    category: "video-podcast",
    subcategory: "podcast",
    tags: ["video podcast", "podcast", "Professional"],
    useCase: "Create podcast episode outline for professional use",
    variables: ['TOPIC', 'GUEST', 'DURATION', 'SEGMENTS', 'TAKEAWAYS'],
  },
  {
    id: "video-live-stream-script",
    title: "Live Stream Script",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: youtube
- Purpose: Interactive live content

VARIABLES TO FILL:
- TOPIC, PLATFORM, DURATION, ENGAGEMENT, CTA

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete live stream script ready for use.`,
    description: "Interactive live content",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["video podcast", "youtube", "Professional"],
    useCase: "Create live stream script for professional use",
    variables: ['TOPIC', 'PLATFORM', 'DURATION', 'ENGAGEMENT', 'CTA'],
  },
  {
    id: "video-tutorial-script",
    title: "Tutorial Video Script",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: youtube
- Purpose: Step-by-step instruction videos

VARIABLES TO FILL:
- SKILL, AUDIENCE, COMPLEXITY, STEPS, MATERIALS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete tutorial video script ready for use.`,
    description: "Step-by-step instruction videos",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["video podcast", "youtube", "Professional"],
    useCase: "Create tutorial video script for professional use",
    variables: ['SKILL', 'AUDIENCE', 'COMPLEXITY', 'STEPS', 'MATERIALS'],
  },
  {
    id: "video-explainer-animation",
    title: "Explainer Animation Script",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: youtube
- Purpose: Animated explainer content

VARIABLES TO FILL:
- CONCEPT, AUDIENCE, STYLE, LENGTH, BRAND

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete explainer animation script ready for use.`,
    description: "Animated explainer content",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["video podcast", "youtube", "Professional"],
    useCase: "Create explainer animation script for professional use",
    variables: ['CONCEPT', 'AUDIENCE', 'STYLE', 'LENGTH', 'BRAND'],
  },
  {
    id: "video-brand-documentary",
    title: "Brand Documentary Outline",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: youtube
- Purpose: Long-form brand storytelling

VARIABLES TO FILL:
- BRAND, STORY, FORMAT, INTERVIEWS, PRODUCTION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete brand documentary outline ready for use.`,
    description: "Long-form brand storytelling",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["video podcast", "youtube", "Professional"],
    useCase: "Create brand documentary outline for professional use",
    variables: ['BRAND', 'STORY', 'FORMAT', 'INTERVIEWS', 'PRODUCTION'],
  },
  {
    id: "video-webinar-slide",
    title: "Webinar Slide Deck Outline",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: youtube
- Purpose: Presentation structure

VARIABLES TO FILL:
- TOPIC, AUDIENCE, DURATION, SLIDES, ENGAGEMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete webinar slide deck outline ready for use.`,
    description: "Presentation structure",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["video podcast", "youtube", "Professional"],
    useCase: "Create webinar slide deck outline for professional use",
    variables: ['TOPIC', 'AUDIENCE', 'DURATION', 'SLIDES', 'ENGAGEMENT'],
  },
  {
    id: "video-intro-animation",
    title: "Video Intro Animation Spec",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: youtube
- Purpose: Channel intro design

VARIABLES TO FILL:
- BRAND, CHANNEL_NAME, STYLE, DURATION, MUSIC

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete video intro animation spec ready for use.`,
    description: "Channel intro design",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["video podcast", "youtube", "Professional"],
    useCase: "Create video intro animation spec for professional use",
    variables: ['BRAND', 'CHANNEL_NAME', 'STYLE', 'DURATION', 'MUSIC'],
  },
  {
    id: "video-cta-cards",
    title: "Video CTA Card Designs",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: youtube
- Purpose: End screen and info cards

VARIABLES TO FILL:
- CHANNEL, CTA_TYPES, DESIGN, LINKS, TIMING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete video cta card designs ready for use.`,
    description: "End screen and info cards",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["video podcast", "youtube", "Professional"],
    useCase: "Create video cta card designs for professional use",
    variables: ['CHANNEL', 'CTA_TYPES', 'DESIGN', 'LINKS', 'TIMING'],
  },
  {
    id: "video-podcast-guest-brief",
    title: "Podcast Guest Brief",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: podcast
- Purpose: Guest preparation guide

VARIABLES TO FILL:
- EPISODE_TOPIC, HOST, GUEST, QUESTIONS, LOGISTICS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete podcast guest brief ready for use.`,
    description: "Guest preparation guide",
    category: "video-podcast",
    subcategory: "podcast",
    tags: ["video podcast", "podcast", "Professional"],
    useCase: "Create podcast guest brief for professional use",
    variables: ['EPISODE_TOPIC', 'HOST', 'GUEST', 'QUESTIONS', 'LOGISTICS'],
  },
  {
    id: "video-music-video-concept",
    title: "Music Video Concept",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: youtube
- Purpose: Visual treatment for music

VARIABLES TO FILL:
- SONG, ARTIST, MOOD, VISUALS, TREATMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete music video concept ready for use.`,
    description: "Visual treatment for music",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["video podcast", "youtube", "Professional"],
    useCase: "Create music video concept for professional use",
    variables: ['SONG', 'ARTIST', 'MOOD', 'VISUALS', 'TREATMENT'],
  },
  {
    id: "video-interview-setup",
    title: "Video Interview Setup Guide",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: youtube
- Purpose: Professional interview filming

VARIABLES TO FILL:
- SETUP, LIGHTING, AUDIO, BACKDROP, CAMERAS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete video interview setup guide ready for use.`,
    description: "Professional interview filming",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["video podcast", "youtube", "Professional"],
    useCase: "Create video interview setup guide for professional use",
    variables: ['SETUP', 'LIGHTING', 'AUDIO', 'BACKDROP', 'CAMERAS'],
  },
  {
    id: "video-shorts-compilation",
    title: "Shorts Compilation Strategy",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: shorts
- Purpose: Long-to-short repurposing

VARIABLES TO FILL:
- SOURCE_VIDEOS, THEME, FORMAT, FREQUENCY, TITLES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete shorts compilation strategy ready for use.`,
    description: "Long-to-short repurposing",
    category: "video-podcast",
    subcategory: "shorts",
    tags: ["video podcast", "shorts", "Professional"],
    useCase: "Create shorts compilation strategy for professional use",
    variables: ['SOURCE_VIDEOS', 'THEME', 'FORMAT', 'FREQUENCY', 'TITLES'],
  },
  {
    id: "video-b-roll-shots",
    title: "B-Roll Shot List",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: youtube
- Purpose: Supplementary footage planning

VARIABLES TO FILL:
- TOPIC, SCENES, LOCATIONS, STYLE, RATIO

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete b-roll shot list ready for use.`,
    description: "Supplementary footage planning",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["video podcast", "youtube", "Professional"],
    useCase: "Create b-roll shot list for professional use",
    variables: ['TOPIC', 'SCENES', 'LOCATIONS', 'STYLE', 'RATIO'],
  },
  {
    id: "video-color-grading",
    title: "Color Grading Preset Spec",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: youtube
- Purpose: Visual consistency guidelines

VARIABLES TO FILL:
- STYLE, MOOD, REFERENCES, PRESHOT_LUT, SKIN_TONES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete color grading preset spec ready for use.`,
    description: "Visual consistency guidelines",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["video podcast", "youtube", "Professional"],
    useCase: "Create color grading preset spec for professional use",
    variables: ['STYLE', 'MOOD', 'REFERENCES', 'PRESHOT_LUT', 'SKIN_TONES'],
  },
  {
    id: "video-caption-subtitles",
    title: "Caption and Subtitle Style",
    prompt: `You are a professional prompt engineer. Create [TASK] for video podcast use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: video-podcast
- Subcategory: youtube
- Purpose: Accessibility and engagement

VARIABLES TO FILL:
- STYLE, FONT, PLACEMENT, LANGUAGE, FORMAT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete caption and subtitle style ready for use.`,
    description: "Accessibility and engagement",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["video podcast", "youtube", "Professional"],
    useCase: "Create caption and subtitle style for professional use",
    variables: ['STYLE', 'FONT', 'PLACEMENT', 'LANGUAGE', 'FORMAT'],
  },
  {
    id: "code-react-component",
    title: "React Component Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Production-ready React components

VARIABLES TO FILL:
- COMPONENT_NAME, PROPS, STATE, STYLES, LIBRARIES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete react component generator ready for use.`,
    description: "Production-ready React components",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create react component generator for professional use",
    variables: ['COMPONENT_NAME', 'PROPS', 'STATE', 'STYLES', 'LIBRARIES'],
  },
  {
    id: "code-api-endpoint",
    title: "API Endpoint Documentation",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Swagger/OpenAPI documentation

VARIABLES TO FILL:
- ENDPOINT, METHOD, PARAMS, BODY, RESPONSES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete api endpoint documentation ready for use.`,
    description: "Swagger/OpenAPI documentation",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create api endpoint documentation for professional use",
    variables: ['ENDPOINT', 'METHOD', 'PARAMS', 'BODY', 'RESPONSES'],
  },
  {
    id: "code-readme-contributing",
    title: "Contributing Guide",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Open source contribution guidelines

VARIABLES TO FILL:
- PROJECT, SETUP, WORKFLOW, STANDARDS, HELP

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete contributing guide ready for use.`,
    description: "Open source contribution guidelines",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create contributing guide for professional use",
    variables: ['PROJECT', 'SETUP', 'WORKFLOW', 'STANDARDS', 'HELP'],
  },
  {
    id: "code-git-workflow",
    title: "Git Workflow Documentation",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Branching and commit conventions

VARIABLES TO FILL:
- BRANCH_STRATEGY, NAMING, COMMITS, PR_PROCESS, RELEASES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete git workflow documentation ready for use.`,
    description: "Branching and commit conventions",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create git workflow documentation for professional use",
    variables: ['BRANCH_STRATEGY', 'NAMING', 'COMMITS', 'PR_PROCESS', 'RELEASES'],
  },
  {
    id: "code-ci-cd-pipeline",
    title: "CI/CD Pipeline Config",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Jenkins/GitHub Actions workflows

VARIABLES TO FILL:
- REPO, STAGES, TESTS, DEPLOYMENT, ENVIRONMENTS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete ci/cd pipeline config ready for use.`,
    description: "Jenkins/GitHub Actions workflows",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create ci/cd pipeline config for professional use",
    variables: ['REPO', 'STAGES', 'TESTS', 'DEPLOYMENT', 'ENVIRONMENTS'],
  },
  {
    id: "code-error-handling",
    title: "Error Handling Strategy",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Graceful error management

VARIABLES TO FILL:
- LANGUAGE, ERROR_TYPES, LOGGING, USER_MESSAGES, RECOVERY

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete error handling strategy ready for use.`,
    description: "Graceful error management",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create error handling strategy for professional use",
    variables: ['LANGUAGE', 'ERROR_TYPES', 'LOGGING', 'USER_MESSAGES', 'RECOVERY'],
  },
  {
    id: "code-logging-strategy",
    title: "Logging Strategy",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Structured logging implementation

VARIABLES TO FILL:
- LANGUAGE, LEVELS, FORMAT, DESTINATION, RETENTION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete logging strategy ready for use.`,
    description: "Structured logging implementation",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create logging strategy for professional use",
    variables: ['LANGUAGE', 'LEVELS', 'FORMAT', 'DESTINATION', 'RETENTION'],
  },
  {
    id: "code-monitoring-alerts",
    title: "Monitoring Alert Rules",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Alert configuration for production

VARIABLES TO FILL:
- METRICS, THRESHOLDS, NOTIFICATIONS, ESCALATION, DASHBOARD

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete monitoring alert rules ready for use.`,
    description: "Alert configuration for production",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create monitoring alert rules for professional use",
    variables: ['METRICS', 'THRESHOLDS', 'NOTIFICATIONS', 'ESCALATION', 'DASHBOARD'],
  },
  {
    id: "code-performance-optimization",
    title: "Performance Optimization Guide",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Speed and efficiency improvements

VARIABLES TO FILL:
- AREA, CURRENT_ISSUES, TARGETS, APPROACHES, TOOLS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete performance optimization guide ready for use.`,
    description: "Speed and efficiency improvements",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create performance optimization guide for professional use",
    variables: ['AREA', 'CURRENT_ISSUES', 'TARGETS', 'APPROACHES', 'TOOLS'],
  },
  {
    id: "code-security-checklist",
    title: "Security Checklist",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Pre-deployment security review

VARIABLES TO FILL:
- STACK, CHECKPOINTS, TOOLS, COMPLIANCE, REVIEW

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete security checklist ready for use.`,
    description: "Pre-deployment security review",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create security checklist for professional use",
    variables: ['STACK', 'CHECKPOINTS', 'TOOLS', 'COMPLIANCE', 'REVIEW'],
  },
  {
    id: "code-mocking-strategy",
    title: "Testing Mock Strategy",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Mock data and API simulation

VARIABLES TO FILL:
- FRAMEWORK, DEPENDENCIES, SCENARIOS, TOOLS, COVERAGE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete testing mock strategy ready for use.`,
    description: "Mock data and API simulation",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create testing mock strategy for professional use",
    variables: ['FRAMEWORK', 'DEPENDENCIES', 'SCENARIOS', 'TOOLS', 'COVERAGE'],
  },
  {
    id: "code-refactoring-plan",
    title: "Refactoring Plan",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Technical debt reduction roadmap

VARIABLES TO FILL:
- CODEBASE, ISSUES, PRIORITY, RISKS, TIMELINE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete refactoring plan ready for use.`,
    description: "Technical debt reduction roadmap",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create refactoring plan for professional use",
    variables: ['CODEBASE', 'ISSUES', 'PRIORITY', 'RISKS', 'TIMELINE'],
  },
  {
    id: "code-microservices-design",
    title: "Microservices Architecture",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Service design and boundaries

VARIABLES TO FILL:
- DOMAIN, SERVICES, COMMUNICATION, DATA, DEPLOYMENT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete microservices architecture ready for use.`,
    description: "Service design and boundaries",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create microservices architecture for professional use",
    variables: ['DOMAIN', 'SERVICES', 'COMMUNICATION', 'DATA', 'DEPLOYMENT'],
  },
  {
    id: "code-database-migration",
    title: "Database Migration Script",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Schema change procedures

VARIABLES TO FILL:
- OLD_SCHEMA, NEW_SCHEMA, MIGRATION_TYPE, ROLLBACK, VALIDATION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete database migration script ready for use.`,
    description: "Schema change procedures",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create database migration script for professional use",
    variables: ['OLD_SCHEMA', 'NEW_SCHEMA', 'MIGRATION_TYPE', 'ROLLBACK', 'VALIDATION'],
  },
  {
    id: "code-cache-strategy",
    title: "Caching Strategy",
    prompt: `You are a professional prompt engineer. Create [TASK] for coding tech use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: coding-tech
- Subcategory: docs
- Purpose: Redis/memcached implementation

VARIABLES TO FILL:
- CACHE_TYPE, DATA, TTL, INVALIDATION, MONITORING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete caching strategy ready for use.`,
    description: "Redis/memcached implementation",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["coding tech", "docs", "Professional"],
    useCase: "Create caching strategy for professional use",
    variables: ['CACHE_TYPE', 'DATA', 'TTL', 'INVALIDATION', 'MONITORING'],
  },
  {
    id: "ecom-product-bundle",
    title: "Product Bundle Strategy",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: product
- Purpose: Create compelling product bundles

VARIABLES TO FILL:
- PRODUCTS, PRICING, NAMING, MARKETING, INVENTORY

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete product bundle strategy ready for use.`,
    description: "Create compelling product bundles",
    category: "ecommerce",
    subcategory: "product",
    tags: ["ecommerce", "product", "Professional"],
    useCase: "Create product bundle strategy for professional use",
    variables: ['PRODUCTS', 'PRICING', 'NAMING', 'MARKETING', 'INVENTORY'],
  },
  {
    id: "ecom-upsell-sequence",
    title: "Upsell Flow Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: checkout
- Purpose: Post-purchase upsell sequences

VARIABLES TO FILL:
- PRODUCT, OFFERS, TIMING, CHANNELS, TRACKING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete upsell flow design ready for use.`,
    description: "Post-purchase upsell sequences",
    category: "ecommerce",
    subcategory: "checkout",
    tags: ["ecommerce", "checkout", "Professional"],
    useCase: "Create upsell flow design for professional use",
    variables: ['PRODUCT', 'OFFERS', 'TIMING', 'CHANNELS', 'TRACKING'],
  },
  {
    id: "ecom-abandoned-flow",
    title: "Abandoned Cart Email Flow",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: retention
- Purpose: Multi-email recovery sequence

VARIABLES TO FILL:
- PRODUCTS, DISCOUNT, TIMING, SUBJECTS, CREATIVE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete abandoned cart email flow ready for use.`,
    description: "Multi-email recovery sequence",
    category: "ecommerce",
    subcategory: "retention",
    tags: ["ecommerce", "retention", "Professional"],
    useCase: "Create abandoned cart email flow for professional use",
    variables: ['PRODUCTS', 'DISCOUNT', 'TIMING', 'SUBJECTS', 'CREATIVE'],
  },
  {
    id: "ecom-loyalty-program",
    title: "Loyalty Program Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: retention
- Purpose: Points and rewards system

VARIABLES TO FILL:
- BUSINESS_TYPE, POINTS_STRUCTURE, REWARDS, TIERS, COMMUNICATION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete loyalty program design ready for use.`,
    description: "Points and rewards system",
    category: "ecommerce",
    subcategory: "retention",
    tags: ["ecommerce", "retention", "Professional"],
    useCase: "Create loyalty program design for professional use",
    variables: ['BUSINESS_TYPE', 'POINTS_STRUCTURE', 'REWARDS', 'TIERS', 'COMMUNICATION'],
  },
  {
    id: "ecom-product-faq",
    title: "Product FAQ Page",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: product
- Purpose: Comprehensive product questions

VARIABLES TO FILL:
- PRODUCT, QUESTIONS, DEPTH, FORMAT, UPDATES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete product faq page ready for use.`,
    description: "Comprehensive product questions",
    category: "ecommerce",
    subcategory: "product",
    tags: ["ecommerce", "product", "Professional"],
    useCase: "Create product faq page for professional use",
    variables: ['PRODUCT', 'QUESTIONS', 'DEPTH', 'FORMAT', 'UPDATES'],
  },
  {
    id: "ecom-return-policy",
    title: "Return & Refund Policy",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: product
- Purpose: Clear return process documentation

VARIABLES TO FILL:
- PRODUCTS, WINDOW, CONDITION, PROCESS, EXCEPTIONS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete return & refund policy ready for use.`,
    description: "Clear return process documentation",
    category: "ecommerce",
    subcategory: "product",
    tags: ["ecommerce", "product", "Professional"],
    useCase: "Create return & refund policy for professional use",
    variables: ['PRODUCTS', 'WINDOW', 'CONDITION', 'PROCESS', 'EXCEPTIONS'],
  },
  {
    id: "ecom-size-guide",
    title: "Size Guide Creation",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: product
- Purpose: Accurate fit information

VARIABLES TO FILL:
- PRODUCT_TYPE, BRAND, MEASUREMENTS, TIPS, CHARTS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete size guide creation ready for use.`,
    description: "Accurate fit information",
    category: "ecommerce",
    subcategory: "product",
    tags: ["ecommerce", "product", "Professional"],
    useCase: "Create size guide creation for professional use",
    variables: ['PRODUCT_TYPE', 'BRAND', 'MEASUREMENTS', 'TIPS', 'CHARTS'],
  },
  {
    id: "ecom-shipping-calculator",
    title: "Shipping Calculator Copy",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: checkout
- Purpose: Shipping cost messaging

VARIABLES TO FILL:
- METHODS, SPEEDS, COSTS, FREE_THRESHOLD, INTERNATIONAL

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete shipping calculator copy ready for use.`,
    description: "Shipping cost messaging",
    category: "ecommerce",
    subcategory: "checkout",
    tags: ["ecommerce", "checkout", "Professional"],
    useCase: "Create shipping calculator copy for professional use",
    variables: ['METHODS', 'SPEEDS', 'COSTS', 'FREE_THRESHOLD', 'INTERNATIONAL'],
  },
  {
    id: "ecom-product-video",
    title: "Product Video Script",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: product
- Purpose: Ecommerce product video content

VARIABLES TO FILL:
- PRODUCT, FEATURES, LENGTH, STYLE, CTA

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete product video script ready for use.`,
    description: "Ecommerce product video content",
    category: "ecommerce",
    subcategory: "product",
    tags: ["ecommerce", "product", "Professional"],
    useCase: "Create product video script for professional use",
    variables: ['PRODUCT', 'FEATURES', 'LENGTH', 'STYLE', 'CTA'],
  },
  {
    id: "ecom-zoom-descriptions",
    title: "Zoom Image Descriptions",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: product
- Purpose: High-detail product copy

VARIABLES TO FILL:
- PRODUCT, FEATURES, QUALITY, CRAFT, DETAILS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete zoom image descriptions ready for use.`,
    description: "High-detail product copy",
    category: "ecommerce",
    subcategory: "product",
    tags: ["ecommerce", "product", "Professional"],
    useCase: "Create zoom image descriptions for professional use",
    variables: ['PRODUCT', 'FEATURES', 'QUALITY', 'CRAFT', 'DETAILS'],
  },
  {
    id: "ecom-gift-guide",
    title: "Gift Guide Content",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: product
- Purpose: Curated gift collections

VARIABLES TO FILL:
- OCCASION, RECIPIENT, BUDGET, PRODUCTS, COPY

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete gift guide content ready for use.`,
    description: "Curated gift collections",
    category: "ecommerce",
    subcategory: "product",
    tags: ["ecommerce", "product", "Professional"],
    useCase: "Create gift guide content for professional use",
    variables: ['OCCASION', 'RECIPIENT', 'BUDGET', 'PRODUCTS', 'COPY'],
  },
  {
    id: "ecom-scarcity-campaign",
    title: "Scarcity Marketing Copy",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: product
- Purpose: Urgency and scarcity tactics

VARIABLES TO FILL:
- PRODUCT, LIMIT, TIMING, MESSAGE, CHANNELS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete scarcity marketing copy ready for use.`,
    description: "Urgency and scarcity tactics",
    category: "ecommerce",
    subcategory: "product",
    tags: ["ecommerce", "product", "Professional"],
    useCase: "Create scarcity marketing copy for professional use",
    variables: ['PRODUCT', 'LIMIT', 'TIMING', 'MESSAGE', 'CHANNELS'],
  },
  {
    id: "ecom-social-proof",
    title: "Social Proof Collection",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: product
- Purpose: Customer review and testimonial strategy

VARIABLES TO FILL:
- PRODUCT, SOURCES, INCENTIVES, DISPLAY, SYNTHESIS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete social proof collection ready for use.`,
    description: "Customer review and testimonial strategy",
    category: "ecommerce",
    subcategory: "product",
    tags: ["ecommerce", "product", "Professional"],
    useCase: "Create social proof collection for professional use",
    variables: ['PRODUCT', 'SOURCES', 'INCENTIVES', 'DISPLAY', 'SYNTHESIS'],
  },
  {
    id: "ecom-subscription-setup",
    title: "Subscription Model Setup",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: product
- Purpose: Recurring revenue strategy

VARIABLES TO FILL:
- PRODUCT, PRICING, FREQUENCY, BENEFITS, RETENTION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete subscription model setup ready for use.`,
    description: "Recurring revenue strategy",
    category: "ecommerce",
    subcategory: "product",
    tags: ["ecommerce", "product", "Professional"],
    useCase: "Create subscription model setup for professional use",
    variables: ['PRODUCT', 'PRICING', 'FREQUENCY', 'BENEFITS', 'RETENTION'],
  },
  {
    id: "ecom-waitlist-copy",
    title: "Waitlist Landing Page",
    prompt: `You are a professional prompt engineer. Create [TASK] for ecommerce use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ecommerce
- Subcategory: product
- Purpose: Pre-launch email capture

VARIABLES TO FILL:
- PRODUCT, BENEFITS, FORM, COPY, DESIGN

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete waitlist landing page ready for use.`,
    description: "Pre-launch email capture",
    category: "ecommerce",
    subcategory: "product",
    tags: ["ecommerce", "product", "Professional"],
    useCase: "Create waitlist landing page for professional use",
    variables: ['PRODUCT', 'BENEFITS', 'FORM', 'COPY', 'DESIGN'],
  },
  {
    id: "content-meta-description",
    title: "Meta Description Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: blog
- Purpose: SEO meta descriptions

VARIABLES TO FILL:
- PAGE_TOPIC, KEYWORD, LENGTH, FORMAT, CTA

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete meta description generator ready for use.`,
    description: "SEO meta descriptions",
    category: "content-creation",
    subcategory: "blog",
    tags: ["content creation", "blog", "Professional"],
    useCase: "Create meta description generator for professional use",
    variables: ['PAGE_TOPIC', 'KEYWORD', 'LENGTH', 'FORMAT', 'CTA'],
  },
  {
    id: "content-youtube-description",
    title: "YouTube Description",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: script
- Purpose: SEO-optimized video descriptions

VARIABLES TO FILL:
- VIDEO_TITLE, TOPIC, LINKS, KEYWORDS, TIMESTAMPS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete youtube description ready for use.`,
    description: "SEO-optimized video descriptions",
    category: "content-creation",
    subcategory: "script",
    tags: ["content creation", "script", "Professional"],
    useCase: "Create youtube description for professional use",
    variables: ['VIDEO_TITLE', 'TOPIC', 'LINKS', 'KEYWORDS', 'TIMESTAMPS'],
  },
  {
    id: "content-podcast-shownotes",
    title: "Podcast Show Notes",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: script
- Purpose: Episode summary and links

VARIABLES TO FILL:
- EPISODE, GUEST, HIGHLIGHTS, LINKS, TRANSCRIPT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete podcast show notes ready for use.`,
    description: "Episode summary and links",
    category: "content-creation",
    subcategory: "script",
    tags: ["content creation", "script", "Professional"],
    useCase: "Create podcast show notes for professional use",
    variables: ['EPISODE', 'GUEST', 'HIGHLIGHTS', 'LINKS', 'TRANSCRIPT'],
  },
  {
    id: "content-quote-graphics",
    title: "Quote Graphic Copy",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: blog
- Purpose: Social media quote text

VARIABLES TO FILL:
- QUOTE, SOURCE, ATTRIBUTION, STYLE, PLATFORM

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete quote graphic copy ready for use.`,
    description: "Social media quote text",
    category: "content-creation",
    subcategory: "blog",
    tags: ["content creation", "blog", "Professional"],
    useCase: "Create quote graphic copy for professional use",
    variables: ['QUOTE', 'SOURCE', 'ATTRIBUTION', 'STYLE', 'PLATFORM'],
  },
  {
    id: "content-infographic-text",
    title: "Infographic Text",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: blog
- Purpose: Visual content writing

VARIABLES TO FILL:
- TOPIC, DATA_POINTS, FLOW, TAKEAWAYS, SOURCES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete infographic text ready for use.`,
    description: "Visual content writing",
    category: "content-creation",
    subcategory: "blog",
    tags: ["content creation", "blog", "Professional"],
    useCase: "Create infographic text for professional use",
    variables: ['TOPIC', 'DATA_POINTS', 'FLOW', 'TAKEAWAYS', 'SOURCES'],
  },
  {
    id: "content-email-signature",
    title: "Email Signature Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: copywriting
- Purpose: Professional email signatures

VARIABLES TO FILL:
- NAME, TITLE, BRAND, LINKS, PHOTO

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete email signature design ready for use.`,
    description: "Professional email signatures",
    category: "content-creation",
    subcategory: "copywriting",
    tags: ["content creation", "copywriting", "Professional"],
    useCase: "Create email signature design for professional use",
    variables: ['NAME', 'TITLE', 'BRAND', 'LINKS', 'PHOTO'],
  },
  {
    id: "content-testimonial-request",
    title: "Testimonial Request Email",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: copywriting
- Purpose: Customer feedback solicitation

VARIABLES TO FILL:
- CUSTOMER_NAME, EXPERIENCE, PRODUCT, QUESTIONS, INCENTIVE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete testimonial request email ready for use.`,
    description: "Customer feedback solicitation",
    category: "content-creation",
    subcategory: "copywriting",
    tags: ["content creation", "copywriting", "Professional"],
    useCase: "Create testimonial request email for professional use",
    variables: ['CUSTOMER_NAME', 'EXPERIENCE', 'PRODUCT', 'QUESTIONS', 'INCENTIVE'],
  },
  {
    id: "content-about-page",
    title: "About Page Copy",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: copywriting
- Purpose: Brand story pages

VARIABLES TO FILL:
- BRAND, STORY, MISSION, TEAM, VALUES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete about page copy ready for use.`,
    description: "Brand story pages",
    category: "content-creation",
    subcategory: "copywriting",
    tags: ["content creation", "copywriting", "Professional"],
    useCase: "Create about page copy for professional use",
    variables: ['BRAND', 'STORY', 'MISSION', 'TEAM', 'VALUES'],
  },
  {
    id: "content-contact-page",
    title: "Contact Page Copy",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: copywriting
- Purpose: Contact page optimization

VARIABLES TO FILL:
- BRAND, METHODS, RESPONSE_TIME, LOCATIONS, FAQ

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete contact page copy ready for use.`,
    description: "Contact page optimization",
    category: "content-creation",
    subcategory: "copywriting",
    tags: ["content creation", "copywriting", "Professional"],
    useCase: "Create contact page copy for professional use",
    variables: ['BRAND', 'METHODS', 'RESPONSE_TIME', 'LOCATIONS', 'FAQ'],
  },
  {
    id: "content-terms-privacy",
    title: "Terms and Privacy Pages",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: copywriting
- Purpose: Legal page content

VARIABLES TO FILL:
- SERVICE, DATA_PRACTICES, RIGHTS, COMPLIANCE, CONTACT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete terms and privacy pages ready for use.`,
    description: "Legal page content",
    category: "content-creation",
    subcategory: "copywriting",
    tags: ["content creation", "copywriting", "Professional"],
    useCase: "Create terms and privacy pages for professional use",
    variables: ['SERVICE', 'DATA_PRACTICES', 'RIGHTS', 'COMPLIANCE', 'CONTACT'],
  },
  {
    id: "content-resume-cover",
    title: "Resume and Cover Letter",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: copywriting
- Purpose: Job application materials

VARIABLES TO FILL:
- CANDIDATE, POSITION, EXPERIENCE, SKILLS, COMPANY

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete resume and cover letter ready for use.`,
    description: "Job application materials",
    category: "content-creation",
    subcategory: "copywriting",
    tags: ["content creation", "copywriting", "Professional"],
    useCase: "Create resume and cover letter for professional use",
    variables: ['CANDIDATE', 'POSITION', 'EXPERIENCE', 'SKILLS', 'COMPANY'],
  },
  {
    id: "content-speech-writing",
    title: "Speech Writing",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: script
- Purpose: Public speaking scripts

VARIABLES TO FILL:
- OCCASION, LENGTH, AUDIENCE, KEY_POINTS, TONE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete speech writing ready for use.`,
    description: "Public speaking scripts",
    category: "content-creation",
    subcategory: "script",
    tags: ["content creation", "script", "Professional"],
    useCase: "Create speech writing for professional use",
    variables: ['OCCASION', 'LENGTH', 'AUDIENCE', 'KEY_POINTS', 'TONE'],
  },
  {
    id: "content-mission-statement",
    title: "Mission Statement",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: copywriting
- Purpose: Company mission and values

VARIABLES TO FILL:
- BRAND, VISION, VALUES, AUDIENCE, DIFFERENTIATOR

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete mission statement ready for use.`,
    description: "Company mission and values",
    category: "content-creation",
    subcategory: "copywriting",
    tags: ["content creation", "copywriting", "Professional"],
    useCase: "Create mission statement for professional use",
    variables: ['BRAND', 'VISION', 'VALUES', 'AUDIENCE', 'DIFFERENTIATOR'],
  },
  {
    id: "content-tagline-generator",
    title: "Tagline Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: copywriting
- Purpose: Brand tagline creation

VARIABLES TO FILL:
- BRAND, PRODUCT, AUDIENCE, UNIQUE, TONE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete tagline generator ready for use.`,
    description: "Brand tagline creation",
    category: "content-creation",
    subcategory: "copywriting",
    tags: ["content creation", "copywriting", "Professional"],
    useCase: "Create tagline generator for professional use",
    variables: ['BRAND', 'PRODUCT', 'AUDIENCE', 'UNIQUE', 'TONE'],
  },
  {
    id: "content-slogan-generator",
    title: "Slogan Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for content creation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: content-creation
- Subcategory: copywriting
- Purpose: Marketing slogan options

VARIABLES TO FILL:
- BRAND, MESSAGE, AUDIENCE, LENGTH, STYLE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete slogan generator ready for use.`,
    description: "Marketing slogan options",
    category: "content-creation",
    subcategory: "copywriting",
    tags: ["content creation", "copywriting", "Professional"],
    useCase: "Create slogan generator for professional use",
    variables: ['BRAND', 'MESSAGE', 'AUDIENCE', 'LENGTH', 'STYLE'],
  },
  {
    id: "email-subject-line",
    title: "Subject Line Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: cold-email
- Purpose: High-open email subjects

VARIABLES TO FILL:
- PURPOSE, AUDIENCE, OFFER, URGENCY, LENGTH

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete subject line generator ready for use.`,
    description: "High-open email subjects",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["email marketing", "cold-email", "Professional"],
    useCase: "Create subject line generator for professional use",
    variables: ['PURPOSE', 'AUDIENCE', 'OFFER', 'URGENCY', 'LENGTH'],
  },
  {
    id: "email-preview-text",
    title: "Preview Text Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: cold-email
- Purpose: Email preview/p snippet

VARIABLES TO FILL:
- EMAIL_TOPIC, KEY_MESSAGE, LENGTH, FORMAT, CTA

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete preview text generator ready for use.`,
    description: "Email preview/p snippet",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["email marketing", "cold-email", "Professional"],
    useCase: "Create preview text generator for professional use",
    variables: ['EMAIL_TOPIC', 'KEY_MESSAGE', 'LENGTH', 'FORMAT', 'CTA'],
  },
  {
    id: "email-body-copy",
    title: "Email Body Copy",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: cold-email
- Purpose: Persuasive email content

VARIABLES TO FILL:
- PURPOSE, AUDIENCE, TONE, OFFER, CTA

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete email body copy ready for use.`,
    description: "Persuasive email content",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["email marketing", "cold-email", "Professional"],
    useCase: "Create email body copy for professional use",
    variables: ['PURPOSE', 'AUDIENCE', 'TONE', 'OFFER', 'CTA'],
  },
  {
    id: "email-cta-button",
    title: "CTA Button Copy",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: cold-email
- Purpose: Email call-to-action text

VARIABLES TO FILL:
- ACTION, FORMAT, URGENCY, PLACEMENT, DESIGN

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete cta button copy ready for use.`,
    description: "Email call-to-action text",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["email marketing", "cold-email", "Professional"],
    useCase: "Create cta button copy for professional use",
    variables: ['ACTION', 'FORMAT', 'URGENCY', 'PLACEMENT', 'DESIGN'],
  },
  {
    id: "email-signature-generator",
    title: "Email Signature Generator",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: cold-email
- Purpose: Professional email sigs

VARIABLES TO FILL:
- NAME, TITLE, BRAND, LINKS, PHOTO

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete email signature generator ready for use.`,
    description: "Professional email sigs",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["email marketing", "cold-email", "Professional"],
    useCase: "Create email signature generator for professional use",
    variables: ['NAME', 'TITLE', 'BRAND', 'LINKS', 'PHOTO'],
  },
  {
    id: "email-segment-strategy",
    title: "Email Segmentation Plan",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: cold-email
- Purpose: Audience segmentation

VARIABLES TO FILL:
- AUDIENCE, SEGMENTS, CRITERIA, MESSAGES, TRIGGERS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete email segmentation plan ready for use.`,
    description: "Audience segmentation",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["email marketing", "cold-email", "Professional"],
    useCase: "Create email segmentation plan for professional use",
    variables: ['AUDIENCE', 'SEGMENTS', 'CRITERIA', 'MESSAGES', 'TRIGGERS'],
  },
  {
    id: "email-trigger-campaign",
    title: "Trigger Email Campaigns",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: retention
- Purpose: Automated trigger emails

VARIABLES TO FILL:
- TRIGGER, SEGMENT, MESSAGE, TIMING, GOAL

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete trigger email campaigns ready for use.`,
    description: "Automated trigger emails",
    category: "email-marketing",
    subcategory: "retention",
    tags: ["email marketing", "retention", "Professional"],
    useCase: "Create trigger email campaigns for professional use",
    variables: ['TRIGGER', 'SEGMENT', 'MESSAGE', 'TIMING', 'GOAL'],
  },
  {
    id: "email-birthday-campaign",
    title: "Birthday Email Campaign",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: retention
- Purpose: Birthday celebration emails

VARIABLES TO FILL:
- CUSTOMER, OFFER, TONE, TIMING, UPSELL

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete birthday email campaign ready for use.`,
    description: "Birthday celebration emails",
    category: "email-marketing",
    subcategory: "retention",
    tags: ["email marketing", "retention", "Professional"],
    useCase: "Create birthday email campaign for professional use",
    variables: ['CUSTOMER', 'OFFER', 'TONE', 'TIMING', 'UPSELL'],
  },
  {
    id: "email-reengagement-campaign",
    title: "Reengagement Email Sequence",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: retention
- Purpose: Win back inactive subscribers

VARIABLES TO FILL:
- SEGMENT, REASON, OFFER, SUBJECTS, TIMING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete reengagement email sequence ready for use.`,
    description: "Win back inactive subscribers",
    category: "email-marketing",
    subcategory: "retention",
    tags: ["email marketing", "retention", "Professional"],
    useCase: "Create reengagement email sequence for professional use",
    variables: ['SEGMENT', 'REASON', 'OFFER', 'SUBJECTS', 'TIMING'],
  },
  {
    id: "email-annual-campaign",
    title: "Annual Email Strategy",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: cold-email
- Purpose: Yearly email calendar

VARIABLES TO FILL:
- BUSINESS, GOALS, SEASONS, CAMPAIGNS, FREQUENCY

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete annual email strategy ready for use.`,
    description: "Yearly email calendar",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["email marketing", "cold-email", "Professional"],
    useCase: "Create annual email strategy for professional use",
    variables: ['BUSINESS', 'GOALS', 'SEASONS', 'CAMPAIGNS', 'FREQUENCY'],
  },
  {
    id: "email-spam-check",
    title: "Spam Score Analysis",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: cold-email
- Purpose: Avoid spam filters

VARIABLES TO FILL:
- EMAIL_CONTENT, SUBJECT, LINKS, IMAGES, COMPLIANCE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete spam score analysis ready for use.`,
    description: "Avoid spam filters",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["email marketing", "cold-email", "Professional"],
    useCase: "Create spam score analysis for professional use",
    variables: ['EMAIL_CONTENT', 'SUBJECT', 'LINKS', 'IMAGES', 'COMPLIANCE'],
  },
  {
    id: "email-a-b-subject",
    title: "A/B Subject Line Test",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: cold-email
- Purpose: Test multiple subjects

VARIABLES TO FILL:
- CONTROL, CHALLENGER, HYPOTHESIS, SAMPLE_SIZE, METRIC

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete a/b subject line test ready for use.`,
    description: "Test multiple subjects",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["email marketing", "cold-email", "Professional"],
    useCase: "Create a/b subject line test for professional use",
    variables: ['CONTROL', 'CHALLENGER', 'HYPOTHESIS', 'SAMPLE_SIZE', 'METRIC'],
  },
  {
    id: "email-frequency-optim",
    title: "Email Frequency Optimization",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: retention
- Purpose: Find optimal send frequency

VARIABLES TO FILL:
- AUDIENCE, CURRENT_FREQ, GOAL, TESTING, REDUCTION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete email frequency optimization ready for use.`,
    description: "Find optimal send frequency",
    category: "email-marketing",
    subcategory: "retention",
    tags: ["email marketing", "retention", "Professional"],
    useCase: "Create email frequency optimization for professional use",
    variables: ['AUDIENCE', 'CURRENT_FREQ', 'GOAL', 'TESTING', 'REDUCTION'],
  },
  {
    id: "email-drip-nurture",
    title: "Drip Nurture Sequence",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: cold-email
- Purpose: Educational drip campaigns

VARIABLES TO FILL:
- TOPIC, AUDIENCE, EMAILS, TIMING, GOAL

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete drip nurture sequence ready for use.`,
    description: "Educational drip campaigns",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["email marketing", "cold-email", "Professional"],
    useCase: "Create drip nurture sequence for professional use",
    variables: ['TOPIC', 'AUDIENCE', 'EMAILS', 'TIMING', 'GOAL'],
  },
  {
    id: "email-rfm-analysis",
    title: "RFM Segmentation",
    prompt: `You are a professional prompt engineer. Create [TASK] for email marketing use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: email-marketing
- Subcategory: retention
- Purpose: Recency, Frequency, Monetary analysis

VARIABLES TO FILL:
- CUSTOMER_DATA, SEGMENTS, MESSAGES, CAMPAIGNS, GOALS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete rfm segmentation ready for use.`,
    description: "Recency, Frequency, Monetary analysis",
    category: "email-marketing",
    subcategory: "retention",
    tags: ["email marketing", "retention", "Professional"],
    useCase: "Create rfm segmentation for professional use",
    variables: ['CUSTOMER_DATA', 'SEGMENTS', 'MESSAGES', 'CAMPAIGNS', 'GOALS'],
  },
  {
    id: "ai-data-pipeline",
    title: "Data Pipeline Automation",
    prompt: `You are a professional prompt engineer. Create [TASK] for ai automation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ai-automation
- Subcategory: workflow
- Purpose: ETL workflow design

VARIABLES TO FILL:
- SOURCES, TRANSFORMATIONS, DESTINATION, SCHEDULE, MONITORING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete data pipeline automation ready for use.`,
    description: "ETL workflow design",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["ai automation", "workflow", "Professional"],
    useCase: "Create data pipeline automation for professional use",
    variables: ['SOURCES', 'TRANSFORMATIONS', 'DESTINATION', 'SCHEDULE', 'MONITORING'],
  },
  {
    id: "ai-report-automation",
    title: "Report Automation Setup",
    prompt: `You are a professional prompt engineer. Create [TASK] for ai automation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ai-automation
- Subcategory: workflow
- Purpose: Automated report generation

VARIABLES TO FILL:
- DATA_SOURCES, METRICS, FREQUENCY, FORMAT, RECIPIENTS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete report automation setup ready for use.`,
    description: "Automated report generation",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["ai automation", "workflow", "Professional"],
    useCase: "Create report automation setup for professional use",
    variables: ['DATA_SOURCES', 'METRICS', 'FREQUENCY', 'FORMAT', 'RECIPIENTS'],
  },
  {
    id: "ai-crm-sync",
    title: "CRM Data Sync Automation",
    prompt: `You are a professional prompt engineer. Create [TASK] for ai automation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ai-automation
- Subcategory: workflow
- Purpose: Cross-platform CRM sync

VARIABLES TO FILL:
- SOURCE_CRM, TARGET_SYSTEM, FIELDS, TRIGGERS, ERROR_HANDLING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete crm data sync automation ready for use.`,
    description: "Cross-platform CRM sync",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["ai automation", "workflow", "Professional"],
    useCase: "Create crm data sync automation for professional use",
    variables: ['SOURCE_CRM', 'TARGET_SYSTEM', 'FIELDS', 'TRIGGERS', 'ERROR_HANDLING'],
  },
  {
    id: "ai-approval-workflow",
    title: "Approval Workflow Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for ai automation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ai-automation
- Subcategory: workflow
- Purpose: Automated approval processes

VARIABLES TO FILL:
- REQUEST_TYPE, APPROVERS, CRITERIA, ESCALATION, NOTIFICATIONS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete approval workflow design ready for use.`,
    description: "Automated approval processes",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["ai automation", "workflow", "Professional"],
    useCase: "Create approval workflow design for professional use",
    variables: ['REQUEST_TYPE', 'APPROVERS', 'CRITERIA', 'ESCALATION', 'NOTIFICATIONS'],
  },
  {
    id: "ai-invoice-processing",
    title: "Invoice Processing Automation",
    prompt: `You are a professional prompt engineer. Create [TASK] for ai automation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ai-automation
- Subcategory: workflow
- Purpose: AP automation workflow

VARIABLES TO FILL:
- INVOICE_FORMAT, EXTRACT_FIELDS, APPROVAL, ERP_SYNC, ARCHIVE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete invoice processing automation ready for use.`,
    description: "AP automation workflow",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["ai automation", "workflow", "Professional"],
    useCase: "Create invoice processing automation for professional use",
    variables: ['INVOICE_FORMAT', 'EXTRACT_FIELDS', 'APPROVAL', 'ERP_SYNC', 'ARCHIVE'],
  },
  {
    id: "ai-document-indexing",
    title: "Document Indexing System",
    prompt: `You are a professional prompt engineer. Create [TASK] for ai automation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ai-automation
- Subcategory: workflow
- Purpose: AI document organization

VARIABLES TO FILL:
- DOCUMENT_TYPES, METADATA, SEARCH, TAGS, RETENTION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete document indexing system ready for use.`,
    description: "AI document organization",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["ai automation", "workflow", "Professional"],
    useCase: "Create document indexing system for professional use",
    variables: ['DOCUMENT_TYPES', 'METADATA', 'SEARCH', 'TAGS', 'RETENTION'],
  },
  {
    id: "ai-translation-workflow",
    title: "Translation Workflow",
    prompt: `You are a professional prompt engineer. Create [TASK] for ai automation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ai-automation
- Subcategory: workflow
- Purpose: Multi-language content pipeline

VARIABLES TO FILL:
- SOURCE_LANG, TARGET_LANGS, CONTENT_TYPE, QUALITY_CHECK, PUBLICATION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete translation workflow ready for use.`,
    description: "Multi-language content pipeline",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["ai automation", "workflow", "Professional"],
    useCase: "Create translation workflow for professional use",
    variables: ['SOURCE_LANG', 'TARGET_LANGS', 'CONTENT_TYPE', 'QUALITY_CHECK', 'PUBLICATION'],
  },
  {
    id: "ai-social-scheduling",
    title: "Social Media Scheduling",
    prompt: `You are a professional prompt engineer. Create [TASK] for ai automation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ai-automation
- Subcategory: workflow
- Purpose: Content calendar automation

VARIABLES TO FILL:
- PLATFORMS, CONTENT_TYPES, FREQUENCY, APPROVAL, ANALYTICS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete social media scheduling ready for use.`,
    description: "Content calendar automation",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["ai automation", "workflow", "Professional"],
    useCase: "Create social media scheduling for professional use",
    variables: ['PLATFORMS', 'CONTENT_TYPES', 'FREQUENCY', 'APPROVAL', 'ANALYTICS'],
  },
  {
    id: "ai-lead-scoring",
    title: "Lead Scoring Model",
    prompt: `You are a professional prompt engineer. Create [TASK] for ai automation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ai-automation
- Subcategory: workflow
- Purpose: AI-powered lead qualification

VARIABLES TO FILL:
- DATA_POINTS, WEIGHTS, THRESHOLDS, CRM_INTEGRATION, REVIEW_CYCLE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete lead scoring model ready for use.`,
    description: "AI-powered lead qualification",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["ai automation", "workflow", "Professional"],
    useCase: "Create lead scoring model for professional use",
    variables: ['DATA_POINTS', 'WEIGHTS', 'THRESHOLDS', 'CRM_INTEGRATION', 'REVIEW_CYCLE'],
  },
  {
    id: "ai-anomaly-detection",
    title: "Anomaly Detection Alert",
    prompt: `You are a professional prompt engineer. Create [TASK] for ai automation use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: ai-automation
- Subcategory: workflow
- Purpose: Unusual pattern alerts

VARIABLES TO FILL:
- METRIC, BASELINE, THRESHOLD, ALERT_CHANNEL, ACTION

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete anomaly detection alert ready for use.`,
    description: "Unusual pattern alerts",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["ai automation", "workflow", "Professional"],
    useCase: "Create anomaly detection alert for professional use",
    variables: ['METRIC', 'BASELINE', 'THRESHOLD', 'ALERT_CHANNEL', 'ACTION'],
  },
  {
    id: "business-swot-analysis",
    title: "SWOT Analysis",
    prompt: `You are a professional prompt engineer. Create [TASK] for business strategy use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: business-strategy
- Subcategory: analysis
- Purpose: Strategic SWOT analysis

VARIABLES TO FILL:
- COMPANY, INDUSTRY, COMPETITORS, STRENGTHS, WEAKNESSES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete swot analysis ready for use.`,
    description: "Strategic SWOT analysis",
    category: "business-strategy",
    subcategory: "analysis",
    tags: ["business strategy", "analysis", "Professional"],
    useCase: "Create swot analysis for professional use",
    variables: ['COMPANY', 'INDUSTRY', 'COMPETITORS', 'STRENGTHS', 'WEAKNESSES'],
  },
  {
    id: "business-go-to-market",
    title: "Go-to-Market Strategy",
    prompt: `You are a professional prompt engineer. Create [TASK] for business strategy use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: business-strategy
- Subcategory: growth
- Purpose: Product launch strategy

VARIABLES TO FILL:
- PRODUCT, TARGET_MARKET, POSITIONING, CHANNELS, GOALS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete go-to-market strategy ready for use.`,
    description: "Product launch strategy",
    category: "business-strategy",
    subcategory: "growth",
    tags: ["business strategy", "growth", "Professional"],
    useCase: "Create go-to-market strategy for professional use",
    variables: ['PRODUCT', 'TARGET_MARKET', 'POSITIONING', 'CHANNELS', 'GOALS'],
  },
  {
    id: "business-pricing-strategy",
    title: "Pricing Strategy",
    prompt: `You are a professional prompt engineer. Create [TASK] for business strategy use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: business-strategy
- Subcategory: growth
- Purpose: Product pricing framework

VARIABLES TO FILL:
- PRODUCT, COST, COMPETITION, VALUE, GOAL

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete pricing strategy ready for use.`,
    description: "Product pricing framework",
    category: "business-strategy",
    subcategory: "growth",
    tags: ["business strategy", "growth", "Professional"],
    useCase: "Create pricing strategy for professional use",
    variables: ['PRODUCT', 'COST', 'COMPETITION', 'VALUE', 'GOAL'],
  },
  {
    id: "business-launch-checklist",
    title: "Product Launch Checklist",
    prompt: `You are a professional prompt engineer. Create [TASK] for business strategy use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: business-strategy
- Subcategory: growth
- Purpose: Launch readiness checklist

VARIABLES TO FILL:
- LAUNCH_DATE, TEAMS, TASKS, REVIEW, GO_LIVE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete product launch checklist ready for use.`,
    description: "Launch readiness checklist",
    category: "business-strategy",
    subcategory: "growth",
    tags: ["business strategy", "growth", "Professional"],
    useCase: "Create product launch checklist for professional use",
    variables: ['LAUNCH_DATE', 'TEAMS', 'TASKS', 'REVIEW', 'GO_LIVE'],
  },
  {
    id: "business-okr-set",
    title: "OKR Planning",
    prompt: `You are a professional prompt engineer. Create [TASK] for business strategy use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: business-strategy
- Subcategory: growth
- Purpose: Objectives and key results

VARIABLES TO FILL:
- QUARTER, TEAM, OBJECTIVES, KEY_RESULTS, TRACKING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete okr planning ready for use.`,
    description: "Objectives and key results",
    category: "business-strategy",
    subcategory: "growth",
    tags: ["business strategy", "growth", "Professional"],
    useCase: "Create okr planning for professional use",
    variables: ['QUARTER', 'TEAM', 'OBJECTIVES', 'KEY_RESULTS', 'TRACKING'],
  },
  {
    id: "business-stakeholder-memo",
    title: "Stakeholder Update Memo",
    prompt: `You are a professional prompt engineer. Create [TASK] for business strategy use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: business-strategy
- Subcategory: analysis
- Purpose: Regular stakeholder communications

VARIABLES TO FILL:
- PROJECT, PERIOD, HIGHLIGHTS, BLOCKERS, NEXT_STEPS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete stakeholder update memo ready for use.`,
    description: "Regular stakeholder communications",
    category: "business-strategy",
    subcategory: "analysis",
    tags: ["business strategy", "analysis", "Professional"],
    useCase: "Create stakeholder update memo for professional use",
    variables: ['PROJECT', 'PERIOD', 'HIGHLIGHTS', 'BLOCKERS', 'NEXT_STEPS'],
  },
  {
    id: "business-strategic-plan",
    title: "Strategic Planning Document",
    prompt: `You are a professional prompt engineer. Create [TASK] for business strategy use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: business-strategy
- Subcategory: growth
- Purpose: Multi-year strategic plan

VARIABLES TO FILL:
- COMPANY, VISION, GOALS, INITIATIVES, TIMELINE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete strategic planning document ready for use.`,
    description: "Multi-year strategic plan",
    category: "business-strategy",
    subcategory: "growth",
    tags: ["business strategy", "growth", "Professional"],
    useCase: "Create strategic planning document for professional use",
    variables: ['COMPANY', 'VISION', 'GOALS', 'INITIATIVES', 'TIMELINE'],
  },
  {
    id: "business-partner-intro",
    title: "Partnership Introduction Email",
    prompt: `You are a professional prompt engineer. Create [TASK] for business strategy use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: business-strategy
- Subcategory: pitch
- Purpose: Initial partner outreach

VARIABLES TO FILL:
- PARTNER, COMPANY, PROPOSAL, BENEFITS, ASK

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete partnership introduction email ready for use.`,
    description: "Initial partner outreach",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["business strategy", "pitch", "Professional"],
    useCase: "Create partnership introduction email for professional use",
    variables: ['PARTNER', 'COMPANY', 'PROPOSAL', 'BENEFITS', 'ASK'],
  },
  {
    id: "business-board-presentation",
    title: "Board Presentation",
    prompt: `You are a professional prompt engineer. Create [TASK] for business strategy use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: business-strategy
- Subcategory: analysis
- Purpose: Investor board materials

VARIABLES TO FILL:
- COMPANY, PERIOD, METRICS, REQUESTS, UPDATES

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete board presentation ready for use.`,
    description: "Investor board materials",
    category: "business-strategy",
    subcategory: "analysis",
    tags: ["business strategy", "analysis", "Professional"],
    useCase: "Create board presentation for professional use",
    variables: ['COMPANY', 'PERIOD', 'METRICS', 'REQUESTS', 'UPDATES'],
  },
  {
    id: "business-crisis-budget",
    title: "Crisis Budget Plan",
    prompt: `You are a professional prompt engineer. Create [TASK] for business strategy use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: business-strategy
- Subcategory: growth
- Purpose: Financial contingency planning

VARIABLES TO FILL:
- SCENARIO, CURRENT_BURN, SAVINGS, RUNWAY, TRIGGERS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete crisis budget plan ready for use.`,
    description: "Financial contingency planning",
    category: "business-strategy",
    subcategory: "growth",
    tags: ["business strategy", "growth", "Professional"],
    useCase: "Create crisis budget plan for professional use",
    variables: ['SCENARIO', 'CURRENT_BURN', 'SAVINGS', 'RUNWAY', 'TRIGGERS'],
  },
  {
    id: "design-figma-components",
    title: "Figma Component Specs",
    prompt: `You are a professional prompt engineer. Create [TASK] for designer creator use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: designer-creator
- Subcategory: brand-kit
- Purpose: Design system components

VARIABLES TO FILL:
- COMPONENT_NAME, VARIANTS, STATES, PROPS, DOCS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete figma component specs ready for use.`,
    description: "Design system components",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["designer creator", "brand-kit", "Professional"],
    useCase: "Create figma component specs for professional use",
    variables: ['COMPONENT_NAME', 'VARIANTS', 'STATES', 'PROPS', 'DOCS'],
  },
  {
    id: "design-style-tiles",
    title: "Style Tile Creation",
    prompt: `You are a professional prompt engineer. Create [TASK] for designer creator use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: designer-creator
- Subcategory: brand-kit
- Purpose: Visual design direction

VARIABLES TO FILL:
- BRAND, MOOD, COLORS, TYPOGRAPHY, ELEMENTS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete style tile creation ready for use.`,
    description: "Visual design direction",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["designer creator", "brand-kit", "Professional"],
    useCase: "Create style tile creation for professional use",
    variables: ['BRAND', 'MOOD', 'COLORS', 'TYPOGRAPHY', 'ELEMENTS'],
  },
  {
    id: "design-motion-specs",
    title: "Motion Design Specs",
    prompt: `You are a professional prompt engineer. Create [TASK] for designer creator use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: designer-creator
- Subcategory: brand-kit
- Purpose: Animation guidelines

VARIABLES TO FILL:
- ELEMENT, ANIMATION, DURATION, EASING, TRIGGER

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete motion design specs ready for use.`,
    description: "Animation guidelines",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["designer creator", "brand-kit", "Professional"],
    useCase: "Create motion design specs for professional use",
    variables: ['ELEMENT', 'ANIMATION', 'DURATION', 'EASING', 'TRIGGER'],
  },
  {
    id: "design-icon-set",
    title: "Icon Set Specification",
    prompt: `You are a professional prompt engineer. Create [TASK] for designer creator use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: designer-creator
- Subcategory: brand-kit
- Purpose: Custom icon library

VARIABLES TO FILL:
- STYLE, SIZE, STROKE, NAMING, USAGE

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete icon set specification ready for use.`,
    description: "Custom icon library",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["designer creator", "brand-kit", "Professional"],
    useCase: "Create icon set specification for professional use",
    variables: ['STYLE', 'SIZE', 'STROKE', 'NAMING', 'USAGE'],
  },
  {
    id: "design-responsive-breakpoints",
    title: "Responsive Breakpoints",
    prompt: `You are a professional prompt engineer. Create [TASK] for designer creator use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: designer-creator
- Subcategory: brand-kit
- Purpose: Responsive design specs

VARIABLES TO FILL:
- DEVICES, BREAKPOINTS, LAYOUTS, HYDRATION, TESTING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete responsive breakpoints ready for use.`,
    description: "Responsive design specs",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["designer creator", "brand-kit", "Professional"],
    useCase: "Create responsive breakpoints for professional use",
    variables: ['DEVICES', 'BREAKPOINTS', 'LAYOUTS', 'HYDRATION', 'TESTING'],
  },
  {
    id: "design-animation-lottie",
    title: "Lottie Animation Spec",
    prompt: `You are a professional prompt engineer. Create [TASK] for designer creator use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: designer-creator
- Subcategory: brand-kit
- Purpose: Lottie file requirements

VARIABLES TO FILL:
- ANIMATION, LENGTH, LOOPS, COLORS, TRIGGERS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete lottie animation spec ready for use.`,
    description: "Lottie file requirements",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["designer creator", "brand-kit", "Professional"],
    useCase: "Create lottie animation spec for professional use",
    variables: ['ANIMATION', 'LENGTH', 'LOOPS', 'COLORS', 'TRIGGERS'],
  },
  {
    id: "design-dark-mode",
    title: "Dark Mode Design",
    prompt: `You are a professional prompt engineer. Create [TASK] for designer creator use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: designer-creator
- Subcategory: brand-kit
- Purpose: Dark theme specifications

VARIABLES TO FILL:
- LIGHT_COLORS, DARK_PALETTE, CONTRAST, COMPONENTS, TESTING

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete dark mode design ready for use.`,
    description: "Dark theme specifications",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["designer creator", "brand-kit", "Professional"],
    useCase: "Create dark mode design for professional use",
    variables: ['LIGHT_COLORS', 'DARK_PALETTE', 'CONTRAST', 'COMPONENTS', 'TESTING'],
  },
  {
    id: "design-accessibility-audit",
    title: "Accessibility Audit Spec",
    prompt: `You are a professional prompt engineer. Create [TASK] for designer creator use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: designer-creator
- Subcategory: brand-kit
- Purpose: WCAG compliance checklist

VARIABLES TO FILL:
- STANDARD, PRIORITY, COMPONENTS, TOOLS, REVIEW

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete accessibility audit spec ready for use.`,
    description: "WCAG compliance checklist",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["designer creator", "brand-kit", "Professional"],
    useCase: "Create accessibility audit spec for professional use",
    variables: ['STANDARD', 'PRIORITY', 'COMPONENTS', 'TOOLS', 'REVIEW'],
  },
  {
    id: "design-usability-testing",
    title: "Usability Test Plan",
    prompt: `You are a professional prompt engineer. Create [TASK] for designer creator use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: designer-creator
- Subcategory: brand-kit
- Purpose: UX testing protocols

VARIABLES TO FILL:
- PRODUCT, TASKS, PARTICIPANTS, METRICS, REPORT

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete usability test plan ready for use.`,
    description: "UX testing protocols",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["designer creator", "brand-kit", "Professional"],
    useCase: "Create usability test plan for professional use",
    variables: ['PRODUCT', 'TASKS', 'PARTICIPANTS', 'METRICS', 'REPORT'],
  },
  {
    id: "design-portfolio-case",
    title: "Portfolio Case Study",
    prompt: `You are a professional prompt engineer. Create [TASK] for designer creator use case.

TASK: [DESCRIBE_THE_TASK]

CONTEXT:
- Category: designer-creator
- Subcategory: presentation
- Purpose: Design project showcase

VARIABLES TO FILL:
- PROJECT, CHALLENGE, PROCESS, SOLUTION, RESULTS

REQUIREMENTS:
- Professional, actionable output
- Include examples where helpful
- Structure for easy customization
- Match industry best practices

FORMAT: Return complete portfolio case study ready for use.`,
    description: "Design project showcase",
    category: "designer-creator",
    subcategory: "presentation",
    tags: ["designer creator", "presentation", "Professional"],
    useCase: "Create portfolio case study for professional use",
    variables: ['PROJECT', 'CHALLENGE', 'PROCESS', 'SOLUTION', 'RESULTS'],
  },,
  {
    id: "seo-extra-1",
    title: "SEO 1 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #1",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-2",
    title: "SEO 2 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #2",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-3",
    title: "SEO 3 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #3",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-4",
    title: "SEO 4 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #4",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-5",
    title: "SEO 5 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #5",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-6",
    title: "SEO 6 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #6",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-7",
    title: "SEO 7 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #7",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-8",
    title: "SEO 8 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #8",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-9",
    title: "SEO 9 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #9",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-10",
    title: "SEO 10 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #10",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-11",
    title: "SEO 11 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #11",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-12",
    title: "SEO 12 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #12",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-13",
    title: "SEO 13 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #13",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-14",
    title: "SEO 14 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #14",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-15",
    title: "SEO 15 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #15",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-16",
    title: "SEO 16 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #16",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-17",
    title: "SEO 17 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #17",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-18",
    title: "SEO 18 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #18",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-19",
    title: "SEO 19 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #19",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-20",
    title: "SEO 20 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #20",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-21",
    title: "SEO 21 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #21",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-22",
    title: "SEO 22 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #22",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-23",
    title: "SEO 23 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #23",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-24",
    title: "SEO 24 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #24",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-25",
    title: "SEO 25 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #25",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-26",
    title: "SEO 26 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #26",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-27",
    title: "SEO 27 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #27",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-28",
    title: "SEO 28 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #28",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-29",
    title: "SEO 29 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #29",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "seo-extra-30",
    title: "SEO 30 Extra Prompt",
    prompt: "Create a specialized SEO prompt for [TOPIC] focusing on [FOCUS]. Include target keywords, content structure, and optimization tips.",
    description: "Additional SEO prompt #30",
    category: "seo",
    subcategory: "blog-seo",
    tags: ["SEO", "Optimization", "Content"],
    useCase: "Create SEO content for [TOPIC]",
    variables: ["TOPIC", "FOCUS"],
  },
  {
    id: "social-extra-1",
    title: "Social Media 1 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #1",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-2",
    title: "Social Media 2 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #2",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-3",
    title: "Social Media 3 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #3",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-4",
    title: "Social Media 4 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #4",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-5",
    title: "Social Media 5 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #5",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-6",
    title: "Social Media 6 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #6",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-7",
    title: "Social Media 7 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #7",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-8",
    title: "Social Media 8 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #8",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-9",
    title: "Social Media 9 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #9",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-10",
    title: "Social Media 10 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #10",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-11",
    title: "Social Media 11 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #11",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-12",
    title: "Social Media 12 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #12",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-13",
    title: "Social Media 13 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #13",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-14",
    title: "Social Media 14 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #14",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-15",
    title: "Social Media 15 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #15",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-16",
    title: "Social Media 16 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #16",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-17",
    title: "Social Media 17 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #17",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-18",
    title: "Social Media 18 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #18",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-19",
    title: "Social Media 19 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #19",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-20",
    title: "Social Media 20 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #20",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-21",
    title: "Social Media 21 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #21",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-22",
    title: "Social Media 22 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #22",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-23",
    title: "Social Media 23 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #23",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-24",
    title: "Social Media 24 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #24",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-25",
    title: "Social Media 25 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #25",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-26",
    title: "Social Media 26 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #26",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-27",
    title: "Social Media 27 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #27",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-28",
    title: "Social Media 28 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #28",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-29",
    title: "Social Media 29 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #29",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-30",
    title: "Social Media 30 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #30",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-31",
    title: "Social Media 31 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #31",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-32",
    title: "Social Media 32 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #32",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-33",
    title: "Social Media 33 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #33",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-34",
    title: "Social Media 34 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #34",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "social-extra-35",
    title: "Social Media 35 Prompt",
    prompt: "Create a social media post/campaign for [TOPIC] on [PLATFORM]. Include hooks, copy, hashtags, and engagement tips.",
    description: "Additional social media prompt #35",
    category: "social-media",
    subcategory: "instagram",
    tags: ["Social Media", "Content", "Engagement"],
    useCase: "Create [PLATFORM] content for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "content-extra-1",
    title: "Content 1 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #1",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-2",
    title: "Content 2 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #2",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-3",
    title: "Content 3 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #3",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-4",
    title: "Content 4 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #4",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-5",
    title: "Content 5 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #5",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-6",
    title: "Content 6 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #6",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-7",
    title: "Content 7 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #7",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-8",
    title: "Content 8 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #8",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-9",
    title: "Content 9 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #9",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-10",
    title: "Content 10 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #10",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-11",
    title: "Content 11 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #11",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-12",
    title: "Content 12 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #12",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-13",
    title: "Content 13 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #13",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-14",
    title: "Content 14 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #14",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-15",
    title: "Content 15 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #15",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-16",
    title: "Content 16 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #16",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-17",
    title: "Content 17 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #17",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-18",
    title: "Content 18 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #18",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-19",
    title: "Content 19 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #19",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-20",
    title: "Content 20 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #20",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-21",
    title: "Content 21 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #21",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-22",
    title: "Content 22 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #22",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-23",
    title: "Content 23 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #23",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-24",
    title: "Content 24 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #24",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-25",
    title: "Content 25 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #25",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-26",
    title: "Content 26 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #26",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-27",
    title: "Content 27 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #27",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-28",
    title: "Content 28 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #28",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-29",
    title: "Content 29 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #29",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "content-extra-30",
    title: "Content 30 Generator",
    prompt: "Create [CONTENT_TYPE] for [TOPIC]. Include structure, key points, examples, and calls-to-action.",
    description: "Additional content prompt #30",
    category: "content-creation",
    subcategory: "blog",
    tags: ["Content", "Writing", "Creation"],
    useCase: "Create [CONTENT_TYPE] about [TOPIC]",
    variables: ["CONTENT_TYPE", "TOPIC"],
  },
  {
    id: "email-extra-1",
    title: "Email 1 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #1",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-2",
    title: "Email 2 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #2",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-3",
    title: "Email 3 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #3",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-4",
    title: "Email 4 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #4",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-5",
    title: "Email 5 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #5",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-6",
    title: "Email 6 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #6",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-7",
    title: "Email 7 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #7",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-8",
    title: "Email 8 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #8",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-9",
    title: "Email 9 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #9",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-10",
    title: "Email 10 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #10",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-11",
    title: "Email 11 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #11",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-12",
    title: "Email 12 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #12",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-13",
    title: "Email 13 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #13",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-14",
    title: "Email 14 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #14",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-15",
    title: "Email 15 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #15",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-16",
    title: "Email 16 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #16",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-17",
    title: "Email 17 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #17",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-18",
    title: "Email 18 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #18",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-19",
    title: "Email 19 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #19",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-20",
    title: "Email 20 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #20",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-21",
    title: "Email 21 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #21",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-22",
    title: "Email 22 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #22",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-23",
    title: "Email 23 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #23",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-24",
    title: "Email 24 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #24",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "email-extra-25",
    title: "Email 25 Campaign",
    prompt: "Create email [EMAIL_TYPE] for [AUDIENCE] about [TOPIC]. Include subject, body, and CTA.",
    description: "Additional email prompt #25",
    category: "email-marketing",
    subcategory: "cold-email",
    tags: ["Email", "Marketing", "Copy"],
    useCase: "Create email campaign for [TOPIC]",
    variables: ["EMAIL_TYPE", "AUDIENCE", "TOPIC"],
  },
  {
    id: "design-extra-1",
    title: "Design 1 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #1",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-2",
    title: "Design 2 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #2",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-3",
    title: "Design 3 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #3",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-4",
    title: "Design 4 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #4",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-5",
    title: "Design 5 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #5",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-6",
    title: "Design 6 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #6",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-7",
    title: "Design 7 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #7",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-8",
    title: "Design 8 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #8",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-9",
    title: "Design 9 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #9",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-10",
    title: "Design 10 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #10",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-11",
    title: "Design 11 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #11",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-12",
    title: "Design 12 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #12",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-13",
    title: "Design 13 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #13",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-14",
    title: "Design 14 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #14",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-15",
    title: "Design 15 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #15",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-16",
    title: "Design 16 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #16",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-17",
    title: "Design 17 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #17",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-18",
    title: "Design 18 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #18",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-19",
    title: "Design 19 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #19",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "design-extra-20",
    title: "Design 20 Brief",
    prompt: "Create [DESIGN_TYPE] design brief for [PROJECT]. Include specs, style, colors, and deliverables.",
    description: "Additional design prompt #20",
    category: "designer-creator",
    subcategory: "brand-kit",
    tags: ["Design", "Creative", "Specs"],
    useCase: "Create [DESIGN_TYPE] for [PROJECT]",
    variables: ["DESIGN_TYPE", "PROJECT"],
  },
  {
    id: "code-extra-1",
    title: "Coding 1 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #1",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-2",
    title: "Coding 2 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #2",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-3",
    title: "Coding 3 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #3",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-4",
    title: "Coding 4 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #4",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-5",
    title: "Coding 5 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #5",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-6",
    title: "Coding 6 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #6",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-7",
    title: "Coding 7 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #7",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-8",
    title: "Coding 8 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #8",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-9",
    title: "Coding 9 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #9",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-10",
    title: "Coding 10 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #10",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-11",
    title: "Coding 11 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #11",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-12",
    title: "Coding 12 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #12",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-13",
    title: "Coding 13 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #13",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-14",
    title: "Coding 14 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #14",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-15",
    title: "Coding 15 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #15",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-16",
    title: "Coding 16 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #16",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-17",
    title: "Coding 17 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #17",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-18",
    title: "Coding 18 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #18",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-19",
    title: "Coding 19 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #19",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-20",
    title: "Coding 20 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #20",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-21",
    title: "Coding 21 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #21",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-22",
    title: "Coding 22 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #22",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-23",
    title: "Coding 23 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #23",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-24",
    title: "Coding 24 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #24",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "code-extra-25",
    title: "Coding 25 Template",
    prompt: "Create [LANGUAGE] code for [TASK]. Include comments, error handling, and best practices.",
    description: "Additional coding prompt #25",
    category: "coding-tech",
    subcategory: "docs",
    tags: ["Coding", "Development", "Code"],
    useCase: "Write [LANGUAGE] code for [TASK]",
    variables: ["LANGUAGE", "TASK"],
  },
  {
    id: "business-extra-1",
    title: "Business 1 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #1",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-2",
    title: "Business 2 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #2",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-3",
    title: "Business 3 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #3",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-4",
    title: "Business 4 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #4",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-5",
    title: "Business 5 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #5",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-6",
    title: "Business 6 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #6",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-7",
    title: "Business 7 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #7",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-8",
    title: "Business 8 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #8",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-9",
    title: "Business 9 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #9",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-10",
    title: "Business 10 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #10",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-11",
    title: "Business 11 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #11",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-12",
    title: "Business 12 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #12",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-13",
    title: "Business 13 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #13",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-14",
    title: "Business 14 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #14",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-15",
    title: "Business 15 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #15",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-16",
    title: "Business 16 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #16",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-17",
    title: "Business 17 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #17",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-18",
    title: "Business 18 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #18",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-19",
    title: "Business 19 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #19",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-20",
    title: "Business 20 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #20",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-21",
    title: "Business 21 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #21",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-22",
    title: "Business 22 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #22",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-23",
    title: "Business 23 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #23",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-24",
    title: "Business 24 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #24",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "business-extra-25",
    title: "Business 25 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE]. Include structure, key sections, and action items.",
    description: "Additional business prompt #25",
    category: "business-strategy",
    subcategory: "pitch",
    tags: ["Business", "Strategy", "Planning"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE"],
  },
  {
    id: "ecom-extra-1",
    title: "E-commerce 1 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #1",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-2",
    title: "E-commerce 2 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #2",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-3",
    title: "E-commerce 3 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #3",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-4",
    title: "E-commerce 4 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #4",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-5",
    title: "E-commerce 5 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #5",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-6",
    title: "E-commerce 6 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #6",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-7",
    title: "E-commerce 7 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #7",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-8",
    title: "E-commerce 8 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #8",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-9",
    title: "E-commerce 9 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #9",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-10",
    title: "E-commerce 10 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #10",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-11",
    title: "E-commerce 11 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #11",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-12",
    title: "E-commerce 12 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #12",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-13",
    title: "E-commerce 13 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #13",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-14",
    title: "E-commerce 14 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #14",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-15",
    title: "E-commerce 15 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #15",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-16",
    title: "E-commerce 16 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #16",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-17",
    title: "E-commerce 17 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #17",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-18",
    title: "E-commerce 18 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #18",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-19",
    title: "E-commerce 19 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #19",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "ecom-extra-20",
    title: "E-commerce 20 Copy",
    prompt: "Create [COPY_TYPE] for [PRODUCT] on [PLATFORM]. Include benefits, features, and optimization.",
    description: "Additional ecommerce prompt #20",
    category: "ecommerce",
    subcategory: "product",
    tags: ["Ecommerce", "Product", "Copy"],
    useCase: "Create [COPY_TYPE] for [PRODUCT]",
    variables: ["COPY_TYPE", "PRODUCT", "PLATFORM"],
  },
  {
    id: "video-extra-1",
    title: "Video 1 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #1",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-2",
    title: "Video 2 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #2",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-3",
    title: "Video 3 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #3",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-4",
    title: "Video 4 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #4",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-5",
    title: "Video 5 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #5",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-6",
    title: "Video 6 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #6",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-7",
    title: "Video 7 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #7",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-8",
    title: "Video 8 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #8",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-9",
    title: "Video 9 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #9",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-10",
    title: "Video 10 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #10",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-11",
    title: "Video 11 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #11",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-12",
    title: "Video 12 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #12",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-13",
    title: "Video 13 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #13",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-14",
    title: "Video 14 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #14",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "video-extra-15",
    title: "Video 15 Script",
    prompt: "Create video script for [TOPIC] on [PLATFORM]. Include intro, content, and CTA.",
    description: "Additional video prompt #15",
    category: "video-podcast",
    subcategory: "youtube",
    tags: ["Video", "Script", "Content"],
    useCase: "Create video script for [TOPIC]",
    variables: ["TOPIC", "PLATFORM"],
  },
  {
    id: "ai-extra-1",
    title: "AI 1 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #1",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-2",
    title: "AI 2 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #2",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-3",
    title: "AI 3 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #3",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-4",
    title: "AI 4 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #4",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-5",
    title: "AI 5 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #5",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-6",
    title: "AI 6 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #6",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-7",
    title: "AI 7 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #7",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-8",
    title: "AI 8 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #8",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-9",
    title: "AI 9 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #9",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-10",
    title: "AI 10 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #10",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-11",
    title: "AI 11 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #11",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-12",
    title: "AI 12 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #12",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-13",
    title: "AI 13 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #13",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-14",
    title: "AI 14 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #14",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "ai-extra-15",
    title: "AI 15 Workflow",
    prompt: "Create automation workflow for [TASK] using [TOOL]. Include triggers, actions, and error handling.",
    description: "Additional AI prompt #15",
    category: "ai-automation",
    subcategory: "workflow",
    tags: ["AI", "Automation", "Workflow"],
    useCase: "Build [TOOL] automation for [TASK]",
    variables: ["TASK", "TOOL"],
  },
  {
    id: "local-extra-1",
    title: "Local 1 Marketing",
    prompt: "Create [CONTENT_TYPE] for [BUSINESS]. Include local SEO, community engagement, and promotions.",
    description: "Additional local business prompt #1",
    category: "local-business",
    subcategory: "local-content",
    tags: ["Local", "Marketing", "Community"],
    useCase: "Create [CONTENT_TYPE] for [BUSINESS]",
    variables: ["CONTENT_TYPE", "BUSINESS"],
  },
  {
    id: "local-extra-2",
    title: "Local 2 Marketing",
    prompt: "Create [CONTENT_TYPE] for [BUSINESS]. Include local SEO, community engagement, and promotions.",
    description: "Additional local business prompt #2",
    category: "local-business",
    subcategory: "local-content",
    tags: ["Local", "Marketing", "Community"],
    useCase: "Create [CONTENT_TYPE] for [BUSINESS]",
    variables: ["CONTENT_TYPE", "BUSINESS"],
  },
  {
    id: "local-extra-3",
    title: "Local 3 Marketing",
    prompt: "Create [CONTENT_TYPE] for [BUSINESS]. Include local SEO, community engagement, and promotions.",
    description: "Additional local business prompt #3",
    category: "local-business",
    subcategory: "local-content",
    tags: ["Local", "Marketing", "Community"],
    useCase: "Create [CONTENT_TYPE] for [BUSINESS]",
    variables: ["CONTENT_TYPE", "BUSINESS"],
  },
  {
    id: "local-extra-4",
    title: "Local 4 Marketing",
    prompt: "Create [CONTENT_TYPE] for [BUSINESS]. Include local SEO, community engagement, and promotions.",
    description: "Additional local business prompt #4",
    category: "local-business",
    subcategory: "local-content",
    tags: ["Local", "Marketing", "Community"],
    useCase: "Create [CONTENT_TYPE] for [BUSINESS]",
    variables: ["CONTENT_TYPE", "BUSINESS"],
  },
  {
    id: "local-extra-5",
    title: "Local 5 Marketing",
    prompt: "Create [CONTENT_TYPE] for [BUSINESS]. Include local SEO, community engagement, and promotions.",
    description: "Additional local business prompt #5",
    category: "local-business",
    subcategory: "local-content",
    tags: ["Local", "Marketing", "Community"],
    useCase: "Create [CONTENT_TYPE] for [BUSINESS]",
    variables: ["CONTENT_TYPE", "BUSINESS"],
  },
  {
    id: "local-extra-6",
    title: "Local 6 Marketing",
    prompt: "Create [CONTENT_TYPE] for [BUSINESS]. Include local SEO, community engagement, and promotions.",
    description: "Additional local business prompt #6",
    category: "local-business",
    subcategory: "local-content",
    tags: ["Local", "Marketing", "Community"],
    useCase: "Create [CONTENT_TYPE] for [BUSINESS]",
    variables: ["CONTENT_TYPE", "BUSINESS"],
  },
  {
    id: "local-extra-7",
    title: "Local 7 Marketing",
    prompt: "Create [CONTENT_TYPE] for [BUSINESS]. Include local SEO, community engagement, and promotions.",
    description: "Additional local business prompt #7",
    category: "local-business",
    subcategory: "local-content",
    tags: ["Local", "Marketing", "Community"],
    useCase: "Create [CONTENT_TYPE] for [BUSINESS]",
    variables: ["CONTENT_TYPE", "BUSINESS"],
  },
  {
    id: "local-extra-8",
    title: "Local 8 Marketing",
    prompt: "Create [CONTENT_TYPE] for [BUSINESS]. Include local SEO, community engagement, and promotions.",
    description: "Additional local business prompt #8",
    category: "local-business",
    subcategory: "local-content",
    tags: ["Local", "Marketing", "Community"],
    useCase: "Create [CONTENT_TYPE] for [BUSINESS]",
    variables: ["CONTENT_TYPE", "BUSINESS"],
  },
  {
    id: "local-extra-9",
    title: "Local 9 Marketing",
    prompt: "Create [CONTENT_TYPE] for [BUSINESS]. Include local SEO, community engagement, and promotions.",
    description: "Additional local business prompt #9",
    category: "local-business",
    subcategory: "local-content",
    tags: ["Local", "Marketing", "Community"],
    useCase: "Create [CONTENT_TYPE] for [BUSINESS]",
    variables: ["CONTENT_TYPE", "BUSINESS"],
  },
  {
    id: "local-extra-10",
    title: "Local 10 Marketing",
    prompt: "Create [CONTENT_TYPE] for [BUSINESS]. Include local SEO, community engagement, and promotions.",
    description: "Additional local business prompt #10",
    category: "local-business",
    subcategory: "local-content",
    tags: ["Local", "Marketing", "Community"],
    useCase: "Create [CONTENT_TYPE] for [BUSINESS]",
    variables: ["CONTENT_TYPE", "BUSINESS"],
  },
  {
    id: "influencer-extra-1",
    title: "Influencer 1 Content",
    prompt: "Create [CONTENT_TYPE] for [PLATFORM] as [NICHE] creator. Include brand voice and engagement.",
    description: "Additional influencer prompt #1",
    category: "influencer",
    subcategory: "pitches",
    tags: ["Influencer", "Content", "Creator"],
    useCase: "Create [CONTENT_TYPE] for [PLATFORM]",
    variables: ["CONTENT_TYPE", "PLATFORM", "NICHE"],
  },
  {
    id: "influencer-extra-2",
    title: "Influencer 2 Content",
    prompt: "Create [CONTENT_TYPE] for [PLATFORM] as [NICHE] creator. Include brand voice and engagement.",
    description: "Additional influencer prompt #2",
    category: "influencer",
    subcategory: "pitches",
    tags: ["Influencer", "Content", "Creator"],
    useCase: "Create [CONTENT_TYPE] for [PLATFORM]",
    variables: ["CONTENT_TYPE", "PLATFORM", "NICHE"],
  },
  {
    id: "influencer-extra-3",
    title: "Influencer 3 Content",
    prompt: "Create [CONTENT_TYPE] for [PLATFORM] as [NICHE] creator. Include brand voice and engagement.",
    description: "Additional influencer prompt #3",
    category: "influencer",
    subcategory: "pitches",
    tags: ["Influencer", "Content", "Creator"],
    useCase: "Create [CONTENT_TYPE] for [PLATFORM]",
    variables: ["CONTENT_TYPE", "PLATFORM", "NICHE"],
  },
  {
    id: "influencer-extra-4",
    title: "Influencer 4 Content",
    prompt: "Create [CONTENT_TYPE] for [PLATFORM] as [NICHE] creator. Include brand voice and engagement.",
    description: "Additional influencer prompt #4",
    category: "influencer",
    subcategory: "pitches",
    tags: ["Influencer", "Content", "Creator"],
    useCase: "Create [CONTENT_TYPE] for [PLATFORM]",
    variables: ["CONTENT_TYPE", "PLATFORM", "NICHE"],
  },
  {
    id: "influencer-extra-5",
    title: "Influencer 5 Content",
    prompt: "Create [CONTENT_TYPE] for [PLATFORM] as [NICHE] creator. Include brand voice and engagement.",
    description: "Additional influencer prompt #5",
    category: "influencer",
    subcategory: "pitches",
    tags: ["Influencer", "Content", "Creator"],
    useCase: "Create [CONTENT_TYPE] for [PLATFORM]",
    variables: ["CONTENT_TYPE", "PLATFORM", "NICHE"],
  },
  {
    id: "influencer-extra-6",
    title: "Influencer 6 Content",
    prompt: "Create [CONTENT_TYPE] for [PLATFORM] as [NICHE] creator. Include brand voice and engagement.",
    description: "Additional influencer prompt #6",
    category: "influencer",
    subcategory: "pitches",
    tags: ["Influencer", "Content", "Creator"],
    useCase: "Create [CONTENT_TYPE] for [PLATFORM]",
    variables: ["CONTENT_TYPE", "PLATFORM", "NICHE"],
  },
  {
    id: "influencer-extra-7",
    title: "Influencer 7 Content",
    prompt: "Create [CONTENT_TYPE] for [PLATFORM] as [NICHE] creator. Include brand voice and engagement.",
    description: "Additional influencer prompt #7",
    category: "influencer",
    subcategory: "pitches",
    tags: ["Influencer", "Content", "Creator"],
    useCase: "Create [CONTENT_TYPE] for [PLATFORM]",
    variables: ["CONTENT_TYPE", "PLATFORM", "NICHE"],
  },
  {
    id: "influencer-extra-8",
    title: "Influencer 8 Content",
    prompt: "Create [CONTENT_TYPE] for [PLATFORM] as [NICHE] creator. Include brand voice and engagement.",
    description: "Additional influencer prompt #8",
    category: "influencer",
    subcategory: "pitches",
    tags: ["Influencer", "Content", "Creator"],
    useCase: "Create [CONTENT_TYPE] for [PLATFORM]",
    variables: ["CONTENT_TYPE", "PLATFORM", "NICHE"],
  },
  {
    id: "influencer-extra-9",
    title: "Influencer 9 Content",
    prompt: "Create [CONTENT_TYPE] for [PLATFORM] as [NICHE] creator. Include brand voice and engagement.",
    description: "Additional influencer prompt #9",
    category: "influencer",
    subcategory: "pitches",
    tags: ["Influencer", "Content", "Creator"],
    useCase: "Create [CONTENT_TYPE] for [PLATFORM]",
    variables: ["CONTENT_TYPE", "PLATFORM", "NICHE"],
  },
  {
    id: "influencer-extra-10",
    title: "Influencer 10 Content",
    prompt: "Create [CONTENT_TYPE] for [PLATFORM] as [NICHE] creator. Include brand voice and engagement.",
    description: "Additional influencer prompt #10",
    category: "influencer",
    subcategory: "pitches",
    tags: ["Influencer", "Content", "Creator"],
    useCase: "Create [CONTENT_TYPE] for [PLATFORM]",
    variables: ["CONTENT_TYPE", "PLATFORM", "NICHE"],
  },
  {
    id: "crisis-extra-1",
    title: "Crisis 1 Response",
    prompt: "Create [RESPONSE_TYPE] for [SITUATION] crisis. Include messaging, channels, and follow-up.",
    description: "Additional crisis prompt #1",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["Crisis", "Response", "Communication"],
    useCase: "Handle [SITUATION] crisis situation",
    variables: ["RESPONSE_TYPE", "SITUATION"],
  },
  {
    id: "crisis-extra-2",
    title: "Crisis 2 Response",
    prompt: "Create [RESPONSE_TYPE] for [SITUATION] crisis. Include messaging, channels, and follow-up.",
    description: "Additional crisis prompt #2",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["Crisis", "Response", "Communication"],
    useCase: "Handle [SITUATION] crisis situation",
    variables: ["RESPONSE_TYPE", "SITUATION"],
  },
  {
    id: "crisis-extra-3",
    title: "Crisis 3 Response",
    prompt: "Create [RESPONSE_TYPE] for [SITUATION] crisis. Include messaging, channels, and follow-up.",
    description: "Additional crisis prompt #3",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["Crisis", "Response", "Communication"],
    useCase: "Handle [SITUATION] crisis situation",
    variables: ["RESPONSE_TYPE", "SITUATION"],
  },
  {
    id: "crisis-extra-4",
    title: "Crisis 4 Response",
    prompt: "Create [RESPONSE_TYPE] for [SITUATION] crisis. Include messaging, channels, and follow-up.",
    description: "Additional crisis prompt #4",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["Crisis", "Response", "Communication"],
    useCase: "Handle [SITUATION] crisis situation",
    variables: ["RESPONSE_TYPE", "SITUATION"],
  },
  {
    id: "crisis-extra-5",
    title: "Crisis 5 Response",
    prompt: "Create [RESPONSE_TYPE] for [SITUATION] crisis. Include messaging, channels, and follow-up.",
    description: "Additional crisis prompt #5",
    category: "crisis-management",
    subcategory: "crisis",
    tags: ["Crisis", "Response", "Communication"],
    useCase: "Handle [SITUATION] crisis situation",
    variables: ["RESPONSE_TYPE", "SITUATION"],
  },
  {
    id: "edu-extra-1",
    title: "Education 1 Material",
    prompt: "Create [MATERIAL_TYPE] for [TOPIC] for [AUDIENCE]. Include learning objectives and assessment.",
    description: "Additional education prompt #1",
    category: "education",
    subcategory: "course",
    tags: ["Education", "Learning", "Teaching"],
    useCase: "Create [MATERIAL_TYPE] for [TOPIC]",
    variables: ["MATERIAL_TYPE", "TOPIC", "AUDIENCE"],
  },
  {
    id: "edu-extra-2",
    title: "Education 2 Material",
    prompt: "Create [MATERIAL_TYPE] for [TOPIC] for [AUDIENCE]. Include learning objectives and assessment.",
    description: "Additional education prompt #2",
    category: "education",
    subcategory: "course",
    tags: ["Education", "Learning", "Teaching"],
    useCase: "Create [MATERIAL_TYPE] for [TOPIC]",
    variables: ["MATERIAL_TYPE", "TOPIC", "AUDIENCE"],
  },
  {
    id: "edu-extra-3",
    title: "Education 3 Material",
    prompt: "Create [MATERIAL_TYPE] for [TOPIC] for [AUDIENCE]. Include learning objectives and assessment.",
    description: "Additional education prompt #3",
    category: "education",
    subcategory: "course",
    tags: ["Education", "Learning", "Teaching"],
    useCase: "Create [MATERIAL_TYPE] for [TOPIC]",
    variables: ["MATERIAL_TYPE", "TOPIC", "AUDIENCE"],
  },
  {
    id: "edu-extra-4",
    title: "Education 4 Material",
    prompt: "Create [MATERIAL_TYPE] for [TOPIC] for [AUDIENCE]. Include learning objectives and assessment.",
    description: "Additional education prompt #4",
    category: "education",
    subcategory: "course",
    tags: ["Education", "Learning", "Teaching"],
    useCase: "Create [MATERIAL_TYPE] for [TOPIC]",
    variables: ["MATERIAL_TYPE", "TOPIC", "AUDIENCE"],
  },
  {
    id: "edu-extra-5",
    title: "Education 5 Material",
    prompt: "Create [MATERIAL_TYPE] for [TOPIC] for [AUDIENCE]. Include learning objectives and assessment.",
    description: "Additional education prompt #5",
    category: "education",
    subcategory: "course",
    tags: ["Education", "Learning", "Teaching"],
    useCase: "Create [MATERIAL_TYPE] for [TOPIC]",
    variables: ["MATERIAL_TYPE", "TOPIC", "AUDIENCE"],
  },
  {
    id: "edu-extra-6",
    title: "Education 6 Material",
    prompt: "Create [MATERIAL_TYPE] for [TOPIC] for [AUDIENCE]. Include learning objectives and assessment.",
    description: "Additional education prompt #6",
    category: "education",
    subcategory: "course",
    tags: ["Education", "Learning", "Teaching"],
    useCase: "Create [MATERIAL_TYPE] for [TOPIC]",
    variables: ["MATERIAL_TYPE", "TOPIC", "AUDIENCE"],
  },
  {
    id: "edu-extra-7",
    title: "Education 7 Material",
    prompt: "Create [MATERIAL_TYPE] for [TOPIC] for [AUDIENCE]. Include learning objectives and assessment.",
    description: "Additional education prompt #7",
    category: "education",
    subcategory: "course",
    tags: ["Education", "Learning", "Teaching"],
    useCase: "Create [MATERIAL_TYPE] for [TOPIC]",
    variables: ["MATERIAL_TYPE", "TOPIC", "AUDIENCE"],
  },
  {
    id: "edu-extra-8",
    title: "Education 8 Material",
    prompt: "Create [MATERIAL_TYPE] for [TOPIC] for [AUDIENCE]. Include learning objectives and assessment.",
    description: "Additional education prompt #8",
    category: "education",
    subcategory: "course",
    tags: ["Education", "Learning", "Teaching"],
    useCase: "Create [MATERIAL_TYPE] for [TOPIC]",
    variables: ["MATERIAL_TYPE", "TOPIC", "AUDIENCE"],
  },
  {
    id: "edu-extra-9",
    title: "Education 9 Material",
    prompt: "Create [MATERIAL_TYPE] for [TOPIC] for [AUDIENCE]. Include learning objectives and assessment.",
    description: "Additional education prompt #9",
    category: "education",
    subcategory: "course",
    tags: ["Education", "Learning", "Teaching"],
    useCase: "Create [MATERIAL_TYPE] for [TOPIC]",
    variables: ["MATERIAL_TYPE", "TOPIC", "AUDIENCE"],
  },
  {
    id: "edu-extra-10",
    title: "Education 10 Material",
    prompt: "Create [MATERIAL_TYPE] for [TOPIC] for [AUDIENCE]. Include learning objectives and assessment.",
    description: "Additional education prompt #10",
    category: "education",
    subcategory: "course",
    tags: ["Education", "Learning", "Teaching"],
    useCase: "Create [MATERIAL_TYPE] for [TOPIC]",
    variables: ["MATERIAL_TYPE", "TOPIC", "AUDIENCE"],
  },
  {
    id: "hr-extra-1",
    title: "HR 1 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE] in [DEPARTMENT]. Include templates and best practices.",
    description: "Additional HR prompt #1",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["HR", "Document", "Policy"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE", "DEPARTMENT"],
  },
  {
    id: "hr-extra-2",
    title: "HR 2 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE] in [DEPARTMENT]. Include templates and best practices.",
    description: "Additional HR prompt #2",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["HR", "Document", "Policy"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE", "DEPARTMENT"],
  },
  {
    id: "hr-extra-3",
    title: "HR 3 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE] in [DEPARTMENT]. Include templates and best practices.",
    description: "Additional HR prompt #3",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["HR", "Document", "Policy"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE", "DEPARTMENT"],
  },
  {
    id: "hr-extra-4",
    title: "HR 4 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE] in [DEPARTMENT]. Include templates and best practices.",
    description: "Additional HR prompt #4",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["HR", "Document", "Policy"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE", "DEPARTMENT"],
  },
  {
    id: "hr-extra-5",
    title: "HR 5 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE] in [DEPARTMENT]. Include templates and best practices.",
    description: "Additional HR prompt #5",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["HR", "Document", "Policy"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE", "DEPARTMENT"],
  },
  {
    id: "hr-extra-6",
    title: "HR 6 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE] in [DEPARTMENT]. Include templates and best practices.",
    description: "Additional HR prompt #6",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["HR", "Document", "Policy"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE", "DEPARTMENT"],
  },
  {
    id: "hr-extra-7",
    title: "HR 7 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE] in [DEPARTMENT]. Include templates and best practices.",
    description: "Additional HR prompt #7",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["HR", "Document", "Policy"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE", "DEPARTMENT"],
  },
  {
    id: "hr-extra-8",
    title: "HR 8 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE] in [DEPARTMENT]. Include templates and best practices.",
    description: "Additional HR prompt #8",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["HR", "Document", "Policy"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE", "DEPARTMENT"],
  },
  {
    id: "hr-extra-9",
    title: "HR 9 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE] in [DEPARTMENT]. Include templates and best practices.",
    description: "Additional HR prompt #9",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["HR", "Document", "Policy"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE", "DEPARTMENT"],
  },
  {
    id: "hr-extra-10",
    title: "HR 10 Document",
    prompt: "Create [DOCUMENT_TYPE] for [PURPOSE] in [DEPARTMENT]. Include templates and best practices.",
    description: "Additional HR prompt #10",
    category: "hr-recruitment",
    subcategory: "jd",
    tags: ["HR", "Document", "Policy"],
    useCase: "Create [DOCUMENT_TYPE] for [PURPOSE]",
    variables: ["DOCUMENT_TYPE", "PURPOSE", "DEPARTMENT"],
  }
];