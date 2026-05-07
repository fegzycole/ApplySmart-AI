import { User, CreditCard, Shield } from "lucide-react";
import { type SettingsTab } from "../types/settings.types";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";

const ALL_TABS: SettingsTab[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
];

export const SETTINGS_TABS: SettingsTab[] = ALL_TABS.filter(
  tab => tab.id !== "billing" || FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED
);

export const SETTINGS_TAB_LIST_STYLES = {
  wrapper: "w-full rounded-[1.75rem] border border-zinc-200/80 bg-white/80 p-2 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/75 lg:sticky lg:top-6",
  list: "flex h-auto w-full flex-col items-stretch justify-start gap-2 bg-transparent p-0",
  trigger: "h-auto cursor-pointer justify-start gap-3 rounded-2xl border border-transparent px-4 py-3 text-left transition-colors hover:border-zinc-200 hover:bg-zinc-50/80 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/60 data-[state=active]:border-violet-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-50 data-[state=active]:to-cyan-50 data-[state=active]:text-zinc-950 data-[state=active]:shadow-sm dark:data-[state=active]:border-violet-900 dark:data-[state=active]:from-violet-950/40 dark:data-[state=active]:to-cyan-950/20 dark:data-[state=active]:text-zinc-50",
  icon: "size-4",
  label: "font-medium",
} as const;
