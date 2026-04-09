package ai.applysmart.security.oauth2;

import ai.applysmart.entity.User;
import ai.applysmart.exception.OAuth2AuthenticationProcessingException;

import java.util.Map;

/**
 * Factory for creating OAuth2UserInfo instances based on provider.
 */
public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(User.AuthProvider.GOOGLE.name())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(User.AuthProvider.GITHUB.name())) {
            return new GithubOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException(
                    "Login with " + registrationId + " is not supported"
            );
        }
    }
}
