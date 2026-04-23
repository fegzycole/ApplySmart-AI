package ai.applysmart.service.scoring;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class KeywordPhraseExtractorTest {

    private final JobKeywordTextProcessor textProcessor = new JobKeywordTextProcessor();
    private final KeywordPhraseExtractor extractor = new KeywordPhraseExtractor(textProcessor);

    @Test
    void extractActionSkillsAndRequiredTermsFromCleanedText() {
        String cleanedText = textProcessor.clean(
                "Must have: Java and Redis. Ability to mentor engineers. Working knowledge of Kubernetes."
        );

        assertTrue(extractor.extractRequiredTerms(cleanedText).contains("java"));
        assertTrue(extractor.extractActionSkills(cleanedText).contains("mentor engineers"));
        assertTrue(extractor.extractActionSkills(cleanedText).contains("kubernetes"));
    }
}
