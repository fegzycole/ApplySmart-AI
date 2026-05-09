import { Link } from "react-router";
import {
  ChevronDown,
  LogOut,
  Moon,
  Settings,
  Sparkles,
  Sun,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { UserAvatar } from "@/shared/components/UserAvatar";
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
    userFirstName,
    userLastName,
    userFullName,
    userImageUrl,
    userEmail,
  } = useUserMenu();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-12 items-center gap-3 rounded-2xl px-2 sm:px-4 hover:bg-zinc-900/5 dark:hover:bg-white/5 transition-all active:scale-95 group"
        >
          <div className="relative">
            <UserAvatar
              firstName={userFirstName}
              lastName={userLastName}
              imageUrl={userImageUrl}
              className="size-9 rounded-xl border-2 border-white dark:border-zinc-800 shadow-lg group-hover:scale-105 transition-transform"
              textClassName="text-sm font-black"
            />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background bg-emerald-500 shadow-sm" />
          </div>
          <div className="hidden md:flex flex-col items-start leading-none">
            <span className="text-sm font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              {userFullName}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mt-1">
              System Core
            </span>
          </div>
          <ChevronDown className="size-3.5 text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-72 rounded-[2rem] border-2 border-white/60 bg-white/40 p-3 shadow-2xl backdrop-blur-3xl dark:border-zinc-800/60 dark:bg-zinc-900/40"
      >
        <div className="px-4 py-5 mb-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="text-lg font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none">
                {userFirstName}{" "}
                <span className="text-zinc-400">{userLastName}</span>
              </p>
            </div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">
              {userEmail}
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 text-white dark:bg-sky-600 w-fit">
            <Sparkles className="size-3 text-amber-400" />
            <span className="text-[9px] font-black uppercase tracking-widest">
              {FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED
                ? "Pro Synthesis Tier"
                : "Standard Tier"}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800 mx-2" />

        <div className="grid gap-1 py-2">
          <DropdownMenuItem
            asChild
            className="focus:bg-zinc-900/5 dark:focus:bg-white/5 rounded-xl transition-all"
          >
            <Link
              to="/app/settings"
              className="flex items-center gap-3 px-4 py-3 cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-800">
                <Settings className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-zinc-700 dark:text-zinc-300">
                  Terminal
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                  Calibration Panel
                </span>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-3 focus:bg-zinc-900/5 dark:focus:bg-white/5 rounded-xl transition-all cursor-pointer group/theme"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 group-hover/theme:bg-amber-500 group-hover/theme:text-white transition-all">
              {isDarkTheme ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-zinc-700 dark:text-zinc-300">
                {isDarkTheme ? "Solar Mode" : "Lunar Mode"}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                Environment Shift
              </span>
            </div>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800 mx-2" />

        <div className="py-2">
          <DropdownMenuItem
            onClick={logout}
            disabled={isLoggingOut}
            className="flex items-center gap-3 px-4 py-3 focus:bg-rose-500/10 rounded-xl transition-all cursor-pointer group/logout"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-500 dark:bg-rose-950/30 dark:text-rose-400 group-hover/logout:bg-rose-500 group-hover/logout:text-white transition-all">
              <LogOut className="size-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black tracking-tight text-rose-600 dark:text-rose-400">
                {isLoggingOut ? "Disconnecting..." : "Terminate Session"}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-rose-400/60">
                Node Ejection
              </span>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
