import { FileCheck2, FileStack, FileText, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DocumentsTabId, ResumeDocumentKind } from "../types/documents.types";

export const DOCUMENT_GRAIN_BACKGROUND =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")';

export const DOCUMENTS_PAGE_STYLES = {
  container: "min-h-screen pb-20 bg-[#fafafa] dark:bg-zinc-950",
  wrapper: "mx-auto flex max-w-[1700px] flex-col gap-8 px-3 pt-8 sm:gap-10 sm:px-6 sm:pt-10 lg:gap-12 lg:px-8 lg:pt-12",
  overviewGrid: "grid gap-6 sm:grid-cols-2 xl:grid-cols-4",
  sectionGrid: "grid gap-8",
} as const;

export const VAULT_STYLES = {
  header: {
    container: "relative flex flex-col items-center text-center space-y-6 border-b border-zinc-100 pb-10 dark:border-zinc-800 sm:space-y-10 sm:pb-16",
    glow: "absolute top-0 left-1/2 -z-10 h-48 w-full max-w-4xl -translate-x-1/2 bg-gradient-to-b from-sky-50/50 to-transparent blur-3xl dark:from-sky-900/10 sm:h-64",
    iconWrapper: "relative flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-sky-50 text-sky-600 shadow-sm dark:bg-sky-900/20 dark:text-sky-400 sm:h-24 sm:w-24 sm:rounded-[2.5rem]",
    title: "text-4xl font-black tracking-tighter leading-[0.88] text-zinc-900 dark:text-zinc-100 uppercase sm:text-6xl xl:text-8xl",
  },
  tabs: {
    layout: "w-full gap-6 xl:grid xl:grid-cols-[280px_minmax(0,1fr)] xl:items-start xl:gap-10",
    rail: "w-full rounded-[2rem] border-2 border-white/60 bg-white/40 p-2 shadow-xl backdrop-blur-3xl dark:border-zinc-800/40 dark:bg-zinc-900/40 sm:rounded-[3rem] sm:p-3 xl:sticky xl:top-8",
    trigger: "flex items-center h-auto cursor-pointer justify-start gap-3 rounded-[1.5rem] border-2 border-transparent px-4 py-3 text-left transition-all duration-300 hover:bg-white/60 dark:hover:bg-zinc-800/60 data-[state=active]:border-white data-[state=active]:bg-white data-[state=active]:shadow-lg dark:data-[state=active]:border-zinc-700 dark:data-[state=active]:bg-zinc-800/80 sm:gap-4 sm:rounded-[2rem] sm:px-5 sm:py-4",
    activeAura: "absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]",
  }
} as const;

export const DOCUMENT_ARTIFACT_STYLES = {
  card: {
    wrapper: "group relative overflow-hidden rounded-[2rem] border-2 border-white/60 bg-white/40 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] dark:border-zinc-800/40 dark:bg-zinc-900/40 sm:rounded-[3rem]",
    layout: "grid gap-0 xl:grid-cols-[1fr_280px]",
    aura: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[100px] -z-10",
    grain: "absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay",
  },
  content: {
    body: "space-y-6 p-8 sm:p-10",
    header: "space-y-3",
    eyebrow: "text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500",
    title: "text-2xl sm:text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none group-hover:tracking-tight transition-all duration-500",
    metaRow: "flex flex-wrap items-center gap-4 text-sm font-bold text-zinc-500 dark:text-zinc-400",
    pill: "inline-flex items-center gap-2 rounded-xl bg-zinc-900/5 dark:bg-white/5 px-4 py-2 border border-zinc-200/50 dark:border-zinc-700/30 backdrop-blur-md",
  },
  preview: {
    shell: "relative hidden xl:flex items-center justify-center p-6 bg-zinc-900/5 dark:bg-white/5 border-l-2 border-white/40 dark:border-zinc-800/40",
    frame: "w-full max-w-[180px] aspect-[1/1.4] rounded-2xl border-2 border-white/80 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-800 overflow-hidden transform group-hover:rotate-2 transition-transform duration-500",
    overlay: "absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity",
  },
  actionDeck: "static px-4 pb-4 pt-0 sm:px-6 sm:pb-6 xl:absolute xl:bottom-6 xl:left-8 xl:right-[300px] xl:p-2 xl:translate-y-[200%] xl:group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] z-50",
  controlBar: "flex items-center justify-between gap-4 rounded-[1.5rem] bg-white/80 dark:bg-zinc-800/80 p-3 backdrop-blur-2xl border-2 border-white dark:border-zinc-700 shadow-2xl",
} as const;

export const DOCUMENT_CARD_STYLES = {
  previewFrame: DOCUMENT_ARTIFACT_STYLES.preview.frame,
  previewPaper:
    "h-full rounded-2xl border-2 border-white/80 bg-white p-3 shadow-2xl dark:border-zinc-700 dark:bg-zinc-800 overflow-hidden",
  previewMuted:
    "text-[10px] font-black uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-500",
} as const;

export const RESUME_DOCUMENT_SECTIONS: Record<
  ResumeDocumentKind,
  { description: string; shortLabel: string; title: string; aura: string }
> = {
  original: {
    title: "Original Resumes",
    description: "Your foundational professional documents.",
    shortLabel: "Source Artifact",
    aura: "from-sky-400/20 via-blue-500/10 to-transparent",
  },
  optimized: {
    title: "Optimized Resumes",
    description: "High-precision iterations refined by AI.",
    shortLabel: "Refined Artifact",
    aura: "from-violet-400/20 via-indigo-500/10 to-transparent",
  },
  built: {
    title: "Built Resumes",
    description: "Artifacts synthesized within the vault.",
    shortLabel: "Synthesized Artifact",
    aura: "from-emerald-400/20 via-teal-500/10 to-transparent",
  },
} as const;

export const DOCUMENT_TAB_META: Record<
  DocumentsTabId,
  { description: string; icon: LucideIcon; label: string; color: string }
> = {
  original: {
    label: "Originals",
    description: "Your source career documents.",
    icon: FileStack,
    color: "text-sky-500",
  },
  optimized: {
    label: "Optimized",
    description: "AI-refined precision versions.",
    icon: Sparkles,
    color: "text-indigo-500",
  },
  built: {
    label: "Synthesized",
    description: "Precision-built vault outputs.",
    icon: FileCheck2,
    color: "text-emerald-500",
  },
  coverLetters: {
    label: "Letters",
    description: "Supporting narrative artifacts.",
    icon: FileText,
    color: "text-amber-500",
  },
} as const;

export const DOCUMENT_TABS = [
  "original",
  "optimized",
  "built",
  "coverLetters",
] as const satisfies DocumentsTabId[];

export const DOCUMENT_OVERVIEW_CARDS: Array<{
  description: string;
  icon: LucideIcon;
  key: keyof import("../types/documents.types").DocumentsOverview;
  title: string;
  color: string;
}> = [
  {
    key: "originalResumes",
    title: "Originals",
    description: "Source artifacts.",
    icon: FileStack,
    color: "from-sky-500 to-blue-600",
  },
  {
    key: "optimizedResumes",
    title: "Optimized",
    description: "Refined versions.",
    icon: Sparkles,
    color: "from-indigo-500 to-violet-600",
  },
  {
    key: "builtResumes",
    title: "Synthesized",
    description: "Vault outputs.",
    icon: FileCheck2,
    color: "from-emerald-500 to-teal-600",
  },
  {
    key: "coverLetters",
    title: "Letters",
    description: "Narrative files.",
    icon: FileText,
    color: "from-amber-500 to-orange-600",
  },
] as const;
