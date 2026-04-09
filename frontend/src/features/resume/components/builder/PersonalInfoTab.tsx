import { Sparkles } from "lucide-react";
import { BuilderSectionWrapper } from "./BuilderSectionWrapper";
import { SectionHeader } from "./SectionHeader";
import { FormInputWithGlow } from "./FormInputWithGlow";
import { FormTextareaWithGlow } from "./FormTextareaWithGlow";
import { PERSONAL_INFO_FIELDS, CONTACT_FIELDS, SECTION_CONFIGS } from "../../constants/resume-builder.constants";

export function PersonalInfoTab() {
  const contactConfig = SECTION_CONFIGS.contactInfo;
  const summaryConfig = SECTION_CONFIGS.summary;

  return (
    <div className="space-y-5 mt-6">
      <BuilderSectionWrapper gradient={contactConfig.gradient} border={contactConfig.border}>
        <SectionHeader icon={contactConfig.icon} title={contactConfig.title} />
        <div className="space-y-4">
          {PERSONAL_INFO_FIELDS.map((field) => (
            <FormInputWithGlow key={field.id} {...field} focusColor="violet" />
          ))}
          <div className="grid grid-cols-2 gap-4">
            {CONTACT_FIELDS.map((field) => (
              <FormInputWithGlow key={field.id} {...field} focusColor="violet" />
            ))}
          </div>
          <FormInputWithGlow
            id="location"
            label="Location"
            placeholder="San Francisco, CA"
            focusColor="violet"
          />
        </div>
      </BuilderSectionWrapper>

      <BuilderSectionWrapper gradient={summaryConfig.gradient} border={summaryConfig.border}>
        <SectionHeader icon={Sparkles} title={summaryConfig.title} iconColor="text-cyan-600 dark:text-cyan-400" />
        <FormTextareaWithGlow
          id="summary"
          label="Tell us about yourself"
          placeholder="Results-driven professional with X years of experience in..."
          focusColor="cyan"
        />
      </BuilderSectionWrapper>
    </div>
  );
}
