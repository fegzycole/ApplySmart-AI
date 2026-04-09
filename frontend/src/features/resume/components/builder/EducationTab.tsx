import { DynamicItemsSection } from "./DynamicItemsSection";
import { FormInputWithGlow } from "./FormInputWithGlow";
import { EDUCATION_FIELDS, EDUCATION_DETAIL_FIELDS, SECTION_CONFIGS } from "../../constants/resume-builder.constants";

interface EducationTabProps {
  education: Array<{ id: number }>;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

export function EducationTab({ education, onAdd, onDelete }: EducationTabProps) {
  const config = SECTION_CONFIGS.education;

  return (
    <DynamicItemsSection
      items={education}
      sectionIcon={config.icon}
      sectionTitle={config.title}
      sectionIconColor="text-cyan-600 dark:text-cyan-400"
      itemTitle="Degree"
      gradient={config.gradient}
      border={config.border}
      addButtonLabel="Add Another Degree"
      addButtonBorderColor="border-cyan-300 dark:border-cyan-700 hover:border-cyan-500 dark:hover:border-cyan-500"
      addButtonHoverColor="hover:bg-cyan-50 dark:hover:bg-cyan-950/30"
      onAdd={onAdd}
      onDelete={onDelete}
      renderContent={() => (
        <>
          {EDUCATION_FIELDS.map((field) => (
            <FormInputWithGlow key={field.id} {...field} focusColor="cyan" />
          ))}
          <div className="grid grid-cols-2 gap-4">
            {EDUCATION_DETAIL_FIELDS.map((field) => (
              <FormInputWithGlow key={field.id} {...field} focusColor="cyan" />
            ))}
          </div>
        </>
      )}
    />
  );
}
