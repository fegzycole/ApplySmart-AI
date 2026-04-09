import { Button } from "@/shared/components/ui/button";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface PaginationButtonProps {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children?: ReactNode;
  className?: string;
}

export function PaginationButton({
  onClick,
  disabled = false,
  active = false,
  icon: Icon,
  iconPosition = "left",
  children,
  className
}: PaginationButtonProps) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && iconPosition === "left" && <Icon className="size-4 mr-2" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="size-4 ml-2" />}
    </Button>
  );
}
