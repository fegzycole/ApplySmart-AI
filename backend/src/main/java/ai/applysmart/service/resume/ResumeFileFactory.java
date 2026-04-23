package ai.applysmart.service.resume;

import ai.applysmart.dto.file.FileUploadResult;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
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
    private final ResumeFileValidator validator;

    public Resume createUploadedResume(MultipartFile file, User user) {
        String originalFilename = validator.requireUploadableFile(file);
        String content = fileParserService.extractTextFromFile(file);
        FileUploadResult uploadResult = fileStorageService.uploadFile(file);

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

    public Resume createBuiltResume(MultipartFile file, String name, User user) {
        validator.requireBuiltResumePdf(file);
        FileUploadResult uploadResult = fileStorageService.uploadFile(file);
        log.info("Uploaded PDF to storage: {}", uploadResult.getUrl());

        return Resume.builder()
                .user(user)
                .name(name)
                .fileUrl(uploadResult.getUrl())
                .cloudinaryPublicId(uploadResult.getPublicId())
                .status(Resume.Status.DRAFT)
                .build();
    }

    public void deleteStoredFile(Resume resume) {
        if (resume.getCloudinaryPublicId() != null) {
            fileStorageService.deleteFile(resume.getCloudinaryPublicId());
        }
    }
}
