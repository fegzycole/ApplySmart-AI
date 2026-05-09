import { User, CreditCard, Shield } from "lucide-react";
import { type SettingsTab } from "../types/settings.types";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";

const ALL_TABS: SettingsTab[] = [
  { id: "profile", label: "Identity", icon: User },
  { id: "billing", label: "Infrastructure", icon: CreditCard },
  { id: "security", label: "Encryption", icon: Shield },
];

export const SETTINGS_TABS: SettingsTab[] = ALL_TABS.filter(
  tab => tab.id !== "billing" || FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED
);

export const TERMINAL_STYLES = {
  header: {
    container: "relative flex flex-col items-center text-center space-y-6 border-b border-zinc-100 pb-10 dark:border-zinc-800 sm:space-y-10 sm:pb-16",
    glow: "absolute top-0 left-1/2 -z-10 h-48 w-full max-w-4xl -translate-x-1/2 bg-gradient-to-b from-sky-50/50 to-transparent blur-3xl dark:from-sky-900/10 sm:h-64",
    iconWrapper: "relative flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-sky-50 text-sky-600 shadow-sm dark:bg-sky-900/20 dark:text-sky-400 sm:h-24 sm:w-24 sm:rounded-[2.5rem]",
    title: "text-4xl font-black tracking-tighter leading-[0.88] text-zinc-900 dark:text-zinc-100 uppercase sm:text-6xl xl:text-8xl",
  },
  rail: {
    layout: "w-full gap-6 xl:grid xl:grid-cols-[280px_minmax(0,1fr)] xl:items-start xl:gap-10",
    wrapper: "w-full rounded-[2rem] border-2 border-white/60 bg-white/40 p-2 shadow-xl backdrop-blur-3xl dark:border-zinc-800/40 dark:bg-zinc-900/40 sm:rounded-[3rem] sm:p-3 xl:sticky xl:top-8",
    trigger: "flex items-center group relative h-auto cursor-pointer justify-start gap-4 rounded-[1.5rem] border-2 border-transparent px-4 py-3 text-left transition-all duration-300 hover:bg-white/60 dark:hover:bg-zinc-800/60 data-[state=active]:border-white data-[state=active]:bg-white data-[state=active]:shadow-lg dark:data-[state=active]:border-zinc-700 dark:data-[state=active]:bg-zinc-800/80 sm:gap-4 sm:rounded-[2rem] sm:px-5 sm:py-4",
    activeAura: "absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 bg-sky-500 rounded-r-full transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.6)]",
  }
} as const;

export const MODULE_ARTIFACT_STYLES = {
  panel: "group relative overflow-hidden rounded-[2rem] border-2 border-white/60 bg-white/40 shadow-2xl backdrop-blur-3xl transition-all duration-500 hover:-translate-y-1 dark:border-zinc-800/40 dark:bg-zinc-900/40 sm:rounded-[3rem]",
  body: "space-y-8 p-5 sm:space-y-10 sm:p-8 xl:p-12",
  header: "flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6",
  iconWrapper: "relative flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-xl shadow-zinc-900/20 dark:bg-sky-600 sm:h-16 sm:w-16",
  title: "text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none",
  label: "text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 ml-1 transition-all group-focus-within:text-sky-600 group-focus-within:tracking-[0.4em]",
  input: "h-13 min-w-0 rounded-2xl border-2 border-zinc-100 bg-white/50 px-4 text-sm font-bold leading-relaxed shadow-inner backdrop-blur-2xl transition-all duration-300 focus-visible:border-sky-500 focus-visible:ring-4 focus-visible:ring-sky-500/5 dark:border-zinc-800 dark:bg-zinc-950/50 dark:focus-visible:border-sky-500 sm:h-14 sm:px-6",
} as const;

export const SETTINGS_TAB_META: Record<string, { description: string; protocol: string }> = {
  profile: {
    description: "Identity Vector Calibration",
    protocol: "BIO-IDENT-01",
  },
  billing: {
    description: "Resource Infrastructure",
    protocol: "SUBSCR-DATA-02",
  },
  security: {
    description: "Encryption & Access",
    protocol: "SECURE-AUTH-03",
  },
};
