package ai.applysmart.exception;

import ai.applysmart.dto.common.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.Map;

public final class ErrorResponseFactory {

    private ErrorResponseFactory() {
    }

    public static ErrorResponse create(HttpStatus status, String error, String message, WebRequest request) {
        return create(status, error, message, null, request);
    }

    public static ErrorResponse create(HttpStatus status, String error, String message,
                                       Map<String, String> details, WebRequest request) {
        return ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(status.value())
                .error(error)
                .message(message)
                .details(details)
                .path(resolvePath(request))
                .build();
    }

    private static String resolvePath(WebRequest request) {
        return request.getDescription(false).replace("uri=", "");
    }
}
