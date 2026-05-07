import { FileCheck2, FileStack, FileText, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DocumentsTabId, ResumeDocumentKind } from "../types/documents.types";

export const DOCUMENTS_PAGE_STYLES = {
  container: "overflow-x-hidden p-4 sm:p-6 lg:p-8",
  wrapper: "mx-auto flex max-w-7xl flex-col gap-6 lg:gap-8",
  overviewGrid: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
  sectionGrid: "grid gap-5",
} as const;

export const DOCUMENT_CARD_STYLES = {
  card: "overflow-hidden rounded-[1.5rem] border border-zinc-200/80 bg-white/85 shadow-xl shadow-zinc-200/40 backdrop-blur-xl transition-colors dark:border-zinc-800 dark:bg-zinc-950/80 dark:shadow-black/20",
  layout: "grid gap-0 lg:grid-cols-[minmax(0,1fr)_15rem]",
  body: "space-y-4 p-4 sm:p-5",
  header: "space-y-2.5 pb-0",
  eyebrow:
    "text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400",
  title:
    "text-lg font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white sm:text-xl",
  subtitle: "text-sm leading-5 text-zinc-600 dark:text-zinc-400",
  metaRow: "flex flex-wrap gap-2 text-sm text-zinc-500 dark:text-zinc-400",
  metaPill:
    "inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300",
  footer: "border-t border-zinc-200/80 pt-3 dark:border-zinc-800/80",
  previewShell:
    "border-t border-zinc-200/80 bg-zinc-50/70 p-3 dark:border-zinc-800 dark:bg-zinc-950/60 lg:flex lg:items-center lg:justify-center lg:border-l lg:border-t-0",
  previewFrame:
    "mx-auto w-full max-w-[12.5rem] overflow-hidden rounded-[1rem] border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950",
  previewPaper:
    "mx-auto flex h-[15.5rem] w-full max-w-[12.5rem] flex-col overflow-hidden rounded-[1rem] border border-zinc-200/80 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950",
  previewMuted:
    "text-xs uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500",
} as const;

export const RESUME_DOCUMENT_SECTIONS: Record<
  ResumeDocumentKind,
  { description: string; shortLabel: string; title: string }
> = {
  original: {
    title: "Original Resumes",
    description: "Uploaded source resumes you can optimize, edit, or download.",
    shortLabel: "Original resume",
  },
  optimized: {
    title: "Optimized Resumes",
    description: "AI-refined resumes ready for stronger ATS and role alignment.",
    shortLabel: "Optimized resume",
  },
  built: {
    title: "Built Resumes",
    description: "Structured resumes created directly in the builder workflow.",
    shortLabel: "Built resume",
  },
} as const;

export const DOCUMENT_TAB_META: Record<
  DocumentsTabId,
  { description: string; icon: LucideIcon; label: string }
> = {
  original: {
    label: "Original Resumes",
    description: "Uploaded source files and text resumes.",
    icon: FileStack,
  },
  optimized: {
    label: "Optimized Resumes",
    description: "AI-refined versions saved from optimization runs.",
    icon: Sparkles,
  },
  built: {
    label: "Built Resumes",
    description: "Resumes created directly in the builder.",
    icon: FileCheck2,
  },
  coverLetters: {
    label: "Cover Letters",
    description: "Generated cover letters saved in your workspace.",
    icon: FileText,
  },
} as const;

export const DOCUMENT_TABS = [
  "original",
  "optimized",
  "built",
  "coverLetters",
] as const satisfies DocumentsTabId[];

export const DOCUMENT_TAB_STYLES = {
  layout: "w-full gap-4 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start lg:gap-6",
  rail: "w-full rounded-[1.75rem] border border-zinc-200/80 bg-white/80 p-2 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/75 lg:sticky lg:top-6",
  list: "flex h-auto w-full flex-col items-stretch justify-start gap-2 bg-transparent p-0",
  trigger: "h-auto cursor-pointer justify-start gap-3 rounded-2xl border border-transparent px-4 py-3 text-left transition-colors hover:border-zinc-200 hover:bg-zinc-50/80 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/60 data-[state=active]:border-violet-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-50 data-[state=active]:to-cyan-50 data-[state=active]:text-zinc-950 data-[state=active]:shadow-sm dark:data-[state=active]:border-violet-900 dark:data-[state=active]:from-violet-950/40 dark:data-[state=active]:to-cyan-950/20 dark:data-[state=active]:text-zinc-50",
  icon: "size-4 shrink-0",
  label: "font-medium",
  count: "ml-auto inline-flex min-w-8 items-center justify-center rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
} as const;

export const DOCUMENT_OVERVIEW_CARDS: Array<{
  description: string;
  icon: LucideIcon;
  key: keyof import("../types/documents.types").DocumentsOverview;
  title: string;
}> = [
  {
    key: "originalResumes",
    title: "Original Resumes",
    description: "Source files you uploaded into the system.",
    icon: FileStack,
  },
  {
    key: "optimizedResumes",
    title: "Optimized Resumes",
    description: "Resumes enhanced for specific applications.",
    icon: Sparkles,
  },
  {
    key: "builtResumes",
    title: "Built Resumes",
    description: "Resumes authored directly inside the builder.",
    icon: FileCheck2,
  },
  {
    key: "coverLetters",
    title: "Cover Letters",
    description: "Generated letters ready to download or remove.",
    icon: FileText,
  },
] as const;
