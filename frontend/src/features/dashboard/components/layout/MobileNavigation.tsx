import { NavigationLinks } from "./NavigationLinks";

interface MobileNavigationProps {
  onNavigate: () => void;
  open: boolean;
}

export function MobileNavigation({ onNavigate, open }: MobileNavigationProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 py-3">
      <NavigationLinks variant="mobile" onNavigate={onNavigate} />
    </div>
  );
}
