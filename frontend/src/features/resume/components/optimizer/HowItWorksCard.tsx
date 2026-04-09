import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { HOW_IT_WORKS_STEPS } from "../../constants/optimizer.constants";

export function HowItWorksCard() {
  return (
    <Card className="border-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600 shadow-2xl shadow-violet-500/50 dark:shadow-violet-900/50">
      <CardHeader>
        <CardTitle className="text-white text-xl">How It Works</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {HOW_IT_WORKS_STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="flex items-start gap-4">
              <div className="size-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg">
                <Icon className="size-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">{step.title}</p>
                <p className="text-sm text-violet-100">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
