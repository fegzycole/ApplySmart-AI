import { GraduationCap, Plus } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeader icon={GraduationCap} title="Education" />
        <Button
          onClick={addEducation}
          variant="outline"
          size="sm"
          className="w-full sm:w-auto rounded-lg"
        >
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
            <ItemCard
              key={edu.id}
              label={`Education ${index + 1}`}
              onDelete={() => deleteEducation(edu.id)}
            >
              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
                <FormField
                  label="School or Provider"
                  placeholder="Microverse or University Name"
                  value={edu.institution}
                  onChange={(v) => updateEducation(edu.id, { institution: v })}
                />
                <div className="space-y-2">
                  <Label
                    htmlFor={`education-credential-${edu.id}`}
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Credential
                  </Label>
                  <Input
                    id={`education-credential-${edu.id}`}
                    list="education-credential-suggestions"
                    placeholder="Certificate, BS, Bootcamp"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, { degree: e.target.value })
                    }
                    className="h-10 rounded-lg"
                  />
                </div>
                <FormField
                  label="Program or Field of Study"
                  placeholder="Full-Stack Web Development"
                  value={edu.field}
                  onChange={(v) => updateEducation(edu.id, { field: v })}
                />
                <FormField
                  label="Location"
                  placeholder="City, State"
                  value={edu.location}
                  onChange={(v) => updateEducation(edu.id, { location: v })}
                />
                <div className="2xl:col-span-2 space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3 sm:p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">Program Dates</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Show when you started and completed this program.</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <MonthYearPicker
                      label="Start Date"
                      value={edu.startDate}
                      onChange={(v) =>
                        updateEducation(edu.id, { startDate: v })
                      }
                    />
                    <MonthYearPicker
                      label="Completion"
                      value={edu.graduationDate}
                      onChange={(v) =>
                        updateEducation(edu.id, { graduationDate: v })
                      }
                      disabled={edu.current}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Checkbox
                      id={`current-edu-${edu.id}`}
                      checked={edu.current}
                      onCheckedChange={(checked) =>
                        updateEducation(edu.id, { current: checked === true })
                      }
                    />
                    <Label
                      htmlFor={`current-edu-${edu.id}`}
                      className="text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer"
                    >
                      I am currently enrolled
                    </Label>
                  </div>
                </div>
                <FormField
                  label="GPA (Optional)"
                  placeholder="3.8"
                  value={edu.gpa}
                  onChange={(v) => updateEducation(edu.id, { gpa: v })}
                />
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
