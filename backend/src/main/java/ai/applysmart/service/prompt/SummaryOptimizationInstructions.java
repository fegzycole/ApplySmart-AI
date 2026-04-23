package ai.applysmart.service.prompt;

import org.springframework.stereotype.Component;

@Component
public class SummaryOptimizationInstructions {

    public String build() {
        return """
            1. PROFESSIONAL SUMMARY (3-4 sentences MAX) - CRITICAL FOR SCORE:
               - MUST be concise, specific, and metric-driven
               - NO generic phrases: avoid "proven track record", "extensive experience", "passionate about"
               - Each sentence must have DIFFERENT keywords (no repetition)
               - MUST include at least 1-2 specific metrics or scale indicators

               MANDATORY FORMAT:
               Sentence 1: [Job Title/Role] with [X] years + [2 specific job-relevant skills/areas] + [1 metric/scale]
               Sentence 2: [Different action/achievement] + [2 more job-relevant skills/areas] + [specific result/metric]
               Sentence 3: [Final differentiator] + [1-2 more job keywords] + [business/organizational impact]
            """;
    }
}
