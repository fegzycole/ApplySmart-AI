import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { type LucideIcon } from "lucide-react";

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
    <div className="space-y-2 group">
      <Label
        htmlFor={id}
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2"
      >
        {Icon && <Icon className="size-4" />}
        {label}
      </Label>
      <div className="relative">
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
          className="h-11 rounded-xl border-2 border-violet-200 bg-white transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 dark:border-violet-800 dark:bg-zinc-950 dark:focus:border-violet-500"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity duration-300" />
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id}-help`} className="text-xs text-zinc-500 dark:text-zinc-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
