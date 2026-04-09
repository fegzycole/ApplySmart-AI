import type { PricingPlan, FeatureCategory, FAQItem } from "../types/pricing.types";

export const PRICING_PAGE_STYLES = {
  container: "min-h-screen bg-white dark:bg-zinc-950",
  maxWidth: "max-w-7xl mx-auto",
  padding: "px-4 sm:px-6 lg:px-8"
} as const;

export const NAVIGATION_STYLES = {
  container: "border-b border-zinc-200 dark:border-zinc-800",
  wrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  content: "flex justify-between items-center h-16",
  logo: {
    container: "flex items-center gap-2",
    icon: "size-6 text-indigo-600 dark:text-indigo-400",
    text: "text-xl font-semibold text-zinc-900 dark:text-white"
  },
  actions: {
    container: "flex items-center gap-4",
    themeButton: "p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800",
    themeIcon: "size-5",
    signInButton: "",
    signUpButton: "bg-indigo-600 hover:bg-indigo-700 text-white"
  }
} as const;

export const PRICING_HEADER_STYLES = {
  container: "pt-20 pb-12 px-4 sm:px-6 lg:px-8",
  wrapper: "max-w-7xl mx-auto text-center",
  title: "text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-4",
  description: "text-xl text-zinc-600 dark:text-zinc-400 mb-8",
  tabs: {
    container: "inline-flex",
    badge: "ml-2 px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs rounded-full"
  }
} as const;

export const PRICING_HEADER_CONTENT = {
  title: "Simple, Transparent Pricing",
  description: "Choose the plan that's right for your job search journey",
  saveBadge: "Save 20%"
} as const;

export const PRICING_CARD_STYLES = {
  section: "pb-20 px-4 sm:px-6 lg:px-8",
  grid: "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
  card: {
    base: "relative",
    popular: "border-indigo-200 dark:border-indigo-800 shadow-lg",
    regular: "border-zinc-200 dark:border-zinc-800"
  },
  badge: "absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-sm rounded-full",
  price: {
    container: "mt-4",
    amount: "text-4xl font-bold text-zinc-900 dark:text-white",
    period: "text-zinc-600 dark:text-zinc-400"
  },
  features: {
    list: "space-y-3 mb-6",
    item: "flex items-start gap-2",
    icon: "size-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5",
    text: "text-sm text-zinc-600 dark:text-zinc-400"
  },
  button: {
    base: "w-full",
    popular: "bg-indigo-600 hover:bg-indigo-700 text-white",
    regular: ""
  }
} as const;

export const FEATURE_COMPARISON_STYLES = {
  section: "py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900",
  header: {
    container: "text-center mb-12",
    title: "text-3xl font-bold text-zinc-900 dark:text-white mb-4",
    description: "text-xl text-zinc-600 dark:text-zinc-400"
  },
  table: {
    wrapper: "bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden",
    container: "overflow-x-auto",
    table: "w-full",
    thead: {
      row: "border-b border-zinc-200 dark:border-zinc-800",
      cell: "text-center p-4 font-semibold text-zinc-900 dark:text-white",
      cellLeft: "text-left p-4 font-semibold text-zinc-900 dark:text-white",
      cellHighlight: "text-center p-4 font-semibold text-zinc-900 dark:text-white bg-indigo-50 dark:bg-indigo-950/30"
    },
    tbody: {
      categoryRow: "bg-zinc-50 dark:bg-zinc-900",
      categoryCell: "p-4 font-semibold text-zinc-900 dark:text-white",
      itemRow: "border-b border-zinc-200 dark:border-zinc-800",
      cellLeft: "p-4 text-zinc-600 dark:text-zinc-400",
      cell: "p-4 text-center text-zinc-600 dark:text-zinc-400",
      cellHighlight: "p-4 text-center text-zinc-600 dark:text-zinc-400 bg-indigo-50 dark:bg-indigo-950/30",
      checkIcon: "size-5 text-indigo-600 dark:text-indigo-400 mx-auto"
    }
  }
} as const;

export const TABLE_PLAN_HEADERS = [
  { name: "Free", highlighted: false },
  { name: "Starter", highlighted: false },
  { name: "Pro", highlighted: true },
  { name: "Career Boost", highlighted: false }
] as const;

export const FAQ_STYLES = {
  section: "py-20 px-4 sm:px-6 lg:px-8",
  wrapper: "max-w-3xl mx-auto",
  header: {
    container: "text-center mb-12",
    title: "text-3xl font-bold text-zinc-900 dark:text-white mb-4"
  },
  list: "space-y-6",
  card: "border-zinc-200 dark:border-zinc-800",
  question: "text-lg",
  answer: "text-zinc-600 dark:text-zinc-400"
} as const;

export const CTA_STYLES = {
  section: "py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600 dark:bg-indigo-700",
  wrapper: "max-w-4xl mx-auto text-center",
  title: "text-3xl sm:text-4xl font-bold text-white mb-4",
  description: "text-xl text-indigo-100 mb-8",
  button: "bg-white hover:bg-zinc-100 text-indigo-600 text-lg px-8 h-12"
} as const;

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for getting started",
    features: [
      "3 resume optimizations per month",
      "Basic job tracker",
      "1 resume template",
      "Email support",
      "Basic analytics"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Starter",
    price: 15,
    description: "For active job seekers",
    features: [
      "10 resume optimizations per month",
      "3 AI cover letters per month",
      "Advanced job tracker",
      "5 resume templates",
      "Priority email support",
      "Advanced analytics",
      "Interview prep resources"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Pro",
    price: 29,
    description: "For serious professionals",
    features: [
      "Unlimited resume optimizations",
      "Unlimited AI cover letters",
      "Advanced job tracker with automation",
      "All resume templates",
      "Priority support",
      "Advanced analytics & insights",
      "Interview prep & coaching",
      "LinkedIn profile optimization",
      "Salary negotiation tips"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Career Boost",
    price: 79,
    description: "For career transformation",
    features: [
      "Everything in Pro",
      "1-on-1 career coaching (2 sessions/month)",
      "Personal job search strategy",
      "Resume writing service",
      "Interview practice sessions",
      "Networking guidance",
      "Offer negotiation support",
      "Career transition guidance",
      "VIP support"
    ],
    cta: "Contact Sales",
    popular: false
  }
] as const;

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    category: "Resume Tools",
    items: [
      { name: "Resume Optimizer", free: "3/month", starter: "10/month", pro: "Unlimited", boost: "Unlimited" },
      { name: "Resume Builder", free: true, starter: true, pro: true, boost: true },
      { name: "Resume Templates", free: "1", starter: "5", pro: "All", boost: "All + Custom" },
      { name: "ATS Compatibility Check", free: true, starter: true, pro: true, boost: true }
    ]
  },
  {
    category: "AI Tools",
    items: [
      { name: "AI Cover Letter Generator", free: false, starter: "3/month", pro: "Unlimited", boost: "Unlimited" },
      { name: "Job Description Analysis", free: "Limited", starter: true, pro: true, boost: true },
      { name: "Skills Gap Analysis", free: false, starter: true, pro: true, boost: true },
      { name: "Job Recommendations", free: false, starter: true, pro: true, boost: true }
    ]
  },
  {
    category: "Tracking & Analytics",
    items: [
      { name: "Job Application Tracker", free: "Basic", starter: "Advanced", pro: "Advanced", boost: "Advanced" },
      { name: "Analytics Dashboard", free: "Basic", starter: "Advanced", pro: "Advanced", boost: "Advanced" },
      { name: "Application Automation", free: false, starter: false, pro: true, boost: true },
      { name: "Follow-up Reminders", free: false, starter: true, pro: true, boost: true }
    ]
  },
  {
    category: "Career Services",
    items: [
      { name: "Interview Prep Resources", free: false, starter: true, pro: true, boost: true },
      { name: "Career Coaching", free: false, starter: false, pro: false, boost: "2 sessions/month" },
      { name: "LinkedIn Optimization", free: false, starter: false, pro: true, boost: true },
      { name: "Salary Negotiation Guide", free: false, starter: false, pro: true, boost: true }
    ]
  },
  {
    category: "Support",
    items: [
      { name: "Email Support", free: "Standard", starter: "Priority", pro: "Priority", boost: "VIP" },
      { name: "Response Time", free: "48 hours", starter: "24 hours", pro: "12 hours", boost: "4 hours" }
    ]
  }
] as const;

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Can I switch plans anytime?",
    answer: "Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately, and we'll prorate any charges."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All paid plans come with a 7-day free trial. No credit card required to start."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal."
  },
  {
    question: "Can I get a refund?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with ApplySmart AI, contact us for a full refund."
  }
] as const;

export const CTA_CONTENT = {
  title: "Ready to Accelerate Your Job Search?",
  description: "Join thousands of job seekers landing their dream jobs with AI",
  buttonText: "Start Free Trial"
} as const;
