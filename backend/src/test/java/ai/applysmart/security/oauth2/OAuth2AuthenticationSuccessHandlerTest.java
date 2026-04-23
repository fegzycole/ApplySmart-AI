package ai.applysmart.security.oauth2;

import ai.applysmart.config.ApplicationOAuth2Properties;
import ai.applysmart.entity.User;
import ai.applysmart.service.auth.OAuth2LoginCodeService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OAuth2AuthenticationSuccessHandlerTest {

    @Mock
    private ApplicationOAuth2Properties oAuth2Properties;

    @Mock
    private OAuth2LoginCodeService oAuth2LoginCodeService;

    @Mock
    private Authentication authentication;

    @Test
    void determineTargetUrlRedirectsWithExchangeCodeInsteadOfTokens() {
        OAuth2AuthenticationSuccessHandler handler =
                new OAuth2AuthenticationSuccessHandler(oAuth2Properties, oAuth2LoginCodeService);
        User user = new User();
        user.setId(9L);
        user.setEmail("user@example.com");
        OAuth2UserPrincipal principal = new OAuth2UserPrincipal(user, Map.of());

        when(authentication.getPrincipal()).thenReturn(principal);
        when(oAuth2Properties.getAuthorizedRedirectUri()).thenReturn("http://localhost:5173/auth/oauth2/callback");
        when(oAuth2LoginCodeService.issueCode(user)).thenReturn("exchange-code");

        String targetUrl = handler.determineTargetUrl(null, null, authentication);

        assertTrue(targetUrl.contains("code=exchange-code"));
        assertFalse(targetUrl.contains("token="));
        assertFalse(targetUrl.contains("refreshToken="));
    }
}
