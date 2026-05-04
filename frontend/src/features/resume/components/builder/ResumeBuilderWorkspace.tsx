import { BuilderPanel } from "./BuilderPanel";
import { LiveResumePreview } from "./LiveResumePreview";
import { ResumeBuilderFormColumn } from "./ResumeBuilderFormColumn";
import { ResumeBuilderPageHeader } from "./ResumeBuilderPageHeader";
import { ThemeSelector } from "./ThemeSelector";

export function ResumeBuilderWorkspace() {
  return (
    <div className="min-w-0 overflow-x-hidden px-2 py-3 sm:px-4 sm:py-6 lg:p-8 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-violet-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-violet-950/20">
      <div className="max-w-[1800px] mx-auto">
        <ResumeBuilderPageHeader />

        <BuilderPanel className="mb-6 lg:mb-8">
          <ThemeSelector />
        </BuilderPanel>

        <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start xl:gap-8">
          <ResumeBuilderFormColumn />
          <LiveResumePreview />
        </div>
      </div>
    </div>
  );
}
