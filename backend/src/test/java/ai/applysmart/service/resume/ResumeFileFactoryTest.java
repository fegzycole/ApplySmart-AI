package ai.applysmart.service.resume;

import ai.applysmart.dto.file.FileUploadResult;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.service.file.FileDeletionScheduler;
import ai.applysmart.service.file.FileParserService;
import ai.applysmart.service.file.FileStorageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ResumeFileFactoryTest {

    @Mock
    private FileParserService fileParserService;

    @Mock
    private FileStorageService fileStorageService;

    @Mock
    private FileDeletionScheduler fileDeletionScheduler;

    private ResumeFileFactory resumeFileFactory;

    @BeforeEach
    void setUp() {
        resumeFileFactory = new ResumeFileFactory(
                fileParserService,
                fileStorageService,
                fileDeletionScheduler,
                new ResumeFileValidator()
        );
    }

    @Test
    void createBuiltResumeMarksResumeAsPublished() {
        User user = User.builder().email("user@example.com").firstName("Ada").lastName("Lovelace").build();
        FileUploadResult uploadResult = FileUploadResult.builder()
                .url("https://example.com/built.pdf")
                .publicId("built-public-id")
                .build();

        when(fileStorageService.uploadFileBytes("pdf".getBytes(), "Ada Resume.pdf")).thenReturn(uploadResult);

        Resume resume = resumeFileFactory.createBuiltResume("pdf".getBytes(), "Ada Resume", user);

        assertEquals(Resume.Status.PUBLISHED, resume.getStatus());
        assertEquals("https://example.com/built.pdf", resume.getFileUrl());
        assertEquals("built-public-id", resume.getCloudinaryPublicId());
        verify(fileDeletionScheduler).deleteAfterRollback("built-public-id");
    }

    @Test
    void createOptimizedResumeMarksResumeAsOptimized() {
        User user = User.builder().email("user@example.com").firstName("Ada").lastName("Lovelace").build();
        FileUploadResult uploadResult = FileUploadResult.builder()
                .url("https://example.com/optimized.pdf")
                .publicId("optimized-public-id")
                .build();

        Resume resume = resumeFileFactory.createOptimizedResume(
                "Ada Resume (Optimized)",
                "Optimized resume content",
                91,
                user,
                uploadResult
        );

        assertEquals(Resume.Status.OPTIMIZED, resume.getStatus());
        assertEquals("https://example.com/optimized.pdf", resume.getFileUrl());
        assertEquals("optimized-public-id", resume.getCloudinaryPublicId());
        assertEquals(91, resume.getScore());
    }

    @Test
    void deleteStoredFileSchedulesDeletionAfterCommit() {
        Resume resume = Resume.builder()
                .cloudinaryPublicId("resume-public-id")
                .build();

        resumeFileFactory.deleteStoredFile(resume);

        verify(fileDeletionScheduler).deleteAfterCommit("resume-public-id");
    }
}
