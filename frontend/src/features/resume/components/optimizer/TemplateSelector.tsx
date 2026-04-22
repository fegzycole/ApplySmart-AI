import { cn } from "@/shared/lib/utils";
import { TemplatePreview } from "./TemplatePreview";

type ResumeTemplate = 'MODERN' | 'PROFESSIONAL' | 'CLASSIC' | 'CREATIVE';

interface TemplateSelectorProps {
  selected: ResumeTemplate;
  onSelect: (template: ResumeTemplate) => void;
}

const templates: { value: ResumeTemplate; label: string; desc: string }[] = [
  { value: 'MODERN', label: 'Modern', desc: 'Minimalist & clean' },
  { value: 'PROFESSIONAL', label: 'Professional', desc: 'Traditional & formal' },
  { value: 'CLASSIC', label: 'Classic', desc: 'Timeless elegance' },
  { value: 'CREATIVE', label: 'Creative', desc: 'Bold & unique' },
];

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((t) => (
        <button
          key={t.value}
          onClick={() => onSelect(t.value)}
          className={cn(
            "relative p-3 rounded-2xl border-2 transition-all text-left group",
            selected === t.value
              ? "border-violet-500 bg-violet-50 dark:bg-violet-950/30 shadow-lg shadow-violet-500/20"
              : "border-zinc-200 dark:border-zinc-800 hover:border-violet-300 dark:hover:border-violet-700"
          )}
        >
          <div className="w-full aspect-[8.5/11] rounded-lg mb-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden p-2 scale-90">
            <TemplatePreview type={t.value} />
          </div>
          <div className="font-semibold text-zinc-900 dark:text-white text-sm">{t.label}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{t.desc}</div>
        </button>
      ))}
    </div>
  );
}
