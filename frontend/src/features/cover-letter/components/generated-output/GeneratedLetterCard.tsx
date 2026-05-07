import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { CheckCircle2, RefreshCw, Download, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { GENERATED_LETTER_STYLES } from "../../constants/cover-letter.constants";
import { downloadCoverLetterPdf, type CoverLetter } from "../../services/cover-letter.service";
import { getDocumentDownloadFilename, triggerBrowserDownload } from "@/features/resume/utils/resume-download";

interface GeneratedLetterCardProps {
  onNewLetter: () => void;
  generatedLetter?: CoverLetter;
}

export function GeneratedLetterCard({ onNewLetter, generatedLetter }: GeneratedLetterCardProps) {
  const content = generatedLetter?.content || "";
  const [downloading, setDownloading] = useState(false);
  const [copying, setCopying] = useState(false);

  const handleDownload = async () => {
    if (!generatedLetter?.pdfUrl) {
      return;
    }

    setDownloading(true);

    try {
      const blob = await downloadCoverLetterPdf(generatedLetter.pdfUrl);
      triggerBrowserDownload(
        blob,
        getDocumentDownloadFilename(generatedLetter.pdfUrl, "cover-letter.pdf")
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to download cover letter. Please try again."
      );
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = async () => {
    setCopying(true);

    try {
      await navigator.clipboard.writeText(content);
      toast.success("Cover letter copied.");
    } catch {
      toast.error("Couldn't copy the cover letter.");
    } finally {
      setCopying(false);
    }
  };

  return (
    <Card className={GENERATED_LETTER_STYLES.card}>
      <CardHeader>
        <div className={GENERATED_LETTER_STYLES.header.wrapper}>
          <div className={GENERATED_LETTER_STYLES.header.left}>
            <div className={GENERATED_LETTER_STYLES.header.icon.wrapper}>
              <CheckCircle2 className={GENERATED_LETTER_STYLES.header.icon.icon} />
            </div>
            <div>
              <CardTitle className={GENERATED_LETTER_STYLES.header.title}>Generated Letter</CardTitle>
              <CardDescription className={GENERATED_LETTER_STYLES.header.description}>
                AI-crafted and ready to customize
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onNewLetter}
            className={GENERATED_LETTER_STYLES.header.newButton}
          >
            <RefreshCw className={GENERATED_LETTER_STYLES.header.newButtonIcon} />
            New
          </Button>
        </div>
      </CardHeader>
      <CardContent className={GENERATED_LETTER_STYLES.content}>
        <div className={GENERATED_LETTER_STYLES.textareaWrapper}>
          <Textarea
            value={content}
            readOnly
            className={GENERATED_LETTER_STYLES.textarea}
          />
        </div>

        <div className={GENERATED_LETTER_STYLES.buttonGrid}>
          <Button
            className={GENERATED_LETTER_STYLES.downloadButton}
            onClick={() => void handleDownload()}
            disabled={downloading || !generatedLetter?.pdfUrl}
          >
            <Download className={GENERATED_LETTER_STYLES.buttonIcon} />
            {downloading ? "Downloading..." : "PDF"}
          </Button>
          {generatedLetter?.pdfUrl ? (
            <Button asChild variant="outline" className={GENERATED_LETTER_STYLES.downloadButtonAlt}>
              <a href={generatedLetter.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Download className={GENERATED_LETTER_STYLES.buttonIcon} />
                Open PDF
              </a>
            </Button>
          ) : null}
        </div>

        <Button
          variant="outline"
          className={GENERATED_LETTER_STYLES.copyButton}
          onClick={() => void handleCopy()}
          disabled={copying}
        >
          <Copy className={GENERATED_LETTER_STYLES.buttonIcon} />
          {copying ? "Copying..." : "Copy to Clipboard"}
        </Button>
      </CardContent>
    </Card>
  );
}
