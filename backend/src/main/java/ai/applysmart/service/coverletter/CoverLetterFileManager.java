package ai.applysmart.service.coverletter;

import ai.applysmart.dto.file.FileUploadResult;
import ai.applysmart.entity.CoverLetter;
import ai.applysmart.entity.User;
import ai.applysmart.service.file.FileDeletionScheduler;
import ai.applysmart.service.file.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CoverLetterFileManager {

    private static final String COVER_LETTER_FOLDER = "applysmart/cover-letters";

    private final CoverLetterPdfRenderer coverLetterPdfRenderer;
    private final FileStorageService fileStorageService;
    private final FileDeletionScheduler fileDeletionScheduler;

    public void syncStoredFile(CoverLetter coverLetter, User user) {
        String previousPublicId = coverLetter.getCloudinaryPublicId();
        byte[] pdfBytes = coverLetterPdfRenderer.renderPdf(coverLetter, user);
        FileUploadResult uploadResult = fileStorageService.uploadFileBytes(
                pdfBytes,
                buildFilename(coverLetter, user),
                COVER_LETTER_FOLDER
        );
        fileDeletionScheduler.deleteAfterRollback(uploadResult.getPublicId());

        coverLetter.setFileUrl(uploadResult.getUrl());
        coverLetter.setCloudinaryPublicId(uploadResult.getPublicId());

        if (previousPublicId != null && !previousPublicId.isBlank()) {
            fileDeletionScheduler.deleteAfterCommit(previousPublicId);
        }
    }

    public void deleteStoredFile(CoverLetter coverLetter) {
        fileDeletionScheduler.deleteAfterCommit(coverLetter.getCloudinaryPublicId());
    }

    private String buildFilename(CoverLetter coverLetter, User user) {
        String applicantName = sanitize("%s-%s".formatted(user.getFirstName(), user.getLastName()));
        String company = sanitize(coverLetter.getCompany());
        String position = sanitize(coverLetter.getPosition());
        String filename = String.join("-", applicantName, company, position, "cover-letter")
                .replaceAll("-{2,}", "-")
                .replaceAll("(^-|-$)", "");

        return (filename.isBlank() ? "cover-letter" : filename) + ".pdf";
    }

    private String sanitize(String value) {
        return value == null ? "" : value.trim().toLowerCase().replaceAll("[^a-z0-9]+", "-");
    }
}
