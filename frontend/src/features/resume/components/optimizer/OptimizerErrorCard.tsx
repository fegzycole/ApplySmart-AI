import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface OptimizerErrorCardProps {
  message: string;
  onRetry?: () => void;
}

export function OptimizerErrorCard({ message, onRetry }: OptimizerErrorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      className="relative overflow-hidden rounded-[2.5rem] border-2 border-red-500/20 bg-red-500/5 p-8 backdrop-blur-3xl sm:p-10"
    >
      {/* Immersive Background Glows */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-[100px] animate-pulse" />
      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-rose-500/10 blur-[100px] animate-pulse" />
      
      <div className="relative flex flex-col items-center text-center space-y-6">
        <div className="relative">
          {/* Animated rings */}
          <motion.div 
            className="absolute inset-0 rounded-3xl bg-red-500/20"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-2xl shadow-red-500/40">
            <AlertTriangle className="size-10" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Optimization Interrupted
          </h3>
          <p className="text-base font-medium leading-relaxed text-muted-foreground max-w-lg mx-auto">
            {message || "The AI encountered an unexpected boundary while processing your request. Our precision systems have paused to ensure data integrity."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          {onRetry && (
            <Button 
              onClick={onRetry}
              className="h-14 rounded-2xl bg-red-500 px-8 text-lg font-bold text-white shadow-xl shadow-red-500/25 hover:bg-red-600 hover:shadow-red-500/40 transition-all active:scale-95"
            >
              <RefreshCw className="mr-3 size-5" />
              Recalibrate & Retry
            </Button>
          )}
          
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-red-500/60">
            Error Code: AI_RESONANCE_FAILURE
          </div>
        </div>
      </div>
    </motion.div>
  );
}
