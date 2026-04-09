import { LucideIcon } from "lucide-react";

interface ScoreMetricProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export function ScoreMetric({ icon: Icon, value, label }: ScoreMetricProps) {
  return (
    <div>
      <div className="size-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 shadow-lg">
        <Icon className="size-10 text-white" />
      </div>
      <p className="text-5xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-violet-100">{label}</p>
    </div>
  );
}
