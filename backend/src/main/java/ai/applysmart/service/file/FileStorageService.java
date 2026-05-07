package ai.applysmart.service.file;

import ai.applysmart.dto.file.FileUploadResult;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    FileUploadResult uploadFile(MultipartFile file);

    FileUploadResult uploadFile(MultipartFile file, String folder);

    FileUploadResult uploadFileBytes(byte[] fileBytes, String filename);

    FileUploadResult uploadFileBytes(byte[] fileBytes, String filename, String folder);

    void deleteFile(String publicId);
}
