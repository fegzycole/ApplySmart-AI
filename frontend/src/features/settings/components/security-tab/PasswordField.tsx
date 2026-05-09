import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";

interface PasswordFieldProps {
  id: string;
  label: string;
  name?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  helperText?: string;
  autoComplete?: string;
}

export function PasswordField({
  id,
  label,
  name,
  value,
  onChange,
  error,
  disabled = false,
  helperText,
  autoComplete = "current-password",
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="space-y-2 min-w-0">
      <Label htmlFor={id} className="block pl-0.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={name ?? id}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-help` : undefined}
          className="h-12 min-w-0 rounded-xl border-zinc-200 bg-white/90 px-4 pr-12 shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:border-violet-400 focus-visible:ring-violet-400/20 dark:border-zinc-800 dark:bg-zinc-900/80"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="absolute right-1 top-1 z-10 size-10 cursor-pointer rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          onClick={() => setIsVisible((currentValue) => !currentValue)}
        >
          {isVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id}-help`} className="text-xs text-zinc-500 dark:text-zinc-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
