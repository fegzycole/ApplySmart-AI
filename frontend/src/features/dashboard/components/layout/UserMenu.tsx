import { Link } from "react-router";
import { ChevronDown, LogOut, Moon, Settings, Sun } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";
import { useUserMenu } from "./useUserMenu";

export function UserMenu() {
  const {
    isDarkTheme,
    isLoggingOut,
    logout,
    toggleTheme,
    userFullName,
    userInitials,
  } = useUserMenu();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">{userInitials}</span>
          </div>
          <span className="hidden md:block text-sm font-medium">{userFullName}</span>
          <ChevronDown className="size-4 text-zinc-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{userFullName}</p>
          {FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED ? (
            <p className="text-xs text-violet-600 dark:text-violet-400">Pro Plan</p>
          ) : null}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/app/settings" className="cursor-pointer">
            <Settings className="size-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleTheme} className="sm:hidden cursor-pointer">
          {isDarkTheme ? (
            <>
              <Sun className="size-4 mr-2" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="size-4 mr-2" />
              Dark Mode
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          disabled={isLoggingOut}
          className="cursor-pointer text-red-600 dark:text-red-400"
        >
          <LogOut className="size-4 mr-2" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
