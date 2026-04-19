package ai.applysmart.dto.resume;

/**
 * Available professional resume templates
 */
public enum ResumeTemplate {
    MODERN("Modern", "Clean and minimal design with subtle accents", "modern.html"),
    PROFESSIONAL("Professional", "Traditional corporate-friendly layout", "professional.html"),
    CREATIVE("Creative", "Bold design for creative professionals", "creative.html"),
    CLASSIC("Classic", "Timeless ATS-optimized format", "classic.html");

    private final String displayName;
    private final String description;
    private final String templateFile;

    ResumeTemplate(String displayName, String description, String templateFile) {
        this.displayName = displayName;
        this.description = description;
        this.templateFile = templateFile;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDescription() {
        return description;
    }

    public String getTemplateFile() {
        return templateFile;
    }
}
