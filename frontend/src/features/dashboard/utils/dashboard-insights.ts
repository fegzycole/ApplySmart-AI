import type { DashboardData, DashboardInsight, DashboardMetricCardData } from "../types/dashboard.types";
import { formatPercent } from "./dashboard-formatters";

export function buildDashboardMetricCards(data: DashboardData): DashboardMetricCardData[] {
  const { overview } = data;

  return [
    {
      label: "Roles Tracked",
      value: String(overview.totalApplications),
      hint: `${overview.applicationsThisMonth} added in the last 30 days`,
    },
    {
      label: "Companies Targeted",
      value: String(overview.uniqueCompanies),
      hint: `${overview.savedApplications} still in saved status`,
    },
    {
      label: "Interviews in Motion",
      value: String(overview.interviews),
      hint: `${formatPercent(overview.responseRate)} response rate so far`,
    },
    {
      label: "Offers Won",
      value: String(overview.offers),
      hint: `${formatPercent(overview.offerRate)} offer rate across submitted roles`,
    },
  ];
}

export function buildDashboardInsights(data: DashboardData): DashboardInsight[] {
  const { documents, overview } = data;
  const tailoredResumes = documents.optimizedResumes + documents.builtResumes;

  return [
    {
      id: "weekly-pace",
      label: "Weekly pace",
      value: `${overview.applicationsThisWeek} applications`,
      description:
        overview.applicationsThisWeek >= 5
          ? "You are hitting the default weekly target."
          : "You are below the default weekly target of 5 applications.",
      tone: overview.applicationsThisWeek >= 5 ? "emerald" : "amber",
    },
    {
      id: "stale-pipeline",
      label: "Stale pipeline",
      value: String(overview.staleApplications),
      description:
        overview.staleApplications > 0
          ? "These live applications have not moved in 14+ days."
          : "No stale live applications right now.",
      tone: overview.staleApplications > 0 ? "amber" : "emerald",
    },
    {
      id: "deadlines",
      label: "Deadlines soon",
      value: String(overview.upcomingDeadlines),
      description:
        overview.upcomingDeadlines > 0
          ? "Applications due within the next 7 days."
          : "No near-term deadlines are currently tracked.",
      tone: overview.upcomingDeadlines > 0 ? "violet" : "cyan",
    },
    {
      id: "tailored-docs",
      label: "Tailored resumes",
      value: String(tailoredResumes),
      description:
        tailoredResumes > 0
          ? "Optimized and builder-produced resumes ready for targeted applications."
          : "You do not have any tailored resume variants yet.",
      tone: tailoredResumes > 0 ? "cyan" : "amber",
    },
  ];
}
