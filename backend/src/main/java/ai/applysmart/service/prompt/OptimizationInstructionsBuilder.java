package ai.applysmart.service.prompt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static ai.applysmart.service.prompt.PromptConstants.*;

@Component
@RequiredArgsConstructor
public class OptimizationInstructionsBuilder {

    private final SummaryOptimizationInstructions summaryInstructions;
    private final WorkExperienceOptimizationInstructions workExperienceInstructions;
    private final SkillsOptimizationInstructions skillsInstructions;
    private final AdditionalResumeSectionsInstructions additionalResumeSectionsInstructions;
    private final KeywordIntegrationInstructions keywordIntegrationInstructions;
    private final OptimizationPhilosophyInstructions optimizationPhilosophyInstructions;

    public String buildAnalysisStep() {
        return """
            STEP 1: ANALYZE THE JOB FIT (DO NOT OUTPUT THIS - INTERNAL ANALYSIS ONLY)

            First, extract from the job description:
            - Must-have skills and qualifications
            - Nice-to-have skills and certifications
            - Required experience level (entry/mid/senior)
            - Key responsibilities and duties
            - Critical keywords and industry terminology

            Then, analyze the resume match:
            - Which skills/experience match directly?
            - Which are transferable but not exact matches?
            - What's completely missing?
            - What's the realistic match percentage?
            """;
    }

    public String buildOptimizationStrategy() {
        return """
            STEP 2: OPTIMIZATION STRATEGY

            Based on match level:
            - STRONG MATCH (70%+): Maximize keyword alignment and impact
            - PARTIAL MATCH (40-70%): Emphasize transferable skills, reframe experience aggressively
            - WEAK MATCH (<40%): Highlight adjacent experience, de-emphasize gaps, focus on positioning
            """;
    }

    public String buildTruthfulnessRules() {
        return """
            CRITICAL TRUTHFULNESS RULES:

            ❌ NEVER add specific skills, tools, certifications, or qualifications not explicitly present in the original resume
            ❌ NEVER change organization names, dates, job titles, or education details
            ❌ NEVER invent projects, certifications, or achievements

            ✅ YOU MAY (IMPORTANT - THIS IS HOW YOU IMPROVE MATCH SCORE):

            1. GENERALIZE EXISTING EXPERIENCE INTO BROADER CONCEPTS
            2. INFER IMPLICIT SKILLS FROM DEMONSTRATED EXPERIENCE
            3. USE JOB DESCRIPTION TERMINOLOGY WHEN IT MATCHES CONCEPTUALLY
            4. PRIORITIZE KEYWORD ALIGNMENT THROUGH AGGRESSIVE REPHRASING
            5. EMPHASIZE TRANSFERABLE SKILLS AGGRESSIVELY

            🚫 HARD BOUNDARY:
            - DO NOT introduce keywords or qualifications the candidate cannot confidently discuss in interviews
            - Abstraction and generalization are encouraged; fabrication is forbidden
            """;
    }

    public String buildJsonStructure() {
        return """
            STEP 3: OPTIMIZATION EXECUTION

            Return ONLY a valid JSON object with this EXACT structure:

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
            """;
    }

    public String buildFullInstructions() {
        return String.join("\n\n",
            buildAnalysisStep(),
            buildOptimizationStrategy(),
            buildTruthfulnessRules(),
            buildJsonStructure(),
            summaryInstructions.build(),
            workExperienceInstructions.build(),
            skillsInstructions.build(),
            additionalResumeSectionsInstructions.build(),
            keywordIntegrationInstructions.build(),
            optimizationPhilosophyInstructions.build(),
            NO_EM_DASHES_RULE,
            JSON_OUTPUT_REQUIREMENT,
            TARGET_SCORE
        );
    }
}
