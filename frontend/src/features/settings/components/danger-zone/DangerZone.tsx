import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { DangerAction } from "./DangerAction";
import { DANGER_ZONE_CONFIG, DANGEROUS_ACTIONS } from "../../constants/danger-zone.constants";

export function DangerZone() {
  const Icon = DANGER_ZONE_CONFIG.icon;

  return (
    <Card className={DANGER_ZONE_CONFIG.cardClassName}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-xl bg-gradient-to-br ${DANGER_ZONE_CONFIG.iconGradient} flex items-center justify-center shadow-lg`}>
            <Icon className="size-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-red-600 dark:text-red-400">
              {DANGER_ZONE_CONFIG.title}
            </CardTitle>
            <CardDescription>{DANGER_ZONE_CONFIG.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {DANGEROUS_ACTIONS.map((action) => (
          <DangerAction key={action.id} {...action} />
        ))}
      </CardContent>
    </Card>
  );
}
