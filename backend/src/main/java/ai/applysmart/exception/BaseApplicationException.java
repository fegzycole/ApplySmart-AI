package ai.applysmart.exception;

/**
 * Base exception class for all application-specific exceptions.
 * Provides common constructors to reduce duplication.
 */
public abstract class BaseApplicationException extends RuntimeException {

    protected BaseApplicationException(String message) {
        super(message);
    }

    protected BaseApplicationException(String message, Throwable cause) {
        super(message, cause);
    }
}
