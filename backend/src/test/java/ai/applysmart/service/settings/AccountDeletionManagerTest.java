package ai.applysmart.service.settings;

import ai.applysmart.dto.settings.DeleteAccountRequest;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.repository.CoverLetterRepository;
import ai.applysmart.repository.JobRepository;
import ai.applysmart.repository.ResumeRepository;
import ai.applysmart.repository.SubscriptionRepository;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.repository.VerificationCodeRepository;
import ai.applysmart.service.file.FileDeletionScheduler;
import ai.applysmart.service.token.TokenService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.never;

@ExtendWith(MockitoExtension.class)
class AccountDeletionManagerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ResumeRepository resumeRepository;

    @Mock
    private CoverLetterRepository coverLetterRepository;

    @Mock
    private JobRepository jobRepository;

    @Mock
    private SubscriptionRepository subscriptionRepository;

    @Mock
    private VerificationCodeRepository verificationCodeRepository;

    @Mock
    private TokenService tokenService;

    @Mock
    private FileDeletionScheduler fileDeletionScheduler;

    private AccountDeletionManager accountDeletionManager;

    @BeforeEach
    void setUp() {
        accountDeletionManager = new AccountDeletionManager(
                userRepository,
                resumeRepository,
                coverLetterRepository,
                jobRepository,
                subscriptionRepository,
                verificationCodeRepository,
                tokenService,
                fileDeletionScheduler
        );
    }

    @Test
    void deletesAccountDataAndManagedFilesForPasswordAccount() {
        User user = User.builder()
                .email("user@example.com")
                .password("encoded-password")
                .profileImagePublicId("profile-public-id")
                .build();
        user.setId(17L);
        DeleteAccountRequest request = DeleteAccountRequest.builder()
                .confirmationText("DELETE")
                .build();

        org.mockito.Mockito.when(resumeRepository.findAllCloudinaryPublicIdsByUserId(17L))
                .thenReturn(List.of("resume-public-id", "resume-public-id", "resume-public-id-2"));
        org.mockito.Mockito.when(coverLetterRepository.findAllCloudinaryPublicIdsByUserId(17L))
                .thenReturn(List.of("cover-letter-public-id"));

        accountDeletionManager.deleteAccount(request, user);

        verify(tokenService).revokeAllUserTokens(17L);
        verify(verificationCodeRepository).deleteByEmail("user@example.com");
        verify(subscriptionRepository).deleteByUserId(17L);
        verify(coverLetterRepository).deleteAllByUserId(17L);
        verify(jobRepository).deleteAllByUserId(17L);
        verify(resumeRepository).deleteAllByUserId(17L);
        verify(userRepository).deleteById(17L);
        verify(fileDeletionScheduler).deleteAfterCommit("profile-public-id");
        verify(fileDeletionScheduler).deleteAfterCommit("resume-public-id");
        verify(fileDeletionScheduler).deleteAfterCommit("resume-public-id-2");
        verify(fileDeletionScheduler).deleteAfterCommit("cover-letter-public-id");
    }

    @Test
    void rejectsDeleteWhenConfirmationTextIsWrong() {
        User user = User.builder()
                .email("user@example.com")
                .password("encoded-password")
                .build();
        user.setId(9L);
        DeleteAccountRequest request = DeleteAccountRequest.builder()
                .confirmationText("remove")
                .build();

        assertThrows(BadRequestException.class, () -> accountDeletionManager.deleteAccount(request, user));
        verify(userRepository, never()).deleteById(9L);
    }

    @Test
    void allowsOAuthOnlyAccountWithoutCurrentPassword() {
        User user = User.builder()
                .email("oauth@example.com")
                .password(null)
                .build();
        user.setId(5L);
        DeleteAccountRequest request = DeleteAccountRequest.builder()
                .confirmationText("delete")
                .build();

        org.mockito.Mockito.when(resumeRepository.findAllCloudinaryPublicIdsByUserId(5L)).thenReturn(List.of());
        org.mockito.Mockito.when(coverLetterRepository.findAllCloudinaryPublicIdsByUserId(5L)).thenReturn(List.of());

        assertDoesNotThrow(() -> accountDeletionManager.deleteAccount(request, user));
        verify(userRepository).deleteById(5L);
    }
}
