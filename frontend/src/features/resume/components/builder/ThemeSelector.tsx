import { Palette } from "lucide-react";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { TemplateCard } from "./TemplateCard";
import { TEMPLATES } from "../../constants/resume-builder.constants";

export function ThemeSelector() {
  const { resumeData, updateTemplate } = useResumeBuilder();
  const selectedTemplate = TEMPLATES.find((template) => template.id === resumeData.template) ?? TEMPLATES[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="size-10 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Palette className="size-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white">Template</h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Pick the layout tone before you start writing.
            </p>
          </div>
        </div>

        <div className="inline-flex w-full min-w-0 items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 text-xs sm:text-sm dark:border-zinc-800 dark:bg-zinc-950/60 lg:w-auto">
          <span className="text-zinc-500 dark:text-zinc-400">Selected</span>
          <span className="truncate font-semibold text-zinc-900 dark:text-white">
            {selectedTemplate.name}
          </span>
        </div>
      </div>

      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 xl:mx-0 xl:grid xl:grid-cols-4 xl:overflow-visible xl:px-0 xl:pb-0">
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
