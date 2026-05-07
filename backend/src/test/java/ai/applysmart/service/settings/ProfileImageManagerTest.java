package ai.applysmart.service.settings;

import ai.applysmart.dto.file.FileUploadResult;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.file.FileStorageService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProfileImageManagerTest {

    @Mock
    private FileStorageService fileStorageService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ProfileImageManager profileImageManager;

    @Test
    void updateProfileImageUploadsNewPhotoAndDeletesPreviousManagedImage() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "avatar.png",
                "image/png",
                new byte[] {1, 2, 3}
        );
        User user = User.builder()
                .email("test@example.com")
                .firstName("Test")
                .lastName("User")
                .profileImagePublicId("old-public-id")
                .build();
        user.setId(7L);

        when(fileStorageService.uploadFile(file, "applysmart/profile-images"))
                .thenReturn(FileUploadResult.builder()
                        .url("https://cdn.example.com/new-avatar.png")
                        .publicId("new-public-id")
                        .build());
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User updatedUser = profileImageManager.updateProfileImage(file, user);

        assertEquals("https://cdn.example.com/new-avatar.png", updatedUser.getImageUrl());
        assertEquals("new-public-id", updatedUser.getProfileImagePublicId());
        verify(fileStorageService).deleteFile("old-public-id");
    }

    @Test
    void updateProfileImageRejectsNonImageUploads() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "resume.pdf",
                "application/pdf",
                new byte[] {1, 2, 3}
        );

        assertThrows(BadRequestException.class, () -> profileImageManager.updateProfileImage(file, new User()));
        verify(fileStorageService, never()).uploadFile(any(), eq("applysmart/profile-images"));
    }
}
