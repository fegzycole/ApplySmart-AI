package ai.applysmart.dto.job;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JobRequestValidationTest {

    private static final ValidatorFactory VALIDATOR_FACTORY = Validation.buildDefaultValidatorFactory();
    private static final Validator VALIDATOR = VALIDATOR_FACTORY.getValidator();

    @AfterAll
    static void closeValidatorFactory() {
        VALIDATOR_FACTORY.close();
    }

    @Test
    void createRequestRequiresJobPostingUrl() {
        CreateJobRequest request = new CreateJobRequest();
        request.setCompany("Acme");
        request.setRole("Backend Engineer");
        request.setLink(" ");

        assertFalse(VALIDATOR.validate(request).isEmpty());
    }

    @Test
    void updateRequestRejectsBlankLinkWhenProvided() {
        UpdateJobRequest request = new UpdateJobRequest();
        request.setLink(" ");

        assertFalse(VALIDATOR.validate(request).isEmpty());
    }

    @Test
    void updateRequestAllowsOmittedLink() {
        UpdateJobRequest request = new UpdateJobRequest();
        request.setRole("Staff Engineer");

        assertTrue(VALIDATOR.validate(request).isEmpty());
    }
}
