import { Crown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function BillingActions() {
  return (
    <div className="flex gap-3">
      <Button className="flex-1 h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg">
        <Crown className="size-4 mr-2" />
        Upgrade Plan
      </Button>
      <Button variant="outline" className="flex-1 h-12 border-2">
        Cancel Subscription
      </Button>
    </div>
  );
}
