import { Target, Upload, Sparkles, Award, BarChart3, Users, Star, Zap } from "lucide-react";
import type { HowItWorksStep, AIFeature, ToneSelectOption } from "../types/cover-letter.types";

export const COVER_LETTER_PAGE_STYLES = {
  container: "p-4 lg:p-8",
  wrapper: "max-w-7xl mx-auto",
  header: "mb-8",
  grid: "grid lg:grid-cols-5 gap-6",
  leftColumn: "lg:col-span-3 space-y-6",
  rightColumn: "lg:col-span-2 space-y-6"
} as const;

export const COVER_LETTER_HEADER_STYLES = {
  wrapper: "flex items-start justify-between mb-6",
  content: "",
  badge: {
    container: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs sm:text-sm mb-4",
    icon: "size-4",
    text: "font-medium"
  },
  title: {
    container: "text-3xl sm:text-4xl font-bold mb-2",
    gradient: "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent"
  },
  description: "text-zinc-600 dark:text-zinc-400 text-sm sm:text-base lg:text-lg"
} as const;

export const COVER_LETTER_HEADER_CONTENT = {
  badge: "AI-Powered Generation",
  title: "Cover Letter Generator",
  description: "Create personalized, compelling cover letters in seconds with AI assistance"
} as const;

export const JOB_DETAILS_CARD_STYLES = {
  card: "border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300",
  header: {
    container: "flex items-center gap-3",
    icon: {
      wrapper: "size-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg",
      icon: "size-5 text-white"
    },
    title: "text-xl",
    description: "text-sm"
  },
  content: "space-y-5",
  inputGroup: "space-y-2 group",
  inputGrid: "grid grid-cols-2 gap-4",
  inputWrapper: "relative",
  input: "h-11 bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-violet-500 dark:focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all duration-300",
  textarea: "bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-violet-500 dark:focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all duration-300 resize-none",
  focusGlow: "absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity duration-300",
  label: "text-sm font-medium text-zinc-700 dark:text-zinc-300",
  hint: "text-xs text-zinc-500 dark:text-zinc-500 flex items-center gap-1",
  hintIcon: "size-3",
  select: {
    trigger: "h-11 bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl"
  }
} as const;

export const RESUME_UPLOAD_STYLES = {
  wrapper: "space-y-2",
  label: "text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2",
  labelIcon: "size-4",
  hint: "text-xs text-zinc-500 dark:text-zinc-500",
  uploadArea: {
    wrapper: "relative group",
    label: "flex flex-col items-center justify-center p-8 border-2 border-dashed border-violet-300 dark:border-violet-700 rounded-xl cursor-pointer hover:border-violet-500 dark:hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all duration-300",
    icon: {
      wrapper: "size-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300",
      icon: "size-6 text-white"
    },
    title: "text-sm font-medium text-zinc-900 dark:text-white mb-1",
    description: "text-xs text-zinc-500 dark:text-zinc-500",
    glow: "absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-10"
  },
  uploadedFile: {
    container: "p-4 rounded-xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between",
    content: "flex items-center gap-3",
    icon: {
      wrapper: "size-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg",
      icon: "size-5 text-white"
    },
    fileName: "font-medium text-zinc-900 dark:text-white text-sm",
    status: "text-xs text-emerald-600 dark:text-emerald-400",
    removeButton: "hover:bg-red-100 dark:hover:bg-red-950/30",
    removeIcon: "size-4 text-red-500"
  }
} as const;

export const GENERATE_BUTTON_STYLES = {
  base: "w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/50 dark:shadow-violet-900/50 transform hover:scale-[1.02] transition-all duration-300",
  spinner: "size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2",
  icon: "size-5 mr-2"
} as const;

export const HOW_IT_WORKS_STYLES = {
  card: "border-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600 shadow-2xl shadow-violet-500/50 dark:shadow-violet-900/50",
  title: "text-white text-xl",
  content: "space-y-4",
  step: {
    container: "flex items-start gap-4",
    icon: {
      wrapper: "size-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg",
      icon: "size-5 text-white"
    },
    title: "font-semibold text-white",
    description: "text-sm text-violet-100"
  }
} as const;

export const AI_FEATURES_STYLES = {
  card: "border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl",
  header: {
    container: "flex items-center gap-2",
    icon: "size-5 text-violet-600 dark:text-violet-400",
    title: "text-lg"
  },
  content: "space-y-3",
  feature: {
    container: "flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/50 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition-colors duration-200",
    icon: {
      wrapper: "size-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg",
      icon: "size-4 text-white"
    },
    text: "text-sm text-zinc-700 dark:text-zinc-300 pt-1"
  }
} as const;

export const GENERATED_LETTER_STYLES = {
  card: "border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300",
  header: {
    wrapper: "flex items-center justify-between",
    left: "flex items-center gap-3",
    icon: {
      wrapper: "size-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg",
      icon: "size-5 text-white"
    },
    title: "text-xl",
    description: "",
    newButton: "hover:bg-violet-100 dark:hover:bg-violet-950/30",
    newButtonIcon: "size-4 mr-2"
  },
  content: "space-y-4",
  textareaWrapper: "bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl p-6",
  textarea: "min-h-[500px] bg-transparent border-0 p-0 text-sm leading-relaxed resize-none focus-visible:ring-0",
  buttonGrid: "grid grid-cols-2 gap-3",
  downloadButton: "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg",
  downloadButtonAlt: "border-2 border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950/30",
  copyButton: "w-full border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-950",
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
