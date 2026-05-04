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
            HARD CONSTRAINTS — THESE NEVER CHANGE:

            ❌ NEVER change employment dates or company names
            ❌ NEVER invent entire job experiences, companies, or education that do not exist
            ❌ NEVER remove or downgrade core technologies the candidate demonstrably has
            ❌ NEVER replace a specific named tool with a generic category label (specific always beats generic)
            ❌ NEVER inflate a junior title to a senior one without clear evidence of that scope in the resume

            ✅ EVERYTHING ELSE SERVES THE JD:

            1. ADD JD-required skills to the skills section — even if not explicitly in the original resume — when the candidate's background makes them credible
            2. WEAVE JD tools and keywords into work bullets naturally — frame existing work to demonstrate those requirements
            3. REFRAME job titles to better reflect actual scope when targeting a specific role type (e.g. "Software Engineer" → "Application Engineer" when the work involved owning enterprise platforms and SaaS tooling)
            4. REORDER and prioritise — surface the most JD-relevant content first throughout
            5. INFER and surface implicit experience — if the candidate worked in an enterprise environment and the JD requires Jira/Slack/Google Workspace, weave those into relevant bullets
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
