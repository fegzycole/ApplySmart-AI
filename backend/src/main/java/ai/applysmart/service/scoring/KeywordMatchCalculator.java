package ai.applysmart.service.scoring;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class KeywordMatchCalculator {

    private static final int MAX_KEYWORD_BONUS = 40;
    private static final double PARTIAL_MATCH_WEIGHT = 0.5;
    private static final double MATCH_CURVE_EXPONENT = 0.7;

    private final JobKeywordExtractor keywordExtractor;

    public int calculateBonus(String resumeText, String jobDescription) {
        List<String> keywords = keywordExtractor.extract(jobDescription.toLowerCase());
        if (keywords.isEmpty()) {
            return 0;
        }

        String normalizedResumeText = resumeText.toLowerCase();
        long exactMatches = countMatches(normalizedResumeText, keywords);
        long partialMatches = countPartialMatches(normalizedResumeText, keywords);
        double totalMatches = exactMatches + (partialMatches * PARTIAL_MATCH_WEIGHT);
        double matchPercent = Math.min(1.0, totalMatches / keywords.size());
        double adjustedPercent = Math.pow(matchPercent, MATCH_CURVE_EXPONENT);

        return (int) (adjustedPercent * MAX_KEYWORD_BONUS);
    }

    private long countMatches(String text, List<String> keywords) {
        return keywords.stream()
                .filter(text::contains)
                .count();
    }

    private long countPartialMatches(String text, List<String> keywords) {
        return keywords.stream()
                .filter(keyword -> !text.contains(keyword))
                .filter(keyword -> isPartialMatch(text, keyword))
                .count();
    }

    private boolean isPartialMatch(String text, String keyword) {
        String[] keywordParts = keyword.split("\\s+");
        if (keywordParts.length > 1) {
            return Arrays.stream(keywordParts)
                    .anyMatch(part -> part.length() > 3 && text.contains(part));
        }

        int stemLength = Math.max(1, keyword.length() - 2);
        return text.contains(keyword.substring(0, stemLength));
    }
}
