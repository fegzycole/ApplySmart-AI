import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { JOB_FORM_DIALOG_STYLES } from "../../constants/job-tracker.constants";
import type { JobStatus } from "../../types/job.types";
import { getJobStatusOptions } from "../../utils/job-tracker.validation";

interface JobFormStatusFieldProps {
  value: JobStatus;
  onChange: (value: JobStatus) => void;
  error?: string;
}

export function JobFormStatusField({ value, onChange, error }: JobFormStatusFieldProps) {
  return (
    <div className={JOB_FORM_DIALOG_STYLES.fieldWrapper}>
      <Label htmlFor="status">Status</Label>
      <Select value={value} onValueChange={(nextValue) => onChange(nextValue as JobStatus)}>
        <SelectTrigger
          id="status"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "status-error" : undefined}
        >
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          {getJobStatusOptions().map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <p id="status-error" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
