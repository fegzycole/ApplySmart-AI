import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Lightbulb } from "lucide-react";
import { JOB_DETAILS_CARD_STYLES } from "../../constants/cover-letter.constants";

interface TextareaFieldProps {
  id: string;
  label: string;
  placeholder: string;
  minHeight: string;
  hint?: string;
}

export function TextareaField({ id, label, placeholder, minHeight, hint }: TextareaFieldProps) {
  return (
    <div className={JOB_DETAILS_CARD_STYLES.inputGroup}>
      <Label htmlFor={id} className={JOB_DETAILS_CARD_STYLES.label}>
        {label}
      </Label>
      <div className={JOB_DETAILS_CARD_STYLES.inputWrapper}>
        <Textarea
          id={id}
          placeholder={placeholder}
          className={`${minHeight} ${JOB_DETAILS_CARD_STYLES.textarea}`}
        />
        <div className={JOB_DETAILS_CARD_STYLES.focusGlow} />
      </div>
      {hint && (
        <p className={JOB_DETAILS_CARD_STYLES.hint}>
          <Lightbulb className={JOB_DETAILS_CARD_STYLES.hintIcon} />
          {hint}
        </p>
      )}
    </div>
  );
}
