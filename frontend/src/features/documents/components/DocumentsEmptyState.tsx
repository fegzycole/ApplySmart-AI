import { Link } from "react-router";
import { motion } from "framer-motion";
import { PenSquare, Sparkles, Compass, ShieldAlert } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface DocumentsEmptyStateProps {
  hasSearchQuery: boolean;
}

export function DocumentsEmptyState({
  hasSearchQuery,
}: DocumentsEmptyStateProps) {
  return (
    <div className="group relative overflow-hidden rounded-[4rem] p-24 text-center bg-white border border-zinc-100 shadow-2xl shadow-zinc-200/50 dark:bg-zinc-900 dark:border-zinc-800 dark:shadow-none">
      {/* Premium Artifact Aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-200/20 via-indigo-200/10 to-transparent blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      {/* Frosted Grain Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mx-auto mb-12 flex h-32 w-32 items-center justify-center rounded-[3rem] bg-sky-50 text-sky-600 shadow-sm group-hover:scale-110 transition-transform duration-700 dark:bg-sky-900/20 dark:text-sky-400">
          {hasSearchQuery ? <ShieldAlert className="size-16" /> : <Compass className="size-16" />}
          <motion.div 
            className="absolute inset-0 rounded-[3rem] bg-sky-200/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <h2 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 leading-none">
          {hasSearchQuery ? "Query Fragment Not Found" : "Vault offline, ready for synthesis"}
        </h2>
        
        <p className="mx-auto mt-8 max-w-2xl text-xl font-medium text-zinc-500 leading-relaxed dark:text-zinc-400">
          {hasSearchQuery
            ? "Your search query yielded no artifacts. Refine your parameters to re-scan the vault library."
            : "Every great professional narrative begins with a single artifact. Initiate synthesis to start filling your secure career vault."}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <Link to="/app/resume-builder">
            <Button className="h-16 px-10 rounded-3xl bg-zinc-900 text-white font-bold tracking-tight shadow-2xl shadow-zinc-900/20 hover:scale-105 active:scale-95 transition-all dark:bg-sky-600 dark:shadow-sky-900/20">
              <PenSquare className="mr-3 size-5" />
              Build New Artifact
            </Button>
          </Link>
          <Link to="/app/cover-letter">
            <Button
              variant="outline"
              className="h-16 px-10 rounded-3xl border-2 border-zinc-100 bg-white/50 backdrop-blur-xl font-bold tracking-tight hover:bg-zinc-50 active:scale-95 transition-all dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <Sparkles className="mr-3 size-5 text-sky-500" />
              Synthesize Letter
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
