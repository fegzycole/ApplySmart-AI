import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { SYNTHESIS_STAGE_STYLES } from "../../constants/cover-letter.constants";
import { cn } from "@/shared/lib/utils";

interface FormInputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function FormInputField({ id, label, placeholder, value, onChange, error }: FormInputFieldProps) {
  return (
    <div className="min-w-0 space-y-3 group">
      <Label htmlFor={id} className={SYNTHESIS_STAGE_STYLES.label}>
        {label}
      </Label>
      <div className="relative min-w-0">
        <Input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            SYNTHESIS_STAGE_STYLES.input,
            error && "border-destructive/50 focus-visible:border-destructive focus-visible:ring-destructive/10"
          )}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-[10px] font-bold uppercase tracking-widest text-destructive ml-1">
          {error}
        </p>
      ) : null}
    </div>
  );
}
