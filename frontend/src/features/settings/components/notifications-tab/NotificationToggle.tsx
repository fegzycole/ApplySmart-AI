import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";

interface NotificationToggleProps {
  id: string;
  title: string;
  description: string;
  defaultChecked?: boolean;
  gradient: string;
  border: string;
}

export function NotificationToggle({
  id,
  title,
  description,
  defaultChecked = false,
  gradient,
  border
}: NotificationToggleProps) {
  return (
    <div className={`p-5 rounded-xl bg-gradient-to-br ${gradient} border ${border}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Label className="text-base font-semibold text-zinc-900 dark:text-white cursor-pointer">
            {title}
          </Label>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            {description}
          </p>
        </div>
        <Switch id={id} defaultChecked={defaultChecked} />
      </div>
    </div>
  );
}
