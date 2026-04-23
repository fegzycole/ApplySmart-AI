package ai.applysmart.service.prompt;

import org.springframework.stereotype.Component;

@Component
public class AnalysisInstructionsBuilder {

    public String build() {
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
}
