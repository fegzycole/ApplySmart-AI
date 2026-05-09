import { Briefcase, Plus, Calendar } from "lucide-react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { SectionHeader } from "./SectionHeader";
import { FormField } from "./FormField";
import { EmptyState } from "./EmptyState";
import { ItemCard } from "./ItemCard";
import { MonthYearPicker } from "./MonthYearPicker";

export function WorkExperienceSection() {
  const { resumeData, addWorkExperience, updateWorkExperience, deleteWorkExperience } = useResumeBuilder();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeader icon={Briefcase} title="Work Experience" stage="Stage 03" />
        <Button 
          onClick={addWorkExperience} 
          className="h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="size-5 mr-2" />
          Add Experience
        </Button>
      </div>

      {resumeData.workExperience.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          message="No professional milestones synthesized yet."
          buttonLabel="Synthesize Your First Role"
          onAdd={addWorkExperience}
        />
      ) : (
        <div className="space-y-6">
          {resumeData.workExperience.map((exp, index) => (
            <ItemCard key={exp.id} label={`Experience Vector 0${index + 1}`} onDelete={() => deleteWorkExperience(exp.id)}>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <FormField label="Organization" placeholder="Company Name" value={exp.company} onChange={(v) => updateWorkExperience(exp.id, { company: v })} />
                <FormField label="Designation" placeholder="Job Title" value={exp.position} onChange={(v) => updateWorkExperience(exp.id, { position: v })} />
                <FormField label="Operational Region" placeholder="City, State" value={exp.location} onChange={(v) => updateWorkExperience(exp.id, { location: v })} />
                
                <div className="xl:col-span-2 space-y-6 rounded-[2.5rem] border-2 border-border/50 bg-card/50 p-8 backdrop-blur-2xl transition-all group-hover:bg-card/80">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-lg shadow-primary/5">
                      <Calendar className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold tracking-tight text-foreground">Timeline Calibration</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Temporal alignment for this role</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <MonthYearPicker
                      label="Start Vector"
                      value={exp.startDate}
                      onChange={(v) => updateWorkExperience(exp.id, { startDate: v })}
                    />
                    <MonthYearPicker
                      label="End Vector"
                      value={exp.endDate}
                      onChange={(v) => updateWorkExperience(exp.id, { endDate: v })}
                      disabled={exp.current}
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onCheckedChange={(checked) =>
                        updateWorkExperience(exp.id, { current: checked === true })
                      }
                      className="h-6 w-6 rounded-lg border-2 border-primary/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label 
                      htmlFor={`current-${exp.id}`} 
                      className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 cursor-pointer hover:text-primary transition-colors"
                    >
                      Active Role • Currently Synthesis Target
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4 group">
                <Label className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 ml-1 transition-all group-focus-within:text-primary group-focus-within:tracking-[0.4em]">
                  Synthesized Responsibilities & Achievements
                </Label>
                <Textarea
                  placeholder={`• Spearheaded high-impact initiatives...
• Synthesized complex data sets to...
• Calibrated system architectures for...`}
                  value={exp.responsibilities.join("\n")}
                  onChange={(e) => updateWorkExperience(exp.id, { responsibilities: e.target.value.split("\n") })}
                  className="min-h-[200px] rounded-[2.5rem] border-2 border-border/50 bg-background/50 p-8 text-sm leading-relaxed backdrop-blur-2xl transition-all duration-300 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 resize-none shadow-inner"
                />
                <div className="flex items-center gap-2 ml-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                    Synthesize each milestone on a new line for optimal rendering.
                  </p>
                </div>
              </div>
            </ItemCard>
          ))}
        </div>
      )}
    </div>
  );
}
