import { Link } from "react-router";
import { ArrowUpRight, Plus, Rocket } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
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
    },
    {
      label: "Response rate",
      value: formatPercent(overview.responseRate),
      trend: "+2.4% from last month",
    },
    {
      label: "Tailored resumes",
      value: String(tailoredResumes),
    },
  ];

  return (
    <section className="group relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/5 dark:shadow-none sm:rounded-[3rem]">
      {/* Immersive Background Visualizer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-30">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
        
        {/* Pipeline Pulse SVG */}
        <svg className="absolute bottom-0 left-0 w-full h-32 text-primary/5 dark:text-primary/10" preserveAspectRatio="none">
          <path d="M0,100 C150,150 350,0 500,100 C650,200 850,50 1000,100 L1000,200 L0,200 Z" fill="currentColor">
            <animate attributeName="d" dur="10s" repeatCount="indefinite"
              values="M0,100 C150,150 350,0 500,100 C650,200 850,50 1000,100 L1000,200 L0,200 Z;
                      M0,100 C200,50 400,150 500,100 C600,50 800,150 1000,100 L1000,200 L0,200 Z;
                      M0,100 C150,150 350,0 500,100 C650,200 850,50 1000,100 L1000,200 L0,200 Z" />
          </path>
        </svg>
      </div>

      <div className="relative grid gap-6 p-4 sm:gap-8 sm:p-6 lg:grid-cols-[1fr_380px] lg:p-10">
        <div className="flex flex-col justify-between space-y-6 sm:space-y-10">
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Pipeline Live
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl">
                Command your <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">career momentum.</span>
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
                Your job search isn't just a list—it's a system. Monitor your health, move with intent, and accelerate your landing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="group/stat relative overflow-hidden rounded-[1.5rem] border border-border bg-background/50 p-3 transition-all hover:border-primary/20 hover:bg-card sm:rounded-[2rem] sm:p-6 dark:bg-zinc-900/40"
              >
                <p className="text-[0.55rem] font-bold uppercase tracking-[0.15em] text-muted-foreground sm:text-[0.65rem] sm:tracking-[0.2em]">
                  {stat.label}
                </p>
                <div className="mt-2 flex items-end justify-between sm:mt-4">
                  <p className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {stat.value}
                  </p>
                  {stat.icon && <stat.icon className="hidden size-6 text-primary opacity-20 transition-opacity group-hover/stat:opacity-100 sm:block" />}
                </div>
                {stat.trend && (
                  <p className="mt-1 hidden text-xs font-medium text-emerald-600 sm:mt-3 sm:block dark:text-emerald-400">
                    {stat.trend}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col rounded-[2rem] border border-border bg-secondary/30 p-4 sm:rounded-[2.5rem] sm:p-6">
          <div className="mb-4 flex items-center justify-between sm:mb-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Direct Actions
            </h3>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Plus className="size-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-2 sm:space-y-3">
            {DASHBOARD_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.path}
                  to={action.path}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 sm:gap-4 sm:rounded-3xl sm:p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Icon className="size-4 sm:size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-foreground sm:text-base">{action.label}</p>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <Button
            asChild
            className="mt-4 h-12 w-full rounded-2xl bg-primary text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20 sm:mt-6 sm:h-14"
          >
            <Link to="/app/job-tracker" className="flex items-center justify-center gap-2">
              Launch Job Tracker
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
