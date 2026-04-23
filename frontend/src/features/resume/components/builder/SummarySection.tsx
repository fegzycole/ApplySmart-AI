import { FileText } from "lucide-react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { SectionHeader } from "./SectionHeader";

export function SummarySection() {
  const { resumeData, updateSummary } = useResumeBuilder();

  return (
    <div className="space-y-4">
      <SectionHeader icon={FileText} title="Professional Summary" />
      <div className="space-y-2">
        <Label htmlFor="summary" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Brief overview of your professional background and key achievements
        </Label>
        <Textarea
          id="summary"
          placeholder="Experienced professional with a strong background in..."
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          className="min-h-[120px] rounded-xl border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-violet-500/20 resize-none transition-all"
          maxLength={500}
        />
        <p className="flex justify-end text-xs text-zinc-500">{resumeData.summary.length} / 500</p>
      </div>
    </div>
  );
}
