import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { JobStatus } from "../../types/job.types";
import { getJobStatusOptions } from "../../utils/job-tracker.validation";

interface JobFormStatusFieldProps {
  value: JobStatus;
  onChange: (value: JobStatus) => void;
  error?: string;
}

export function JobFormStatusField({ value, onChange, error }: JobFormStatusFieldProps) {
  return (
    <div className="min-w-0 space-y-2 group">
      <Label 
        htmlFor="status" 
        className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 ml-1 transition-all group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 group-focus-within:tracking-[0.4em]"
      >
        Journey Stage
      </Label>
      <Select value={value} onValueChange={(nextValue) => onChange(nextValue as JobStatus)}>
        <SelectTrigger
          id="status"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "status-error" : undefined}
          className="h-14 min-w-0 rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 text-sm backdrop-blur-2xl transition-all duration-300 focus:ring-4 focus:ring-zinc-100 data-[state=open]:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:focus:ring-zinc-800/50 dark:data-[state=open]:border-sky-500"
        >
          <SelectValue placeholder="Select a stage" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-2 border-zinc-100 bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-2xl">
          {getJobStatusOptions().map((option) => (
            <SelectItem key={option.value} value={option.value} className="rounded-xl focus:bg-zinc-100 dark:focus:bg-zinc-800 transition-colors cursor-pointer">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <p id="status-error" className="text-[10px] font-bold uppercase tracking-widest text-rose-500 ml-1">
          {error}
        </p>
      ) : null}
    </div>
  );
}
