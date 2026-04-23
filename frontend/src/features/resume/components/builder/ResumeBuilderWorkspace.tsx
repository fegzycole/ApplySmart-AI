import { BuilderPanel } from "./BuilderPanel";
import { LiveResumePreview } from "./LiveResumePreview";
import { ResumeBuilderFormColumn } from "./ResumeBuilderFormColumn";
import { ResumeBuilderPageHeader } from "./ResumeBuilderPageHeader";
import { ThemeSelector } from "./ThemeSelector";

export function ResumeBuilderWorkspace() {
  return (
    <div className="p-4 lg:p-8 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-violet-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-violet-950/20">
      <div className="max-w-[1800px] mx-auto">
        <ResumeBuilderPageHeader />

        <BuilderPanel className="mb-8">
          <ThemeSelector />
        </BuilderPanel>

        <div className="grid lg:grid-cols-2 gap-8">
          <ResumeBuilderFormColumn />
          <LiveResumePreview />
        </div>
      </div>
    </div>
  );
}
