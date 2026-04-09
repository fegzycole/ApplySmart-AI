import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { ADD_JOB_DIALOG_STYLES } from "../../constants/job-tracker.constants";

interface DialogFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: "text" | "url" | "textarea";
  rows?: number;
  required?: boolean;
}

export function DialogFormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type,
  rows,
  required = false,
}: DialogFormFieldProps) {
  return (
    <div className={ADD_JOB_DIALOG_STYLES.fieldWrapper}>
      <Label htmlFor={id}>{label}</Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}
