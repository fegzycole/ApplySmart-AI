package ai.applysmart.service.pdf;

import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
public class PdfLineReplacementPlanner {

    private static final double MIN_RELATED_LINE_SIMILARITY = 0.3;

    public LineReplacementPlan createPlan(String originalText, String optimizedText) {
        List<String> originalLines = splitLines(originalText);
        List<String> optimizedLines = splitLines(optimizedText);
        Map<Integer, String> replacements = createLineReplacements(originalLines, optimizedLines);
        return new LineReplacementPlan(originalLines, replacements);
    }

    private List<String> splitLines(String text) {
        return Arrays.stream(text.split("\n"))
                .map(String::trim)
                .filter(line -> !line.isEmpty())
                .toList();
    }

    private Map<Integer, String> createLineReplacements(List<String> originalLines, List<String> optimizedLines) {
        Map<Integer, String> replacements = new HashMap<>();
        int minSize = Math.min(originalLines.size(), optimizedLines.size());

        for (int i = 0; i < minSize; i++) {
            String originalLine = originalLines.get(i);
            String optimizedLine = optimizedLines.get(i);

            if (!originalLine.equals(optimizedLine) && areLinesRelated(originalLine, optimizedLine)) {
                replacements.put(i, optimizedLine);
            }
        }

        return replacements;
    }

    private boolean areLinesRelated(String line1, String line2) {
        if (line1.isBlank() || line2.isBlank()) {
            return false;
        }

        Set<String> words1 = new HashSet<>(Arrays.asList(line1.toLowerCase().split("\\s+")));
        Set<String> words2 = new HashSet<>(Arrays.asList(line2.toLowerCase().split("\\s+")));
        Set<String> intersection = new HashSet<>(words1);
        intersection.retainAll(words2);

        double similarity = (double) intersection.size() / Math.max(words1.size(), words2.size());
        return similarity > MIN_RELATED_LINE_SIMILARITY;
    }
}
