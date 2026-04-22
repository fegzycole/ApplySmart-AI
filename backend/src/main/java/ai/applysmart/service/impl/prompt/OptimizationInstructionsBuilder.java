package ai.applysmart.service.impl.prompt;

import org.springframework.stereotype.Component;

import static ai.applysmart.service.impl.prompt.PromptConstants.*;

@Component
public class OptimizationInstructionsBuilder {

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
            SummaryInstructions.build(),
            WorkExperienceInstructions.build(),
            SkillsInstructions.build(),
            OtherSectionsInstructions.build(),
            KeywordIntegrationRules.build(),
            OptimizationPhilosophy.build(),
            NO_EM_DASHES_RULE,
            JSON_OUTPUT_REQUIREMENT,
            TARGET_SCORE
        );
    }

    // Nested classes for logical grouping
    private static class SummaryInstructions {
        static String build() {
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

    private static class WorkExperienceInstructions {
        static String build() {
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

    private static class SkillsInstructions {
        static String build() {
            return """
                3. SKILLS SECTION (25% of your score) - CLEAN, GROUPED, EXACT MATCHES:
                   GOAL: Pass ATS by including EXACT skills and qualifications from job description

                   MANDATORY FORMAT:
                   - Group into 4-6 clear categories appropriate for the field
                     Examples by profession:
                     * Tech: Languages, Frameworks, Infrastructure, Tools, Databases
                     * Healthcare: Clinical Skills, Patient Care, Medical Systems, Certifications
                     * Marketing: Digital Marketing, Analytics, Content Creation, Platforms, Strategy
                     * Education: Teaching Methods, Curriculum, Technology, Assessment, Specializations
                     * Finance: Analysis, Software, Compliance, Reporting, Forecasting
                     * Sales: CRM Systems, Prospecting, Negotiation, Product Knowledge, Methodology
                   - Each category: 5-8 items maximum
                   - List job's required skills/tools FIRST in each category
                   - Add job requirements even if not explicitly stated in original resume
                   - Keep it scannable (not a wall of keywords)

                   DIRECT MATCHING STRATEGY:
                   - Use the EXACT terminology from the job description
                   - If job mentions specific tools/systems/methods → include them verbatim
                   - If job mentions certifications/licenses → include them in relevant section
                   - NO abstraction in skills section - use exact names from job posting
                """;
        }
    }

    private static class OtherSectionsInstructions {
        static String build() {
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

    private static class KeywordIntegrationRules {
        static String build() {
            return """
                KEYWORD INTEGRATION RULES - AGGRESSIVE APPROACH:
                - Identify 15-20 critical keywords from job description
                - Include these EXACT keywords in skills section
                - Weave keywords into work bullets with metrics
                - If job requires specific skill X and candidate has similar skill Y → add skill X to skills
                - If job requires specific tool/system and candidate has related experience → add that tool to skills
                - Use job's exact terminology in bullets describing similar work
                - Add specific metrics to every accomplishment (even if estimated)

                Examples across industries:
                - Healthcare: If job wants "Epic EMR" and they use any EMR → add "Epic EMR"
                - Education: If job wants "differentiated instruction" and they individualize → use that term
                - Sales: If job wants "Salesforce" and they use any CRM → add "Salesforce"
                - Finance: If job wants "financial modeling" and they do forecasting → use that term
                """;
        }
    }

    private static class OptimizationPhilosophy {
        static String build() {
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
}
