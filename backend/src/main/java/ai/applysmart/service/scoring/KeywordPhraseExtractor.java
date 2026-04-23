package ai.applysmart.service.scoring;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class KeywordPhraseExtractor {

    private static final int MAX_REQUIRED_TERMS = 20;
    private static final int MAX_ACTION_SKILLS = 20;

    private static final List<String> REQUIREMENT_PHRASES = List.of(
            "required", "must have", "must-have", "required skills",
            "experience with", "proficiency in", "proficient in",
            "knowledge of", "expertise in", "familiar with",
            "strong understanding of", "deep knowledge of",
            "certification in", "certified in",
            "proven experience in", "demonstrated ability in"
    );

    private static final List<String> ACTION_SKILL_PHRASES = List.of(
            "ability to", "experience in", "skills in", "background in",
            "understanding of", "familiarity with", "working knowledge of"
    );

    private final JobKeywordTextProcessor textProcessor;

    public List<String> extractRequiredTerms(String cleanedText) {
        return extract(cleanedText, REQUIREMENT_PHRASES, MAX_REQUIRED_TERMS, 4);
    }

    public List<String> extractActionSkills(String cleanedText) {
        return extract(cleanedText, ACTION_SKILL_PHRASES, MAX_ACTION_SKILLS, 3);
    }

    private List<String> extract(String text, List<String> phrases, int maxTerms, int maxWords) {
        if (text == null || text.isBlank()) {
            return List.of();
        }

        Set<String> extractedTerms = new LinkedHashSet<>();

        for (String phrase : phrases) {
            int index = text.indexOf(phrase);
            while (index != -1 && extractedTerms.size() < maxTerms) {
                String term = textProcessor.extractFollowingTerm(text, index + phrase.length(), maxWords);
                if (!term.isEmpty()) {
                    extractedTerms.add(term);
                }

                index = text.indexOf(phrase, index + phrase.length());
            }
        }

        return new ArrayList<>(extractedTerms);
    }
}
