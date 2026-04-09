import { Trash2 } from "lucide-react";

export const DANGER_ZONE_CONFIG = {
  title: "Danger Zone",
  description: "Irreversible actions for your account",
  icon: Trash2,
  iconGradient: "from-red-500 to-rose-600",
  cardClassName: "bg-red-50/80 dark:bg-red-950/20 backdrop-blur-xl shadow-xl border-2 border-red-200 dark:border-red-900"
};

export const DANGEROUS_ACTIONS = [
  {
    id: "delete-account",
    title: "Delete Account",
    description: "Permanently delete your account and all data",
    buttonLabel: "Delete Account",
    variant: "destructive" as const
  }
];
