package ai.applysmart.security.oauth2;

import ai.applysmart.config.ApplicationOAuth2Properties;
import ai.applysmart.entity.User;
import ai.applysmart.service.auth.OAuth2LoginCodeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final ApplicationOAuth2Properties oAuth2Properties;
    private final OAuth2LoginCodeService oAuth2LoginCodeService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            log.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request,
                                       HttpServletResponse response,
                                       Authentication authentication) {
        OAuth2UserPrincipal principal = (OAuth2UserPrincipal) authentication.getPrincipal();
        User user = principal.getUser();

        String code = oAuth2LoginCodeService.issueCode(user);

        log.info("OAuth2 authentication successful for user: {}", user.getEmail());

        return UriComponentsBuilder.fromUriString(oAuth2Properties.getAuthorizedRedirectUri())
                .queryParam("code", code)
                .build()
                .toUriString();
    }
}
