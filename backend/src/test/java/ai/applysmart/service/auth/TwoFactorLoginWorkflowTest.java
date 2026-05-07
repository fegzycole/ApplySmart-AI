package ai.applysmart.service.auth;

import ai.applysmart.dto.auth.TwoFactorLoginVerifyRequest;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TwoFactorLoginWorkflowTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthenticatorAppService authenticatorAppService;

    @Mock
    private TwoFactorLoginChallengeService twoFactorLoginChallengeService;

    @Test
    void verifyChallengeRejectsInvalidCode() {
        TwoFactorLoginWorkflow workflow = new TwoFactorLoginWorkflow(
                userRepository,
                authenticatorAppService,
                twoFactorLoginChallengeService
        );
        User user = User.builder()
                .email("user@example.com")
                .password("stored-password")
                .firstName("Test")
                .lastName("User")
                .twoFactorEnabled(true)
                .twoFactorSecret("SECRET123")
                .build();
        user.setId(7L);
        TwoFactorLoginVerifyRequest request = new TwoFactorLoginVerifyRequest();
        request.setChallengeToken("challenge-token");
        request.setCode("123456");

        when(twoFactorLoginChallengeService.getUserId("challenge-token")).thenReturn(7L);
        when(userRepository.findById(7L)).thenReturn(Optional.of(user));
        when(authenticatorAppService.verifyCode("SECRET123", "123456")).thenReturn(false);

        assertThrows(BadRequestException.class, () -> workflow.verifyChallenge(request));
    }

    @Test
    void verifyChallengeReturnsUserWhenCodeIsValid() {
        TwoFactorLoginWorkflow workflow = new TwoFactorLoginWorkflow(
                userRepository,
                authenticatorAppService,
                twoFactorLoginChallengeService
        );
        User user = User.builder()
                .email("user@example.com")
                .password("stored-password")
                .firstName("Test")
                .lastName("User")
                .twoFactorEnabled(true)
                .twoFactorSecret("SECRET123")
                .build();
        user.setId(7L);
        TwoFactorLoginVerifyRequest request = new TwoFactorLoginVerifyRequest();
        request.setChallengeToken("challenge-token");
        request.setCode("123456");

        when(twoFactorLoginChallengeService.getUserId("challenge-token")).thenReturn(7L);
        when(userRepository.findById(7L)).thenReturn(Optional.of(user));
        when(authenticatorAppService.verifyCode("SECRET123", "123456")).thenReturn(true);

        User verifiedUser = workflow.verifyChallenge(request);

        assertEquals(user, verifiedUser);
        verify(twoFactorLoginChallengeService).consumeChallenge("challenge-token");
    }
}
