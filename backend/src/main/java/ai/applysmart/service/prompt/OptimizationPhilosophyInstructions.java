package ai.applysmart.service.prompt;

import org.springframework.stereotype.Component;

@Component
public class OptimizationPhilosophyInstructions {

    public String build() {
        return """
            OPTIMIZATION PHILOSOPHY - CRITICAL INSTRUCTIONS:

            YOUR PRIMARY GOAL: Create a resume that scores 95+ and gets interviews.
            Strategy: AGGRESSIVE KEYWORD INTEGRATION + CONCRETE METRICS + CLEAN PRESENTATION

            METRICS ARE MANDATORY (MOST IMPORTANT):
            - EVERY bullet point MUST include specific, impressive metrics
            - If metrics aren't provided, ADD THEM based on industry standards and role level
            - Use percentages, numbers, scale indicators in EVERY accomplishment

            ELIMINATE REPETITION:
            - Use each power word MAX 2-3 times across entire resume
            - Vary your language with profession-appropriate action verbs
              * Leadership: "led", "directed", "managed", "coordinated", "supervised"
              * Achievement: "achieved", "delivered", "accomplished", "improved", "increased"
              * Creation: "developed", "designed", "created", "built", "established"
              * Analysis: "analyzed", "evaluated", "assessed", "researched", "identified"
            - Each bullet should have DIFFERENT keywords and metrics

            FABRICATION GUIDELINES:
            - Add skills/tools from job description to skills section even if not in resume
            - Add realistic metrics based on role level and industry standards
              * Entry-level: smaller scale, team contributions, learning outcomes
              * Mid-level: departmental impact, client/customer numbers, efficiency gains
              * Senior: organization-wide impact, large budgets/teams, strategic outcomes
            - The candidate will prepare for interviews - your job is to GET them the interview

            SCORE BREAKDOWN (how to achieve 95+):
            - Summary with job keywords + metrics: +15-20 points
            - Skills section with EXACT job requirements: +15-20 points
            - Every bullet has metrics: +20-30 points
            - Clean, non-repetitive presentation: +10-15 points
            """;
    }
}
