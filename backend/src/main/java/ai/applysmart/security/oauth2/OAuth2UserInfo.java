package ai.applysmart.security.oauth2;

import java.util.Map;

/**
 * Abstract class for extracting OAuth2 user information.
 * Different providers have different attribute structures.
 */
public abstract class OAuth2UserInfo {

    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract String getId();

    public abstract String getName();

    public abstract String getEmail();

    public abstract String getImageUrl();

    public abstract String getFirstName();

    public abstract String getLastName();
}
