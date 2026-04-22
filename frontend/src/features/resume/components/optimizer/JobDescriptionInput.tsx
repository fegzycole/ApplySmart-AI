import { Textarea } from "@/shared/components/ui/textarea";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export function JobDescriptionInput({
  value,
  onChange,
  maxLength = 5000,
}: JobDescriptionInputProps) {
  return (
    <div className="space-y-2">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        className="min-h-[300px] rounded-xl border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:ring-violet-500/20"
        maxLength={maxLength}
      />
      <div className="flex justify-end text-sm text-zinc-500 dark:text-zinc-400">
        {value.length} / {maxLength}
      </div>
    </div>
  );
}
