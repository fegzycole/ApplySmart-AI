import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Button } from "@/shared/components/ui/button";
import {
  LayoutDashboard,
  Target,
  FileText,
  Mail,
  Briefcase,
  BarChart3,
  Settings,
  Sparkles,
  Moon,
  Sun,
  Menu,
  X,
  FolderOpen,
  Edit3,
  LogOut
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { toast } from "sonner";
import { useLogout } from "@/features/authentication/hooks/useAuthQueries";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";

const navigation = [
  { name: "Dashboard", href: "/app", icon: LayoutDashboard },
  { name: "Resume Optimizer", href: "/app/resume-optimizer", icon: Target },
  { name: "Resume Builder", href: "/app/resume-builder", icon: Edit3 },
  { name: "My Resumes", href: "/app/resumes", icon: FolderOpen },
  { name: "Cover Letter", href: "/app/cover-letter", icon: Mail },
  { name: "Job Tracker", href: "/app/job-tracker", icon: Briefcase },
  { name: "Settings", href: "/app/settings", icon: Settings },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoutMutation = useLogout();

  const isActive = (href: string) => {
    if (href === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-zinc-950 dark:via-violet-950/10 dark:to-zinc-950 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-400/20 to-fuchsia-600/20 dark:from-violet-600/10 dark:to-fuchsia-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/20 to-teal-600/20 dark:from-cyan-600/10 dark:to-teal-800/10 rounded-full blur-3xl" />
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-violet-200 dark:border-violet-800 shadow-lg"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-40 h-screen w-64 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-r border-violet-200/50 dark:border-violet-800/50
          transition-transform duration-200 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center gap-2 px-6 border-b border-violet-200/50 dark:border-violet-800/50">
            <div className="size-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
              <Sparkles className="size-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">ApplySmart AI</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto flex flex-col">
            <div className="space-y-1 flex-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer
                      ${active
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/50 dark:shadow-violet-900/50 font-medium'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-violet-100/50 dark:hover:bg-violet-950/30'
                      }
                    `}
                  >
                    <Icon className="size-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Logout button as nav item */}
            <div className="mt-2 pt-2 border-t border-violet-200/50 dark:border-violet-800/50">
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer text-zinc-600 dark:text-zinc-400 hover:bg-violet-100/50 dark:hover:bg-violet-950/30 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className="size-5 flex-shrink-0" />
                <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
              </button>
            </div>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-violet-200/50 dark:border-violet-800/50 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30">
              <div className="size-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-semibold text-sm">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                  John Doe
                </p>
                {FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED && (
                  <p className="text-xs bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-semibold truncate">
                    Pro Plan
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full border-violet-200 dark:border-violet-800 hover:bg-violet-100/50 dark:hover:bg-violet-950/30 cursor-pointer"
            >
              {theme === "dark" ? (
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
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-64 relative z-10">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}