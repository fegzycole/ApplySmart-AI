package ai.applysmart.service.impl;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.service.PromptBuilder;
import ai.applysmart.util.TextUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PromptBuilderImpl implements PromptBuilder {

    private final ObjectMapper objectMapper;

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
    public String buildStructuredOptimizationPrompt(ParsedResumeDto resumeData, String jobDescription) {
        StringBuilder prompt = new StringBuilder();

        try {
            String resumeJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(resumeData);

            prompt.append("You are an expert resume writer and ATS optimization specialist. ");
            prompt.append("Optimize the following structured resume data for the job description provided.\n\n");
            prompt.append("ORIGINAL RESUME DATA (JSON):\n").append(resumeJson).append("\n\n");
            prompt.append("TARGET JOB DESCRIPTION:\n").append(jobDescription).append("\n\n");
            prompt.append(buildStructuredOptimizationInstructions());

            return prompt.toString();
        } catch (Exception e) {
            log.error("Failed to serialize resume data for prompt", e);
            throw new RuntimeException("Failed to build structured optimization prompt", e);
        }
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

    private String buildAnalysisInstructions() {
        return """
                Please provide your analysis in the following JSON format:
                {
                  "score": <number 0-100>,
                  "atsCompatibility": <number 0-100>,
                  "strengths": ["<strength 1>", "<strength 2>", ...],
                  "improvements": ["<improvement 1>", "<improvement 2>", ...],
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

    private String buildOptimizationInstructions() {
        return """
                Return a JSON object with the following format:
                {
                  "originalScore": <number 0-100 representing the original resume score>,
                  "optimizedScore": <number 0-100 representing the optimized resume score>,
                  "changes": ["<change 1>", "<change 2>", ...],
                  "content": "<complete optimized resume text>"
                }

                Requirements:
                - Maintain the original structure and sections
                - Enhance bullet points with stronger action verbs
                - Add relevant keywords from the job description naturally
                - Quantify achievements where possible
                - Ensure ATS-friendly formatting
                - Keep the same overall length (±10%)
                - IMPORTANT: Limit each experience entry to a maximum of 5 bullet points. If there are more than 5, consolidate or remove the least impactful ones.
                """;
    }

    private String buildStructuredOptimizationInstructions() {
        return """
                Return ONLY a JSON object matching the EXACT structure of the input resume data.
                You must return a ParsedResumeDto with the same nested structure:

                {
                  "personalInfo": {
                    "name": "...",
                    "email": "...",
                    "phone": "...",
                    "location": "...",
                    "linkedin": "...",
                    "github": "...",
                    "website": "..."
                  },
                  "summary": "optimized professional summary...",
                  "workExperience": [
                    {
                      "company": "...",
                      "position": "...",
                      "location": "...",
                      "startDate": "...",
                      "endDate": "...",
                      "responsibilities": ["optimized bullet 1", "optimized bullet 2", ...]
                    }
                  ],
                  "education": [...],
                  "skills": ["skill1", "skill2", ...],
                  "certifications": [...],
                  "projects": [...]
                }

                Optimization Requirements:
                1. Enhance work experience responsibilities with:
                   - Stronger action verbs
                   - Quantifiable achievements where possible
                   - Keywords from the job description (naturally integrated)
                   - LIMIT to maximum 5 bullet points per experience

                2. Optimize the summary section:
                   - Align with job requirements
                   - Highlight most relevant skills and experience
                   - Keep concise (3-5 sentences)

                3. Skills section:
                   - Add relevant skills from job description
                   - Prioritize most important skills first
                   - Remove irrelevant skills

                4. Projects (if present):
                   - Enhance descriptions with impact and results
                   - Highlight technologies matching job description

                5. Maintain all original data:
                   - Keep all contact information unchanged
                   - Preserve company names, dates, locations
                   - Maintain education details

                6. Return ONLY the JSON object, no markdown formatting, no explanations.
                """;
    }

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

    private void appendIfPresent(StringBuilder prompt, String label, String value) {
        if (TextUtils.isNotBlank(value)) {
            prompt.append(label).append(":\n").append(value).append("\n\n");
        }
    }
}
