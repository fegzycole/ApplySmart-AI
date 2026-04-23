package ai.applysmart.service.prompt;

import org.springframework.stereotype.Component;

@Component
public class WorkExperienceOptimizationInstructions {

    public String build() {
        return """
            2. WORK EXPERIENCE (CRITICAL - 50% of your score comes from here):
               EVERY BULLET MUST have specific metrics and job-aligned keywords.

               MANDATORY BULLET FORMAT:
               [Action Verb] + [Specific Method/Tool/Process] + [Concrete Metric] + [Impact/Outcome]

               For each role:
               - LIMIT to 3-4 bullets MAX (focused and impactful)
               - EVERY bullet must include a number, percentage, or scale indicator
               - Use exact terminology from job description where relevant
               - Vary your action verbs (don't repeat the same verb twice)
               - Each bullet should target DIFFERENT keywords from job

               METRICS TO ADD (if not present in original):
               - Performance: "reduced processing time by 45%", "improved efficiency 3x", "decreased wait times 30%"
               - Scale: "serving 500+ clients", "managing 50+ accounts", "teaching 200+ students annually"
               - Financial: "increased revenue by $500K", "reduced costs by 15%", "managed $2M budget"
               - Quality: "improved satisfaction scores 25%", "achieved 98% accuracy rate", "increased retention 18%"
               - Productivity: "saved 20 hours/week", "streamlined process reducing time by 40%"
               - Team/Leadership: "led team of 5", "mentored 8 staff members", "trained 15 new hires"
            """;
    }
}
