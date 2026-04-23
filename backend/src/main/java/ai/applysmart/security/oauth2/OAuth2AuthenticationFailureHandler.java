package ai.applysmart.security.oauth2;

import ai.applysmart.config.ApplicationOAuth2Properties;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private final ApplicationOAuth2Properties oAuth2Properties;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                       HttpServletResponse response,
                                       AuthenticationException exception) throws IOException {

        String targetUrl = UriComponentsBuilder.fromUriString(oAuth2Properties.getAuthorizedRedirectUri())
                .queryParam("error", "oauth_login_failed")
                .build()
                .toUriString();

        log.error("OAuth2 authentication failed: {}", exception.getMessage());

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
