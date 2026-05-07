import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { DeleteAccountAction } from "./DeleteAccountAction";

interface DangerZoneProps {
  isReady: boolean;
}

export function DangerZone({ isReady }: DangerZoneProps) {
  return (
    <Card className="overflow-hidden rounded-[1.5rem] border border-red-200/80 bg-red-50/80 shadow-sm dark:border-red-950/70 dark:bg-red-950/20 sm:rounded-[1.75rem]">
      <CardHeader className="px-4 pb-4 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg">
            <AlertTriangle className="size-5 text-white" />
          </div>
          <div className="min-w-0">
            <CardTitle className="text-lg text-red-600 dark:text-red-400 sm:text-xl">
              Danger Zone
            </CardTitle>
            <CardDescription className="mt-1 text-sm leading-6">
              Irreversible actions for your account and stored data.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0 sm:px-6 sm:pb-6">
        <DeleteAccountAction isReady={isReady} />
      </CardContent>
    </Card>
  );
}
