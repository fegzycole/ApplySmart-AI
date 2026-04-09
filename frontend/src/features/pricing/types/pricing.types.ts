export interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface FeatureItem {
  name: string;
  free: boolean | string;
  starter: boolean | string;
  pro: boolean | string;
  boost: boolean | string;
}

export interface FeatureCategory {
  category: string;
  items: FeatureItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type BillingPeriod = "monthly" | "annual";
