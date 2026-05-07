import { cn } from "@/shared/lib/utils";
import { TemplatePreview } from "./TemplatePreview";
import type { ResumeTemplate } from "../../types/resume-builder.types";

interface TemplateSelectorProps {
  selected: ResumeTemplate;
  onSelect: (template: ResumeTemplate) => void;
}

const templates: { value: ResumeTemplate; label: string; desc: string }[] = [
  { value: "MODERN", label: "Modern", desc: "Minimalist & clean" },
  { value: "PROFESSIONAL", label: "Professional", desc: "Traditional & formal" },
  { value: "CLASSIC", label: "Classic", desc: "Timeless elegance" },
  { value: "CREATIVE", label: "Creative", desc: "Bold & unique" },
];

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {templates.map((t) => (
        <button
          key={t.value}
          onClick={() => onSelect(t.value)}
          className={cn(
            "relative min-w-0 rounded-2xl border-2 p-2.5 text-left transition-all group sm:p-3",
            selected === t.value
              ? "border-violet-500 bg-violet-50 dark:bg-violet-950/30 shadow-lg shadow-violet-500/20"
              : "border-zinc-200 dark:border-zinc-800 hover:border-violet-300 dark:hover:border-violet-700"
          )}
        >
          <div className="mb-2 h-28 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 dark:border-zinc-800 dark:bg-zinc-900 sm:h-32 sm:p-2">
            <TemplatePreview type={t.value} />
          </div>
          <div className="font-semibold text-zinc-900 dark:text-white text-sm leading-tight">
            {t.label}
          </div>
          <div className="text-[11px] leading-tight text-zinc-500 dark:text-zinc-400 sm:text-xs">
            {t.desc}
          </div>
        </button>
      ))}
    </div>
  );
}
