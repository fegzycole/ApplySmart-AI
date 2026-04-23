import { Check } from "lucide-react";
import { ResumeTemplate } from "../../contexts/ResumeBuilderContext";

interface TemplateCardProps {
  id: ResumeTemplate;
  name: string;
  description: string;
  color: string;
  gradient: string;
  isSelected: boolean;
  onSelect: (id: ResumeTemplate) => void;
}

export function TemplateCard({ id, name, description, color, gradient, isSelected, onSelect }: TemplateCardProps) {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`relative p-4 rounded-2xl border-2 transition-all ${
        isSelected
          ? "border-violet-500 dark:border-violet-400 shadow-lg shadow-violet-500/20"
          : "border-zinc-200 dark:border-zinc-800 hover:border-violet-300 dark:hover:border-violet-700"
      }`}
    >
      <div className={`absolute inset-0 rounded-2xl ${gradient} transition-opacity ${isSelected ? "opacity-100" : "opacity-0"}`} />
      <div className="relative z-10">
        <div className={`h-24 rounded-lg bg-gradient-to-br ${color} mb-3 flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          <div className="relative z-10 space-y-1 w-full px-3">
            <div className="h-1.5 bg-white/60 rounded w-3/4" />
            <div className="h-1 bg-white/40 rounded w-full" />
            <div className="h-1 bg-white/40 rounded w-5/6" />
          </div>
        </div>
        <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">{name}</h4>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">{description}</p>
        {isSelected && (
          <div className="absolute top-2 right-2 size-6 rounded-full bg-violet-500 flex items-center justify-center shadow-lg">
            <Check className="size-3.5 text-white" />
          </div>
        )}
      </div>
    </button>
  );
}
