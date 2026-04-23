package ai.applysmart.service.scoring;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class JobKeywordExtractor {

    private static final int MAX_KEYWORDS = 35;

    private final JobKeywordTextProcessor textProcessor;
    private final CapitalizedTermExtractor capitalizedTermExtractor;
    private final KeywordPhraseExtractor keywordPhraseExtractor;
    private final ExperienceRequirementExtractor experienceRequirementExtractor;
    private final MultiWordPhraseExtractor multiWordPhraseExtractor;

    public List<String> extract(String jobDescription) {
        String cleanedText = textProcessor.clean(jobDescription);
        if (cleanedText.isEmpty()) {
            return List.of();
        }

        Set<String> extractedKeywords = new LinkedHashSet<>();
        extractedKeywords.addAll(capitalizedTermExtractor.extract(jobDescription));
        extractedKeywords.addAll(keywordPhraseExtractor.extractRequiredTerms(cleanedText));
        extractedKeywords.addAll(experienceRequirementExtractor.extract(jobDescription));
        extractedKeywords.addAll(multiWordPhraseExtractor.extract(cleanedText));
        extractedKeywords.addAll(keywordPhraseExtractor.extractActionSkills(cleanedText));

        return extractedKeywords.stream()
                .limit(MAX_KEYWORDS)
                .toList();
    }
}
