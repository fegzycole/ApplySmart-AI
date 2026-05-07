import { FileText } from "lucide-react";
import { TONE_OPTIONS } from "@/features/cover-letter/constants/cover-letter.constants";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Switch } from "@/shared/components/ui/switch";
import { Textarea } from "@/shared/components/ui/textarea";
import type { ResumeOptimizerCoverLetterOptions } from "../../types/resume-optimizer.types";

interface OptimizerCoverLetterOptionsProps {
  options: ResumeOptimizerCoverLetterOptions;
  onChange: (updates: Partial<ResumeOptimizerCoverLetterOptions>) => void;
}

export function OptimizerCoverLetterOptions({
  options,
  onChange,
}: OptimizerCoverLetterOptionsProps) {
  return (
    <div className="space-y-5 rounded-[1.75rem] border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 text-violet-600 dark:text-violet-300">
              <FileText className="size-4" />
            </div>
            Generate matching cover letter
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Create a cover letter from the same job description and optimized resume.
          </p>
        </div>

        <Switch
          checked={options.enabled}
          onCheckedChange={(checked) => onChange({ enabled: checked })}
          aria-label="Generate matching cover letter"
        />
      </div>

      {options.enabled ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-400 md:col-span-2">
            The company and role will be inferred from the job description automatically.
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover-letter-tone">Tone</Label>
            <Select
              value={options.tone}
              onValueChange={(value) => onChange({ tone: value as ResumeOptimizerCoverLetterOptions["tone"] })}
            >
              <SelectTrigger id="cover-letter-tone" className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TONE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="cover-letter-highlights">Highlights</Label>
            <Textarea
              id="cover-letter-highlights"
              value={options.highlights}
              onChange={(event) => onChange({ highlights: event.target.value })}
              placeholder="Mention wins or achievements you want emphasized."
              className="min-h-28 rounded-xl"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
