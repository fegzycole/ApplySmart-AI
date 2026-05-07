import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FORM_FIELD_STYLES } from "../../constants/authentication.constants";
import type { FormFieldConfig } from "../../types/authentication.types";

interface ControlledFormFieldProps extends FormFieldConfig {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function ControlledFormField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}: ControlledFormFieldProps) {
  return (
    <div className={FORM_FIELD_STYLES.wrapper}>
      <Label htmlFor={id} className={FORM_FIELD_STYLES.label}>
        {label}
      </Label>
      <div className={FORM_FIELD_STYLES.inputWrapper}>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={FORM_FIELD_STYLES.input}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <div className={FORM_FIELD_STYLES.focusGlow} />
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
