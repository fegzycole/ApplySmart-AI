package ai.applysmart.exception;

/**
 * Exception thrown when file processing operations fail.
 * Used for file parsing, uploading, or generation failures.
 */
public class FileProcessingException extends BaseApplicationException {

    public FileProcessingException(String message) {
        super(message);
    }

    public FileProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}
