import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 41 }, (_, i) => String(CURRENT_YEAR - 40 + i)).reverse();

interface MonthYearPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function parseMonthYear(value: string): { month: string; year: string } {
  if (!value) return { month: "", year: "" };
  const parts = value.split(" ");
  return { month: parts[0] ?? "", year: parts[1] ?? "" };
}

export function MonthYearPicker({ label, value, onChange, disabled }: MonthYearPickerProps) {
  const { month, year } = parseMonthYear(value);

  const handleMonth = (newMonth: string) => {
    const newYear = year || String(CURRENT_YEAR);
    onChange(`${newMonth} ${newYear}`);
  };

  const handleYear = (newYear: string) => {
    const newMonth = month || "Jan";
    onChange(`${newMonth} ${newYear}`);
  };

  return (
    <div className="min-w-0 space-y-3 group">
      <Label className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 ml-1 transition-all group-focus-within:text-primary group-focus-within:tracking-[0.4em]">
        {label}
      </Label>
      <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2">
        <Select value={month} onValueChange={handleMonth} disabled={disabled}>
          <SelectTrigger className="h-14 min-w-0 rounded-2xl border-2 border-border/50 bg-background/50 text-sm backdrop-blur-2xl transition-all duration-300 focus:ring-4 focus:ring-primary/10 data-[state=open]:border-primary">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-2 border-border/50 bg-background/95 backdrop-blur-xl">
            {MONTHS.map((m) => (
              <SelectItem key={m} value={m} className="rounded-xl focus:bg-primary/10 focus:text-primary transition-colors cursor-pointer">
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={year} onValueChange={handleYear} disabled={disabled}>
          <SelectTrigger className="h-14 min-w-0 rounded-2xl border-2 border-border/50 bg-background/50 text-sm backdrop-blur-2xl transition-all duration-300 focus:ring-4 focus:ring-primary/10 data-[state=open]:border-primary">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-2 border-border/50 bg-background/95 backdrop-blur-xl">
            {YEARS.map((y) => (
              <SelectItem key={y} value={y} className="rounded-xl focus:bg-primary/10 focus:text-primary transition-colors cursor-pointer">
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
