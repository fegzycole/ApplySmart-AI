import { DOCUMENT_CARD_STYLES } from "../constants/documents.constants";

interface DocumentPdfPreviewProps {
  title: string;
  url: string;
}

export function DocumentPdfPreview({ title, url }: DocumentPdfPreviewProps) {
  return (
    <div className={DOCUMENT_CARD_STYLES.previewFrame}>
      <div className="relative h-[15.5rem] overflow-hidden bg-zinc-50 dark:bg-zinc-950">
        <iframe
          src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
          title={title}
          className="pointer-events-none absolute left-0 top-0 h-[166.67%] w-[166.67%] origin-top-left scale-[0.6] border-0"
        />
      </div>
    </div>
  );
}
