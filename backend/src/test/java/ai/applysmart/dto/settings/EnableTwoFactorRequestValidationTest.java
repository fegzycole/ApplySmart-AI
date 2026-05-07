package ai.applysmart.dto.settings;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class EnableTwoFactorRequestValidationTest {

    private static final ValidatorFactory VALIDATOR_FACTORY = Validation.buildDefaultValidatorFactory();
    private static final Validator VALIDATOR = VALIDATOR_FACTORY.getValidator();

    @AfterAll
    static void closeValidatorFactory() {
        VALIDATOR_FACTORY.close();
    }

    @Test
    void enableTwoFactorRequiresSixDigitCode() {
        EnableTwoFactorRequest request = new EnableTwoFactorRequest();
        request.setCode("12345");

        assertFalse(VALIDATOR.validate(request).isEmpty());
    }

    @Test
    void enableTwoFactorAcceptsValidCode() {
        EnableTwoFactorRequest request = new EnableTwoFactorRequest();
        request.setCode("123456");

        assertTrue(VALIDATOR.validate(request).isEmpty());
    }
}
