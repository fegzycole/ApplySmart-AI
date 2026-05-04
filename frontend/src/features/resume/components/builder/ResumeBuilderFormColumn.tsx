import { BuilderPanel } from "./BuilderPanel";
import { EducationSection } from "./EducationSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { SkillsSection } from "./SkillsSection";
import { SummarySection } from "./SummarySection";
import { WorkExperienceSection } from "./WorkExperienceSection";

export function ResumeBuilderFormColumn() {
  return (
    <div className="min-w-0 space-y-6">
      <BuilderPanel>
        <PersonalInfoSection />
      </BuilderPanel>

      <BuilderPanel>
        <SummarySection />
      </BuilderPanel>

      <BuilderPanel>
        <WorkExperienceSection />
      </BuilderPanel>

      <BuilderPanel>
        <EducationSection />
      </BuilderPanel>

      <BuilderPanel>
        <SkillsSection />
      </BuilderPanel>
    </div>
  );
}
