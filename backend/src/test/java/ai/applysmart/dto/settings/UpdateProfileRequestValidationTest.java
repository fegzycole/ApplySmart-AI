package ai.applysmart.dto.settings;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class UpdateProfileRequestValidationTest {

    private static final ValidatorFactory VALIDATOR_FACTORY = Validation.buildDefaultValidatorFactory();
    private static final Validator VALIDATOR = VALIDATOR_FACTORY.getValidator();

    @AfterAll
    static void closeValidatorFactory() {
        VALIDATOR_FACTORY.close();
    }

    @Test
    void updateProfileRequiresNonBlankNames() {
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setFirstName(" ");
        request.setLastName(" ");

        assertFalse(VALIDATOR.validate(request).isEmpty());
    }

    @Test
    void updateProfileRejectsShortNames() {
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setFirstName("A");
        request.setLastName("B");

        assertFalse(VALIDATOR.validate(request).isEmpty());
    }

    @Test
    void updateProfileAcceptsValidNames() {
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setFirstName("Ada");
        request.setLastName("Lovelace");

        assertTrue(VALIDATOR.validate(request).isEmpty());
    }
}
