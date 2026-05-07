import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { JOB_FORM_DIALOG_STYLES } from "../../constants/job-tracker.constants";

interface JobFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: "text" | "url" | "textarea" | "datetime-local";
  rows?: number;
  required?: boolean;
  className?: string;
  error?: string;
}

export function JobFormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type,
  rows,
  required = false,
  className,
  error,
}: JobFormFieldProps) {
  return (
    <div className={`${JOB_FORM_DIALOG_STYLES.fieldWrapper} ${className ?? ""}`}>
      <Label htmlFor={id}>{label}</Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
