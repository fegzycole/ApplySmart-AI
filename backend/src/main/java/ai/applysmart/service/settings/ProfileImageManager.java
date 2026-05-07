package ai.applysmart.service.settings;

import ai.applysmart.dto.file.FileUploadResult;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.file.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Component
@RequiredArgsConstructor
public class ProfileImageManager {

    private static final long MAX_PROFILE_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;

    public User updateProfileImage(MultipartFile file, User user) {
        validateFile(file);

        FileUploadResult uploadResult = fileStorageService.uploadFile(file, "applysmart/profile-images");
        String previousPublicId = user.getProfileImagePublicId();

        user.setImageUrl(uploadResult.getUrl());
        user.setProfileImagePublicId(uploadResult.getPublicId());
        User savedUser = userRepository.save(user);

        if (previousPublicId != null && !previousPublicId.isBlank()) {
            fileStorageService.deleteFile(previousPublicId);
        }

        log.info("Updated profile image for user: {}", user.getId());
        return savedUser;
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Profile photo is required");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new BadRequestException("Profile photo must be an image");
        }

        if (file.getSize() > MAX_PROFILE_IMAGE_SIZE_BYTES) {
            throw new BadRequestException("Profile photo must be 2MB or smaller");
        }
    }
}
