import { LayoutDashboard, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useCurrentUser } from "@/features/authentication/hooks/useAuthQueries";
import { cn } from "@/shared/lib/utils";
import { DASHBOARD_HEADER_CONTENT } from "../../constants/dashboard.constants";
import type { DashboardData } from "../../types/dashboard.types";

interface DashboardPageHeaderProps {
  data: DashboardData;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Awaiting Orders";
  if (hour < 18) return "System Operational";
  return "Node Active";
}

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning Cycle";
  if (hour < 18) return "Afternoon Cycle";
  return "Evening Cycle";
}

function computeVitalityScore(data: DashboardData): number {
  const { overview, documents } = data;
  const tailoredResumes = documents.optimizedResumes + documents.builtResumes;

  const responseScore = Math.min(overview.responseRate, 100);
  const weeklyActivityScore = Math.min((overview.applicationsThisWeek / 5) * 100, 100);
  const docsScore = tailoredResumes > 0 ? 100 : documents.originalResumes > 0 ? 50 : 0;
  const staleScore = Math.max(0, 100 - overview.staleApplications * 20);

  return Math.round(
    Math.min(100, Math.max(0,
      responseScore * 0.35 +
      weeklyActivityScore * 0.35 +
      docsScore * 0.20 +
      staleScore * 0.10,
    )),
  );
}

function getVitalityStatus(score: number): { label: string; color: string } {
  if (score >= 75) return { label: "Optimal", color: "text-emerald-500" };
  if (score >= 50) return { label: "Active", color: "text-sky-500" };
  if (score >= 25) return { label: "At Risk", color: "text-amber-500" };
  return { label: "Critical", color: "text-rose-500" };
}

export function DashboardPageHeader({ data }: DashboardPageHeaderProps) {
  const { data: user } = useCurrentUser();
  const commanderId = user?.firstName ? user.firstName.toUpperCase() : "—";
  const vitality = computeVitalityScore(data);
  const { label: vitalityLabel, color: vitalityColor } = getVitalityStatus(vitality);

  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6 sm:gap-5 lg:mb-12 px-2 sm:px-4">
      <div className="flex flex-col gap-6 max-w-4xl">
        <div className="flex items-center gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-2xl dark:bg-sky-600 shadow-zinc-900/20">
            <LayoutDashboard className="size-5" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 leading-none">Commander ID</span>
              <span className="text-sm font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-50 mt-1">{commanderId}</span>
            </div>
            <div className="h-6 w-px bg-zinc-100 dark:bg-zinc-800" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 leading-none">System Status</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{getGreeting()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-baseline gap-4">
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl uppercase leading-none">
              {getTimeOfDay()}, <span className="text-zinc-400">Commander</span>
            </h1>
            <div className="hidden sm:block h-2 w-2 rounded-full bg-sky-500 animate-bounce" />
          </div>
          <p className="max-w-2xl text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base opacity-80">
            {DASHBOARD_HEADER_CONTENT.description}
          </p>
        </div>
      </div>

      <div className="group relative self-start lg:self-auto overflow-hidden rounded-[2rem] border border-zinc-100 bg-white/50 p-6 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-950/40 backdrop-blur-lg transition-all duration-700 hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAA699uFAAAABlBMVEUAAAD///+l2Z/dAAAAbUlEQVR42u3TQQqAMAgE0On9T+0v7L8EByIidD+YByIs6v3mAs6C6Iu6v9mAsyD6ou5vNuAsiL6o+5sNOAuiL+r+ZgPOguiLur/ZgLMg+qLubzbgLIi+qPubDTgLoi/q/mYDzoLoi7q/2YCzIPrqX74AGoUBFv6Zk0UAAAAASUVORK5CYII=")`, backgroundRepeat: 'repeat' }} />

        <div className="relative z-10 flex items-center gap-8">
          <div className="flex flex-col items-end gap-4 min-w-[140px]">
            <div className="flex items-center gap-3">
              <Activity className="size-4 text-emerald-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
                Search Vitality
              </span>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black tabular-nums text-zinc-900 dark:text-zinc-50 tracking-tighter">
                  {vitality}<span className="text-sky-500">%</span>
                </span>
                <div className="h-10 w-px bg-zinc-100 dark:bg-zinc-800" />
                <div className="flex flex-col items-start">
                  <span className={cn("text-[10px] font-black uppercase tracking-widest", vitalityColor)}>{vitalityLabel}</span>
                  <span className="text-[9px] font-bold text-zinc-400">Search Posture</span>
                </div>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${vitality}%` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="h-full rounded-full bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.4)]"
                />
              </div>
            </div>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-[1.75rem] bg-zinc-900 text-white shadow-2xl transition-all duration-700 group-hover:bg-sky-600 group-hover:scale-110 group-hover:rotate-12 dark:bg-zinc-800">
            <Zap className="size-8 text-amber-400 fill-amber-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
