import { FolderOpen, Upload } from "lucide-react";
import { TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
const SOURCE_OPTIONS: Array<{
  description: string;
  icon: typeof Upload;
  label: string;
  value: "upload" | "existing";
}> = [
  {
    value: "upload",
    label: "Upload New Resume",
    description: "Bring in a fresh PDF or DOCX file.",
    icon: Upload,
  },
  {
    value: "existing",
    label: "Use Existing Resume",
    description: "Pick from resumes already saved in your workspace.",
    icon: FolderOpen,
  },
];

export function ResumeSourceTabs() {
  return (
    <div className="rounded-[1.5rem] border border-zinc-200/80 bg-white/80 p-2 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/70">
      <TabsList className="grid h-auto w-full grid-cols-1 gap-2 bg-transparent p-0 sm:grid-cols-2">
        {SOURCE_OPTIONS.map(({ value, label, description, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="h-auto min-w-0 items-start justify-start whitespace-normal rounded-[1.1rem] border border-transparent px-4 py-4 text-left hover:border-zinc-200 hover:bg-zinc-50/80 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/60 data-[state=active]:border-violet-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-50 data-[state=active]:to-cyan-50 data-[state=active]:shadow-sm dark:data-[state=active]:border-violet-900 dark:data-[state=active]:from-violet-950/40 dark:data-[state=active]:to-cyan-950/20"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-5 break-words text-zinc-900 dark:text-white">
                  {label}
                </div>
                <div className="mt-1 text-xs leading-5 break-words text-zinc-500 dark:text-zinc-400">
                  {description}
                </div>
              </div>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
