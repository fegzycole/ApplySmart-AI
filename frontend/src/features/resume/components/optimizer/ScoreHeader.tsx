import { Card, CardContent } from "@/shared/components/ui/card";
import { ScoreMetric } from "./ScoreMetric";
import { SCORE_METRICS } from "../../constants/optimizer.constants";

export function ScoreHeader() {
  return (
    <Card className="border-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 shadow-2xl shadow-violet-500/50 dark:shadow-violet-900/50 overflow-hidden">
      <CardContent className="pt-8 pb-8">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {SCORE_METRICS.map((metric, i) => (
            <ScoreMetric key={i} {...metric} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
