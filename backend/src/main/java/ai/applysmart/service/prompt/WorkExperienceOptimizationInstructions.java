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
               - LIMIT to 4-5 bullets (focused and impactful; use 5 only for roles highly relevant to the target JD)
               - EVERY bullet must include a number, percentage, or scale indicator grounded in the original resume
               - Use exact terminology from the job description where it accurately describes what the candidate did
               - Vary your action verbs (do not repeat the same verb twice in one role)
               - Each bullet should target a DIFFERENT keyword cluster from the job description

               ROLE-TYPE ALIGNMENT:
               - Read the JD and match the language register of the bullets to the role type:
                 * Platform / SaaS administration: "managed", "configured", "integrated", "automated", "administered"
                 * Software engineering: "built", "designed", "architected", "implemented", "optimised"
                 * Healthcare / clinical: "delivered", "coordinated", "assessed", "documented", "improved outcomes"
                 * Marketing / growth: "grew", "launched", "increased", "drove", "optimised conversion"
                 * Finance / accounting: "reconciled", "reported", "managed", "reduced", "ensured compliance"
                 * Sales: "closed", "expanded", "prospected", "negotiated", "exceeded quota"
                 * Operations / PM: "delivered", "coordinated", "standardised", "reduced cycle time", "managed stakeholders"
               - Match the candidate's actual work to whichever framing best fits the role without changing the substance

               SKILLS-TO-BULLETS BRIDGING — MANDATORY:
               - After writing the bullets, check: does every JD-critical tool that appears in the candidate's skills section also appear in at least one bullet?
               - If a tool is in the skills list but absent from ALL bullets, you MUST add a bullet to the most relevant role surfacing how that tool was used
               - This is not optional — a skill listed but never demonstrated in experience creates a credibility gap that costs interviews
               - Only bridge skills the candidate explicitly listed — do not introduce tools absent from the resume entirely
               - Examples across industries:
                 * Tech: Jira in skills but no bullet → "Configured Jira workflows, automation rules, and project structures to support engineering and operational processes across teams."
                 * Healthcare: Epic EMR in skills but no bullet → "Documented patient encounters and managed care workflows using Epic EMR, ensuring accurate records across the care team."
                 * Marketing: HubSpot in skills but no bullet → "Built and managed HubSpot workflows for lead nurturing, segmentation, and campaign automation across the marketing funnel."
                 * Finance: Bloomberg in skills but no bullet → "Used Bloomberg Terminal to analyse market data, monitor portfolio performance, and support investment decision-making."
                 * Sales: Salesforce in skills but no bullet → "Maintained Salesforce pipeline hygiene, tracked deal progression, and generated forecasting reports for regional sales leadership."

               JOB TITLE REFRAMING:
               - If the candidate's job title does not reflect the full scope of their work and the target role has a different title, you MAY reframe the title to better reflect the actual responsibilities performed
               - Only reframe when the candidate's work clearly encompassed those responsibilities — do not change a junior title to a senior one without evidence
               - Example: "Software Engineer" → "Application Engineer" when the role involved owning and operating enterprise platforms and SaaS tooling at scale

               SENIORITY SIGNALS — REQUIRED FOR SENIOR OR STAFF ROLES:
               Across the two most relevant roles combined, the following THREE types of signal must each appear at least once. Do not skip any of them:

               1. ARCHITECTURAL OWNERSHIP — a decision the candidate made that others followed:
                  - "Defined the [X] architecture adopted across the [org/team/platform]..."
                  - "Established the standard for [X] that was rolled out across [teams/environments]..."
                  - "Owned the end-to-end [platform/integration/migration] strategy and drove its implementation..."

               2. MENTORING / KNOWLEDGE TRANSFER — evidence of growing others:
                  - Look for implicit signals in the original resume: "accelerated onboarding", "improved team consistency", "technical documentation", "cross-functional training"
                  - Surface these explicitly: "Mentored [N] engineers on [X], reducing onboarding time by [Y]..."
                  - Or: "Drove adoption of shared integration standards and internal libraries, cutting onboarding time by 30% across teams."
                  - If no explicit mentoring exists: surface any documentation, onboarding, or knowledge-sharing evidence as a mentoring proxy

               3. CROSS-TEAM INFLUENCE — decisions or standards adopted beyond one's immediate team:
                  - "Drove cross-functional adoption of [X] across [teams/departments]..."
                  - "Acted as technical authority on [X], advising stakeholders across [teams/time zones]..."
                  - "Collaborated across [N] teams/time zones to align on [platform direction/architecture/standards]..."

               - Avoid bullets that only describe task execution — senior candidates own outcomes and shape direction
               - If the JD explicitly mentions greenfield work, self-driving teams, or empowered decision-making: surface the candidate as someone who drives those things, not just participates

               ECOSYSTEM DEPTH — REQUIRED WHEN JD DEMANDS SPECIALISATION:
               - When the JD requires deep expertise in a specific platform, tool, or domain, go beyond the top-level name in at least one bullet
               - Surface specific sub-components, configurations, and advanced capabilities that prove real depth:
                 * Tech / Atlassian: not just "used Jira" but "configured JSM request types, SLAs, automation rules, and marketplace integrations"
                 * Healthcare: not just "used Epic" but "built Epic Ambulatory templates, managed order sets, and trained clinical staff on documentation workflows"
                 * Marketing: not just "used HubSpot" but "built multi-step nurture sequences, configured lead scoring, and integrated HubSpot with Salesforce via API"
                 * Finance: not just "financial modelling" but "built 3-statement LBO models and scenario analyses to support M&A due diligence"
                 * Sales: not just "used Salesforce" but "administered Salesforce CPQ, maintained custom objects, and built pipeline dashboards for the regional VP"
               - Apply this depth logic to whatever ecosystem the JD specialises in — the pattern is universal

               METRICS GUIDANCE (use only if evidence exists in the original):
               - Performance: "reduced processing time by 45%", "improved reliability by 50%"
               - Scale: "serving 10,000+ users", "supporting 500+ employees"
               - Productivity: "eliminated 20+ hours/week of manual work", "cut release cycle by 40%"
               - Team/Leadership: "accelerated onboarding by 30%", "increased consistency across 5 teams"
            """;
    }
}
