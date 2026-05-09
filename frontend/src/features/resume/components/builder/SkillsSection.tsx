import { Code, Plus, X, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { hasSkill, normalizeSkill } from "../../utils/resume-builder-skills";
import { SectionHeader } from "./SectionHeader";

export function SkillsSection() {
  const { resumeData, updateSkills } = useResumeBuilder();
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const skill = normalizeSkill(newSkill);
    if (!skill) return;

    if (hasSkill(resumeData.skills, skill)) {
      toast.error("That component is already in your synthesis list.");
      return;
    }

    updateSkills([...resumeData.skills, skill]);
    setNewSkill("");
  };

  const removeSkill = (index: number) => {
    updateSkills(resumeData.skills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <SectionHeader icon={Code} title="Core Competencies" stage="Stage 05" />

      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end group">
          <div className="flex-1 space-y-4">
            <Label 
              htmlFor="new-skill" 
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 ml-1 transition-all group-focus-within:text-primary group-focus-within:tracking-[0.4em]"
            >
              Add Core Skill Vector
            </Label>
            <Input
              id="new-skill"
              placeholder="e.g., React, Synthesis, Strategic Alignment"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
              className="h-14 rounded-2xl border-2 border-border/50 bg-background/50 px-6 text-sm leading-relaxed backdrop-blur-2xl transition-all duration-300 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 shadow-inner"
            />
          </div>
          <Button 
            onClick={addSkill} 
            className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="size-5 mr-2" />
            Add Vector
          </Button>
        </div>

        {resumeData.skills.length > 0 ? (
          <div className="flex flex-wrap gap-3 rounded-[2rem] border-2 border-border/50 bg-card/30 p-4 shadow-inner backdrop-blur-xl sm:gap-4 sm:rounded-[2.5rem] sm:p-8">
            {resumeData.skills.map((skill, index) => (
              <Badge 
                key={index} 
                className="group px-5 py-2.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-sm font-bold transition-all hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              >
                <Zap className="size-3.5 mr-2.5 transition-transform group-hover:rotate-12" />
                {skill}
                <button 
                  onClick={() => removeSkill(index)} 
                  className="ml-4 h-6 w-6 rounded-lg flex items-center justify-center hover:bg-background/20 transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <div className="group flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-border/50 bg-background/20 py-14 transition-all hover:bg-background/40 sm:rounded-[2.5rem] sm:py-24">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-muted/50 text-muted-foreground/30 transition-all group-hover:scale-110 group-hover:rotate-6 sm:mb-8 sm:h-20 sm:w-20">
              <Code className="size-8 sm:size-10" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30">
              No skill vectors synthesized yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
