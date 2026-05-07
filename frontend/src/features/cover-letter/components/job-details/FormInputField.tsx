import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { JOB_DETAILS_CARD_STYLES } from "../../constants/cover-letter.constants";

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
    <div className={JOB_DETAILS_CARD_STYLES.inputGroup}>
      <Label htmlFor={id} className={JOB_DETAILS_CARD_STYLES.label}>
        {label}
      </Label>
      <div className={JOB_DETAILS_CARD_STYLES.inputWrapper}>
        <Input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={JOB_DETAILS_CARD_STYLES.input}
        />
        <div className={JOB_DETAILS_CARD_STYLES.focusGlow} />
      </div>
      {error ? <p id={`${id}-error`} className={JOB_DETAILS_CARD_STYLES.error}>{error}</p> : null}
    </div>
  );
}
