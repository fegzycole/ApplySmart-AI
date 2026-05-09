import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";

interface JobFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: "text" | "url" | "textarea" | "datetime-local" | "date";
  rows?: number;
  required?: boolean;
  className?: string;
  error?: string;
}

export function JobFormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type,
  rows,
  required = false,
  className,
  error,
}: JobFormFieldProps) {
  const isTextarea = type === "textarea";

  return (
    <div className={cn("min-w-0 space-y-2 group", className)}>
      <Label 
        htmlFor={id} 
        className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 ml-1 transition-all group-focus-within:text-primary group-focus-within:tracking-[0.4em]"
      >
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      <div className="relative min-w-0">
        {isTextarea ? (
          <Textarea
            id={id}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            rows={rows}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              "min-h-[120px] rounded-2xl border-2 border-border/50 bg-background/50 p-4 text-sm leading-relaxed backdrop-blur-2xl transition-all duration-300 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 resize-none shadow-inner",
              error && "border-destructive/50 focus-visible:border-destructive focus-visible:ring-destructive/10"
            )}
          />
        ) : (
          <Input
            id={id}
            type={type}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              "h-14 min-w-0 rounded-2xl border-2 border-border/50 bg-background/50 px-6 text-sm leading-relaxed backdrop-blur-2xl transition-all duration-300 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 shadow-inner",
              error && "border-destructive/50 focus-visible:border-destructive focus-visible:ring-destructive/10"
            )}
          />
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-[10px] font-bold uppercase tracking-widest text-destructive ml-1">
          {error}
        </p>
      ) : null}
    </div>
  );
}
