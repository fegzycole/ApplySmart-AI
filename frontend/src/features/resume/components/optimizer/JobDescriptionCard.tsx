import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Textarea } from "@/shared/components/ui/textarea";
import { FileText, Lightbulb } from "lucide-react";
import { OPTIMIZER_STYLES } from "../../constants/optimizer.constants";

export function JobDescriptionCard() {
  return (
    <Card className={OPTIMIZER_STYLES.cardClassName}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
            <FileText className="size-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Job Description</CardTitle>
            <CardDescription className="text-sm">Paste the job posting you're targeting</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 group">
          <div className="relative">
            <Textarea
              placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
              className="min-h-[240px] bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-violet-500 dark:focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all duration-300 resize-none"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity duration-300" />
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 flex items-center gap-1">
            <Lightbulb className="size-3" />
            Pro tip: Include all sections from the job posting for best results
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
