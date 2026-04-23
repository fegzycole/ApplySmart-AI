package ai.applysmart.service.auth;

import ai.applysmart.dto.auth.AuthResponse;
import ai.applysmart.dto.auth.LoginRequest;
import ai.applysmart.dto.auth.PasswordResetRequest;
import ai.applysmart.dto.auth.ResetPasswordRequest;
import ai.applysmart.dto.auth.SignupRequest;
import ai.applysmart.dto.auth.SignupResponse;
import ai.applysmart.dto.auth.UserDto;
import ai.applysmart.dto.auth.VerifyEmailRequest;
import ai.applysmart.entity.User;

public interface AuthService {

    SignupResponse signup(SignupRequest signupRequest);

    AuthResponse login(LoginRequest loginRequest);

    AuthResponse refreshToken(String refreshToken);

    AuthResponse exchangeOAuthCode(String code);

    void requestPasswordReset(PasswordResetRequest request);

    void resetPassword(ResetPasswordRequest request);

    void verifyEmail(VerifyEmailRequest request);

    void resendVerificationCode(String email);

    UserDto getCurrentUser(Long userId);

    UserDto convertToDto(User user);

    void logout(String token, User user);
}
