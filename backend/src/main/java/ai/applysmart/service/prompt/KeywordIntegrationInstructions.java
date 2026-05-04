package ai.applysmart.service.prompt;

import org.springframework.stereotype.Component;

@Component
public class KeywordIntegrationInstructions {

    public String build() {
        return """
            KEYWORD INTEGRATION — THIS IS HOW YOU WIN:

            STEP 1: Extract every critical requirement from the JD — go deep, not just surface level
            - Must-have tools, platforms, and systems named in the JD (surface both the top-level tool AND any specific sub-components or features the JD mentions)
              * Tech example: "Jira" → also extract automation rules, JSM service desk, Confluence administration, marketplace integrations
              * Healthcare example: "Epic" → also extract specific modules (Ambulatory, Inpatient, MyChart), documentation workflows, order management
              * Marketing example: "HubSpot" → also extract workflows, lead scoring, CRM integrations, campaign analytics
              * Finance example: "Bloomberg" or "financial modelling" → also extract specific model types, data sources, reporting outputs
              * Sales example: "Salesforce" → also extract CPQ, pipeline management, reporting, custom objects
            - Must-have skills and competencies from the JD (use the JD's exact terminology, not paraphrases)
            - Must-have role-level signals: for Senior/Staff/Director roles extract governance, cross-functional influence, mentoring, strategic ownership; for individual contributor roles extract execution depth and tool mastery
            - Must-have behaviours and ways of working named in the JD (e.g. self-driven, collaborative, greenfield, data-driven, patient-focused)

            STEP 2: Map each JD requirement to the resume
            - For each critical requirement, identify where in the resume it can be demonstrated or inferred
            - If the candidate has a directly matching experience → use the JD's exact terminology in that bullet
            - If the candidate's work implies the requirement even without naming it → reframe the bullet to surface it explicitly

            STEP 3: Fill every gap
            - Any JD requirement with no matching bullet yet → create a new bullet in the most relevant role
            - Any JD-required tool not yet in the skills section → add it
            - The output resume must not leave any critical JD requirement unaddressed

            STEP 4: Verify completeness
            - After writing, check every must-have from the JD against the resume
            - If any is still missing → add it before finalising output
            """;
    }
}
