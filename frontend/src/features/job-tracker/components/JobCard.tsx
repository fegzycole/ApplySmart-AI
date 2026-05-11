import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import type { Job } from "../types/job.types";
import { ARTIFACT_STYLES, KANBAN_COLUMNS } from "../constants/job-tracker.constants";
import { JobCardActions, JobCardHeader, JobCardMeta, JobCardNotes } from "./job-card";

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
}

export function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  const [{ isDragging }, drag] = useDrag<Job, void, { isDragging: boolean }>({
    type: "JOB",
    item: job,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const column = KANBAN_COLUMNS.find((c) => c.id === job.status);
  const auraGradient = column?.gradient ?? "from-primary/20 to-transparent";

  return (
    <div ref={drag as unknown as React.Ref<HTMLDivElement>} className="min-w-0">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        ARTIFACT_STYLES.card.wrapper,
        isDragging && ARTIFACT_STYLES.card.dragging,
        "min-w-0"
      )}
    >
      {/* Dynamic Aura Background */}
      <div className={cn(ARTIFACT_STYLES.card.aura, "bg-gradient-to-br", auraGradient)} />
      
      {/* Frosted Grain Texture */}
      <div 
        className={cn(ARTIFACT_STYLES.card.grain, "pointer-events-none")} 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 space-y-4 sm:space-y-6 p-6 pb-20 sm:p-8 sm:pb-8">
        <div className="flex items-start justify-between gap-4 sm:gap-6 min-w-0">
          <div className="flex-1 min-w-0">
            <JobCardHeader role={job.role} company={job.company} location={job.location} />
          </div>
          
          {/* stylized Company Seal */}
          <div className={cn(ARTIFACT_STYLES.hero.seal, column?.accentColor, "shrink-0 h-10 w-10 sm:h-12 sm:w-12 text-sm sm:text-lg")}>
            {job.company.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="flex-1 min-w-0 overflow-hidden">
            <JobCardMeta salary={job.salary} applicationDeadline={job.applicationDeadline} />
          </div>
        </div>

        {job.notes && (
          <div className="pt-1 sm:pt-2">
            <JobCardNotes notes={job.notes} />
          </div>
        )}
      </div>

      {/* Hidden Action Deck - Revealed on Hover */}
      <div className={cn(ARTIFACT_STYLES.actionDeck, "z-50 p-2 sm:p-4")}>
        <div className={cn(ARTIFACT_STYLES.controlBar, "pointer-events-auto p-1.5 sm:p-2")}>
          <JobCardActions
            link={job.link}
            onEdit={() => onEdit(job)}
            onDelete={() => onDelete(job.id)}
          />
        </div>
      </div>
    </motion.div>
    </div>
  );
}
