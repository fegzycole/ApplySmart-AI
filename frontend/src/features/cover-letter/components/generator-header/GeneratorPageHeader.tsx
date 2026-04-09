import { Sparkles } from "lucide-react";
import { COVER_LETTER_HEADER_STYLES, COVER_LETTER_HEADER_CONTENT } from "../../constants/cover-letter.constants";

export function GeneratorPageHeader() {
  return (
    <div className={COVER_LETTER_HEADER_STYLES.wrapper}>
      <div className={COVER_LETTER_HEADER_STYLES.content}>
        <div className={COVER_LETTER_HEADER_STYLES.badge.container}>
          <Sparkles className={COVER_LETTER_HEADER_STYLES.badge.icon} />
          <span className={COVER_LETTER_HEADER_STYLES.badge.text}>
            {COVER_LETTER_HEADER_CONTENT.badge}
          </span>
        </div>
        <h1 className={COVER_LETTER_HEADER_STYLES.title.container}>
          <span className={COVER_LETTER_HEADER_STYLES.title.gradient}>
            {COVER_LETTER_HEADER_CONTENT.title}
          </span>
        </h1>
        <p className={COVER_LETTER_HEADER_STYLES.description}>
          {COVER_LETTER_HEADER_CONTENT.description}
        </p>
      </div>
    </div>
  );
}
