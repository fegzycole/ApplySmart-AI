package ai.applysmart.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class JobDescriptionConstraintValidator implements ConstraintValidator<ValidJobDescription, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        String validationError = JobDescriptionValidationRules.findValidationError(value);
        if (validationError == null) {
            return true;
        }

        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(validationError).addConstraintViolation();
        return false;
    }
}
