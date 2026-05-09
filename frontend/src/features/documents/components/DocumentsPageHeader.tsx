import { Link } from "react-router";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { PenSquare, Search, Sparkles, Vault } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { VAULT_STYLES } from "../constants/documents.constants";

interface DocumentsPageHeaderProps {
  onSearchChange: (value: string) => void;
  searchQuery: string;
}

export function DocumentsPageHeader({
  onSearchChange,
  searchQuery,
}: DocumentsPageHeaderProps) {
  return (
    <div className={cn(VAULT_STYLES.header.container, "w-full overflow-hidden px-4 space-y-6 sm:space-y-10 pb-10 sm:pb-16")}>
      {/* Immersive Background Glow */}
      <div className={cn(VAULT_STYLES.header.glow, "h-48 sm:h-64")} />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className={cn(VAULT_STYLES.header.iconWrapper, "shrink-0 h-20 w-20 sm:h-24 sm:w-24")}
      >
        <Vault className="size-10 sm:size-12" />
        <motion.div 
          className="absolute inset-0 rounded-[1.75rem] sm:rounded-[2.5rem] bg-sky-200/20 dark:bg-sky-400/10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="space-y-4 sm:space-y-6 w-full max-w-4xl px-4">
        <h1 className={cn(VAULT_STYLES.header.title, "text-4xl sm:text-6xl lg:text-8xl break-words")}>
          Document <span className="text-sky-500 drop-shadow-[0_0_25px_rgba(14,165,233,0.4)]">Vault</span>
        </h1>
        <p className="text-base sm:text-xl lg:text-2xl text-zinc-500 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight dark:text-zinc-400">
          Your high-value professional assets, <span className="text-zinc-900 dark:text-zinc-100 font-bold">securely archived</span> and ready for deployment.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 w-full px-4">
        <Link to="/app/resume-builder" className="w-full sm:w-auto">
          <Button className="h-12 sm:h-14 w-full sm:px-10 rounded-2xl bg-zinc-900 text-white font-bold tracking-tight shadow-xl shadow-zinc-900/20 hover:scale-105 active:scale-95 transition-all dark:bg-sky-600 dark:shadow-sky-900/20 text-[10px] sm:text-[11px] uppercase tracking-widest">
            <PenSquare className="mr-2 sm:mr-3 size-4 sm:size-5" />
            Build New Artifact
          </Button>
        </Link>
        
        <Link to="/app/cover-letter" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="h-12 sm:h-14 w-full sm:px-10 rounded-2xl border-2 border-zinc-100 bg-white/50 backdrop-blur-xl font-bold tracking-tight hover:bg-zinc-50 active:scale-95 transition-all dark:border-zinc-800 dark:bg-zinc-900/50 text-[10px] sm:text-[11px] uppercase tracking-widest"
          >
            <Sparkles className="mr-2 sm:mr-3 size-4 sm:size-5 text-sky-500" />
            Synthesize Letter
          </Button>
        </Link>
      </div>

      {/* Quantum Search Field */}
      <div className="group relative mt-8 w-[85vw] max-w-4xl sm:mt-12 sm:w-full">
        <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 sm:left-5 top-1/2 size-4 sm:size-5 -translate-y-1/2 text-zinc-400 group-focus-within:text-sky-500 transition-colors" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search the vault for artifacts..."
            className="h-12 sm:h-16 w-full rounded-2xl border-2 border-zinc-100 bg-white/80 pl-12 sm:pl-14 pr-6 text-sm sm:text-base font-bold shadow-sm backdrop-blur-xl transition-all focus-visible:border-sky-500 focus-visible:ring-4 focus-visible:ring-sky-500/10 dark:border-zinc-800 dark:bg-zinc-900/80"
          />
        </div>
      </div>
    </div>
  );
}
