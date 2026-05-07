import { Target, Upload, Sparkles, Award, BarChart3, Users, Star, Zap } from "lucide-react";
import type { HowItWorksStep, AIFeature, ToneSelectOption } from "../types/cover-letter.types";

export const COVER_LETTER_PAGE_STYLES = {
  container: "overflow-x-hidden px-3 py-4 sm:px-4 sm:py-5 lg:px-8 lg:py-8",
  wrapper: "relative mx-auto max-w-6xl",
  header: "mb-5 sm:mb-7",
  grid: "grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:gap-5 xl:gap-6",
  leftColumn: "min-w-0 space-y-4 sm:space-y-5",
  rightColumn: "min-w-0 space-y-4 sm:space-y-5 lg:sticky lg:top-24 lg:self-start"
} as const;

export const COVER_LETTER_HEADER_CONTENT = {
  badge: "Cover Letter Studio",
  title: "Cover Letter Generator",
  description: "Build a polished first draft that reads tailored, not templated. Add the role, paste the job description, and refine from a clean AI starting point."
} as const;

export const JOB_DETAILS_CARD_STYLES = {
  card: "overflow-hidden rounded-[1.5rem] border border-zinc-200/80 bg-white/85 shadow-xl shadow-zinc-200/40 backdrop-blur-xl transition-colors dark:border-zinc-800 dark:bg-zinc-950/80 dark:shadow-black/20",
  header: {
    container: "flex items-start gap-3",
    icon: {
      wrapper: "flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/25",
      icon: "size-5"
    },
    title: "text-lg font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white sm:text-xl",
    description: "mt-1 text-sm leading-5 text-zinc-600 dark:text-zinc-400"
  },
  content: "space-y-5 p-4 sm:space-y-6 sm:p-5",
  inputGroup: "space-y-2.5 group min-w-0",
  inputGrid: "grid gap-4 md:grid-cols-2",
  inputWrapper: "relative",
  input: "h-12 rounded-xl border-zinc-200 bg-white/90 px-4 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-950 dark:border-zinc-800 dark:bg-zinc-950/80 dark:focus-visible:ring-white",
  textarea: "rounded-xl border-zinc-200 bg-white/90 px-4 py-3 text-sm leading-6 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-950 dark:border-zinc-800 dark:bg-zinc-950/80 dark:focus-visible:ring-white resize-none",
  focusGlow: "pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-lg transition-opacity duration-200 group-focus-within:opacity-100 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.10),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.12),transparent_70%)]",
  label: "text-sm font-medium text-zinc-700 dark:text-zinc-300",
  error: "text-sm text-red-600 dark:text-red-400",
  hint: "flex items-start gap-1.5 text-xs leading-5 text-zinc-500 dark:text-zinc-500",
  hintIcon: "size-3",
  select: {
    trigger: "h-12 rounded-xl border-zinc-200 bg-white/90 px-4 shadow-sm focus:ring-1 focus:ring-zinc-950 data-[placeholder]:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950/80 dark:focus:ring-white"
  }
} as const;

export const RESUME_UPLOAD_STYLES = {
  wrapper: "space-y-2.5",
  label: "text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2",
  labelIcon: "size-4",
  hint: "text-xs leading-5 text-zinc-500 dark:text-zinc-500",
  uploadArea: {
    wrapper: "relative group",
    label: "flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-violet-300 bg-zinc-50/70 px-5 py-8 text-center transition-all duration-200 hover:border-violet-400 hover:bg-white dark:border-violet-900/60 dark:bg-zinc-950/70 dark:hover:border-violet-700 dark:hover:bg-zinc-950 sm:px-6",
    icon: {
      wrapper: "mb-3 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/25 transition-transform duration-200 group-hover:scale-[1.03]",
      icon: "size-5"
    },
    title: "text-sm font-medium text-zinc-900 dark:text-white",
    description: "mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-500",
    glow: "pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.10),transparent_68%)] dark:bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.14),transparent_68%)]"
  },
  uploadedFile: {
    container: "flex items-center justify-between gap-3 rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-3.5 dark:border-emerald-900/60 dark:bg-emerald-950/20",
    content: "min-w-0 flex items-center gap-3",
    icon: {
      wrapper: "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20",
      icon: "size-5 text-white"
    },
    fileName: "truncate text-sm font-medium text-zinc-900 dark:text-white",
    status: "text-xs text-emerald-700 dark:text-emerald-400",
    removeButton: "shrink-0 rounded-xl hover:bg-red-100 dark:hover:bg-red-950/30",
    removeIcon: "size-4 text-red-500"
  }
} as const;

export const GENERATE_BUTTON_STYLES = {
  base: "w-full rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 px-5 text-white shadow-lg shadow-violet-500/30 hover:from-violet-700 hover:via-fuchsia-700 hover:to-cyan-700 h-12 text-sm font-semibold",
  spinner: "size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2",
  icon: "size-5 mr-2"
} as const;

export const HOW_IT_WORKS_STYLES = {
  card: "overflow-hidden rounded-[1.5rem] border border-zinc-200/80 bg-white/85 shadow-xl shadow-zinc-200/40 backdrop-blur-xl transition-colors dark:border-zinc-800 dark:bg-zinc-950/80 dark:shadow-black/20",
  title: "text-base font-semibold text-zinc-950 dark:text-zinc-50",
  content: "space-y-3",
  step: {
    container: "flex items-start gap-3 rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-3.5 dark:border-zinc-800/70 dark:bg-zinc-950/60",
    icon: {
      wrapper: "flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20",
      icon: "size-4"
    },
    title: "text-sm font-semibold text-zinc-900 dark:text-zinc-100",
    description: "mt-1 text-sm leading-5 text-zinc-600 dark:text-zinc-400"
  }
} as const;

export const AI_FEATURES_STYLES = {
  card: "overflow-hidden rounded-[1.5rem] border border-zinc-200/80 bg-white/85 shadow-xl shadow-zinc-200/40 backdrop-blur-xl transition-colors dark:border-zinc-800 dark:bg-zinc-950/80 dark:shadow-black/20",
  header: {
    container: "flex items-center gap-2",
    icon: "size-4.5 text-violet-500 dark:text-violet-300",
    title: "text-base font-semibold text-zinc-950 dark:text-zinc-50"
  },
  content: "space-y-2.5",
  feature: {
    container: "flex items-start gap-3 rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-3.5 transition-colors duration-200 hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/60 dark:hover:bg-zinc-950",
    icon: {
      wrapper: "flex size-8 shrink-0 items-center justify-center rounded-xl shadow-sm",
      icon: "size-4 text-white"
    },
    text: "pt-0.5 text-sm leading-5 text-zinc-700 dark:text-zinc-300"
  }
} as const;

export const GENERATED_LETTER_STYLES = {
  card: "overflow-hidden rounded-[1.5rem] border border-zinc-200/80 bg-white/85 shadow-xl shadow-zinc-200/40 backdrop-blur-xl transition-colors dark:border-zinc-800 dark:bg-zinc-950/80 dark:shadow-black/20",
  header: {
    wrapper: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
    left: "flex min-w-0 items-start gap-3",
    icon: {
      wrapper: "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/25",
      icon: "size-5 text-white"
    },
    title: "text-lg font-semibold text-zinc-950 dark:text-zinc-50",
    description: "mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400",
    newButton: "w-full rounded-xl border-zinc-300 bg-white/80 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/70 dark:hover:bg-zinc-900 sm:w-auto",
    newButtonIcon: "size-4 mr-2"
  },
  content: "space-y-4",
  textareaWrapper: "rounded-[1rem] border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/80 sm:p-5",
  textarea: "min-h-[320px] sm:min-h-[420px] bg-transparent border-0 p-0 text-sm leading-7 text-zinc-800 dark:text-zinc-200 resize-none focus-visible:ring-0",
  buttonGrid: "grid gap-3 sm:grid-cols-2",
  downloadButton: "rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 text-white shadow-lg shadow-violet-500/30 hover:from-violet-700 hover:via-fuchsia-700 hover:to-cyan-700",
  downloadButtonAlt: "rounded-xl border-zinc-300 bg-white/80 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/70 dark:hover:bg-zinc-900",
  copyButton: "w-full rounded-xl border-zinc-300 bg-white/80 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/70 dark:hover:bg-zinc-900",
  buttonIcon: "size-4 mr-2"
} as const;

export const TEXTAREA_FIELDS = {
  jobDescription: {
    id: "jobDescription",
    label: "Job Description",
    placeholder: "Paste the complete job description here...",
    minHeight: "min-h-[160px]"
  },
  highlights: {
    id: "highlights",
    label: "Key Achievements to Highlight (Optional)",
    placeholder: "e.g., Led team of 5 engineers, Reduced costs by 40%, Expertise in React and Node.js",
    minHeight: "min-h-[100px]",
    hint: "Include quantifiable results and specific technologies"
  }
} as const;

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  { icon: Target, title: "Enter Job Details", desc: "Company and position info" },
  { icon: Upload, title: "Upload Resume (Optional)", desc: "For better personalization" },
  { icon: Sparkles, title: "AI Generates", desc: "Creates personalized letter" },
  { icon: Award, title: "Download & Apply", desc: "Use in your application" }
] as const;

export const AI_FEATURES_DATA: AIFeature[] = [
  { icon: BarChart3, text: "Analyzes job requirements", gradient: "from-violet-500 to-fuchsia-500" },
  { icon: Users, text: "Matches your experience to role", gradient: "from-cyan-500 to-teal-500" },
  { icon: Star, text: "Highlights relevant achievements", gradient: "from-amber-500 to-orange-500" },
  { icon: Zap, text: "Optimized for ATS systems", gradient: "from-emerald-500 to-green-500" }
] as const;

export const TONE_OPTIONS: ToneSelectOption[] = [
  { value: "professional", label: "Professional" },
  { value: "enthusiastic", label: "Enthusiastic" },
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Friendly" }
] as const;
