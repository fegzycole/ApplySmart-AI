import { User } from "lucide-react";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { SectionHeader } from "./SectionHeader";
import { FormField } from "./FormField";
import { PERSONAL_INFO_FIELDS } from "../../constants/resume-builder.constants";

export function PersonalInfoSection() {
  const { resumeData, updatePersonalInfo } = useResumeBuilder();

  return (
    <div className="space-y-8">
      <SectionHeader icon={User} title="Personal Information" stage="Stage 01" />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-5 xl:gap-x-8 xl:gap-y-6">
        {PERSONAL_INFO_FIELDS.map((field) => (
          <FormField
            key={field.key}
            id={field.key}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            icon={field.icon}
            value={resumeData.personalInfo[field.key]}
            onChange={(v) => updatePersonalInfo({ [field.key]: v })}
          />
        ))}
      </div>
    </div>
  );
}
