import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { SYNTHESIS_STAGE_STYLES } from "../../constants/cover-letter.constants";
import { cn } from "@/shared/lib/utils";

interface TextareaFieldProps {
  id: string;
  label: string;
  placeholder: string;
  minHeight: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
}

export function TextareaField({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
}: TextareaFieldProps) {
  return (
    <div className="min-w-0 space-y-3 group">
      <Label htmlFor={id} className={SYNTHESIS_STAGE_STYLES.label}>
        {label}
      </Label>
      <div className="relative min-w-0">
        <Textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            SYNTHESIS_STAGE_STYLES.textarea,
            error && "border-destructive/50 focus-visible:border-destructive focus-visible:ring-destructive/10"
          )}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-[10px] font-bold uppercase tracking-widest text-destructive ml-1">
          {error}
        </p>
      ) : null}
      {hint && (
        <div className="ml-1 flex items-start gap-2">
          <div className="mt-[0.26rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/40" />
          <span className="text-[10px] font-bold uppercase leading-[1.1] tracking-[0.22em] text-zinc-400">
            {hint}
          </span>
        </div>
      )}
    </div>
  );
}
