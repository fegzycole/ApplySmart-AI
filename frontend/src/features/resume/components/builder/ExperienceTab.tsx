import { DynamicItemsSection } from "./DynamicItemsSection";
import { FormInputWithGlow } from "./FormInputWithGlow";
import { FormTextareaWithGlow } from "./FormTextareaWithGlow";
import { EXPERIENCE_FIELDS, EXPERIENCE_DATE_FIELDS, SECTION_CONFIGS } from "../../constants/resume-builder.constants";

interface ExperienceTabProps {
  experiences: Array<{ id: number }>;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

export function ExperienceTab({ experiences, onAdd, onDelete }: ExperienceTabProps) {
  const config = SECTION_CONFIGS.experience;

  return (
    <DynamicItemsSection
      items={experiences}
      sectionIcon={config.icon}
      sectionTitle={config.title}
      itemTitle="Position"
      gradient={config.gradient}
      border={config.border}
      addButtonLabel="Add Another Position"
      addButtonBorderColor="border-violet-300 dark:border-violet-700 hover:border-violet-500 dark:hover:border-violet-500"
      addButtonHoverColor="hover:bg-violet-50 dark:hover:bg-violet-950/30"
      onAdd={onAdd}
      onDelete={onDelete}
      renderContent={(exp) => (
        <>
          {EXPERIENCE_FIELDS.map((field) => (
            <FormInputWithGlow key={field.id} {...field} focusColor="violet" />
          ))}
          <div className="grid grid-cols-2 gap-4">
            {EXPERIENCE_DATE_FIELDS.map((field) => (
              <FormInputWithGlow key={field.id} {...field} focusColor="violet" />
            ))}
          </div>
          <FormTextareaWithGlow
            id={`achievements-${exp.id}`}
            label="Key Achievements"
            placeholder="• Led migration to microservices architecture&#10;• Increased system performance by 40%&#10;• Mentored team of 5 junior developers"
            minHeight="min-h-[100px]"
            focusColor="violet"
          />
        </>
      )}
    />
  );
}
