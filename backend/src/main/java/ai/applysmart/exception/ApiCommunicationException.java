package ai.applysmart.exception;

public class ApiCommunicationException extends BaseApplicationException {

    public ApiCommunicationException(String message) {
        super(message);
    }

    public ApiCommunicationException(String message, Throwable cause) {
        super(message, cause);
    }
}
