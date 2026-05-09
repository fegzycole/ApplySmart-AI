import { Layers } from "lucide-react";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { TemplateCard } from "./TemplateCard";
import { TEMPLATES } from "../../constants/resume-builder.constants";

export function ThemeSelector() {
  const { resumeData, updateTemplate } = useResumeBuilder();
  const selectedTemplate = TEMPLATES.find((template) => template.id === resumeData.template) ?? TEMPLATES[0];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 sm:h-14 sm:w-14">
            <Layers className="size-6 sm:size-7" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">Synthesis Engine</h3>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-primary sm:text-[10px] sm:tracking-[0.2em]">
              Select Structural Blueprint
            </p>
          </div>
        </div>

        <div className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-2xl border-2 border-primary/20 bg-primary/5 px-4 backdrop-blur-xl sm:h-14 sm:w-auto sm:gap-4 sm:px-6">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60 sm:text-[10px] sm:tracking-[0.2em]">Target:</span>
          <span className="truncate text-sm font-bold text-primary sm:text-base">
            {selectedTemplate.name.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
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
