import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
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
      description: "Roles currently in applied, interview, or offer stages.",
    },
    {
      label: "Response rate",
      value: formatPercent(overview.responseRate),
      description: "Share of submitted roles that reached interview or offer.",
    },
    {
      label: "Tailored resumes",
      value: String(tailoredResumes),
      description: "Optimized or builder-produced resumes ready for targeted sends.",
    },
  ];

  return (
    <section className="overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white/85 shadow-xl shadow-zinc-200/40 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80 dark:shadow-black/20">
      <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:p-6">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300">
            Pipeline pulse
          </div>

          <div className="space-y-3">
            <h2 className="max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50 sm:text-3xl">
              A clearer picture of where your search is moving and where it is getting stuck.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              Track application momentum, monitor document readiness, and see which parts of your pipeline need attention next.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.4rem] border border-zinc-200/80 bg-zinc-50/90 p-4 dark:border-zinc-800 dark:bg-zinc-900/70"
              >
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  {stat.label}
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-zinc-200/80 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.16),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.14),transparent_38%),rgba(250,250,250,0.95)] p-4 dark:border-zinc-800 dark:bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.14),transparent_38%),rgba(24,24,27,0.92)]">
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Next moves
              </p>
              <p className="mt-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                Move quickly between the tools that change your output.
              </p>
            </div>

            <div className="space-y-2.5">
              {DASHBOARD_ACTIONS.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.path}
                    to={action.path}
                    className="group flex items-start gap-3 rounded-[1.3rem] border border-white/70 bg-white/85 p-3.5 transition hover:border-violet-200 hover:bg-white dark:border-white/10 dark:bg-zinc-950/55 dark:hover:border-violet-900"
                  >
                    <div className="mt-0.5 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600 p-2 text-white shadow-lg shadow-violet-500/20">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-zinc-950 dark:text-zinc-50">{action.label}</p>
                        <ArrowUpRight className="size-4 text-zinc-400 transition group-hover:text-violet-600 dark:group-hover:text-violet-300" />
                      </div>
                      <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        {action.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <Button
              asChild
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 text-white shadow-lg shadow-violet-500/25 hover:from-violet-700 hover:via-fuchsia-700 hover:to-cyan-700"
            >
              <Link to="/app/job-tracker">Open Job Tracker</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
