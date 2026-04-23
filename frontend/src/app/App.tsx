import { RouterProvider } from "react-router";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes";
import { Toaster } from "@/shared/components/ui/sonner";
import { queryClient } from "@/shared/config/query-client";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
