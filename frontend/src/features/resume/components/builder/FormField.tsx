import { LucideIcon } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface FormFieldProps {
  id?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  icon?: LucideIcon;
}

export function FormField({ id, label, placeholder, value, onChange, type = "text", icon: Icon }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </Label>
      <div className={Icon ? "relative" : undefined}>
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={Icon ? "h-11 rounded-xl pl-10" : "h-10 rounded-lg"}
        />
      </div>
    </div>
  );
}
