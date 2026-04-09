import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Wand2 } from "lucide-react";
import { AI_ANALYSIS_FEATURES, OPTIMIZER_STYLES } from "../../constants/optimizer.constants";

export function AIAnalysisCard() {
  return (
    <Card className={OPTIMIZER_STYLES.cardClassName}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wand2 className="size-5 text-violet-600 dark:text-violet-400" />
          <CardTitle className="text-lg">AI Analysis</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {AI_ANALYSIS_FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/50 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition-colors duration-200"
            >
              <div className={`size-8 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <Icon className="size-4 text-white" />
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 pt-1">{feature.text}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
