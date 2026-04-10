package ai.applysmart.util;

/**
 * Utility class for text processing operations.
 */
public final class TextUtils {

    private TextUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    /**
     * Calculate word count in text.
     * Words are defined as sequences of characters separated by whitespace.
     *
     * @param text text to count words in
     * @return number of words, or 0 if text is null/blank
     */
    public static int calculateWordCount(String text) {
        if (text == null || text.isBlank()) {
            return 0;
        }

        return text.trim().split("\\s+").length;
    }

    /**
     * Truncate text to specified length with ellipsis.
     *
     * @param text text to truncate
     * @param maxLength maximum length
     * @return truncated text
     */
    public static String truncate(String text, int maxLength) {
        if (text == null || text.length() <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength - 3) + "...";
    }

    /**
     * Check if text is null or blank.
     *
     * @param text text to check
     * @return true if text is null or blank
     */
    public static boolean isBlank(String text) {
        return text == null || text.isBlank();
    }

    /**
     * Check if text is not null and not blank.
     *
     * @param text text to check
     * @return true if text is not null and not blank
     */
    public static boolean isNotBlank(String text) {
        return !isBlank(text);
    }
}
