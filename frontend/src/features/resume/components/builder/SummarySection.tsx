import { FileText, Sparkles } from "lucide-react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/shared/lib/utils";

const MAX_CHARS = 5000;

export function SummarySection() {
  const { resumeData, updateSummary } = useResumeBuilder();

  const charCount = resumeData.summary.length;
  const atLimit = charCount >= MAX_CHARS;

  return (
    <div className="space-y-5 sm:space-y-6">
      <SectionHeader icon={FileText} title="Professional Summary" stage="Stage 02" />
      
      <div className="space-y-4 group">
        <div className="flex items-center justify-between">
          <Label 
            htmlFor="summary" 
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 ml-1 transition-all group-focus-within:text-primary group-focus-within:tracking-[0.4em]"
          >
            Synthesis Strategy: Executive Narrative
          </Label>
          <div className={cn(
            "flex items-center gap-2 text-[10px] font-bold tabular-nums px-3 py-1.5 rounded-full transition-all duration-300",
            atLimit ? "bg-destructive/10 text-destructive shadow-lg shadow-destructive/10" : "bg-muted/50 text-muted-foreground group-focus-within:bg-primary group-focus-within:text-primary-foreground group-focus-within:shadow-lg group-focus-within:shadow-primary/20"
          )}>
            <Sparkles className="size-3" />
            {charCount} / {MAX_CHARS}
          </div>
        </div>

        <div className="relative">
          <Textarea
            id="summary"
            placeholder="Engineer a high-impact summary of your professional trajectory and core competencies..."
            value={resumeData.summary}
            onChange={(e) => updateSummary(e.target.value)}
            className="min-h-[160px] resize-none rounded-[1.5rem] border-2 border-border/50 bg-background/50 p-4 text-sm leading-relaxed shadow-inner backdrop-blur-2xl transition-all duration-300 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 sm:min-h-[200px] sm:rounded-[2rem] sm:p-6 lg:rounded-[2.5rem] lg:p-8"
            maxLength={MAX_CHARS}
          />
        </div>
        
        <div className="ml-1 flex items-start gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
          <p className="text-[10px] font-bold uppercase leading-[1.1] tracking-[0.22em] text-muted-foreground/40">
            Pro-tip: Focus on quantifiable achievements and key technology stacks.
          </p>
        </div>
      </div>
    </div>
  );
}
