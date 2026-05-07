package ai.applysmart.dto.settings;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ChangePasswordRequestValidationTest {

    private static final ValidatorFactory VALIDATOR_FACTORY = Validation.buildDefaultValidatorFactory();
    private static final Validator VALIDATOR = VALIDATOR_FACTORY.getValidator();

    @AfterAll
    static void closeValidatorFactory() {
        VALIDATOR_FACTORY.close();
    }

    @Test
    void changePasswordAllowsMissingCurrentPassword() {
        ChangePasswordRequest request = new ChangePasswordRequest();
        request.setNewPassword("new-password-123");

        assertTrue(VALIDATOR.validate(request).isEmpty());
    }

    @Test
    void changePasswordRequiresNewPassword() {
        ChangePasswordRequest request = new ChangePasswordRequest();
        request.setCurrentPassword("current-password");
        request.setNewPassword(" ");

        assertFalse(VALIDATOR.validate(request).isEmpty());
    }
}
