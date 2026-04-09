import { useDrag } from "react-dnd";
import { Card } from "@/shared/components/ui/card";
import type { Job } from "../types/job.types";
import { JOB_CARD_STYLES } from "../constants/job-tracker.constants";
import { JobCardHeader, JobCardNotes, JobCardActions } from "./job-card";

interface JobCardProps {
  job: Job;
  onDelete: (id: number) => void;
}

export function JobCard({ job, onDelete }: JobCardProps) {
  const [{ isDragging }, drag] = useDrag<Job, void, { isDragging: boolean }>({
    type: "JOB",
    item: job,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const cardClassName = `${JOB_CARD_STYLES.card.base} ${
    isDragging ? JOB_CARD_STYLES.card.dragging : ""
  }`;

  return (
    <div ref={drag as unknown as React.Ref<HTMLDivElement>}>
      <Card className={cardClassName}>
        <div className={JOB_CARD_STYLES.topBar} />
        <div className={JOB_CARD_STYLES.hoverOverlay} />

        <div className={JOB_CARD_STYLES.content}>
          <JobCardHeader role={job.role} company={job.company} />
          <JobCardNotes notes={job.notes} />

          <div className={JOB_CARD_STYLES.date.container}>
            <span>{job.date}</span>
          </div>

          <JobCardActions link={job.link} onDelete={() => onDelete(job.id)} />
        </div>
      </Card>
    </div>
  );
}
