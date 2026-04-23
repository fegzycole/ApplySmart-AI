package ai.applysmart.exception;

import ai.applysmart.dto.common.ErrorResponse;
import org.junit.jupiter.api.Test;
import org.springframework.core.MethodParameter;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.ServletWebRequest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    void handleValidationExceptionsSupportsObjectLevelErrors() throws NoSuchMethodException {
        ValidationPayload payload = new ValidationPayload();
        BeanPropertyBindingResult bindingResult = new BeanPropertyBindingResult(payload, "securitySettings");
        bindingResult.addError(new ObjectError("securitySettings", "At least one credential is required"));

        MethodParameter parameter = new MethodParameter(
                ValidationController.class.getDeclaredMethod("update", ValidationPayload.class),
                0
        );
        MethodArgumentNotValidException exception = new MethodArgumentNotValidException(parameter, bindingResult);
        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/api/v1/settings/security");

        ResponseEntity<ErrorResponse> response = handler.handleValidationExceptions(
                exception,
                new ServletWebRequest(request)
        );

        assertEquals(400, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(
                "At least one credential is required",
                response.getBody().getDetails().get("securitySettings")
        );
    }

    private static final class ValidationController {
        @SuppressWarnings("unused")
        void update(ValidationPayload payload) {
        }
    }

    private static final class ValidationPayload {
    }
}
