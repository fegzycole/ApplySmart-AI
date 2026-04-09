import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Zap, Eye } from "lucide-react";
import { MATCHED_KEYWORDS, MISSING_KEYWORDS, OPTIMIZER_STYLES } from "../../constants/optimizer.constants";

export function KeywordAnalysisCard() {
  return (
    <Card className={OPTIMIZER_STYLES.cardClassName}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg">
              <Zap className="size-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Keyword Analysis</CardTitle>
              <CardDescription>Matching keywords from job description</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Eye className="size-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200 dark:border-emerald-900">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Matched Keywords ({MATCHED_KEYWORDS.length})</p>
            <div className="flex flex-wrap gap-2">
              {MATCHED_KEYWORDS.map((kw, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium shadow-sm">
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border border-red-200 dark:border-red-900">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Missing Keywords ({MISSING_KEYWORDS.length})</p>
            <div className="flex flex-wrap gap-2">
              {MISSING_KEYWORDS.map((kw, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-medium shadow-sm">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
