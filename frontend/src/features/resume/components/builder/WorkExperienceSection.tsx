import { Briefcase, Plus } from "lucide-react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { SectionHeader } from "./SectionHeader";
import { FormField } from "./FormField";
import { EmptyState } from "./EmptyState";
import { ItemCard } from "./ItemCard";

export function WorkExperienceSection() {
  const { resumeData, addWorkExperience, updateWorkExperience, deleteWorkExperience } = useResumeBuilder();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader icon={Briefcase} title="Work Experience" />
        <Button onClick={addWorkExperience} variant="outline" size="sm" className="rounded-lg">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Company" placeholder="Company Name" value={exp.company} onChange={(v) => updateWorkExperience(exp.id, { company: v })} />
                <FormField label="Position" placeholder="Job Title" value={exp.position} onChange={(v) => updateWorkExperience(exp.id, { position: v })} />
                <FormField label="Location" placeholder="City, State" value={exp.location} onChange={(v) => updateWorkExperience(exp.id, { location: v })} />
                <div className="grid grid-cols-2 gap-2">
                  <FormField label="Start Date" placeholder="Jan 2020" value={exp.startDate} onChange={(v) => updateWorkExperience(exp.id, { startDate: v })} />
                  <FormField label="End Date" placeholder="Present" value={exp.endDate} onChange={(v) => updateWorkExperience(exp.id, { endDate: v })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Responsibilities</Label>
                <Textarea
                  placeholder="• Key achievement or responsibility&#10;• Another important accomplishment&#10;• Quantifiable result with metrics"
                  value={exp.responsibilities.join("\n")}
                  onChange={(e) => updateWorkExperience(exp.id, { responsibilities: e.target.value.split("\n").filter(Boolean) })}
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
