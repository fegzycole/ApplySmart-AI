package ai.applysmart.exception;

/**
 * Exception thrown when authentication fails or user is unauthorized.
 */
public class UnauthorizedException extends BaseApplicationException {

    public UnauthorizedException(String message) {
        super(message);
    }

    public UnauthorizedException(String message, Throwable cause) {
        super(message, cause);
    }
}
