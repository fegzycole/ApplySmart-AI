package ai.applysmart.exception;

/**
 * Exception thrown when external API communication fails.
 * Used for Claude API, Cloudinary, or other external service failures.
 */
public class ApiCommunicationException extends BaseApplicationException {

    public ApiCommunicationException(String message) {
        super(message);
    }

    public ApiCommunicationException(String message, Throwable cause) {
        super(message, cause);
    }
}
