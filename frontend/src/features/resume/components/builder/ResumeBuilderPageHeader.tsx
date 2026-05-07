import { RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { WorkspacePageHeader } from "@/shared/components/WorkspacePageHeader";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";

export function ResumeBuilderPageHeader() {
  const { resetResumeData } = useResumeBuilder();

  const handleResetDraft = () => {
    resetResumeData();
    toast.success("Resume builder draft cleared.");
  };

  return (
    <WorkspacePageHeader
      className="mb-6 lg:mb-8"
      badge="Live Preview Builder"
      badgeIcon={Sparkles}
      title="Create Your Perfect Resume"
      description="Choose a template, fill in your details, and watch your resume come to life instantly."
      actions={(
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl border-zinc-300 bg-white/80 px-5 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/70 dark:hover:bg-zinc-900 sm:w-auto"
          onClick={handleResetDraft}
        >
          <RotateCcw className="size-4" />
          Reset Draft
        </Button>
      )}
    />
  );
}
