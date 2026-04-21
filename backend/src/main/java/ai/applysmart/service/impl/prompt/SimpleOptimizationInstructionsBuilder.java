package ai.applysmart.service.impl.prompt;

import org.springframework.stereotype.Component;

@Component
public class SimpleOptimizationInstructionsBuilder {

    public String build() {
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
            - IMPORTANT: Limit each experience entry to a maximum of 5 bullet points
            """;
    }
}
