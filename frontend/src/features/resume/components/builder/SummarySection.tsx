import { FileText } from "lucide-react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { SectionHeader } from "./SectionHeader";

const MAX_CHARS = 5000;

export function SummarySection() {
  const { resumeData, updateSummary } = useResumeBuilder();

  const charCount = resumeData.summary.length;
  const atLimit = charCount >= MAX_CHARS;

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
          maxLength={MAX_CHARS}
        />
        <p className={`flex justify-end text-xs ${atLimit ? "text-red-500" : "text-zinc-500"}`}>
          {charCount} / {MAX_CHARS}
        </p>
      </div>
    </div>
  );
}
