import { GraduationCap, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { SectionHeader } from "./SectionHeader";
import { FormField } from "./FormField";
import { EmptyState } from "./EmptyState";
import { ItemCard } from "./ItemCard";

export function EducationSection() {
  const { resumeData, addEducation, updateEducation, deleteEducation } = useResumeBuilder();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader icon={GraduationCap} title="Education" />
        <Button onClick={addEducation} variant="outline" size="sm" className="rounded-lg">
          <Plus className="size-4 mr-1" />
          Add Education
        </Button>
      </div>

      {resumeData.education.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          message="No education added yet"
          buttonLabel="Add Education"
          onAdd={addEducation}
        />
      ) : (
        <div className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <ItemCard key={edu.id} label={`Education ${index + 1}`} onDelete={() => deleteEducation(edu.id)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Institution" placeholder="University Name" value={edu.institution} onChange={(v) => updateEducation(edu.id, { institution: v })} />
                <FormField label="Degree" placeholder="Bachelor of Science" value={edu.degree} onChange={(v) => updateEducation(edu.id, { degree: v })} />
                <FormField label="Field of Study" placeholder="Computer Science" value={edu.field} onChange={(v) => updateEducation(edu.id, { field: v })} />
                <FormField label="Location" placeholder="City, State" value={edu.location} onChange={(v) => updateEducation(edu.id, { location: v })} />
                <div className="grid grid-cols-2 gap-2">
                  <FormField label="Start Date" placeholder="2016" value={edu.startDate} onChange={(v) => updateEducation(edu.id, { startDate: v })} />
                  <FormField label="Graduation" placeholder="2020" value={edu.graduationDate} onChange={(v) => updateEducation(edu.id, { graduationDate: v })} />
                </div>
                <FormField label="GPA (Optional)" placeholder="3.8" value={edu.gpa} onChange={(v) => updateEducation(edu.id, { gpa: v })} />
              </div>
            </ItemCard>
          ))}
        </div>
      )}
    </div>
  );
}
