import { Outlet } from "react-router";
import { AppHeader } from "./AppHeader";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
