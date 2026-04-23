package ai.applysmart.service.prompt;

import org.springframework.stereotype.Component;

@Component
public class AdditionalResumeSectionsInstructions {

    public String build() {
        return """
            4. EDUCATION:
               - Keep all details unchanged
               - Only reorder if multiple degrees exist (most relevant first)

            5. PROJECTS (if present):
               - Emphasize projects using technologies mentioned in job description
               - Rewrite descriptions to highlight impact and scale

            6. CERTIFICATIONS (if present):
               - Prioritize certifications relevant to the job
               - Keep all existing certifications
            """;
    }
}
