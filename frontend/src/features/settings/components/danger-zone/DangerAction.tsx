import { Button } from "@/shared/components/ui/button";

interface DangerActionProps {
  title: string;
  description: string;
  buttonLabel: string;
  variant?: "destructive" | "outline";
}

export function DangerAction({
  title,
  description,
  buttonLabel,
  variant = "destructive"
}: DangerActionProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-semibold text-zinc-900 dark:text-white">{title}</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      <Button variant={variant} className="bg-red-600 hover:bg-red-700">
        {buttonLabel}
      </Button>
    </div>
  );
}
