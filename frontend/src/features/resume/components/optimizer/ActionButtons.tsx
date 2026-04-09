import { Button } from "@/shared/components/ui/button";
import { Download } from "lucide-react";

interface ActionButtonsProps {
  onOptimizeAnother: () => void;
}

export function ActionButtons({ onOptimizeAnother }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        size="lg"
        className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/50 dark:shadow-violet-900/50 px-8"
      >
        <Download className="size-5 mr-2" />
        Download Optimized Resume
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="border-2 border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950/30 rounded-xl px-8"
        onClick={onOptimizeAnother}
      >
        Optimize Another
      </Button>
    </div>
  );
}
