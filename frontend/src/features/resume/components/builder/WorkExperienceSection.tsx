import { Briefcase, Plus } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeader icon={Briefcase} title="Work Experience" />
        <Button onClick={addWorkExperience} variant="outline" size="sm" className="w-full sm:w-auto rounded-lg">
          <Plus className="size-4 mr-1" />
          Add Position
        </Button>
      </div>

      {resumeData.workExperience.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          message="No work experience added yet"
          buttonLabel="Add Your First Position"
          onAdd={addWorkExperience}
        />
      ) : (
        <div className="space-y-4">
          {resumeData.workExperience.map((exp, index) => (
            <ItemCard key={exp.id} label={`Position ${index + 1}`} onDelete={() => deleteWorkExperience(exp.id)}>
              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
                <FormField label="Company" placeholder="Company Name" value={exp.company} onChange={(v) => updateWorkExperience(exp.id, { company: v })} />
                <FormField label="Position" placeholder="Job Title" value={exp.position} onChange={(v) => updateWorkExperience(exp.id, { position: v })} />
                <FormField label="Location" placeholder="City, State" value={exp.location} onChange={(v) => updateWorkExperience(exp.id, { location: v })} />
                <div className="2xl:col-span-2 space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3 sm:p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">Employment Dates</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Set the period for this role.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <MonthYearPicker
                      label="Start Date"
                      value={exp.startDate}
                      onChange={(v) => updateWorkExperience(exp.id, { startDate: v })}
                    />
                    <MonthYearPicker
                      label="End Date"
                      value={exp.endDate}
                      onChange={(v) => updateWorkExperience(exp.id, { endDate: v })}
                      disabled={exp.current}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onCheckedChange={(checked) =>
                        updateWorkExperience(exp.id, { current: checked === true })
                      }
                    />
                    <Label htmlFor={`current-${exp.id}`} className="text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer">
                      I currently work here
                    </Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Responsibilities</Label>
                <Textarea
                  placeholder={`• Key achievement or responsibility
• Another important accomplishment
• Quantifiable result with metrics`}
                  value={exp.responsibilities.join("\n")}
                  onChange={(e) => updateWorkExperience(exp.id, { responsibilities: e.target.value.split("\n") })}
                  className="min-h-[100px] rounded-lg resize-none"
                />
                <p className="text-xs text-zinc-500">One responsibility per line</p>
              </div>
            </ItemCard>
          ))}
        </div>
      )}
    </div>
  );
}
