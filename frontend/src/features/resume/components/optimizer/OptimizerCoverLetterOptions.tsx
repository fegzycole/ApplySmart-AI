import { AnimatePresence, motion } from "framer-motion";
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
    <div className="space-y-5 rounded-[1.5rem] border border-border bg-secondary/30 p-4 backdrop-blur-3xl sm:space-y-6 sm:rounded-[2.5rem] sm:p-6 lg:p-8">
      {/* Header row: icon + title + switch */}
      <div className="flex items-start justify-between gap-3 sm:gap-6">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 sm:h-12 sm:w-12 sm:rounded-2xl">
            <FileText className="size-4 sm:size-5" />
          </div>
          <div className="min-w-0 space-y-1 sm:space-y-2">
            <p className="text-sm font-bold leading-snug text-foreground sm:text-base lg:text-lg">
              Search Intelligence: Cover Letter
            </p>
            <p className="text-xs font-medium leading-relaxed text-muted-foreground sm:text-sm">
              Automatically generate a matching cover letter from your target job and optimized profile.
            </p>
          </div>
        </div>

        <Switch
          checked={options.enabled}
          onCheckedChange={(checked) => onChange({ enabled: checked })}
          className="mt-0.5 shrink-0 data-[state=checked]:bg-primary"
          aria-label="Generate matching cover letter"
        />
      </div>

      <AnimatePresence>
        {options.enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid gap-4 pt-1 sm:gap-6 sm:pt-2 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cover-letter-tone" className="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 sm:text-xs">
                  AI Voice & Tone
                </Label>
                <Select
                  value={options.tone}
                  onValueChange={(value) => onChange({ tone: value as ResumeOptimizerCoverLetterOptions["tone"] })}
                >
                  <SelectTrigger id="cover-letter-tone" className="h-11 rounded-xl border-2 bg-background/50 backdrop-blur-xl transition-all focus:border-primary sm:h-14 sm:rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-2">
                    {TONE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="rounded-xl">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="cover-letter-highlights" className="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 sm:text-xs">
                  Precision Highlights
                </Label>
                <Textarea
                  id="cover-letter-highlights"
                  value={options.highlights}
                  onChange={(event) => onChange({ highlights: event.target.value })}
                  placeholder="Mention specific wins or achievements you want the AI to emphasize..."
                  className="min-h-28 rounded-xl border-2 bg-background/50 p-3 text-sm leading-relaxed backdrop-blur-xl transition-all focus:border-primary sm:min-h-32 sm:rounded-2xl sm:p-4 lg:p-6"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
