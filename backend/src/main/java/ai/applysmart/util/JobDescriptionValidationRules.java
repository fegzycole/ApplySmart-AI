package ai.applysmart.util;

import java.util.List;
import java.util.regex.Pattern;

public final class JobDescriptionValidationRules {

    public static final String REQUIRED_MESSAGE = "Job description is required";
    public static final String TOO_SHORT_MESSAGE =
            "Please paste the full job description, not just the job title or a short summary.";
    public static final String INVALID_MESSAGE =
            "Please paste a real job description that includes responsibilities, requirements, or qualifications.";

    private static final int MIN_CHARACTERS = 120;
    private static final int MIN_WORDS = 25;

    private static final List<Pattern> SIGNAL_PATTERNS = List.of(
            Pattern.compile("\\b(responsibilit(?:y|ies)|duties|what you'll do|what you will do|role overview)\\b",
                    Pattern.CASE_INSENSITIVE),
            Pattern.compile("\\b(requirements?|qualifications?|must[- ]have|what we're looking for|what we are looking for|about you)\\b",
                    Pattern.CASE_INSENSITIVE),
            Pattern.compile("\\b(skills?|experience with|proficient in|knowledge of|familiarity with|tech stack|technologies)\\b",
                    Pattern.CASE_INSENSITIVE),
            Pattern.compile("\\b(benefits?|compensation|salary|remote|hybrid|full[- ]time|part[- ]time|about us|about the company)\\b",
                    Pattern.CASE_INSENSITIVE)
    );

    private static final Pattern BULLET_PATTERN =
            Pattern.compile("(?m)^\\s*(?:[-*•]|\\d+\\.)\\s+\\S");

    private JobDescriptionValidationRules() {
        throw new UnsupportedOperationException("Utility class");
    }

    public static String findValidationError(String jobDescription) {
        String normalizedDescription = TextUtils.trimToNull(jobDescription);
        if (normalizedDescription == null) {
            return REQUIRED_MESSAGE;
        }

        int characterCount = normalizedDescription.length();
        int wordCount = TextUtils.calculateWordCount(normalizedDescription);
        if (characterCount < MIN_CHARACTERS || wordCount < MIN_WORDS) {
            return TOO_SHORT_MESSAGE;
        }

        int signalMatches = countSignalMatches(normalizedDescription);
        boolean hasStructuredContent = hasStructuredContent(normalizedDescription);
        if (signalMatches >= 2 || (signalMatches >= 1 && hasStructuredContent)) {
            return null;
        }

        return INVALID_MESSAGE;
    }

    private static int countSignalMatches(String jobDescription) {
        int matches = 0;
        for (Pattern pattern : SIGNAL_PATTERNS) {
            if (pattern.matcher(jobDescription).find()) {
                matches++;
            }
        }
        return matches;
    }

    private static boolean hasStructuredContent(String jobDescription) {
        long nonEmptyLineCount = jobDescription.lines()
                .map(String::trim)
                .filter(line -> !line.isEmpty())
                .count();

        return nonEmptyLineCount >= 3 || BULLET_PATTERN.matcher(jobDescription).find();
    }
}
