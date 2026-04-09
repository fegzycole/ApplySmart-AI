import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { JOB_DETAILS_CARD_STYLES } from "../../constants/cover-letter.constants";

interface FormInputFieldProps {
  id: string;
  label: string;
  placeholder: string;
}

export function FormInputField({ id, label, placeholder }: FormInputFieldProps) {
  return (
    <div className={JOB_DETAILS_CARD_STYLES.inputGroup}>
      <Label htmlFor={id} className={JOB_DETAILS_CARD_STYLES.label}>
        {label}
      </Label>
      <div className={JOB_DETAILS_CARD_STYLES.inputWrapper}>
        <Input
          id={id}
          placeholder={placeholder}
          className={JOB_DETAILS_CARD_STYLES.input}
        />
        <div className={JOB_DETAILS_CARD_STYLES.focusGlow} />
      </div>
    </div>
  );
}
