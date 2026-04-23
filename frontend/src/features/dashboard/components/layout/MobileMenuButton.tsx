import { Menu, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface MobileMenuButtonProps {
  open: boolean;
  onToggle: () => void;
}

export function MobileMenuButton({ open, onToggle }: MobileMenuButtonProps) {
  return (
    <Button variant="ghost" size="icon" onClick={onToggle} className="lg:hidden">
      {open ? <X className="size-5" /> : <Menu className="size-5" />}
    </Button>
  );
}
