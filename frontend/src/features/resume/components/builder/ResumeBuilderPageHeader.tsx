import { RotateCcw, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";

export function ResumeBuilderPageHeader() {
  const { resetResumeData } = useResumeBuilder();

  const handleResetDraft = () => {
    resetResumeData();
    toast.success("Resume synthesis draft cleared.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col items-center text-center space-y-6 sm:space-y-10 pb-10 sm:pb-16 border-b border-border/50 mb-10 sm:mb-16"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 sm:h-64 bg-gradient-to-b from-primary/5 to-transparent blur-3xl -z-10" />

      <motion.div
        initial={{ scale: 0, rotate: -20, filter: "blur(20px)" }}
        animate={{ scale: 1, rotate: 0, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2, duration: 0.8 }}
        className="relative flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-[1.75rem] sm:rounded-[2.5rem] bg-primary text-primary-foreground shadow-[0_20px_50px_rgba(var(--color-primary),0.3)] group"
      >
        <FileText className="size-10 sm:size-14 transition-transform group-hover:scale-110 duration-500" />
        <motion.div 
          className="absolute inset-0 rounded-[1.75rem] sm:rounded-[2.5rem] bg-primary/20"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Orbiting Elements */}
        <div className="absolute inset-[-20%] border border-primary/10 rounded-full animate-[spin_10s_linear_infinite] hidden sm:block" />
        <div className="absolute inset-[-40%] border border-primary/5 rounded-full animate-[spin_15s_linear_infinite_reverse] hidden sm:block" />
      </motion.div>

      <div className="space-y-4 sm:space-y-6 px-4">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-2 sm:mb-4">
          Resume <span className="text-primary drop-shadow-[0_0_25px_rgba(var(--color-primary),0.4)]">Synthesis</span>
        </h1>
        <p className="text-base sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed tracking-tight">
          Craft your professional identity with our precision-engineered builder. Select a structural blueprint and <span className="text-foreground font-bold">synthesize your experience</span> into a high-impact narrative.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4">
        <div className="group flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-primary/20 bg-card/30 backdrop-blur-xl text-primary text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] shadow-lg shadow-primary/5 transition-all hover:border-primary/40">
          <div className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-primary"></span>
          </div>
          Real-Time Synthesis Active
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-10 sm:h-12 rounded-full border-2 border-border/50 bg-background/50 px-6 sm:px-8 text-[9px] sm:text-[11px] font-black uppercase tracking-widest transition-all hover:bg-destructive hover:text-white hover:border-destructive active:scale-90 shadow-xl shadow-zinc-200/50 dark:shadow-none"
          onClick={handleResetDraft}
        >
          <RotateCcw className="size-3.5 sm:size-4 mr-2 sm:mr-3" />
          Reset Calibration
        </Button>
      </div>
    </motion.div>
  );
}
