package ai.applysmart.service.prompt;

import org.springframework.stereotype.Component;

@Component
public class SkillsOptimizationInstructions {

    public String build() {
        return """
            3. SKILLS SECTION — JD-FIRST, TIGHT, NO NOISE:
               GOAL: Every must-have from the JD appears here. Nothing irrelevant does.

               MANDATORY FORMAT:
               - Output a flat list of individual skill strings (JSON array)
               - Order: JD must-have skills FIRST, then supporting skills, then general tools
               - Keep total to 20-28 items — tight and credible, not exhaustive

               BUILD THE SKILLS LIST:
               1. Start with every must-have tool, skill, and qualification named in the JD
               2. Add the candidate's core proven skills from the original resume that establish credibility for this role
               3. Add any remaining original skills that are relevant to this role type

               PRUNE ruthlessly:
               - Remove skills from the original resume that have no relevance to the target role
               - Apply this across all fields: a nurse applying for a clinical role should not list social media marketing; a marketer should not list surgical techniques; a backend engineer targeting a SaaS admin role should not list unrelated frontend frameworks
               - The reader should look at this list and immediately think "this person does exactly this job"

               NEVER:
               - Replace a specific named tool or credential with a generic label ("Salesforce" must not become "CRM Tools"; "Atlassian Suite" must not become "SaaS Platforms"; "Epic EMR" must not become "Healthcare Systems")
               - Remove the candidate's core proven skills — they are the credibility anchor for the rest of the resume
            """;
    }
}
