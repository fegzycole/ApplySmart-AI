package ai.applysmart.dto.resume;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class OptimizeResumeRequestValidationTest {

    private static final ValidatorFactory VALIDATOR_FACTORY = Validation.buildDefaultValidatorFactory();
    private static final Validator VALIDATOR = VALIDATOR_FACTORY.getValidator();

    @AfterAll
    static void closeValidatorFactory() {
        VALIDATOR_FACTORY.close();
    }

    @Test
    void optimizeResumeRejectsShortJobDescription() {
        OptimizeResumeRequest request = new OptimizeResumeRequest();
        request.setJobDescription("Software engineer role at Acme.");

        assertFalse(VALIDATOR.validate(request).isEmpty());
    }

    @Test
    void optimizeResumeAcceptsDetailedJobDescription() {
        OptimizeResumeRequest request = new OptimizeResumeRequest();
        request.setJobDescription("""
                Staff Product Designer

                Responsibilities:
                - Lead end-to-end product design for our growth surfaces.
                - Partner with engineering and product to ship experiments quickly.

                Requirements:
                - Strong portfolio showing systems thinking and execution.
                - Experience with collaboration tools, prototypes, and design reviews.
                """);

        assertTrue(VALIDATOR.validate(request).isEmpty());
    }
}
