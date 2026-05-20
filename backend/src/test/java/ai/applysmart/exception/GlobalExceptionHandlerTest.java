package ai.applysmart.exception;

import ai.applysmart.dto.common.ErrorResponse;
import org.junit.jupiter.api.Test;
import org.springframework.core.MethodParameter;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

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

    @Test
    void handleValidationExceptionsKeepsFirstFieldErrorMessage() throws NoSuchMethodException {
        ValidationPayload payload = new ValidationPayload();
        BeanPropertyBindingResult bindingResult = new BeanPropertyBindingResult(payload, "signupRequest");
        bindingResult.addError(new FieldError("signupRequest", "email", "Email is required"));
        bindingResult.addError(new FieldError("signupRequest", "email", "Email must be valid"));

        MethodParameter parameter = new MethodParameter(
                ValidationController.class.getDeclaredMethod("update", ValidationPayload.class),
                0
        );
        MethodArgumentNotValidException exception = new MethodArgumentNotValidException(parameter, bindingResult);

        ResponseEntity<ErrorResponse> response = handler.handleValidationExceptions(
                exception,
                request("POST", "/api/v1/auth/signup")
        );

        ErrorResponse body = assertErrorResponse(response, 400);
        assertNotNull(body.getDetails());
        assertEquals("Email is required", body.getDetails().get("email"));
    }

    @Test
    void handleHttpMessageNotReadableReturnsBadRequest() {
        HttpMessageNotReadableException exception = new HttpMessageNotReadableException("Invalid JSON");

        ResponseEntity<ErrorResponse> response = handler.handleHttpMessageNotReadable(
                exception,
                request("POST", "/api/v1/resumes")
        );

        ErrorResponse body = assertErrorResponse(response, 400);
        assertEquals("Malformed JSON", body.getError());
        assertEquals("Request body is malformed or unreadable", body.getMessage());
        assertEquals("/api/v1/resumes", body.getPath());
        assertNull(body.getDetails());
    }

    @Test
    void handleMissingServletRequestParameterReturnsBadRequestWithParameterDetail() {
        MissingServletRequestParameterException exception =
                new MissingServletRequestParameterException("page", "Integer");

        ResponseEntity<ErrorResponse> response = handler.handleMissingServletRequestParameter(
                exception,
                request("GET", "/api/v1/jobs")
        );

        ErrorResponse body = assertErrorResponse(response, 400);
        assertEquals("Missing Request Parameter", body.getError());
        assertEquals("Required request parameter is missing", body.getMessage());
        assertNotNull(body.getDetails());
        assertEquals("Required request parameter is missing", body.getDetails().get("page"));
    }

    @Test
    void handleMethodArgumentTypeMismatchReturnsBadRequestWithExpectedTypeDetail() throws NoSuchMethodException {
        MethodParameter parameter = new MethodParameter(
                ValidationController.class.getDeclaredMethod("search", Integer.class),
                0
        );
        MethodArgumentTypeMismatchException exception = new MethodArgumentTypeMismatchException(
                "abc",
                Integer.class,
                "page",
                parameter,
                new NumberFormatException("For input string: \"abc\"")
        );

        ResponseEntity<ErrorResponse> response = handler.handleMethodArgumentTypeMismatch(
                exception,
                request("GET", "/api/v1/jobs")
        );

        ErrorResponse body = assertErrorResponse(response, 400);
        assertEquals("Type Mismatch", body.getError());
        assertEquals("Request value has an invalid type", body.getMessage());
        assertNotNull(body.getDetails());
        assertEquals("Expected Integer", body.getDetails().get("page"));
    }

    @Test
    void handleMaxUploadSizeExceededReturnsPayloadTooLarge() {
        MaxUploadSizeExceededException exception = new MaxUploadSizeExceededException(1_048_576);

        ResponseEntity<ErrorResponse> response = handler.handleMaxUploadSizeExceeded(
                exception,
                request("POST", "/api/v1/resumes/upload")
        );

        ErrorResponse body = assertErrorResponse(response, 413);
        assertEquals("Payload Too Large", body.getError());
        assertEquals("Uploaded file exceeds the maximum allowed size", body.getMessage());
        assertEquals("/api/v1/resumes/upload", body.getPath());
        assertNull(body.getDetails());
    }

    @Test
    void handleDataIntegrityViolationRecognizesEmailConstraintCaseInsensitively() {
        DataIntegrityViolationException exception = new DataIntegrityViolationException(
                "Constraint failed",
                new RuntimeException("violates unique constraint \"IDX_EMAIL\"")
        );

        ResponseEntity<ErrorResponse> response = handler.handleDataIntegrityViolation(
                exception,
                request("POST", "/api/v1/auth/signup")
        );

        ErrorResponse body = assertErrorResponse(response, 409);
        assertEquals("Conflict", body.getError());
        assertEquals("Email address already in use", body.getMessage());
    }

    private ErrorResponse assertErrorResponse(ResponseEntity<ErrorResponse> response, int status) {
        assertEquals(status, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(status, response.getBody().getStatus());
        return response.getBody();
    }

    private ServletWebRequest request(String method, String uri) {
        return new ServletWebRequest(new MockHttpServletRequest(method, uri));
    }

    private static final class ValidationController {
        @SuppressWarnings("unused")
        void update(ValidationPayload payload) {
        }

        @SuppressWarnings("unused")
        void search(Integer page) {
        }
    }

    private static final class ValidationPayload {
    }
}
