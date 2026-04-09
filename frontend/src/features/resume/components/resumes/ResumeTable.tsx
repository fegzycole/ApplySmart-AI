import { Card } from "@/shared/components/ui/card";
import { ResumeTableRow } from "./ResumeTableRow";
import { RESUMES_PAGE_STYLES } from "../../constants/resumes.constants";
import type { Resume } from "../../services/resume.service";

interface ResumeTableProps {
  resumes: Resume[];
  onToggleFavorite: (id: number) => void;
  onDelete: (resume: Resume) => void;
}

export function ResumeTable({ resumes, onToggleFavorite, onDelete }: ResumeTableProps) {
  return (
    <div className="hidden lg:block">
      <Card className={RESUMES_PAGE_STYLES.tableCardClassName}>
        <div className="overflow-x-auto">
          <table className={RESUMES_PAGE_STYLES.tableClassName}>
            <thead>
              <tr className={RESUMES_PAGE_STYLES.tableHeaderClassName}>
                <th className={RESUMES_PAGE_STYLES.tableHeaderCellClassName}>Resume Name</th>
                <th className={RESUMES_PAGE_STYLES.tableHeaderCellClassName}>Score</th>
                <th className={RESUMES_PAGE_STYLES.tableHeaderCellClassName}>Status</th>
                <th className={RESUMES_PAGE_STYLES.tableHeaderCellClassName}>Last Modified</th>
                <th className={RESUMES_PAGE_STYLES.tableHeaderCellClassName}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume) => (
                <ResumeTableRow
                  key={resume.id}
                  resume={resume}
                  onToggleFavorite={onToggleFavorite}
                  onDelete={() => onDelete(resume)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
