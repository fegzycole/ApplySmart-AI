package ai.applysmart.service;

/**
 * Service for building AI prompts for various resume operations.
 * Separates prompt construction logic from API communication.
 */
public interface PromptBuilder {

    /**
     * Build prompt for resume analysis.
     *
     * @param resumeContent resume text content
     * @param jobDescription optional job description for targeted analysis
     * @return formatted analysis prompt
     */
    String buildAnalysisPrompt(String resumeContent, String jobDescription);

    /**
     * Build prompt for resume optimization.
     *
     * @param resumeContent resume text content
     * @param jobDescription job description to optimize for
     * @return formatted optimization prompt
     */
    String buildOptimizationPrompt(String resumeContent, String jobDescription);

    /**
     * Build prompt for cover letter generation.
     *
     * @param resumeContent resume text content (optional)
     * @param jobDescription job description
     * @param company company name (optional)
     * @param position position title (optional)
     * @param tone desired tone (optional)
     * @param keyAchievements key achievements to highlight (optional)
     * @return formatted cover letter generation prompt
     */
    String buildCoverLetterPrompt(String resumeContent, String jobDescription,
                                  String company, String position, String tone,
                                  String keyAchievements);
}
