package ai.applysmart.service.coverletter;

import ai.applysmart.dto.file.FileUploadResult;
import ai.applysmart.entity.CoverLetter;
import ai.applysmart.entity.User;
import ai.applysmart.service.file.FileStorageService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CoverLetterFileManagerTest {

    @Mock
    private CoverLetterPdfRenderer coverLetterPdfRenderer;

    @Mock
    private FileStorageService fileStorageService;

    @Test
    void syncStoredFileUpdatesCoverLetterAndDeletesPreviousAsset() {
        CoverLetterFileManager manager = new CoverLetterFileManager(coverLetterPdfRenderer, fileStorageService);
        User user = User.builder().firstName("Ada").lastName("Lovelace").build();
        CoverLetter coverLetter = CoverLetter.builder()
                .company("Acme")
                .position("Backend Engineer")
                .content("Hello there")
                .cloudinaryPublicId("old-public-id")
                .build();

        when(coverLetterPdfRenderer.renderPdf(coverLetter, user)).thenReturn(new byte[] {1, 2, 3});
        when(fileStorageService.uploadFileBytes(
                any(byte[].class),
                eq("ada-lovelace-acme-backend-engineer-cover-letter.pdf"),
                eq("applysmart/cover-letters")
        ))
                .thenReturn(FileUploadResult.builder()
                        .url("https://example.com/cover-letter.pdf")
                        .publicId("new-public-id")
                        .build());

        manager.syncStoredFile(coverLetter, user);

        assertEquals("https://example.com/cover-letter.pdf", coverLetter.getFileUrl());
        assertEquals("new-public-id", coverLetter.getCloudinaryPublicId());
        verify(fileStorageService).deleteFile("old-public-id");
    }

    @Test
    void deleteStoredFileDelegatesToStorageService() {
        CoverLetterFileManager manager = new CoverLetterFileManager(coverLetterPdfRenderer, fileStorageService);
        CoverLetter coverLetter = CoverLetter.builder().cloudinaryPublicId("cover-public-id").build();

        manager.deleteStoredFile(coverLetter);

        verify(fileStorageService).deleteFile("cover-public-id");
        verify(coverLetterPdfRenderer, never()).renderPdf(org.mockito.Mockito.any(), org.mockito.Mockito.any());
    }
}
