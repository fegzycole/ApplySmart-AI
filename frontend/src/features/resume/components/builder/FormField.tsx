import { LucideIcon } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/lib/utils";

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
    <div className="min-w-0 space-y-2 group">
      <Label 
        htmlFor={id} 
        className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 ml-1 transition-all group-focus-within:text-primary group-focus-within:tracking-[0.4em]"
      >
        {label}
      </Label>
      <div className="relative min-w-0">
        {Icon && (
          <div className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-all duration-300 group-focus-within:scale-110 group-focus-within:bg-primary group-focus-within:text-primary-foreground group-focus-within:shadow-lg group-focus-within:shadow-primary/20 sm:left-4 sm:h-9 sm:w-9">
            <Icon className="size-4" />
          </div>
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-13 min-w-0 rounded-2xl border-2 border-border/50 bg-background/50 text-sm leading-relaxed backdrop-blur-2xl transition-all duration-300 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 sm:h-14",
            Icon ? "pl-12 sm:pl-16" : "pl-4 sm:pl-6"
          )}
        />
      </div>
    </div>
  );
}
