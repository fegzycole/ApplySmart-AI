import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { AlertCircle, ArrowRight } from "lucide-react";
import { IMPROVEMENTS, OPTIMIZER_STYLES } from "../../constants/optimizer.constants";

export function ImprovementsCard() {
  return (
    <Card className={OPTIMIZER_STYLES.cardClassName}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
            <AlertCircle className="size-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Improvements</CardTitle>
            <CardDescription>Areas to enhance for better results</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {IMPROVEMENTS.map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-900">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-zinc-900 dark:text-white text-sm">{item.title}</p>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                item.priority === 'High'
                  ? 'bg-red-500 text-white'
                  : 'bg-amber-500 text-white'
              }`}>{item.priority}</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{item.desc}</p>
            <Button variant="link" className="h-auto p-0 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent text-xs font-semibold">
              Apply Suggestion <ArrowRight className="size-3 ml-1" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
