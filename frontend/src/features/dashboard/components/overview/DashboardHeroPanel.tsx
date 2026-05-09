import { Link } from "react-router";
import { ArrowUpRight, Plus, Rocket, Target, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import type { DashboardData } from "../../types/dashboard.types";
import { DASHBOARD_ACTIONS } from "../../constants/dashboard.constants";
import { formatPercent } from "../../utils/dashboard-formatters";

interface DashboardHeroPanelProps {
  data: DashboardData;
}

export function DashboardHeroPanel({ data }: DashboardHeroPanelProps) {
  const { documents, overview } = data;
  const tailoredResumes = documents.optimizedResumes + documents.builtResumes;

  const heroStats = [
    {
      label: "Active pipeline",
      value: String(overview.activeApplications),
      icon: Rocket,
      color: "text-sky-500",
    },
    {
      label: "Response rate",
      value: formatPercent(overview.responseRate),
      trend: "+2.4% velocity",
      icon: Target,
      color: "text-amber-500",
    },
    {
      label: "Tailored resumes",
      value: String(tailoredResumes),
      icon: Sparkles,
      color: "text-emerald-500",
    },
  ];

  return (
    <section className="group relative overflow-hidden rounded-[3rem] border-2 border-white/60 bg-white/40 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.12)] backdrop-blur-3xl transition-all duration-1000 hover:shadow-[0_80px_160px_-32px_rgba(0,0,0,0.16)] dark:border-zinc-800/40 dark:bg-zinc-900/40 sm:rounded-[4.5rem]">
      {/* Immersive Background Visualizer - "Neural Pulse" */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[120px] animate-pulse" />
        <div className="absolute -right-20 -bottom-20 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[120px] animate-pulse [animation-delay:2s]" />

        {/* Dynamic Trajectory Lines */}
        <svg className="absolute bottom-0 left-0 w-full h-[300px] opacity-[0.08] dark:opacity-[0.15]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,150 C300,250 600,50 1000,150" fill="none" stroke="url(#pulse-grad)" strokeWidth="4" className="text-sky-500">
            <animate attributeName="d" dur="15s" repeatCount="indefinite"
              values="M0,150 C300,250 600,50 1000,150;
                      M0,150 C400,50 700,250 1000,150;
                      M0,150 C300,250 600,50 1000,150" />
          </path>
        </svg>
        
        {/* Frosted Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <div className="relative grid gap-6 p-5 sm:gap-8 sm:p-8 lg:gap-10 lg:grid-cols-[1fr_420px] lg:p-10 xl:gap-14 xl:p-16 items-start">
        <div className="flex flex-col justify-between space-y-6 sm:space-y-8 xl:space-y-12 leading-none">
          <div className="space-y-5 sm:space-y-6 xl:space-y-8">
            <div className="inline-flex items-center gap-3 rounded-2xl border-2 border-sky-500/20 bg-sky-500/5 px-3 py-1.5 sm:px-5 sm:py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400 leading-none">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
              </span>
              Neural Command Active
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="max-w-4xl text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-4xl xl:text-6xl 2xl:text-8xl leading-[0.85] uppercase">
                Calibrate your <span className="text-sky-500">Career Velocity.</span>
              </h2>
              <p className="max-w-2xl text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base xl:text-lg">
                Your job search isn't just a list—it's a system. Monitor your search health, move with intent, and accelerate your landing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 xl:gap-5">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="group/stat relative overflow-hidden rounded-[2.5rem] border-2 border-zinc-100 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] p-4 sm:p-5 xl:p-6 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_48px_96px_-16px_rgba(0,0,0,0.1)] dark:bg-zinc-900/60 dark:border-zinc-800/60"
              >
                <div className="relative z-10 space-y-4 xl:space-y-6">
                  <div className="flex items-center justify-between gap-2">
                    <p className="min-w-0 truncate text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover/stat:text-zinc-600 transition-colors">
                      {stat.label}
                    </p>
                    <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-50 shadow-inner dark:bg-zinc-800 transition-transform duration-700 group-hover/stat:scale-110 xl:h-10 xl:w-10", stat.color)}>
                       <stat.icon className="size-4 xl:size-5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-4xl xl:text-5xl">
                      {stat.value}
                    </p>
                    {stat.trend && (
                      <div className="flex items-start gap-2">
                        <div className="mt-[0.22rem] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[11px] font-black uppercase leading-[1.1] tracking-widest text-emerald-600 dark:text-emerald-400">
                          {stat.trend}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Active Aura */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Direct Action Command Center */}
        <div className="relative flex flex-col rounded-[3rem] border-2 border-zinc-100 bg-zinc-50/50 p-5 sm:p-6 xl:p-8 dark:bg-zinc-950/40 dark:border-zinc-800/60 shadow-inner overflow-hidden lg:self-start">
           <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[80px] -z-10" />

          <div className="mb-6 sm:mb-8 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 leading-none">
              Command Modules
            </h3>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-zinc-800">
              <Plus className="size-4 text-zinc-400" />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {DASHBOARD_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.path}
                  to={action.path}
                  className="group flex items-center gap-5 rounded-[1.75rem] border-2 border-transparent bg-white p-5 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.04)] transition-all duration-500 hover:border-sky-500/30 hover:scale-[1.02] dark:bg-zinc-900/60"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-xl transition-all duration-500 group-hover:bg-sky-600 group-hover:rotate-12 dark:bg-zinc-800">
                    <Icon className="size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-black tracking-tight text-zinc-900 dark:text-white uppercase leading-none">{action.label}</p>
                      <ArrowUpRight className="size-5 text-zinc-300 transition-all duration-500 group-hover:text-sky-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-zinc-400 truncate">
                      {action.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <Button
            asChild
            className="mt-5 h-12 w-full rounded-2xl bg-zinc-900 text-white font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 hover:scale-[1.05] active:scale-[0.95] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] hover:shadow-sky-500/20 hover:bg-sky-600 sm:mt-6 sm:h-14 xl:mt-8 xl:h-16 dark:bg-sky-600"
          >
            <Link to="/app/job-tracker" className="flex items-center justify-center gap-3">
              Engage Tracker
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
