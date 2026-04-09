import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";

interface TwoFactorAuthToggleProps {
  title: string;
  description: string;
  enabled?: boolean;
}

export function TwoFactorAuthToggle({
  title,
  description,
  enabled = false
}: TwoFactorAuthToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <Label className="text-base font-semibold text-zinc-900 dark:text-white">
          {title}
        </Label>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          {description}
        </p>
      </div>
      <Button variant="outline" className="border-2">
        {enabled ? 'Disable' : 'Enable'}
      </Button>
    </div>
  );
}
