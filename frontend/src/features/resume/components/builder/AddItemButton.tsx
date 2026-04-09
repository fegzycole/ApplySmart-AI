import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";

interface AddItemButtonProps {
  label: string;
  onClick: () => void;
  borderColor: string;
  hoverColor: string;
}

export function AddItemButton({ label, onClick, borderColor, hoverColor }: AddItemButtonProps) {
  return (
    <Button
      variant="outline"
      className={`w-full h-12 border-2 border-dashed ${borderColor} hover:${borderColor.replace('border-', 'border-')} ${hoverColor} rounded-xl transition-all duration-300`}
      onClick={onClick}
    >
      <Plus className="size-5 mr-2" />
      {label}
    </Button>
  );
}
