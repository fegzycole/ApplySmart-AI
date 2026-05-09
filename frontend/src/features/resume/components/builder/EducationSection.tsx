import { GraduationCap, Plus, Calendar } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { EDUCATION_CREDENTIAL_SUGGESTIONS } from "../../constants/resume-builder.constants";
import { SectionHeader } from "./SectionHeader";
import { FormField } from "./FormField";
import { EmptyState } from "./EmptyState";
import { ItemCard } from "./ItemCard";
import { MonthYearPicker } from "./MonthYearPicker";

export function EducationSection() {
  const { resumeData, addEducation, updateEducation, deleteEducation } =
    useResumeBuilder();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeader icon={GraduationCap} title="Academic Synthesis" stage="Stage 04" />
        <Button
          onClick={addEducation}
          className="h-12 w-full sm:w-auto px-6 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="size-5 mr-2" />
          Add Credentials
        </Button>
      </div>

      {resumeData.education.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          message="No academic vectors synthesized yet."
          buttonLabel="Synthesize Education"
          onAdd={addEducation}
        />
      ) : (
        <div className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <ItemCard
              key={edu.id}
              label={`Academic Vector 0${index + 1}`}
              onDelete={() => deleteEducation(edu.id)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  label="Institutional Entity"
                  placeholder="Microverse or University Name"
                  value={edu.institution}
                  onChange={(v) => updateEducation(edu.id, { institution: v })}
                />

                <div className="space-y-2 group">
                  <Label
                    htmlFor={`education-credential-${edu.id}`}
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 ml-1 transition-all group-focus-within:text-primary group-focus-within:tracking-[0.4em]"
                  >
                    Credential Type
                  </Label>
                  <Input
                    id={`education-credential-${edu.id}`}
                    list="education-credential-suggestions"
                    placeholder="Certificate, BS, Bootcamp"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, { degree: e.target.value })
                    }
                    className="h-13 sm:h-14 rounded-2xl border-2 border-border/50 bg-background/50 px-4 sm:px-6 text-sm leading-relaxed backdrop-blur-2xl transition-all duration-300 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 shadow-inner"
                  />
                </div>

                <FormField
                  label="Field of Synthesis"
                  placeholder="Full-Stack Web Development"
                  value={edu.field}
                  onChange={(v) => updateEducation(edu.id, { field: v })}
                />

                <FormField
                  label="Operational Location"
                  placeholder="City, State"
                  value={edu.location}
                  onChange={(v) => updateEducation(edu.id, { location: v })}
                />

                <FormField
                  label="Performance Metric (GPA)"
                  placeholder="3.8"
                  value={edu.gpa}
                  onChange={(v) => updateEducation(edu.id, { gpa: v })}
                />
              </div>

              <div className="space-y-4 sm:space-y-5 lg:space-y-6 rounded-[1.5rem] border-2 border-border/50 bg-card/50 p-4 sm:rounded-[2rem] sm:p-6 lg:rounded-[2.5rem] lg:p-8 backdrop-blur-2xl transition-all group-hover:bg-card/80">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-lg shadow-primary/5 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Calendar className="size-4 sm:size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-tight text-foreground">Program Timeline</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Temporal duration for this credential</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <MonthYearPicker
                    label="Synthesis Start"
                    value={edu.startDate}
                    onChange={(v) => updateEducation(edu.id, { startDate: v })}
                  />
                  <MonthYearPicker
                    label="Synthesis Completion"
                    value={edu.graduationDate}
                    onChange={(v) => updateEducation(edu.id, { graduationDate: v })}
                    disabled={edu.current}
                  />
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <Checkbox
                    id={`current-edu-${edu.id}`}
                    checked={edu.current}
                    onCheckedChange={(checked) =>
                      updateEducation(edu.id, { current: checked === true })
                    }
                    className="h-6 w-6 rounded-lg border-2 border-primary/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor={`current-edu-${edu.id}`}
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 cursor-pointer hover:text-primary transition-colors"
                  >
                    Active Enrollment • Currently Synthesis Target
                  </Label>
                </div>
              </div>
            </ItemCard>
          ))}
        </div>
      )}
      <datalist id="education-credential-suggestions">
        {EDUCATION_CREDENTIAL_SUGGESTIONS.map((credential) => (
          <option key={credential} value={credential} />
        ))}
      </datalist>
    </div>
  );
}
