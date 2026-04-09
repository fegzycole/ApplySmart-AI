package ai.applysmart.exception;

import org.springframework.security.core.AuthenticationException;

/**
 * Exception thrown during OAuth2 authentication processing.
 */
public class OAuth2AuthenticationProcessingException extends AuthenticationException {

    public OAuth2AuthenticationProcessingException(String message) {
        super(message);
    }

    public OAuth2AuthenticationProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}
