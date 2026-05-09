import { Link, useLocation } from "react-router";
import { cn } from "@/shared/lib/utils";
import { APP_NAVIGATION, isActiveRoute } from "./app-navigation";

interface NavigationLinksProps {
  onNavigate?: () => void;
  variant: "desktop" | "mobile";
}

export function NavigationLinks({ onNavigate, variant }: NavigationLinksProps) {
  const { pathname } = useLocation();
  const isDesktop = variant === "desktop";

  return (
    <div className={isDesktop ? "hidden lg:flex items-center gap-0.5 xl:gap-1" : "space-y-1"}>
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
            <Icon className={isDesktop ? "size-3.5 xl:size-4" : "size-5"} />
            <span className={cn(isDesktop && "hidden 2xl:inline")}>{item.name}</span>
            <span className={cn(isDesktop ? "inline 2xl:hidden" : "hidden")}>{item.shortName}</span>
          </Link>
        );
      })}
    </div>
  );
}

function getNavigationLinkClassName(isDesktop: boolean, active: boolean) {
  const baseClassName = isDesktop
    ? "flex cursor-pointer items-center gap-1.5 xl:gap-2 rounded-full px-2.5 py-1.5 xl:px-4 text-[11px] xl:text-xs font-black uppercase tracking-widest transition-all duration-500"
    : "flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 sm:gap-4 sm:px-5 sm:py-4 sm:text-base";

  if (active) {
    return `${baseClassName} bg-zinc-900 text-white shadow-xl shadow-zinc-900/10 dark:bg-sky-600 dark:shadow-sky-900/10`;
  }

  return `${baseClassName} text-zinc-400 hover:text-zinc-900 hover:bg-zinc-900/5 dark:text-zinc-500 dark:hover:text-zinc-50 dark:hover:bg-white/5`;
}
