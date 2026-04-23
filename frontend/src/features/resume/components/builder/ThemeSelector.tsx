import { Palette } from "lucide-react";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { TemplateCard } from "./TemplateCard";
import { TEMPLATES } from "../../constants/resume-builder.constants";

export function ThemeSelector() {
  const { resumeData, updateTemplate } = useResumeBuilder();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
          <Palette className="size-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Choose Your Theme</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Select a template to get started</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            {...template}
            isSelected={resumeData.template === template.id}
            onSelect={updateTemplate}
          />
        ))}
      </div>
    </div>
  );
}
