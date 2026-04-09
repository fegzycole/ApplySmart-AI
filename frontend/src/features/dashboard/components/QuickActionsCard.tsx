import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { QUICK_ACTIONS_STYLES, QUICK_ACTIONS } from "../constants/dashboard.constants";
import { QuickActionButton } from "./quick-actions";
import { PlusCircle, FileCheck, FileText } from "lucide-react";
import type { QuickAction } from "../types/dashboard.types";

const QUICK_ACTIONS_DATA: QuickAction[] = [
  {
    ...QUICK_ACTIONS.ADD_APPLICATION,
    icon: PlusCircle,
  },
  {
    ...QUICK_ACTIONS.OPTIMIZE_RESUME,
    icon: FileCheck,
  },
  {
    ...QUICK_ACTIONS.GENERATE_COVER_LETTER,
    icon: FileText,
  },
];

export function QuickActionsCard() {
  return (
    <Card className={QUICK_ACTIONS_STYLES.card}>
      <CardHeader>
        <CardTitle className={QUICK_ACTIONS_STYLES.title}>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className={QUICK_ACTIONS_STYLES.content}>
        {QUICK_ACTIONS_DATA.map((action, index) => (
          <QuickActionButton key={index} action={action} />
        ))}
      </CardContent>
    </Card>
  );
}
