import { Sparkles } from "lucide-react";
import { WorkspacePageHeader } from "@/shared/components/WorkspacePageHeader";

export function OptimizerHeader() {
  return (
    <WorkspacePageHeader
      className="mb-6 lg:mb-8"
      badge="AI-Powered Optimization"
      badgeIcon={Sparkles}
      title="Resume Optimizer"
      description="Pick a saved resume or upload a fresh one, add the job context, and generate a sharper version with stronger role alignment."
    />
  );
}
