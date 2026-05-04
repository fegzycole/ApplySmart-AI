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
    <div className="min-w-0 space-y-2">
      <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</Label>
      <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2">
        <Select value={month} onValueChange={handleMonth} disabled={disabled}>
          <SelectTrigger className="h-10 min-w-0 rounded-lg">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={year} onValueChange={handleYear} disabled={disabled}>
          <SelectTrigger className="h-10 min-w-0 rounded-lg">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {YEARS.map((y) => (
              <SelectItem key={y} value={y}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
