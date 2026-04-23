import { User } from "lucide-react";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { SectionHeader } from "./SectionHeader";
import { FormField } from "./FormField";
import { PERSONAL_INFO_FIELDS } from "../../constants/resume-builder.constants";

export function PersonalInfoSection() {
  const { resumeData, updatePersonalInfo } = useResumeBuilder();

  return (
    <div className="space-y-4">
      <SectionHeader icon={User} title="Personal Information" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
