package ai.applysmart.service.impl;

import ai.applysmart.service.PromptBuilder;
import ai.applysmart.util.TextUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Implementation of prompt building service.
 * Centralizes all AI prompt construction logic.
 */
@Slf4j
@Service
public class PromptBuilderImpl implements PromptBuilder {

    @Override
    public String buildAnalysisPrompt(String resumeContent, String jobDescription) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("You are an expert resume reviewer and career coach. ");
        prompt.append("Analyze the following resume and provide a comprehensive assessment.\n\n");
        prompt.append("RESUME:\n").append(resumeContent).append("\n\n");

        if (TextUtils.isNotBlank(jobDescription)) {
            prompt.append("JOB DESCRIPTION:\n").append(jobDescription).append("\n\n");
            prompt.append("Analyze how well this resume matches the job requirements.\n\n");
        }

        prompt.append(buildAnalysisInstructions());

        return prompt.toString();
    }

    @Override
    public String buildOptimizationPrompt(String resumeContent, String jobDescription) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("You are an expert resume writer and ATS optimization specialist. ");
        prompt.append("Optimize the following resume for the job description provided.\n\n");
        prompt.append("ORIGINAL RESUME:\n").append(resumeContent).append("\n\n");
        prompt.append("TARGET JOB DESCRIPTION:\n").append(jobDescription).append("\n\n");
        prompt.append(buildOptimizationInstructions());

        return prompt.toString();
    }

    @Override
    public String buildCoverLetterPrompt(String resumeContent, String jobDescription,
                                        String company, String position, String tone,
                                        String keyAchievements) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("You are an expert cover letter writer. ");
        prompt.append("Generate a professional, compelling cover letter.\n\n");

        appendIfPresent(prompt, "RESUME CONTEXT", resumeContent);
        prompt.append("JOB DESCRIPTION:\n").append(jobDescription).append("\n\n");
        appendIfPresent(prompt, "COMPANY NAME", company);
        appendIfPresent(prompt, "POSITION TITLE", position);
        appendIfPresent(prompt, "DESIRED TONE", tone);
        appendIfPresent(prompt, "KEY ACHIEVEMENTS TO HIGHLIGHT", keyAchievements);

        prompt.append(buildCoverLetterInstructions(tone));

        return prompt.toString();
    }

    /**
     * Build detailed analysis instructions.
     */
    private String buildAnalysisInstructions() {
        return """
                Please provide your analysis in the following JSON format:
                {
                  "overallScore": <number 0-100>,
                  "atsScore": <number 0-100>,
                  "strengths": ["<strength 1>", "<strength 2>", ...],
                  "weaknesses": ["<weakness 1>", "<weakness 2>", ...],
                  "suggestions": ["<suggestion 1>", "<suggestion 2>", ...],
                  "keywords": ["<keyword 1>", "<keyword 2>", ...]
                }

                Consider:
                - Overall structure and formatting
                - Clarity and impact of bullet points
                - Use of action verbs and quantifiable achievements
                - ATS compatibility (keywords, formatting)
                - Relevance to job requirements (if provided)
                - Professional tone and language
                """;
    }

    /**
     * Build optimization instructions.
     */
    private String buildOptimizationInstructions() {
        return """
                Return a JSON object with the following format:
                {
                  "optimizedContent": "<complete optimized resume text>",
                  "changes": ["<change 1>", "<change 2>", ...],
                  "keywords": ["<keyword 1>", "<keyword 2>", ...],
                  "atsScore": <number 0-100>
                }

                Requirements:
                - Maintain the original structure and sections
                - Enhance bullet points with stronger action verbs
                - Add relevant keywords from the job description naturally
                - Quantify achievements where possible
                - Ensure ATS-friendly formatting
                - Keep the same overall length (±10%)
                """;
    }

    /**
     * Build cover letter instructions based on tone.
     */
    private String buildCoverLetterInstructions(String tone) {
        String toneInstruction = getToneInstruction(tone);

        return String.format("""
                Return a JSON object with:
                {
                  "content": "<complete cover letter text>",
                  "tone": "<actual tone used>",
                  "highlights": ["<key point 1>", "<key point 2>", ...]
                }

                Requirements:
                - %s
                - 3-4 paragraphs, approximately 250-400 words
                - Opening: Express enthusiasm and explain why you're applying
                - Body: Highlight 2-3 key qualifications from resume/achievements
                - Closing: Express interest in next steps
                - Professional formatting suitable for PDF generation
                - Do not include address headers (will be added separately)
                """, toneInstruction);
    }

    /**
     * Get tone-specific instructions.
     */
    private String getToneInstruction(String tone) {
        if (TextUtils.isBlank(tone)) {
            return "Use a professional, enthusiastic tone";
        }

        return switch (tone.toLowerCase()) {
            case "formal" -> "Use a formal, highly professional tone";
            case "enthusiastic" -> "Use an enthusiastic, energetic tone while maintaining professionalism";
            case "confident" -> "Use a confident, assertive tone highlighting strong qualifications";
            case "creative" -> "Use a creative, engaging tone that shows personality";
            default -> "Use a professional, enthusiastic tone";
        };
    }

    /**
     * Append section to prompt if value is present.
     */
    private void appendIfPresent(StringBuilder prompt, String label, String value) {
        if (TextUtils.isNotBlank(value)) {
            prompt.append(label).append(":\n").append(value).append("\n\n");
        }
    }
}
