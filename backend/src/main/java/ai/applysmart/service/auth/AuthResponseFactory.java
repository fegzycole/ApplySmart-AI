package ai.applysmart.service.auth;

import ai.applysmart.dto.auth.AuthResponse;
import ai.applysmart.dto.auth.SignupResponse;
import ai.applysmart.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthResponseFactory {

    private static final String SIGNUP_SUCCESS_MESSAGE =
            "Account created successfully. Please check your email for verification code.";

    private final UserDtoMapper userDtoMapper;

    public AuthResponse authenticated(String accessToken, String refreshToken, User user) {
        return AuthResponse.builder()
                .token(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .user(userDtoMapper.toDto(user))
                .build();
    }

    public SignupResponse signupSuccess(User user) {
        return SignupResponse.builder()
                .success(true)
                .message(SIGNUP_SUCCESS_MESSAGE)
                .user(userDtoMapper.toDto(user))
                .build();
    }
}
