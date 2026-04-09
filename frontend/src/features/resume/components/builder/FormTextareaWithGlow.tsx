import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";

interface FormTextareaWithGlowProps {
  id: string;
  label: string;
  placeholder?: string;
  minHeight?: string;
  focusColor?: "violet" | "cyan" | "fuchsia";
  helper?: string;
}

export function FormTextareaWithGlow({
  id,
  label,
  placeholder,
  minHeight = "min-h-[120px]",
  focusColor = "violet",
  helper
}: FormTextareaWithGlowProps) {
  const colorClasses = {
    violet: {
      border: "border-violet-200 dark:border-violet-800",
      focus: "focus:border-violet-500 dark:focus:border-violet-500 focus:ring-violet-500/20",
      glow: "from-violet-500 to-fuchsia-500"
    },
    cyan: {
      border: "border-cyan-200 dark:border-cyan-800",
      focus: "focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-cyan-500/20",
      glow: "from-cyan-500 to-teal-500"
    },
    fuchsia: {
      border: "border-fuchsia-200 dark:border-fuchsia-800",
      focus: "focus:border-fuchsia-500 dark:focus:border-fuchsia-500 focus:ring-fuchsia-500/20",
      glow: "from-fuchsia-500 to-pink-500"
    }
  };

  const colors = colorClasses[focusColor];

  return (
    <div className="space-y-2 group">
      <Label htmlFor={id} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </Label>
      <div className="relative">
        <Textarea
          id={id}
          placeholder={placeholder}
          className={`${minHeight} bg-white dark:bg-zinc-950 border-2 ${colors.border} rounded-xl ${colors.focus} focus:ring-4 transition-all duration-300 resize-none p-4`}
        />
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colors.glow} opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity duration-300`} />
      </div>
      {helper && (
        <p className="text-xs text-zinc-500 dark:text-zinc-500">{helper}</p>
      )}
    </div>
  );
}
