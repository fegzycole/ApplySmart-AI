import { Target, Sparkles, Award, BarChart3, Users, Star, Zap, Database } from "lucide-react";
import type { HowItWorksStep, AIFeature, ToneSelectOption } from "../types/cover-letter.types";

export const COVER_LETTER_PAGE_STYLES = {
  container: "min-h-screen pb-20 bg-[#fafafa] dark:bg-zinc-950",
  wrapper: "mx-auto flex max-w-[1700px] flex-col gap-8 px-3 pt-8 sm:gap-10 sm:px-6 sm:pt-10 lg:gap-12 lg:px-8 lg:pt-12",
  header: "relative flex flex-col items-center text-center space-y-6 border-b border-zinc-100 pb-10 dark:border-zinc-800 sm:space-y-10 sm:pb-16",
  grid: "grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_480px] xl:gap-12",
  leftColumn: "space-y-10 min-w-0",
  rightColumn: "min-w-0 xl:sticky xl:top-8",
} as const;

export const SYNTHESIS_STAGE_STYLES = {
  header: {
    glow: "absolute top-0 left-1/2 -z-10 h-48 w-full max-w-4xl -translate-x-1/2 bg-gradient-to-b from-amber-50/50 to-transparent blur-3xl dark:from-amber-900/10 sm:h-64",
    iconWrapper: "relative flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-amber-50 text-amber-600 shadow-sm dark:bg-amber-900/20 dark:text-amber-400 sm:h-24 sm:w-24 sm:rounded-[2.5rem]",
    title: "text-4xl font-black tracking-tighter leading-[0.88] text-zinc-900 dark:text-zinc-100 uppercase sm:text-6xl xl:text-8xl",
  },
  panel: "group relative overflow-hidden rounded-[2rem] border-2 border-white/60 bg-white/40 shadow-2xl backdrop-blur-3xl transition-all duration-500 hover:-translate-y-1 dark:border-zinc-800/40 dark:bg-zinc-900/40 sm:rounded-[3rem]",
  input: "h-13 min-w-0 rounded-2xl border-2 border-border/50 bg-background/50 px-4 text-sm leading-relaxed shadow-inner backdrop-blur-2xl transition-all duration-300 focus-visible:border-amber-500 focus-visible:ring-4 focus-visible:ring-amber-500/10 sm:h-14 sm:px-6",
  textarea: "min-h-[140px] rounded-[1.5rem] border-2 border-border/50 bg-background/50 p-4 text-sm leading-relaxed shadow-inner backdrop-blur-2xl transition-all duration-300 focus-visible:border-amber-500 focus-visible:ring-4 focus-visible:ring-amber-500/10 resize-none sm:min-h-[160px] sm:rounded-[2rem] sm:p-6 lg:p-8",
  label: "text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 ml-1 transition-all group-focus-within:text-amber-600 group-focus-within:tracking-[0.4em]",
};

export const JOB_DETAILS_CARD_STYLES = {
  card: SYNTHESIS_STAGE_STYLES.panel,
  content: "space-y-8",
  inputGrid: "grid gap-6 sm:grid-cols-2",
  inputGroup: "group space-y-2 min-w-0",
  label: SYNTHESIS_STAGE_STYLES.label,
  inputWrapper: "relative min-w-0",
  input: SYNTHESIS_STAGE_STYLES.input,
  textarea: SYNTHESIS_STAGE_STYLES.textarea,
  focusGlow:
    "pointer-events-none absolute inset-0 rounded-[2rem] bg-amber-500/10 opacity-0 blur-xl transition-opacity duration-300 group-focus-within:opacity-100",
  error:
    "ml-1 text-[10px] font-black uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400",
  hint:
    "mt-2 flex items-start gap-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400",
  hintIcon: "mt-0.5 size-3.5 shrink-0 text-amber-500",
  select: {
    trigger:
      "h-14 min-w-0 rounded-2xl border-2 border-border/50 bg-background/50 px-6 text-sm leading-relaxed backdrop-blur-2xl transition-all duration-300 focus:ring-4 focus:ring-amber-500/10 data-[state=open]:border-amber-500 shadow-inner",
  },
  header: {
    container: "flex items-center gap-5",
    icon: {
      wrapper:
        "flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-amber-50 text-amber-600 shadow-sm dark:bg-amber-900/20 dark:text-amber-400",
      icon: "size-7",
    },
    title:
      "text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100",
    description:
      "mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400",
  },
} as const;

export const TEXTAREA_FIELDS = {
  jobDescription: {
    id: "jobDescription",
    label: "Job Description",
    placeholder:
      "Paste the real job description with responsibilities, requirements, and qualifications.",
    minHeight: "min-h-[220px]",
  },
  highlights: {
    id: "highlights",
    label: "Key Highlights",
    placeholder:
      "Add achievements, domain context, or details you want emphasized in the letter.",
    minHeight: "min-h-[160px]",
    hint: "Optional, but useful for steering the draft toward your strongest evidence.",
  },
} as const;

export const AI_FEATURES_STYLES = {
  card: SYNTHESIS_STAGE_STYLES.panel,
  content: "space-y-4",
  header: {
    container: "flex items-center gap-3",
    icon: "size-5 text-amber-500",
    title: "text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100",
  },
  feature: {
    container: "flex items-center gap-4 rounded-[1.5rem] border border-white/60 bg-white/60 p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50",
    icon: {
      wrapper: "flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg",
      icon: "size-5",
    },
    text: "text-sm font-semibold leading-6 text-zinc-700 dark:text-zinc-300",
  },
} as const;

export const HOW_IT_WORKS_STYLES = {
  card: SYNTHESIS_STAGE_STYLES.panel,
  title: "text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100",
  content: "space-y-5",
  step: {
    container: "flex items-start gap-4 rounded-[1.5rem] border border-white/60 bg-white/60 p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50",
    icon: {
      wrapper:
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-sm dark:bg-amber-900/20 dark:text-amber-400",
      icon: "size-5",
    },
    title: "text-sm font-black uppercase tracking-[0.14em] text-zinc-900 dark:text-zinc-100",
    description: "mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400",
  },
} as const;

export const GENERATE_BUTTON_STYLES = {
  base: "h-14 rounded-2xl bg-zinc-900 text-white font-bold tracking-tight shadow-xl shadow-zinc-900/20 hover:scale-[1.02] active:scale-95 dark:bg-amber-600 dark:shadow-amber-900/20",
  spinner: "size-4 animate-spin rounded-full border-2 border-white/30 border-t-white",
  icon: "mr-2 size-4",
} as const;

export const RESUME_UPLOAD_STYLES = {
  wrapper: "space-y-2",
  label: "flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500",
  labelIcon: "size-3.5 text-amber-500",
  hint: "text-sm text-zinc-500 dark:text-zinc-400",
  uploadArea: {
    wrapper: "relative overflow-hidden rounded-[2rem] border-2 border-dashed border-zinc-200 bg-white/60 p-6 dark:border-zinc-700 dark:bg-zinc-900/40",
    label: "flex cursor-pointer flex-col items-center justify-center gap-3 text-center",
    title: "text-sm font-bold text-zinc-700 dark:text-zinc-200",
    description: "text-xs text-zinc-500 dark:text-zinc-400",
    glow: "pointer-events-none absolute inset-0 bg-amber-500/5 opacity-0 transition-opacity duration-300 hover:opacity-100",
    icon: {
      wrapper:
        "flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
      icon: "size-5",
    },
  },
  uploadedFile: {
    container: "flex items-center justify-between gap-4 rounded-[2rem] border border-zinc-200 bg-white/70 p-4 dark:border-zinc-700 dark:bg-zinc-900/50",
    content: "flex min-w-0 items-center gap-3",
    fileName: "truncate text-sm font-bold text-zinc-900 dark:text-zinc-100",
    status: "text-xs text-zinc-500 dark:text-zinc-400",
    removeButton: "h-10 w-10 rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
    removeIcon: "size-4",
    icon: {
      wrapper:
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
      icon: "size-4",
    },
  },
} as const;

export const NARRATIVE_ARTIFACT_STYLES = {
  wrapper: "group relative overflow-hidden rounded-[2rem] border-2 border-white/80 bg-white shadow-2xl transition-all duration-700 hover:-translate-y-2 dark:bg-zinc-900 dark:border-zinc-800 sm:rounded-[3rem] lg:rounded-[4rem]",
  aura: "absolute inset-0 bg-gradient-to-br from-amber-200/20 via-sky-200/10 to-transparent blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000",
  grain: "absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay",
  body: "relative z-10 p-5 space-y-6 sm:p-8 sm:space-y-8 lg:p-10 lg:space-y-10",
  specimenFrame: "relative overflow-hidden rounded-[1.5rem] border-2 border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-700/30 dark:bg-zinc-800/30 sm:rounded-[2rem] sm:p-6 lg:rounded-[2.5rem] lg:p-10",
  specimenContent: "text-sm leading-[1.8] text-zinc-800 dark:text-zinc-200 font-medium sm:text-base",
  actionDeck: "flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-zinc-100 dark:border-zinc-800 sm:gap-4 sm:pt-8",
} as const;

export const GENERATED_LETTER_STYLES = {
  card: NARRATIVE_ARTIFACT_STYLES.wrapper,
  content: NARRATIVE_ARTIFACT_STYLES.body,
  textareaWrapper:
    "rounded-[2rem] border-2 border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40",
  textarea:
    "min-h-[20rem] resize-none border-0 bg-transparent px-1 py-1 text-sm leading-7 text-zinc-700 shadow-none focus-visible:ring-0 dark:text-zinc-200 sm:min-h-[26rem] sm:px-2",
  buttonGrid: "grid gap-3 sm:grid-cols-2",
  downloadButton:
    "h-12 rounded-2xl bg-zinc-900 text-white font-bold tracking-tight shadow-xl shadow-zinc-900/15 hover:scale-[1.02] active:scale-95 dark:bg-amber-600 dark:shadow-amber-900/20",
  downloadButtonAlt:
    "h-12 rounded-2xl border-2 border-zinc-200 bg-white/70 font-bold tracking-tight hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/60 dark:hover:bg-zinc-800",
  copyButton:
    "h-12 rounded-2xl border-2 border-zinc-200 bg-white/70 font-bold tracking-tight hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/60 dark:hover:bg-zinc-800",
  buttonIcon: "mr-2 size-4",
  header: {
    wrapper: "flex items-start justify-between gap-4",
    left: "flex items-center gap-4",
    icon: {
      wrapper:
        "flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-emerald-50 text-emerald-600 shadow-sm dark:bg-emerald-900/20 dark:text-emerald-400",
      icon: "size-6",
    },
    title: "text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100",
    description: "mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400",
    newButton:
      "h-10 rounded-xl px-4 font-bold tracking-tight text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
    newButtonIcon: "mr-2 size-4",
  },
} as const;

export const COVER_LETTER_HEADER_CONTENT = {
  badge: "Quantum Narrative Engine",
  title: "Cover Letter Synthesis",
  description: "Engineer a high-impact professional narrative. Align your artifacts and synthesize a tailored draft.",
} as const;

export const TONE_OPTIONS: ToneSelectOption[] = [
  { value: "professional", label: "Professional" },
  { value: "enthusiastic", label: "Enthusiastic" },
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Friendly" }
] as const;

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  { icon: Target, title: "Specify Blueprint", desc: "Define company and role vectors" },
  { icon: Database, title: "Inject Artifact", desc: "Upload source resume data" },
  { icon: Sparkles, title: "Synthesize Narrative", desc: "AI assembles the draft" },
  { icon: Award, title: "Verify Output", desc: "Download and deploy" }
] as const;

export const AI_FEATURES_DATA: AIFeature[] = [
  { icon: BarChart3, text: "Analyzes structural requirements", gradient: "from-amber-500 to-orange-500" },
  { icon: Users, text: "Matches artifact to role blueprint", gradient: "from-sky-500 to-indigo-500" },
  { icon: Star, text: "Highlights verified achievements", gradient: "from-emerald-500 to-teal-500" },
  { icon: Zap, text: "Optimized for ATS scanning", gradient: "from-violet-500 to-fuchsia-500" }
] as const;
