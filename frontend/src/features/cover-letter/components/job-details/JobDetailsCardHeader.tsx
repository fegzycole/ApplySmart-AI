import { CardDescription, CardTitle } from "@/shared/components/ui/card";
import { FileText } from "lucide-react";
import { JOB_DETAILS_CARD_STYLES } from "../../constants/cover-letter.constants";

export function JobDetailsCardHeader() {
  return (
    <div className={JOB_DETAILS_CARD_STYLES.header.container}>
      <div className={JOB_DETAILS_CARD_STYLES.header.icon.wrapper}>
        <FileText className={JOB_DETAILS_CARD_STYLES.header.icon.icon} />
      </div>
      <div>
        <CardTitle className={JOB_DETAILS_CARD_STYLES.header.title}>Job Details</CardTitle>
        <CardDescription className={JOB_DETAILS_CARD_STYLES.header.description}>
          Tell us about the position you're applying for
        </CardDescription>
      </div>
    </div>
  );
}
