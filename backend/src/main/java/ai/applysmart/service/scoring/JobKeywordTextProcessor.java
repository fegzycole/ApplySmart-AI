package ai.applysmart.service.scoring;

import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class JobKeywordTextProcessor {

    private static final Set<String> COMMON_WORDS = Set.of(
            "the", "and", "for", "with", "you", "will", "our", "are", "have",
            "this", "that", "from", "they", "been", "other", "which", "their",
            "would", "about", "than", "into", "could", "should", "does", "being"
    );

    public String clean(String jobDescription) {
        if (jobDescription == null || jobDescription.isBlank()) {
            return "";
        }

        return jobDescription.toLowerCase()
                .replaceAll("[^a-z0-9\\s.+-/#]", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }

    public String normalize(String term) {
        return stripBoundaryPunctuation(term).toLowerCase();
    }

    public String stripBoundaryPunctuation(String term) {
        return term.trim()
                .replaceAll("^[,;:!?()\\[\\]{}\"']+", "")
                .replaceAll("[,;:!?()\\[\\]{}\"']+$", "")
                .replaceAll("\\.$", "");
    }

    public String extractFollowingTerm(String text, int startIndex, int maxWords) {
        if (text == null || startIndex >= text.length()) {
            return "";
        }

        String remainingText = text.substring(startIndex).trim();
        if (remainingText.isEmpty()) {
            return "";
        }

        String[] words = remainingText.split("\\s+");
        StringBuilder termBuilder = new StringBuilder();

        for (int i = 0; i < Math.min(maxWords, words.length); i++) {
            String originalWord = words[i];
            String word = normalize(originalWord);
            if (!isPotentialKeyword(word)) {
                break;
            }

            if (termBuilder.length() > 0) {
                termBuilder.append(" ");
            }
            termBuilder.append(word);

            if (endsPhrase(originalWord)) {
                break;
            }
        }

        return termBuilder.toString();
    }

    public boolean isPotentialKeyword(String term) {
        return term.length() >= 3 && !COMMON_WORDS.contains(term);
    }

    public boolean isCapitalizedTerm(String word) {
        if (word.length() < 2) {
            return false;
        }

        return Character.isUpperCase(word.charAt(0))
                && (word.matches("^[A-Z][a-zA-Z0-9+#.-]*$") || word.matches("^[A-Z]{2,}$"));
    }

    private boolean endsPhrase(String word) {
        return word.endsWith(".")
                || word.endsWith("!")
                || word.endsWith("?")
                || word.endsWith(";")
                || word.endsWith(":");
    }
}
