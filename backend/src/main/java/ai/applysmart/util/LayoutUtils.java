package ai.applysmart.util;

import ai.applysmart.dto.resume.ResumeLayoutInfo;

/**
 * Utility class for resume/cover letter layout operations.
 */
public final class LayoutUtils {

    private LayoutUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // Layout constants
    private static final String DEFAULT_PRIMARY_FONT = "Calibri";
    private static final String DEFAULT_SECONDARY_FONT = "Calibri";
    private static final String DEFAULT_PRIMARY_COLOR = "#000000";
    private static final String DEFAULT_ACCENT_COLOR = "#2c3e50";
    private static final String DEFAULT_BACKGROUND_COLOR = "#ffffff";
    private static final Double DEFAULT_AVERAGE_FONT_SIZE = 11.0;
    private static final Double DEFAULT_HEADING_FONT_SIZE = 16.0;
    private static final Integer DEFAULT_LINE_SPACING = 14;

    /**
     * Create default professional layout for resumes and cover letters.
     * Includes all standard formatting properties.
     *
     * @return default layout configuration
     */
    public static ResumeLayoutInfo createDefaultProfessionalLayout() {
        return ResumeLayoutInfo.builder()
                .primaryFont(DEFAULT_PRIMARY_FONT)
                .secondaryFont(DEFAULT_SECONDARY_FONT)
                .primaryColor(DEFAULT_PRIMARY_COLOR)
                .accentColor(DEFAULT_ACCENT_COLOR)
                .backgroundColor(DEFAULT_BACKGROUND_COLOR)
                .averageFontSize(DEFAULT_AVERAGE_FONT_SIZE)
                .headingFontSize(DEFAULT_HEADING_FONT_SIZE)
                .lineSpacing(DEFAULT_LINE_SPACING)
                .build();
    }

    /**
     * Create layout with custom accent color.
     *
     * @param accentColor custom accent color
     * @return layout with custom accent color
     */
    public static ResumeLayoutInfo createLayoutWithAccentColor(String accentColor) {
        return ResumeLayoutInfo.builder()
                .primaryFont(DEFAULT_PRIMARY_FONT)
                .secondaryFont(DEFAULT_SECONDARY_FONT)
                .primaryColor(DEFAULT_PRIMARY_COLOR)
                .accentColor(accentColor)
                .backgroundColor(DEFAULT_BACKGROUND_COLOR)
                .averageFontSize(DEFAULT_AVERAGE_FONT_SIZE)
                .headingFontSize(DEFAULT_HEADING_FONT_SIZE)
                .lineSpacing(DEFAULT_LINE_SPACING)
                .build();
    }

    /**
     * Create layout with custom fonts.
     *
     * @param primaryFont primary font name
     * @param secondaryFont secondary font name
     * @return layout with custom fonts
     */
    public static ResumeLayoutInfo createLayoutWithFonts(String primaryFont, String secondaryFont) {
        return ResumeLayoutInfo.builder()
                .primaryFont(primaryFont)
                .secondaryFont(secondaryFont)
                .primaryColor(DEFAULT_PRIMARY_COLOR)
                .accentColor(DEFAULT_ACCENT_COLOR)
                .backgroundColor(DEFAULT_BACKGROUND_COLOR)
                .averageFontSize(DEFAULT_AVERAGE_FONT_SIZE)
                .headingFontSize(DEFAULT_HEADING_FONT_SIZE)
                .lineSpacing(DEFAULT_LINE_SPACING)
                .build();
    }
}
