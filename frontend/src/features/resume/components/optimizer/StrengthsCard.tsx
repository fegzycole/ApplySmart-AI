import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { STRENGTHS, OPTIMIZER_STYLES } from "../../constants/optimizer.constants";

export function StrengthsCard() {
  return (
    <Card className={OPTIMIZER_STYLES.cardClassName}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
            <CheckCircle2 className="size-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">What's Working</CardTitle>
            <CardDescription>Your resume's strong points</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {STRENGTHS.map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200 dark:border-emerald-900">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-zinc-900 dark:text-white text-sm">{item.title}</p>
              <span className="px-2 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold">{item.score}%</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
