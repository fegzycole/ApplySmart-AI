import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { JOB_DETAILS_CARD_STYLES, TONE_OPTIONS } from "../../constants/cover-letter.constants";
import type { ToneOption } from "../../types/cover-letter.types";

interface ToneSelectorProps {
  value: ToneOption;
  onChange: (value: ToneOption) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className={JOB_DETAILS_CARD_STYLES.inputGroup}>
      <Label htmlFor="tone" className={JOB_DETAILS_CARD_STYLES.label}>
        Tone
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={JOB_DETAILS_CARD_STYLES.select.trigger}>
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
  );
}
