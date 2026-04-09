package ai.applysmart.service;

import ai.applysmart.dto.FileUploadResult;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service for managing file storage operations (Cloudinary).
 */
public interface FileStorageService {
    /**
     * Upload a file to cloud storage.
     *
     * @param file the file to upload
     * @return upload result containing URL and public ID
     */
    FileUploadResult uploadFile(MultipartFile file);

    /**
     * Upload file bytes to cloud storage.
     *
     * @param fileBytes the file content as byte array
     * @param filename the filename
     * @return upload result containing URL and public ID
     */
    FileUploadResult uploadFileBytes(byte[] fileBytes, String filename);

    /**
     * Delete a file from cloud storage.
     *
     * @param publicId the Cloudinary public ID of the file to delete
     */
    void deleteFile(String publicId);
}
