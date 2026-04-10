package ai.applysmart.service.impl;

import ai.applysmart.dto.FileUploadResult;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.exception.FileProcessingException;
import ai.applysmart.service.FileStorageService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileStorageServiceImpl implements FileStorageService {

    private final Cloudinary cloudinary;

    @Override
    public FileUploadResult uploadFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BadRequestException("File is empty");
        }

        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "applysmart/resumes",
                            "resource_type", "auto"
                    ));

            return FileUploadResult.builder()
                    .url((String) uploadResult.get("secure_url"))
                    .publicId((String) uploadResult.get("public_id"))
                    .build();
        } catch (IOException e) {
            log.error("Failed to upload file to Cloudinary: {}", file.getOriginalFilename(), e);
            throw new FileProcessingException("Failed to upload file", e);
        }
    }

    @Override
    public FileUploadResult uploadFileBytes(byte[] fileBytes, String filename) {
        try {
            // Use full filename including extension for better file identification
            Map uploadResult = cloudinary.uploader().upload(fileBytes,
                    ObjectUtils.asMap(
                            "folder", "applysmart/optimized-resumes",
                            "resource_type", "auto",
                            "public_id", filename,
                            "use_filename", true,
                            "unique_filename", false
                    ));

            return FileUploadResult.builder()
                    .url((String) uploadResult.get("secure_url"))
                    .publicId((String) uploadResult.get("public_id"))
                    .build();
        } catch (IOException e) {
            log.error("Failed to upload file bytes to Cloudinary: {}", filename, e);
            throw new FileProcessingException("Failed to upload file", e);
        }
    }

    @Override
    public void deleteFile(String publicId) {
        if (publicId == null || publicId.isBlank()) {
            return;
        }

        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            log.info("Deleted file from Cloudinary: {}", publicId);
        } catch (Exception e) {
            log.warn("Failed to delete file from Cloudinary: {}", publicId, e);
        }
    }
}
