package ai.applysmart.validation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class JobDescriptionValidationRulesTest {

    @Test
    void rejectsShortJobDescriptionSummaries() {
        String jobDescription = "Senior frontend engineer needed for React product work.";

        assertEquals(
                JobDescriptionValidationRules.TOO_SHORT_MESSAGE,
                JobDescriptionValidationRules.findValidationError(jobDescription)
        );
    }

    @Test
    void rejectsDescriptionsWithoutRealJobDescriptionStructure() {
        String jobDescription = """
                We are hiring for a high-impact engineering role with a fast-moving team and exciting growth plans.
                You will work with talented people and help shape the future of our platform across multiple products.
                This is a great opportunity for someone who wants to build in a strong culture with real ownership.
                """;

        assertEquals(
                JobDescriptionValidationRules.INVALID_MESSAGE,
                JobDescriptionValidationRules.findValidationError(jobDescription)
        );
    }

    @Test
    void acceptsDetailedJobDescriptions() {
        String jobDescription = """
                Senior Backend Engineer

                Responsibilities:
                - Build and maintain Java services that support our hiring platform.
                - Partner with product and design to deliver scalable features.

                Requirements:
                - 4+ years of backend engineering experience.
                - Experience with Spring Boot, PostgreSQL, and REST APIs.

                Skills:
                - Strong debugging, testing, and communication skills.
                """;

        assertNull(JobDescriptionValidationRules.findValidationError(jobDescription));
    }

    @Test
    void acceptsLegitimateJobPostsWithoutCompanyName() {
        String jobDescription = """
                Product Designer

                About the role
                You will lead discovery and interface design for customer-facing financial tools.

                Responsibilities:
                - Partner with product and engineering to ship new workflows.
                - Translate customer research into polished, accessible product experiences.

                Requirements:
                - Strong portfolio and experience with design systems.
                - Experience working across product, engineering, and customer success.
                """;

        assertNull(JobDescriptionValidationRules.findValidationError(jobDescription));
    }
}
