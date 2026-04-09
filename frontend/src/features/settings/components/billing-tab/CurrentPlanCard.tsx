import { Crown, Sparkles } from "lucide-react";

interface CurrentPlanCardProps {
  name: string;
  price: string;
  renewalDate: string;
  status: string;
}

export function CurrentPlanCard({ name, price, renewalDate, status }: CurrentPlanCardProps) {
  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Crown className="size-6" />
            <div>
              <p className="font-bold text-xl">{name}</p>
              <p className="text-white/80 text-sm">{price}</p>
            </div>
          </div>
          <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full font-medium">
            {status}
          </span>
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <Sparkles className="size-4" />
          <p className="text-sm">Your subscription renews on {renewalDate}</p>
        </div>
      </div>
    </div>
  );
}
