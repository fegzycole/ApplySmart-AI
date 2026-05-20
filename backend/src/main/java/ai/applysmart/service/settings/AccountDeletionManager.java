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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class AccountDeletionManager {

    private static final String DELETE_CONFIRMATION = "DELETE";

    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final CoverLetterRepository coverLetterRepository;
    private final JobRepository jobRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final VerificationCodeRepository verificationCodeRepository;
    private final TokenService tokenService;
    private final FileDeletionScheduler fileDeletionScheduler;

    public void deleteAccount(DeleteAccountRequest request, User user) {
        validateDeleteRequest(request, user);

        Set<String> filePublicIds = collectManagedFileIds(user);

        tokenService.revokeAllUserTokens(user.getId());
        verificationCodeRepository.deleteByEmail(user.getEmail());
        subscriptionRepository.deleteByUserId(user.getId());
        coverLetterRepository.deleteAllByUserId(user.getId());
        jobRepository.deleteAllByUserId(user.getId());
        resumeRepository.deleteAllByUserId(user.getId());
        userRepository.deleteById(user.getId());

        filePublicIds.forEach(fileDeletionScheduler::deleteAfterCommit);
    }

    private void validateDeleteRequest(DeleteAccountRequest request, User user) {
        if (!DELETE_CONFIRMATION.equalsIgnoreCase(request.getConfirmationText().trim())) {
            throw new BadRequestException("Type DELETE to confirm account deletion");
        }
    }

    private Set<String> collectManagedFileIds(User user) {
        List<String> resumePublicIds = resumeRepository.findAllCloudinaryPublicIdsByUserId(user.getId());
        List<String> coverLetterPublicIds = coverLetterRepository.findAllCloudinaryPublicIdsByUserId(user.getId());
        Set<String> filePublicIds = new LinkedHashSet<>();

        if (user.getProfileImagePublicId() != null && !user.getProfileImagePublicId().isBlank()) {
            filePublicIds.add(user.getProfileImagePublicId());
        }

        resumePublicIds.stream()
                .filter(publicId -> publicId != null && !publicId.isBlank())
                .forEach(filePublicIds::add);

        coverLetterPublicIds.stream()
                .filter(publicId -> publicId != null && !publicId.isBlank())
                .forEach(filePublicIds::add);

        return filePublicIds;
    }
}
