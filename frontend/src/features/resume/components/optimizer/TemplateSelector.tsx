import { motion } from "framer-motion";
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
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {templates.map((t) => (
        <button
          key={t.value}
          onClick={() => onSelect(t.value)}
          className={cn(
            "group relative min-w-0 rounded-[2rem] border-2 p-3 text-left transition-all duration-500",
            selected === t.value
              ? "border-primary bg-card shadow-2xl shadow-primary/10"
              : "border-border bg-background/50 hover:border-primary/30 hover:bg-card"
          )}
        >
          <div className="relative mb-4 h-40 overflow-hidden rounded-2xl border border-border bg-background/80 p-2 transition-transform duration-500 group-hover:scale-[1.02]">
            <TemplatePreview type={t.value} />
            {selected === t.value && (
              <div className="absolute inset-0 bg-primary/5 backdrop-blur-[1px]" />
            )}
          </div>
          
          <div className="px-1">
            <div className="text-sm font-bold text-foreground">
              {t.label}
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-primary">
              {t.desc}
            </div>
          </div>

          {selected === t.value && (
            <motion.div 
              layoutId="template-active"
              className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-current" />
            </motion.div>
          )}
        </button>
      ))}
    </div>
  );
}
