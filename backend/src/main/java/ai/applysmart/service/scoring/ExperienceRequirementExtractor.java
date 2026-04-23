package ai.applysmart.service.scoring;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
public class ExperienceRequirementExtractor {

    private static final int MAX_EXPERIENCE_TERMS = 10;

    private static final List<Pattern> EXPERIENCE_PATTERNS = List.of(
            Pattern.compile("\\d+\\+?\\s*years?\\s*(?:of\\s*)?(?:experience\\s*)?(?:with|in)\\s+([\\w\\s-]+?)(?:[,.]|$)", Pattern.CASE_INSENSITIVE),
            Pattern.compile("experience\\s+(?:with|in)\\s+([\\w\\s-]+?)(?:[,.]|$)", Pattern.CASE_INSENSITIVE),
            Pattern.compile("proficiency\\s+(?:with|in)\\s+([\\w\\s-]+?)(?:[,.]|$)", Pattern.CASE_INSENSITIVE),
            Pattern.compile("expertise\\s+(?:with|in)\\s+([\\w\\s-]+?)(?:[,.]|$)", Pattern.CASE_INSENSITIVE)
    );

    private final JobKeywordTextProcessor textProcessor;

    public List<String> extract(String originalText) {
        if (originalText == null || originalText.isBlank()) {
            return List.of();
        }

        List<String> requirements = new ArrayList<>();

        for (Pattern pattern : EXPERIENCE_PATTERNS) {
            Matcher matcher = pattern.matcher(originalText);

            while (matcher.find() && requirements.size() < MAX_EXPERIENCE_TERMS) {
                String term = textProcessor.normalize(matcher.group(1));
                if (textProcessor.isPotentialKeyword(term) && term.split("\\s+").length <= 3) {
                    requirements.add(term);
                }
            }
        }

        return requirements;
    }
}
