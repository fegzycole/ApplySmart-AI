package ai.applysmart.service.scoring;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JobKeywordExtractorTest {

    private final JobKeywordTextProcessor textProcessor = new JobKeywordTextProcessor();
    private final JobKeywordExtractor extractor = new JobKeywordExtractor(
            textProcessor,
            new CapitalizedTermExtractor(textProcessor),
            new KeywordPhraseExtractor(textProcessor),
            new ExperienceRequirementExtractor(textProcessor),
            new MultiWordPhraseExtractor(textProcessor)
    );

    @Test
    void extractIncludesRequiredSkillAndExperienceTerms() {
        List<String> keywords = extractor.extract(
                "We need proficiency in Java. Experience with Kubernetes. Familiar with Redis."
        );

        assertTrue(keywords.contains("java"));
        assertTrue(keywords.contains("kubernetes"));
        assertTrue(keywords.contains("redis"));
    }

    @Test
    void extractReturnsEmptyListForBlankInput() {
        assertEquals(List.of(), extractor.extract("   "));
    }
}
