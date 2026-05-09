import { TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { 
  SETTINGS_TABS, 
  TERMINAL_STYLES,
  SETTINGS_TAB_META 
} from "../../constants/settings.constants";
import { cn } from "@/shared/lib/utils";

export function SettingsTabs() {
  return (
    <div className={cn(
      TERMINAL_STYLES.rail.wrapper,
      "flex flex-col"
    )}>
      <div className="mb-4 border-b border-zinc-100 px-4 py-2 dark:border-zinc-800">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">System Command</p>
      </div>

      <TabsList className="flex h-auto w-full flex-col items-stretch justify-start gap-2 bg-transparent p-0 sm:gap-3">
        {SETTINGS_TABS.map(({ id, label, icon: Icon }) => {
          const meta = SETTINGS_TAB_META[id];

          return (
            <TabsTrigger
              key={id}
              value={id}
              className={cn(
                TERMINAL_STYLES.rail.trigger,
                "relative group/trigger min-w-0 w-full overflow-hidden px-4 py-3 sm:px-5 sm:py-4"
              )}
            >
              {/* Active Tab Aura Indicator - Only on Desktop */}
              <div className="absolute left-0 top-1/2 h-0 w-1.5 -translate-y-1/2 rounded-r-full bg-sky-500 transition-all duration-300 group-data-[state=active]:h-10 group-data-[state=active]:shadow-[0_0_20px_rgba(14,165,233,0.6)]" />

              <div className={cn(
                "flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300",
                "bg-zinc-50 text-zinc-400 group-hover:bg-white group-hover:text-sky-500 dark:bg-zinc-800/50 dark:group-hover:bg-zinc-800",
                "group-data-[state=active]/trigger:bg-sky-50 group-data-[state=active]/trigger:text-sky-600 dark:group-data-[state=active]/trigger:bg-sky-900/20 dark:group-data-[state=active]/trigger:text-sky-400 shadow-sm"
              )}>
                <Icon className="size-5 sm:size-6" />
              </div>

              <div className="flex flex-col min-w-0 text-left">
                <span className="text-sm sm:text-base font-black tracking-tight text-zinc-500 group-data-[state=active]/trigger:text-zinc-900 dark:group-data-[state=active]/trigger:text-zinc-50 transition-colors truncate">
                  {label}
                </span>
                <span className="hidden sm:block text-[9px] font-black uppercase tracking-widest text-zinc-400 group-data-[state=active]/trigger:text-sky-500/70 transition-colors truncate">
                  {meta?.protocol || "PROTOCOL-00"}
                </span>
              </div>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
