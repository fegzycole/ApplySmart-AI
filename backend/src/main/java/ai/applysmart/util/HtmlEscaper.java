package ai.applysmart.util;

public final class HtmlEscaper {

    private HtmlEscaper() {
        throw new UnsupportedOperationException("Utility class");
    }

    public static String escape(String text) {
        if (text == null) {
            return "";
        }
        return text
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }

    public static String orEmpty(String value) {
        return value != null ? escape(value) : "";
    }
}
