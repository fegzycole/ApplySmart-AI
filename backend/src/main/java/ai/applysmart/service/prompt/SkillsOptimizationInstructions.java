package ai.applysmart.service.prompt;

import org.springframework.stereotype.Component;

@Component
public class SkillsOptimizationInstructions {

    public String build() {
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
