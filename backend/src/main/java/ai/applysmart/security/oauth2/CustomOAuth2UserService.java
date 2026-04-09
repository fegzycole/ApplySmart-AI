package ai.applysmart.security.oauth2;

import ai.applysmart.entity.User;
import ai.applysmart.exception.OAuth2AuthenticationProcessingException;
import ai.applysmart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

/**
 * Custom OAuth2 user service for loading and processing OAuth2 user information.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        try {
            return processOAuth2User(userRequest, oAuth2User);
        } catch (Exception ex) {
            log.error("Error processing OAuth2 user", ex);
            throw new OAuth2AuthenticationException(ex.getMessage());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(
                registrationId,
                oAuth2User.getAttributes()
        );

        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;

        if (userOptional.isPresent()) {
            user = userOptional.get();
            User.AuthProvider provider = User.AuthProvider.valueOf(registrationId.toUpperCase());

            // Check if user is trying to login with a different provider than they signed up with
            if (!user.getAuthProvider().equals(provider)) {
                throw new OAuth2AuthenticationProcessingException(
                        "You signed up with " + user.getAuthProvider() +
                                " account. Please use your " + user.getAuthProvider() + " account to login."
                );
            }

            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(userRequest, oAuth2UserInfo);
        }

        return new OAuth2UserPrincipal(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest userRequest, OAuth2UserInfo oAuth2UserInfo) {
        log.info("Registering new OAuth2 user with email: {}", oAuth2UserInfo.getEmail());

        User user = User.builder()
                .email(oAuth2UserInfo.getEmail())
                .firstName(oAuth2UserInfo.getFirstName() != null ? oAuth2UserInfo.getFirstName() : "")
                .lastName(oAuth2UserInfo.getLastName() != null ? oAuth2UserInfo.getLastName() : "")
                .imageUrl(oAuth2UserInfo.getImageUrl())
                .authProvider(User.AuthProvider.valueOf(
                        userRequest.getClientRegistration().getRegistrationId().toUpperCase()
                ))
                .providerId(oAuth2UserInfo.getId())
                .emailVerified(true) // OAuth2 providers verify emails
                .enabled(true)
                .role(User.Role.USER)
                .build();

        return userRepository.save(user);
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        log.info("Updating existing OAuth2 user with email: {}", oAuth2UserInfo.getEmail());

        // Update user information
        if (StringUtils.hasText(oAuth2UserInfo.getFirstName())) {
            existingUser.setFirstName(oAuth2UserInfo.getFirstName());
        }
        if (StringUtils.hasText(oAuth2UserInfo.getLastName())) {
            existingUser.setLastName(oAuth2UserInfo.getLastName());
        }
        if (StringUtils.hasText(oAuth2UserInfo.getImageUrl())) {
            existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
        }

        return userRepository.save(existingUser);
    }
}
