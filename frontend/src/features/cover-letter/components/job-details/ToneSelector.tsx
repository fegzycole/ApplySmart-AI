import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { SYNTHESIS_STAGE_STYLES, TONE_OPTIONS } from "../../constants/cover-letter.constants";
import type { ToneOption } from "../../types/cover-letter.types";

interface ToneSelectorProps {
  value: ToneOption;
  onChange: (value: ToneOption) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="min-w-0 space-y-3 group">
      <Label htmlFor="tone" className={SYNTHESIS_STAGE_STYLES.label}>
        Narrative Tone
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          id="tone"
          className="h-14 min-w-0 rounded-2xl border-2 border-border/50 bg-background/50 text-sm backdrop-blur-2xl transition-all duration-300 focus:ring-4 focus:ring-amber-500/10 data-[state=open]:border-amber-500 shadow-inner"
        >
          <SelectValue placeholder="Select a tone" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-2 border-border/50 bg-background/95 backdrop-blur-xl">
          {TONE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value} className="rounded-xl focus:bg-amber-500/10 focus:text-amber-600 transition-colors cursor-pointer">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
