export interface SubscriptionTier {
  id: string;
  name: "free" | "pro" | "enterprise";
  display_name_ar: string;
  display_name_en: string;
  price_monthly_usd: number;
  price_yearly_usd: number;
  stripe_price_id_monthly: string | null;
  stripe_price_id_yearly: string | null;
  features: string[];
  limits: {
    daily_prompts: number;
    monthly_cv_analyses: number;
    max_tokens_per_request: number;
    image_generations: number;
    video_generations: number;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  tier_id: string;
  status:
    | "trialing"
    | "active"
    | "past_due"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "paused"
    | "unpaid";
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  billing_interval: "month" | "year" | null;
  trial_start: string | null;
  trial_end: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface UsageLog {
  id: string;
  user_id: string;
  service:
    | "text-generate"
    | "text-optimize"
    | "humanize"
    | "cv-analyze"
    | "cv-enhance"
    | "image-generate"
    | "video-generate"
    | "code-generate";
  model: string | null;
  tokens_used: number;
  request_id: string | null;
  status: "success" | "error" | "rate_limited" | null;
  error_message: string | null;
  ip_address: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: "admin" | "user" | "moderator";
  granted_by: string | null;
  granted_at: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserSubscriptionWithTier extends UserSubscription {
  tier: SubscriptionTier;
}

export type ServiceType = UsageLog["service"];

export const SERVICE_LIMITS: Record<ServiceType, keyof SubscriptionTier["limits"]> = {
  "text-generate": "daily_prompts",
  "text-optimize": "daily_prompts",
  humanize: "daily_prompts",
  "cv-analyze": "monthly_cv_analyses",
  "cv-enhance": "monthly_cv_analyses",
  "image-generate": "image_generations",
  "video-generate": "video_generations",
  "code-generate": "daily_prompts",
};

export const PERIOD_MAP: Record<string, "day" | "month"> = {
  "text-generate": "day",
  "text-optimize": "day",
  humanize: "day",
  "cv-analyze": "month",
  "cv-enhance": "month",
  "image-generate": "day",
  "video-generate": "day",
  "code-generate": "day",
};
