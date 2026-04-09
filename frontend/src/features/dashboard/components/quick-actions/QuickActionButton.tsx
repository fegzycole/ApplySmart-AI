import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { QuickAction } from "../../types/dashboard.types";
import { QUICK_ACTIONS_STYLES } from "../../constants/dashboard.constants";

interface QuickActionButtonProps {
  action: QuickAction;
}

export function QuickActionButton({ action }: QuickActionButtonProps) {
  const navigate = useNavigate();
  const Icon = action.icon;

  const handleClick = () => {
    navigate(action.path);
  };

  return (
    <Button onClick={handleClick} className={QUICK_ACTIONS_STYLES.button}>
      <Icon className={QUICK_ACTIONS_STYLES.icon} />
      {action.label}
    </Button>
  );
}
