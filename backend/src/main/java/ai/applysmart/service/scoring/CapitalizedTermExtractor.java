package ai.applysmart.service.scoring;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CapitalizedTermExtractor {

    private final JobKeywordTextProcessor textProcessor;

    public List<String> extract(String originalText) {
        if (originalText == null || originalText.isBlank()) {
            return List.of();
        }

        List<String> terms = new ArrayList<>();
        for (String word : originalText.split("\\s+")) {
            String token = textProcessor.stripBoundaryPunctuation(word);
            if (textProcessor.isCapitalizedTerm(token)) {
                terms.add(token.toLowerCase());
            }
        }

        return terms;
    }
}
