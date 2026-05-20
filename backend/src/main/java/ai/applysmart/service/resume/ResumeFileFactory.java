package ai.applysmart.service.resume;

import ai.applysmart.dto.file.FileUploadResult;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.service.file.FileDeletionScheduler;
import ai.applysmart.service.file.FileParserService;
import ai.applysmart.service.file.FileStorageService;
import ai.applysmart.util.TextUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Component
@RequiredArgsConstructor
public class ResumeFileFactory {

    private final FileParserService fileParserService;
    private final FileStorageService fileStorageService;
    private final FileDeletionScheduler fileDeletionScheduler;
    private final ResumeFileValidator validator;

    public Resume createUploadedResume(MultipartFile file, User user) {
        String originalFilename = validator.requireUploadableFile(file);
        String content = fileParserService.extractTextFromFile(file);
        FileUploadResult uploadResult = fileStorageService.uploadFile(file);
        fileDeletionScheduler.deleteAfterRollback(uploadResult.getPublicId());

        return Resume.builder()
                .user(user)
                .name(originalFilename)
                .content(content)
                .fileUrl(uploadResult.getUrl())
                .cloudinaryPublicId(uploadResult.getPublicId())
                .score(0)
                .status(Resume.Status.DRAFT)
                .wordCount(TextUtils.calculateWordCount(content))
                .build();
    }

    public Resume createBuiltResume(byte[] pdfBytes, String name, User user) {
        validator.requireBuiltResumePdf(pdfBytes, name);
        FileUploadResult uploadResult = fileStorageService.uploadFileBytes(pdfBytes, name + ".pdf");
        fileDeletionScheduler.deleteAfterRollback(uploadResult.getPublicId());
        log.info("Uploaded generated PDF to storage: {}", uploadResult.getUrl());

        return Resume.builder()
                .user(user)
                .name(name)
                .fileUrl(uploadResult.getUrl())
                .cloudinaryPublicId(uploadResult.getPublicId())
                .status(Resume.Status.PUBLISHED)
                .build();
    }

    public Resume createOptimizedResume(String name,
                                        String content,
                                        Integer score,
                                        User user,
                                        FileUploadResult uploadResult) {
        return Resume.builder()
                .user(user)
                .name(name)
                .content(content)
                .fileUrl(uploadResult != null ? uploadResult.getUrl() : null)
                .cloudinaryPublicId(uploadResult != null ? uploadResult.getPublicId() : null)
                .score(score != null ? score : 0)
                .status(Resume.Status.OPTIMIZED)
                .wordCount(content != null ? TextUtils.calculateWordCount(content) : null)
                .build();
    }

    public void deleteStoredFile(Resume resume) {
        if (resume.getCloudinaryPublicId() != null) {
            fileDeletionScheduler.deleteAfterCommit(resume.getCloudinaryPublicId());
        }
    }
}
