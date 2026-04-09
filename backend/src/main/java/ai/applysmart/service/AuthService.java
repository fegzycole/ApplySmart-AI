package ai.applysmart.service;

import ai.applysmart.dto.auth.*;
import ai.applysmart.entity.User;

public interface AuthService {

    AuthResponse signup(SignupRequest signupRequest);

    AuthResponse login(LoginRequest loginRequest);

    AuthResponse refreshToken(String refreshToken);

    void requestPasswordReset(PasswordResetRequest request);

    void resetPassword(ResetPasswordRequest request);

    void verifyEmail(VerifyEmailRequest request);

    void resendVerificationCode(String email);

    UserDto getCurrentUser(Long userId);

    UserDto convertToDto(User user);
}
