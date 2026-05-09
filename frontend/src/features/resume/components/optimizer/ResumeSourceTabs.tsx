import { Upload, Microscope, Database } from "lucide-react";
import { TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { cn } from "@/shared/lib/utils";

const SOURCE_OPTIONS: Array<{
  description: string;
  icon: typeof Upload;
  label: string;
  value: "upload" | "existing";
}> = [
  {
    value: "upload",
    label: "Inject External Artifact",
    description: "Upload a fresh PDF or DOCX specimen.",
    icon: Microscope,
  },
  {
    value: "existing",
    label: "Select Vault Artifact",
    description: "Pick from your secure career archive.",
    icon: Database,
  },
];

export function ResumeSourceTabs() {
  return (
    <div className="rounded-[2.5rem] border-2 border-white/60 bg-white/20 p-2 shadow-xl backdrop-blur-3xl dark:border-zinc-800/60 dark:bg-zinc-900/40">
      <TabsList className="grid h-auto w-full grid-cols-1 gap-2 bg-transparent p-0 sm:grid-cols-2">
        {SOURCE_OPTIONS.map(({ value, label, description, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className={cn(
              "group relative h-auto min-w-0 items-start justify-start whitespace-normal rounded-[1.75rem] border-2 border-transparent px-6 py-6 text-left transition-all duration-500",
              "hover:bg-white/60 dark:hover:bg-zinc-800/60",
              "data-[state=active]:border-white data-[state=active]:bg-white data-[state=active]:shadow-2xl dark:data-[state=active]:border-zinc-700 dark:data-[state=active]:bg-zinc-800/80"
            )}
          >
            {/* Active Aura Indicator */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-sky-500 rounded-r-full transition-all duration-500 group-data-[state=active]:h-12 group-data-[state=active]:shadow-[0_0_20px_rgba(14,165,233,0.6)]" />

            <div className="flex min-w-0 items-center gap-5">
              <div className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-500",
                "bg-zinc-50 text-zinc-400 dark:bg-zinc-900/50 group-hover:bg-white group-hover:text-sky-500",
                "group-data-[state=active]:bg-sky-50 group-data-[state=active]:text-sky-600 dark:group-data-[state=active]:bg-sky-900/20 dark:group-data-[state=active]:text-sky-400 shadow-sm"
              )}>
                <Icon className="size-7" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-black tracking-tight text-zinc-500 group-data-[state=active]:text-zinc-900 dark:group-data-[state=active]:text-zinc-50 transition-colors uppercase leading-none">
                  {label}
                </div>
                <div className="mt-1.5 text-xs font-bold uppercase tracking-widest text-zinc-400 group-data-[state=active]:text-sky-500/70 transition-colors">
                  {description.split(' ')[0]} Protocol
                </div>
              </div>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
