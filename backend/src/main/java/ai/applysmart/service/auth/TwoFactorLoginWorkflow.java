package ai.applysmart.service.auth;

import ai.applysmart.dto.auth.TwoFactorLoginVerifyRequest;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TwoFactorLoginWorkflow {

    private final UserRepository userRepository;
    private final AuthenticatorAppService authenticatorAppService;
    private final TwoFactorLoginChallengeService twoFactorLoginChallengeService;

    public User verifyChallenge(TwoFactorLoginVerifyRequest request) {
        Long userId = twoFactorLoginChallengeService.getUserId(request.getChallengeToken());
        User user = findUser(userId);
        assertSupportedUser(user);

        if (!authenticatorAppService.verifyCode(user.getTwoFactorSecret(), request.getCode())) {
            throw new BadRequestException("Invalid authenticator code");
        }

        twoFactorLoginChallengeService.consumeChallenge(request.getChallengeToken());
        return user;
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    private void assertSupportedUser(User user) {
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new BadRequestException("Two-factor authentication currently supports password accounts only");
        }

        if (!Boolean.TRUE.equals(user.getTwoFactorEnabled())
                || user.getTwoFactorSecret() == null
                || user.getTwoFactorSecret().isBlank()) {
            throw new BadRequestException("Authenticator app verification is not enabled for this account");
        }
    }
}
