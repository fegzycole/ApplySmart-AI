package ai.applysmart.service.scoring;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class MultiWordPhraseExtractor {

    private final JobKeywordTextProcessor textProcessor;

    public List<String> extract(String cleanedText) {
        if (cleanedText == null || cleanedText.isBlank()) {
            return List.of();
        }

        List<String> phrases = new ArrayList<>();
        String[] words = cleanedText.split("\\s+");

        for (int i = 0; i < words.length - 1; i++) {
            addPotentialPhrase(phrases, words[i] + " " + words[i + 1]);

            if (i < words.length - 2) {
                addPotentialPhrase(phrases, words[i] + " " + words[i + 1] + " " + words[i + 2]);
            }
        }

        return phrases;
    }

    private void addPotentialPhrase(List<String> phrases, String phrase) {
        String normalizedPhrase = textProcessor.normalize(phrase);
        if (textProcessor.isPotentialKeyword(normalizedPhrase)) {
            phrases.add(normalizedPhrase);
        }
    }
}
