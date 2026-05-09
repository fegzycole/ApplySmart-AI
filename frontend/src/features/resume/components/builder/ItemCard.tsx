import { ReactNode } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface ItemCardProps {
  label: string;
  onDelete: () => void;
  children: ReactNode;
}

export function ItemCard({ label, onDelete, children }: ItemCardProps) {
  return (
    <div className="group relative rounded-[1.75rem] sm:rounded-[2rem] lg:rounded-[2.5rem] border-2 border-border bg-card/30 p-4 sm:p-6 lg:p-8 backdrop-blur-xl transition-all hover:bg-card/50 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
      <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary">
            <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-primary/20 animate-pulse" />
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
            {label}
          </span>
        </div>
        
        <Button
          onClick={onDelete}
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-all active:scale-90"
        >
          <Trash2 className="size-3.5 sm:size-4" />
        </Button>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {children}
      </div>
    </div>
  );
}
