import { useDrag } from "react-dnd";
import { Card } from "@/shared/components/ui/card";
import type { Job } from "../types/job.types";
import { JOB_CARD_STYLES } from "../constants/job-tracker.constants";
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

  const cardClassName = `${JOB_CARD_STYLES.card.base} ${
    isDragging ? JOB_CARD_STYLES.card.dragging : ""
  }`;

  return (
    <div ref={drag as unknown as React.Ref<HTMLDivElement>}>
      <Card className={cardClassName}>
        <div className={JOB_CARD_STYLES.ambientGlow} />
        <div className={JOB_CARD_STYLES.hairline} />
        <div className={JOB_CARD_STYLES.content}>
          <JobCardHeader role={job.role} company={job.company} location={job.location} />
          <JobCardMeta salary={job.salary} applicationDeadline={job.applicationDeadline} />
          <JobCardNotes notes={job.notes} />
          <JobCardActions
            link={job.link}
            onEdit={() => onEdit(job)}
            onDelete={() => onDelete(job.id)}
          />
        </div>
      </Card>
    </div>
  );
}
