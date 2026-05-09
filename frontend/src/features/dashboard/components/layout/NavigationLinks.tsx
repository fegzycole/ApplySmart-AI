import { Link, useLocation } from "react-router";
import { APP_NAVIGATION, isActiveRoute } from "./app-navigation";

interface NavigationLinksProps {
  onNavigate?: () => void;
  variant: "desktop" | "mobile";
}

export function NavigationLinks({ onNavigate, variant }: NavigationLinksProps) {
  const { pathname } = useLocation();
  const isDesktop = variant === "desktop";

  return (
    <div className={isDesktop ? "hidden lg:flex items-center gap-1" : "space-y-1"}>
      {APP_NAVIGATION.map((item) => {
        const Icon = item.icon;
        const active = isActiveRoute(pathname, item.href);

        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            className={getNavigationLinkClassName(isDesktop, active)}
          >
            <Icon className={isDesktop ? "size-4" : "size-5"} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

function getNavigationLinkClassName(isDesktop: boolean, active: boolean) {
  const baseClassName = isDesktop
    ? "flex cursor-pointer items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300"
    : "flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 sm:gap-4 sm:px-5 sm:py-4 sm:text-base";

  if (active) {
    return `${baseClassName} bg-primary text-primary-foreground shadow-lg shadow-primary/20`;
  }

  return `${baseClassName} text-muted-foreground hover:text-foreground hover:bg-foreground/5`;
}
