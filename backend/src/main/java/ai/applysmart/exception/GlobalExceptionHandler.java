package ai.applysmart.exception;

import ai.applysmart.dto.common.ErrorResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex,
            WebRequest request) {
        Map<String, String> errors = collectValidationErrors(ex);

        log.warn("Validation error: {}", errors);
        return error(HttpStatus.BAD_REQUEST, "Validation Error", "Invalid request data", errors, request);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolation(
            ConstraintViolationException ex,
            WebRequest request) {
        Map<String, String> errors = ex.getConstraintViolations().stream()
                .collect(Collectors.toMap(
                        violation -> violation.getPropertyPath().toString(),
                        ConstraintViolation::getMessage,
                        (existing, replacement) -> existing
                ));

        log.warn("Constraint violation: {}", errors);
        return error(HttpStatus.BAD_REQUEST, "Constraint Violation", "Validation failed", errors, request);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex,
            WebRequest request) {
        log.warn("Malformed request body: {}", ex.getMessage());
        return error(
                HttpStatus.BAD_REQUEST,
                "Malformed JSON",
                "Request body is malformed or unreadable",
                request
        );
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorResponse> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex,
            WebRequest request) {
        Map<String, String> errors = Map.of(
                ex.getParameterName(),
                "Required request parameter is missing"
        );

        log.warn("Missing request parameter: {}", ex.getParameterName());
        return error(
                HttpStatus.BAD_REQUEST,
                "Missing Request Parameter",
                "Required request parameter is missing",
                errors,
                request
        );
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatch(
            MethodArgumentTypeMismatchException ex,
            WebRequest request) {
        String parameterName = ex.getName() != null ? ex.getName() : "parameter";
        Map<String, String> errors = Map.of(
                parameterName,
                "Expected " + resolveRequiredTypeName(ex.getRequiredType())
        );

        log.warn("Request value type mismatch for parameter '{}': {}", parameterName, ex.getValue());
        return error(
                HttpStatus.BAD_REQUEST,
                "Type Mismatch",
                "Request value has an invalid type",
                errors,
                request
        );
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> handleMaxUploadSizeExceeded(
            MaxUploadSizeExceededException ex,
            WebRequest request) {
        log.warn("Maximum upload size exceeded: {}", ex.getMaxUploadSize());
        return error(
                HttpStatus.PAYLOAD_TOO_LARGE,
                "Payload Too Large",
                "Uploaded file exceeds the maximum allowed size",
                request
        );
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            ResourceNotFoundException ex,
            WebRequest request) {
        log.warn("Resource not found: {}", ex.getMessage());
        return error(HttpStatus.NOT_FOUND, "Not Found", ex.getMessage(), request);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(
            BadRequestException ex,
            WebRequest request) {
        log.warn("Bad request: {}", ex.getMessage());
        return error(HttpStatus.BAD_REQUEST, "Bad Request", ex.getMessage(), request);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(
            UnauthorizedException ex,
            WebRequest request) {
        log.warn("Unauthorized access: {}", ex.getMessage());
        return error(HttpStatus.UNAUTHORIZED, "Unauthorized", ex.getMessage(), request);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(
            AuthenticationException ex,
            WebRequest request) {
        log.warn("Authentication failed: {}", ex.getMessage());
        return error(HttpStatus.UNAUTHORIZED, "Authentication Failed", "Invalid email or password", request);
    }

    @ExceptionHandler(OAuth2AuthenticationProcessingException.class)
    public ResponseEntity<ErrorResponse> handleOAuth2AuthenticationProcessing(
            OAuth2AuthenticationProcessingException ex,
            WebRequest request) {
        log.error("OAuth2 authentication failed: {}", ex.getMessage());
        return error(HttpStatus.UNAUTHORIZED, "OAuth2 Authentication Failed", ex.getMessage(), request);
    }

    @ExceptionHandler(UnsupportedFeatureException.class)
    public ResponseEntity<ErrorResponse> handleUnsupportedFeature(
            UnsupportedFeatureException ex,
            WebRequest request) {
        log.warn("Unsupported feature requested: {}", ex.getMessage());
        return error(HttpStatus.NOT_IMPLEMENTED, "Not Implemented", ex.getMessage(), request);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(
            DataIntegrityViolationException ex,
            WebRequest request) {
        String message = resolveDataIntegrityMessage(ex);
        log.warn("Data integrity violation: {}", message);
        return error(HttpStatus.CONFLICT, "Conflict", message, request);
    }

    @ExceptionHandler(ApiCommunicationException.class)
    public ResponseEntity<ErrorResponse> handleApiCommunicationException(
            ApiCommunicationException ex,
            WebRequest request) {
        log.error("AI service communication error: {}", ex.getMessage(), ex);
        return error(HttpStatus.SERVICE_UNAVAILABLE, "AI Service Error", ex.getMessage(), request);
    }

    @ExceptionHandler(FileProcessingException.class)
    public ResponseEntity<ErrorResponse> handleFileProcessingException(
            FileProcessingException ex,
            WebRequest request) {
        log.error("File processing error: {}", ex.getMessage(), ex);
        return error(HttpStatus.UNPROCESSABLE_ENTITY, "File Processing Error", ex.getMessage(), request);
    }

    @ExceptionHandler(PromptBuildingException.class)
    public ResponseEntity<ErrorResponse> handlePromptBuildingException(
            PromptBuildingException ex,
            WebRequest request) {
        log.error("Prompt building error: {}", ex.getMessage(), ex);
        return error(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Prompt Building Error",
                "Unable to build AI prompt",
                request
        );
    }

    @ExceptionHandler(RateLimitInitializationException.class)
    public ResponseEntity<ErrorResponse> handleRateLimitInitializationException(
            RateLimitInitializationException ex,
            WebRequest request) {
        log.error("Rate limit infrastructure error: {}", ex.getMessage(), ex);
        return error(
                HttpStatus.SERVICE_UNAVAILABLE,
                "Rate Limit Service Error",
                "Rate limit infrastructure is unavailable",
                request
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
            Exception ex,
            WebRequest request) {
        log.error("Unexpected error occurred", ex);
        return error(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal Server Error",
                "An unexpected error occurred",
                request
        );
    }

    private ResponseEntity<ErrorResponse> error(HttpStatus status, String error, String message, WebRequest request) {
        return ResponseEntity.status(status).body(ErrorResponseFactory.create(status, error, message, request));
    }

    private ResponseEntity<ErrorResponse> error(HttpStatus status, String error, String message,
                                                Map<String, String> details, WebRequest request) {
        return ResponseEntity.status(status).body(ErrorResponseFactory.create(status, error, message, details, request));
    }

    private Map<String, String> collectValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String key = error instanceof FieldError fieldError
                    ? fieldError.getField()
                    : error.getObjectName();
            String message = error.getDefaultMessage() != null ? error.getDefaultMessage() : "Validation failed";
            errors.putIfAbsent(key, message);
        });
        return errors;
    }

    private String resolveRequiredTypeName(Class<?> requiredType) {
        return requiredType != null ? requiredType.getSimpleName() : "required type";
    }

    private String resolveDataIntegrityMessage(DataIntegrityViolationException ex) {
        String rootCauseMessage = ex.getRootCause() != null
                ? ex.getRootCause().getMessage()
                : ex.getMessage();

        if (rootCauseMessage == null) {
            return "A conflict occurred with existing data";
        }

        String normalizedMessage = rootCauseMessage.toLowerCase(Locale.ROOT);

        if (normalizedMessage.contains("users_email_key")
                || normalizedMessage.contains("idx_email")
                || normalizedMessage.contains("duplicate") && normalizedMessage.contains("email")) {
            return "Email address already in use";
        }

        if (normalizedMessage.contains("subscriptions_user_id_key")
                || normalizedMessage.contains("subscription")) {
            return "User already has an active subscription";
        }

        if (normalizedMessage.contains("duplicate")) {
            return "This record already exists";
        }

        if (normalizedMessage.contains("foreign key")) {
            return "Cannot complete operation due to related data constraints";
        }

        return "A conflict occurred with existing data";
    }
}
