package ai.applysmart.service.prompt;

import org.springframework.stereotype.Component;

@Component
public class AnalysisInstructionsBuilder {

    public String build() {
        return """
            Score this resume using the six-criteria framework below. Apply it honestly — do not inflate scores to encourage the candidate.

            CALIBRATION:
            90-100 = near-perfect fit, covers virtually all must-haves with strong evidence
            80-89  = strong match, minor gaps in secondary requirements
            70-79  = solid but meaningful gaps in important areas
            60-69  = adjacent candidate, notable skill or positioning gaps
            below 60 = significant mismatch in role type, skills, or seniority

            STEP 1 — PARSE THE JD BEFORE SCORING:
            Extract and classify every JD requirement:
            - Must-haves: explicit requirements ("expertise in X", "proven experience with Y", "required")
            - Nice-to-haves: softer signals ("familiarity with", "exposure to", "preferred")
            - Years of experience: stated minimum
            - Seniority signals: leadership, ownership, mentoring expectations
            - Domain/industry context: sector, specialisation, company scale

            Then set weights dynamically:
            - Default weights apply unless:
              * JD has 8+ must-haves → increase must-have weight to 40%, reduce nice-to-have to 10%
              * JD emphasises leadership heavily → increase experience/seniority weight to 25%, reduce nice-to-have to 10%
              * Role is highly specialised (niche tools or certifications required) → increase must-have weight to 45%, reduce nice-to-have to 5%

            STEP 2 — SCORE EVIDENCE QUALITY PER SKILL (not binary):
            For each must-have and nice-to-have, rate the evidence quality:
            - Explicit + quantified ("reduced X by 40%", "managed 500+ users"): 90-100
            - Explicit, no metric ("built X using Y", "configured Z"): 70-85
            - Implied or adjacent ("worked with X ecosystem", "exposure to Y"): 40-60
            - Absent: 0-10

            STEP 3 — APPLY THE SIX-CRITERIA RUBRIC:

            1. MUST-HAVE SKILL MATCH (default 35%)
               Average the evidence quality scores for all must-haves identified in Step 1.

            2. NICE-TO-HAVE MATCH (default 15%)
               Average the evidence quality scores for all nice-to-haves.

            3. EXPERIENCE AND SENIORITY (default 20%)
               Score based on: years vs. requirement, seniority signal match (ownership, leadership, mentoring), and domain fit.
               Note: a candidate with significantly MORE experience than required (e.g. 6+ years for a 3-5 year role) should be flagged as potentially over-qualified, which may hurt seniority fit.

            4. IMPACT AND QUANTIFICATION (default 15%)
               (bullets_with_measurable_outcomes / total_bullets) * 100
               A bullet has measurable impact if it includes a percentage, number, scale indicator, or named business outcome.

            5. ROLE TITLE AND CAREER TRAJECTORY (default 10%)
               Do the candidate's past titles and career arc align with the target role type?
               Penalise misalignment: a full-stack generalist resume targeting a specialist backend role, or a junior title history targeting a senior role, should score low here.

            6. PRESENTATION AND CLARITY (default 5%)
               Is the summary role-specific and concise? Are there padding phrases? Is content relevant throughout?

            STEP 4 — CALCULATE FINAL SCORE:
            final = (must_have_score * must_have_weight) +
                    (nice_to_have_score * nice_to_have_weight) +
                    (exp_score * exp_weight) +
                    (impact_score * 0.15) +
                    (trajectory_score * 0.10) +
                    (clarity_score * 0.05)

            Return your analysis in this exact JSON format:
            {
              "score": <final calculated score 0-100>,
              "atsCompatibility": <0-100, keyword coverage and formatting for ATS>,
              "strengths": ["<specific strength tied to a JD requirement>", ...],
              "improvements": ["<specific, actionable gap or improvement>", ...],
              "keywords": ["<important JD keyword that appears in the resume>", ...]
            }
            """;
    }
}
