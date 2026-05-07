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
    fieldErrors,
    formErrors,
    company,
    position,
    jobDescription,
    highlights,
    tone,
    setCompany,
    setPosition,
    setJobDescription,
    setHighlights,
    setTone,
    handleGenerate,
    handleFileUpload,
    removeFile,
    handleNewLetter
  } = useCoverLetterGenerator();

  return (
    <div className={COVER_LETTER_PAGE_STYLES.container}>
      <div className={COVER_LETTER_PAGE_STYLES.wrapper}>
        <div className="pointer-events-none absolute -left-16 top-10 h-36 w-36 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />
        <div className="pointer-events-none absolute right-0 top-40 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-400/10" />

        <div className={COVER_LETTER_PAGE_STYLES.header}>
          <GeneratorPageHeader />
        </div>

        <div className={COVER_LETTER_PAGE_STYLES.grid}>
          <LeftColumnSection
            company={company}
            position={position}
            jobDescription={jobDescription}
            highlights={highlights}
            tone={tone}
            onCompanyChange={setCompany}
            onPositionChange={setPosition}
            onJobDescriptionChange={setJobDescription}
            onHighlightsChange={setHighlights}
            onToneChange={setTone}
            uploadedFile={uploadedFile}
            onFileUpload={handleFileUpload}
            onRemoveFile={removeFile}
            fieldErrors={fieldErrors}
            formErrors={formErrors}
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
