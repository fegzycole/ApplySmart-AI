package ai.applysmart.exception;

/**
 * Exception thrown when a request is invalid or malformed.
 */
public class BadRequestException extends BaseApplicationException {

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
