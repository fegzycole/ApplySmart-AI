import { LucideIcon, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  message: string;
  buttonLabel: string;
  onAdd: () => void;
}

export function EmptyState({ icon: Icon, message, buttonLabel, onAdd }: EmptyStateProps) {
  return (
    <div className="text-center py-20 border-2 border-dashed border-border/50 bg-background/20 rounded-[2.5rem] transition-all hover:bg-background/40 group">
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-muted/50 text-muted-foreground/30 mb-8 transition-all group-hover:scale-110 group-hover:rotate-6">
        <Icon className="size-10" />
        <div className="absolute inset-0 rounded-3xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/40 mb-8">{message}</p>
      <Button 
        onClick={onAdd} 
        variant="outline" 
        className="h-12 px-8 rounded-full border-2 border-primary/20 bg-background/50 font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
      >
        <Plus className="size-4 mr-2" />
        {buttonLabel}
      </Button>
    </div>
  );
}
