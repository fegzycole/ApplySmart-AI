import { COVER_LETTER_PAGE_STYLES } from "../constants/cover-letter.constants";
import { useCoverLetterGenerator } from "../hooks/useCoverLetterGenerator";
import { GeneratorPageHeader } from "../components/generator-header";
import { LeftColumnSection, RightColumnSection } from "../components/page-sections";

export function CoverLetterGeneratorPage() {
  const {
    generated,
    generating,
    generatedLetter,
    uploadedFile,
    tone,
    setTone,
    handleGenerate,
    handleFileUpload,
    removeFile,
    handleNewLetter
  } = useCoverLetterGenerator();

  return (
    <div className={COVER_LETTER_PAGE_STYLES.container}>
      <div className={COVER_LETTER_PAGE_STYLES.wrapper}>
        <div className={COVER_LETTER_PAGE_STYLES.header}>
          <GeneratorPageHeader />
        </div>

        <div className={COVER_LETTER_PAGE_STYLES.grid}>
          <LeftColumnSection
            tone={tone}
            onToneChange={setTone}
            uploadedFile={uploadedFile}
            onFileUpload={handleFileUpload}
            onRemoveFile={removeFile}
            generating={generating}
            onGenerate={handleGenerate}
          />

          <RightColumnSection
            generated={generated}
            onNewLetter={handleNewLetter}
            generatedLetter={generatedLetter}
          />
        </div>
      </div>
    </div>
  );
}