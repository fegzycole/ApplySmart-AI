import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FORM_FIELD_STYLES } from "../../constants/authentication.constants";
import type { FormFieldConfig } from "../../types/authentication.types";

interface FormFieldProps extends FormFieldConfig {}

export function FormField({ id, label, type, placeholder }: FormFieldProps) {
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
          className={FORM_FIELD_STYLES.input}
        />
        <div className={FORM_FIELD_STYLES.focusGlow} />
      </div>
    </div>
  );
}
