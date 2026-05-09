import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import {
  JOB_TRACKER_EMPTY_STATE_CONTENT,
  JOB_TRACKER_EMPTY_STATE_STYLES,
  JOB_TRACKER_ICONS,
} from "../constants/job-tracker.constants";

interface JobTrackerEmptyStateProps {
  onAddClick: () => void;
}

export function JobTrackerEmptyState({ onAddClick }: JobTrackerEmptyStateProps) {
  const EmptyIcon = JOB_TRACKER_ICONS.empty;

  return (
    <div className={cn(JOB_TRACKER_EMPTY_STATE_STYLES.wrapper, "group")}>
      {/* Premium Artifact Aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 via-sky-200/10 to-transparent blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      {/* Frosted Grain Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className={JOB_TRACKER_EMPTY_STATE_STYLES.iconWrapper}>
          <EmptyIcon className={JOB_TRACKER_EMPTY_STATE_STYLES.icon} />
          <motion.div 
            className="absolute inset-0 rounded-[3rem] bg-white/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
        <h2 className={JOB_TRACKER_EMPTY_STATE_STYLES.title}>
          {JOB_TRACKER_EMPTY_STATE_CONTENT.title}
        </h2>
        <p className={JOB_TRACKER_EMPTY_STATE_STYLES.description}>
          {JOB_TRACKER_EMPTY_STATE_CONTENT.description}
        </p>
        <Button onClick={onAddClick} className={JOB_TRACKER_EMPTY_STATE_STYLES.button}>
          Begin Your Journey
        </Button>
      </div>
    </div>
  );
}
