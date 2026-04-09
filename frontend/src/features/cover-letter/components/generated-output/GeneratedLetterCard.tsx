import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { CheckCircle2, RefreshCw, Download, Copy } from "lucide-react";
import { GENERATED_LETTER_STYLES } from "../../constants/cover-letter.constants";
import type { GeneratedCoverLetter } from "../../services/cover-letter.service";

interface GeneratedLetterCardProps {
  onNewLetter: () => void;
  generatedLetter?: GeneratedCoverLetter;
}

export function GeneratedLetterCard({ onNewLetter, generatedLetter }: GeneratedLetterCardProps) {
  const content = generatedLetter?.content || "";

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
          <Button className={GENERATED_LETTER_STYLES.downloadButton}>
            <Download className={GENERATED_LETTER_STYLES.buttonIcon} />
            PDF
          </Button>
          <Button variant="outline" className={GENERATED_LETTER_STYLES.downloadButtonAlt}>
            <Download className={GENERATED_LETTER_STYLES.buttonIcon} />
            DOCX
          </Button>
        </div>

        <Button variant="outline" className={GENERATED_LETTER_STYLES.copyButton}>
          <Copy className={GENERATED_LETTER_STYLES.buttonIcon} />
          Copy to Clipboard
        </Button>
      </CardContent>
    </Card>
  );
}
