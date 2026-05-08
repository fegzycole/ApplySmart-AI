package ai.applysmart.dto.coverletter;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CoverLetterRequestValidationTest {

    private static final ValidatorFactory VALIDATOR_FACTORY = Validation.buildDefaultValidatorFactory();
    private static final Validator VALIDATOR = VALIDATOR_FACTORY.getValidator();

    @AfterAll
    static void closeValidatorFactory() {
        VALIDATOR_FACTORY.close();
    }

    @Test
    void coverLetterRequestRejectsShortJobDescription() {
        CoverLetterRequest request = new CoverLetterRequest();
        request.setCompany("Acme");
        request.setPosition("Product Designer");
        request.setJobDescription("Product designer role for a fast-growing startup.");

        assertFalse(VALIDATOR.validate(request).isEmpty());
    }

    @Test
    void coverLetterRequestAcceptsDetailedJobDescription() {
        CoverLetterRequest request = new CoverLetterRequest();
        request.setCompany("Acme");
        request.setPosition("Product Designer");
        request.setJobDescription("""
                Product Designer

                Responsibilities:
                - Turn product requirements into polished user journeys and interfaces.
                - Run design critiques and collaborate with product managers and engineers.

                Qualifications:
                - Experience designing B2B SaaS workflows.
                - Strong communication, prototyping, and visual design skills.
                """);

        assertTrue(VALIDATOR.validate(request).isEmpty());
    }
}
