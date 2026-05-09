import { TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { cn } from "@/shared/lib/utils";
import {
  DOCUMENT_TAB_META,
  VAULT_STYLES,
} from "../constants/documents.constants";
import type { DocumentsTabDefinition } from "../types/documents.types";

interface DocumentsTabsProps {
  tabs: DocumentsTabDefinition[];
}

export function DocumentsTabs({ tabs }: DocumentsTabsProps) {
  return (
    <div className={cn(
      VAULT_STYLES.tabs.rail,
      "flex flex-col"
    )}>
      <div className="mb-4 border-b border-zinc-100 px-4 py-2 dark:border-zinc-800">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Vault Navigation</p>
      </div>
      
      <TabsList className="flex h-auto w-full flex-col items-stretch justify-start gap-2 bg-transparent p-0 sm:gap-3">
        {tabs.map(({ id, label, count }) => {
          const meta = DOCUMENT_TAB_META[id];
          const Icon = meta.icon;

          return (
            <TabsTrigger 
              key={id} 
              value={id} 
              className={cn(
                VAULT_STYLES.tabs.trigger,
                "relative group/trigger min-w-0 w-full overflow-hidden px-4 py-3 sm:px-5 sm:py-4"
              )}
            >
              {/* Active Tab Aura Indicator - Only on Desktop Rail */}
              <div className="absolute left-0 top-1/2 h-0 w-1.5 -translate-y-1/2 rounded-r-full bg-sky-500 transition-all duration-300 group-data-[state=active]/trigger:h-10 group-data-[state=active]/trigger:shadow-[0_0_20px_rgba(14,165,233,0.6)]" />
              
              <div className={cn(
                "flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300",
                "bg-zinc-50 text-zinc-400 group-hover/trigger:bg-white group-hover/trigger:text-sky-500 dark:bg-zinc-800/50 dark:group-hover/trigger:bg-zinc-800",
                "group-data-[state=active]/trigger:bg-sky-50 group-data-[state=active]/trigger:text-sky-600 dark:group-data-[state=active]/trigger:bg-sky-900/20 dark:group-data-[state=active]/trigger:text-sky-400 shadow-sm"
              )}>
                <Icon className="size-5 sm:size-6" />
              </div>

              <div className="flex flex-col min-w-0 text-left">
                <span className="text-sm sm:text-base font-black tracking-tight text-zinc-500 group-data-[state=active]/trigger:text-zinc-900 dark:group-data-[state=active]/trigger:text-zinc-50 transition-colors truncate">
                  {label}
                </span>
                <span className="hidden sm:block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-data-[state=active]/trigger:text-sky-500/70 transition-colors truncate">
                  {meta.description.split(' ')[0]} Sector
                </span>
              </div>

              <div className={cn(
                "ml-auto flex h-6 w-6 sm:h-8 sm:min-w-8 items-center justify-center rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black transition-all duration-300",
                "bg-zinc-50 text-zinc-400 dark:bg-zinc-800/50",
                "group-data-[state=active]/trigger:bg-zinc-900 group-data-[state=active]/trigger:text-white dark:group-data-[state=active]/trigger:bg-sky-600 shadow-sm"
              )}>
                {count}
              </div>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
