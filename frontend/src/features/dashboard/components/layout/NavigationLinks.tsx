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
    ? "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
    : "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all";

  if (active) {
    return isDesktop
      ? `${baseClassName} bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25`
      : `${baseClassName} bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white`;
  }

  return `${baseClassName} text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800`;
}
