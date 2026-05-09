import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { type LucideIcon } from "lucide-react";
import { MODULE_ARTIFACT_STYLES } from "../../constants/settings.constants";
import { cn } from "@/shared/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  placeholder?: string;
  error?: string;
  readOnly?: boolean;
  disabled?: boolean;
  helperText?: string;
}

export function FormField({
  id,
  label,
  type = "text",
  defaultValue,
  value,
  onChange,
  icon: Icon,
  placeholder,
  error,
  readOnly = false,
  disabled = false,
  helperText,
}: FormFieldProps) {
  return (
    <div className="space-y-3 group">
      <Label
        htmlFor={id}
        className={MODULE_ARTIFACT_STYLES.label}
      >
        {Icon && <Icon className="size-3 mr-2 inline-block -mt-0.5" />}
        {label}
      </Label>
      <div className="relative min-w-0">
        <Input
          id={id}
          type={type}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-help` : undefined}
          className={cn(
            MODULE_ARTIFACT_STYLES.input,
            error && "border-rose-500/50 focus-visible:border-rose-500 focus-visible:ring-rose-500/10",
            disabled && "opacity-50 grayscale cursor-not-allowed"
          )}
        />
        {/* Subtle Ambient Focus Glow */}
        <div className="absolute -inset-0.5 rounded-2xl bg-sky-500/10 opacity-0 group-focus-within:opacity-100 blur-sm -z-10 transition-opacity duration-500" />
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-[10px] font-bold uppercase tracking-widest text-rose-500 ml-1">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id}-help`} className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
