import { LayoutDashboard, Zap } from "lucide-react";
import { WorkspacePageHeader } from "@/shared/components/WorkspacePageHeader";
import { DASHBOARD_HEADER_CONTENT } from "../../constants/dashboard.constants";

export function DashboardPageHeader() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6 sm:gap-5 lg:mb-12">
      <WorkspacePageHeader
        className="mb-0"
        badge="Mission Control"
        badgeIcon={LayoutDashboard}
        title={`${getGreeting()}, Commander`}
        description={DASHBOARD_HEADER_CONTENT.description}
      />
      
      <div className="flex items-center gap-4 self-start lg:self-auto">
        <div className="flex flex-col items-end gap-1">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Search Vitality
          </span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
              <div 
                className="h-full rounded-full bg-primary shadow-[0_0_12px_rgba(var(--color-primary),0.4)]" 
                style={{ width: '78%' }} 
              />
            </div>
            <span className="text-sm font-bold tabular-nums text-foreground">78%</span>
          </div>
        </div>
        
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 text-primary shadow-lg shadow-primary/10">
          <Zap className="size-5 fill-current" />
        </div>
      </div>
    </div>
  );
}
