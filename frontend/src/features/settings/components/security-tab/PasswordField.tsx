import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface PasswordFieldProps {
  id: string;
  label: string;
}

export function PasswordField({ id, label }: PasswordFieldProps) {
  return (
    <div className="space-y-2 group">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="password"
          className="h-11 bg-white dark:bg-zinc-950 border-2 border-violet-200 dark:border-violet-800 rounded-xl focus:border-violet-500 dark:focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all duration-300"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity duration-300" />
      </div>
    </div>
  );
}
