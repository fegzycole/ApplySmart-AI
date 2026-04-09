import { Rocket } from "lucide-react";
import { BuilderSectionWrapper } from "./BuilderSectionWrapper";
import { SectionHeader } from "./SectionHeader";
import { DynamicItemsSection } from "./DynamicItemsSection";
import { FormInputWithGlow } from "./FormInputWithGlow";
import { FormTextareaWithGlow } from "./FormTextareaWithGlow";
import { PROJECT_FIELDS, SECTION_CONFIGS } from "../../constants/resume-builder.constants";

interface SkillsTabProps {
  projects: Array<{ id: number }>;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

export function SkillsTab({ projects, onAdd, onDelete }: SkillsTabProps) {
  const skillsConfig = SECTION_CONFIGS.skills;
  const projectsConfig = SECTION_CONFIGS.projects;

  return (
    <div className="space-y-5 mt-6">
      <BuilderSectionWrapper gradient={skillsConfig.gradient} border={skillsConfig.border}>
        <SectionHeader icon={skillsConfig.icon} title={skillsConfig.title} iconColor="text-fuchsia-600 dark:text-fuchsia-400" />
        <FormTextareaWithGlow
          id="skills"
          label="Add your technical skills"
          placeholder="JavaScript, React, Node.js, Python, AWS, Docker, Kubernetes, TypeScript, PostgreSQL, MongoDB..."
          minHeight="min-h-[100px]"
          focusColor="fuchsia"
          helper="✨ Separate skills with commas"
        />
      </BuilderSectionWrapper>

      <DynamicItemsSection
        items={projects}
        sectionIcon={Rocket}
        sectionTitle={projectsConfig.title}
        itemTitle="Project"
        gradient={projectsConfig.gradient}
        border={projectsConfig.border}
        addButtonLabel="Add Another Project"
        addButtonBorderColor="border-violet-300 dark:border-violet-700 hover:border-violet-500 dark:hover:border-violet-500"
        addButtonHoverColor="hover:bg-violet-50 dark:hover:bg-violet-950/30"
        onAdd={onAdd}
        onDelete={onDelete}
        renderContent={(proj) => (
          <>
            {PROJECT_FIELDS.map((field) => (
              <FormInputWithGlow key={field.id} {...field} focusColor="violet" />
            ))}
            <FormTextareaWithGlow
              id={`projectDesc-${proj.id}`}
              label="Description & Tech Stack"
              placeholder="Built a scalable e-commerce platform using React, Node.js, and MongoDB. Implemented real-time inventory management and payment processing."
              minHeight="min-h-[80px]"
              focusColor="violet"
            />
          </>
        )}
      />
    </div>
  );
}
