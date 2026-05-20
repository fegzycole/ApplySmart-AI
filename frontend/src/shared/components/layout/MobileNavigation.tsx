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
    <div className="py-2 lg:hidden sm:py-3">
      <NavigationLinks variant="mobile" onNavigate={onNavigate} />
    </div>
  );
}
